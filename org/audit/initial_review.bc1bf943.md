# Introduction

This is an initial audit report on "Future Bitcoin Cash" system of Bitcoin Cash (BCH) smart contracts, made at request of 2qx.

```
Future Bitcoin Cash Audit

2024-04-26  2qx to BCA

This is a memorandum of understanding between 2qx, ("Client") and bitcoincashautist (a.k.a. BCA, "the Auditor") for a review and written audit report of "Future Bitcoin Cash" contracts.

The Client proposes the audit will proceed in two phases. 

First, and initial assessment will be given of potential flaws or mistakes in the workflow or logic of the contract system. Second, once the Client has revised the contracts with improvements and corrections, the Auditor may prepare a written report on the security of the contracts.

The scope of the report should address near and long term security concerns, but may be limited to the on-chain operation of the permanent contracts. The report may omit any consideration of one-time use bootstrapping contracts (i.e. the Battery). The report should address post-quantum and quantum-resistant concerns of the double-sha256 script locking mechanisms on the long term viability of the system. The report should note any potential for DDoS or other network attack vectors. 

The Auditor's report must be submitted in markdown format to be hosted by the Client in the final app. 

The Auditor's fee will be conveyed in Future Bitcoin fungible tokens. The fee will be conveyed as 2 FBCH UTXOs from each of the premiere vaults of the five timescale tranches, a total of 10 FBCH. To prevent the Client from the unsavory misfortune of holding a BCH-pegged liability, the Auditor will custody the 10 BCH necessary for creation of his FBCH tokens between the completion of the audit and the completion of the app. Once the Auditor retrieves his 2 FBCH x 5 from the premiere vaults, those FBCH tokens shall be considered by all parties to be free and unencumbered from any obligations or earmarks, i.e. that Auditor has been fully paid and may degen his Futures at will.

This is a non-binding memorandum of understanding without contingency.
```

Signed: `H1ErlyrktMt2a5tRzWHfjQkbpNtOCtH/QWcKaR3bRcCkRLmQDuJ3ufDDMe2/83bclcZmyIcHeDk7v4Uku3vhZpw=`

# Overview

