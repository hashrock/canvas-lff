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
    const response = await fetch("kst32b.lff");
    const text = await response.text();
    this.fontdata = parser.parseLines(text.split("\n"));
  },
  components: {
    LineFontChar
  }
});
</script>

