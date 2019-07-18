!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("Perceptor",[],e):"object"==typeof exports?exports.Perceptor=e():t.Perceptor=e()}(window,function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var i={threshold:100,watchMode:"interval",watchInterval:500,subscribers:[],spectators:[],clickHandler:()=>{}};const r=["subscribers","spectators"],s=["watch"],c=t=>Array.isArray(t);const o=document.createElement("div");o.id="dreporter",document.body.appendChild(o),o.style.backgroundColor="#e5e5e5",o.style.width="auto",o.style.position="fixed",o.style.bottom="0",o.style.left="0";var l=(t,e)=>{o.innerHTML=function(t){return`<pre>${JSON.stringify(t,void 0,4)}</pre>`}(e)};const h=function(){return document.documentElement&&document.documentElement.clientHeight?{...u(),height:document.documentElement.clientHeight,width:document.documentElement.clientWidth}:{left:0,right:0,width:0,height:0}},u=function(){return{left:window.pageXOffset,top:window.pageYOffset}},d=function(t){let e=function(t){let e=t.getBoundingClientRect();return{left:e.left,top:e.top,height:e.height,width:e.width}}(t),n=u();return{left:e.left+n.left,top:e.top+n.top,height:e.height,width:e.width}};function a(t){let e=d(t.element),n=h();return f(n,e,t.config)}const f=function(t,e,n){const i=n&&void 0!==n.threshold?n.threshold:100,r=e.left+e.width,s=t.left+t.width,c=e.top+e.height,o=t.top+t.height,l=e.left>=t.left&&e.left<=s,h=r<=s&&r>=t.left,u=e.top>=t.top&&e.top<=o,d=c<=o&&c>t.top,a={};return((t,e,n,i)=>t&&n||t&&i||e&&n||e&&i)(l,h,u,d)&&(a.left=l?e.left:t.left,a.right=h?r:s,a.top=u?e.top:t.top,a.bottom=d?c:o,a.surface=(a.right-a.left)/e.width*(a.bottom-a.top)/e.height*100),{isVisible:a.surface>=i,subView:a}};function p(){return{time:(new Date).getTime()}}function b(t){const{element:e={}}=t;return{element:{id:e.id,tagName:e.tagName}}}function m(t,e,n){let{duration:i=0}=n;return e.isVisible&&n.isVisible&&(i+=e.time-n.time),{duration:i}}var g=()=>[p,b,a,m];class v{constructor(t){this.chain=t||[],this.prevResult={}}use(t){return this.chain.push(t),this.chain.length-1}eject(t){this.chain[t]&&(this.chain[t]=null)}run(t){const e=this.chain.reduce((e,n)=>(n&&(e=Object.assign(e,n(t,e,this.prevResult))),e),Object.assign({},this.prevResult));return this.prevResult=e,e}}class w{constructor(t){this.chain=t||[]}use(t){return this.chain.push(t),this.chain.length-1}eject(t){this.chain[t]&&(this.chain[t]=null)}dispatch(t,e){this.chain.every(n=>(n&&n(t,e),!0))}}let y,j;void 0!==document.hidden?(y="hidden",j="visibilitychange"):void 0!==document.msHidden?(y="msHidden",j="msvisibilitychange"):void 0!==document.webkitHidden&&(y="webkitHidden",j="webkitvisibilitychange"),document[y];const O=(t=(()=>{}))=>{document.addEventListener(j,t,!1)},_=()=>!document[y];class x{constructor(t){const{interval:e=500,spectatorChain:n,subscriberChain:i,context:r}=t;this._enabled=!0,this._schedule(e,n,i,r),O(()=>{this._schedule(e,n,i,r)})}_schedule(t,e,n,i){_()&&this._enabled?this.handleId=setInterval(()=>{const t=e.run(i);return n.dispatch(i,t)},t):this._enabled&&clearInterval(this.handleId)}clearSchedule(){clearInterval(this.handleId),this._enabled=!1}}class C{constructor(t,e={}){this.element=t,this.config=function(t,e){if(e)for(var n in e)console.log(n),r.includes(n)?(e[n]=c(e[n])?e[n]:[e[n]],t[n]=t[n]||[],t[n]=c(t[n])?t[n]:[t[n]],e[n]=[...t[n],...e[n]]):s.includes(n)&&(t[n]=t[n]||{},e[n]=Object.assign({},t[n],e[n]));return Object.assign({},t,e)}(Object.assign({},i,C.defaults,{subscribers:[l],spectators:g()}),e),this.spectatorChain=new v(this.config.spectators),this.subscriberChain=new w(this.config.subscribers),this.event=this.config.clickHandler?this.config.clickHandler.bind(this,this):()=>{}}watch(){this.scheduler=new x({context:this,subscriberChain:this.subscriberChain,spectatorChain:this.spectatorChain,interval:this.config.watchInterval}),this.element.addEventListener("click",this.event,!1)}unwatch(){this.scheduler.clearSchedule(),this.element.removeEventListener("click",this.event)}}C.defaults=Object.assign({},i);e.default=C}]).default});
//# sourceMappingURL=bundle.js.map