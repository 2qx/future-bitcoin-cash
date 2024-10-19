import{d as os}from"../chunks/index.R8ovVqwX.js";import{s as cs,a as us,n as Cn}from"../chunks/scheduler.CoKJEDLV.js";import{S as ls,i as is,e as p,s as e,H as gn,c as o,o as u,f as c,p as ks,d as s,a as wn,q as Tn,m as l,g as t}from"../chunks/index.BGGdVmBl.js";const rs=os,ms=!0,xs=Object.freeze(Object.defineProperty({__proto__:null,csr:rs,prerender:ms},Symbol.toStringTag,{value:"Module"}));function ds(ss){let i,_n='<ol class="toc-level toc-level-1"><li class="toc-item toc-item-h1"><a class="toc-link toc-link-h1" href="#overview">Overview</a></li><li class="toc-item toc-item-h1"><a class="toc-link toc-link-h1" href="#vault">Vault</a></li><li class="toc-item toc-item-h1"><a class="toc-link toc-link-h1" href="#coupon">Coupon</a></li><li class="toc-item toc-item-h1"><a class="toc-link toc-link-h1" href="#gantry">Gantry</a></li><li class="toc-item toc-item-h1"><a class="toc-link toc-link-h1" href="#battery">Battery</a></li></ol>',V,G,k,Pn="Overview",D,y,On="Future Bitcoin Cash is an anyone-can-spend system for populating a fixed supply of tokens in vaults using an NFT baton as authority.",X,b,In="The contracts allow anyone to mint a fixed supply of fungible tokens and put them into the next vault, and also check that a token claiming to be FBCH is valid.",S,x,qn,z,f,Nn="To check if an FBCH category, get the pre-genesis transaction matching the category ID, then:",Y,v,Bn="<li>Check that the first output of the transaction paid to one of the four gantry contracts.</li> <li>Check that the first output spent the FBCH baton (<code>fbc0b00131...ccb46</code>).</li> <li>The token is valid FBCH and the value of the baton commitment (LE) is the series.</li>",K,g,En='More details on checking FBCH tokens <a href="/protocol">here</a>',j,r,Fn="Vault",Q,w,Un="The vault allows swapping coins for fungible tokens on a 1:1 basis until a certain block height is reached. When the <code>locktime</code> has been met, the vault allows bi-directional swapping.",J,T,An="Although the vault may lock coins against any fungible token, only contractually issued tokens with the full auditable supply sent to the vault should be treated as locked futures on the open market.",W,C,Z,as=`<code class="language-solidity"><span class="token keyword">pragma</span> cashscript <span class="token operator">^</span><span class="token version number">0.10.0</span><span class="token punctuation">;</span>

<span class="token comment">// Vault - Store coins locked for tokens until maturation date. </span>
<span class="token comment">//</span>
<span class="token comment">// 2024-06-05</span>
<span class="token comment">//</span>
<span class="token comment">// From: Future Bitcoin Cash</span>
<span class="token comment">//</span>
<span class="token comment">// Author: 2qx &lt;2qx_in_the_future@small.neomailbox.ch></span>
<span class="token comment">//</span>
<span class="token comment">//     If redeeming tokens for coins in the vault: </span>
<span class="token comment">// [ ]   enforce the timelock is met.</span>
<span class="token comment">//</span>
<span class="token comment">// [ ] Assure the utxo token category matches that of the output.</span>
<span class="token comment">// [ ] Assure the the utxo and output lock match per in the transaction.</span>
<span class="token comment">// [ ] Assure an equal amounts of coins are exchanged for tokens</span>
<span class="token comment">//</span>
<span class="token comment">//</span>
<span class="token comment">//  inputs              outputs</span>
<span class="token comment">//  [0] contract    ->  [0] contract</span>
<span class="token comment">//  [1] userPkh     =>  [1] userPkh</span>
<span class="token comment">//  [2] coupon?     -^</span>
<span class="token comment">//</span>

<span class="token keyword">contract</span> <span class="token class-name">Vault</span><span class="token punctuation">(</span><span class="token builtin">int</span> locktime<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>

    <span class="token keyword">function</span> <span class="token function">swap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        
        <span class="token comment">// If tokens are flowing back into this contract</span>
        <span class="token comment">// OP_INPUTINDEX OP_OUTPUTTOKENAMOUNT OP_INPUTINDEX OP_UTXOTOKENAMOUNT OP_GREATERTHAN OP_IF </span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>tokenAmount <span class="token operator">></span> tx<span class="token punctuation">.</span>inputs<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>tokenAmount<span class="token punctuation">)</span><span class="token punctuation">&#123;</span>
        

            <span class="token comment">// Enforce a BIP65 timelock </span>
            <span class="token comment">// Note, intended for use with block height based locks </span>
            <span class="token comment">// (where:  locktime &lt; 500M).</span>
            <span class="token comment">// OP_0 OP_PICK OP_CHECKLOCKTIMEVERIFY OP_DROP</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>time <span class="token operator">>=</span> locktime<span class="token punctuation">)</span><span class="token punctuation">;</span>


        <span class="token punctuation">&#125;</span> <span class="token comment">// OP_ENDIF </span>
         
        <span class="token comment">// </span>
        <span class="token comment">// Inspired by wrapped.cash c. Nov 2023</span>
        <span class="token comment">// Author: Dagur Valberg Johannsson &lt;dagurval@pvv.ntnu.no> </span>
        <span class="token comment">// License: MIT</span>
        <span class="token comment">//</span>
        <span class="token comment">// ensure the token in and out matches</span>
        <span class="token comment">// OP_INPUTINDEX OP_UTXOTOKENCATEGORY OP_INPUTINDEX OP_OUTPUTTOKENCATEGORY OP_EQUAL OP_VERIFY </span>
        <span class="token keyword">require</span><span class="token punctuation">(</span>
          tx<span class="token punctuation">.</span>inputs<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>tokenCategory 
          <span class="token operator">==</span> 
          tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>tokenCategory
          <span class="token punctuation">)</span><span class="token punctuation">;</span>


        <span class="token comment">// Enforce that this contract lives on</span>
        <span class="token comment">// OP_INPUTINDEX OP_OUTPUTBYTECODE OP_INPUTINDEX OP_UTXOBYTECODE OP_EQUAL OP_VERIFY</span>
        <span class="token keyword">require</span><span class="token punctuation">(</span>
          tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>lockingBytecode 
          <span class="token operator">==</span> 
          tx<span class="token punctuation">.</span>inputs<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>lockingBytecode
          <span class="token punctuation">)</span><span class="token punctuation">;</span>


        <span class="token comment">// ensure the sum of sats and tokens in </span>
        <span class="token comment">// matches the sum of sats and tokens out.</span>
        <span class="token comment">// OP_INPUTINDEX OP_UTXOTOKENAMOUNT OP_INPUTINDEX OP_UTXOVALUE OP_ADD</span>
        <span class="token comment">// OP_INPUTINDEX OP_OUTPUTTOKENAMOUNT OP_INPUTINDEX OP_OUTPUTVALUE OP_ADD </span>
        <span class="token comment">// OP_NUMEQUAL</span>
        <span class="token comment">// OP_NIP        </span>
        <span class="token keyword">require</span><span class="token punctuation">(</span>
          tx<span class="token punctuation">.</span>inputs<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>tokenAmount <span class="token operator">+</span> 
          tx<span class="token punctuation">.</span>inputs<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>value 
          <span class="token operator">==</span> 
          tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>tokenAmount <span class="token operator">+</span> 
          tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>value
         <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">&#125;</span>

<span class="token punctuation">&#125;</span></code>`,$,m,Ln="Coupon",nn,_,Hn="A coupon holds some unspent output that can be applied when a certain amount of satoshis are being placed in a vault. The contract limits use of a coupon utxo to one per transaction.",sn,P,Mn="Every vault has known correlate coupon addresses, that can be determined given the vault locking bytecode.",an,O,Rn="If (in the future) whole coins become more unattainable, it’s also possible to create coupon covenants for 10M and 1M sat placements, without modifying the logic of the coupon contract, just by changing the <code>amount</code> parameter.",tn,I,Vn="The coupon contract holds any normal UTXO sent to it as a applicable to a vault placement transaction. So a coupon of 1M sats is created by sending 1M sats to the coupon contract. A hundred coupons could be written by sending one hundred outputs with 1M sats each to the coupon contract. <em>Coupons</em> are just normal UTXOs that can be funded from any software that can a send output Bitcoin Cash to the contract address. The value of each coupon is simply the value of the each output.",pn,q,en,ts=`<code class="language-solidity"><span class="token keyword">pragma</span> cashscript <span class="token operator">^</span><span class="token version number">0.10.0</span><span class="token punctuation">;</span>

<span class="token comment">// Coupon - apply* utxo coupons by spending at least &lt;amount> on &lt;lock></span>
<span class="token comment">//</span>
<span class="token comment">// 2024-06-05</span>
<span class="token comment">//</span>
<span class="token comment">// From: Future Bitcoin Cash</span>
<span class="token comment">//</span>
<span class="token comment">// Author: 2qx &lt;2qx_in_the_future@small.neomailbox.ch></span>
<span class="token comment">//</span>
<span class="token comment">// Allow anyone to use an unspent output (utxo) in a transaction ...</span>
<span class="token comment">//</span>
<span class="token comment">// ... given:</span>
<span class="token comment">//</span>
<span class="token comment">// [ ] the zeroth inflow value exceeds a predefined amount </span>
<span class="token comment">// [ ] the zeroth input is to a predefined address</span>
<span class="token comment">// [ ] the coupon must be applied as the last input</span>
<span class="token comment">//</span>
<span class="token comment">// * Limit one per transaction.</span>
<span class="token comment">//</span>
<span class="token comment">// Note: This contract is designed to run as part of an integrated</span>
<span class="token comment">// multi-contract system. It's not in itself sufficient to assure </span>
<span class="token comment">// an advisory doesn't claim all coupons instantly for no cost.</span>
<span class="token comment">//</span>
<span class="token comment">// Also note: This instance is designed where the &#96;lock&#96;, or destination, </span>
<span class="token comment">// is the first input and output. If the lock isn't spendable, or not the first</span>
<span class="token comment">// input, coupons will not be redeemable.</span>
<span class="token comment">//</span>
<span class="token comment">// ... If there is no time or monetary cost to spend every coupon, </span>
<span class="token comment">// it should be expected that they will all be cleaned at once.</span>
<span class="token comment">//</span>

<span class="token keyword">contract</span> <span class="token class-name">Coupon</span><span class="token punctuation">(</span>
  <span class="token comment">// Minimum spent (sats) to claim each coupon utxo.</span>
  <span class="token builtin">int</span> amount<span class="token punctuation">,</span>
  
  <span class="token comment">// Contract holding the logic.</span>
  <span class="token builtin">bytes</span> lock
<span class="token punctuation">)</span><span class="token punctuation">&#123;</span>

  <span class="token keyword">function</span> <span class="token function">apply</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    
    <span class="token comment">// assure at the minium amount is sent to the intended contract</span>
    <span class="token comment">// OP_0 OP_OUTPUTVALUE OP_0 OP_UTXOVALUE OP_SUB OP_1 OP_ROLL OP_GREATERTHANOREQUAL OP_VERIFY</span>
    <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>value <span class="token operator">-</span> tx<span class="token punctuation">.</span>inputs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token operator">>=</span> amount<span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token comment">// Check that the Coupon is interacting with an existing Vault instance </span>
    <span class="token comment">// OP_0 OP_UTXOBYTECODE OP_1 OP_ROLL OP_EQUAL OP_VERIFY</span>
    <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>inputs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>lockingBytecode <span class="token operator">==</span> lock<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// The coupon must be spent as the last input, </span>
    <span class="token comment">//   therefore only coupon may be spent at a time.</span>
    <span class="token comment">// OP_INPUTINDEX OP_1 OP_ADD OP_TXINPUTCOUNT OP_NUMEQUAL</span>
    <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token operator">+</span><span class="token number">1</span> <span class="token operator">==</span> tx<span class="token punctuation">.</span>inputs<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>

<span class="token punctuation">&#125;</span></code>`,on,d,Gn="Gantry",cn,N,Dn="The gantry contract sends a fixed number of tokens into utxo “threads” on each vault contract for a given blocktime.",un,B,Xn="The gantry automates issuing fungible tokens into the vault.",ln,E,Sn="Gantries issue vaults at different time intervals.",kn,F,zn='<thead><tr><th align="right">Block Interval</th> <th align="center">10^x</th> <th align="right">Spacing</th></tr></thead> <tbody><tr><td align="right">1,000 blocks</td> <td align="center">3</td> <td align="right">~1 week</td></tr> <tr><td align="right">10,000 blocks</td> <td align="center">4</td> <td align="right">~2.5 months</td></tr> <tr><td align="right">100,000 blocks</td> <td align="center">5</td> <td align="right">~23 months</td></tr> <tr><td align="right">1,000,000 blocks</td> <td align="center">6</td> <td align="right">~19 years</td></tr></tbody>',rn,U,Yn="So while one gantry issues vaults every week, another gantry will issue vaults every 2.5 months. In this way, it’s possible to obtain tokens for any approximate date in the future, from any of forty vaults in use at one time.",mn,A,Kn="Anyone may that can construct a transaction to satisfy the requirement of the gantry <code>execute</code> function may step the gantry forward and commission tokens into a new vault.",dn,L,jn="The below version has seven (7) threads, each thread has enough tokens to satisfy locking the entire coin supply.",hn,H,yn,ps=`<code class="language-solidity"><span class="token keyword">pragma</span> cashscript <span class="token operator">^</span><span class="token version number">0.10.0</span><span class="token punctuation">;</span>

<span class="token comment">// Gantry - Create vault contracts with fungible tokens in a uniform way. </span>
<span class="token comment">//</span>
<span class="token comment">// 2024-08-08 </span>
<span class="token comment">//</span>
<span class="token comment">// From: Future Bitcoin Cash</span>
<span class="token comment">//</span>
<span class="token comment">// Author: 2qx &lt;2qx_in_the_future@small.neomailbox.ch></span>
<span class="token comment">//</span>
<span class="token comment">// NFT commentment stores the next series locktime in 32-bit LE</span>
<span class="token comment">//</span>
<span class="token comment">// [ ] Require the minting baton in the input</span>
<span class="token comment">// [ ] Get the current step increment for the chain of futures</span>
<span class="token comment">// [ ] Get the current vault locktime to be printed.</span>
<span class="token comment">//</span>
<span class="token comment">//   either</span>
<span class="token comment">// [ ] Mint an array of FT utxos, </span>
<span class="token comment">// [ ] send them off to a Vault</span>
<span class="token comment">//</span>
<span class="token comment">//   or</span>
<span class="token comment">// [ ] skip every 10th print.</span>
<span class="token comment">//</span>
<span class="token comment">// [ ] increment locktime height value stored on NFT baton</span>
<span class="token comment">// [ ] assure NFT baton is returned</span>
<span class="token comment">//</span>
<span class="token comment">//</span>
<span class="token comment">//  Gantry i/o Flow:</span>
<span class="token comment">//</span>
<span class="token comment">//  Inputs              Outputs</span>
<span class="token comment">//  [0] NFT mintBaton   ->  [0] NFT mintBaton</span>
<span class="token comment">//                      =>  [1] FTs Vault</span>
<span class="token comment">//                      =>  [2] FTs Vault</span>
<span class="token comment">//                      =>  [3] FTs Vault</span>
<span class="token comment">//                      =>  [4] FTs Vault</span>
<span class="token comment">//                      =>  [5] FTs Vault</span>
<span class="token comment">//                      =>  [6] FTs Vault</span>
<span class="token comment">//                      =>  [7] FTs Vault</span>
<span class="token comment">//                          [8] OP_RETURN FBCH &lt;locktime></span>
<span class="token comment">//  </span>
<span class="token comment">//  ... but skip every 10th token print, </span>
<span class="token comment">//   which will be printed by the gantry of the next order.</span>
<span class="token comment">//  [0] NFT mintBaton   =>  [0] NFT mintBaton</span>
<span class="token comment">//</span>
<span class="token comment">// NOTE: The production version differs from the final audit:</span>
<span class="token comment">// - Sats to fund the Gantry transactions are secured in the baton UTXO (line 68),</span>
<span class="token comment">// - Some minor optimizations were made to stay under the 201 op_code limit:</span>
<span class="token comment">//   - used tokenAmount as number instead of stack variable [92,98,104...]</span>
<span class="token comment">//   - inlined op_return tag in single line require (line 137)</span>
<span class="token comment">//</span>


<span class="token keyword">contract</span> <span class="token class-name">Gantry</span><span class="token punctuation">(</span>
    <span class="token builtin">int</span> step<span class="token punctuation">,</span> 
    <span class="token builtin">bytes</span> vaultUnlockingBytecode
    <span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>

    <span class="token keyword">function</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>

        <span class="token comment">// Gantry covenant and the associated NFT baton must be spent as index 0</span>
        <span class="token comment">// input and passed on to index 0 output, funded with some dust BCH in order</span>
        <span class="token comment">// to avoid griefing by someone with access to hashrate</span>
        <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>inputs<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>lockingBytecode <span class="token operator">==</span> 
        tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>lockingBytecode<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>inputs<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>tokenCategory <span class="token operator">==</span>
            tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>tokenCategory<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>value <span class="token operator">==</span> tx<span class="token punctuation">.</span>inputs<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>value <span class="token operator">-</span> <span class="token number">8500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token builtin">int</span> locktime <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>inputs<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>nftCommitment<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Locktime stored in mutable NFT commitment MUST be incremented by &lt;step></span>
        <span class="token comment">// and stored as bytes4 LE uint again.</span>
        <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>nftCommitment <span class="token operator">==</span>
            <span class="token builtin">bytes4</span><span class="token punctuation">(</span>locktime <span class="token operator">+</span> step<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Every 10th step, skip creating Vault and just increment the commitment</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token punctuation">(</span>locktime <span class="token operator">/</span> step<span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">10</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span> 
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token punctuation">&#123;</span>
            <span class="token comment">// Construct redeem bytecode for the Vault instance being created</span>
            <span class="token builtin">bytes</span> theVault <span class="token operator">=</span> 
                <span class="token builtin">bytes</span><span class="token punctuation">(</span><span class="token builtin">bytes</span><span class="token punctuation">(</span>locktime<span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token builtin">bytes</span><span class="token punctuation">(</span>locktime<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token comment">// int locktime</span>
                vaultUnlockingBytecode<span class="token punctuation">;</span>
            <span class="token comment">// Construct P2SH32 locking bytecode from redeem bytecode</span>
            <span class="token builtin">bytes</span> vaultLockingBytecode <span class="token operator">=</span> <span class="token number">0xaa20</span> <span class="token operator">+</span> <span class="token function">hash256</span><span class="token punctuation">(</span>theVault<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">0x87</span><span class="token punctuation">;</span>

            <span class="token comment">// Verify creation of Vault genesis outputs</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>lockingBytecode <span class="token operator">==</span> vaultLockingBytecode<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>tokenCategory <span class="token operator">==</span> tx<span class="token punctuation">.</span>inputs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>outpointTransactionHash<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>nftCommitment <span class="token operator">==</span> <span class="token number">0</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>tokenAmount <span class="token operator">==</span> <span class="token number">2100000000000000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>value <span class="token operator">==</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">.</span>lockingBytecode <span class="token operator">==</span> vaultLockingBytecode<span class="token punctuation">)</span><span class="token punctuation">;</span>       
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">.</span>tokenCategory <span class="token operator">==</span> tx<span class="token punctuation">.</span>inputs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>outpointTransactionHash<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">.</span>nftCommitment <span class="token operator">==</span> <span class="token number">0</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">.</span>tokenAmount <span class="token operator">==</span> <span class="token number">2100000000000000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">.</span>value <span class="token operator">==</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span>lockingBytecode <span class="token operator">==</span> vaultLockingBytecode<span class="token punctuation">)</span><span class="token punctuation">;</span>       
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span>tokenCategory <span class="token operator">==</span> tx<span class="token punctuation">.</span>inputs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>outpointTransactionHash<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span>nftCommitment <span class="token operator">==</span> <span class="token number">0</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span>tokenAmount <span class="token operator">==</span> <span class="token number">2100000000000000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span>value <span class="token operator">==</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">.</span>lockingBytecode <span class="token operator">==</span> vaultLockingBytecode<span class="token punctuation">)</span><span class="token punctuation">;</span>       
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">.</span>tokenCategory <span class="token operator">==</span> tx<span class="token punctuation">.</span>inputs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>outpointTransactionHash<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">.</span>nftCommitment <span class="token operator">==</span> <span class="token number">0</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">.</span>tokenAmount <span class="token operator">==</span> <span class="token number">2100000000000000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">.</span>value <span class="token operator">==</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">.</span>lockingBytecode <span class="token operator">==</span> vaultLockingBytecode<span class="token punctuation">)</span><span class="token punctuation">;</span>       
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">.</span>tokenCategory <span class="token operator">==</span> tx<span class="token punctuation">.</span>inputs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>outpointTransactionHash<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">.</span>nftCommitment <span class="token operator">==</span> <span class="token number">0</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">.</span>tokenAmount <span class="token operator">==</span> <span class="token number">2100000000000000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">.</span>value <span class="token operator">==</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">.</span>lockingBytecode <span class="token operator">==</span> vaultLockingBytecode<span class="token punctuation">)</span><span class="token punctuation">;</span>       
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">.</span>tokenCategory <span class="token operator">==</span> tx<span class="token punctuation">.</span>inputs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>outpointTransactionHash<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">.</span>nftCommitment <span class="token operator">==</span> <span class="token number">0</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">.</span>tokenAmount <span class="token operator">==</span> <span class="token number">2100000000000000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">.</span>value <span class="token operator">==</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">]</span><span class="token punctuation">.</span>lockingBytecode <span class="token operator">==</span> vaultLockingBytecode<span class="token punctuation">)</span><span class="token punctuation">;</span>       
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">]</span><span class="token punctuation">.</span>tokenCategory <span class="token operator">==</span> tx<span class="token punctuation">.</span>inputs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>outpointTransactionHash<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">]</span><span class="token punctuation">.</span>nftCommitment <span class="token operator">==</span> <span class="token number">0</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">]</span><span class="token punctuation">.</span>tokenAmount <span class="token operator">==</span> <span class="token number">2100000000000000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">]</span><span class="token punctuation">.</span>value <span class="token operator">==</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


            <span class="token comment">// Tag FT metadata for indexers </span>
            <span class="token comment">//</span>
            <span class="token comment">// 6a              OP_RETURN</span>
            <span class="token comment">// 04 46 42 43 48  FBCH</span>
            <span class="token comment">// 03 90 05 10     &lt;locktime></span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">.</span>lockingBytecode <span class="token operator">==</span> <span class="token number">0x6a0446424348</span> <span class="token operator">+</span>
                                  <span class="token builtin">bytes</span><span class="token punctuation">(</span><span class="token builtin">bytes</span><span class="token punctuation">(</span>locktime<span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token operator">+</span>  <span class="token builtin">bytes</span><span class="token punctuation">(</span>locktime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">.</span>tokenCategory <span class="token operator">==</span> <span class="token number">0</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">.</span>value <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// Ensure no other outputs can be created</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  

        <span class="token punctuation">&#125;</span>     
        
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`,bn,h,Qn="Battery",xn,M,Jn="The battery deployed a fixed number of gantries, similar to the way gantries deploy vaults. It then burned the minting baton used to create the gantries minting batons.",fn,R,vn,es=`<code class="language-solidity"><span class="token keyword">pragma</span> cashscript <span class="token operator">^</span><span class="token version number">0.10.0</span><span class="token punctuation">;</span>

<span class="token comment">// Battery - Spawn an array of vault deploying gantries from a single utxo.</span>
<span class="token comment">//</span>
<span class="token comment">// 2024-08-08</span>
<span class="token comment">// </span>
<span class="token comment">// Executed in block #858,444 on Aug 10, 2024</span>
<span class="token comment">// 02eb65ab5ce602b3025bc0c139cd22709983ae1acb58f476b86d6e31dd585e55</span>
<span class="token comment">// bitcoincash:pd3hc4smdeu4kpwyvjq645d0ts5n9wxgvp3x7gg3my65u2kkw766xxxl8wdgp</span>
<span class="token comment">//</span>
<span class="token comment">// From: Future Bitcoin Cash</span>
<span class="token comment">//</span>
<span class="token comment">// Author: 2qx &lt;2qx_in_the_future@small.neomailbox.ch></span>
<span class="token comment">//</span>
<span class="token comment">// A Battery releases a series of Gantries at small powers of 10 that </span>
<span class="token comment">// go on to create Futures Vaults on those respective intervals.</span>
<span class="token comment">//</span>
<span class="token comment">// Given a minting NFT with the commitment containing a power of 10, </span>
<span class="token comment">// mint a sequence of NFTs with minting capability</span>
<span class="token comment">// sending mutable batons NFTs to the corresponding Gantry.</span>
<span class="token comment">//</span>
<span class="token comment">//  execute():</span>
<span class="token comment">//</span>
<span class="token comment">//  inputs                           outputs</span>
<span class="token comment">//  [0] Battery + NFT 0x40420F00 10ᴇ6 ->  [0] Gantry10ᴇ6 + NFT* &lt;startTime></span>
<span class="token comment">//                                    =>  [1] Battery    + NFT  0xA0860100</span>
<span class="token comment">//</span>
<span class="token comment">//  [0] Battery + NFT 0xA0860100 10ᴇ5 ->  [0] Gantry10ᴇ5 + NFT* &lt;startTime></span>
<span class="token comment">//                                    =>  [1] Battery    + NFT  0x10270000</span>
<span class="token comment">//</span>
<span class="token comment">//  ... 0x10270000 10ᴇ4 ... 0xE8030000 10ᴇ3 ... 0x64000000 10ᴇ2</span>
<span class="token comment">//</span>
<span class="token comment">//  [0] Battery + NFT 0x&lt;end>        ->  [0]  Gantry10ᴇ2 + NFT* &lt;startTime></span>
<span class="token comment">//                                       [1]  Burn NFT, sats are unencumbered.</span>
<span class="token comment">//                                       </span>
<span class="token comment">//  NOTE:</span>
<span class="token comment">//  This final production version: </span>
<span class="token comment">//    - Swaps the order of outputs so Gantries are first.</span>
<span class="token comment">//       (this allows the mutable gantry NFT later mint FTs)</span>
<span class="token comment">//    - Accomodates variable length baton values, line 80</span>
<span class="token comment">//    - Funds the gantry with sats per lines 100, 104</span>
<span class="token comment">// </span>

<span class="token keyword">contract</span> <span class="token class-name">Battery</span><span class="token punctuation">(</span>

    <span class="token comment">// Correct contract initialization will have minting NFT's commitment</span>
    <span class="token comment">// set to &lt;step> from the NFT commitment, which will be the step set for 1st minted gantry,</span>
    <span class="token comment">// and will then get decremented for the next one until end step is reached.</span>

    <span class="token comment">// The end is the smallest power of 10 to create a Gantry for.</span>
    <span class="token builtin">int</span> endStep<span class="token punctuation">,</span>

    <span class="token comment">// Base time from which to calculate each Gantry's starting point, e.g.:</span>
    <span class="token comment">// --| baseTime</span>
    <span class="token comment">//   |------------------------------------| gantry 0 start</span>
    <span class="token comment">//   |------------| gantry 1 start</span>
    <span class="token comment">//   |----| gantry 2 start</span>
    <span class="token builtin">int</span> baseTime<span class="token punctuation">,</span>

    <span class="token comment">// Redeem bytecode tail of the gantry contracts</span>
    <span class="token builtin">bytes</span> gantryReedemBytecodeTail<span class="token punctuation">,</span>

    <span class="token comment">// Redeem bytecode tail of the vault contracts</span>
    <span class="token builtin">bytes</span> vaultReedemBytecodeTail<span class="token punctuation">,</span>

<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>

    <span class="token keyword">function</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>

        <span class="token comment">// Get the current step, we will mint a Gantry for this step</span>
        <span class="token builtin">bytes</span> stepBytes <span class="token operator">=</span> tx<span class="token punctuation">.</span>inputs<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>nftCommitment<span class="token punctuation">;</span>
        <span class="token builtin">int</span> step <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>stepBytes<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Set the gantry's starting time at correct offset from baseTime</span>
        <span class="token builtin">bytes4</span> gantryStart <span class="token operator">=</span> <span class="token builtin">bytes4</span><span class="token punctuation">(</span>baseTime <span class="token operator">-</span> <span class="token punctuation">(</span>baseTime <span class="token operator">%</span> step<span class="token punctuation">)</span> <span class="token operator">+</span> step<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>nftCommitment <span class="token operator">==</span> gantryStart<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Construct the full redeem bytecode for the Gantry instance</span>
        <span class="token builtin">bytes</span> gantryRedeemBytecode <span class="token operator">=</span>
            <span class="token builtin">bytes</span><span class="token punctuation">(</span>vaultReedemBytecodeTail<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token operator">+</span> vaultReedemBytecodeTail <span class="token operator">+</span>
            <span class="token builtin">bytes</span><span class="token punctuation">(</span><span class="token builtin">bytes</span><span class="token punctuation">(</span>step<span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span>             <span class="token operator">+</span> <span class="token builtin">bytes</span><span class="token punctuation">(</span>step<span class="token punctuation">)</span>   <span class="token operator">+</span> 
            gantryReedemBytecodeTail<span class="token punctuation">;</span>

        <span class="token keyword">require</span><span class="token punctuation">(</span>
            <span class="token comment">// The first output must have the P2SH32 of the gantry redeem bytecode</span>
            <span class="token number">0xaa20</span> <span class="token operator">+</span> <span class="token function">hash256</span><span class="token punctuation">(</span>gantryRedeemBytecode<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">0x87</span>
            <span class="token operator">==</span> tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>lockingBytecode
        <span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Ensure that Gantry inherits a mutable NFT so that it may update the</span>
        <span class="token comment">// commitment as it mints its Vaults.</span>
        <span class="token builtin">bytes</span> gantryCategory <span class="token operator">=</span>
            tx<span class="token punctuation">.</span>inputs<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>tokenCategory<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span>
            <span class="token number">0x01</span><span class="token punctuation">;</span>
        <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>tokenCategory <span class="token operator">==</span> gantryCategory<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Exactly 2 outputs, so token state or BCH can't leak out.</span>
        <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Fund each gantry in a single utxo for about 100 years.</span>
        <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>value <span class="token operator">></span> <span class="token number">42500000000</span><span class="token operator">/</span>step<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Fee allowance = 1000</span>
        <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>value <span class="token operator">></span>
            tx<span class="token punctuation">.</span>inputs<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>value <span class="token operator">-</span> <span class="token number">42500000000</span><span class="token operator">/</span>step <span class="token operator">-</span>
            <span class="token number">1800</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span>step <span class="token operator">></span> endStep<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token comment">// Calculate and enforce next baton's step,</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>nftCommitment <span class="token operator">==</span> <span class="token builtin">bytes4</span><span class="token punctuation">(</span>step <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// token category &amp; capability (pass on minting NFT),</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>tokenCategory <span class="token operator">==</span>
                tx<span class="token punctuation">.</span>inputs<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>tokenCategory<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// and contract code.</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>lockingBytecode <span class="token operator">==</span>
                tx<span class="token punctuation">.</span>inputs<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeInputIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>lockingBytecode<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token punctuation">&#123;</span>
            <span class="token comment">// Burn the minting baton while allowing any remaining BCH</span>
            <span class="token comment">// to be extracted to output 1.</span>
            <span class="token keyword">require</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span>outputs<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>tokenCategory <span class="token operator">==</span> <span class="token number">0</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// Note: output 1 still mints a Gantry in this same TX,</span>
            <span class="token comment">// and it will be the last one to get minted.</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`;return{c(){i=p("nav"),i.innerHTML=_n,V=e(),G=e(),k=p("h1"),k.textContent=Pn,D=e(),y=p("p"),y.textContent=On,X=e(),b=p("p"),b.textContent=In,S=e(),x=p("img"),z=e(),f=p("p"),f.textContent=Nn,Y=e(),v=p("ul"),v.innerHTML=Bn,K=e(),g=p("p"),g.innerHTML=En,j=e(),r=p("h1"),r.textContent=Fn,Q=e(),w=p("p"),w.innerHTML=Un,J=e(),T=p("p"),T.textContent=An,W=e(),C=p("pre"),Z=new gn(!1),$=e(),m=p("h1"),m.textContent=Ln,nn=e(),_=p("p"),_.textContent=Hn,sn=e(),P=p("p"),P.textContent=Mn,an=e(),O=p("p"),O.innerHTML=Rn,tn=e(),I=p("p"),I.innerHTML=Vn,pn=e(),q=p("pre"),en=new gn(!1),on=e(),d=p("h1"),d.textContent=Gn,cn=e(),N=p("p"),N.textContent=Dn,un=e(),B=p("p"),B.textContent=Xn,ln=e(),E=p("p"),E.textContent=Sn,kn=e(),F=p("table"),F.innerHTML=zn,rn=e(),U=p("p"),U.textContent=Yn,mn=e(),A=p("p"),A.innerHTML=Kn,dn=e(),L=p("p"),L.textContent=jn,hn=e(),H=p("pre"),yn=new gn(!1),bn=e(),h=p("h1"),h.textContent=Qn,xn=e(),M=p("p"),M.textContent=Jn,fn=e(),R=p("pre"),vn=new gn(!1),this.h()},l(n){i=o(n,"NAV",{class:!0,"data-svelte-h":!0}),u(i)!=="svelte-a0nl3g"&&(i.innerHTML=_n),V=c(n),ks("svelte-zpelw2",document.head).forEach(s),G=c(n),k=o(n,"H1",{id:!0,"data-svelte-h":!0}),u(k)!=="svelte-oeodtg"&&(k.textContent=Pn),D=c(n),y=o(n,"P",{"data-svelte-h":!0}),u(y)!=="svelte-16qwy0b"&&(y.textContent=On),X=c(n),b=o(n,"P",{"data-svelte-h":!0}),u(b)!=="svelte-cpeihz"&&(b.textContent=In),S=c(n),x=o(n,"IMG",{src:!0,alt:!0}),z=c(n),f=o(n,"P",{"data-svelte-h":!0}),u(f)!=="svelte-1badptb"&&(f.textContent=Nn),Y=c(n),v=o(n,"UL",{"data-svelte-h":!0}),u(v)!=="svelte-1tx40yl"&&(v.innerHTML=Bn),K=c(n),g=o(n,"P",{"data-svelte-h":!0}),u(g)!=="svelte-ihs37d"&&(g.innerHTML=En),j=c(n),r=o(n,"H1",{id:!0,"data-svelte-h":!0}),u(r)!=="svelte-1ndpua0"&&(r.textContent=Fn),Q=c(n),w=o(n,"P",{"data-svelte-h":!0}),u(w)!=="svelte-3k23hk"&&(w.innerHTML=Un),J=c(n),T=o(n,"P",{"data-svelte-h":!0}),u(T)!=="svelte-1q9znac"&&(T.textContent=An),W=c(n),C=o(n,"PRE",{class:!0});var Wn=wn(C);Z=Tn(Wn,!1),Wn.forEach(s),$=c(n),m=o(n,"H1",{id:!0,"data-svelte-h":!0}),u(m)!=="svelte-1grnp6w"&&(m.textContent=Ln),nn=c(n),_=o(n,"P",{"data-svelte-h":!0}),u(_)!=="svelte-y3xa8e"&&(_.textContent=Hn),sn=c(n),P=o(n,"P",{"data-svelte-h":!0}),u(P)!=="svelte-1xzb9ty"&&(P.textContent=Mn),an=c(n),O=o(n,"P",{"data-svelte-h":!0}),u(O)!=="svelte-g6us73"&&(O.innerHTML=Rn),tn=c(n),I=o(n,"P",{"data-svelte-h":!0}),u(I)!=="svelte-1ozf3od"&&(I.innerHTML=Vn),pn=c(n),q=o(n,"PRE",{class:!0});var Zn=wn(q);en=Tn(Zn,!1),Zn.forEach(s),on=c(n),d=o(n,"H1",{id:!0,"data-svelte-h":!0}),u(d)!=="svelte-1px4dhc"&&(d.textContent=Gn),cn=c(n),N=o(n,"P",{"data-svelte-h":!0}),u(N)!=="svelte-1oz9at7"&&(N.textContent=Dn),un=c(n),B=o(n,"P",{"data-svelte-h":!0}),u(B)!=="svelte-1v38al8"&&(B.textContent=Xn),ln=c(n),E=o(n,"P",{"data-svelte-h":!0}),u(E)!=="svelte-eav5o4"&&(E.textContent=Sn),kn=c(n),F=o(n,"TABLE",{"data-svelte-h":!0}),u(F)!=="svelte-wtt2eu"&&(F.innerHTML=zn),rn=c(n),U=o(n,"P",{"data-svelte-h":!0}),u(U)!=="svelte-eb4trz"&&(U.textContent=Yn),mn=c(n),A=o(n,"P",{"data-svelte-h":!0}),u(A)!=="svelte-1frtzbk"&&(A.innerHTML=Kn),dn=c(n),L=o(n,"P",{"data-svelte-h":!0}),u(L)!=="svelte-arjt1u"&&(L.textContent=jn),hn=c(n),H=o(n,"PRE",{class:!0});var $n=wn(H);yn=Tn($n,!1),$n.forEach(s),bn=c(n),h=o(n,"H1",{id:!0,"data-svelte-h":!0}),u(h)!=="svelte-10kj1o6"&&(h.textContent=Qn),xn=c(n),M=o(n,"P",{"data-svelte-h":!0}),u(M)!=="svelte-11g838d"&&(M.textContent=Jn),fn=c(n),R=o(n,"PRE",{class:!0});var ns=wn(R);vn=Tn(ns,!1),ns.forEach(s),this.h()},h(){l(i,"class","toc"),document.title="Contracts",l(k,"id","overview"),us(x.src,qn="/system_genesis.svg")||l(x,"src",qn),l(x,"alt","diagram showing system operation"),l(r,"id","vault"),Z.a=null,l(C,"class","language-solidity"),l(m,"id","coupon"),en.a=null,l(q,"class","language-solidity"),l(d,"id","gantry"),yn.a=null,l(H,"class","language-solidity"),l(h,"id","battery"),vn.a=null,l(R,"class","language-solidity")},m(n,a){t(n,i,a),t(n,V,a),t(n,G,a),t(n,k,a),t(n,D,a),t(n,y,a),t(n,X,a),t(n,b,a),t(n,S,a),t(n,x,a),t(n,z,a),t(n,f,a),t(n,Y,a),t(n,v,a),t(n,K,a),t(n,g,a),t(n,j,a),t(n,r,a),t(n,Q,a),t(n,w,a),t(n,J,a),t(n,T,a),t(n,W,a),t(n,C,a),Z.m(as,C),t(n,$,a),t(n,m,a),t(n,nn,a),t(n,_,a),t(n,sn,a),t(n,P,a),t(n,an,a),t(n,O,a),t(n,tn,a),t(n,I,a),t(n,pn,a),t(n,q,a),en.m(ts,q),t(n,on,a),t(n,d,a),t(n,cn,a),t(n,N,a),t(n,un,a),t(n,B,a),t(n,ln,a),t(n,E,a),t(n,kn,a),t(n,F,a),t(n,rn,a),t(n,U,a),t(n,mn,a),t(n,A,a),t(n,dn,a),t(n,L,a),t(n,hn,a),t(n,H,a),yn.m(ps,H),t(n,bn,a),t(n,h,a),t(n,xn,a),t(n,M,a),t(n,fn,a),t(n,R,a),vn.m(es,R)},p:Cn,i:Cn,o:Cn,d(n){n&&(s(i),s(V),s(G),s(k),s(D),s(y),s(X),s(b),s(S),s(x),s(z),s(f),s(Y),s(v),s(K),s(g),s(j),s(r),s(Q),s(w),s(J),s(T),s(W),s(C),s($),s(m),s(nn),s(_),s(sn),s(P),s(an),s(O),s(tn),s(I),s(pn),s(q),s(on),s(d),s(cn),s(N),s(un),s(B),s(ln),s(E),s(kn),s(F),s(rn),s(U),s(mn),s(A),s(dn),s(L),s(hn),s(H),s(bn),s(h),s(xn),s(M),s(fn),s(R))}}}class fs extends ls{constructor(i){super(),is(this,i,null,ds,cs,{})}}export{fs as component,xs as universal};
//# sourceMappingURL=5.BcPq7RbO.js.map
