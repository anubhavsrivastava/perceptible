!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Perceptor",[],t):"object"==typeof exports?exports.Perceptor=t():e.Perceptor=t()}(window,function(){return function(e){var t={};function i(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";i.r(t);var n={threshold:100,scheduler:{mode:"interval",interval:500,attentionMode:!0},viewOffset:{top:0,left:0,right:0,bottom:0},subscribers:[],spectators:[],clickHandler:()=>{}};const r=["subscribers","spectators"],s=["scheduler","viewOffset"],o=e=>Array.isArray(e);const c=document.createElement("div");c.id="dreporter",document.body.appendChild(c),c.style.backgroundColor="#e5e5e5",c.style.width="auto",c.style.position="fixed",c.style.bottom="0",c.style.left="0",c.style.opacity="0.8";const l={},h=(e,t)=>{l[e]||(l[e]=document.createElement("div"),c.appendChild(l[e])),l[e].innerHTML=function(e){return`<pre>${JSON.stringify(e,void 0,4)}</pre>`}(t)};var d=(e,t)=>h(e.element.id,t);const u=function(){return document.documentElement&&document.documentElement.clientHeight?{...a(),height:document.documentElement.clientHeight,width:document.documentElement.clientWidth}:{left:0,right:0,width:0,height:0}},a=function(){return{left:window.pageXOffset,top:window.pageYOffset}},f=function(e){let t=function(e){let t=e.getBoundingClientRect();return{left:t.left,top:t.top,height:t.height,width:t.width}}(e),i=a();return{left:t.left+i.left,top:t.top+i.top,height:t.height,width:t.width}};function p(e){let t=f(e.element),i=u();return b(i,t,e.config)}const b=function(e,t,i){const n=i&&void 0!==i.threshold?i.threshold:100,{viewOffset:r={top:0,left:0,right:0,bottom:0}}=i,s=t.left+t.width,o=t.top+t.height,c=e.left+r.left,l=e.top+r.top,h=c+e.width-r.right,d=l+e.height-r.bottom,u=t.left>=c&&t.left<=h,a=s<=h&&s>=c,f=t.top>=l&&t.top<=d,p=o<=d&&o>l,b={};return((e,t,i,n)=>e&&i||e&&n||t&&i||t&&n)(u,a,f,p)&&(b.left=u?t.left:c,b.right=a?s:h,b.top=f?t.top:l,b.bottom=p?o:d,b.surface=(b.right-b.left)/t.width*(b.bottom-b.top)/t.height*100),{isVisible:b.surface>=n,subView:b}};function g(){return{time:(new Date).getTime()}}function m(e){const{element:t={}}=e;return{element:{id:t.id,tagName:t.tagName}}}function v(e,t,i){let{duration:n=0}=i;return t.isVisible&&i.isVisible&&(n+=e.config.scheduler.interval),{duration:n}}var w=()=>[g,m,p,v];class y{constructor(e){this.chain=e||[],this.prevResult={}}use(e){return this.chain.push(e),this.chain.length-1}eject(e){this.chain[e]&&(this.chain[e]=null)}run(e){const t=this.chain.reduce((t,i)=>(i&&(t=Object.assign(t,i(e,t,this.prevResult))),t),Object.assign({},this.prevResult));return this.prevResult=t,t}}class O{constructor(e){this.chain=e||[]}use(e){return this.chain.push(e),this.chain.length-1}eject(e){this.chain[e]&&(this.chain[e]=null)}dispatch(e,t){this.chain.every(i=>(i&&i(e,t),!0))}}let j,_;void 0!==document.hidden?(j="hidden",_="visibilitychange"):void 0!==document.msHidden?(j="msHidden",_="msvisibilitychange"):void 0!==document.webkitHidden&&(j="webkitHidden",_="webkitvisibilitychange");const x=(e=(()=>{}),t=!0)=>{let i=void 0;document.addEventListener(_,()=>{let t=(()=>!document[j])();i!=t&&(e(t),i=t)}),t&&(window.addEventListener("blur",()=>{0!=i&&(e(!1),i=!1)}),window.addEventListener("focus",()=>{1!=i&&(e(!0),i=!0)}))};class C{constructor(e){const{config:t={interval:500,attentionMode:!0},spectatorChain:i,subscriberChain:n,context:r}=e;this._enabled=!0,this._schedule(t.interval,i,n,r),x(e=>{e&&this._enabled&&!this.handleId?this._schedule(t.interval,i,n,r):this._enabled&&(clearInterval(this.handleId),delete this.handleId)},t.attentionMode)}_schedule(e,t,i,n){this.handleId=setInterval(()=>{const e=t.run(n);return i.dispatch(n,e)},e)}clearSchedule(){clearInterval(this.handleId),delete this.handleId,this._enabled=!1}}class E{constructor(e,t={}){this.element=e,this.config=function(e,t){if(t)for(var i in t)r.includes(i)?(t[i]=o(t[i])?t[i]:[t[i]],e[i]=e[i]||[],e[i]=o(e[i])?e[i]:[e[i]],t[i]=[...e[i],...t[i]]):s.includes(i)&&(e[i]=e[i]||{},t[i]=Object.assign({},e[i],t[i]));return Object.assign({},e,t)}(Object.assign({},n,E.defaults,{subscribers:[d],spectators:w()}),t),this.spectatorChain=new y(this.config.spectators),this.subscriberChain=new O(this.config.subscribers),this.event=this.config.clickHandler?this.config.clickHandler.bind(this,this):()=>{}}watch(){return this.scheduler||(this.scheduler=new C({context:this,subscriberChain:this.subscriberChain,spectatorChain:this.spectatorChain,config:this.config.scheduler}),this.element.addEventListener("click",this.event,!1)),this}unwatch(){return this.scheduler&&(this.scheduler.clearSchedule(),delete this.scheduler,this.element.removeEventListener("click",this.event)),this}}E.defaults=Object.assign({},n);t.default=E}]).default});
//# sourceMappingURL=bundle.js.map