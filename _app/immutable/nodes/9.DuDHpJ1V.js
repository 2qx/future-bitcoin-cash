import{s as Ae,n as K,c as je,o as Ue,b as Re,i as ze,r as Oe,a as qe}from"../chunks/scheduler.CoKJEDLV.js";import{S as Ie,i as Me,e as h,c as m,a as F,d as n,m as p,g as C,t as j,s as w,b as U,f as H,h as c,x as te,p as We,r as Z,u as de,v as Q,w as fe,o as Y,z as pe,A as ve,n as _e,B as be,E as ke,j as G,C as ge,y as Pe}from"../chunks/index.PTRJg19q.js";import{a as Ye,h as Ge,V as he,C as Ke,g as re,e as ue}from"../chunks/vault.C038rFrh.js";import{p as Je}from"../chunks/stores.D-GUjZkg.js";import{c as Qe}from"../chunks/copy.CPFc3Dt_.js";import{t as me}from"../chunks/SvelteToast.svelte_svelte_type_style_lang.8ep8mfxG.js";import{B as Xe,I as Ze,F as xe,E as et,C as ye}from"../chunks/wallet.DHpmPZpP.js";import{$ as tt,a as lt,b as st,c as ot}from"../chunks/bch.UjQGvx2B.js";import{S as Ve}from"../chunks/SeriesIcon.BZVYKSax.js";const rt=!0,Mt=Object.freeze(Object.defineProperty({__proto__:null,prerender:rt},Symbol.toStringTag,{value:"Module"}));function De(a){let e,l,t,s,r,u,o,i,y,A;return{c(){e=h("a"),l=j("salemkode"),s=w(),r=h("a"),u=j("3xpl"),o=w(),i=h("a"),y=j("electroncash.de"),this.h()},l(b){e=m(b,"A",{target:!0,href:!0,class:!0});var D=F(e);l=U(D,"salemkode"),D.forEach(n),s=H(b),r=m(b,"A",{target:!0,href:!0,class:!0});var v=F(r);u=U(v,"3xpl"),v.forEach(n),o=H(b),i=m(b,"A",{target:!0,href:!0,class:!0});var T=F(i);y=U(T,"electroncash.de"),T.forEach(n),this.h()},h(){p(e,"target","_blank"),p(e,"href",t="https://explorer.salemkode.com/address/"+a[0]),p(e,"class","svelte-1x0h9jt"),p(r,"target","_blank"),p(r,"href","https://3xpl.com/bitcoin-cash/address/"+a[1].split(":")[1]),p(r,"class","svelte-1x0h9jt"),p(i,"target","_blank"),p(i,"href",A="https://explorer.electroncash.de/address/"+a[0]),p(i,"class","svelte-1x0h9jt")},m(b,D){C(b,e,D),c(e,l),C(b,s,D),C(b,r,D),c(r,u),C(b,o,D),C(b,i,D),c(i,y)},p(b,D){D&1&&t!==(t="https://explorer.salemkode.com/address/"+b[0])&&p(e,"href",t),D&1&&A!==(A="https://explorer.electroncash.de/address/"+b[0])&&p(i,"href",A)},d(b){b&&(n(e),n(s),n(r),n(o),n(i))}}}function at(a){let e,l=a[0]&&De(a);return{c(){e=h("div"),l&&l.c(),this.h()},l(t){e=m(t,"DIV",{class:!0});var s=F(e);l&&l.l(s),s.forEach(n),this.h()},h(){p(e,"class","svelte-1x0h9jt")},m(t,s){C(t,e,s),l&&l.m(e,null)},p(t,[s]){t[0]?l?l.p(t,s):(l=De(t),l.c(),l.m(e,null)):l&&(l.d(1),l=null)},i:K,o:K,d(t){t&&n(e),l&&l.d()}}}function nt(a,e,l){let{address:t}=e;const s=Ye(t);return a.$$set=r=>{"address"in r&&l(0,t=r.address)},[t,s]}class it extends Ie{constructor(e){super(),Me(this,e,nt,at,Ae,{address:0})}}function Se(a,e,l){const t=a.slice();return t[23]=e[l],t}function Le(a,e,l){const t=a.slice();return t[23]=e[l],t}function ct(a){let e,l,t,s;return{c(){e=w(),l=h("meta"),t=w(),s=h("link"),this.h()},l(r){e=H(r),l=m(r,"META",{name:!0,content:!0}),t=H(r),s=m(r,"LINK",{rel:!0,type:!0,href:!0}),this.h()},h(){document.title="FBCH",p(l,"name","description"),p(l,"content","Future Vault Series"),p(s,"rel","icon"),p(s,"type","image/svg"),p(s,"href","/FBCH.svg")},m(r,u){C(r,e,u),C(r,l,u),C(r,t,u),C(r,s,u)},p:K,d(r){r&&(n(e),n(l),n(t),n(s))}}}function ut(a){let e,l,t,s,r,u;return document.title=e="FBCH-"+a[6],{c(){l=w(),t=h("meta"),s=w(),r=h("link"),this.h()},l(o){l=H(o),t=m(o,"META",{name:!0,content:!0}),s=H(o),r=m(o,"LINK",{rel:!0,type:!0,href:!0}),this.h()},h(){p(t,"name","description"),p(t,"content","Future Vault Series"),p(r,"rel","icon"),p(r,"type","image/svg"),p(r,"href",u="/FBCH-"+a[6]+".svg")},m(o,i){C(o,l,i),C(o,t,i),C(o,s,i),C(o,r,i)},p(o,i){i&64&&e!==(e="FBCH-"+o[6])&&(document.title=e),i&64&&u!==(u="/FBCH-"+o[6]+".svg")&&p(r,"href",u)},d(o){o&&(n(l),n(t),n(s),n(r))}}}function dt(a){let e,l="loading...";return{c(){e=h("p"),e.textContent=l,this.h()},l(t){e=m(t,"P",{class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-qeejp2"&&(e.textContent=l),this.h()},h(){p(e,"class","svelte-1d2t7oo")},m(t,s){C(t,e,s)},p:K,i:K,o:K,d(t){t&&n(e)}}}function ft(a){let e,l,t=a[6].toLocaleString()+"",s,r,u="■",o,i,y,A,b,D,v,T,S,R="Coupons",B,g,V,k,d="C<sub>0</sub>",_,N,O,P,L,E,z="Vault Threads",W,$,M,J,x,se,ae;y=new Ve({props:{time:a[6],size:"150"}}),D=new it({props:{address:a[1]}});let q=a[7]&&Fe(a);function Ce(f,I){return f[2]?bt:vt}let ie=Ce(a),X=ie(a);const Ee=[yt,Tt],ee=[];function Te(f,I){return f[3]&&f[3].length?0:1}return $=Te(a),M=ee[$]=Ee[$](a),{c(){e=h("h1"),l=j("Vault "),s=j(t),r=h("sub"),r.textContent=u,o=w(),i=h("div"),pe(y.$$.fragment),A=w(),b=h("div"),pe(D.$$.fragment),v=w(),q&&q.c(),T=w(),S=h("h4"),S.textContent=R,B=w(),g=h("div"),V=h("p"),k=h("b"),k.innerHTML=d,_=j(":"),N=j(a[0]),P=w(),X.c(),L=w(),E=h("h4"),E.textContent=z,W=w(),M.c(),J=te(),this.h()},l(f){e=m(f,"H1",{});var I=F(e);l=U(I,"Vault "),s=U(I,t),r=m(I,"SUB",{"data-svelte-h":!0}),Y(r)!=="svelte-e09y70"&&(r.textContent=u),I.forEach(n),o=H(f),i=m(f,"DIV",{style:!0});var le=F(i);ve(y.$$.fragment,le),A=H(le),b=m(le,"DIV",{});var ne=F(b);ve(D.$$.fragment,ne),ne.forEach(n),le.forEach(n),v=H(f),q&&q.l(f),T=H(f),S=m(f,"H4",{"data-svelte-h":!0}),Y(S)!=="svelte-1donjrv"&&(S.textContent=R),B=H(f),g=m(f,"DIV",{class:!0});var oe=F(g);V=m(oe,"P",{class:!0});var ce=F(V);k=m(ce,"B",{"data-svelte-h":!0}),Y(k)!=="svelte-1yuxbsw"&&(k.innerHTML=d),_=U(ce,":"),N=U(ce,a[0]),ce.forEach(n),oe.forEach(n),P=H(f),X.l(f),L=H(f),E=m(f,"H4",{"data-svelte-h":!0}),Y(E)!=="svelte-5lx8ud"&&(E.textContent=z),W=H(f),M.l(f),J=te(),this.h()},h(){_e(i,"display","flex"),p(V,"class","svelte-1d2t7oo"),p(g,"class","cashaddr svelte-1d2t7oo")},m(f,I){C(f,e,I),c(e,l),c(e,s),c(e,r),C(f,o,I),C(f,i,I),be(y,i,null),c(i,A),c(i,b),be(D,b,null),C(f,v,I),q&&q.m(f,I),C(f,T,I),C(f,S,I),C(f,B,I),C(f,g,I),c(g,V),c(V,k),c(V,_),c(V,N),C(f,P,I),X.m(f,I),C(f,L,I),C(f,E,I),C(f,W,I),ee[$].m(f,I),C(f,J,I),x=!0,se||(ae=[Re(O=Qe.call(null,g,a[0])),ke(g,"svelte-copy",a[10]),ke(g,"svelte-copy:error",a[11])],se=!0)},p(f,I){(!x||I&64)&&t!==(t=f[6].toLocaleString()+"")&&G(s,t);const le={};I&64&&(le.time=f[6]),y.$set(le);const ne={};I&2&&(ne.address=f[1]),D.$set(ne),f[7]?q?q.p(f,I):(q=Fe(f),q.c(),q.m(T.parentNode,T)):q&&(q.d(1),q=null),(!x||I&1)&&G(N,f[0]),O&&ze(O.update)&&I&1&&O.update.call(null,f[0]),ie===(ie=Ce(f))&&X?X.p(f,I):(X.d(1),X=ie(f),X&&(X.c(),X.m(L.parentNode,L)));let oe=$;$=Te(f),$===oe?ee[$].p(f,I):(fe(),Z(ee[oe],1,1,()=>{ee[oe]=null}),de(),M=ee[$],M?M.p(f,I):(M=ee[$]=Ee[$](f),M.c()),Q(M,1),M.m(J.parentNode,J))},i(f){x||(Q(y.$$.fragment,f),Q(D.$$.fragment,f),Q(M),x=!0)},o(f){Z(y.$$.fragment,f),Z(D.$$.fragment,f),Z(M),x=!1},d(f){f&&(n(e),n(o),n(i),n(v),n(T),n(S),n(B),n(g),n(P),n(L),n(E),n(W),n(J)),ge(y),ge(D),q&&q.d(f),X.d(f),ee[$].d(f),se=!1,Oe(ae)}}}function Fe(a){let e,l,t=a[6]-a[7]>0&&Ne(a);function s(o,i){return o[6]-o[7]>=2e3?pt:o[6]-o[7]>=0?mt:o[6]-o[7]<0?ht:_t}let r=s(a),u=r(a);return{c(){t&&t.c(),e=w(),l=h("h3"),u.c()},l(o){t&&t.l(o),e=H(o),l=m(o,"H3",{});var i=F(l);u.l(i),i.forEach(n)},m(o,i){t&&t.m(o,i),C(o,e,i),C(o,l,i),u.m(l,null)},p(o,i){o[6]-o[7]>0?t?t.p(o,i):(t=Ne(o),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null),r===(r=s(o))&&u?u.p(o,i):(u.d(1),u=r(o),u&&(u.c(),u.m(l,null)))},d(o){o&&(n(e),n(l)),t&&t.d(o),u.d()}}}function Ne(a){let e,l,t=(a[6]-a[7]).toLocaleString()+"",s,r,u="■";return{c(){e=h("h2"),l=j("T  -"),s=j(t),r=h("sub"),r.textContent=u},l(o){e=m(o,"H2",{});var i=F(e);l=U(i,"T  -"),s=U(i,t),r=m(i,"SUB",{"data-svelte-h":!0}),Y(r)!=="svelte-e09y70"&&(r.textContent=u),i.forEach(n)},m(o,i){C(o,e,i),c(e,l),c(e,s),c(e,r)},p(o,i){i&192&&t!==(t=(o[6]-o[7]).toLocaleString()+"")&&G(s,t)},d(o){o&&n(e)}}}function _t(a){let e;return{c(){e=j("-")},l(l){e=U(l,"-")},m(l,t){C(l,e,t)},p:K,d(l){l&&n(e)}}}function ht(a){let e;return{c(){e=j("Redemptions are open")},l(l){e=U(l,"Redemptions are open")},m(l,t){C(l,e,t)},p:K,d(l){l&&n(e)}}}function mt(a){let e,l=re(a[7],a[6]).toLocaleDateString()+"",t,s,r=re(a[7],a[6]).toLocaleTimeString()+"",u;return{c(){e=j(`Unlocks around
					`),t=j(l),s=w(),u=j(r)},l(o){e=U(o,`Unlocks around
					`),t=U(o,l),s=H(o),u=U(o,r)},m(o,i){C(o,e,i),C(o,t,i),C(o,s,i),C(o,u,i)},p(o,i){i&192&&l!==(l=re(o[7],o[6]).toLocaleDateString()+"")&&G(t,l),i&192&&r!==(r=re(o[7],o[6]).toLocaleTimeString()+"")&&G(u,r)},d(o){o&&(n(e),n(t),n(s),n(u))}}}function pt(a){let e,l=re(a[7],a[6]).toLocaleDateString()+"",t;return{c(){e=j(`Unlocks around
					`),t=j(l)},l(s){e=U(s,`Unlocks around
					`),t=U(s,l)},m(s,r){C(s,e,r),C(s,t,r)},p(s,r){r&192&&l!==(l=re(s[7],s[6]).toLocaleDateString()+"")&&G(t,l)},d(s){s&&(n(e),n(t))}}}function vt(a){let e,l="loading coupons...";return{c(){e=h("p"),e.textContent=l,this.h()},l(t){e=m(t,"P",{class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-1frqwd1"&&(e.textContent=l),this.h()},h(){p(e,"class","svelte-1d2t7oo")},m(t,s){C(t,e,s)},p:K,d(t){t&&n(e)}}}function bt(a){let e;function l(r,u){return r[2].length>0?gt:kt}let t=l(a),s=t(a);return{c(){s.c(),e=te()},l(r){s.l(r),e=te()},m(r,u){s.m(r,u),C(r,e,u)},p(r,u){t===(t=l(r))&&s?s.p(r,u):(s.d(1),s=t(r),s&&(s.c(),s.m(e.parentNode,e)))},d(r){r&&n(e),s.d(r)}}}function kt(a){let e,l="no coupons available";return{c(){e=h("p"),e.textContent=l,this.h()},l(t){e=m(t,"P",{class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-r1zx0p"&&(e.textContent=l),this.h()},h(){p(e,"class","svelte-1d2t7oo")},m(t,s){C(t,e,s)},p:K,d(t){t&&n(e)}}}function gt(a){let e,l,t='<tr class="header svelte-1d2t7oo"><td class="svelte-1d2t7oo"></td> <td class="svelte-1d2t7oo">place</td> <td class="svelte-1d2t7oo">coupon</td> <td class="svelte-1d2t7oo">rate</td> <td class="svelte-1d2t7oo">apr*</td> <td class="svelte-1d2t7oo">claim</td></tr> <tr class="units svelte-1d2t7oo"><td class="svelte-1d2t7oo"></td> <td class="svelte-1d2t7oo">BCH</td> <td class="svelte-1d2t7oo">sats</td> <td class="svelte-1d2t7oo">spb</td> <td class="svelte-1d2t7oo"></td> <td class="svelte-1d2t7oo"></td></tr>',s,r,u,o,i,y="∑",A,b,D,v=a[4].toFixed(2)+"",T,S,R,B,g=a[5].toLocaleString()+"",V,k,d,_,N,O,P,L=ue(a[2]),E=[];for(let z=0;z<L.length;z+=1)E[z]=$e(Le(a,L,z));return{c(){e=h("table"),l=h("thead"),l.innerHTML=t,s=w(),r=h("tbody");for(let z=0;z<E.length;z+=1)E[z].c();u=w(),o=h("tr"),i=h("td"),i.textContent=y,A=w(),b=h("td"),D=h("i"),T=j(v),S=w(),R=h("td"),B=h("i"),V=j(g),k=w(),d=h("td"),_=w(),N=h("td"),O=w(),P=h("td"),this.h()},l(z){e=m(z,"TABLE",{class:!0});var W=F(e);l=m(W,"THEAD",{"data-svelte-h":!0}),Y(l)!=="svelte-1w4ots4"&&(l.innerHTML=t),s=H(W),r=m(W,"TBODY",{class:!0});var $=F(r);for(let q=0;q<E.length;q+=1)E[q].l($);u=H($),o=m($,"TR",{style:!0,class:!0});var M=F(o);i=m(M,"TD",{class:!0,"data-svelte-h":!0}),Y(i)!=="svelte-1fyh9ab"&&(i.textContent=y),A=H(M),b=m(M,"TD",{class:!0});var J=F(b);D=m(J,"I",{});var x=F(D);T=U(x,v),x.forEach(n),J.forEach(n),S=H(M),R=m(M,"TD",{class:!0});var se=F(R);B=m(se,"I",{});var ae=F(B);V=U(ae,g),ae.forEach(n),se.forEach(n),k=H(M),d=m(M,"TD",{class:!0}),F(d).forEach(n),_=H(M),N=m(M,"TD",{class:!0}),F(N).forEach(n),O=H(M),P=m(M,"TD",{class:!0}),F(P).forEach(n),M.forEach(n),$.forEach(n),W.forEach(n),this.h()},h(){p(i,"class","svelte-1d2t7oo"),p(b,"class","r svelte-1d2t7oo"),p(R,"class","r svelte-1d2t7oo"),p(d,"class","svelte-1d2t7oo"),p(N,"class","svelte-1d2t7oo"),p(P,"class","svelte-1d2t7oo"),_e(o,"border-top","solid thin"),p(o,"class","svelte-1d2t7oo"),p(r,"class","svelte-1d2t7oo"),p(e,"class","couponTable svelte-1d2t7oo")},m(z,W){C(z,e,W),c(e,l),c(e,s),c(e,r);for(let $=0;$<E.length;$+=1)E[$]&&E[$].m(r,null);c(r,u),c(r,o),c(o,i),c(o,A),c(o,b),c(b,D),c(D,T),c(o,S),c(o,R),c(R,B),c(B,V),c(o,k),c(o,d),c(o,_),c(o,N),c(o,O),c(o,P)},p(z,W){if(W&964){L=ue(z[2]);let $;for($=0;$<L.length;$+=1){const M=Le(z,L,$);E[$]?E[$].p(M,W):(E[$]=$e(M),E[$].c(),E[$].m(r,u))}for(;$<E.length;$+=1)E[$].d(1);E.length=L.length}W&16&&v!==(v=z[4].toFixed(2)+"")&&G(T,v),W&32&&g!==(g=z[5].toLocaleString()+"")&&G(V,g)},d(z){z&&n(e),Pe(E,z)}}}function Ct(a){let e,l='<button class="action svelte-1d2t7oo" disabled="">insufficient funds ☹️</button>';return{c(){e=h("td"),e.innerHTML=l,this.h()},l(t){e=m(t,"TD",{style:!0,class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-1xslzp8"&&(e.innerHTML=l),this.h()},h(){_e(e,"text-align","center"),p(e,"class","svelte-1d2t7oo")},m(t,s){C(t,e,s)},p:K,d(t){t&&n(e)}}}function Et(a){let e,l,t="claim",s,r;function u(){return a[12](a[23])}return{c(){e=h("td"),l=h("button"),l.textContent=t,this.h()},l(o){e=m(o,"TD",{style:!0,class:!0});var i=F(e);l=m(i,"BUTTON",{class:!0,"data-svelte-h":!0}),Y(l)!=="svelte-js57qa"&&(l.textContent=t),i.forEach(n),this.h()},h(){p(l,"class","action svelte-1d2t7oo"),_e(e,"text-align","center"),p(e,"class","svelte-1d2t7oo")},m(o,i){C(o,e,i),c(e,l),s||(r=ke(l,"click",u),s=!0)},p(o,i){a=o},d(o){o&&n(e),s=!1,r()}}}function $e(a){let e,l,t="C<sub>0</sub>",s,r,u=1 .toFixed(2)+"",o,i,y,A=Number(a[23].satoshis).toLocaleString()+"",b,D,v,T=(Number(a[23].satoshis)/(a[6]-a[7])).toFixed(1)+"",S,R,B,g,V=(Number(a[23].satoshis)/(a[6]-a[7])/(1e6/52596)).toLocaleString(void 0,{maximumFractionDigits:1,minimumFractionDigits:1})+"",k,d,_;function N(L,E){return L[8]>1e8?Et:Ct}let O=N(a),P=O(a);return{c(){e=h("tr"),l=h("td"),l.innerHTML=t,s=w(),r=h("td"),o=j(u),i=w(),y=h("td"),b=j(A),D=w(),v=h("td"),S=j(T),R=w(),B=h("td"),g=h("i"),k=j(V),d=j("%"),_=w(),P.c(),this.h()},l(L){e=m(L,"TR",{class:!0});var E=F(e);l=m(E,"TD",{class:!0,"data-svelte-h":!0}),Y(l)!=="svelte-19mkn5i"&&(l.innerHTML=t),s=H(E),r=m(E,"TD",{class:!0});var z=F(r);o=U(z,u),z.forEach(n),i=H(E),y=m(E,"TD",{class:!0});var W=F(y);b=U(W,A),W.forEach(n),D=H(E),v=m(E,"TD",{class:!0});var $=F(v);S=U($,T),$.forEach(n),R=H(E),B=m(E,"TD",{class:!0});var M=F(B);g=m(M,"I",{});var J=F(g);k=U(J,V),d=U(J,"%"),J.forEach(n),M.forEach(n),_=H(E),P.l(E),E.forEach(n),this.h()},h(){p(l,"class","svelte-1d2t7oo"),p(r,"class","r svelte-1d2t7oo"),p(y,"class","r svelte-1d2t7oo"),p(v,"class","r svelte-1d2t7oo"),p(B,"class","r svelte-1d2t7oo"),p(e,"class","svelte-1d2t7oo")},m(L,E){C(L,e,E),c(e,l),c(e,s),c(e,r),c(r,o),c(e,i),c(e,y),c(y,b),c(e,D),c(e,v),c(v,S),c(e,R),c(e,B),c(B,g),c(g,k),c(g,d),c(e,_),P.m(e,null)},p(L,E){E&4&&A!==(A=Number(L[23].satoshis).toLocaleString()+"")&&G(b,A),E&196&&T!==(T=(Number(L[23].satoshis)/(L[6]-L[7])).toFixed(1)+"")&&G(S,T),E&196&&V!==(V=(Number(L[23].satoshis)/(L[6]-L[7])/(1e6/52596)).toLocaleString(void 0,{maximumFractionDigits:1,minimumFractionDigits:1})+"")&&G(k,V),O===(O=N(L))&&P?P.p(L,E):(P.d(1),P=O(L),P&&(P.c(),P.m(e,null)))},d(L){L&&n(e),P.d()}}}function Tt(a){let e,l="loading threads...";return{c(){e=h("p"),e.textContent=l,this.h()},l(t){e=m(t,"P",{class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-1njcfnz"&&(e.textContent=l),this.h()},h(){p(e,"class","svelte-1d2t7oo")},m(t,s){C(t,e,s)},p:K,i:K,o:K,d(t){t&&n(e)}}}function yt(a){let e,l,t,s,r="category",u,o,i="BCH",y,A,b,D=String(a[6]).padStart(7,"0")+"",v,T,S,R,B=ue(a[3]),g=[];for(let k=0;k<B.length;k+=1)g[k]=He(Se(a,B,k));const V=k=>Z(g[k],1,1,()=>{g[k]=null});return{c(){e=h("table"),l=h("thead"),t=h("tr"),s=h("td"),s.textContent=r,u=w(),o=h("td"),o.textContent=i,y=w(),A=h("td"),b=j("FBCH-"),v=j(D),T=w(),S=h("tbody");for(let k=0;k<g.length;k+=1)g[k].c();this.h()},l(k){e=m(k,"TABLE",{class:!0});var d=F(e);l=m(d,"THEAD",{});var _=F(l);t=m(_,"TR",{class:!0});var N=F(t);s=m(N,"TD",{class:!0,"data-svelte-h":!0}),Y(s)!=="svelte-1nbycu6"&&(s.textContent=r),u=H(N),o=m(N,"TD",{class:!0,"data-svelte-h":!0}),Y(o)!=="svelte-eke3it"&&(o.textContent=i),y=H(N),A=m(N,"TD",{class:!0});var O=F(A);b=U(O,"FBCH-"),v=U(O,D),O.forEach(n),N.forEach(n),_.forEach(n),T=H(d),S=m(d,"TBODY",{class:!0});var P=F(S);for(let L=0;L<g.length;L+=1)g[L].l(P);P.forEach(n),d.forEach(n),this.h()},h(){p(s,"class","svelte-1d2t7oo"),p(o,"class","svelte-1d2t7oo"),p(A,"class","svelte-1d2t7oo"),p(t,"class","header svelte-1d2t7oo"),p(S,"class","svelte-1d2t7oo"),p(e,"class","couponTable svelte-1d2t7oo")},m(k,d){C(k,e,d),c(e,l),c(l,t),c(t,s),c(t,u),c(t,o),c(t,y),c(t,A),c(A,b),c(A,v),c(e,T),c(e,S);for(let _=0;_<g.length;_+=1)g[_]&&g[_].m(S,null);R=!0},p(k,d){if((!R||d&64)&&D!==(D=String(k[6]).padStart(7,"0")+"")&&G(v,D),d&8){B=ue(k[3]);let _;for(_=0;_<B.length;_+=1){const N=Se(k,B,_);g[_]?(g[_].p(N,d),Q(g[_],1)):(g[_]=He(N),g[_].c(),Q(g[_],1),g[_].m(S,null))}for(fe(),_=B.length;_<g.length;_+=1)V(_);de()}},i(k){if(!R){for(let d=0;d<B.length;d+=1)Q(g[d]);R=!0}},o(k){g=g.filter(Boolean);for(let d=0;d<g.length;d+=1)Z(g[d]);R=!1},d(k){k&&n(e),Pe(g,k)}}}function Be(a){let e,l,t,s=a[23].token.category.substring(0,4)+"..."+a[23].token.category.slice(-2),r,u,o,i=(Number(a[23].satoshis)/1e8).toLocaleString(void 0,{minimumFractionDigits:3})+"",y,A,b,D,v,T,S,R,B,g,V,k=a[23].token&&we(a);return B=new Ve({props:{time:ye.get(a[23].token?.category),size:"15"}}),{c(){e=h("tr"),l=h("td"),t=h("i"),r=j(s),u=w(),o=h("td"),y=j(i),A=w(),b=h("img"),v=w(),T=h("td"),S=h("i"),k&&k.c(),R=w(),pe(B.$$.fragment),g=w(),this.h()},l(d){e=m(d,"TR",{class:!0});var _=F(e);l=m(_,"TD",{class:!0});var N=F(l);t=m(N,"I",{});var O=F(t);r=U(O,s),O.forEach(n),N.forEach(n),u=H(_),o=m(_,"TD",{class:!0});var P=F(o);y=U(P,i),A=H(P),b=m(P,"IMG",{width:!0,src:!0,alt:!0}),P.forEach(n),v=H(_),T=m(_,"TD",{class:!0});var L=F(T);S=m(L,"I",{});var E=F(S);k&&k.l(E),E.forEach(n),R=H(L),ve(B.$$.fragment,L),L.forEach(n),g=H(_),_.forEach(n),this.h()},h(){p(l,"class","svelte-1d2t7oo"),p(b,"width","15"),qe(b.src,D=ot)||p(b,"src",D),p(b,"alt","bchLogo"),p(o,"class","r svelte-1d2t7oo"),p(T,"class","r svelte-1d2t7oo"),p(e,"class","svelte-1d2t7oo")},m(d,_){C(d,e,_),c(e,l),c(l,t),c(t,r),c(e,u),c(e,o),c(o,y),c(o,A),c(o,b),c(e,v),c(e,T),c(T,S),k&&k.m(S,null),c(T,R),be(B,T,null),c(e,g),V=!0},p(d,_){(!V||_&8)&&s!==(s=d[23].token.category.substring(0,4)+"..."+d[23].token.category.slice(-2))&&G(r,s),(!V||_&8)&&i!==(i=(Number(d[23].satoshis)/1e8).toLocaleString(void 0,{minimumFractionDigits:3})+"")&&G(y,i),d[23].token?k?k.p(d,_):(k=we(d),k.c(),k.m(S,null)):k&&(k.d(1),k=null);const N={};_&8&&(N.time=ye.get(d[23].token?.category)),B.$set(N)},i(d){V||(Q(B.$$.fragment,d),V=!0)},o(d){Z(B.$$.fragment,d),V=!1},d(d){d&&n(e),k&&k.d(),ge(B)}}}function we(a){let e=(Number(a[23].token.amount)/1e8).toLocaleString(void 0,{minimumFractionDigits:3})+"",l;return{c(){l=j(e)},l(t){l=U(t,e)},m(t,s){C(t,l,s)},p(t,s){s&8&&e!==(e=(Number(t[23].token.amount)/1e8).toLocaleString(void 0,{minimumFractionDigits:3})+"")&&G(l,e)},d(t){t&&n(l)}}}function He(a){let e,l,t=a[23].token&&Be(a);return{c(){t&&t.c(),e=te()},l(s){t&&t.l(s),e=te()},m(s,r){t&&t.m(s,r),C(s,e,r),l=!0},p(s,r){s[23].token?t?(t.p(s,r),r&8&&Q(t,1)):(t=Be(s),t.c(),Q(t,1),t.m(e.parentNode,e)):t&&(fe(),Z(t,1,1,()=>{t=null}),de())},i(s){l||(Q(t),l=!0)},o(s){Z(t),l=!1},d(s){s&&n(e),t&&t.d(s)}}}function Dt(a){let e,l,t,s,r,u;function o(v,T){return v[6]>858e3?ut:ct}let i=o(a),y=i(a);const A=[ft,dt],b=[];function D(v,T){return v[6]?0:1}return s=D(a),r=b[s]=A[s](a),{c(){y.c(),e=te(),l=w(),t=h("div"),r.c(),this.h()},l(v){const T=We("svelte-1vc10dk",document.head);y.l(T),e=te(),T.forEach(n),l=H(v),t=m(v,"DIV",{class:!0});var S=F(t);r.l(S),S.forEach(n),this.h()},h(){p(t,"class","text-column")},m(v,T){y.m(document.head,null),c(document.head,e),C(v,l,T),C(v,t,T),b[s].m(t,null),u=!0},p(v,[T]){i===(i=o(v))&&y?y.p(v,T):(y.d(1),y=i(v),y&&(y.c(),y.m(e.parentNode,e)));let S=s;s=D(v),s===S?b[s].p(v,T):(fe(),Z(b[S],1,1,()=>{b[S]=null}),de(),r=b[s],r?r.p(v,T):(r=b[s]=A[s](v),r.c()),Q(r,1),r.m(t,null))},i(v){u||(Q(r),u=!0)},o(v){Z(r),u=!1},d(v){v&&(n(l),n(t)),y.d(v),n(e),b[s].d()}}}function St(a,e,l){let t;je(a,Je,d=>l(22,t=d));let s,r,u,o,i,y,A,b="",D,v,T,S,R;Ge.subscribe(d=>{l(7,T=d)});const B=async function(d){let _=[{placement:100000000n,coupon:d,locktime:v}];try{await S.swap(_),b=""}catch(N){b=N,me.push(`Error: ${N}`,{classes:["warn"]})}};return Ue(async()=>{try{Xe.StorageProvider=Ze,S=await xe.named("hot"),l(8,R=await S.getBalance("sats"))}catch(_){throw _}D=t.url.searchParams.get("block")||void 0,l(6,v=Number(D)),l(0,s=he.getCoupon(1e8,v)),l(1,r=he.getAddress(v)),he.getAddress(v,Ke.mainnet,!1);let d=new tt("@fbch/app","1.4.3",1,1,lt.RANDOM,2e3);d.addServer("bch.imaginary.cash",50004,st.WSS.Scheme,!1),u=new et("mainnet",d,!1),await Promise.all([u.getUtxos(r).then(_=>l(3,i=_)),u.getUtxos(S.getDepositAddress()).then(_=>_),u.getUtxos(s).then(_=>{l(2,o=_),o.length>0&&(o.sort((N,O)=>parseFloat(O.satoshis)-parseFloat(N.satoshis)),l(4,y=o.length),l(5,A=Number(o.reduce((N,O)=>N+O.satoshis,0n))))})]),(Number(i.reduce((_,N)=>_+N.satoshis,0n))-7e3)/1e8}),[s,r,o,i,y,A,v,T,R,B,d=>me.push("Coupon Addr 📋🗸: "+d.detail),d=>me.push(`Error, no access to clipboard?: ${d.detail.message}`,{classes:["warn"]}),d=>B(d)]}class Pt extends Ie{constructor(e){super(),Me(this,e,St,Dt,Ae,{})}}export{Pt as component,Mt as universal};
//# sourceMappingURL=9.DuDHpJ1V.js.map
