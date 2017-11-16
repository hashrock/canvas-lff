import * as request from "superagent";
import * as parser from "./lib/lff/parser";
import { Line } from "./lib/lff/parser";

export default {
  mounted() {
    var c = <HTMLCanvasElement>document.getElementById("canvas");
    var ctx = <CanvasRenderingContext2D>c.getContext("2d");
    var w = c.offsetWidth;
    var h = c.offsetHeight;

    function rgba(r: number, g: number, b: number, a: number) {
      return "rgba(" + r + ", " + g + ", " + b + "," + a + ")";
    }

    function aline(x: number, y: number, x1: number, y1: number, x2: number, y2: number, scale: number, option: LffOption, index: number) {
      line(
        x1 * scale + x,
        (10 - y1) * scale + y,
        x2 * scale + x,
        (10 - y2) * scale + y,
        option,
        index
      );
    }

    function line(x1: number, y1: number, x2: number, y2: number, option: LffOption, index: number) {
      if (option.lineRenderer) {
        option.lineRenderer(x1, y1, x2, y2, index);
      } else {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }

    function drawChar(x: number, y: number, size: number, fontdata: parser.Font[], str: string, option: LffOption) {
      var font;
      for (var i = 0; i < fontdata.length; i++) {
        if (fontdata[i].letter === str) {
          font = fontdata[i];
          break;
        }
      }

      if (font) {
        ctx.lineWidth = 0.5;
        font.info.forEach(function (stroke: parser.Line, index: number) {
          aline(
            x,
            y,
            stroke.x1,
            stroke.y1,
            stroke.x2,
            stroke.y2,
            size,
            option,
            index
          );
        });
      }
    }

    function drawString(x: number, y: number, size: number, fontdata: parser.Font[], str: string, option: LffOption) {
      var ratio = size / 10;

      option = option ? option : { lineRenderer: () => { } };

      var offset = 0;
      for (var i = 0; i < str.length; i++) {
        var ch = str[i];
        drawChar(x + offset, y, ratio, fontdata, ch, option);
        if (str.match(/^(\w| |'|,|&)+$/)) {
          offset += ratio * 5;
        } else {
          offset += ratio * 10;
        }
      }
    }

    function clear() {
      ctx.clearRect(0, 0, w, h);
    }

    var fontdata: parser.Font[];
    var round = 0;
    var blink = 0;
    function update() {
      clear();
      if (fontdata) {
        var left = 20;
        var top = 20;

        var customRenderer = function (x0: number, y0: number, x1: number, y1: number, index: number) {
          var scale = 5;
          var rad = index / 10;
          var rad2 = (index + 1) / 10;

          var PIPI = 2 * 3.14;

          ctx.strokeStyle = "#999999";
          ctx.fillStyle = "#FFFFFF";

          ctx.beginPath();
          var diff = Math.cos((rad + round) * PIPI) * scale;
          var diff2 = Math.cos((rad2 + round) * PIPI) * scale;
          ctx.moveTo(x0, y0 + diff);
          ctx.lineTo(x1, y1 + diff2);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(x0, y0 + diff, (diff + 5) / 4, 0, Math.PI * 2, true);
          ctx.fill();
          round += 0.0001;
        };

        var customRenderer2 = function (x0: number, y0: number, x1: number, y1: number, index: number) {
          if (blink % 3 === 0) {
            ctx.strokeStyle = "#FFF";
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.stroke();
          }
        };
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

      window.requestAnimationFrame(function () {
        blink++;
        update();
      });
    }

    request.get("kst32b.lff").end(function (err, data) {
      fontdata = parser.parseLines(data.text.split("\n"));
      update();
    });
  }
};

class LffOption {
  lineRenderer: (x0: number, y0: number, x1: number, y1: number, index: number) => void;
}