Future Bitcoin Cash (FBCH) fungible tokens will essentially be instances of [wrapped BCH tokens](https://wrapped.cash/) with additional clause that they can't be unwrapped until the timelock expires.

The contracts system will consist of 4 contracts: Battery, Gantry, Vault, and Coupon.

From the point-of-view of someone getting paid in FBCH, his only concern is to audit the Vault contract and its genesis transaction, because it is the Vault that holds the backing BCH and underwrites the emitted FBCH.

Coupon is a simple one-time covenant that can be used with some Vault instance in order to get a discount when minting FBCH.

Battery and Gantry contracts are constructor contracts, contracts whose purpose is to create other token categories according to specification.
The Battery will spawn a sequence of Gantries, and each Gantry will spawn a sequence of Vaults.

This will make it easier for any holder to audit FBCH genesis, as we only need to audit the contract system once, and from then on anyone interested in soundness of his FBCH can simply check that it has a Battery TXO of the correct category as ancestor, instead of having to analyze each Vault instance.

# Vault

We will start with the most important contract - one which underwrites every emitted unit of FBCH.

## Vault Summary

We find the contract to be doing what it intends to be doing:

>Vault - Store coins locked for tokens until maturation date.

Put simply, the contract can be used as follows:

- if timelock has expired then it can be used to unwrap/wrap BCH from/to token
- if timelock has not expired then it can be used only to wrap BCH to token

and we found no way to break the contract, assuming it was instantiated properly (entirety of supply given to the contract in token category genesis TX).

We have some suggestions for improvement and optimization, please see analysis below.

## Vault Contract Analysis

```
contract Vault(bytes4 locktime, bytes32 tokenCategory) {
```

There is no need to specify locktime as `bytes4`.
Natively the locktime is treated as a script number, so `int` type would be more appropriate, and use of `int(locktime)` could be avoided in the code below and save a byte (OP_BIN2NUM) in compiled bytecode.
As we will see later, the Vault bytecode is intended to be constructed by the Gantry contract, and use of fixed-size constructor parameter here could make that easier.
We're not convinced it is the best approach, because it is easy enough to generate a push sequence from a script number, especially if the number can be guaranteed to be greater than 16.

```
        bool tokensRedeemed = (
          tx.outputs[this.activeInputIndex].tokenAmount 
          - tx.inputs[this.activeInputIndex].tokenAmount
          ) > 0;
```

This is a good way to check that the user is attempting to unwrap.
Usage of `this.activeInputIndex` in this way works similar to SIGHASH_ONE.

```
        bool toVault = tx.outputs[this.activeInputIndex].lockingBytecode 
                 == new LockingBytecodeP2SH32(hash256(this.activeBytecode));
```

On its own, this code would force a wrongly instantiated thread (P2SH20) to mutate to P2SH32 on first usage, but it would also mean that the check becomes unnecessary from then on.
Note that, because of other code below, instantiating the contract as P2SH20 would break the unwrap path.

Generally, we recommend against enforcing P2SH32 by the contract's code.
Recursive covenant can be enforced more simply with:

```
        bool toVault = tx.outputs[this.activeInputIndex].lockingBytecode 
                 == tx.inputs[this.activeInputIndex].lockingBytecode;
```

This way, if properly instantiated as P2SH32 it will still remain P2SH32 for the lifetime of the contract thread.
Likewise, if wrongly instantiated as P2SH20 it will remain P2SH20.
Instead of encumbering even properly instantiated contracts with extra checks it should be responsibility of the app to instantiate the contract properly.

In any case, the `toVault` here is redundant, because code further below makes it so that, for properly instantiated contract (P2SH32), it's not possible for `toVault` to ever be false.

```
        if(toVault && tokensRedeemed){
            require(tx.time >= int(locktime));
            require(tx.outputs[this.activeInputIndex].tokenCategory == tokenCategory);
        } 
```

Good approach to enforce locktime only for the case of token redemption.
However, the token category check is redundant and can be removed, unless the intent is to have contract address be specifically usable only with the particular token category.
This check wouldn't prevent dusting the contract address with BCH or other token categories - it would just make all such UTXOs unspendable.

We recognize that hard-coding the categoryID would make it easier to use Electrum API to look up history of a particular token locked with the contract, and understand the choice due to current state of CashTokens infrastructure.

```
        require(
          tx.inputs[this.activeInputIndex].tokenCategory 
          == 
          tx.outputs[this.activeInputIndex].tokenCategory
          );

        require(
          tx.outputs[this.activeInputIndex].lockingBytecode 
          == 
          tx.inputs[this.activeInputIndex].lockingBytecode
          );

        require(
          tx.inputs[this.activeInputIndex].tokenAmount + 
          tx.inputs[this.activeInputIndex].value 
          == 
          tx.outputs[this.activeInputIndex].tokenAmount + 
          tx.outputs[this.activeInputIndex].value
         );
```

Straight-forward way to enforce unwrapping/wrapping BCH from/to token, as already seen in [wrapped.cash](https://bitcoincashresearch.org/t/wbch-bch-wrapped-as-cash-token/1196).
This code makes some of the above code redundant, as already indicated above.

## Vault Contract Design Notes

As it is, the contract can be used to wrap BCH even after timelock expiry.
We suggest to consider adding a NFT state to the Vault contract so that it can't be used for wrapping after timelock expires.

As it is, the contract will always leave 1 UTXO, even if never used.
We suggest to consider adding a clean-up spending path, so the contract can be burned at end of its lifetime, if all tokens are returned after the timelock.

## Notes on Vault Edge Cases

The creator can instantiate the category with any number of UTXOs and split fungible token supply across them.

Unless the creator has access to hashrate (which would allow him to circumvent network relay rules), each UTXO will have to be created with a dust amount of BCH.

Someone with hashrate could then wrap some BCH by interacting with 1 of the available UTXOs, and then (if timelock has expired) use the obtained wrapped BCH to deplete all other BCH UTXOs down to 0 BCH and make the threads unusable for regular users.
However, one thread is still guaranteed to remain usable, because entirety of token-backing BCH will end up with that 1 UTXO.

Similarly, after timelock expiry, anyone can spend all contract UTXOs together and move entirety of BCH (sans the dust) to just 1 UTXO, without needing to lock up any of his own BCH.
This would force wrapped token holders to use only that 1 thread until someone would wrap using one of the other threads.

Any regular user can obtain some wrapped BCH and then use it to create more UTXOs of the contract by funding them each with at least 1 token unit and dust amount of BCH.
There's no incentive to ever do this, because the user would only be losing money if he would do this.

If the category is instantiated with too low fungible token supply, then it would place a limit on how much BCH can be wrapped in total, and if multiple UTXOs exist it would allow for the possibility of reduction of number of threads.
This is trivial to prevent: at genesis, each UTXO should enough fungible tokens to be able to wrap whole BCH supply on its own.

At the limit, wrapping is multi-threaded until timelock, and unwrapping is single-threaded.
If single-threaded use is acceptable, then the contract needs no change.

If multi-threaded is desirable, then this contract code needs to be expanded, and that would come with caveats because the trade-off would be increasing contract size and with that the TX fee.

Adopting the above suggestion of prohibiting wraps after timelock expiry would somewhat improve the multi-threadedness because only previous token holders could deplete individual threads of BCH and only if they had previously obtained enough FBCH.

## Notes on Vault P2SH Collision

With hard-coded categoryID, the creator of category & contract would have enough degrees of freedom to attempt to brute-force categoryID (on creation) in order to find two redeem scripts that hash to the same P2SH20 address.
With P2SH32 that would be computationally infeasible therefore P2SH32 is recommended for the original contract code.

The original contract code is such that a P2SH20 variant unusable for users anyway, and creator would have nothing to gain from having an alternative, secret, redeem script available to him.

Users of the contract can't attempt a collision search anyway, because contract code enforces exact bytecode to be passed on.

If P2SH32 enforcement code would be removed, users should be aware of the need to verify that the contract was instantiated as P2SH32, as part of their due diligence on the app.

Users are expected to perform some due diligence on the contract in any dapp they use, anyway, so having the P2SH32 check in the contract code itself doesn't relieve them of their due diligence.

## Notes on Vault Quantum Security

The P2SH32 variant is quantum secure against quantum preimage search because it would still be a 2<sup>128</sup> problem, even for quantum computers.
It is still theoretically vulnerable to quantum collision search, as it would be a 2<sup>85</sup> problem for quantum computers.

Wihout some scientific breakthrough, a 2<sup>85</sup> problem would still be [impractical](https://crypto.stackexchange.com/questions/102574/could-grovers-algorithm-perform-a-search-in-n-2-for-a-match-in-a-particular-sub).

In any case, due to nature of the contract, collision search attempt is possible only before contract instantiation and therefore P2SH32 contracts created before availability of hypothetical quantum computers would remain safe to use even after availability of such computers.

## Notes on Vault Proper Category Initialization

The genesis transaction MUST NOT create any token UTXOs locked with any other bytecode than the Vault contract's P2SH32 address.

The genesis transaction SHOULD NOT create any NFTs.

The genesis transaction SHOULD create enough fungible token supply so that entirety of BCH supply can be wrapped.

## Vault Alternative Contract

Below we present contract code with the above suggestions implemented.

Because hardcoded categoryID is removed, this contract's bytecode pattern doesn't offer enough degrees of freedom for a P2SH20 collision search.
The locktime offers only 4 bits of freedom, and some values would make it unusable or unconvincing, further reducing practically usable degrees of freedom.

Permutations of lines of contract code (and resulting bytecode) would possibly allow a few more bits for the search, but it would be obvious to anyone that the below presented code was changed without a plausible reason.

For this reason, the below code is expected to be safe to use even as P2SH20.

```
contract Vault(int locktime, int maxSupply) {

    function TerminateOrSwap() {

        if (tx.outputs[this.activeInputIndex].lockingBytecode == 0x6a) {

            // If the vault is being terminated then
            // locktime must be expired...
            require(tx.time >= locktime);
            // ...and the exact amount of tokens already returned to
            // the Vault instance which is getting burned...
            require(tx.inputs[this.activeInputIndex].tokenAmount ==
                maxSupply);
            // ...and the remaining dust either burned or donated
            // to miners.
            require(tx.outputs.length == 1);

        } else {

            // If tokens are flowing back into this contract
            if(tx.outputs[this.activeInputIndex].tokenAmount >
                tx.inputs[this.activeInputIndex].tokenAmount
            ) {
                // enforce a BIP65 timelock 
                require(tx.time >= locktime);
            }

            // Pass on the token category & capability
            require(tx.inputs[this.activeInputIndex].tokenCategory ==
                tx.outputs[this.activeInputIndex].tokenCategory);
            // Pass on the contract
            require(tx.outputs[this.activeInputIndex].lockingBytecode == 
                tx.inputs[this.activeInputIndex].lockingBytecode);
            // Pass on bch+token balance
            require(tx.inputs[this.activeInputIndex].tokenAmount +
                tx.inputs[this.activeInputIndex].value == 
                tx.outputs[this.activeInputIndex].tokenAmount + 
                tx.outputs[this.activeInputIndex].value);
        }
    }
}
```

# Gantry

The Gantry ensures that Vault genesis transactions are properly initializing Vault token categories.
The benefit of having instances of Vault created by a Gantry is that any instance of Vault can be easily audited:

1. Look up the TX where TXID == vaultCategoryID, that is the Vault's "pre-genesis" TX.
2. Verify that the 1st output of the pre-genesis TX has the Gantry contract code.

This is proof enough that the Vault was created according to specification, because Gantry code is known, and by auditing that it properly enforces specification we can validate Vault genesis TX without actually seeing it.

This is convenient because then we don't need to use an indexer to look up the genesis TX, and so any FBCH can be audited simply by querying any node for the pre-genesis TX.

## Gantry Summary

We find the contract to be doing what it intends to be doing.

>Gantry - Create vault contracts with fungible tokens in a uniform way.

The contract is intended as a single thread recursive covenant that uses a mutable NFT's commitment to keep track of the next Vault instance's `timelock` parameter.
We found no way to break the contract, assuming it was instantiated properly (single mutable NFT created and given to the contract in token category genesis TX).

We have some suggestions for improvement and optimization, please see analysis below.

## Gantry Contract Analysis

```
require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode);
```

Using a hard-coded input & output index without additional guards is dangerous because on its own it would make it possible to spend 2 UTXOs with the same contract as both index 0 and index 1, possibly making them interact in unintended ways, or even allow a forged UTXO to be spent as index 0 and cheat the covenant.

As it is, the contract doesn't limit the number of inputs or explicitly enforce this contract to be executed as input 0, which makes it hard to reason about whether it can be broken or not.

Because the contract code commits to a hardcoded `categoryID` and requires it on both index 0 input and index 0 output, then if placed on an NFT of the same category the NFT can't escape from the covenant, assuming the category was instantiated properly (created exactly 1 mutable NFT output in genesis TX).
However, this kind of constraint leaves the contract open to some benign side-effects: the same contract can be placed on a pure BCH or another token category, in which case those UTXOs could be freely spent as inputs added to a TX spending the proper UTXO in index 0.

When UTXO has to pass its own state to a new output, it's recommended to use `[this.activeInputIndex]` index instead of `[0]`.
Both will result in same size of compiled bytecode, but the former makes the programmer's intent more obvious.

If the contract thread has to live in index 0 then we recommend explicitly requiring it:

```
require(this.activeInputIndex == 0);
```

to be sure that it is *this* UTXO that is satisfying other requirements on index 0 input, and not some other UTXO.

```
require(tx.inputs[0].tokenCategory.split(32)[0] == tokenCategory);
```

There is no need to hardcode `tokenCategory`, for same reasons as with the Vault contract.

If Gantry is correctly instantiated (genesis TX created single output of the category with mutable NFT and encumbered with the Gantry contract), then the next line:

```
require(tx.inputs[0].tokenCategory == tx.outputs[0].tokenCategory);
```

will suffice to enforce correctly passing on the token category.

```
require(tx.outputs[0].tokenAmount == 0);
```

If the Gantry category was instantiated without fungible tokens, then the above line is unnecessary.

```
int step = int(stepBytes);
int locktime = int(bytes4(tx.inputs[0].nftCommitment));
require(tx.outputs[0].nftCommitment == bytes4(locktime+step));
```

This enforces the mutable NFT to increment the stored state, but it forces the script number to be stored as `bytes4` fixed width LE integer in the NFT's commitment.
It could work the same if script number was stored directly, to avoid casting overheads.
However, benefit of storing a number as fixed width LE integer is that generic block explorers etc. are likely to parse and display the number correctly (as opposed to parsing script numbers, support for which is not widespread).
The NFT and contract code will be slightly bigger than the alternative but since there will only be 1 NFT of the category in existence this is a good trade-off.

```
        if((locktime/step)%10==0){ 
            require(tx.outputs.length == 1);
        } else {
```

Every 10th spend from this contract just increments the NFT's state without doing anything else.
The reason for this is to avoid overlap with other instances of this contract, as we will see when we get to analyzing the Battery contract.

```
            bytes theVault = 
                0x20 + tx.inputs[0].outpointTransactionHash +   // new fungible category
                0x04 + bytes4(tx.inputs[0].nftCommitment) +     // locktime
                vaultUnlockingBytecode;    
            bytes vaultLockingBytecode = 0xaa20 + hash256(theVault) + 0x87;
```

This generates the locking bytecode for the Vault instance created in this spend.

We already commented that Vault could remove the categoryID, and use native script numbers.
In that case, the above code could be reworked to:

```
            int lockTime = int(tx.inputs[0].nftCommitment)
            bytes theVault = 
                bytes(lockTime).length + bytes(lockTime) +     // push locktime
                vaultUnlockingBytecode;    
            bytes vaultLockingBytecode = 0xaa20 + hash256(theVault) + 0x87;
```

Assuming Gantry was instantiated correctly (with a 4-byte timestamp and initial commitment greater than 16), we can be sure that the generated push sequence will be correct.

```
            require(tx.outputs[1].lockingBytecode == vaultLockingBytecode);       
            require(tx.outputs[1].tokenCategory == tx.inputs[0].outpointTransactionHash);
            require(tx.outputs[1].tokenAmount == 300000000000000);     
```

The bytecode and category checks are sound, and the category is guaranteed to not have NFTs.
It would be good to require a dust BCH amount as well, else someone with access to hashrate could temporarily block normal operation by depleting the outputs of dust.

```
            bytes announcement = new LockingBytecodeNullData([
                0x46424348,
                bytes(tx.inputs[0].nftCommitment.split(4)[0])
                ]);
            require(tx.outputs[8].lockingBytecode == announcement);
```

If instantiated properly then there is no need for `.split(4)[0]` when contract code already enforces the commitment to be `bytes4`.
Because we know that proper instances will have exact 4 bytes of commitment, then we can hardcode the OP_RETURN & push opcodes:

```
bytes announcement = 0x6a044642434804 + tx.inputs[this.activeInputIndex].nftCommitment;
```

which will compile to `<0x6a044642434804> OP_ACTIVEINPUTINDEX OP_UTXOCOMMITMENT OP_CAT`.

```
            // Is this check necessary if the op_return is used?
            require(tx.outputs[8].value == 0);
```

It is recommended, and adding `require(tx.outputs[8].tokenCategory == 0x);` would be good, too.

```
            require(int(tx.outputs.length) == 9);  
```

This ensures that tokens of the new category can't "leak" outside the Vault contract.
If number of generated outputs is to be changed then this must be updated as well.
Also, the `int()` cast is redundant and can be removed.

**Contract design notes**

As it is, anyone can evolve the Gantry contract to create lots of instances Vault with timelocks far into the future.
If this is undesirable, then use of Gantry should be timelocked, too.

Similarly, if Gantry didn't issue Vaults for a while and last one created is in the past, then later it could be minting more instances of Vault with timelocks already expired, just to evolve until the instance that's actually desired.
If this is undesirable, then timeskip option could be added to the contract.

## Notes on Gantry Edge Cases

If the `step` parameter is negative, then contract could still be used to mint some proper instances of Vault, if the genesis output's NFT is initialized with some commitment that encodes a timestamp in the future.
However, the contract will become useless as soon as the last created Vault has `locktime` in the present, and later create broken instances if arrives to below 0.

If the `step` parameter is 0, then the contract will be useless because it can create unlimited instances of Vault with same locktimes.

If the commitment is bigger than 4 bytes, then the contract will be broken.

If the commitment is less than 4 bytes, the contract will work and only the genesis output will have a commitment less than 4 bytes, because first spend will enforce padding to 4 bytes.

If the `commitment` + `step` would become greater than 4 bytes, then the contract thread will halt / become unspendable.

## Notes on Gantry P2SH Collision and Quantum Security

Same comments as for Vault apply.

## Notes on Gantry Proper Category Initialization

The genesis transaction MUST create one NFT with mutable capability and locked with the Gantry contract's P2SH32 address.

The `step` parameter MUST be a positive, greater than 0 integer, and less than INT4_MAX value.

The `commitment` SHOULD be initialized as 0-padded LE 4-byte integer.

The `commitment` MUST be a small enough value to allow at least one spend from the contract.

The Gantry genesis transaction MUST NOT create multiple token UTXOs of the category.

The Gantry genesis transaction MUST NOT create fungible tokens.

## Gantry Alternative Contract

```
pragma cashscript ^0.10.0;

contract Gantry(
    int step, 
    bytes vaultUnlockingBytecode
    ) {
    function execute(){
        // Gantry covenant and the associated NFT baton must be spent as index 0
        // input and passed on to index 0 output, funded with some dust BCH in order
        // to avoid griefing by someone with access to hashrate
        require(this.activeInputIndex == 0);
        require(tx.inputs[this.activeInputIndex].lockingBytecode == tx.outputs[this.activeInputIndex].lockingBytecode);
        require(tx.inputs[this.activeInputIndex].tokenCategory == tx.outputs[this.activeInputIndex].tokenCategory);
        require(tx.outputs[this.activeInputIndex].value > 800);

        // Read a bytes4 LE commitment and convert to script number
        int locktime = int(tx.inputs[this.activeInputIndex].nftCommitment);

        // Locktime stored in mutable NFT commitment MUST be incremented by <step>
        // and stored as bytes4 LE uint again.
        require(tx.outputs[this.activeInputIndex].nftCommitment == bytes4(locktime+step));

        // Every 10th step, skip creating Vault and just increment the commitment
        if((locktime/step)%10==0){ 
            require(tx.outputs.length == 1);
        } else {
            // Construct redeem bytecode for the Vault instance being created
            bytes theVault = 
                bytes(bytes(locktime).length) + bytes4(locktime) +     // locktime
                vaultUnlockingBytecode;
            // Construct P2SH32 locking bytecode from redeem bytecode
            bytes vaultLockingBytecode = 0xaa20 + hash256(theVault) + 0x87;

            // Verify creation of exactly one Vault genesis output
            require(tx.outputs[1].lockingBytecode == vaultLockingBytecode);       
            require(tx.outputs[1].tokenCategory == tx.inputs[0].outpointTransactionHash);
            require(tx.outputs[1].tokenAmount == 2100000000000000);     
            require(tx.outputs[1].value > 800);

            // Tag this FT mint for indexers 
            //
            // 6a              OP_RETURN
            // 04 46 42 43 48  <'FBCH'>
            // 04 90 05 10 00  <locktime>
            bytes announcement = 0x6a044642434804 + tx.inputs[this.activeInputIndex].nftCommitment;
            require(tx.outputs[2].lockingBytecode == announcement);
            require(tx.outputs[2].tokenCategory == 0x);
            require(tx.outputs[2].value == 0);

            // Ensure no other outputs can be created
            require(tx.outputs.length == 3);
        }           
    }
}
```
