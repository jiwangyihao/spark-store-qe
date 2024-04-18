import{k as T,i as ne,m as L,c as b,W as Y,h as t,Q as le,n as E,X as Z,p as oe,g as ee,Y as re,Z as ce,r as p,w as k,$ as ue,a0 as de,l as me,o as ve,a1 as fe,a2 as j,a3 as R,a4 as ge,a5 as he,d as _e,A as q,G as W,D as f,C as i,f as _,a6 as K,V as A,L as I,H as G,B as Q,E as V,F as z,M as be,a7 as xe,I as ye,J as we,K as pe,_ as qe}from"./index-C7NnRKns.js";import{u as Se,a as Ce}from"./use-dark-aEGLaow-.js";import{a as D,b as F,s as U,c as ke}from"./scroll-Cc_Qv8yh.js";import{Q as Qe}from"./QScrollArea-CHPm9oEQ.js";import{u as Te,Q as Be}from"./use-meta-BIvYY-ex.js";import{F as De}from"./FooterView-CEWvkuFX.js";import{api as J}from"./api-DAmkVPjC.js";import"./QResizeObserver-498hprzj.js";import"./selection-DuwtZAYQ.js";const Ee=T({name:"QTimelineEntry",props:{heading:Boolean,tag:{type:String,default:"h3"},side:{type:String,default:"right",validator:e=>["left","right"].includes(e)},icon:String,avatar:String,color:String,title:String,subtitle:String,body:String},setup(e,{slots:n}){const c=ne(Z,L);if(c===L)return console.error("QTimelineEntry needs to be child of QTimeline"),L;const u=b(()=>`q-timeline__entry q-timeline__entry--${e.side}`+(e.icon!==void 0||e.avatar!==void 0?" q-timeline__entry--icon":"")),o=b(()=>`q-timeline__dot text-${e.color||c.color}`),v=b(()=>c.layout==="comfortable"&&c.side==="left");return()=>{const g=Y(n.default,[]);if(e.body!==void 0&&g.unshift(e.body),e.heading===!0){const s=[t("div"),t("div"),t(e.tag,{class:"q-timeline__heading-title"},g)];return t("div",{class:"q-timeline__heading"},v.value===!0?s.reverse():s)}let m;e.icon!==void 0?m=[t(le,{class:"row items-center justify-center",name:e.icon})]:e.avatar!==void 0&&(m=[t("img",{class:"q-timeline__dot-img",src:e.avatar})]);const a=[t("div",{class:"q-timeline__subtitle"},[t("span",{},E(n.subtitle,[e.subtitle]))]),t("div",{class:o.value},m),t("div",{class:"q-timeline__content"},[t("h6",{class:"q-timeline__title"},E(n.title,[e.title]))].concat(g))];return t("li",{class:u.value},v.value===!0?a.reverse():a)}}}),He=T({name:"QTimeline",props:{...Se,color:{type:String,default:"primary"},side:{type:String,default:"right",validator:e=>["left","right"].includes(e)},layout:{type:String,default:"dense",validator:e=>["dense","comfortable","loose"].includes(e)}},setup(e,{slots:n}){const c=ee(),u=Ce(e,c.proxy.$q);oe(Z,e);const o=b(()=>`q-timeline q-timeline--${e.layout} q-timeline--${e.layout}--${e.side}`+(u.value===!0?" q-timeline--dark":""));return()=>t("ul",{class:o.value},E(n.default))}}),$e=[t("circle",{cx:"15",cy:"15",r:"15"},[t("animate",{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}),t("animate",{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"})]),t("circle",{cx:"60",cy:"15",r:"9","fill-opacity":".3"},[t("animate",{attributeName:"r",from:"9",to:"9",begin:"0s",dur:"0.8s",values:"9;15;9",calcMode:"linear",repeatCount:"indefinite"}),t("animate",{attributeName:"fill-opacity",from:".5",to:".5",begin:"0s",dur:"0.8s",values:".5;1;.5",calcMode:"linear",repeatCount:"indefinite"})]),t("circle",{cx:"105",cy:"15",r:"15"},[t("animate",{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}),t("animate",{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"})])],Me=T({name:"QSpinnerDots",props:re,setup(e){const{cSize:n,classes:c}=ce(e);return()=>t("svg",{class:c.value,fill:"currentColor",width:n.value,height:n.value,viewBox:"0 0 120 30",xmlns:"http://www.w3.org/2000/svg"},$e)}}),{passive:S}=fe,Ne=T({name:"QInfiniteScroll",props:{offset:{type:Number,default:500},debounce:{type:[String,Number],default:100},scrollTarget:{default:void 0},initialIndex:Number,disable:Boolean,reverse:Boolean},emits:["load"],setup(e,{slots:n,emit:c}){const u=p(!1),o=p(!0),v=p(null),g=p(null);let m=e.initialIndex||0,a,s;const l=b(()=>"q-infinite-scroll__loading"+(u.value===!0?"":" invisible"));function d(){if(e.disable===!0||u.value===!0||o.value===!1)return;const r=D(a),y=F(a),C=R(a);e.reverse===!1?Math.round(y+C+e.offset)>=Math.round(r)&&h():Math.round(y)<=e.offset&&h()}function h(){if(e.disable===!0||u.value===!0||o.value===!1)return;m++,u.value=!0;const r=D(a);c("load",m,y=>{o.value===!0&&(u.value=!1,j(()=>{if(e.reverse===!0){const C=D(a),se=F(a),ie=C-r;U(a,se+ie)}y===!0?H():v.value&&v.value.closest("body")&&s()}))})}function x(){m=0}function B(){o.value===!1&&(o.value=!0,a.addEventListener("scroll",s,S)),d()}function H(){o.value===!0&&(o.value=!1,u.value=!1,a.removeEventListener("scroll",s,S),s!==void 0&&s.cancel!==void 0&&s.cancel())}function $(){if(a&&o.value===!0&&a.removeEventListener("scroll",s,S),a=ke(v.value,e.scrollTarget),o.value===!0){if(a.addEventListener("scroll",s,S),e.reverse===!0){const r=D(a),y=R(a);U(a,r-y)}d()}}function te(r){m=r}function O(r){r=parseInt(r,10);const y=s;s=r<=0?d:ge(d,isNaN(r)===!0?100:r),a&&o.value===!0&&(y!==void 0&&a.removeEventListener("scroll",y,S),a.addEventListener("scroll",s,S))}function M(r){if(N.value===!0){if(g.value===null){r!==!0&&j(()=>{M(!0)});return}const y=`${u.value===!0?"un":""}pauseAnimations`;Array.from(g.value.getElementsByTagName("svg")).forEach(C=>{C[y]()})}}const N=b(()=>e.disable!==!0&&o.value===!0);k([u,N],()=>{M()}),k(()=>e.disable,r=>{r===!0?H():B()}),k(()=>e.reverse,()=>{u.value===!1&&o.value===!0&&d()}),k(()=>e.scrollTarget,$),k(()=>e.debounce,O);let P=!1;ue(()=>{P!==!1&&a&&U(a,P)}),de(()=>{P=a?F(a):!1}),me(()=>{o.value===!0&&a.removeEventListener("scroll",s,S)}),ve(()=>{O(e.debounce),$(),u.value===!1&&M()});const ae=ee();return Object.assign(ae.proxy,{poll:()=>{s!==void 0&&s()},trigger:h,stop:H,reset:x,resume:B,setIndex:te,updateScrollTarget:$}),()=>{const r=Y(n.default,[]);return N.value===!0&&r[e.reverse===!1?"push":"unshift"](t("div",{ref:g,class:l.value},E(n.loading))),t("div",{class:"q-infinite-scroll",ref:v},r)}}}),X=T({name:"QChatMessage",props:{sent:Boolean,label:String,bgColor:String,textColor:String,name:String,avatar:String,text:Array,stamp:String,size:String,labelHtml:Boolean,nameHtml:Boolean,textHtml:Boolean,stampHtml:Boolean},setup(e,{slots:n}){const c=b(()=>e.sent===!0?"sent":"received"),u=b(()=>`q-message-text-content q-message-text-content--${c.value}`+(e.textColor!==void 0?` text-${e.textColor}`:"")),o=b(()=>`q-message-text q-message-text--${c.value}`+(e.bgColor!==void 0?` text-${e.bgColor}`:"")),v=b(()=>"q-message-container row items-end no-wrap"+(e.sent===!0?" reverse":"")),g=b(()=>e.size!==void 0?`col-${e.size}`:""),m=b(()=>({msg:e.textHtml===!0?"innerHTML":"textContent",stamp:e.stampHtml===!0?"innerHTML":"textContent",name:e.nameHtml===!0?"innerHTML":"textContent",label:e.labelHtml===!0?"innerHTML":"textContent"}));function a(l){return n.stamp!==void 0?[l,t("div",{class:"q-message-stamp"},n.stamp())]:e.stamp?[l,t("div",{class:"q-message-stamp",[m.value.stamp]:e.stamp})]:[l]}function s(l,d){const h=d===!0?l.length>1?x=>x:x=>t("div",[x]):x=>t("div",{[m.value.msg]:x});return l.map((x,B)=>t("div",{key:B,class:o.value},[t("div",{class:u.value},a(h(x)))]))}return()=>{const l=[];n.avatar!==void 0?l.push(n.avatar()):e.avatar!==void 0&&l.push(t("img",{class:`q-message-avatar q-message-avatar--${c.value}`,src:e.avatar,"aria-hidden":"true"}));const d=[];n.name!==void 0?d.push(t("div",{class:`q-message-name q-message-name--${c.value}`},n.name())):e.name!==void 0&&d.push(t("div",{class:`q-message-name q-message-name--${c.value}`,[m.value.name]:e.name})),n.default!==void 0?d.push(s(he(n.default()),!0)):e.text!==void 0&&d.push(s(e.text)),l.push(t("div",{class:g.value},d));const h=[];return n.label!==void 0?h.push(t("div",{class:"q-message-label"},n.label())):e.label!==void 0&&h.push(t("div",{class:"q-message-label",[m.value.label]:e.label})),h.push(t("div",{class:v.value},l)),t("div",{class:`q-message q-message-${c.value}`},h)}}}),Pe="/spark-store-qe/assets/favicon-96x96-BB0Q9LsV.png",Le="/spark-store-qe/assets/download-debian-BLxzVrPQ.png",w=e=>(we("data-v-6dad3384"),e=e(),pe(),e),Ae=w(()=>i("h1",null,"下载",-1)),Ie=w(()=>i("h2",null,"DOWNLOADS",-1)),Ve={class:"row",style:{width:"76vw"}},ze={class:"row",style:{"flex-grow":"1",padding:"4vmin"}},Fe={class:"row downCard"},Ue=w(()=>i("img",{src:Pe,alt:""},null,-1)),je={class:"row",style:{"flex-direction":"column","align-items":"flex-start","margin-left":"2vmin"}},Oe=w(()=>i("h3",null,"软件本体",-1)),Re={class:"row"},We={class:"row",style:{"flex-grow":"1",padding:"4vmin"}},Ke={class:"row downCard"},Ge=w(()=>i("img",{src:Le,alt:""},null,-1)),Je={class:"row",style:{"flex-direction":"column","align-items":"flex-start","margin-left":"2vmin"}},Xe=w(()=>i("h3",null,"依赖包(Ubuntu 20.04/Debian 11)",-1)),Ye={class:"row"},Ze=w(()=>i("span",null,"最新版本 5.4.20",-1)),et={style:{"max-width":"600px"}},tt={style:{"padding-inline-start":"0","word-break":"break-word"}},at={key:0,class:"text-center text-grey"},st={class:"row justify-center q-my-md"},it=w(()=>i("div",{class:"logoPanel"},null,-1)),nt={class:"contentPanel"},lt=w(()=>i("h3",null,"安装说明 Q&A",-1)),ot=w(()=>i("div",{class:"avatar"},"Q",-1)),rt=w(()=>i("div",{class:"avatar"},"A",-1)),ct=_e({__name:"DownloadPage",setup(e){Te({title:"下载",titleTemplate:a=>`${a} - 星火应用商店`,meta:{description:{name:"description",content:"星火应用商店spark store官方下载"},keywords:{name:"keywords",content:"spark store,星火应用商店,星火商店,星火应用商店下载,星火商店下载,deepin应用商店,uos,ubuntu,deepin"},equiv:{"http-equiv":"Content-Type",content:"text/html; charset=UTF-8"}}});const n=p(!1),c=[{question:["星火用户的社群在哪里？有论坛或者群聊吗"],answer:["<a href='https://blog.shenmo.tech/post/%E6%95%85%E9%9A%9C%E5%85%AC%E5%91%8A/'>点击这里</a>查看我们的社群平台"]},{question:["只有Debian系可以使用星火应用商店吗"],answer:["现在您有更多选择。您可使用<a href='https://gitee.com/amber-ce/amber-ce-bookworm'>ACE兼容环境</a>来在Arch,Fedora上安装商店","尽管如此，部分应用还是无法使用的。请参考：<a href='https://bbs.spark-app.store/d/1668-xing-huo-ying-yong-shang-dian-on-ace'>此连接</a>"]},{question:["我是国产架构，怎么获取应用？"],answer:["我们现在支持海光，兆芯的x86;飞腾，鲲鹏，麒麟的arm64;龙芯新世界的deepin 23(loong64)，具体安装教程请查看下载界面"]},{question:["应用无法使用去哪反馈？"],answer:["应用详情页面有按钮，在下载安装下方"]},{question:["在哪里投稿我喜欢或者我常用的应用？"],answer:["右上角菜单--->投递应用。若是已上架应用则推荐使用投稿器投稿，可以选择架构后一键填写信息，不需要手动写了","arm/龙芯应用投递暂仅支持投稿器的打包功能投递，请在填写信息后按右键空白地区，然后点击打包一下，选择架构后把获得的deb包发送给用户社群的shenmo即可手动上架"]},{question:["我装不上商店怎么办？"],answer:["UOS 1060+/deepin 20.9/deepin 23/Debian 12/Ubuntu 22.04+可直接安装应用商店","对于Ubuntu 20.04/Debian10/Debian 11，安装依赖包后才能安装商店","对于龙芯用户请遵循下载界面的安装教程","银河麒麟V10的某些版本商店频繁闪退无法正常使用，因为银河麒麟的系统qt有问题，这不是星火的bug,若实在无法使用请安装终端版或者使用ACE安装","还是搞不明白，请回到第一条进入社群寻求小伙伴的帮助","如果你还是搞不明白怎么装，请使用星火终端版，同样在下载界面可以获取到。"]},{question:["我可以用dpkg -i安装吗？"],answer:["不可以！不可以！不可以！直接调用dpkg是不处理依赖的！使用sudo apt install ./xxxx.deb来安装，或者直接使用gdebi等图形化的安装器！！！","已经有不下20个人被这个坑了。CSDN害人不浅"]},{question:["我想转载星火商店上的应用包，下载完了为什么找不到？"],answer:["星火应用商店上的应用未经投递者或管理员许可不可转载，每款应用均为社区成员花费了时间和精力打包或编写的，请勿爬取仓库"]},{question:["有些应用已经过时或者失效了，我想让他下架"],answer:["前往<a href='https://gitee.com/spark-store-project/software_-issue'>https://gitee.com/spark-store-project/software_-issue</a>"]},{question:["网页商店怎么在维护"],answer:["网页商店已废弃，请使用客户端"]}],u=p({version:"",time:"",details:[]});J.getLatest().then(a=>{u.value=a});const o=p([]),v=p(!1),g=p();j(()=>{g.value.trigger()});const m=(a,s)=>{J.getHistory(a).then(l=>{o.value=o.value.concat(l.data),l.isEnded&&(v.value=!0),s()})};return(a,s)=>(q(),W(Be,{class:"flex flex-start downPage varImageBg downBackground"},{default:f(()=>[Ae,Ie,i("div",Ve,[i("div",ze,[i("div",Fe,[_(K,{size:"48px"},{default:f(()=>[Ue]),_:1}),i("div",je,[Oe,i("div",Re,[_(I,{color:"primary","text-color":"white",onClick:s[0]||(s[0]=l=>n.value=!0),style:{padding:"0 3vmin"},dense:"",rounded:"",unelevated:""},{default:f(()=>[A(" 点击下载 ")]),_:1}),i("span",null,"最新版本 "+G(u.value.version),1)])])])]),i("div",We,[i("div",Ke,[_(K,{size:"48px"},{default:f(()=>[Ge]),_:1}),i("div",Je,[Xe,i("div",Ye,[_(I,{color:"primary","text-color":"white",to:"/download_dependencies_latest",style:{padding:"0 3vmin"},dense:"",rounded:"",unelevated:""},{default:f(()=>[A(" 点击下载 ")]),_:1}),Ze])])])]),_(Ne,{onLoad:m,"initial-index":0,"scroll-target":".downPage",disable:v.value,style:{width:"-webkit-fill-available","min-height":"60vh"},ref_key:"historyView",ref:g},{loading:f(()=>[i("div",st,[_(Me,{color:"primary",size:"40px"})])]),default:f(()=>[_(He,{color:"primary",layout:"comfortable"},{default:f(()=>[(q(!0),Q(z,null,V(o.value,(l,d)=>(q(),W(Ee,{key:d,title:l.version,subtitle:l.time},{default:f(()=>[i("div",et,[i("ul",tt,[(q(!0),Q(z,null,V(l.details,(h,x)=>(q(),Q("li",{key:x},G(h),1))),128))])])]),_:2},1032,["title","subtitle"]))),128))]),_:1}),v.value?(q(),Q("p",at," ~ 已经到底了哦 (●'◡'●) ~ ")):be("",!0)]),_:1},8,["disable"])]),i("div",{class:ye(["tipsContainer",{active:n.value}]),onClick:s[2]||(s[2]=l=>n.value=!1)},[i("div",{class:"tipsPanel",onClick:s[1]||(s[1]=xe(()=>{},["stop"]))},[it,i("div",nt,[lt,_(Qe,{class:"qaCard"},{default:f(()=>[(q(),Q(z,null,V(c,(l,d)=>i("div",{class:"qaSection",key:d},[_(X,{text:l.question,"text-html":"","text-color":"white","bg-color":"primary"},{avatar:f(()=>[ot]),_:2},1032,["text"]),_(X,{text:l.answer,"text-html":"",sent:""},{avatar:f(()=>[rt]),_:2},1032,["text"])])),64))]),_:1}),_(I,{color:"primary","text-color":"white",to:"/download_latest"},{default:f(()=>[A(" 开始下载 ")]),_:1})])])],2),_(De)]),_:1}))}}),xt=qe(ct,[["__scopeId","data-v-6dad3384"],["__file","DownloadPage.vue"]]);export{xt as default};