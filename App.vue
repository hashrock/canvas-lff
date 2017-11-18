<template>
  <main>
    <svg width=500 height=500 id="canvas">
      <line-font-string :str="str" :fontdata="fontdata"></line-font-string>
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
svg{
  background: black;
}
line{
  stroke: black;
}
main{
  display: flex;
  flex-direction: column;
}
</style>

<script lang="ts">
import * as parser from "./lib/lff/parser";
import { Line } from "./lib/lff/parser";
import { clear, drawString } from "./lib/drawfont";
import LineFontString from "./LineFontString.vue"
import Vue from "vue"

export default Vue.extend({
  data(){
    return {
      fontdata: <parser.Font[]>[],
      loading: true,
      str: "テストだよ～"
    }
  },
  async mounted() {
    const response = await fetch("kst32b.lff");
    const text = await response.text();
    this.fontdata = parser.parseLines(text.split("\n"));
    this.loading = false
  },
  methods: {

  },
  components: {
    LineFontString
  }
});
</script>

