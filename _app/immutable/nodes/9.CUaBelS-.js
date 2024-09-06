import{s as qe,n as q,c as Qe,o as Xe,a as Ze}from"../chunks/scheduler.CoKJEDLV.js";import{S as We,i as Ke,e as b,c as p,a as $,d as o,m as h,g as m,t as U,s as x,b as j,f as N,h as u,x as re,p as et,o as W,r as te,u as Se,v as X,w as ye,z as ke,A as ge,n as fe,B as Ce,j as G,C as Te,y as Ye,E as tt}from"../chunks/index.PTRJg19q.js";import{a as lt,h as st,V as De,C as rt,g as be,e as Ee}from"../chunks/vault.I7tX0INA.js";import{p as nt}from"../chunks/stores.DFusG5eF.js";import{t as at}from"../chunks/SvelteToast.svelte_svelte_type_style_lang.8ep8mfxG.js";import{B as ot,I as it,F as ct,E as ut,T as xe,C as Ne}from"../chunks/wallet.BhSZiJFm.js";import{$ as ft,a as dt,b as _t,c as Ge}from"../chunks/bch.m-ZcHduh.js";import{$ as ht,a as Be}from"../chunks/index.oj5ZhQlY.js";import{S as Je}from"../chunks/SeriesIcon.BZVYKSax.js";const bt=!0,qt=Object.freeze(Object.defineProperty({__proto__:null,prerender:bt},Symbol.toStringTag,{value:"Module"}));function Ae(a){let e,t,l,s,r,d,n,_,B,y;return{c(){e=b("a"),t=U("salemkode"),s=x(),r=b("a"),d=U("3xpl"),n=x(),_=b("a"),B=U("electroncash.de"),this.h()},l(C){e=p(C,"A",{target:!0,href:!0,class:!0});var E=$(e);t=j(E,"salemkode"),E.forEach(o),s=N(C),r=p(C,"A",{target:!0,href:!0,class:!0});var P=$(r);d=j(P,"3xpl"),P.forEach(o),n=N(C),_=p(C,"A",{target:!0,href:!0,class:!0});var w=$(_);B=j(w,"electroncash.de"),w.forEach(o),this.h()},h(){h(e,"target","_blank"),h(e,"href",l="https://explorer.salemkode.com/address/"+a[0]),h(e,"class","svelte-1x0h9jt"),h(r,"target","_blank"),h(r,"href","https://3xpl.com/bitcoin-cash/address/"+a[1].split(":")[1]),h(r,"class","svelte-1x0h9jt"),h(_,"target","_blank"),h(_,"href",y="https://explorer.electroncash.de/address/"+a[0]),h(_,"class","svelte-1x0h9jt")},m(C,E){m(C,e,E),u(e,t),m(C,s,E),m(C,r,E),u(r,d),m(C,n,E),m(C,_,E),u(_,B)},p(C,E){E&1&&l!==(l="https://explorer.salemkode.com/address/"+C[0])&&h(e,"href",l),E&1&&y!==(y="https://explorer.electroncash.de/address/"+C[0])&&h(_,"href",y)},d(C){C&&(o(e),o(s),o(r),o(n),o(_))}}}function pt(a){let e,t=a[0]&&Ae(a);return{c(){e=b("div"),t&&t.c(),this.h()},l(l){e=p(l,"DIV",{class:!0});var s=$(e);t&&t.l(s),s.forEach(o),this.h()},h(){h(e,"class","svelte-1x0h9jt")},m(l,s){m(l,e,s),t&&t.m(e,null)},p(l,[s]){l[0]?t?t.p(l,s):(t=Ae(l),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},i:q,o:q,d(l){l&&o(e),t&&t.d()}}}function mt(a,e,t){let{address:l}=e;const s=lt(l);return a.$$set=r=>{"address"in r&&t(0,l=r.address)},[l,s]}class Fe extends We{constructor(e){super(),Ke(this,e,mt,pt,qe,{address:0})}}function He(a,e,t){const l=a.slice();return l[28]=e[t],l}function Pe(a,e,t){const l=a.slice();return l[28]=e[t],l}function vt(a){let e,t,l,s;return{c(){e=x(),t=b("meta"),l=x(),s=b("link"),this.h()},l(r){e=N(r),t=p(r,"META",{name:!0,content:!0}),l=N(r),s=p(r,"LINK",{rel:!0,type:!0,href:!0}),this.h()},h(){document.title="FBCH",h(t,"name","description"),h(t,"content","Future Vault Series"),h(s,"rel","icon"),h(s,"type","image/svg"),h(s,"href","/FBCH.svg")},m(r,d){m(r,e,d),m(r,t,d),m(r,l,d),m(r,s,d)},p:q,d(r){r&&(o(e),o(t),o(l),o(s))}}}function kt(a){let e,t,l,s,r,d;return document.title=e="FBCH-"+a[6],{c(){t=x(),l=b("meta"),s=x(),r=b("link"),this.h()},l(n){t=N(n),l=p(n,"META",{name:!0,content:!0}),s=N(n),r=p(n,"LINK",{rel:!0,type:!0,href:!0}),this.h()},h(){h(l,"name","description"),h(l,"content","Future Vault Series"),h(r,"rel","icon"),h(r,"type","image/svg"),h(r,"href",d="/FBCH-"+a[6]+".svg")},m(n,_){m(n,t,_),m(n,l,_),m(n,s,_),m(n,r,_)},p(n,_){_[0]&64&&e!==(e="FBCH-"+n[6])&&(document.title=e),_[0]&64&&d!==(d="/FBCH-"+n[6]+".svg")&&h(r,"href",d)},d(n){n&&(o(t),o(l),o(s),o(r))}}}function gt(a){let e,t="loading...";return{c(){e=b("p"),e.textContent=t,this.h()},l(l){e=p(l,"P",{class:!0,"data-svelte-h":!0}),W(e)!=="svelte-qeejp2"&&(e.textContent=t),this.h()},h(){h(e,"class","svelte-x94b79")},m(l,s){m(l,e,s)},p:q,i:q,o:q,d(l){l&&o(e)}}}function Ct(a){let e,t,l,s=a[6].toLocaleString()+"",r,d,n="■",_,B,y,C,E=a[6].toLocaleString()+"",P,w,I,v,g,L,O,A,D,F,S,z,k="Coupons",i,c,T,R="C<sub>0</sub> Series",M,V,J,ne,se,pe="Vault Threads",ae,Z,ee,de,_e,K=a[7]&&Ie(a),Y=a[7]&&Ve(a);L=new Je({props:{time:a[6],size:"150"}}),D=new Fe({props:{address:a[1]}});let Q=a[7]&&Ue();V=new Fe({props:{address:a[0]}});function Le(f,H){return f[2]?Lt:Dt}let me=Le(a),le=me(a);const $e=[At,Bt],oe=[];function we(f,H){return f[3]&&f[3].length?0:1}return Z=we(a),ee=oe[Z]=$e[Z](a),{c(){e=b("div"),t=b("h1"),l=U("Vault "),r=U(s),d=b("sub"),d.textContent=n,_=x(),K&&K.c(),B=x(),y=b("p"),C=U("A vault contract locking coins against tokens until block "),P=U(E),w=U("."),I=x(),Y&&Y.c(),v=x(),g=b("div"),ke(L.$$.fragment),O=x(),A=b("div"),ke(D.$$.fragment),F=x(),Q&&Q.c(),S=x(),z=b("h4"),z.textContent=k,i=x(),c=b("div"),T=b("p"),T.innerHTML=R,M=x(),ke(V.$$.fragment),J=x(),le.c(),ne=x(),se=b("h4"),se.textContent=pe,ae=x(),ee.c(),de=re(),this.h()},l(f){e=p(f,"DIV",{style:!0});var H=$(e);t=p(H,"H1",{});var ie=$(t);l=j(ie,"Vault "),r=j(ie,s),d=p(ie,"SUB",{"data-svelte-h":!0}),W(d)!=="svelte-e09y70"&&(d.textContent=n),ie.forEach(o),_=N(H),K&&K.l(H),H.forEach(o),B=N(f),y=p(f,"P",{class:!0});var ce=$(y);C=j(ce,"A vault contract locking coins against tokens until block "),P=j(ce,E),w=j(ce,"."),ce.forEach(o),I=N(f),Y&&Y.l(f),v=N(f),g=p(f,"DIV",{style:!0});var ue=$(g);ge(L.$$.fragment,ue),O=N(ue),A=p(ue,"DIV",{});var he=$(A);ge(D.$$.fragment,he),he.forEach(o),ue.forEach(o),F=N(f),Q&&Q.l(f),S=N(f),z=p(f,"H4",{"data-svelte-h":!0}),W(z)!=="svelte-1donjrv"&&(z.textContent=k),i=N(f),c=p(f,"DIV",{style:!0});var ve=$(c);T=p(ve,"P",{class:!0,"data-svelte-h":!0}),W(T)!=="svelte-1ppxzaf"&&(T.innerHTML=R),M=N(ve),ge(V.$$.fragment,ve),ve.forEach(o),J=N(f),le.l(f),ne=N(f),se=p(f,"H4",{"data-svelte-h":!0}),W(se)!=="svelte-5lx8ud"&&(se.textContent=pe),ae=N(f),ee.l(f),de=re(),this.h()},h(){fe(e,"display","flex"),fe(e,"flex-wrap","wrap"),h(y,"class","svelte-x94b79"),fe(g,"display","flex"),h(T,"class","svelte-x94b79"),fe(c,"display","flex")},m(f,H){m(f,e,H),u(e,t),u(t,l),u(t,r),u(t,d),u(e,_),K&&K.m(e,null),m(f,B,H),m(f,y,H),u(y,C),u(y,P),u(y,w),m(f,I,H),Y&&Y.m(f,H),m(f,v,H),m(f,g,H),Ce(L,g,null),u(g,O),u(g,A),Ce(D,A,null),m(f,F,H),Q&&Q.m(f,H),m(f,S,H),m(f,z,H),m(f,i,H),m(f,c,H),u(c,T),u(c,M),Ce(V,c,null),m(f,J,H),le.m(f,H),m(f,ne,H),m(f,se,H),m(f,ae,H),oe[Z].m(f,H),m(f,de,H),_e=!0},p(f,H){(!_e||H[0]&64)&&s!==(s=f[6].toLocaleString()+"")&&G(r,s),f[7]?K?K.p(f,H):(K=Ie(f),K.c(),K.m(e,null)):K&&(K.d(1),K=null),(!_e||H[0]&64)&&E!==(E=f[6].toLocaleString()+"")&&G(P,E),f[7]?Y?Y.p(f,H):(Y=Ve(f),Y.c(),Y.m(v.parentNode,v)):Y&&(Y.d(1),Y=null);const ie={};H[0]&64&&(ie.time=f[6]),L.$set(ie);const ce={};H[0]&2&&(ce.address=f[1]),D.$set(ce),f[7]?Q||(Q=Ue(),Q.c(),Q.m(S.parentNode,S)):Q&&(Q.d(1),Q=null);const ue={};H[0]&1&&(ue.address=f[0]),V.$set(ue),me===(me=Le(f))&&le?le.p(f,H):(le.d(1),le=me(f),le&&(le.c(),le.m(ne.parentNode,ne)));let he=Z;Z=we(f),Z===he?oe[Z].p(f,H):(ye(),te(oe[he],1,1,()=>{oe[he]=null}),Se(),ee=oe[Z],ee?ee.p(f,H):(ee=oe[Z]=$e[Z](f),ee.c()),X(ee,1),ee.m(de.parentNode,de))},i(f){_e||(X(L.$$.fragment,f),X(D.$$.fragment,f),X(V.$$.fragment,f),X(ee),_e=!0)},o(f){te(L.$$.fragment,f),te(D.$$.fragment,f),te(V.$$.fragment,f),te(ee),_e=!1},d(f){f&&(o(e),o(B),o(y),o(I),o(v),o(g),o(F),o(S),o(z),o(i),o(c),o(J),o(ne),o(se),o(ae),o(de)),K&&K.d(),Y&&Y.d(f),Te(L),Te(D),Q&&Q.d(f),Te(V),le.d(f),oe[Z].d(f)}}}function Ie(a){let e,t=a[6]-a[7]>0&&Me(a);return{c(){t&&t.c(),e=re()},l(l){t&&t.l(l),e=re()},m(l,s){t&&t.m(l,s),m(l,e,s)},p(l,s){l[6]-l[7]>0?t?t.p(l,s):(t=Me(l),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},d(l){l&&o(e),t&&t.d(l)}}}function Me(a){let e,t,l=(a[6]-a[7]).toLocaleString()+"",s,r,d="■";return{c(){e=b("h2"),t=U("T  -"),s=U(l),r=b("sub"),r.textContent=d},l(n){e=p(n,"H2",{});var _=$(e);t=j(_,"T  -"),s=j(_,l),r=p(_,"SUB",{"data-svelte-h":!0}),W(r)!=="svelte-e09y70"&&(r.textContent=d),_.forEach(o)},m(n,_){m(n,e,_),u(e,t),u(e,s),u(e,r)},p(n,_){_[0]&192&&l!==(l=(n[6]-n[7]).toLocaleString()+"")&&G(s,l)},d(n){n&&o(e)}}}function Ve(a){let e,t;function l(d,n){return d[6]-d[7]>=2e3?yt:d[6]-d[7]>=0?St:d[6]-d[7]<0?Et:Tt}let s=l(a),r=s(a);return{c(){e=b("p"),t=b("b"),r.c(),this.h()},l(d){e=p(d,"P",{class:!0});var n=$(e);t=p(n,"B",{});var _=$(t);r.l(_),_.forEach(o),n.forEach(o),this.h()},h(){h(e,"class","svelte-x94b79")},m(d,n){m(d,e,n),u(e,t),r.m(t,null)},p(d,n){s===(s=l(d))&&r?r.p(d,n):(r.d(1),r=s(d),r&&(r.c(),r.m(t,null)))},d(d){d&&o(e),r.d()}}}function Tt(a){let e;return{c(){e=U("-")},l(t){e=j(t,"-")},m(t,l){m(t,e,l)},p:q,d(t){t&&o(e)}}}function Et(a){let e;return{c(){e=U("Redemptions are open")},l(t){e=j(t,"Redemptions are open")},m(t,l){m(t,e,l)},p:q,d(t){t&&o(e)}}}function St(a){let e,t=be(a[7],a[6]).toLocaleDateString()+"",l,s,r=be(a[7],a[6]).toLocaleTimeString()+"",d;return{c(){e=U(`Unlocks around
						`),l=U(t),s=x(),d=U(r)},l(n){e=j(n,`Unlocks around
						`),l=j(n,t),s=N(n),d=j(n,r)},m(n,_){m(n,e,_),m(n,l,_),m(n,s,_),m(n,d,_)},p(n,_){_[0]&192&&t!==(t=be(n[7],n[6]).toLocaleDateString()+"")&&G(l,t),_[0]&192&&r!==(r=be(n[7],n[6]).toLocaleTimeString()+"")&&G(d,r)},d(n){n&&(o(e),o(l),o(s),o(d))}}}function yt(a){let e,t=be(a[7],a[6]).toLocaleDateString()+"",l;return{c(){e=U(`Unlocking around
						`),l=U(t)},l(s){e=j(s,`Unlocking around
						`),l=j(s,t)},m(s,r){m(s,e,r),m(s,l,r)},p(s,r){r[0]&192&&t!==(t=be(s[7],s[6]).toLocaleDateString()+"")&&G(l,t)},d(s){s&&(o(e),o(l))}}}function Ue(a){return{c:q,l:q,m:q,d:q}}function Dt(a){let e,t="loading coupons...";return{c(){e=b("p"),e.textContent=t,this.h()},l(l){e=p(l,"P",{class:!0,"data-svelte-h":!0}),W(e)!=="svelte-1frqwd1"&&(e.textContent=t),this.h()},h(){h(e,"class","svelte-x94b79")},m(l,s){m(l,e,s)},p:q,d(l){l&&o(e)}}}function Lt(a){let e;function t(r,d){return r[2].length>0?wt:$t}let l=t(a),s=l(a);return{c(){s.c(),e=re()},l(r){s.l(r),e=re()},m(r,d){s.m(r,d),m(r,e,d)},p(r,d){l===(l=t(r))&&s?s.p(r,d):(s.d(1),s=l(r),s&&(s.c(),s.m(e.parentNode,e)))},d(r){r&&o(e),s.d(r)}}}function $t(a){let e,t="no coupons available";return{c(){e=b("p"),e.textContent=t,this.h()},l(l){e=p(l,"P",{class:!0,"data-svelte-h":!0}),W(e)!=="svelte-r1zx0p"&&(e.textContent=t),this.h()},h(){h(e,"class","svelte-x94b79")},m(l,s){m(l,e,s)},p:q,d(l){l&&o(e)}}}function wt(a){let e,t,l=`<tr class="header svelte-x94b79"><td class="svelte-x94b79"></td> <td class="svelte-x94b79">place</td> <td class="svelte-x94b79">coupon</td> <td colspan="2" class="svelte-x94b79">spot rate</td> <td class="svelte-x94b79">action</td></tr> <tr class="units svelte-x94b79"><td class="svelte-x94b79"></td> <td class="r svelte-x94b79"><img width="15" src="${Ge}" alt="bchLogo"/></td> <td class="r svelte-x94b79">sats</td> <td class="r svelte-x94b79">spb</td> <td class="svelte-x94b79">per annum</td> <td class="svelte-x94b79"></td></tr>`,s,r,d,n,_,B="∑",y,C,E,P=a[4].toFixed(0)+"",w,I,v,g,L=a[5].toLocaleString()+"",O,A,D,F,S,z,k,i=Ee(a[2]),c=[];for(let T=0;T<i.length;T+=1)c[T]=je(Pe(a,i,T));return{c(){e=b("table"),t=b("thead"),t.innerHTML=l,s=x(),r=b("tbody");for(let T=0;T<c.length;T+=1)c[T].c();d=x(),n=b("tr"),_=b("td"),_.textContent=B,y=x(),C=b("td"),E=b("b"),w=U(P),I=x(),v=b("td"),g=b("b"),O=U(L),A=x(),D=b("td"),F=x(),S=b("td"),z=x(),k=b("td"),this.h()},l(T){e=p(T,"TABLE",{class:!0});var R=$(e);t=p(R,"THEAD",{class:!0,"data-svelte-h":!0}),W(t)!=="svelte-ye8pmv"&&(t.innerHTML=l),s=N(R),r=p(R,"TBODY",{class:!0});var M=$(r);for(let ae=0;ae<c.length;ae+=1)c[ae].l(M);d=N(M),n=p(M,"TR",{style:!0,class:!0});var V=$(n);_=p(V,"TD",{class:!0,"data-svelte-h":!0}),W(_)!=="svelte-1fyh9ab"&&(_.textContent=B),y=N(V),C=p(V,"TD",{class:!0});var J=$(C);E=p(J,"B",{});var ne=$(E);w=j(ne,P),ne.forEach(o),J.forEach(o),I=N(V),v=p(V,"TD",{class:!0});var se=$(v);g=p(se,"B",{});var pe=$(g);O=j(pe,L),pe.forEach(o),se.forEach(o),A=N(V),D=p(V,"TD",{class:!0}),$(D).forEach(o),F=N(V),S=p(V,"TD",{class:!0}),$(S).forEach(o),z=N(V),k=p(V,"TD",{class:!0}),$(k).forEach(o),V.forEach(o),M.forEach(o),R.forEach(o),this.h()},h(){h(t,"class","svelte-x94b79"),h(_,"class","svelte-x94b79"),h(C,"class","r svelte-x94b79"),h(v,"class","r svelte-x94b79"),h(D,"class","svelte-x94b79"),h(S,"class","svelte-x94b79"),h(k,"class","svelte-x94b79"),fe(n,"border-top","solid thin"),h(n,"class","svelte-x94b79"),h(r,"class","svelte-x94b79"),h(e,"class","couponTable svelte-x94b79")},m(T,R){m(T,e,R),u(e,t),u(e,s),u(e,r);for(let M=0;M<c.length;M+=1)c[M]&&c[M].m(r,null);u(r,d),u(r,n),u(n,_),u(n,y),u(n,C),u(C,E),u(E,w),u(n,I),u(n,v),u(v,g),u(g,O),u(n,A),u(n,D),u(n,F),u(n,S),u(n,z),u(n,k)},p(T,R){if(R[0]&964){i=Ee(T[2]);let M;for(M=0;M<i.length;M+=1){const V=Pe(T,i,M);c[M]?c[M].p(V,R):(c[M]=je(V),c[M].c(),c[M].m(r,d))}for(;M<c.length;M+=1)c[M].d(1);c.length=i.length}R[0]&16&&P!==(P=T[4].toFixed(0)+"")&&G(w,P),R[0]&32&&L!==(L=T[5].toLocaleString()+"")&&G(O,L)},d(T){T&&o(e),Ye(c,T)}}}function xt(a){let e,t='<button class="action svelte-x94b79" disabled="">low bal.</button>';return{c(){e=b("td"),e.innerHTML=t,this.h()},l(l){e=p(l,"TD",{style:!0,class:!0,"data-svelte-h":!0}),W(e)!=="svelte-sh3k75"&&(e.innerHTML=t),this.h()},h(){fe(e,"text-align","center"),h(e,"class","svelte-x94b79")},m(l,s){m(l,e,s)},p:q,d(l){l&&o(e)}}}function Nt(a){let e,t,l="claim",s,r;function d(){return a[10](a[28])}return{c(){e=b("td"),t=b("button"),t.textContent=l,this.h()},l(n){e=p(n,"TD",{style:!0,class:!0});var _=$(e);t=p(_,"BUTTON",{class:!0,"data-svelte-h":!0}),W(t)!=="svelte-js57qa"&&(t.textContent=l),_.forEach(o),this.h()},h(){h(t,"class","action svelte-x94b79"),fe(e,"text-align","center"),h(e,"class","svelte-x94b79")},m(n,_){m(n,e,_),u(e,t),s||(r=tt(t,"click",d),s=!0)},p(n,_){a=n},d(n){n&&o(e),s=!1,r()}}}function je(a){let e,t,l="C<sub>0</sub>",s,r,d="1",n,_,B,y=Number(a[28].satoshis).toLocaleString()+"",C,E,P,w=(a[6]-a[7]>0?(Number(a[28].satoshis)/(a[6]-a[7])).toLocaleString(void 0,{maximumFractionDigits:0,minimumFractionDigits:0}):(1/0).toLocaleString())+"",I,v,g,L,O=(a[6]-a[7]>0?(Number(a[28].satoshis)/(a[6]-a[7])/(1e6/52596)).toLocaleString(void 0,{maximumFractionDigits:1,minimumFractionDigits:1}):(1/0).toLocaleString())+"",A,D,F;function S(i,c){return i[8]>1e8?Nt:xt}let z=S(a),k=z(a);return{c(){e=b("tr"),t=b("td"),t.innerHTML=l,s=x(),r=b("td"),n=U(d),_=x(),B=b("td"),C=U(y),E=x(),P=b("td"),I=U(w),v=x(),g=b("td"),L=b("i"),A=U(O),D=U("%"),F=x(),k.c(),this.h()},l(i){e=p(i,"TR",{class:!0});var c=$(e);t=p(c,"TD",{class:!0,"data-svelte-h":!0}),W(t)!=="svelte-19mkn5i"&&(t.innerHTML=l),s=N(c),r=p(c,"TD",{class:!0});var T=$(r);n=j(T,d),T.forEach(o),_=N(c),B=p(c,"TD",{class:!0});var R=$(B);C=j(R,y),R.forEach(o),E=N(c),P=p(c,"TD",{class:!0});var M=$(P);I=j(M,w),M.forEach(o),v=N(c),g=p(c,"TD",{class:!0});var V=$(g);L=p(V,"I",{});var J=$(L);A=j(J,O),D=j(J,"%"),J.forEach(o),V.forEach(o),F=N(c),k.l(c),c.forEach(o),this.h()},h(){h(t,"class","svelte-x94b79"),h(r,"class","r svelte-x94b79"),h(B,"class","sats svelte-x94b79"),h(P,"class","sats svelte-x94b79"),h(g,"class","r svelte-x94b79"),h(e,"class","svelte-x94b79")},m(i,c){m(i,e,c),u(e,t),u(e,s),u(e,r),u(r,n),u(e,_),u(e,B),u(B,C),u(e,E),u(e,P),u(P,I),u(e,v),u(e,g),u(g,L),u(L,A),u(L,D),u(e,F),k.m(e,null)},p(i,c){c[0]&4&&y!==(y=Number(i[28].satoshis).toLocaleString()+"")&&G(C,y),c[0]&196&&w!==(w=(i[6]-i[7]>0?(Number(i[28].satoshis)/(i[6]-i[7])).toLocaleString(void 0,{maximumFractionDigits:0,minimumFractionDigits:0}):(1/0).toLocaleString())+"")&&G(I,w),c[0]&196&&O!==(O=(i[6]-i[7]>0?(Number(i[28].satoshis)/(i[6]-i[7])/(1e6/52596)).toLocaleString(void 0,{maximumFractionDigits:1,minimumFractionDigits:1}):(1/0).toLocaleString())+"")&&G(A,O),z===(z=S(i))&&k?k.p(i,c):(k.d(1),k=z(i),k&&(k.c(),k.m(e,null)))},d(i){i&&o(e),k.d()}}}function Bt(a){let e,t="loading threads...";return{c(){e=b("p"),e.textContent=t,this.h()},l(l){e=p(l,"P",{class:!0,"data-svelte-h":!0}),W(e)!=="svelte-1njcfnz"&&(e.textContent=t),this.h()},h(){h(e,"class","svelte-x94b79")},m(l,s){m(l,e,s)},p:q,i:q,o:q,d(l){l&&o(e)}}}function At(a){let e,t,l,s,r="category",d,n,_="BCH",B,y,C,E=String(a[6]).padStart(7,"0")+"",P,w,I,v,g,L,O=xe.get(a[6])+"",A,D,F=Ee(a[3]),S=[];for(let k=0;k<F.length;k+=1)S[k]=ze(He(a,F,k));const z=k=>te(S[k],1,1,()=>{S[k]=null});return{c(){e=b("table"),t=b("thead"),l=b("tr"),s=b("td"),s.textContent=r,d=x(),n=b("td"),n.textContent=_,B=x(),y=b("td"),C=U("FBCH-"),P=U(E),w=x(),I=b("tbody");for(let k=0;k<S.length;k+=1)S[k].c();v=x(),g=b("p"),L=U("Use category: "),A=U(O),this.h()},l(k){e=p(k,"TABLE",{class:!0});var i=$(e);t=p(i,"THEAD",{class:!0});var c=$(t);l=p(c,"TR",{class:!0});var T=$(l);s=p(T,"TD",{class:!0,"data-svelte-h":!0}),W(s)!=="svelte-1nbycu6"&&(s.textContent=r),d=N(T),n=p(T,"TD",{class:!0,"data-svelte-h":!0}),W(n)!=="svelte-eke3it"&&(n.textContent=_),B=N(T),y=p(T,"TD",{class:!0});var R=$(y);C=j(R,"FBCH-"),P=j(R,E),R.forEach(o),T.forEach(o),c.forEach(o),w=N(i),I=p(i,"TBODY",{class:!0});var M=$(I);for(let J=0;J<S.length;J+=1)S[J].l(M);M.forEach(o),i.forEach(o),v=N(k),g=p(k,"P",{class:!0});var V=$(g);L=j(V,"Use category: "),A=j(V,O),V.forEach(o),this.h()},h(){h(s,"class","svelte-x94b79"),h(n,"class","svelte-x94b79"),h(y,"class","svelte-x94b79"),h(l,"class","header svelte-x94b79"),h(t,"class","svelte-x94b79"),h(I,"class","svelte-x94b79"),h(e,"class","couponTable svelte-x94b79"),h(g,"class","cashaddr svelte-x94b79")},m(k,i){m(k,e,i),u(e,t),u(t,l),u(l,s),u(l,d),u(l,n),u(l,B),u(l,y),u(y,C),u(y,P),u(e,w),u(e,I);for(let c=0;c<S.length;c+=1)S[c]&&S[c].m(I,null);m(k,v,i),m(k,g,i),u(g,L),u(g,A),D=!0},p(k,i){if((!D||i[0]&64)&&E!==(E=String(k[6]).padStart(7,"0")+"")&&G(P,E),i[0]&8){F=Ee(k[3]);let c;for(c=0;c<F.length;c+=1){const T=He(k,F,c);S[c]?(S[c].p(T,i),X(S[c],1)):(S[c]=ze(T),S[c].c(),X(S[c],1),S[c].m(I,null))}for(ye(),c=F.length;c<S.length;c+=1)z(c);Se()}(!D||i[0]&64)&&O!==(O=xe.get(k[6])+"")&&G(A,O)},i(k){if(!D){for(let i=0;i<F.length;i+=1)X(S[i]);D=!0}},o(k){S=S.filter(Boolean);for(let i=0;i<S.length;i+=1)te(S[i]);D=!1},d(k){k&&(o(e),o(v),o(g)),Ye(S,k)}}}function Oe(a){let e,t,l,s=a[28].token.category.substring(0,4)+"..."+a[28].token.category.slice(-2),r,d,n,_=(Number(a[28].satoshis)/1e8).toLocaleString(void 0,{})+"",B,y,C,E,P,w,I,v,g,L,O,A=a[28].token&&Re(a);return g=new Je({props:{time:Ne.get(a[28].token?.category),size:"15"}}),{c(){e=b("tr"),t=b("td"),l=b("i"),r=U(s),d=x(),n=b("td"),B=U(_),y=x(),C=b("img"),P=x(),w=b("td"),I=b("i"),A&&A.c(),v=x(),ke(g.$$.fragment),L=x(),this.h()},l(D){e=p(D,"TR",{class:!0});var F=$(e);t=p(F,"TD",{class:!0});var S=$(t);l=p(S,"I",{});var z=$(l);r=j(z,s),z.forEach(o),S.forEach(o),d=N(F),n=p(F,"TD",{class:!0});var k=$(n);B=j(k,_),y=N(k),C=p(k,"IMG",{width:!0,src:!0,alt:!0}),k.forEach(o),P=N(F),w=p(F,"TD",{class:!0});var i=$(w);I=p(i,"I",{});var c=$(I);A&&A.l(c),c.forEach(o),v=N(i),ge(g.$$.fragment,i),i.forEach(o),L=N(F),F.forEach(o),this.h()},h(){h(t,"class","svelte-x94b79"),h(C,"width","15"),Ze(C.src,E=Ge)||h(C,"src",E),h(C,"alt","bchLogo"),h(n,"class","r svelte-x94b79"),h(w,"class","r svelte-x94b79"),h(e,"class","svelte-x94b79")},m(D,F){m(D,e,F),u(e,t),u(t,l),u(l,r),u(e,d),u(e,n),u(n,B),u(n,y),u(n,C),u(e,P),u(e,w),u(w,I),A&&A.m(I,null),u(w,v),Ce(g,w,null),u(e,L),O=!0},p(D,F){(!O||F[0]&8)&&s!==(s=D[28].token.category.substring(0,4)+"..."+D[28].token.category.slice(-2))&&G(r,s),(!O||F[0]&8)&&_!==(_=(Number(D[28].satoshis)/1e8).toLocaleString(void 0,{})+"")&&G(B,_),D[28].token?A?A.p(D,F):(A=Re(D),A.c(),A.m(I,null)):A&&(A.d(1),A=null);const S={};F[0]&8&&(S.time=Ne.get(D[28].token?.category)),g.$set(S)},i(D){O||(X(g.$$.fragment,D),O=!0)},o(D){te(g.$$.fragment,D),O=!1},d(D){D&&o(e),A&&A.d(),Te(g)}}}function Re(a){let e=(Number(a[28].token.amount)/1e8).toLocaleString(void 0,{})+"",t;return{c(){t=U(e)},l(l){t=j(l,e)},m(l,s){m(l,t,s)},p(l,s){s[0]&8&&e!==(e=(Number(l[28].token.amount)/1e8).toLocaleString(void 0,{})+"")&&G(t,e)},d(l){l&&o(t)}}}function ze(a){let e,t,l=a[28].token&&Oe(a);return{c(){l&&l.c(),e=re()},l(s){l&&l.l(s),e=re()},m(s,r){l&&l.m(s,r),m(s,e,r),t=!0},p(s,r){s[28].token?l?(l.p(s,r),r[0]&8&&X(l,1)):(l=Oe(s),l.c(),X(l,1),l.m(e.parentNode,e)):l&&(ye(),te(l,1,1,()=>{l=null}),Se())},i(s){t||(X(l),t=!0)},o(s){te(l),t=!1},d(s){s&&o(e),l&&l.d(s)}}}function Ft(a){let e,t,l,s,r,d,n,_=`Note:<br/>
		sats (satoshis): one 100,000,000<sup>th</sup> of a whole coin.<br/>
		spb: rate in sats per coin per block of time remaining to maturation.<br/>
		spot rate per annum: effective non-compounding rate of annual return.`,B;function y(v,g){return v[6]>858e3?kt:vt}let C=y(a),E=C(a);const P=[Ct,gt],w=[];function I(v,g){return v[6]?0:1}return s=I(a),r=w[s]=P[s](a),{c(){E.c(),e=re(),t=x(),l=b("div"),r.c(),d=x(),n=b("p"),n.innerHTML=_,this.h()},l(v){const g=et("svelte-1vc10dk",document.head);E.l(g),e=re(),g.forEach(o),t=N(v),l=p(v,"DIV",{class:!0});var L=$(l);r.l(L),d=N(L),n=p(L,"P",{class:!0,"data-svelte-h":!0}),W(n)!=="svelte-1vt619a"&&(n.innerHTML=_),L.forEach(o),this.h()},h(){h(n,"class","svelte-x94b79"),h(l,"class","text-column")},m(v,g){E.m(document.head,null),u(document.head,e),m(v,t,g),m(v,l,g),w[s].m(l,null),u(l,d),u(l,n),B=!0},p(v,g){C===(C=y(v))&&E?E.p(v,g):(E.d(1),E=C(v),E&&(E.c(),E.m(e.parentNode,e)));let L=s;s=I(v),s===L?w[s].p(v,g):(ye(),te(w[L],1,1,()=>{w[L]=null}),Se(),r=w[s],r?r.p(v,g):(r=w[s]=P[s](v),r.c()),X(r,1),r.m(l,d))},i(v){B||(X(r),B=!0)},o(v){te(r),B=!1},d(v){v&&(o(t),o(l)),E.d(v),o(e),w[s].d()}}}function Ht(a,e,t){let l;Qe(a,nt,i=>t(23,l=i));let s,r,d,n,_,B,y,C,E,P,w="",I,v,g,L,O;st.subscribe(i=>{t(7,g=i)});const A=async function(i){await i.getUtxos(r).then(c=>t(3,C=c))},D=async function(i){await i.getUtxos(L.getDepositAddress()).then(c=>c)},F=async function(i){i.getUtxos(s).then(c=>{t(2,y=c),y.length>0&&(y.sort((T,R)=>parseFloat(R.satoshis)-parseFloat(T.satoshis)),t(4,E=y.length),t(5,P=Number(y.reduce((T,R)=>T+R.satoshis,0n))))})},S=async function(i){let c=[{placement:100000000n,coupon:i,locktime:v}];try{await L.swap(c),w=""}catch(T){w=T,at.push(`Error: ${T}`,{classes:["warn"]})}},z=function(i){i.method==="blockchain.address.subscribe"&&(console.log(i),i.params[0]==L.getTokenDepositAddress()?i.params[1]!==_&&(_=i.params[1],D(B)):i.params[0]==r?i.params[1]!==n&&(n=i.params[1],A(B)):i.params[0]==s&&i.params[1]!==d&&(d=i.params[1],F(B)))};return Xe(async()=>{try{ot.StorageProvider=it,L=await ct.named("hot"),t(8,O=await L.getBalance("sats"))}catch(T){throw T}I=l.url.searchParams.get("block")||void 0,t(6,v=Number(I)),t(0,s=De.getCoupon(1e8,v)),t(1,r=De.getAddress(v)),De.getAddress(v,rt.mainnet,!1);let i=new ft("@fbch/app","1.4.3",1,1,dt.RANDOM,2e3);i.addServer("bch.imaginary.cash",50004,_t.WSS.Scheme,!1),B=new ut("mainnet",i,!1),await Promise.all([A(B),F(B),D(B)]);const c=new ht("FBCH/webapp","1.4.1","bch.imaginary.cash",Be.WSS.Port,Be.WSS.Scheme);await c.connect().then(()=>{c.on("notification",z),c.subscribe("blockchain.address.subscribe",L.getTokenDepositAddress()),c.subscribe("blockchain.address.subscribe",s),c.subscribe("blockchain.address.subscribe",r)}),(Number(C.reduce((T,R)=>T+R.satoshis,0n))-7e3)/1e8}),[s,r,y,C,E,P,v,g,O,S,i=>S(i)]}class Wt extends We{constructor(e){super(),Ke(this,e,Ht,Ft,qe,{},null,[-1,-1])}}export{Wt as component,qt as universal};
//# sourceMappingURL=9.CUaBelS-.js.map
