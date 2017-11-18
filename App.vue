<template>
  <main>
    <svg width=500 height=500 id="canvas">
      <line-font-string v-for="(line, index) in lines" :key="index" :str="line" :fontdata="fontdata" :x="0" :y="index * 80"></line-font-string>
    </svg>
    <p v-if="loading">Loading Fonts...</p>
    <textarea v-model="str" cols="30" rows="10"></textarea>
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
</style>

<script lang="ts">
import * as parser from "./lib/lff/parser";
import { Line } from "./lib/lff/parser";
import { clear, drawString } from "./lib/drawfont";
import LineFontString from "./LineFontString.vue";
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      fontdata: {}, //Map<string, parser.Font> or { [key: string]: T; };
      loading: true,
      str: "テストだよ\n全員集合"
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
  }
});
</script>

