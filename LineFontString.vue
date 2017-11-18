<template>
  <g>
    <line-font-char v-for="(char, index) in strAry" :key="index" :font="findFont(char)" :text="char" :x="index * 80" :y="0"></line-font-char>
  </g>
</template>

<script lang="ts">
import Vue from "vue";
import LineFontChar from "./LineFontChar.vue";
import * as parser from "./lib/lff/parser";

export default Vue.extend({
  props: {
    str: String,
    fontdata: Array
  },
  computed: {
    strAry() {
      let strAry: string[] = [];
      for (let i = 0; i < this.str.length; i++) {
        strAry.push(this.str.charAt(i));
      }
      return strAry;
    }
  },
  components: {
    LineFontChar
  },
  methods: {
    findFont(char: string): parser.Font {
      let cfont;

      //find
      for (let i = 0; i < this.fontdata.length; i++) {
        if (this.fontdata[i].letter === char) {
          cfont = this.fontdata[i];
          break;
        }
      }
      return cfont;
    }
  },
  mounted() {}
});
</script>

<style>

</style>
