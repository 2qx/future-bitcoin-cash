import{d as se}from"../chunks/index.R8ovVqwX.js";import{s as ae,n as wt}from"../chunks/scheduler.CoKJEDLV.js";import{S as le,i as ie,e as a,s as i,H as oe,c as l,o,f as p,a as pe,q as re,d as n,m as G,g as s}from"../chunks/index.PTRJg19q.js";const ce=se,ue=!0,me=Object.freeze(Object.defineProperty({__proto__:null,csr:ce,prerender:ue},Symbol.toStringTag,{value:"Module"}));function de(ee){let r,gt='<ol class="toc-level toc-level-1"><li class="toc-item toc-item-h1"><a class="toc-link toc-link-h1" href="#future-bitcoin-cash---an-implementation-guide">Future Bitcoin Cash - An Implementation Guide</a></li><li class="toc-item toc-item-h1"><a class="toc-link toc-link-h1" href="#introduction">Introduction</a></li></ol>',U,c,_t="Future Bitcoin Cash - An Implementation Guide",K,k,Ht="This guide is for wallet maintainers and defi builders/inventors who what to interface with, display or use FBCH in their software.",V,m,Tt="This is a fuller exposition of a message to the Electron Cash team in their telegram channel that caused the author’s Telegram account to be temporary restricted.",D,b,Bt='<p>TL;DR. There is <a href="https://cashtokens.org/docs/bcmr/chip#dns-resolved-registries" rel="nofollow">DNS-resolved</a> BCMR metadata for FBCH series (to date) <a href="https://futurebitcoin.cash/.well-known/bitcoin-cash-metadata-registry.json" rel="nofollow">here</a>. I’d also be happy to craft integrations for any wallet looking to have FBCH in their <a href="https://cashtokens.org/docs/bcmr/chip#embedded-registries" rel="nofollow">embedded registry</a> or that wants tooling specific to FBCH integrated. Such as prepackaged metadata integration for <a href="https://github.com/2qx/future-bitcoin-cash/tree/main/metadata/electron-cash" rel="nofollow">Electron Cash here</a></p>',Q,u,qt="Introduction",W,C,Pt="Future Bitcoin Cash fungible token series represent time-locked BCH on a 1:1 basis. Each series is denoted by the block time when redemption opens. There’s a different series about every week, or every 1000 blocks.",X,x,jt='Tokens are minted into vaults by a set of anyone-can-spend gantry contracts. There are four such contracts, for different powers of 10. Each gantry was in-turn minted by a single anyone-can-spend <a href="https://explorer.electroncash.de/address/bitcoincash:pd3hc4smdeu4kpwyvjq645d0ts5n9wxgvp3x7gg3my65u2kkw766xxxl8wdgp" rel="nofollow">battery contract</a>.',Y,v,Ft="The system secures it’s own financing for fees and token utxo dust. It was funded with about 47M sats to deploy weekly fungible token series for the first century of operation.",$,y,Lt="The system uses an NFT batons to authenticate “valid” token mints and also track state.",J,d,zt="Validating Yet to be Minted FBCH Series",Z,w,Mt="Future Bitcoin Cash (FBCH) was designed to make it trivial for wallet maintainers to validate new FBCH series as they’re printed.",tt,g,Et="It should be trivial with the software or libraries you already use.",et,_,St="Given a CashToken categoryId, is it a future?",nt,H,It=`// Could this be an FBCH token?
09dabc81889bd7d1301f7e0620301460bcc0f754ab9b9838b881b72182b1d502`,st,f,Ot="FBCH identification and validation process:",at,T,At="<li>Get the transaction before the minting TX using the categoryId.</li> <li>Verify that the first output sends to a FBCH gantry.</li> <li>Verify that the token category is the FBCH minting baton (<code>fbc0b000 ...</code>).</li> <li>The value of the mutable NFT commitment is the FBCH series number (little endian).</li>",lt,B,Nt="As noted in the audit, step two assures the token was minted with a fixed known supply, enforced contractually by the gantry.",it,q,Rt="Step three is necessary to assure users are getting tokens from a known canonical set, because it’s possible to spam vaults duplicate mintings of different categories, which would damage fungibility and shard liquidity across market pools.",ot,P,Gt="Below is an example of the first output of a pre-genesis transaction:",pt,j,rt,ne=`<code class="language-json">
...

<span class="token property">"vout"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">&#123;</span>
            <span class="token property">"value"</span><span class="token operator">:</span> <span class="token number">0.42440502</span><span class="token punctuation">,</span>
            <span class="token property">"n"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">"scriptPubKey"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                <span class="token property">"asm"</span><span class="token operator">:</span> <span class="token string">"OP_HASH256 abde46afe7656ed85e92ba9be56286bae53f77321333c77fb3db90e28445e010 OP_EQUAL"</span><span class="token punctuation">,</span>
                <span class="token property">"hex"</span><span class="token operator">:</span> <span class="token string">"aa20abde46afe7656ed85e92ba9be56286bae53f77321333c77fb3db90e28445e01087"</span><span class="token punctuation">,</span>
                <span class="token property">"reqSigs"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
                <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"scripthash"</span><span class="token punctuation">,</span>
                <span class="token property">"addresses"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token string">"bitcoincash:pw4au340uajkakz7j2afhetzs6aw20mhxgfn83mlk0depc5yghspqqqckly70"</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
            <span class="token property">"tokenData"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                <span class="token property">"category"</span><span class="token operator">:</span> <span class="token string">"fbc0b001313509454331f23f4b1891a8d9a284421efcc33187f1a1cdd37ccb46"</span><span class="token punctuation">,</span>
                <span class="token property">"amount"</span><span class="token operator">:</span> <span class="token string">"0"</span><span class="token punctuation">,</span>
                <span class="token property">"nft"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                    <span class="token property">"capability"</span><span class="token operator">:</span> <span class="token string">"mutable"</span><span class="token punctuation">,</span>
                    <span class="token property">"commitment"</span><span class="token operator">:</span> <span class="token string">"e8320d00"</span>
                <span class="token punctuation">&#125;</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
        ...
    <span class="token punctuation">&#125;</span></code>`,ct,F,Ut="The full Future Bitcoin Cash Baton category is:",ut,L,Kt="fbc0b001313509454331f23f4b1891a8d9a284421efcc33187f1a1cdd37ccb46",dt,z,Vt="The NFT Commitment contains block time of the series in little endian: <code>e8320d00</code> (i.e. 865000)",ft,M,Dt="Below is a complete list to all valid gantries printing FBCH series, with links and step parameter.",ht,E,Qt='<thead><tr><th align="left">Gantry Contract Public Key Hashes</th> <th align="right">Step</th> <th align="right">Explorer</th></tr></thead> <tbody><tr><td align="left">aa20abde46afe7656ed85e92ba9be56286bae53f77321333c77fb3db90e28445e01087</td> <td align="right">1,000</td> <td align="right"><a href="https://explorer.electroncash.de/address/bitcoincash:pw4au340uajkakz7j2afhetzs6aw20mhxgfn83mlk0depc5yghspqqqckly70" rel="nofollow">link</a></td></tr> <tr><td align="left">aa208b8bbab9023ff4c94e3ba458d213c5f629cf4d2f750a813e3855fa8b88f7790087</td> <td align="right">10,000</td> <td align="right"><a href="https://explorer.electroncash.de/address/bitcoincash:pw9chw4eqgllfj2w8wj935snchmznn6d9a6s4qf78p2l4zug7ausqxsg2dxve" rel="nofollow">link</a></td></tr> <tr><td align="left">aa206cf5cd944ca7cf45ed3a3075694fea5f7ad92d0011784c896238049653e405f987</td> <td align="right">100,000</td> <td align="right"><a href="https://explorer.electroncash.de/address/pdk0tnv5fjnu730d8gc82620af0h4kfdqqghsnyfvguqf9jnuszljj3fnpfhq" rel="nofollow">link</a></td></tr> <tr><td align="left">aa204e1a8669275f0b5c1deaa1f168de429a8dc53f91acc489dbc819239ebc9a155787</td> <td align="right">1,000,000</td> <td align="right"><a href="https://explorer.electroncash.de/address/bitcoincash:pd8p4pnfya0skhqaa2slz6x7g2dgm3fljxkvfzwmeqvj884ung24w2mx7x8yd" rel="nofollow">link</a></td></tr></tbody>',kt,S,Wt="Note that, 90% of the time, the pre-genesis transaction for a token series is also the genesis transaction for the preceding series. In this case, the OP_RETURN should say FBCH, with the series number being currently minted, which is <strong>NOT</strong> the series number corresponding to the next mint.",mt,h,Xt="A century of metadata in zero requests.",bt,I,Yt="From the validation process, it’d be fairly simply to develop a cache of known FBCH series, or to import this data into a local registry.",Ct,O,$t="The series number and categoryId can be transformed to metadata with a simple function where:",xt,A,Jt="<li>All FBCH series use 8 decimals.</li> <li>The ticker is “FBCH” followed by a dash and seven digit zero padded series number. (<code>^FBCH-\\d{7}$</code>)</li> <li>The name is “Future BCH ” followed by the series number the user’s locale.</li> <li>The description is as follows:</li>",vt,N,Zt="<p>A fungible token redeemable for Bitcoin Cash after block <em>LOCALE_SERIES_STRING</em></p>",yt,R,te="With all decimals and text known, that only leaves icons.";return{c(){r=a("nav"),r.innerHTML=gt,U=i(),c=a("h1"),c.textContent=_t,K=i(),k=a("p"),k.textContent=Ht,V=i(),m=a("p"),m.textContent=Tt,D=i(),b=a("blockquote"),b.innerHTML=Bt,Q=i(),u=a("h1"),u.textContent=qt,W=i(),C=a("p"),C.textContent=Pt,X=i(),x=a("p"),x.innerHTML=jt,Y=i(),v=a("p"),v.textContent=Ft,$=i(),y=a("p"),y.textContent=Lt,J=i(),d=a("h2"),d.textContent=zt,Z=i(),w=a("p"),w.textContent=Mt,tt=i(),g=a("p"),g.textContent=Et,et=i(),_=a("p"),_.textContent=St,nt=i(),H=a("p"),H.textContent=It,st=i(),f=a("h3"),f.textContent=Ot,at=i(),T=a("ol"),T.innerHTML=At,lt=i(),B=a("p"),B.textContent=Nt,it=i(),q=a("p"),q.textContent=Rt,ot=i(),P=a("p"),P.textContent=Gt,pt=i(),j=a("pre"),rt=new oe(!1),ct=i(),F=a("p"),F.textContent=Ut,ut=i(),L=a("p"),L.textContent=Kt,dt=i(),z=a("p"),z.innerHTML=Vt,ft=i(),M=a("p"),M.textContent=Dt,ht=i(),E=a("table"),E.innerHTML=Qt,kt=i(),S=a("p"),S.innerHTML=Wt,mt=i(),h=a("h2"),h.textContent=Xt,bt=i(),I=a("p"),I.textContent=Yt,Ct=i(),O=a("p"),O.textContent=$t,xt=i(),A=a("ul"),A.innerHTML=Jt,vt=i(),N=a("blockquote"),N.innerHTML=Zt,yt=i(),R=a("p"),R.textContent=te,this.h()},l(t){r=l(t,"NAV",{class:!0,"data-svelte-h":!0}),o(r)!=="svelte-j9f0bt"&&(r.innerHTML=gt),U=p(t),c=l(t,"H1",{id:!0,"data-svelte-h":!0}),o(c)!=="svelte-18pgx8w"&&(c.textContent=_t),K=p(t),k=l(t,"P",{"data-svelte-h":!0}),o(k)!=="svelte-11w8oto"&&(k.textContent=Ht),V=p(t),m=l(t,"P",{"data-svelte-h":!0}),o(m)!=="svelte-1xz4l73"&&(m.textContent=Tt),D=p(t),b=l(t,"BLOCKQUOTE",{"data-svelte-h":!0}),o(b)!=="svelte-2td18r"&&(b.innerHTML=Bt),Q=p(t),u=l(t,"H1",{id:!0,"data-svelte-h":!0}),o(u)!=="svelte-1eaztqk"&&(u.textContent=qt),W=p(t),C=l(t,"P",{"data-svelte-h":!0}),o(C)!=="svelte-jojftc"&&(C.textContent=Pt),X=p(t),x=l(t,"P",{"data-svelte-h":!0}),o(x)!=="svelte-sddfis"&&(x.innerHTML=jt),Y=p(t),v=l(t,"P",{"data-svelte-h":!0}),o(v)!=="svelte-wprzwh"&&(v.textContent=Ft),$=p(t),y=l(t,"P",{"data-svelte-h":!0}),o(y)!=="svelte-dn8dw1"&&(y.textContent=Lt),J=p(t),d=l(t,"H2",{id:!0,"data-svelte-h":!0}),o(d)!=="svelte-1ez8rve"&&(d.textContent=zt),Z=p(t),w=l(t,"P",{"data-svelte-h":!0}),o(w)!=="svelte-jzvfyn"&&(w.textContent=Mt),tt=p(t),g=l(t,"P",{"data-svelte-h":!0}),o(g)!=="svelte-b437j4"&&(g.textContent=Et),et=p(t),_=l(t,"P",{"data-svelte-h":!0}),o(_)!=="svelte-cezga3"&&(_.textContent=St),nt=p(t),H=l(t,"P",{"data-svelte-h":!0}),o(H)!=="svelte-mcg73s"&&(H.textContent=It),st=p(t),f=l(t,"H3",{id:!0,"data-svelte-h":!0}),o(f)!=="svelte-j4oqji"&&(f.textContent=Ot),at=p(t),T=l(t,"OL",{"data-svelte-h":!0}),o(T)!=="svelte-5ei9j6"&&(T.innerHTML=At),lt=p(t),B=l(t,"P",{"data-svelte-h":!0}),o(B)!=="svelte-1m4r8us"&&(B.textContent=Nt),it=p(t),q=l(t,"P",{"data-svelte-h":!0}),o(q)!=="svelte-1ilo33m"&&(q.textContent=Rt),ot=p(t),P=l(t,"P",{"data-svelte-h":!0}),o(P)!=="svelte-c4dwwv"&&(P.textContent=Gt),pt=p(t),j=l(t,"PRE",{class:!0});var e=pe(j);rt=re(e,!1),e.forEach(n),ct=p(t),F=l(t,"P",{"data-svelte-h":!0}),o(F)!=="svelte-1mprut0"&&(F.textContent=Ut),ut=p(t),L=l(t,"P",{"data-svelte-h":!0}),o(L)!=="svelte-yz607y"&&(L.textContent=Kt),dt=p(t),z=l(t,"P",{"data-svelte-h":!0}),o(z)!=="svelte-oyaslt"&&(z.innerHTML=Vt),ft=p(t),M=l(t,"P",{"data-svelte-h":!0}),o(M)!=="svelte-1mgk6tm"&&(M.textContent=Dt),ht=p(t),E=l(t,"TABLE",{"data-svelte-h":!0}),o(E)!=="svelte-10xsa2i"&&(E.innerHTML=Qt),kt=p(t),S=l(t,"P",{"data-svelte-h":!0}),o(S)!=="svelte-w8k7ef"&&(S.innerHTML=Wt),mt=p(t),h=l(t,"H2",{id:!0,"data-svelte-h":!0}),o(h)!=="svelte-13cl8rk"&&(h.textContent=Xt),bt=p(t),I=l(t,"P",{"data-svelte-h":!0}),o(I)!=="svelte-j6oc7k"&&(I.textContent=Yt),Ct=p(t),O=l(t,"P",{"data-svelte-h":!0}),o(O)!=="svelte-1ff3sr3"&&(O.textContent=$t),xt=p(t),A=l(t,"UL",{"data-svelte-h":!0}),o(A)!=="svelte-y4aezd"&&(A.innerHTML=Jt),vt=p(t),N=l(t,"BLOCKQUOTE",{"data-svelte-h":!0}),o(N)!=="svelte-vb47fz"&&(N.innerHTML=Zt),yt=p(t),R=l(t,"P",{"data-svelte-h":!0}),o(R)!=="svelte-15jy7o5"&&(R.textContent=te),this.h()},h(){G(r,"class","toc"),G(c,"id","future-bitcoin-cash---an-implementation-guide"),G(u,"id","introduction"),G(d,"id","validating-yet-to-be-minted-fbch-series"),G(f,"id","fbch-identification-and-validation-process"),rt.a=null,G(j,"class","language-json"),G(h,"id","a-century-of-metadata-in-zero-requests")},m(t,e){s(t,r,e),s(t,U,e),s(t,c,e),s(t,K,e),s(t,k,e),s(t,V,e),s(t,m,e),s(t,D,e),s(t,b,e),s(t,Q,e),s(t,u,e),s(t,W,e),s(t,C,e),s(t,X,e),s(t,x,e),s(t,Y,e),s(t,v,e),s(t,$,e),s(t,y,e),s(t,J,e),s(t,d,e),s(t,Z,e),s(t,w,e),s(t,tt,e),s(t,g,e),s(t,et,e),s(t,_,e),s(t,nt,e),s(t,H,e),s(t,st,e),s(t,f,e),s(t,at,e),s(t,T,e),s(t,lt,e),s(t,B,e),s(t,it,e),s(t,q,e),s(t,ot,e),s(t,P,e),s(t,pt,e),s(t,j,e),rt.m(ne,j),s(t,ct,e),s(t,F,e),s(t,ut,e),s(t,L,e),s(t,dt,e),s(t,z,e),s(t,ft,e),s(t,M,e),s(t,ht,e),s(t,E,e),s(t,kt,e),s(t,S,e),s(t,mt,e),s(t,h,e),s(t,bt,e),s(t,I,e),s(t,Ct,e),s(t,O,e),s(t,xt,e),s(t,A,e),s(t,vt,e),s(t,N,e),s(t,yt,e),s(t,R,e)},p:wt,i:wt,o:wt,d(t){t&&(n(r),n(U),n(c),n(K),n(k),n(V),n(m),n(D),n(b),n(Q),n(u),n(W),n(C),n(X),n(x),n(Y),n(v),n($),n(y),n(J),n(d),n(Z),n(w),n(tt),n(g),n(et),n(_),n(nt),n(H),n(st),n(f),n(at),n(T),n(lt),n(B),n(it),n(q),n(ot),n(P),n(pt),n(j),n(ct),n(F),n(ut),n(L),n(dt),n(z),n(ft),n(M),n(ht),n(E),n(kt),n(S),n(mt),n(h),n(bt),n(I),n(Ct),n(O),n(xt),n(A),n(vt),n(N),n(yt),n(R))}}}class be extends le{constructor(r){super(),ie(this,r,null,de,ae,{})}}export{be as component,me as universal};
//# sourceMappingURL=7.Cg37DLSb.js.map
