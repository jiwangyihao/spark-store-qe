var j=Object.defineProperty;var x=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,A=Object.prototype.propertyIsEnumerable;var S=(e,n,t)=>n in e?j(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,T=(e,n)=>{for(var t in n||(n={}))k.call(n,t)&&S(e,t,n[t]);if(x)for(var t of x(n))A.call(n,t)&&S(e,t,n[t]);return e};import{d as z,g as D,c as P}from"./dom.c31f685b.js";import{w as F,o as p,f as w,R,g as C,O as h,r as N,k as X,S as O,h as Y}from"./index.7434de75.js";function K(e,n,t){return t<=n?n:Math.min(t,Math.max(n,e))}const q=[null,document,document.body,document.scrollingElement,document.documentElement];function $(e,n){let t=D(n);if(t===void 0){if(e==null)return window;t=e.closest(".scroll,.scroll-y,.overflow-auto")}return q.includes(t)?window:t}function M(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function H(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}function V(e,n,t=0){const o=arguments[3]===void 0?performance.now():arguments[3],i=M(e);if(t<=0){i!==n&&g(e,n);return}requestAnimationFrame(c=>{const r=c-o,a=i+(n-i)/Math.max(r,t)*r;g(e,a),a!==n&&V(e,n,t-r,c)})}function Q(e,n,t=0){const o=arguments[3]===void 0?performance.now():arguments[3],i=H(e);if(t<=0){i!==n&&b(e,n);return}requestAnimationFrame(c=>{const r=c-o,a=i+(n-i)/Math.max(r,t)*r;b(e,a),a!==n&&Q(e,n,t-r,c)})}function g(e,n){if(e===window){window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,n);return}e.scrollTop=n}function b(e,n){if(e===window){window.scrollTo(n,window.pageYOffset||window.scrollY||document.body.scrollTop||0);return}e.scrollLeft=n}function Z(e,n,t){if(t){V(e,n,t);return}g(e,n)}function _(e,n,t){if(t){Q(e,n,t);return}b(e,n)}let v;function ee(){if(v!==void 0)return v;const e=document.createElement("p"),n=document.createElement("div");z(e,{width:"100%",height:"200px"}),z(n,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),n.appendChild(e),document.body.appendChild(n);const t=e.offsetWidth;n.style.overflow="scroll";let o=e.offsetWidth;return t===o&&(o=n.clientWidth),n.remove(),v=t-o,v}const{passive:E}=h,B=["both","horizontal","vertical"];var te=P({name:"QScrollObserver",props:{axis:{type:String,validator:e=>B.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:n}){const t={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let o=null,i,c;F(()=>e.scrollTarget,()=>{l(),a()});function r(){o!==null&&o();const d=Math.max(0,M(i)),m=H(i),u={top:d-t.position.top,left:m-t.position.left};if(e.axis==="vertical"&&u.top===0||e.axis==="horizontal"&&u.left===0)return;const y=Math.abs(u.top)>=Math.abs(u.left)?u.top<0?"up":"down":u.left<0?"left":"right";t.position={top:d,left:m},t.directionChanged=t.direction!==y,t.delta=u,t.directionChanged===!0&&(t.direction=y,t.inflectionPoint=t.position),n("scroll",T({},t))}function a(){i=$(c,e.scrollTarget),i.addEventListener("scroll",s,E),s(!0)}function l(){i!==void 0&&(i.removeEventListener("scroll",s,E),i=void 0)}function s(d){if(d===!0||e.debounce===0||e.debounce==="0")r();else if(o===null){const[m,u]=e.debounce?[setTimeout(r,e.debounce),clearTimeout]:[requestAnimationFrame(r),cancelAnimationFrame];o=()=>{u(m),o=null}}}const f=C();return p(()=>{c=f.proxy.$el.parentNode,a()}),w(()=>{o!==null&&o(),l()}),Object.assign(f.proxy,{trigger:s,getPosition:()=>t}),R}});function I(){const e=N(!X.value);return e.value===!1&&p(()=>{e.value=!0}),e}const W=typeof ResizeObserver!="undefined",L=W===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var ne=P({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:n}){let t=null,o,i={width:-1,height:-1};function c(l){l===!0||e.debounce===0||e.debounce==="0"?r():t===null&&(t=setTimeout(r,e.debounce))}function r(){if(clearTimeout(t),t=null,o){const{offsetWidth:l,offsetHeight:s}=o;(l!==i.width||s!==i.height)&&(i={width:l,height:s},n("resize",i))}}const a=C();if(Object.assign(a.proxy,{trigger:c}),W===!0){let l;return p(()=>{O(()=>{o=a.proxy.$el.parentNode,o&&(l=new ResizeObserver(c),l.observe(o),r())})}),w(()=>{clearTimeout(t),l!==void 0&&(l.disconnect!==void 0?l.disconnect():o&&l.unobserve(o))}),R}else{let f=function(){clearTimeout(t),s!==void 0&&(s.removeEventListener!==void 0&&s.removeEventListener("resize",c,h.passive),s=void 0)},d=function(){f(),o&&o.contentDocument&&(s=o.contentDocument.defaultView,s.addEventListener("resize",c,h.passive),r())};const l=I();let s;return p(()=>{O(()=>{o=a.proxy.$el,o&&d()})}),w(f),()=>{if(l.value===!0)return Y("object",{style:L.style,tabindex:-1,type:"text/html",data:L.url,"aria-hidden":"true",onLoad:d})}}}});export{te as Q,ne as a,K as b,_ as c,ee as g,Z as s};