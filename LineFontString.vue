<template>
  <g :transform="groupPosition">
    <line-font-char v-for="(char, index) in strAry" :key="index" :fontdata="fontdata" :text="char" :x="index * (fontSize - kerning)" :y="0" :font-size="fontSize"></line-font-char>
  </g>
</template>

<script lang="ts">
import Vue from "vue";
import LineFontChar from "./LineFontChar.vue";
import * as parser from "./lib/lff/parser";

export default Vue.extend({
  props: {
    str: String,
    fontdata: Object,
    fontSize: Number,
    x: Number,
    y: Number,
    kerning: Number
  },
  computed: {
    strAry() {
      let strAry: string[] = [];
      for (let i = 0; i < this.str.length; i++) {
        strAry.push(this.str.charAt(i));
      }
      return strAry;
    },
    groupPosition(): string {
      return `translate(${this.x}, ${this.y})`;
    }
  },
  components: {
    LineFontChar
  },
  mounted() {}
});
</script>

<style>

</style>
