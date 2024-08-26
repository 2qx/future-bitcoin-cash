import{d as Vn}from"../chunks/index.R8ovVqwX.js";import{s as Mn,n as ln}from"../chunks/scheduler.C6iVHy88.js";import{S as Gn,i as Dn,e as p,s as e,H as on,c as o,q as u,f as c,r as Xn,d as s,a as cn,u as un,m as i,g as t}from"../chunks/index.CjH48Mbr.js";const Sn=Vn,zn=!0,Jn=Object.freeze(Object.defineProperty({__proto__:null,csr:Sn,prerender:zn},Symbol.toStringTag,{value:"Module"}));function Yn(Un){let l,kn='<ol class="toc-level toc-level-1"><li class="toc-item toc-item-h1"><a class="toc-link toc-link-h1" href="#vault">Vault</a></li><li class="toc-item toc-item-h1"><a class="toc-link toc-link-h1" href="#coupon">Coupon</a></li><li class="toc-item toc-item-h1"><a class="toc-link toc-link-h1" href="#gantry">Gantry</a></li><li class="toc-item toc-item-h1"><a class="toc-link toc-link-h1" href="#battery">Battery</a></li></ol>',F,U,k,rn="Vault",A,y,mn="The vault allows swapping coins for fungible tokens on a 1:1 basis until a certain block height is reached. When the <code>locktime</code> has been met, the vault allows bi-directional swapping.",L,h,dn="Although the vault may lock coins against any fungible token, only contractually issued tokens with the full auditable supply sent to the vault should be treated as locked futures on the open market.",H,b,R,An=`<code class="language-solidity"><span class="token keyword">pragma</span> cashscript <span class="token operator">^</span><span class="token version number">0.10.0</span><span class="token punctuation">;</span>

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

<span class="token punctuation">&#125;</span></code>`,V,r,yn="Coupon",M,x,hn="A coupon holds some unspent output that can be applied when a certain amount of satoshis are being placed in a vault. The contract limits use of a coupon utxo to one per transaction.",G,f,bn="Every vault has known correlate coupon addresses, that can be determined given the vault locking bytecode.",D,g,xn="If (in the future) whole coins become more unattainable, it’s also possible to create coupon covenants for 10M and 1M sat placements, without modifying the logic of the coupon contract, just by changing the <code>amount</code> parameter.",X,v,fn="The coupon contract holds any normal UTXO sent to it as a applicable to a vault placement transaction. So a coupon of 1M sats is created by sending 1M sats to the coupon contract. A hundred coupons could be written by sending one hundred outputs with 1M sats each to the coupon contract. <em>Coupons</em> are just normal UTXOs that can be funded from any software that can a send output Bitcoin Cash to the contract address. The value of each coupon is simply the value of the each output.",S,w,z,Ln=`<code class="language-solidity"><span class="token keyword">pragma</span> cashscript <span class="token operator">^</span><span class="token version number">0.10.0</span><span class="token punctuation">;</span>

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

<span class="token punctuation">&#125;</span></code>`,Y,m,gn="Gantry",K,T,vn="The gantry contract sends a fixed number of tokens into utxo “threads” on each vault contract for a given blocktime.",j,_,wn="The gantry automates issuing fungible tokens into the vault.",Q,C,Tn="Gantries issue vaults at different time intervals.",J,P,_n='<thead><tr><th align="right">Block Interval</th> <th align="center">10^x</th> <th align="right">Spacing</th></tr></thead> <tbody><tr><td align="right">1,000 blocks</td> <td align="center">3</td> <td align="right">~1 week</td></tr> <tr><td align="right">10,000 blocks</td> <td align="center">4</td> <td align="right">~2.5 months</td></tr> <tr><td align="right">100,000 blocks</td> <td align="center">5</td> <td align="right">~23 months</td></tr> <tr><td align="right">1,000,000 blocks</td> <td align="center">6</td> <td align="right">~19 years</td></tr></tbody>',W,O,Cn="So while one gantry issues vaults every week, another gantry will issue vaults every 2.5 months. In this way, it’s possible to obtain tokens for any approximate date in the future, from any of forty vaults in use at one time.",Z,I,Pn="Anyone may that can construct a transaction to satisfy the requirement of the gantry <code>execute</code> function may step the gantry forward and commission tokens into a new vault.",$,q,On="The below version has seven (7) threads, each thread has enough tokens to satisfy locking the entire coin supply.",nn,N,sn,Hn=`<code class="language-solidity"><span class="token keyword">pragma</span> cashscript <span class="token operator">^</span><span class="token version number">0.10.0</span><span class="token punctuation">;</span>

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
<span class="token punctuation">&#125;</span></code>`,an,d,In="Battery",tn,E,qn="The battery deployed a fixed number of gantries, similar to the way gantries deploy vaults. It then burned the minting baton used to create the gantries minting batons.",pn,B,en,Rn=`<code class="language-solidity"><span class="token keyword">pragma</span> cashscript <span class="token operator">^</span><span class="token version number">0.10.0</span><span class="token punctuation">;</span>

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
<span class="token punctuation">&#125;</span></code>`;return{c(){l=p("nav"),l.innerHTML=kn,F=e(),U=e(),k=p("h1"),k.textContent=rn,A=e(),y=p("p"),y.innerHTML=mn,L=e(),h=p("p"),h.textContent=dn,H=e(),b=p("pre"),R=new on(!1),V=e(),r=p("h1"),r.textContent=yn,M=e(),x=p("p"),x.textContent=hn,G=e(),f=p("p"),f.textContent=bn,D=e(),g=p("p"),g.innerHTML=xn,X=e(),v=p("p"),v.innerHTML=fn,S=e(),w=p("pre"),z=new on(!1),Y=e(),m=p("h1"),m.textContent=gn,K=e(),T=p("p"),T.textContent=vn,j=e(),_=p("p"),_.textContent=wn,Q=e(),C=p("p"),C.textContent=Tn,J=e(),P=p("table"),P.innerHTML=_n,W=e(),O=p("p"),O.textContent=Cn,Z=e(),I=p("p"),I.innerHTML=Pn,$=e(),q=p("p"),q.textContent=On,nn=e(),N=p("pre"),sn=new on(!1),an=e(),d=p("h1"),d.textContent=In,tn=e(),E=p("p"),E.textContent=qn,pn=e(),B=p("pre"),en=new on(!1),this.h()},l(n){l=o(n,"NAV",{class:!0,"data-svelte-h":!0}),u(l)!=="svelte-9f2uen"&&(l.innerHTML=kn),F=c(n),Xn("svelte-zpelw2",document.head).forEach(s),U=c(n),k=o(n,"H1",{id:!0,"data-svelte-h":!0}),u(k)!=="svelte-1ndpua0"&&(k.textContent=rn),A=c(n),y=o(n,"P",{"data-svelte-h":!0}),u(y)!=="svelte-3k23hk"&&(y.innerHTML=mn),L=c(n),h=o(n,"P",{"data-svelte-h":!0}),u(h)!=="svelte-1q9znac"&&(h.textContent=dn),H=c(n),b=o(n,"PRE",{class:!0});var Nn=cn(b);R=un(Nn,!1),Nn.forEach(s),V=c(n),r=o(n,"H1",{id:!0,"data-svelte-h":!0}),u(r)!=="svelte-1grnp6w"&&(r.textContent=yn),M=c(n),x=o(n,"P",{"data-svelte-h":!0}),u(x)!=="svelte-y3xa8e"&&(x.textContent=hn),G=c(n),f=o(n,"P",{"data-svelte-h":!0}),u(f)!=="svelte-1xzb9ty"&&(f.textContent=bn),D=c(n),g=o(n,"P",{"data-svelte-h":!0}),u(g)!=="svelte-g6us73"&&(g.innerHTML=xn),X=c(n),v=o(n,"P",{"data-svelte-h":!0}),u(v)!=="svelte-1ozf3od"&&(v.innerHTML=fn),S=c(n),w=o(n,"PRE",{class:!0});var En=cn(w);z=un(En,!1),En.forEach(s),Y=c(n),m=o(n,"H1",{id:!0,"data-svelte-h":!0}),u(m)!=="svelte-1px4dhc"&&(m.textContent=gn),K=c(n),T=o(n,"P",{"data-svelte-h":!0}),u(T)!=="svelte-1oz9at7"&&(T.textContent=vn),j=c(n),_=o(n,"P",{"data-svelte-h":!0}),u(_)!=="svelte-1v38al8"&&(_.textContent=wn),Q=c(n),C=o(n,"P",{"data-svelte-h":!0}),u(C)!=="svelte-eav5o4"&&(C.textContent=Tn),J=c(n),P=o(n,"TABLE",{"data-svelte-h":!0}),u(P)!=="svelte-wtt2eu"&&(P.innerHTML=_n),W=c(n),O=o(n,"P",{"data-svelte-h":!0}),u(O)!=="svelte-eb4trz"&&(O.textContent=Cn),Z=c(n),I=o(n,"P",{"data-svelte-h":!0}),u(I)!=="svelte-1frtzbk"&&(I.innerHTML=Pn),$=c(n),q=o(n,"P",{"data-svelte-h":!0}),u(q)!=="svelte-arjt1u"&&(q.textContent=On),nn=c(n),N=o(n,"PRE",{class:!0});var Bn=cn(N);sn=un(Bn,!1),Bn.forEach(s),an=c(n),d=o(n,"H1",{id:!0,"data-svelte-h":!0}),u(d)!=="svelte-10kj1o6"&&(d.textContent=In),tn=c(n),E=o(n,"P",{"data-svelte-h":!0}),u(E)!=="svelte-11g838d"&&(E.textContent=qn),pn=c(n),B=o(n,"PRE",{class:!0});var Fn=cn(B);en=un(Fn,!1),Fn.forEach(s),this.h()},h(){i(l,"class","toc"),document.title="Contracts",i(k,"id","vault"),R.a=null,i(b,"class","language-solidity"),i(r,"id","coupon"),z.a=null,i(w,"class","language-solidity"),i(m,"id","gantry"),sn.a=null,i(N,"class","language-solidity"),i(d,"id","battery"),en.a=null,i(B,"class","language-solidity")},m(n,a){t(n,l,a),t(n,F,a),t(n,U,a),t(n,k,a),t(n,A,a),t(n,y,a),t(n,L,a),t(n,h,a),t(n,H,a),t(n,b,a),R.m(An,b),t(n,V,a),t(n,r,a),t(n,M,a),t(n,x,a),t(n,G,a),t(n,f,a),t(n,D,a),t(n,g,a),t(n,X,a),t(n,v,a),t(n,S,a),t(n,w,a),z.m(Ln,w),t(n,Y,a),t(n,m,a),t(n,K,a),t(n,T,a),t(n,j,a),t(n,_,a),t(n,Q,a),t(n,C,a),t(n,J,a),t(n,P,a),t(n,W,a),t(n,O,a),t(n,Z,a),t(n,I,a),t(n,$,a),t(n,q,a),t(n,nn,a),t(n,N,a),sn.m(Hn,N),t(n,an,a),t(n,d,a),t(n,tn,a),t(n,E,a),t(n,pn,a),t(n,B,a),en.m(Rn,B)},p:ln,i:ln,o:ln,d(n){n&&(s(l),s(F),s(U),s(k),s(A),s(y),s(L),s(h),s(H),s(b),s(V),s(r),s(M),s(x),s(G),s(f),s(D),s(g),s(X),s(v),s(S),s(w),s(Y),s(m),s(K),s(T),s(j),s(_),s(Q),s(C),s(J),s(P),s(W),s(O),s(Z),s(I),s($),s(q),s(nn),s(N),s(an),s(d),s(tn),s(E),s(pn),s(B))}}}class Wn extends Gn{constructor(l){super(),Dn(this,l,null,Yn,Mn,{})}}export{Wn as component,Jn as universal};
//# sourceMappingURL=5.DHrAEn7k.js.map
