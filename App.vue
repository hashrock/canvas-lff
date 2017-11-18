<template>
  <main>
    <svg width=800 height=800 id="canvas">
      <line-font-string v-for="(line, index) in lines" :key="index" :str="line" :fontdata="fontdata" :x="0" :y="index * (fontSize - parseFloat(kerning))" :font-size="parseFloat(fontSize)" :kerning="parseFloat(kerning)"></line-font-string>
    </svg>
    <p v-if="loading">Loading Fonts...</p>
    <textarea v-model="str" cols="30" rows="10"></textarea>
    <div>
      <input type="range" v-model="fontSize">
      <input type="range" v-model="strokeWidth">
      <input type="range" v-model="kerning">
    </div>
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
svg {
  background: black;
}
line {
  stroke: black;
}
main {
  display: flex;
  flex-direction: column;
}
textarea{
  background: black;
  color: white;
}
:root{
  --stroke-width: 1px;
}
path {
  stroke-width: var(--stroke-width);
}
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background-color: black;
  height: 2px;
  width: 100%;
  border-radius: 6px;
}

</style>

<script lang="ts">
import * as parser from "./lib/lff/parser";
import { Line } from "./lib/lff/parser";
import { clear, drawString } from "./lib/drawfont";
import LineFontString from "./LineFontString.vue";
import Vue from "vue";

let example = `寿限無寿限無五劫の擦
り切れ海砂利水魚の水
行末雲来末風来末食う
寝るところに住むとこ
ろやぶら小路のぶら小
路パイポパイポパイポ
のシューリンガン、シ
ューリンガンのグーリ
ンダイ、グーリンダイ
のポンポコピーのポン
ポコナーの長久命の長
助
`

export default Vue.extend({
  data() {
    return {
      fontdata: {}, //Map<string, parser.Font> or { [key: string]: T; };
      loading: true,
      str: example,
      fontSize: "80",
      strokeWidth: 1,
      kerning: "0"
    };
  },
  async mounted() {
    const response = await fetch("kst32b.lff");
    const text = await response.text();

    const fontArray = parser.parseLines(text.split("\n"));
    this.fontdata = fontArray.reduce(function(map: any, obj) {
      map[obj.letter] = obj;
      return map;
    }, {});

    this.loading = false;
  },
  computed:{
    lines(): string[]{
      return this.str.split("\n")
    }
  },
  methods: {},
  components: {
    LineFontString
  },
  watch: {
    strokeWidth(val){
      document.documentElement.style.setProperty('--stroke-width', val + "px");
    }
  }
});
</script>

