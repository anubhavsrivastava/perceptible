!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Perceptor",[],t):"object"==typeof exports?exports.Perceptor=t():e.Perceptor=t()}(window,function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var i={threshold:100,scheduler:{mode:"interval",interval:500,attentionMode:!0},viewOffset:{top:0,left:0,right:0,bottom:0},subscribers:[],spectators:[],clickHandler:()=>{}};const r=["subscribers","spectators"],s=["scheduler","viewOffset"],o=e=>Array.isArray(e);const c=document.createElement("div");c.id="dreporter",document.body.appendChild(c),c.style.backgroundColor="#e5e5e5",c.style.width="auto",c.style.position="fixed",c.style.bottom="0",c.style.left="0",c.style.opacity="0.8";const l={},d=(e,t)=>{l[e]||(l[e]=document.createElement("div"),c.appendChild(l[e])),l[e].innerHTML=function(e){return`<pre>${JSON.stringify(e,void 0,4)}</pre>`}(t)};var h=(e,t)=>d(e.element.id,t);const u=function(){return document.documentElement&&document.documentElement.clientHeight?{...a(),height:document.documentElement.clientHeight,width:document.documentElement.clientWidth}:{left:0,right:0,width:0,height:0}},a=function(){return{left:window.pageXOffset,top:window.pageYOffset}},f=function(e){let t=function(e){let t=e.getBoundingClientRect();return{left:t.left,top:t.top,height:t.height,width:t.width}}(e),n=a();return{left:t.left+n.left,top:t.top+n.top,height:t.height,width:t.width}};function p(e){let t=f(e.element),n=u();return b(n,t,e.config)}const b=function(e,t,n){const i=n&&void 0!==n.threshold?n.threshold:100,{viewOffset:r={top:0,left:0,right:0,bottom:0}}=n,s=t.left+t.width,o=t.top+t.height,c=e.left+r.left,l=e.top+r.top,d=c+e.width-r.right,h=l+e.height-r.bottom,u=t.left>=c&&t.left<=d,a=s<=d&&s>=c,f=t.top>=l&&t.top<=h,p=o<=h&&o>l,b={};return((e,t,n,i)=>e&&n||e&&i||t&&n||t&&i)(u,a,f,p)&&(b.left=u?t.left:c,b.right=a?s:d,b.top=f?t.top:l,b.bottom=p?o:h,b.surface=(b.right-b.left)/t.width*(b.bottom-b.top)/t.height*100),{isVisible:b.surface>=i,subView:b}};function g(){return{time:(new Date).getTime()}}function m(e){const{element:t={}}=e;return{element:{id:t.id,tagName:t.tagName}}}function v(e,t,n){let{duration:i=0}=n;return t.isVisible&&n.isVisible&&(i+=e.config.scheduler.interval),{duration:i}}var w=()=>[g,m,p,v];class y{constructor(e){this.chain=e||[],this.prevResult={}}use(e){return this.chain.push(e),this.chain.length-1}eject(e){this.chain[e]&&(this.chain[e]=null)}run(e){const t=this.chain.reduce((t,n)=>(n&&(t=Object.assign(t,n(e,t,this.prevResult))),t),Object.assign({},this.prevResult));return this.prevResult=t,t}}class O{constructor(e){this.chain=e||[]}use(e){return this.chain.push(e),this.chain.length-1}eject(e){this.chain[e]&&(this.chain[e]=null)}dispatch(e,t){this.chain.every(n=>(n&&n(e,t),!0))}}let j,_;void 0!==document.hidden?(j="hidden",_="visibilitychange"):void 0!==document.msHidden?(j="msHidden",_="msvisibilitychange"):void 0!==document.webkitHidden&&(j="webkitHidden",_="webkitvisibilitychange");const x=(e=(()=>{}),t=!0)=>{let n=void 0;document.addEventListener(_,()=>{let t=(()=>!document[j])();n!=t&&(e(t),n=t)}),t&&(window.addEventListener("blur",()=>{0!=n&&(e(!1),n=!1)}),window.addEventListener("focus",()=>{1!=n&&(e(!0),n=!0)}))};class C{constructor(e){const{config:t={interval:500,attentionMode:!0},spectatorChain:n,subscriberChain:i,context:r}=e;this._enabled=!0,this._schedule(t.interval,n,i,r),x(e=>{e&&this._enabled&&!this.handleId?this._schedule(t.interval,n,i,r):this._enabled&&(clearInterval(this.handleId),delete this.handleId)},t.attentionMode)}_schedule(e,t,n,i){this.handleId=setInterval(()=>{const e=t.run(i);return n.dispatch(i,e)},e)}clearSchedule(){clearInterval(this.handleId),delete this.handleId,this._enabled=!1}}class E{constructor(e,t={}){this.element=e,this.config=function(e,t){if(t)for(var n in t)r.includes(n)?(t[n]=o(t[n])?t[n]:[t[n]],e[n]=e[n]||[],e[n]=o(e[n])?e[n]:[e[n]],t[n]=[...e[n],...t[n]]):s.includes(n)&&(e[n]=e[n]||{},t[n]=Object.assign({},e[n],t[n]));return Object.assign({},e,t)}(Object.assign({},i,E.defaults,{subscribers:[h],spectators:w()}),t),this.spectatorChain=new y(this.config.spectators),this.subscriberChain=new O(this.config.subscribers),this.event=this.config.clickHandler?this.config.clickHandler.bind(this,this):()=>{}}watch(){this.scheduler=new C({context:this,subscriberChain:this.subscriberChain,spectatorChain:this.spectatorChain,config:this.config.scheduler}),this.element.addEventListener("click",this.event,!1)}unwatch(){this.scheduler.clearSchedule(),this.element.removeEventListener("click",this.event)}}E.defaults=Object.assign({},i);t.default=E}]).default});
//# sourceMappingURL=bundle.js.map