import * as request from "superagent";
import * as parser from "./lib/lff/parser";
import { Line } from "./lib/lff/parser";
import * as example from "./example"
import {clear, drawChar, drawString} from "./draw"
export default {
  data(){
    return {
    }
  },
  mounted() {
    var c = <HTMLCanvasElement>document.getElementById("canvas");
    var ctx = <CanvasRenderingContext2D>c.getContext("2d");
    var w = c.offsetWidth;
    var h = c.offsetHeight;

    function rgba(r: number, g: number, b: number, a: number) {
      return "rgba(" + r + ", " + g + ", " + b + "," + a + ")";
    }

    var fontdata: parser.Font[];
    var round = 0;
    var count = 0;
    function update() {
      round += 0.01;
      count += 1;
      clear(ctx, w, h);
      if (fontdata) {
        var left = 20;
        var top = 20;

        var customRenderer = example.custom1;

        var customRenderer2 = example.custom2
        var size = 80;

        drawString(ctx, round, count, left, top, size, fontdata, "あいうえお", {
          lineRenderer: customRenderer
        });
        drawString(ctx, round, count, left, top + size, size, fontdata, "ABCDE123", {
          lineRenderer: customRenderer
        });
        drawString(ctx, round, count, left, top + size * 2, size / 2, fontdata, "漢字も描画可能", {
          lineRenderer: customRenderer2
        });
      }

      window.requestAnimationFrame( ()=> {
        update();
      });
    }

    request.get("kst32b.lff").end( (err, data) =>{
      fontdata = parser.parseLines(data.text.split("\n"));
      update();
    });
  }
};

