import * as parser from "./lib/lff/parser";
import { Line } from "./lib/lff/parser";
import * as example from "./example"
import { clear, drawChar, drawString } from "./draw"
export default {
  data() {
    return {
    }
  },
  async mounted() {
    const c = <HTMLCanvasElement>document.getElementById("canvas");
    const ctx = <CanvasRenderingContext2D>c.getContext("2d");
    const w = c.offsetWidth;
    const h = c.offsetHeight;

    function rgba(r: number, g: number, b: number, a: number) {
      return "rgba(" + r + ", " + g + ", " + b + "," + a + ")";
    }

    let fontdata: parser.Font[] = [];
    let round = 0;
    let count = 0;
    function update() {
      round += 0.01;
      count += 1;
      clear(ctx, w, h);
      if (fontdata) {
        const left = 20;
        const top = 20;

        const customRenderer = example.custom1;

        const customRenderer2 = example.custom2
        const size = 80;

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

      window.requestAnimationFrame(() => {
        update();
      });
    }
    const response = await fetch("kst32b.lff");
    const text = await response.text()
    fontdata = parser.parseLines(text.split("\n"));
    update();
  }
};

