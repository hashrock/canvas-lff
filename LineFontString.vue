<template>
  <g :transform="groupPosition">
    <line-font-char v-for="(char, index) in strAry" :key="index" :fontdata="fontdata" :text="char.letter" :x="posX(char.offset)" :y="0" :font-size="fontSize"></line-font-char>
  </g>
</template>

<script lang="ts">
import Vue from "vue";
import LineFontChar from "./LineFontChar.vue";
import * as parser from "./lib/lff/parser";

interface Letter{
  letter: string
  offset: number
}
function isHankaku(str: string) {
  return str.match(/^(\w| |'|,|&)+$/);
}

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
      let strAry: Letter[] = [];
      let offset : number = 0;
      for (let i = 0; i < this.str.length; i++) {
        const letter = this.str.charAt(i)
        strAry.push({
          letter: letter,
          offset: offset
        });
        offset += isHankaku(letter) ? 0.5 : 1
      }
      return strAry;
    },
    groupPosition(): string {
      return `translate(${this.x}, ${this.y})`;
    }
  },
  methods: {
    posX(offset: number){
      return offset * (this.fontSize - this.kerning)
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
