<template>
  <main>
    <svg width=500 height=500 id="canvas">
      <line-font-char :font="fontdata" text="う" :x="0" :y="0"></line-font-char>
      <line-font-char :font="fontdata" text="ー" :x="80" :y="0"></line-font-char>
      <line-font-char :font="fontdata" text="ん" :x="160" :y="0"></line-font-char>
      <line-font-char :font="fontdata" text="眠" :x="0" :y="80"></line-font-char>
      <line-font-char :font="fontdata" text="い" :x="80" :y="80"></line-font-char>
      <line-font-char :font="fontdata" text="ぞ" :x="160" :y="80"></line-font-char>
    </svg>
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
svg{
  background: black;
}
line{
  stroke: black;
}
</style>

<script lang="ts">
import * as parser from "./lib/lff/parser";
import { Line } from "./lib/lff/parser";
import { clear, drawString } from "./lib/drawfont";
import LineFontChar from "./LineFontChar.vue"
import Vue from "vue"

export default Vue.extend({
  data(){
    return {
      fontdata: <parser.Font[]>[]
    }
  },
  async mounted() {
    /*
    const c = <HTMLCanvasElement>document.getElementById("canvas");
    const ctx = <CanvasRenderingContext2D>c.getContext("2d");
    const w = c.offsetWidth;
    const h = c.offsetHeight;
    */

    function rgba(r: number, g: number, b: number, a: number) {
      return "rgba(" + r + ", " + g + ", " + b + "," + a + ")";
    }

    let round = 0;
    let count = 0;
    /*
    function update() {
      round += 0.01;
      count += 1;
      clear(ctx, w, h);
      if (fontdata) {
        const left = 20;
        const top = 20;

        const size = 80;
        ctx.strokeStyle= "white"

        drawString(ctx, left, top, size, fontdata, "あいうえお");
        drawString(ctx, left, top + size, size, fontdata, "ABCDE123");
        drawString(ctx, left, top + size * 2, size / 2, fontdata, "漢字も描画可能");
      }

      window.requestAnimationFrame(() => {
        update();
      });
    }
    */
    const response = await fetch("kst32b.lff");
    const text = await response.text();
    this.fontdata = parser.parseLines(text.split("\n"));
    //update();
  },
  components: {
    LineFontChar
  }
});
</script>

