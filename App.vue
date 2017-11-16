<template>
  <main>
    <canvas width=500 height=500 id="canvas">
    </canvas>
  </main>
</template>
<style>
canvas {
  background: black;
}
body {
  background: #222;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>

<script lang="ts">
import * as parser from "./lib/lff/parser";
import { Line } from "./lib/lff/parser";
import { clear, drawString } from "./lib/drawfont";
export default {
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

        const size = 80;

        drawString(ctx, left, top, size, fontdata, "あいうえお");
        drawString(ctx, left, top + size, size, fontdata, "ABCDE123");
        drawString(ctx, left, top + size * 2, size / 2, fontdata, "漢字も描画可能");
      }

      window.requestAnimationFrame(() => {
        update();
      });
    }
    const response = await fetch("kst32b.lff");
    const text = await response.text();
    fontdata = parser.parseLines(text.split("\n"));
    update();
  }
};
</script>

