import{aF as a,i as s,aG as i}from"./index-iZyAhOW0.js";const c="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20665.09%20695.97'%3e%3cdefs%3e%3cstyle%3e.a{fill:none;}.b{clip-path:url(%23a);}.c{fill:%2380b4ff;}.d{fill:%23c5ddff;}.e{fill:%233787ff;}%3c/style%3e%3cclipPath%20id='a'%20transform='translate(-46.88%20-32.03)'%3e%3crect%20class='a'%20x='47'%20y='32'%20width='665.88'%20height='696.96'/%3e%3c/clipPath%3e%3c/defs%3e%3cg%20class='b'%3e%3cpath%20class='c'%20d='M671.62,179.05A76.81,76.81,0,0,1,712,246.66V513.39A76.81,76.81,0,0,1,671.62,581L415.88,718.8a76.77,76.77,0,0,1-72.89,0L87.25,581a76.79,76.79,0,0,1-40.37-67.61V246.64a76.8,76.8,0,0,1,40.34-67.59L343,41.22a76.8,76.8,0,0,1,72.88,0L671.6,179Zm0,0'%20transform='translate(-46.88%20-32.03)'/%3e%3cpath%20class='d'%20d='M704.36,213.33a76.81,76.81,0,0,0-32.76-34.28L415.85,41.25a76.76,76.76,0,0,0-72.86,0L87.25,179.05a76.84,76.84,0,0,0-32.69,34.13L344.17,387.54a72.71,72.71,0,0,0,75.78-.26Zm0,0'%20transform='translate(-46.88%20-32.03)'/%3e%3c/g%3e%3cpath%20class='e'%20d='M165.59,246.74,379.42,351.49,593.26,246.74a25.6,25.6,0,0,1,22.53,46L405,396V614.36a25.6,25.6,0,1,1-51.19,0V396L143.06,292.72a25.6,25.6,0,1,1,22.53-46'%20transform='translate(-46.88%20-32.03)'/%3e%3c/svg%3e",h=a("counter",{state:()=>({sortCache:{config:{cardWidth:264,cardHeight:92,verticalPadding:50,horizonPadding:16,gap:32},sort:null,appList:[],containerState:{active:!1,animation:!1,cover:!1},coverState:{active:!1,animation:!1,cover:!1,application:!1,open:!1,loaded:!1,applicationEnd:!1},activeCard:null,containerHeight:"",column:0,columnAnimation:{change:!1,oldColumn:0,newColumn:0},horizonGap:0,cover:{style:"",offset:0,imgMain:null,imgDetail:null},scrollTop:0,clientWidth:0,clientHeight:0},source:"https://d.store.deepinos.org.cn",debSource:"https://mirrors.sdu.edu.cn/spark-store-repository/store/"}),getters:{},actions:{setActiveCard(t){this.sortCache.activeCard=t,this.refreshStyle()},cancelActiveCard(){this.sortCache.coverState.active=!1,this.sortCache.coverState.open=!1,this.sortCache.coverState.loaded=!1,this.sortCache.coverState.animation=!0,this.sortCache.coverState.applicationEnd=!1,this.sortCache.containerState.cover=!1},setImgError(t,e){t.imgError=e;const o=`${this.source}/store/${this.sortCache.sort}/${t.Package.replaceAll("+","%2B")}/icon.png`;t.imgSrc=t.imgError?c:o},onContainerWidthChange(t){this.sortCache.clientWidth=t,this.sortCache.columnAnimation.oldColumn=this.sortCache.column,this.sortCache.column=Math.floor((t+this.sortCache.config.gap-this.sortCache.config.horizonPadding*2)/(this.sortCache.config.cardWidth+this.sortCache.config.gap)),this.sortCache.containerHeight=`${Math.ceil(this.sortCache.appList.length/this.sortCache.column)*(this.sortCache.config.cardHeight+this.sortCache.config.gap)+this.sortCache.config.gap+this.sortCache.config.verticalPadding*1.5}px`,this.sortCache.horizonGap=(t-(this.sortCache.config.cardWidth+this.sortCache.config.gap)*this.sortCache.column+this.sortCache.config.gap-this.sortCache.config.horizonPadding*2)/(this.sortCache.column+1),this.sortCache.appList.forEach((e,o)=>{e.position={left:o%this.sortCache.column*(this.sortCache.horizonGap+this.sortCache.config.gap+this.sortCache.config.cardWidth)+this.sortCache.config.horizonPadding+this.sortCache.horizonGap,top:Math.floor(o/this.sortCache.column)*(this.sortCache.config.cardHeight+this.sortCache.config.gap)+this.sortCache.config.verticalPadding},e.style=`transform:translate(${e.position.left}px,${e.position.top}px)`}),this.sortCache.columnAnimation.oldColumn!=this.sortCache.column&&this.sortCache.columnAnimation.oldColumn!=0&&(this.sortCache.columnAnimation.change=!0,this.sortCache.columnAnimation.newColumn=this.sortCache.column),this.refreshStyle()},onScroll(t){this.sortCache.scrollTop=t,this.refreshStyle()},onClientHeightChange(t){this.sortCache.clientHeight=t,this.refreshStyle()},onOpened(){this.sortCache.cover.imgMain&&this.sortCache.cover.imgDetail&&(this.sortCache.cover.offset=this.sortCache.cover.imgMain.getBoundingClientRect().y-this.sortCache.cover.imgDetail.getBoundingClientRect().y),this.sortCache.coverState.open=!0,this.refreshStyle()},refreshStyle(){this.sortCache.cover.style=`--j-left:${this.sortCache.activeCard?.position?.left-this.sortCache.clientWidth/2-30}px;--j-top:${this.sortCache.activeCard?.position?.top-this.sortCache.clientHeight/2-this.sortCache.scrollTop-15}px;--j-offset:${this.sortCache.cover.offset}px`}}});function n(){return s(i)}export{n as a,h as u};