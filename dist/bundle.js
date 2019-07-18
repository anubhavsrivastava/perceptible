!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("Perceptor",[],e):"object"==typeof exports?exports.Perceptor=e():t.Perceptor=e()}(window,function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var i={threshold:100,watchMode:"interval",watchInterval:500,subscribers:[],spectators:[],clickHandler:()=>{}};const r=["subscribers","spectators"],s=["watch"],o=t=>Array.isArray(t);const c=document.createElement("div");c.id="dreporter",document.body.appendChild(c),c.style.backgroundColor="#e5e5e5",c.style.width="auto",c.style.position="fixed",c.style.bottom="0",c.style.left="0";var u=(t,e)=>{c.innerHTML=function(t){return`<pre>${JSON.stringify(t,void 0,4)}</pre>`}(e)};const l=function(){return document.documentElement&&document.documentElement.clientHeight?{...h(),height:document.documentElement.clientHeight,width:document.documentElement.clientWidth}:{left:0,right:0,width:0,height:0}},h=function(){return{left:window.pageXOffset,top:window.pageYOffset}},a=function(t){let e=function(t){let e=t.getBoundingClientRect();return{left:e.left,top:e.top,height:e.height,width:e.width}}(t),n=h();return{left:e.left+n.left,top:e.top+n.top,height:e.height,width:e.width}};function d(t){let e=a(t.element),n=l();return f(n,e,t.config)}const f=function(t,e,n){const i=n&&void 0!==n.threshold?n.threshold:100,r=e.left+e.width,s=t.left+t.width,o=e.top+e.height,c=t.top+t.height,u=e.left>=t.left&&e.left<=s,l=r<=s&&r>=t.left,h=e.top>=t.top&&e.top<=c,a=o<=c&&o>t.top,d={};return((t,e,n,i)=>t&&n||t&&i||e&&n||e&&i)(u,l,h,a)&&(d.left=u?e.left:t.left,d.right=l?r:s,d.top=h?e.top:t.top,d.bottom=a?o:c,d.surface=(d.right-d.left)/e.width*(d.bottom-d.top)/e.height*100),{isVisible:d.surface>=i,subView:d}};function p(){return{time:(new Date).getTime()}}function b(t){const{element:e={}}=t;return{element:{id:e.id,tagName:e.tagName}}}function g(t,e,n){let{duration:i=0}=n;return e.isVisible&&n.isVisible&&(i+=e.time-n.time),{duration:i}}var m=()=>[p,b,d,g];class v{constructor(t){this.chain=t||[],this.prevResult={}}use(t){return this.chain.push(t),this.chain.length-1}eject(t){this.chain[t]&&(this.chain[t]=null)}run(t){const e=this.chain.reduce((e,n)=>(n&&(e=Object.assign(e,n(t,e,this.prevResult))),e),Object.assign({},this.prevResult));return this.prevResult=e,e}}class w{constructor(t){this.chain=t||[]}use(t){return this.chain.push(t),this.chain.length-1}eject(t){this.chain[t]&&(this.chain[t]=null)}dispatch(t,e){this.chain.every(n=>(n&&n(t,e),!0))}}class y{constructor(t){const{interval:e=500,spectatorChain:n,subscriberChain:i,context:r}=t;this.handleId=setInterval(()=>{const t=n.run(r);return i.dispatch(r,t)},e)}clearSchedule(){clearInterval(this.handleId)}}class j{constructor(t,e={}){this.element=t,this.config=function(t,e){if(e)for(var n in e)console.log(n),r.includes(n)?(e[n]=o(e[n])?e[n]:[e[n]],t[n]=t[n]||[],t[n]=o(t[n])?t[n]:[t[n]],e[n]=[...t[n],...e[n]]):s.includes(n)&&(t[n]=t[n]||{},e[n]=Object.assign({},t[n],e[n]));return Object.assign({},t,e)}(Object.assign({},i,j.defaults,{subscribers:[u],spectators:m()}),e),this.spectatorChain=new v(this.config.spectators),this.subscriberChain=new w(this.config.subscribers),this.event=this.config.clickHandler?this.config.clickHandler.bind(this,this):()=>{}}watch(){this.scheduler=new y({context:this,subscriberChain:this.subscriberChain,spectatorChain:this.spectatorChain,interval:this.config.watchInterval}),this.element.addEventListener("click",this.event,!1)}unwatch(){this.scheduler.clearSchedule(),this.element.removeEventListener("click",this.event)}}j.defaults=Object.assign({},i);e.default=j}]).default});
//# sourceMappingURL=bundle.js.map