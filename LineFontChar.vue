<template>
  <g :transform="transform">
    <path :d="lines" style="stroke: #F3A;" />
    <path :d="lines" style="stroke: #3AF;" />
    <path :d="lines" style="stroke: white;" />
  </g>
</template>
<script lang="ts">
import Vue from "vue";
import * as path from "d3-path";
import * as parser from "./lib/lff/parser";
import { Line } from "./lib/lff/parser";
import * as anime from 'animejs'

export default Vue.extend({
  props: {
    font: Object,
    text: String,
    x: Number,
    y: Number
  },
  data(){
    return {
      t: 0
    }
  },
  computed: {
    transform(): string{
      return `translate(${this.x}, ${this.y})`
    },
    styleObj(): any{
      return {
        strokeDashoffset: 2000 - 2000 * this.t
      }
    },
    lines() {
      const p = path.path();
      if (this.font) {
        let prestroke = {x1:-1, y1: -1 ,x2: -1 ,y2: -1}
        this.font.info.forEach((stroke: parser.Line, index: number) => {
          if(index === 0){
            p.moveTo(stroke.x1 * 10, stroke.y1 * -10 + 100) 
          }
          if(stroke.x1 === prestroke.x2 && stroke.y1 === prestroke.y2)
          {
          }else{
            p.moveTo(stroke.x1 * 10, stroke.y1 * -10 + 100) 
          }
          p.lineTo(stroke.x2 * 10, stroke.y2 * -10 + 100)
          prestroke = stroke
        });
      }

      return p.toString()
    }
  },
  watch: {
    font(){
      console.log("set font")
      var lineDrawing = anime({
        targets: 'path',
        strokeDashoffset: [2000, 0],
        easing: 'easeInOutSine',
        duration: 8000,
        loop: true,
        delay: function(target, index) {
          // 100ms delay multiplied by every div index, in ascending order
          return index * 100;
        },        
      });

    }
  },
  mounted(){
    /*
    setInterval(()=>{
      this.t += 0.001
    }, 10)
    */


  }
});
</script>
<style>
path{
  stroke: black;
  stroke-dasharray: 2000;
  stroke-dashoffset: 1990;
  fill: none;
  stroke-width: 8;
}
</style>

