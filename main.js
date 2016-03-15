var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var w = c.offsetWidth;
var h = c.offsetHeight;

function rgba(r, g, b, a) {
    return "rgba(" + r + ", " + g + ", " + b + "," + a + ")"
}

function aline(x, y, x1, y1, x2, y2, scale, option, index) {
    line(x1 * scale + x, (10 - y1) * scale + y, x2 * scale + x , (10 - y2) * scale + y, option, index);
}

function line(x1, y1, x2, y2, option, index) {
    if(option.lineRenderer){
        option.lineRenderer(x1, y1, x2, y2, index)
    }else{
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}

function drawChar(x, y, size, fontdata, str, option) {
    var font;
    for (var i = 0; i < fontdata.length; i++) {
        if (fontdata[i][0] === str) {
            font = fontdata[i];
            break;
        }
    }

    if (font) {
        ctx.lineWidth = 0.5;
        font[1].forEach(function (stroke, index) {
            aline(x, y,stroke[0], stroke[1], stroke[2], stroke[3], size, option, index);
        })
    }
}

function drawString(x, y, size, fontdata, str, option){
    var ratio = size / 10;
    
    option = option ? option : {};
    
    var offset = 0;
    for (var i = 0; i < str.length; i++) {
        var ch = str[i];
        drawChar( x + offset, y, ratio, fontdata, ch, option);
        if(str.match(/^(\w| |'|,|&)+$/)){
            offset += ratio * 5;
        }else{
            offset += ratio * 10;
        }
    }
}

var request = require("superagent");

var parser = require("./lib/lff/parser")

function clear(){
    ctx.clearRect(0, 0, w, h);
}

var fontdata;
var round = 0;
var blink = 0;
function update(){
    clear();
    if(fontdata){
        var left = 20;
        var top = 20;
        
        var customRenderer = function(x0, y0, x1, y1, index){
            var scale = 5;
            var rad = (index) / 10;
            var rad2 = (index + 1) / 10;
            
            var PIPI = 2 * 3.14;
            
            ctx.strokeStyle="#999999";
            ctx.fillStyle="#FFFFFF";
            
            ctx.beginPath();
            var diff = Math.cos((rad + round) * PIPI) * scale;
            var diff2 = Math.cos((rad2 + round) * PIPI) * scale;
            ctx.moveTo(x0, y0 + diff);
            ctx.lineTo(x1, y1 + diff2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(x0, y0 + diff, (diff + 5) / 4, 0, Math.PI*2, true);
            ctx.fill();
            round += 0.0001;
        }
        
        
        var customRenderer2 = function(x0, y0, x1, y1, index){
            if(blink % 3 === 0){
                ctx.strokeStyle="#FFF";
                ctx.beginPath();
                ctx.moveTo(x0, y0);
                ctx.lineTo(x1, y1);
                ctx.stroke();
            }
        }        
        var size = 80;
        
        
        drawString(left, top, size, fontdata, "あいうえお", {
            lineRenderer: customRenderer
        });
        drawString(left, top + size, size, fontdata, "ABCDE123", {
            lineRenderer: customRenderer
        });
        drawString(left, top + size * 2, size / 2, fontdata, "漢字も描画可能", {
            lineRenderer: customRenderer2
        });        
    }
    
    window.requestAnimationFrame(function(){
        blink++;
        update();
    });
}

request.get("kst32b.lff")
    .end(function (err, data) {
        fontdata = parser(data.text.split("\n"));
        update();
    })
