<template>
  <g>
    <line-font-char v-for="(char, index) in strAry" :key="index" :fontdata="fontdata" :text="char" :x="index * 80" :y="0"></line-font-char>
  </g>
</template>

<script lang="ts">
import Vue from "vue";
import LineFontChar from "./LineFontChar.vue";
import * as parser from "./lib/lff/parser";

export default Vue.extend({
  props: {
    str: String,
    fontdata: Object
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
  mounted() {}
});
</script>

<style>

</style>
