import{d as Me}from"../chunks/index.R8ovVqwX.js";import{s as Pe,n as Ie,r as Se,o as Ae}from"../chunks/scheduler.Ce_0Mfso.js";import{S as ze,i as je,e as u,s as T,t as y,l as Ne,c,d as p,f as L,a as H,k as Be,b as C,n as d,h as t,g as O,D as $,E as z,j as Q,B as Ve,F as Ue,G as ke}from"../chunks/index.D7qmrA4F.js";import{e as ae,V as De}from"../chunks/vault.CqFh1qjg.js";import{h as We}from"../chunks/store.BU4DPX2T.js";const qe=Me,Oe=!0,Ze=Object.freeze(Object.defineProperty({__proto__:null,csr:qe,prerender:Oe},Symbol.toStringTag,{value:"Module"}));function Te(s,o,l){const r=s.slice();return r[16]=o[l],r}function Le(s,o,l){const r=s.slice();return r[19]=o[l],r}function Re(s){let o,l,r,i=s[19]+"",_,v,n,h,M,k,I;return M=Ue(s[13][0]),{c(){o=u("label"),l=u("input"),r=y(`

					E`),_=y(i),v=y(" series"),n=u("br"),h=T(),this.h()},l(f){o=c(f,"LABEL",{});var m=H(o);l=c(m,"INPUT",{type:!0,name:!0}),r=C(m,`

					E`),_=C(m,i),v=C(m," series"),n=c(m,"BR",{}),h=L(m),m.forEach(p),this.h()},h(){d(l,"type","radio"),d(l,"name","s"),l.__value=s[19],$(l,l.__value),M.p(l)},m(f,m){O(f,o,m),t(o,l),l.checked=l.__value===s[0],t(o,r),t(o,_),t(o,v),t(o,n),t(o,h),k||(I=[z(l,"change",s[12]),z(l,"change",s[14])],k=!0)},p(f,m){m&1&&(l.checked=l.__value===f[0])},d(f){f&&p(o),M.r(),k=!1,Se(I)}}}function we(s){let o=s[16].address+"",l,r,i=s[16].amount+"",_,v;return{c(){l=y(o),r=y(", "),_=y(i),v=u("br")},l(n){l=C(n,o),r=C(n,", "),_=C(n,i),v=c(n,"BR",{})},m(n,h){O(n,l,h),O(n,r,h),O(n,_,h),O(n,v,h)},p(n,h){h&2&&o!==(o=n[16].address+"")&&Q(l,o),h&2&&i!==(i=n[16].amount+"")&&Q(_,i)},d(n){n&&(p(l),p(r),p(_),p(v))}}}function Fe(s){let o,l,r,i,_="Write coupons",v,n,h,M=`Coupon: <br/>
			1 BCH`,k,I,f,m,F,X,Y,Z,D,j,S,B,R,x,se,re,w,oe,N,ie,U,ue,ee,ce,he,P,de,te,_e,fe,pe,ve,A,me,ge,G=ae(s[6]),g=[];for(let a=0;a<G.length;a+=1)g[a]=Re(Le(s,G,a));let J=ae(s[1]),b=[];for(let a=0;a<J.length;a+=1)b[a]=we(Te(s,J,a));return{c(){o=u("meta"),l=T(),r=u("div"),i=u("h1"),i.textContent=_,v=T(),n=u("div"),h=u("div"),h.innerHTML=M,k=T(),I=u("div"),f=u("label"),m=y("Rate: "),F=y(s[3]),X=y(" spb"),Y=u("br"),Z=T(),D=u("input"),j=T(),S=u("div"),B=u("label"),R=y("Copies: "),x=y(s[2]),se=u("br"),re=T(),w=u("input"),oe=T(),N=u("div");for(let a=0;a<g.length;a+=1)g[a].c();ie=T(),U=u("div"),ue=y("Incentivize locking up to "),ee=y(s[5]),ce=y(" BCH"),he=T(),P=u("div"),de=y("Total: "),te=y(s[4]),_e=u("br"),fe=T(),pe=u("hr"),ve=T(),A=u("div");for(let a=0;a<b.length;a+=1)b[a].c();this.h()},l(a){const E=Ne("svelte-174kz84",document.head);o=c(E,"META",{name:!0,content:!0}),E.forEach(p),l=L(a),r=c(a,"DIV",{class:!0});var e=H(r);i=c(e,"H1",{"data-svelte-h":!0}),Be(i)!=="svelte-1m7dl3q"&&(i.textContent=_),v=L(e),n=c(e,"DIV",{id:!0,class:!0});var V=H(n);h=c(V,"DIV",{class:!0,"data-svelte-h":!0}),Be(h)!=="svelte-1mv27ec"&&(h.innerHTML=M),k=L(V),I=c(V,"DIV",{class:!0});var be=H(I);f=c(be,"LABEL",{});var W=H(f);m=C(W,"Rate: "),F=C(W,s[3]),X=C(W," spb"),Y=c(W,"BR",{}),Z=L(W),D=c(W,"INPUT",{type:!0,min:!0,step:!0,max:!0}),W.forEach(p),be.forEach(p),j=L(V),S=c(V,"DIV",{class:!0});var Ee=H(S);B=c(Ee,"LABEL",{});var K=H(B);R=C(K,"Copies: "),x=C(K,s[2]),se=c(K,"BR",{}),re=L(K),w=c(K,"INPUT",{type:!0,min:!0,max:!0}),K.forEach(p),Ee.forEach(p),oe=L(V),N=c(V,"DIV",{class:!0});var ye=H(N);for(let q=0;q<g.length;q+=1)g[q].l(ye);ye.forEach(p),V.forEach(p),ie=L(e),U=c(e,"DIV",{});var le=H(U);ue=C(le,"Incentivize locking up to "),ee=C(le,s[5]),ce=C(le," BCH"),le.forEach(p),he=L(e),P=c(e,"DIV",{id:!0,class:!0});var ne=H(P);de=C(ne,"Total: "),te=C(ne,s[4]),_e=c(ne,"BR",{}),ne.forEach(p),fe=L(e),pe=c(e,"HR",{}),ve=L(e),A=c(e,"DIV",{id:!0,class:!0});var Ce=H(A);for(let q=0;q<b.length;q+=1)b[q].l(Ce);Ce.forEach(p),e.forEach(p),this.h()},h(){document.title="Write",d(o,"name","description"),d(o,"content","Write Coupons"),d(h,"class","svelte-1ewylty"),d(D,"type","range"),d(D,"min","1"),d(D,"step","0.2"),d(D,"max","50"),d(I,"class","svelte-1ewylty"),d(w,"type","range"),d(w,"min","1"),d(w,"max","40"),d(S,"class","svelte-1ewylty"),d(N,"class","svelte-1ewylty"),d(n,"id","control"),d(n,"class","svelte-1ewylty"),d(P,"id","total"),d(P,"class","svelte-1ewylty"),d(A,"id","mono"),d(A,"class","svelte-1ewylty"),d(r,"class","text-column")},m(a,E){t(document.head,o),O(a,l,E),O(a,r,E),t(r,i),t(r,v),t(r,n),t(n,h),t(n,k),t(n,I),t(I,f),t(f,m),t(f,F),t(f,X),t(f,Y),t(f,Z),t(f,D),$(D,s[3]),t(n,j),t(n,S),t(S,B),t(B,R),t(B,x),t(B,se),t(B,re),t(B,w),$(w,s[2]),t(n,oe),t(n,N);for(let e=0;e<g.length;e+=1)g[e]&&g[e].m(N,null);t(r,ie),t(r,U),t(U,ue),t(U,ee),t(U,ce),t(r,he),t(r,P),t(P,de),t(P,te),t(P,_e),t(r,fe),t(r,pe),t(r,ve),t(r,A);for(let e=0;e<b.length;e+=1)b[e]&&b[e].m(A,null);me||(ge=[z(D,"change",s[8]),z(D,"change",s[9]),z(D,"input",s[9]),z(w,"change",s[10]),z(w,"change",s[11]),z(w,"input",s[11])],me=!0)},p(a,[E]){if(E&8&&Q(F,a[3]),E&8&&$(D,a[3]),E&4&&Q(x,a[2]),E&4&&$(w,a[2]),E&193){G=ae(a[6]);let e;for(e=0;e<G.length;e+=1){const V=Le(a,G,e);g[e]?g[e].p(V,E):(g[e]=Re(V),g[e].c(),g[e].m(N,null))}for(;e<g.length;e+=1)g[e].d(1);g.length=G.length}if(E&32&&Q(ee,a[5]),E&16&&Q(te,a[4]),E&2){J=ae(a[1]);let e;for(e=0;e<J.length;e+=1){const V=Te(a,J,e);b[e]?b[e].p(V,E):(b[e]=we(V),b[e].c(),b[e].m(A,null))}for(;e<b.length;e+=1)b[e].d(1);b.length=J.length}},i:Ie,o:Ie,d(a){a&&(p(l),p(r)),p(o),Ve(g,a),Ve(b,a),me=!1,Se(ge)}}}let He=1;function Ge(s,o,l){const r=[3,4,5,6];let i=4,_=[],v=1,n=20,h=0,M=0,k=857e3;We.subscribe(j=>{k=j});function I(){let j=De.getCouponSeries(k,He*1e8,i,i==6?4:void 0),S=De.getSeriesTimes(k,i,i==6?4:void 0);l(1,_=j.map(function(B,R){return(S[R]-k)*n>543?[...Array(v).fill({time:S[R],address:B,placement:He,amount:Math.floor((S[R]-k)*n)/1e8})]:[]})),l(1,_=_.flat()),l(5,M=_.reduce(function(B,R){return B+R.placement},0)),l(4,h=_.reduce(function(B,R){return B+R.amount},0)),console.log(_)}Ae(async()=>{I()});const f=[[]],m=()=>I();function F(){n=ke(this.value),l(3,n)}const X=()=>I();function Y(){v=ke(this.value),l(2,v)}function Z(){i=this.__value,l(0,i)}return[i,_,v,n,h,M,r,I,m,F,X,Y,Z,f,()=>I()]}class $e extends ze{constructor(o){super(),je(this,o,Ge,Fe,Pe,{})}}export{$e as component,Ze as universal};
//# sourceMappingURL=8.CAOXw3HB.js.map
