webpackJsonp([0],[,,,function(t,n,e){t.exports=e(4)},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e(0),o=e(8);new r.a({el:"#app",render:function(t){return t(o.a)}})},,,,function(t,n,e){"use strict";function r(t){e(9)}var o=e(10),i=e(24),a=e(2),s=r,u=a(o.a,i.a,!1,s,null,null);n.a=u.exports},function(t,n){},function(t,n,e){"use strict";var r=e(11),o=e(13),i=e(0),a=this&&this.__awaiter||function(t,n,e,r){return new(e||(e=Promise))(function(o,i){function a(t){try{u(r.next(t))}catch(t){i(t)}}function s(t){try{u(r.throw(t))}catch(t){i(t)}}function u(t){t.done?o(t.value):new e(function(n){n(t.value)}).then(a,s)}u((r=r.apply(t,n||[])).next())})},s=this&&this.__generator||function(t,n){function e(t){return function(n){return r([t,n])}}function r(e){if(o)throw new TypeError("Generator is already executing.");for(;u;)try{if(o=1,i&&(a=i[2&e[0]?"return":e[0]?"throw":"next"])&&!(a=a.call(i,e[1])).done)return a;switch(i=0,a&&(e=[0,a.value]),e[0]){case 0:case 1:a=e;break;case 4:return u.label++,{value:e[1],done:!1};case 5:u.label++,i=e[1],e=[0];continue;case 7:e=u.ops.pop(),u.trys.pop();continue;default:if(a=u.trys,!(a=a.length>0&&a[a.length-1])&&(6===e[0]||2===e[0])){u=0;continue}if(3===e[0]&&(!a||e[1]>a[0]&&e[1]<a[3])){u.label=e[1];break}if(6===e[0]&&u.label<a[1]){u.label=a[1],a=e;break}if(a&&u.label<a[2]){u.label=a[2],u.ops.push(e);break}a[2]&&u.ops.pop(),u.trys.pop();continue}e=n.call(t,u)}catch(t){e=[6,t],i=0}finally{o=a=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}var o,i,a,s,u={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:e(0),throw:e(1),return:e(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s};n.a=i.a.extend({data:function(){return{fontdata:{},loading:!0,str:"寿限無寿限無五劫の擦\nり切れ海砂利水魚の水\n行末雲来末風来末食う\n寝るところに住むとこ\nろやぶら小路のぶら小\n路パイポパイポパイポ\nのシューリンガン、シ\nューリンガンのグーリ\nンダイ、グーリンダイ\nのポンポコピーのポン\nポコナーの長久命の長\n助\n",fontSize:"80",strokeWidth:1,kerning:"0"}},mounted:function(){return a(this,void 0,void 0,function(){var t,n,e;return s(this,function(o){switch(o.label){case 0:return[4,fetch("kst32b.lff")];case 1:return t=o.sent(),[4,t.text()];case 2:return n=o.sent(),e=r.a(n.split("\n")),this.fontdata=e.reduce(function(t,n){return t[n.letter]=n,t},{}),this.loading=!1,[2]}})})},computed:{lines:function(){return this.str.split("\n")}},methods:{},components:{LineFontString:o.a},watch:{strokeWidth:function(t){document.documentElement.style.setProperty("--stroke-width",t+"px")}}})},function(t,n,e){"use strict";function r(t){var n=[],e=[],r="";return t.forEach(function(t){if(""===t){if(""!==r){var i={letter:r,info:e};n.push(i),e=[],r=""}}else{var a=o.a(t);a&&(r=a);var s=o.b(t);if(4===s.length){var u={x1:parseFloat(s[0]),y1:parseFloat(s[1]),x2:parseFloat(s[2]),y2:parseFloat(s[3])};e.push(u)}}}),n}n.a=r;var o=e(12)},function(t,n,e){"use strict";function r(t){var n=/\[([0-9a-f][0-9a-f][0-9a-f][0-9a-f])\] (.)/,e=n.exec(t);if(e){return e[2]}return""}function o(t){var n=/([0-9.]+),([0-9.]+);([0-9.]+),([0-9.]+)/g,e=n.exec(t);if(e){return[e[1],e[2],e[3],e[4]]}return[]}n.a=r,n.b=o},function(t,n,e){"use strict";function r(t){e(14)}var o=e(15),i=e(23),a=e(2),s=r,u=a(o.a,i.a,!1,s,null,null);n.a=u.exports},function(t,n){},function(t,n,e){"use strict";function r(t){return t.match(/^(\w| |'|,|&)+$/)}var o=e(0),i=e(16);n.a=o.a.extend({props:{str:String,fontdata:Object,fontSize:Number,x:Number,y:Number,kerning:Number},computed:{strAry:function(){for(var t=[],n=0,e=0;e<this.str.length;e++){var o=this.str.charAt(e);t.push({letter:o,offset:n}),n+=r(o)?.5:1}return t},groupPosition:function(){return"translate("+this.x+", "+this.y+")"}},methods:{posX:function(t){return t*(this.fontSize-this.kerning)}},components:{LineFontChar:i.a},mounted:function(){}})},function(t,n,e){"use strict";function r(t){e(17)}var o=e(18),i=e(22),a=e(2),s=r,u=a(o.a,i.a,!1,s,null,null);n.a=u.exports},function(t,n){},function(t,n,e){"use strict";var r=e(0),o=e(19),i=e(21);e.n(i);n.a=r.a.extend({props:{fontdata:Object,fontSize:Number,text:String,x:Number,y:Number},data:function(){return{t:0}},computed:{transform:function(){return"translate("+this.x+", "+this.y+")"},styleObj:function(){return{strokeDashoffset:2e3-2e3*this.t}},lines:function(){var t=o.a();if(this.font){var n={x1:-1,y1:-1,x2:-1,y2:-1},e=this.fontSize/10;this.font.info.forEach(function(r,o){0===o&&t.moveTo(r.x1*e,-1*r.y1*e+10*e),r.x1===n.x2&&r.y1===n.y2||t.moveTo(r.x1*e,-1*r.y1*e+10*e),t.lineTo(r.x2*e,-1*r.y2*e+10*e),n=r})}return t.toString()},font:function(){return this.fontdata?this.fontdata[this.text]:{letter:"",info:[]}}},watch:{fontdata:function(){this.setAnimation()}},mounted:function(){this.setAnimation()},methods:{setAnimation:function(){i({targets:this.$el.querySelectorAll("path"),strokeDashoffset:[2e3,0],easing:"easeInOutSine",duration:6e3,loop:!0,delay:function(t,n){return 100*n}})}}})},,,,function(t,n,e){"use strict";var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("g",{attrs:{transform:t.transform}},[e("path",{staticStyle:{stroke:"#F3A"},attrs:{d:t.lines}}),t._v(" "),e("path",{staticStyle:{stroke:"#3AF"},attrs:{d:t.lines}}),t._v(" "),e("path",{staticStyle:{stroke:"white"},attrs:{d:t.lines}})])},o=[],i={render:r,staticRenderFns:o};n.a=i},function(t,n,e){"use strict";var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("g",{attrs:{transform:t.groupPosition}},t._l(t.strAry,function(n,r){return e("line-font-char",{key:r,attrs:{fontdata:t.fontdata,text:n.letter,x:t.posX(n.offset),y:0,"font-size":t.fontSize}})}))},o=[],i={render:r,staticRenderFns:o};n.a=i},function(t,n,e){"use strict";var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("main",[e("svg",{attrs:{width:"800",height:"800",id:"canvas"}},t._l(t.lines,function(n,r){return e("line-font-string",{key:r,attrs:{str:n,fontdata:t.fontdata,x:0,y:r*(t.fontSize-parseFloat(t.kerning)),"font-size":parseFloat(t.fontSize),kerning:parseFloat(t.kerning)}})})),t._v(" "),t.loading?e("p",[t._v("Loading Fonts...")]):t._e(),t._v(" "),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.str,expression:"str"}],attrs:{cols:"30",rows:"10"},domProps:{value:t.str},on:{input:function(n){n.target.composing||(t.str=n.target.value)}}}),t._v(" "),e("div",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.fontSize,expression:"fontSize"}],attrs:{type:"range"},domProps:{value:t.fontSize},on:{__r:function(n){t.fontSize=n.target.value}}}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.strokeWidth,expression:"strokeWidth"}],attrs:{type:"range"},domProps:{value:t.strokeWidth},on:{__r:function(n){t.strokeWidth=n.target.value}}}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.kerning,expression:"kerning"}],attrs:{type:"range"},domProps:{value:t.kerning},on:{__r:function(n){t.kerning=n.target.value}}})])])},o=[],i={render:r,staticRenderFns:o};n.a=i}],[3]);
//# sourceMappingURL=client.5ca5045c.js.map