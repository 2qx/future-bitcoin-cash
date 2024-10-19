import{s as vt,n as Z,c as Et,o as Tt,a as St}from"../chunks/scheduler.CoKJEDLV.js";import{S as pt,i as bt,e as _,c as h,a as S,d as a,m as v,g as p,t as P,s as y,b as N,f as D,h as i,x as Ee,p as yt,r as ne,u as Ne,v as x,w as Ae,o as ee,y as Re,z as ze,n as he,A as Oe,j as Q,B as je,D as Ye,C as Dt}from"../chunks/index.BGGdVmBl.js";import{b as Bt,h as Lt,V as Le,c as wt,T as qe,e as $e,C as xe,g as we,d as et}from"../chunks/vault.BmJjgdha.js";import{p as $t}from"../chunks/stores.Dko8HGzh.js";import{t as Ht}from"../chunks/SvelteToast.svelte_svelte_type_style_lang.8ep8mfxG.js";import{B as Pt,I as Nt,F as At,E as It}from"../chunks/wallet.CIVR7toD.js";import{$ as Mt,a as tt}from"../chunks/index.CBUt9gsE.js";import{b as mt}from"../chunks/bch.QnmS77Uw.js";import{S as kt}from"../chunks/SeriesIcon.BXBPivo_.js";const Ft=!0,hl=Object.freeze(Object.defineProperty({__proto__:null,prerender:Ft},Symbol.toStringTag,{value:"Module"}));function lt(c){let e,t,l,s,r,f,n,u,B,$;return{c(){e=_("a"),t=P("salemkode"),s=y(),r=_("a"),f=P("3xpl"),n=y(),u=_("a"),B=P("electroncash.de"),this.h()},l(d){e=h(d,"A",{target:!0,href:!0,class:!0});var E=S(e);t=N(E,"salemkode"),E.forEach(a),s=D(d),r=h(d,"A",{target:!0,href:!0,class:!0});var b=S(r);f=N(b,"3xpl"),b.forEach(a),n=D(d),u=h(d,"A",{target:!0,href:!0,class:!0});var T=S(u);B=N(T,"electroncash.de"),T.forEach(a),this.h()},h(){v(e,"target","_blank"),v(e,"href",l="https://explorer.salemkode.com/address/"+c[0]),v(e,"class","svelte-qkf8kc"),v(r,"target","_blank"),v(r,"href","https://3xpl.com/bitcoin-cash/address/"+c[1].split(":")[1]),v(r,"class","svelte-qkf8kc"),v(u,"target","_blank"),v(u,"href",$="https://explorer.electroncash.de/address/"+c[0]),v(u,"class","svelte-qkf8kc")},m(d,E){p(d,e,E),i(e,t),p(d,s,E),p(d,r,E),i(r,f),p(d,n,E),p(d,u,E),i(u,B)},p(d,E){E&1&&l!==(l="https://explorer.salemkode.com/address/"+d[0])&&v(e,"href",l),E&1&&$!==($="https://explorer.electroncash.de/address/"+d[0])&&v(u,"href",$)},d(d){d&&(a(e),a(s),a(r),a(n),a(u))}}}function Vt(c){let e,t=c[0]&&lt(c);return{c(){e=_("div"),t&&t.c(),this.h()},l(l){e=h(l,"DIV",{class:!0});var s=S(e);t&&t.l(s),s.forEach(a),this.h()},h(){v(e,"class","svelte-qkf8kc")},m(l,s){p(l,e,s),t&&t.m(e,null)},p(l,[s]){l[0]?t?t.p(l,s):(t=lt(l),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},i:Z,o:Z,d(l){l&&a(e),t&&t.d()}}}function Ut(c,e,t){let{address:l}=e;const s=Bt(l);return c.$$set=r=>{"address"in r&&t(0,l=r.address)},[l,s]}class gt extends pt{constructor(e){super(),bt(this,e,Ut,Vt,vt,{address:0})}}function st(c,e,t){const l=c.slice();return l[30]=e[t],l}function rt(c,e,t){const l=c.slice();return l[30]=e[t],l}function nt(c,e,t){const l=c.slice();return l[30]=e[t],l}function qt(c){let e,t,l,s;return{c(){e=y(),t=_("meta"),l=y(),s=_("link"),this.h()},l(r){e=D(r),t=h(r,"META",{name:!0,content:!0}),l=D(r),s=h(r,"LINK",{rel:!0,type:!0,href:!0}),this.h()},h(){document.title="FBCH",v(t,"name","description"),v(t,"content","Future Vault Series"),v(s,"rel","icon"),v(s,"type","image/svg"),v(s,"href","/FBCH.svg")},m(r,f){p(r,e,f),p(r,t,f),p(r,l,f),p(r,s,f)},p:Z,d(r){r&&(a(e),a(t),a(l),a(s))}}}function Rt(c){let e,t,l,s,r,f;return document.title=e="FBCH-"+c[5],{c(){t=y(),l=_("meta"),s=y(),r=_("link"),this.h()},l(n){t=D(n),l=h(n,"META",{name:!0,content:!0}),s=D(n),r=h(n,"LINK",{rel:!0,type:!0,href:!0}),this.h()},h(){v(l,"name","description"),v(l,"content","Future Vault Series"),v(r,"rel","icon"),v(r,"type","image/svg"),v(r,"href",f="/FBCH-"+c[5]+".svg")},m(n,u){p(n,t,u),p(n,l,u),p(n,s,u),p(n,r,u)},p(n,u){u[0]&32&&e!==(e="FBCH-"+n[5])&&(document.title=e),u[0]&32&&f!==(f="/FBCH-"+n[5]+".svg")&&v(r,"href",f)},d(n){n&&(a(t),a(l),a(s),a(r))}}}function zt(c){let e,t="loading...";return{c(){e=_("p"),e.textContent=t,this.h()},l(l){e=h(l,"P",{class:!0,"data-svelte-h":!0}),ee(e)!=="svelte-qeejp2"&&(e.textContent=t),this.h()},h(){v(e,"class","svelte-ctevcb")},m(l,s){p(l,e,s)},p:Z,i:Z,o:Z,d(l){l&&a(e)}}}function Ot(c){let e,t,l,s=c[5].toLocaleString()+"",r,f,n="■",u,B,$,d,E,b=c[5].toLocaleString()+"",T,A,F=(c[5]-c[6]).toLocaleString()+"",I,L,W,m,g,C,M,w,R="Spot Coupons",j,K,se="Coupons discount placement of <i>P</i> BCH into the vault; limit one coupon per transaction.",O,U,Y,V,z,ve="Vault Threads",J,q,H,ae,fe,He=`Seven (7) unspent transaction outputs control swapping of coins and tokens on a 1:1 basis with
			the vault unlocking script.`,Te,de,ye,oe,ke=qe.get(c[5])+"",ge,Ie,Me,ce,ie,De,Fe,Ve,pe,Ge="<i>sats (satoshis)</i>: one 100,000,000<sup>th</sup> of a whole coin.<br/> <i>spb</i>: rate in sats per coin per block of time remaining to maturation.<br/> <i>coupon rate per annum</i>: effective non-compounding rate of annual return.",be,te=c[6]&&at(c),le=c[6]&&ct(c);g=new kt({props:{time:c[5],size:"75"}});let re=c[6]&&it();function Qe(o,k){return o[1]?Qt:Gt}let Ue=Qe(c),_e=Ue(c),Se=$e(xe),G=[];for(let o=0;o<Se.length;o+=1)G[o]=ft(rt(c,Se,o));const Ct=o=>ne(G[o],1,1,()=>{G[o]=null});H=new gt({props:{address:c[0]}});const Je=[tl,el],Ce=[];function Xe(o,k){return o[2]&&o[2].length?0:1}return ce=Xe(c),ie=Ce[ce]=Je[ce](c),{c(){e=_("div"),t=_("h1"),l=P("Vault "),r=P(s),f=_("sub"),f.textContent=n,u=y(),te&&te.c(),B=y(),le&&le.c(),$=y(),d=_("p"),E=P("Vault locking Bitcoin Cash (BCH) for CashTokens until opening redemptions after block "),T=P(b),A=P(`―in
			`),I=P(F),L=P(" blocks."),W=y(),m=_("div"),Re(g.$$.fragment),C=y(),re&&re.c(),M=y(),w=_("h4"),w.textContent=R,j=y(),K=_("p"),K.innerHTML=se,O=y(),_e.c(),U=y(),Y=_("div");for(let o=0;o<G.length;o+=1)G[o].c();V=y(),z=_("h4"),z.textContent=ve,J=y(),q=_("div"),Re(H.$$.fragment),ae=y(),fe=_("p"),fe.textContent=He,Te=y(),de=_("p"),ye=P("Category/pre-genesis: "),oe=_("a"),ge=P(ke),Me=y(),ie.c(),De=y(),Fe=_("hr"),Ve=y(),pe=_("p"),pe.innerHTML=Ge,this.h()},l(o){e=h(o,"DIV",{style:!0});var k=S(e);t=h(k,"H1",{class:!0});var ue=S(t);l=N(ue,"Vault "),r=N(ue,s),f=h(ue,"SUB",{"data-svelte-h":!0}),ee(f)!=="svelte-e09y70"&&(f.textContent=n),ue.forEach(a),u=D(k),te&&te.l(k),k.forEach(a),B=D(o),le&&le.l(o),$=D(o),d=h(o,"P",{class:!0});var me=S(d);E=N(me,"Vault locking Bitcoin Cash (BCH) for CashTokens until opening redemptions after block "),T=N(me,b),A=N(me,`―in
			`),I=N(me,F),L=N(me," blocks."),me.forEach(a),W=D(o),m=h(o,"DIV",{style:!0});var Be=S(m);ze(g.$$.fragment,Be),Be.forEach(a),C=D(o),re&&re.l(o),M=D(o),w=h(o,"H4",{"data-svelte-h":!0}),ee(w)!=="svelte-a7j859"&&(w.textContent=R),j=D(o),K=h(o,"P",{class:!0,"data-svelte-h":!0}),ee(K)!=="svelte-mkkip"&&(K.innerHTML=se),O=D(o),_e.l(o),U=D(o),Y=h(o,"DIV",{style:!0});var X=S(Y);for(let Ke=0;Ke<G.length;Ke+=1)G[Ke].l(X);X.forEach(a),V=D(o),z=h(o,"H4",{"data-svelte-h":!0}),ee(z)!=="svelte-5lx8ud"&&(z.textContent=ve),J=D(o),q=h(o,"DIV",{style:!0});var Pe=S(q);ze(H.$$.fragment,Pe),Pe.forEach(a),ae=D(o),fe=h(o,"P",{class:!0,"data-svelte-h":!0}),ee(fe)!=="svelte-1pp40a0"&&(fe.textContent=He),Te=D(o),de=h(o,"P",{class:!0});var We=S(de);ye=N(We,"Category/pre-genesis: "),oe=h(We,"A",{target:!0,href:!0});var Ze=S(oe);ge=N(Ze,ke),Ze.forEach(a),We.forEach(a),Me=D(o),ie.l(o),De=D(o),Fe=h(o,"HR",{}),Ve=D(o),pe=h(o,"P",{style:!0,class:!0,"data-svelte-h":!0}),ee(pe)!=="svelte-1itmesg"&&(pe.innerHTML=Ge),this.h()},h(){v(t,"class","svelte-ctevcb"),he(e,"display","flex"),he(e,"flex-direction","column"),he(e,"align-items","flex-end"),v(d,"class","svelte-ctevcb"),he(m,"display","flex"),v(K,"class","svelte-ctevcb"),he(Y,"display","flex"),he(q,"display","flex"),v(fe,"class","svelte-ctevcb"),v(oe,"target","_blank"),v(oe,"href",Ie="https://explorer.electroncash.de/tx/"+qe.get(c[5])),v(de,"class","cashaddr svelte-ctevcb"),he(pe,"font-size","small"),v(pe,"class","svelte-ctevcb")},m(o,k){p(o,e,k),i(e,t),i(t,l),i(t,r),i(t,f),i(e,u),te&&te.m(e,null),p(o,B,k),le&&le.m(o,k),p(o,$,k),p(o,d,k),i(d,E),i(d,T),i(d,A),i(d,I),i(d,L),p(o,W,k),p(o,m,k),Oe(g,m,null),p(o,C,k),re&&re.m(o,k),p(o,M,k),p(o,w,k),p(o,j,k),p(o,K,k),p(o,O,k),_e.m(o,k),p(o,U,k),p(o,Y,k);for(let ue=0;ue<G.length;ue+=1)G[ue]&&G[ue].m(Y,null);p(o,V,k),p(o,z,k),p(o,J,k),p(o,q,k),Oe(H,q,null),p(o,ae,k),p(o,fe,k),p(o,Te,k),p(o,de,k),i(de,ye),i(de,oe),i(oe,ge),p(o,Me,k),Ce[ce].m(o,k),p(o,De,k),p(o,Fe,k),p(o,Ve,k),p(o,pe,k),be=!0},p(o,k){(!be||k[0]&32)&&s!==(s=o[5].toLocaleString()+"")&&Q(r,s),o[6]?te?te.p(o,k):(te=at(o),te.c(),te.m(e,null)):te&&(te.d(1),te=null),o[6]?le?le.p(o,k):(le=ct(o),le.c(),le.m($.parentNode,$)):le&&(le.d(1),le=null),(!be||k[0]&32)&&b!==(b=o[5].toLocaleString()+"")&&Q(T,b),(!be||k[0]&96)&&F!==(F=(o[5]-o[6]).toLocaleString()+"")&&Q(I,F);const ue={};if(k[0]&32&&(ue.time=o[5]),g.$set(ue),o[6]?re||(re=it(),re.c(),re.m(M.parentNode,M)):re&&(re.d(1),re=null),Ue===(Ue=Qe(o))&&_e?_e.p(o,k):(_e.d(1),_e=Ue(o),_e&&(_e.c(),_e.m(U.parentNode,U))),k[0]&32){Se=$e(xe);let X;for(X=0;X<Se.length;X+=1){const Pe=rt(o,Se,X);G[X]?(G[X].p(Pe,k),x(G[X],1)):(G[X]=ft(Pe),G[X].c(),x(G[X],1),G[X].m(Y,null))}for(Ae(),X=Se.length;X<G.length;X+=1)Ct(X);Ne()}const me={};k[0]&1&&(me.address=o[0]),H.$set(me),(!be||k[0]&32)&&ke!==(ke=qe.get(o[5])+"")&&Q(ge,ke),(!be||k[0]&32&&Ie!==(Ie="https://explorer.electroncash.de/tx/"+qe.get(o[5])))&&v(oe,"href",Ie);let Be=ce;ce=Xe(o),ce===Be?Ce[ce].p(o,k):(Ae(),ne(Ce[Be],1,1,()=>{Ce[Be]=null}),Ne(),ie=Ce[ce],ie?ie.p(o,k):(ie=Ce[ce]=Je[ce](o),ie.c()),x(ie,1),ie.m(De.parentNode,De))},i(o){if(!be){x(g.$$.fragment,o);for(let k=0;k<Se.length;k+=1)x(G[k]);x(H.$$.fragment,o),x(ie),be=!0}},o(o){ne(g.$$.fragment,o),G=G.filter(Boolean);for(let k=0;k<G.length;k+=1)ne(G[k]);ne(H.$$.fragment,o),ne(ie),be=!1},d(o){o&&(a(e),a(B),a($),a(d),a(W),a(m),a(C),a(M),a(w),a(j),a(K),a(O),a(U),a(Y),a(V),a(z),a(J),a(q),a(ae),a(fe),a(Te),a(de),a(Me),a(De),a(Fe),a(Ve),a(pe)),te&&te.d(),le&&le.d(o),je(g),re&&re.d(o),_e.d(o),Ye(G,o),je(H),Ce[ce].d(o)}}}function at(c){let e,t=c[5]-c[6]>0&&ot(c);return{c(){t&&t.c(),e=Ee()},l(l){t&&t.l(l),e=Ee()},m(l,s){t&&t.m(l,s),p(l,e,s)},p(l,s){l[5]-l[6]>0?t?t.p(l,s):(t=ot(l),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},d(l){l&&a(e),t&&t.d(l)}}}function ot(c){let e,t,l=(c[5]-c[6]).toLocaleString()+"",s,r,f="■";return{c(){e=_("h2"),t=P("T  -"),s=P(l),r=_("sub"),r.textContent=f,this.h()},l(n){e=h(n,"H2",{class:!0});var u=S(e);t=N(u,"T  -"),s=N(u,l),r=h(u,"SUB",{"data-svelte-h":!0}),ee(r)!=="svelte-e09y70"&&(r.textContent=f),u.forEach(a),this.h()},h(){v(e,"class","svelte-ctevcb")},m(n,u){p(n,e,u),i(e,t),i(e,s),i(e,r)},p(n,u){u[0]&96&&l!==(l=(n[5]-n[6]).toLocaleString()+"")&&Q(s,l)},d(n){n&&a(e)}}}function ct(c){let e,t;function l(f,n){return f[5]-f[6]>=2e3?Yt:f[5]-f[6]>=0?Kt:f[5]-f[6]<0?Wt:jt}let s=l(c),r=s(c);return{c(){e=_("p"),t=_("b"),r.c(),this.h()},l(f){e=h(f,"P",{class:!0});var n=S(e);t=h(n,"B",{});var u=S(t);r.l(u),u.forEach(a),n.forEach(a),this.h()},h(){v(e,"class","svelte-ctevcb")},m(f,n){p(f,e,n),i(e,t),r.m(t,null)},p(f,n){s===(s=l(f))&&r?r.p(f,n):(r.d(1),r=s(f),r&&(r.c(),r.m(t,null)))},d(f){f&&a(e),r.d()}}}function jt(c){let e;return{c(){e=P("-")},l(t){e=N(t,"-")},m(t,l){p(t,e,l)},p:Z,d(t){t&&a(e)}}}function Wt(c){let e;return{c(){e=P("Redemptions are open")},l(t){e=N(t,"Redemptions are open")},m(t,l){p(t,e,l)},p:Z,d(t){t&&a(e)}}}function Kt(c){let e,t=we(c[6],c[5]).toLocaleDateString()+"",l,s,r=we(c[6],c[5]).toLocaleTimeString()+"",f;return{c(){e=P(`Unlocks around
						`),l=P(t),s=y(),f=P(r)},l(n){e=N(n,`Unlocks around
						`),l=N(n,t),s=D(n),f=N(n,r)},m(n,u){p(n,e,u),p(n,l,u),p(n,s,u),p(n,f,u)},p(n,u){u[0]&96&&t!==(t=we(n[6],n[5]).toLocaleDateString()+"")&&Q(l,t),u[0]&96&&r!==(r=we(n[6],n[5]).toLocaleTimeString()+"")&&Q(f,r)},d(n){n&&(a(e),a(l),a(s),a(f))}}}function Yt(c){let e,t=we(c[6],c[5]).toLocaleDateString()+"",l;return{c(){e=P(`Unlocking around
						`),l=P(t)},l(s){e=N(s,`Unlocking around
						`),l=N(s,t)},m(s,r){p(s,e,r),p(s,l,r)},p(s,r){r[0]&96&&t!==(t=we(s[6],s[5]).toLocaleDateString()+"")&&Q(l,t)},d(s){s&&(a(e),a(l))}}}function it(c){return{c:Z,l:Z,m:Z,d:Z}}function Gt(c){let e,t="loading coupons...";return{c(){e=_("p"),e.textContent=t,this.h()},l(l){e=h(l,"P",{class:!0,"data-svelte-h":!0}),ee(e)!=="svelte-1frqwd1"&&(e.textContent=t),this.h()},h(){v(e,"class","svelte-ctevcb")},m(l,s){p(l,e,s)},p:Z,d(l){l&&a(e)}}}function Qt(c){let e;function t(r,f){return r[1].length>0?Xt:Jt}let l=t(c),s=l(c);return{c(){s.c(),e=Ee()},l(r){s.l(r),e=Ee()},m(r,f){s.m(r,f),p(r,e,f)},p(r,f){l===(l=t(r))&&s?s.p(r,f):(s.d(1),s=l(r),s&&(s.c(),s.m(e.parentNode,e)))},d(r){r&&a(e),s.d(r)}}}function Jt(c){let e,t="no coupons available";return{c(){e=_("p"),e.textContent=t,this.h()},l(l){e=h(l,"P",{class:!0,"data-svelte-h":!0}),ee(e)!=="svelte-r1zx0p"&&(e.textContent=t),this.h()},h(){v(e,"class","svelte-ctevcb")},m(l,s){p(l,e,s)},p:Z,d(l){l&&a(e)}}}function Xt(c){let e,t,l=`<tr class="header svelte-ctevcb"><td class="svelte-ctevcb"></td> <td class="svelte-ctevcb"><i>P</i></td> <td class="svelte-ctevcb">coupon</td> <td colspan="3" class="svelte-ctevcb">coupon rate</td> <td class="svelte-ctevcb">action</td></tr> <tr class="units svelte-ctevcb"><td class="svelte-ctevcb"></td> <td class="r svelte-ctevcb"><img width="15" src="${mt}" alt="bchLogo"/></td> <td class="r svelte-ctevcb">sats</td> <td class="r svelte-ctevcb">spb</td> <td class="svelte-ctevcb">per annum</td> <td class="svelte-ctevcb">to maturity</td> <td class="svelte-ctevcb"></td></tr>`,s,r,f,n,u,B="∑",$,d,E,b=c[3].toFixed(0)+"",T,A,F,I,L=c[4].toLocaleString()+"",W,m,g,C,M,w,R,j,K,se=$e(c[1]),O=[];for(let U=0;U<se.length;U+=1)O[U]=ut(nt(c,se,U));return{c(){e=_("table"),t=_("thead"),t.innerHTML=l,s=y(),r=_("tbody");for(let U=0;U<O.length;U+=1)O[U].c();f=y(),n=_("tr"),u=_("td"),u.textContent=B,$=y(),d=_("td"),E=_("b"),T=P(b),A=y(),F=_("td"),I=_("b"),W=P(L),m=y(),g=_("td"),C=y(),M=_("td"),w=y(),R=_("td"),j=y(),K=_("td"),this.h()},l(U){e=h(U,"TABLE",{class:!0});var Y=S(e);t=h(Y,"THEAD",{class:!0,"data-svelte-h":!0}),ee(t)!=="svelte-19tke8i"&&(t.innerHTML=l),s=D(Y),r=h(Y,"TBODY",{class:!0});var V=S(r);for(let ae=0;ae<O.length;ae+=1)O[ae].l(V);f=D(V),n=h(V,"TR",{style:!0,class:!0});var z=S(n);u=h(z,"TD",{class:!0,"data-svelte-h":!0}),ee(u)!=="svelte-1fyh9ab"&&(u.textContent=B),$=D(z),d=h(z,"TD",{class:!0});var ve=S(d);E=h(ve,"B",{});var J=S(E);T=N(J,b),J.forEach(a),ve.forEach(a),A=D(z),F=h(z,"TD",{class:!0});var q=S(F);I=h(q,"B",{});var H=S(I);W=N(H,L),H.forEach(a),q.forEach(a),m=D(z),g=h(z,"TD",{class:!0}),S(g).forEach(a),C=D(z),M=h(z,"TD",{class:!0}),S(M).forEach(a),w=D(z),R=h(z,"TD",{class:!0}),S(R).forEach(a),j=D(z),K=h(z,"TD",{class:!0}),S(K).forEach(a),z.forEach(a),V.forEach(a),Y.forEach(a),this.h()},h(){v(t,"class","svelte-ctevcb"),v(u,"class","svelte-ctevcb"),v(d,"class","r svelte-ctevcb"),v(F,"class","r svelte-ctevcb"),v(g,"class","svelte-ctevcb"),v(M,"class","svelte-ctevcb"),v(R,"class","svelte-ctevcb"),v(K,"class","svelte-ctevcb"),he(n,"border-top","solid thin"),v(n,"class","svelte-ctevcb"),v(r,"class","svelte-ctevcb"),v(e,"class","couponTable svelte-ctevcb")},m(U,Y){p(U,e,Y),i(e,t),i(e,s),i(e,r);for(let V=0;V<O.length;V+=1)O[V]&&O[V].m(r,null);i(r,f),i(r,n),i(n,u),i(n,$),i(n,d),i(d,E),i(E,T),i(n,A),i(n,F),i(F,I),i(I,W),i(n,m),i(n,g),i(n,C),i(n,M),i(n,w),i(n,R),i(n,j),i(n,K)},p(U,Y){if(Y[0]&386){se=$e(U[1]);let V;for(V=0;V<se.length;V+=1){const z=nt(U,se,V);O[V]?O[V].p(z,Y):(O[V]=ut(z),O[V].c(),O[V].m(r,f))}for(;V<O.length;V+=1)O[V].d(1);O.length=se.length}Y[0]&8&&b!==(b=U[3].toFixed(0)+"")&&Q(T,b),Y[0]&16&&L!==(L=U[4].toLocaleString()+"")&&Q(W,L)},d(U){U&&a(e),Ye(O,U)}}}function Zt(c){let e,t='<button class="action svelte-ctevcb" disabled="" style="font-size:x-small;">low bal.</button>';return{c(){e=_("td"),e.innerHTML=t,this.h()},l(l){e=h(l,"TD",{style:!0,class:!0,"data-svelte-h":!0}),ee(e)!=="svelte-1o0irt7"&&(e.innerHTML=t),this.h()},h(){he(e,"text-align","center"),v(e,"class","svelte-ctevcb")},m(l,s){p(l,e,s)},p:Z,d(l){l&&a(e)}}}function xt(c){let e,t,l="claim",s,r;function f(){return c[9](c[30])}return{c(){e=_("td"),t=_("button"),t.textContent=l,this.h()},l(n){e=h(n,"TD",{style:!0,class:!0});var u=S(e);t=h(u,"BUTTON",{class:!0,"data-svelte-h":!0}),ee(t)!=="svelte-18qwvwo"&&(t.textContent=l),u.forEach(a),this.h()},h(){v(t,"class","action svelte-ctevcb"),he(e,"text-align","center"),v(e,"class","svelte-ctevcb")},m(n,u){p(n,e,u),i(e,t),s||(r=Dt(t,"click",f),s=!0)},p(n,u){c=n},d(n){n&&a(e),s=!1,r()}}}function ut(c){let e,t,l,s,r=c[30].order+"",f,n,u,B=Number(c[30].placement/1e8)+"",$,d,E,b=Number(c[30].utxo.satoshis).toLocaleString()+"",T,A,F,I=c[30].locale.spb+"",L,W,m,g,C=c[30].locale.ypa+"",M,w,R,j,K,se=c[30].locale.ytm+"",O,U,Y,V;function z(q,H){return H[0]&130&&(V=null),V==null&&(V=q[7]+Number(q[30].utxo.satoshis)>q[30].placement),V?xt:Zt}let ve=z(c,[-1,-1]),J=ve(c);return{c(){e=_("tr"),t=_("td"),l=P("C"),s=_("sub"),f=P(r),n=y(),u=_("td"),$=P(B),d=y(),E=_("td"),T=P(b),A=y(),F=_("td"),L=P(I),W=y(),m=_("td"),g=_("i"),M=P(C),w=P("%"),R=y(),j=_("td"),K=_("i"),O=P(se),U=P("%"),Y=y(),J.c(),this.h()},l(q){e=h(q,"TR",{class:!0});var H=S(e);t=h(H,"TD",{class:!0});var ae=S(t);l=N(ae,"C"),s=h(ae,"SUB",{});var fe=S(s);f=N(fe,r),fe.forEach(a),ae.forEach(a),n=D(H),u=h(H,"TD",{class:!0});var He=S(u);$=N(He,B),He.forEach(a),d=D(H),E=h(H,"TD",{class:!0});var Te=S(E);T=N(Te,b),Te.forEach(a),A=D(H),F=h(H,"TD",{class:!0});var de=S(F);L=N(de,I),de.forEach(a),W=D(H),m=h(H,"TD",{class:!0});var ye=S(m);g=h(ye,"I",{});var oe=S(g);M=N(oe,C),w=N(oe,"%"),oe.forEach(a),ye.forEach(a),R=D(H),j=h(H,"TD",{class:!0});var ke=S(j);K=h(ke,"I",{});var ge=S(K);O=N(ge,se),U=N(ge,"%"),ge.forEach(a),ke.forEach(a),Y=D(H),J.l(H),H.forEach(a),this.h()},h(){v(t,"class","svelte-ctevcb"),v(u,"class","r svelte-ctevcb"),v(E,"class","sats svelte-ctevcb"),v(F,"class","sats svelte-ctevcb"),v(m,"class","r svelte-ctevcb"),v(j,"class","r svelte-ctevcb"),v(e,"class","svelte-ctevcb")},m(q,H){p(q,e,H),i(e,t),i(t,l),i(t,s),i(s,f),i(e,n),i(e,u),i(u,$),i(e,d),i(e,E),i(E,T),i(e,A),i(e,F),i(F,L),i(e,W),i(e,m),i(m,g),i(g,M),i(g,w),i(e,R),i(e,j),i(j,K),i(K,O),i(K,U),i(e,Y),J.m(e,null)},p(q,H){H[0]&2&&r!==(r=q[30].order+"")&&Q(f,r),H[0]&2&&B!==(B=Number(q[30].placement/1e8)+"")&&Q($,B),H[0]&2&&b!==(b=Number(q[30].utxo.satoshis).toLocaleString()+"")&&Q(T,b),H[0]&2&&I!==(I=q[30].locale.spb+"")&&Q(L,I),H[0]&2&&C!==(C=q[30].locale.ypa+"")&&Q(M,C),H[0]&2&&se!==(se=q[30].locale.ytm+"")&&Q(O,se),ve===(ve=z(q,H))&&J?J.p(q,H):(J.d(1),J=ve(q),J&&(J.c(),J.m(e,null)))},d(q){q&&a(e),J.d()}}}function ft(c){let e,t,l,s,r,f,n,u,B,$;return n=new gt({props:{address:Le.getCoupon(Math.pow(10,c[30])*1e8,c[5])}}),{c(){e=_("div"),t=_("pre"),l=P("C"),s=_("sub"),r=P(c[30]),f=y(),Re(n.$$.fragment),u=_("br"),B=y(),this.h()},l(d){e=h(d,"DIV",{});var E=S(e);t=h(E,"PRE",{style:!0});var b=S(t);l=N(b,"C"),s=h(b,"SUB",{});var T=S(s);r=N(T,c[30]),T.forEach(a),b.forEach(a),f=D(E),ze(n.$$.fragment,E),u=h(E,"BR",{}),B=D(E),E.forEach(a),this.h()},h(){he(t,"font-size","small")},m(d,E){p(d,e,E),i(e,t),i(t,l),i(t,s),i(s,r),i(e,f),Oe(n,e,null),i(e,u),i(e,B),$=!0},p(d,E){const b={};E[0]&32&&(b.address=Le.getCoupon(Math.pow(10,d[30])*1e8,d[5])),n.$set(b)},i(d){$||(x(n.$$.fragment,d),$=!0)},o(d){ne(n.$$.fragment,d),$=!1},d(d){d&&a(e),je(n)}}}function el(c){let e,t="loading threads...";return{c(){e=_("p"),e.textContent=t,this.h()},l(l){e=h(l,"P",{class:!0,"data-svelte-h":!0}),ee(e)!=="svelte-1njcfnz"&&(e.textContent=t),this.h()},h(){v(e,"class","svelte-ctevcb")},m(l,s){p(l,e,s)},p:Z,i:Z,o:Z,d(l){l&&a(e)}}}function tl(c){let e,t,l,s,r="category",f,n,u="BCH",B,$,d,E=String(c[5]).padStart(7,"0")+"",b,T,A,F,I=$e(c[2]),L=[];for(let m=0;m<I.length;m+=1)L[m]=ht(st(c,I,m));const W=m=>ne(L[m],1,1,()=>{L[m]=null});return{c(){e=_("table"),t=_("thead"),l=_("tr"),s=_("td"),s.textContent=r,f=y(),n=_("td"),n.textContent=u,B=y(),$=_("td"),d=P("FBCH-"),b=P(E),T=y(),A=_("tbody");for(let m=0;m<L.length;m+=1)L[m].c();this.h()},l(m){e=h(m,"TABLE",{class:!0});var g=S(e);t=h(g,"THEAD",{class:!0});var C=S(t);l=h(C,"TR",{class:!0});var M=S(l);s=h(M,"TD",{class:!0,"data-svelte-h":!0}),ee(s)!=="svelte-1nbycu6"&&(s.textContent=r),f=D(M),n=h(M,"TD",{class:!0,"data-svelte-h":!0}),ee(n)!=="svelte-eke3it"&&(n.textContent=u),B=D(M),$=h(M,"TD",{class:!0});var w=S($);d=N(w,"FBCH-"),b=N(w,E),w.forEach(a),M.forEach(a),C.forEach(a),T=D(g),A=h(g,"TBODY",{class:!0});var R=S(A);for(let j=0;j<L.length;j+=1)L[j].l(R);R.forEach(a),g.forEach(a),this.h()},h(){v(s,"class","svelte-ctevcb"),v(n,"class","svelte-ctevcb"),v($,"class","svelte-ctevcb"),v(l,"class","header svelte-ctevcb"),v(t,"class","svelte-ctevcb"),v(A,"class","svelte-ctevcb"),v(e,"class","couponTable svelte-ctevcb")},m(m,g){p(m,e,g),i(e,t),i(t,l),i(l,s),i(l,f),i(l,n),i(l,B),i(l,$),i($,d),i($,b),i(e,T),i(e,A);for(let C=0;C<L.length;C+=1)L[C]&&L[C].m(A,null);F=!0},p(m,g){if((!F||g[0]&32)&&E!==(E=String(m[5]).padStart(7,"0")+"")&&Q(b,E),g[0]&4){I=$e(m[2]);let C;for(C=0;C<I.length;C+=1){const M=st(m,I,C);L[C]?(L[C].p(M,g),x(L[C],1)):(L[C]=ht(M),L[C].c(),x(L[C],1),L[C].m(A,null))}for(Ae(),C=I.length;C<L.length;C+=1)W(C);Ne()}},i(m){if(!F){for(let g=0;g<I.length;g+=1)x(L[g]);F=!0}},o(m){L=L.filter(Boolean);for(let g=0;g<L.length;g+=1)ne(L[g]);F=!1},d(m){m&&a(e),Ye(L,m)}}}function dt(c){let e,t,l,s=c[30].token.category.substring(0,4)+"..."+c[30].token.category.slice(-2),r,f,n,u=(Number(c[30].satoshis)/1e8).toLocaleString(void 0,{})+"",B,$,d,E,b,T,A,F,I,L,W,m=c[30].token&&_t(c);return I=new kt({props:{time:et.get(c[30].token?.category),size:"15"}}),{c(){e=_("tr"),t=_("td"),l=_("i"),r=P(s),f=y(),n=_("td"),B=P(u),$=y(),d=_("img"),b=y(),T=_("td"),A=_("i"),m&&m.c(),F=y(),Re(I.$$.fragment),L=y(),this.h()},l(g){e=h(g,"TR",{class:!0});var C=S(e);t=h(C,"TD",{class:!0});var M=S(t);l=h(M,"I",{});var w=S(l);r=N(w,s),w.forEach(a),M.forEach(a),f=D(C),n=h(C,"TD",{class:!0});var R=S(n);B=N(R,u),$=D(R),d=h(R,"IMG",{width:!0,src:!0,alt:!0}),R.forEach(a),b=D(C),T=h(C,"TD",{class:!0});var j=S(T);A=h(j,"I",{});var K=S(A);m&&m.l(K),K.forEach(a),F=D(j),ze(I.$$.fragment,j),j.forEach(a),L=D(C),C.forEach(a),this.h()},h(){v(t,"class","svelte-ctevcb"),v(d,"width","15"),St(d.src,E=mt)||v(d,"src",E),v(d,"alt","bchLogo"),v(n,"class","r svelte-ctevcb"),v(T,"class","r svelte-ctevcb"),v(e,"class","svelte-ctevcb")},m(g,C){p(g,e,C),i(e,t),i(t,l),i(l,r),i(e,f),i(e,n),i(n,B),i(n,$),i(n,d),i(e,b),i(e,T),i(T,A),m&&m.m(A,null),i(T,F),Oe(I,T,null),i(e,L),W=!0},p(g,C){(!W||C[0]&4)&&s!==(s=g[30].token.category.substring(0,4)+"..."+g[30].token.category.slice(-2))&&Q(r,s),(!W||C[0]&4)&&u!==(u=(Number(g[30].satoshis)/1e8).toLocaleString(void 0,{})+"")&&Q(B,u),g[30].token?m?m.p(g,C):(m=_t(g),m.c(),m.m(A,null)):m&&(m.d(1),m=null);const M={};C[0]&4&&(M.time=et.get(g[30].token?.category)),I.$set(M)},i(g){W||(x(I.$$.fragment,g),W=!0)},o(g){ne(I.$$.fragment,g),W=!1},d(g){g&&a(e),m&&m.d(),je(I)}}}function _t(c){let e=(Number(c[30].token.amount)/1e8).toLocaleString(void 0,{})+"",t;return{c(){t=P(e)},l(l){t=N(l,e)},m(l,s){p(l,t,s)},p(l,s){s[0]&4&&e!==(e=(Number(l[30].token.amount)/1e8).toLocaleString(void 0,{})+"")&&Q(t,e)},d(l){l&&a(t)}}}function ht(c){let e,t,l=c[30].token&&dt(c);return{c(){l&&l.c(),e=Ee()},l(s){l&&l.l(s),e=Ee()},m(s,r){l&&l.m(s,r),p(s,e,r),t=!0},p(s,r){s[30].token?l?(l.p(s,r),r[0]&4&&x(l,1)):(l=dt(s),l.c(),x(l,1),l.m(e.parentNode,e)):l&&(Ae(),ne(l,1,1,()=>{l=null}),Ne())},i(s){t||(x(l),t=!0)},o(s){ne(l),t=!1},d(s){s&&a(e),l&&l.d(s)}}}function ll(c){let e,t,l,s,r,f;function n(b,T){return b[5]>858e3?Rt:qt}let u=n(c),B=u(c);const $=[Ot,zt],d=[];function E(b,T){return b[5]?0:1}return s=E(c),r=d[s]=$[s](c),{c(){B.c(),e=Ee(),t=y(),l=_("div"),r.c(),this.h()},l(b){const T=yt("svelte-1vc10dk",document.head);B.l(T),e=Ee(),T.forEach(a),t=D(b),l=h(b,"DIV",{class:!0});var A=S(l);r.l(A),A.forEach(a),this.h()},h(){v(l,"class","text-column")},m(b,T){B.m(document.head,null),i(document.head,e),p(b,t,T),p(b,l,T),d[s].m(l,null),f=!0},p(b,T){u===(u=n(b))&&B?B.p(b,T):(B.d(1),B=u(b),B&&(B.c(),B.m(e.parentNode,e)));let A=s;s=E(b),s===A?d[s].p(b,T):(Ae(),ne(d[A],1,1,()=>{d[A]=null}),Ne(),r=d[s],r?r.p(b,T):(r=d[s]=$[s](b),r.c()),x(r,1),r.m(l,null))},i(b){f||(x(r),f=!0)},o(b){ne(r),f=!1},d(b){b&&(a(t),a(l)),B.d(b),a(e),d[s].d()}}}function sl(c,e=2e3){let t;return(...l)=>{clearTimeout(t),t=setTimeout(()=>{c.apply(this,l)},e)}}function rl(c,e,t){let l;Et(c,$t,w=>t(21,l=w));let s,r,f,n,u=[],B,$,d,E="",b,T,A,F,I;Lt.subscribe(w=>{t(6,A=w)});const L=async function(w){await w.getUtxos(s).then(R=>t(2,B=R))},W=async function(){console.log("time:",T),t(1,n=await Le.getAllCouponUtxos(f,A,[T])),n.length>0&&(n.sort((w,R)=>parseFloat(R.utxo.satoshis)-parseFloat(w.utxo.satoshis)),t(3,$=n.length),t(4,d=Number(n.reduce((w,R)=>w+R.utxo.satoshis,0n))))};async function m(){console.log("processing que data"),console.log(u);try{await F.swap(u),E=""}catch(w){E=w,Ht.push(`Error: ${w}`,{classes:["warn"]})}u=[]}const g=sl(()=>m()),C=async function(w,R){t(7,I-=w.placement),u.push({placement:BigInt(w.placement),coupon:w.utxo,locktime:w.locktime}),console.log(u),t(1,n=n.filter(j=>j.id!==R)),g()};return Tt(async()=>{try{Pt.StorageProvider=Nt,F=await At.named("hot"),t(7,I=await F.getBalance("sats"))}catch(w){throw w}b=l.url.searchParams.get("block")||void 0,t(5,T=Number(b)),Le.getCoupon(1e8,T),t(0,s=Le.getAddress(T)),Le.getAddress(T,wt.mainnet,!1),r=new It,f=new Mt("FBCH/webapp","1.4.1","bch.imaginary.cash",tt.WSS.Port,tt.WSS.Scheme),await f.connect().then(()=>{W(),L(r)})}),[s,n,B,$,d,T,A,I,C,w=>C(w,w.id)]}class vl extends pt{constructor(e){super(),bt(this,e,rl,ll,vt,{},null,[-1,-1])}}export{vl as component,hl as universal};
//# sourceMappingURL=9.CrXVqEH4.js.map
