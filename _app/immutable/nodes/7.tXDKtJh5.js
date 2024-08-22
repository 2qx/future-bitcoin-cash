import{s as oe,o as ne,n as Y}from"../chunks/scheduler.Dw93JyHj.js";import{S as re,i as ie,e as p,r as M,s as N,l as ce,c as k,d as _,f as $,a as F,n as w,h as d,g as S,u as O,v as W,w as ue,t as A,x as fe,b as P,y as de,k as z,z as _e,j as V,A as he,B as ve,C as ae}from"../chunks/index.B9C0U9bf.js";import{V as K,e as R}from"../chunks/vault.CqFh1qjg.js";import{S as be,g as U}from"../chunks/util.bU0NCA4d.js";import{h as me}from"../chunks/store.DiFBw5J8.js";import{$ as pe,a as G}from"../chunks/index.CeQkzzTs.js";const ke=!0;async function Ce({url:r}){return{block:r.searchParams.get("block")||void 0}}const Ae=Object.freeze(Object.defineProperty({__proto__:null,load:Ce,prerender:ke},Symbol.toStringTag,{value:"Module"}));function J(r,e,l){const t=r.slice();return t[8]=e[l],t}function Q(r,e,l){const t=r.slice();return t[8]=e[l],t}function X(r){let e,l;return{c(){e=p("link"),this.h()},l(t){e=k(t,"LINK",{rel:!0,type:!0,href:!0}),this.h()},h(){w(e,"rel","icon"),w(e,"type","image/svg"),w(e,"href",l="/FBCH-"+r[2]+".svg")},m(t,n){S(t,e,n)},p(t,n){n&4&&l!==(l="/FBCH-"+t[2]+".svg")&&w(e,"href",l)},d(t){t&&_(e)}}}function Z(r){let e,l,t=r[2].toLocaleString()+"",n,c,u,s,a,o,i="Coupons",h,T,j,y="Vault Threads",L,b,v;u=new be({props:{time:r[2],size:"150"}});let m=r[3]&&x(r);function C(f,g){return f[0]?we:ge}let B=C(r),D=B(r);function H(f,g){return f[1]&&f[1].length?Se:Ee}let E=H(r),I=E(r);return{c(){e=p("h1"),l=A("Vault "),n=A(t),c=N(),fe(u.$$.fragment),s=N(),m&&m.c(),a=N(),o=p("h4"),o.textContent=i,h=N(),D.c(),T=N(),j=p("h4"),j.textContent=y,L=N(),I.c(),b=M()},l(f){e=k(f,"H1",{});var g=F(e);l=P(g,"Vault "),n=P(g,t),g.forEach(_),c=$(f),de(u.$$.fragment,f),s=$(f),m&&m.l(f),a=$(f),o=k(f,"H4",{"data-svelte-h":!0}),z(o)!=="svelte-1donjrv"&&(o.textContent=i),h=$(f),D.l(f),T=$(f),j=k(f,"H4",{"data-svelte-h":!0}),z(j)!=="svelte-5lx8ud"&&(j.textContent=y),L=$(f),I.l(f),b=M()},m(f,g){S(f,e,g),d(e,l),d(e,n),S(f,c,g),_e(u,f,g),S(f,s,g),m&&m.m(f,g),S(f,a,g),S(f,o,g),S(f,h,g),D.m(f,g),S(f,T,g),S(f,j,g),S(f,L,g),I.m(f,g),S(f,b,g),v=!0},p(f,g){(!v||g&4)&&t!==(t=f[2].toLocaleString()+"")&&V(n,t);const q={};g&4&&(q.time=f[2]),u.$set(q),f[3]?m?m.p(f,g):(m=x(f),m.c(),m.m(a.parentNode,a)):m&&(m.d(1),m=null),B===(B=C(f))&&D?D.p(f,g):(D.d(1),D=B(f),D&&(D.c(),D.m(T.parentNode,T))),E===(E=H(f))&&I?I.p(f,g):(I.d(1),I=E(f),I&&(I.c(),I.m(b.parentNode,b)))},i(f){v||(O(u.$$.fragment,f),v=!0)},o(f){W(u.$$.fragment,f),v=!1},d(f){f&&(_(e),_(c),_(s),_(a),_(o),_(h),_(T),_(j),_(L),_(b)),he(u,f),m&&m.d(f),D.d(f),I.d(f)}}}function x(r){let e,l,t,n=U(r[3],r[2]).toLocaleDateString()+"",c,u,s=r[2]-r[3]>0&&ee(r),a=r[2]-r[3]<2e3&&te(r);return{c(){s&&s.c(),e=N(),l=p("h3"),t=A(`Unlocks around
				`),c=A(n),u=N(),a&&a.c()},l(o){s&&s.l(o),e=$(o),l=k(o,"H3",{});var i=F(l);t=P(i,`Unlocks around
				`),c=P(i,n),u=$(i),a&&a.l(i),i.forEach(_)},m(o,i){s&&s.m(o,i),S(o,e,i),S(o,l,i),d(l,t),d(l,c),d(l,u),a&&a.m(l,null)},p(o,i){o[2]-o[3]>0?s?s.p(o,i):(s=ee(o),s.c(),s.m(e.parentNode,e)):s&&(s.d(1),s=null),i&12&&n!==(n=U(o[3],o[2]).toLocaleDateString()+"")&&V(c,n),o[2]-o[3]<2e3?a?a.p(o,i):(a=te(o),a.c(),a.m(l,null)):a&&(a.d(1),a=null)},d(o){o&&(_(e),_(l)),s&&s.d(o),a&&a.d()}}}function ee(r){let e,l,t=(r[2]-r[3]).toLocaleString()+"",n,c;return{c(){e=p("h2"),l=A("T  -"),n=A(t),c=A(" ■")},l(u){e=k(u,"H2",{});var s=F(e);l=P(s,"T  -"),n=P(s,t),c=P(s," ■"),s.forEach(_)},m(u,s){S(u,e,s),d(e,l),d(e,n),d(e,c)},p(u,s){s&12&&t!==(t=(u[2]-u[3]).toLocaleString()+"")&&V(n,t)},d(u){u&&_(e)}}}function te(r){let e=U(r[3],r[2]).toLocaleTimeString()+"",l;return{c(){l=A(e)},l(t){l=P(t,e)},m(t,n){S(t,l,n)},p(t,n){n&12&&e!==(e=U(t[3],t[2]).toLocaleTimeString()+"")&&V(l,e)},d(t){t&&_(l)}}}function ge(r){let e,l="loading coupons...";return{c(){e=p("p"),e.textContent=l,this.h()},l(t){e=k(t,"P",{class:!0,"data-svelte-h":!0}),z(e)!=="svelte-1frqwd1"&&(e.textContent=l),this.h()},h(){w(e,"class","svelte-jvubrw")},m(t,n){S(t,e,n)},p:Y,d(t){t&&_(e)}}}function we(r){let e;function l(c,u){return c[0].length>0?Te:je}let t=l(r),n=t(r);return{c(){n.c(),e=M()},l(c){n.l(c),e=M()},m(c,u){n.m(c,u),S(c,e,u)},p(c,u){t===(t=l(c))&&n?n.p(c,u):(n.d(1),n=t(c),n&&(n.c(),n.m(e.parentNode,e)))},d(c){c&&_(e),n.d(c)}}}function je(r){let e,l="no coupons available";return{c(){e=p("p"),e.textContent=l,this.h()},l(t){e=k(t,"P",{class:!0,"data-svelte-h":!0}),z(e)!=="svelte-r1zx0p"&&(e.textContent=l),this.h()},h(){w(e,"class","svelte-jvubrw")},m(t,n){S(t,e,n)},p:Y,d(t){t&&_(e)}}}function Te(r){let e,l,t='<tr class="header svelte-jvubrw"><td class="svelte-jvubrw">Series</td> <td class="svelte-jvubrw">Placement</td> <td class="svelte-jvubrw">Coupon</td> <td class="svelte-jvubrw">spb</td> <td class="svelte-jvubrw">apr*</td></tr>',n,c,u=R(r[0]),s=[];for(let a=0;a<u.length;a+=1)s[a]=le(Q(r,u,a));return{c(){e=p("table"),l=p("thead"),l.innerHTML=t,n=N(),c=p("tbody");for(let a=0;a<s.length;a+=1)s[a].c();this.h()},l(a){e=k(a,"TABLE",{class:!0});var o=F(e);l=k(o,"THEAD",{class:!0,"data-svelte-h":!0}),z(l)!=="svelte-1req6o2"&&(l.innerHTML=t),n=$(o),c=k(o,"TBODY",{class:!0});var i=F(c);for(let h=0;h<s.length;h+=1)s[h].l(i);i.forEach(_),o.forEach(_),this.h()},h(){w(l,"class","svelte-jvubrw"),w(c,"class","svelte-jvubrw"),w(e,"class","couponTable svelte-jvubrw")},m(a,o){S(a,e,o),d(e,l),d(e,n),d(e,c);for(let i=0;i<s.length;i+=1)s[i]&&s[i].m(c,null)},p(a,o){if(o&13){u=R(a[0]);let i;for(i=0;i<u.length;i+=1){const h=Q(a,u,i);s[i]?s[i].p(h,o):(s[i]=le(h),s[i].c(),s[i].m(c,null))}for(;i<s.length;i+=1)s[i].d(1);s.length=u.length}},d(a){a&&_(e),ae(s,a)}}}function le(r){let e,l,t="C0",n,c,u="1 BCH",s,a,o=r[8].value.toLocaleString()+"",i,h,T,j=(r[8].value/(r[2]-r[3])).toFixed(1)+"",y,L,b,v,m=(r[8].value/(r[2]-r[3])/(1e6/52596)).toFixed(2)+"",C,B,D;return{c(){e=p("tr"),l=p("td"),l.textContent=t,n=N(),c=p("td"),c.textContent=u,s=N(),a=p("td"),i=A(o),h=N(),T=p("td"),y=A(j),L=N(),b=p("td"),v=p("i"),C=A(m),B=A("%"),D=N(),this.h()},l(H){e=k(H,"TR",{class:!0});var E=F(e);l=k(E,"TD",{class:!0,"data-svelte-h":!0}),z(l)!=="svelte-162jlks"&&(l.textContent=t),n=$(E),c=k(E,"TD",{class:!0,"data-svelte-h":!0}),z(c)!=="svelte-evuot"&&(c.textContent=u),s=$(E),a=k(E,"TD",{class:!0});var I=F(a);i=P(I,o),I.forEach(_),h=$(E),T=k(E,"TD",{class:!0});var f=F(T);y=P(f,j),f.forEach(_),L=$(E),b=k(E,"TD",{class:!0});var g=F(b);v=k(g,"I",{});var q=F(v);C=P(q,m),B=P(q,"%"),q.forEach(_),g.forEach(_),D=$(E),E.forEach(_),this.h()},h(){w(l,"class","r svelte-jvubrw"),w(c,"class","r svelte-jvubrw"),w(a,"class","r svelte-jvubrw"),w(T,"class","r svelte-jvubrw"),w(b,"class","r svelte-jvubrw"),w(e,"class","svelte-jvubrw")},m(H,E){S(H,e,E),d(e,l),d(e,n),d(e,c),d(e,s),d(e,a),d(a,i),d(e,h),d(e,T),d(T,y),d(e,L),d(e,b),d(b,v),d(v,C),d(v,B),d(e,D)},p(H,E){E&1&&o!==(o=H[8].value.toLocaleString()+"")&&V(i,o),E&13&&j!==(j=(H[8].value/(H[2]-H[3])).toFixed(1)+"")&&V(y,j),E&13&&m!==(m=(H[8].value/(H[2]-H[3])/(1e6/52596)).toFixed(2)+"")&&V(C,m)},d(H){H&&_(e)}}}function Ee(r){let e,l="loading threads...";return{c(){e=p("p"),e.textContent=l,this.h()},l(t){e=k(t,"P",{class:!0,"data-svelte-h":!0}),z(e)!=="svelte-1njcfnz"&&(e.textContent=l),this.h()},h(){w(e,"class","svelte-jvubrw")},m(t,n){S(t,e,n)},p:Y,d(t){t&&_(e)}}}function Se(r){let e,l,t,n,c="BCH",u,s,a,o,i,h,T="Token Id",j,y,L=R(r[1]),b=[];for(let v=0;v<L.length;v+=1)b[v]=se(J(r,L,v));return{c(){e=p("table"),l=p("thead"),t=p("tr"),n=p("td"),n.textContent=c,u=N(),s=p("td"),a=A("FBCH-"),o=A(r[2]),i=N(),h=p("td"),h.textContent=T,j=N(),y=p("tbody");for(let v=0;v<b.length;v+=1)b[v].c();this.h()},l(v){e=k(v,"TABLE",{class:!0});var m=F(e);l=k(m,"THEAD",{class:!0});var C=F(l);t=k(C,"TR",{class:!0});var B=F(t);n=k(B,"TD",{class:!0,"data-svelte-h":!0}),z(n)!=="svelte-eke3it"&&(n.textContent=c),u=$(B),s=k(B,"TD",{class:!0});var D=F(s);a=P(D,"FBCH-"),o=P(D,r[2]),D.forEach(_),i=$(B),h=k(B,"TD",{class:!0,"data-svelte-h":!0}),z(h)!=="svelte-ma4vn8"&&(h.textContent=T),B.forEach(_),C.forEach(_),j=$(m),y=k(m,"TBODY",{class:!0});var H=F(y);for(let E=0;E<b.length;E+=1)b[E].l(H);H.forEach(_),m.forEach(_),this.h()},h(){w(n,"class","svelte-jvubrw"),w(s,"class","svelte-jvubrw"),w(h,"class","svelte-jvubrw"),w(t,"class","svelte-jvubrw"),w(l,"class","svelte-jvubrw"),w(y,"class","svelte-jvubrw"),w(e,"class","couponTable svelte-jvubrw")},m(v,m){S(v,e,m),d(e,l),d(l,t),d(t,n),d(t,u),d(t,s),d(s,a),d(s,o),d(t,i),d(t,h),d(e,j),d(e,y);for(let C=0;C<b.length;C+=1)b[C]&&b[C].m(y,null)},p(v,m){if(m&4&&V(o,v[2]),m&2){L=R(v[1]);let C;for(C=0;C<L.length;C+=1){const B=J(v,L,C);b[C]?b[C].p(B,m):(b[C]=se(B),b[C].c(),b[C].m(y,null))}for(;C<b.length;C+=1)b[C].d(1);b.length=L.length}},d(v){v&&_(e),ae(b,v)}}}function se(r){let e,l,t=(r[8].value/1e8).toFixed(2)+"",n,c,u,s,a=(r[8].token_data.amount/1e8).toLocaleString()+"",o,i,h,T,j=r[8].token_data.category.substring(0,8)+"..."+r[8].token_data.category.slice(-4),y,L;return{c(){e=p("tr"),l=p("td"),n=A(t),c=N(),u=p("td"),s=p("i"),o=A(a),i=N(),h=p("td"),T=p("i"),y=A(j),L=N(),this.h()},l(b){e=k(b,"TR",{class:!0});var v=F(e);l=k(v,"TD",{class:!0});var m=F(l);n=P(m,t),m.forEach(_),c=$(v),u=k(v,"TD",{class:!0});var C=F(u);s=k(C,"I",{});var B=F(s);o=P(B,a),B.forEach(_),C.forEach(_),i=$(v),h=k(v,"TD",{class:!0});var D=F(h);T=k(D,"I",{});var H=F(T);y=P(H,j),H.forEach(_),D.forEach(_),L=$(v),v.forEach(_),this.h()},h(){w(l,"class","r svelte-jvubrw"),w(u,"class","r svelte-jvubrw"),w(h,"class","r svelte-jvubrw"),w(e,"class","svelte-jvubrw")},m(b,v){S(b,e,v),d(e,l),d(l,n),d(e,c),d(e,u),d(u,s),d(s,o),d(e,i),d(e,h),d(h,T),d(T,y),d(e,L)},p(b,v){v&2&&t!==(t=(b[8].value/1e8).toFixed(2)+"")&&V(n,t),v&2&&a!==(a=(b[8].token_data.amount/1e8).toLocaleString()+"")&&V(o,a),v&2&&j!==(j=b[8].token_data.category.substring(0,8)+"..."+b[8].token_data.category.slice(-4))&&V(y,j)},d(b){b&&_(e)}}}function ye(r){let e,l,t,n,c,u;document.title=e="FBCH-"+r[2];let s=r[2]>857e3&&X(r),a=r[2]&&Z(r);return{c(){l=p("meta"),s&&s.c(),t=M(),n=N(),c=p("section"),a&&a.c(),this.h()},l(o){const i=ce("svelte-hd2z9o",document.head);l=k(i,"META",{name:!0,content:!0}),s&&s.l(i),t=M(),i.forEach(_),n=$(o),c=k(o,"SECTION",{});var h=F(c);a&&a.l(h),h.forEach(_),this.h()},h(){w(l,"name","description"),w(l,"content","Future Vault Series")},m(o,i){d(document.head,l),s&&s.m(document.head,null),d(document.head,t),S(o,n,i),S(o,c,i),a&&a.m(c,null),u=!0},p(o,[i]){(!u||i&4)&&e!==(e="FBCH-"+o[2])&&(document.title=e),o[2]>857e3?s?s.p(o,i):(s=X(o),s.c(),s.m(t.parentNode,t)):s&&(s.d(1),s=null),o[2]?a?(a.p(o,i),i&4&&O(a,1)):(a=Z(o),a.c(),O(a,1),a.m(c,null)):a&&(ve(),W(a,1,1,()=>{a=null}),ue())},i(o){u||(O(a),u=!0)},o(o){W(a),u=!1},d(o){o&&(_(n),_(c)),_(l),s&&s.d(o),_(t),a&&a.d()}}}function De(r,e,l){let{data:t}=e,n,c,u,s,a;t.block&&(a=Number(t.block),n=K.getCoupon(1e8,a),c=K.getAddress(a));let o;me.subscribe(h=>{l(3,o=h)});const i=function(h){console.log("electrum: ",h)};return ne(async()=>{const h=new pe("FBCH","1.4.1","bch.imaginary.cash",G.WSS.Port,G.WSS.Scheme);await h.connect(),h.on("notification",i),await h.subscribe("blockchain.address.subscribe",n),await h.subscribe("blockchain.address.subscribe",c);const T=await h.request("blockchain.address.listunspent",c,"tokens_only");if(T instanceof Error)throw T;l(1,s=T);const j=await h.request("blockchain.address.listunspent",n);if(j instanceof Error)throw j;l(0,u=j),u.length>0&&u.sort((y,L)=>parseFloat(L.value)-parseFloat(y.value))}),r.$$set=h=>{"data"in h&&l(4,t=h.data)},[u,s,a,o,t]}class Pe extends re{constructor(e){super(),ie(this,e,De,ye,oe,{data:4})}}export{Pe as component,Ae as universal};
//# sourceMappingURL=7.tXDKtJh5.js.map
