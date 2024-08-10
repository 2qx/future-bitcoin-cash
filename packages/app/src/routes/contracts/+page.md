---
layout: splash
---

<svelte:head>

<title>Contracts</title>

</svelte:head>

# Vault

The vault allows swapping coins for fungible tokens on a 1:1 basis until a certain block height is reached. When the `locktime` has been met, the vault allows bi-directional swapping.

Although the vault may lock coins against any fungible token, only contractually issued tokens with the full auditable supply sent to the vault should be treated as locked futures on the open market.  

```solidity
pragma cashscript ^0.10.0;

// Vault - Store coins locked for tokens until maturation date. 
//
// 2024-06-05
//
// From: Future Bitcoin Cash
//
// Author: 2qx <2qx_in_the_future@small.neomailbox.ch>
//
//     If redeeming tokens for coins in the vault: 
// [ ]   enforce the timelock is met.
//
// [ ] Assure the utxo token category matches that of the output.
// [ ] Assure the the utxo and output lock match per in the transaction.
// [ ] Assure an equal amounts of coins are exchanged for tokens
//
//
//  inputs              outputs
//  [0] contract    ->  [0] contract
//  [1] userPkh     =>  [1] userPkh
//  [2] coupon?     -^
//

contract Vault(int locktime) {

    function swap() {
        
        // If tokens are flowing back into this contract
        // OP_INPUTINDEX OP_OUTPUTTOKENAMOUNT OP_INPUTINDEX OP_UTXOTOKENAMOUNT OP_GREATERTHAN OP_IF 
        if(tx.outputs[this.activeInputIndex].tokenAmount > tx.inputs[this.activeInputIndex].tokenAmount){
        

            // Enforce a BIP65 timelock 
            // Note, intended for use with block height based locks 
            // (where:  locktime < 500M).
            // OP_0 OP_PICK OP_CHECKLOCKTIMEVERIFY OP_DROP
            require(tx.time >= locktime);


        } // OP_ENDIF 
         
        // 
        // Inspired by wrapped.cash c. Nov 2023
        // Author: Dagur Valberg Johannsson <dagurval@pvv.ntnu.no> 
        // License: MIT
        //
        // ensure the token in and out matches
        // OP_INPUTINDEX OP_UTXOTOKENCATEGORY OP_INPUTINDEX OP_OUTPUTTOKENCATEGORY OP_EQUAL OP_VERIFY 
        require(
          tx.inputs[this.activeInputIndex].tokenCategory 
          == 
          tx.outputs[this.activeInputIndex].tokenCategory
          );


        // Enforce that this contract lives on
        // OP_INPUTINDEX OP_OUTPUTBYTECODE OP_INPUTINDEX OP_UTXOBYTECODE OP_EQUAL OP_VERIFY
        require(
          tx.outputs[this.activeInputIndex].lockingBytecode 
          == 
          tx.inputs[this.activeInputIndex].lockingBytecode
          );


        // ensure the sum of sats and tokens in 
        // matches the sum of sats and tokens out.
        // OP_INPUTINDEX OP_UTXOTOKENAMOUNT OP_INPUTINDEX OP_UTXOVALUE OP_ADD
        // OP_INPUTINDEX OP_OUTPUTTOKENAMOUNT OP_INPUTINDEX OP_OUTPUTVALUE OP_ADD 
        // OP_NUMEQUAL
        // OP_NIP        
        require(
          tx.inputs[this.activeInputIndex].tokenAmount + 
          tx.inputs[this.activeInputIndex].value 
          == 
          tx.outputs[this.activeInputIndex].tokenAmount + 
          tx.outputs[this.activeInputIndex].value
         );

    }

}
```


# Coupon

A coupon holds some unspent output that can be applied when a certain amount of satoshis are being placed in a vault. The contract limits use of a coupon utxo to one per transaction.

Every vault has known correlate coupon addresses, that can be determined given the vault locking bytecode.

If (in the future) whole coins become more unattainable, it's also possible to create coupon covenants for 10M and 1M sat placements, without modifying the logic of the coupon contract, just by changing the `amount` parameter.

The coupon contract holds any normal UTXO sent to it as a applicable to a vault placement transaction. So a coupon of 1M sats is created by sending 1M sats to the coupon contract. A hundred coupons could be written by sending one hundred outputs with 1M sats each to the coupon contract. *Coupons* are just normal UTXOs that can be funded from any software that can a send output Bitcoin Cash to the contract address. The value of each coupon is simply the value of the each output.

```solidity
pragma cashscript ^0.10.0;

// Coupon - apply* utxo coupons by spending at least <amount> on <lock>
//
// 2024-06-05
//
// From: Future Bitcoin Cash
//
// Author: 2qx <2qx_in_the_future@small.neomailbox.ch>
//
// Allow anyone to use an unspent output (utxo) in a transaction ...
//
// ... given:
//
// [ ] the zeroth inflow value exceeds a predefined amount 
// [ ] the zeroth input is to a predefined address
// [ ] the coupon must be applied as the last input
//
// * Limit one per transaction.
//
// Note: This contract is designed to run as part of an integrated
// multi-contract system. It's not in itself sufficient to assure 
// an advisory doesn't claim all coupons instantly for no cost.
//
// Also note: This instance is designed where the `lock`, or destination, 
// is the first input and output. If the locks isn't spendable, or not the first
// input, coupons will no be redeemable.
//
// ... If there is no time or monetary cost to spend every coupon, 
// it should be expected that they will all be cleaned at once.
//

contract Coupon(
  // Minimum spent (sats) to claim each coupon utxo.
  int amount,
  
  // Contract holding the logic.
  bytes lock
){

  function apply() {
    
    // assure at the minium amount is sent to the intended contract
    // OP_0 OP_OUTPUTVALUE OP_0 OP_UTXOVALUE OP_SUB OP_1 OP_ROLL OP_GREATERTHANOREQUAL OP_VERIFY
    require((tx.outputs[0].value - tx.inputs[0].value) >= amount);


    // Check that the Coupon is interacting with an existing Vault instance 
    // OP_0 OP_UTXOBYTECODE OP_1 OP_ROLL OP_EQUAL OP_VERIFY
    require(tx.inputs[0].lockingBytecode == lock);

    // The coupon must be spent as the last input, 
    //   therefore only coupon may be spent at a time.
    // OP_INPUTINDEX OP_1 OP_ADD OP_TXINPUTCOUNT OP_NUMEQUAL
    require(this.activeInputIndex+1 == tx.inputs.length);
  }

}
```

# Gantry

The gantry contract sends a fixed number of tokens into utxo "threads" on each vault contract for a given blocktime.

The gantry automates issuing fungible tokens into the vault.

Gantries issue vaults at different time intervals.

|   Block Interval | 10^x  |     Spacing |
| ---------------: | :---: | ----------: |
|     1,000 blocks |   3   |     ~1 week |
|    10,000 blocks |   4   | ~2.5 months |
|   100,000 blocks |   5   |  ~23 months |
| 1,000,000 blocks |   6   |   ~19 years |

So while one gantry issues vaults every week, another gantry will issue vaults every 2.5 months. In this way, it's possible to obtain tokens for any approximate date in the future, from any of forty vaults in use at one time.

Anyone may that can construct a transaction to satisfy the requirement of the gantry `execute` function may step the gantry forward and commission tokens into a new vault.

The below version has eight (8) threads, each thread has enough tokens to satisfy locking the entire coin supply.

```solidity
pragma cashscript ^0.10.0;

// Gantry - Create vault contracts with fungible tokens in a uniform way. 
//
// 2024-06-05
//
// From: Future Bitcoin Cash
//
// Author: 2qx <2qx_in_the_future@small.neomailbox.ch>
//
// NFT commentment stores the next series locktime in 32-bit LE
//
// [ ] Require the minting baton in the input
// [ ] Get the current step increment for the chain of futures
// [ ] Get the current vault locktime to be printed.
//
//   either
// [ ] Mint an array of FT utxos, 
// [ ] send them off to a Vault
//
//   or
// [ ] skip every 10th print.
//
// [ ] increment locktime height value stored on NFT baton
// [ ] assure NFT baton is returned
//
//
//  Gantry i/o Flow:
//
//  Inputs              Outputs
//  [0] NFT mintBaton   ->  [0] NFT mintBaton
//  [1] topup sats?     =>  [1] FTs Vault
//                      =>  [2] FTs Vault
//                      =>  [3] FTs Vault
//                      =>  [4] FTs Vault
//                      =>  [5] FTs Vault
//                      =>  [6] FTs Vault
//                      =>  [7] FTs Vault
//                          [8] OP_RETURN FBCH <locktime> 08
//  
//  ... but skip every 10th token print, 
//   which will be printed by the gantry of the next order.
//  [0] NFT mintBaton   =>  [0] NFT mintBaton
//


contract Gantry(
    int step, 
    bytes vaultUnlockingBytecode
    ) {

    function execute() {

        // Gantry covenant and the associated NFT baton must be spent as index 0
        // input and passed on to index 0 output, funded with some dust BCH in order
        // to avoid griefing by someone with access to hashrate
        require(this.activeInputIndex == 0);
        require(tx.inputs[this.activeInputIndex].lockingBytecode ==
            tx.outputs[this.activeInputIndex].lockingBytecode);
        require(tx.inputs[this.activeInputIndex].tokenCategory ==
            tx.outputs[this.activeInputIndex].tokenCategory);
        require(tx.outputs[this.activeInputIndex].value > 800);

        int locktime = int(tx.inputs[this.activeInputIndex].nftCommitment);

        // Locktime stored in mutable NFT commitment MUST be incremented by <step>
        // and stored as bytes4 LE uint again.
        require(tx.outputs[this.activeInputIndex].nftCommitment ==
            bytes4(locktime + step));

        // Every 10th step, skip creating Vault and just increment the commitment
        if((locktime / step) % 10 == 0) { 
            require(tx.outputs.length == 1);
        } else {
            // Construct redeem bytecode for the Vault instance being created
            bytes theVault = 
                bytes(bytes(locktime).length) + bytes(locktime) + // int locktime
                vaultUnlockingBytecode;
            // Construct P2SH32 locking bytecode from redeem bytecode
            bytes vaultLockingBytecode = 0xaa20 + hash256(theVault) + 0x87;

            // Verify creation of Vault genesis outputs
            require(tx.outputs[1].lockingBytecode == vaultLockingBytecode);
            require(tx.outputs[1].tokenCategory == tx.inputs[0].outpointTransactionHash);
            require(tx.outputs[1].nftCommitment == 0x);
            require(tx.outputs[1].tokenAmount == 2100000000000000);
            require(tx.outputs[1].value == 1000);

            require(tx.outputs[2].lockingBytecode == vaultLockingBytecode);       
            require(tx.outputs[2].tokenCategory == tx.inputs[0].outpointTransactionHash);
            require(tx.outputs[2].nftCommitment == 0x);
            require(tx.outputs[2].tokenAmount == tx.outputs[1].tokenAmount);     
            require(tx.outputs[2].value == 1000);

            require(tx.outputs[3].lockingBytecode == vaultLockingBytecode);       
            require(tx.outputs[3].tokenCategory == tx.inputs[0].outpointTransactionHash);
            require(tx.outputs[3].nftCommitment == 0x);
            require(tx.outputs[3].tokenAmount == tx.outputs[1].tokenAmount);     
            require(tx.outputs[3].value == 1000);

            require(tx.outputs[4].lockingBytecode == vaultLockingBytecode);       
            require(tx.outputs[4].tokenCategory == tx.inputs[0].outpointTransactionHash);
            require(tx.outputs[4].nftCommitment == 0x);
            require(tx.outputs[4].tokenAmount == tx.outputs[1].tokenAmount);     
            require(tx.outputs[4].value == 1000);

            require(tx.outputs[5].lockingBytecode == vaultLockingBytecode);       
            require(tx.outputs[5].tokenCategory == tx.inputs[0].outpointTransactionHash);
            require(tx.outputs[5].nftCommitment == 0x);
            require(tx.outputs[5].tokenAmount == tx.outputs[1].tokenAmount);     
            require(tx.outputs[5].value == 1000);

            require(tx.outputs[6].lockingBytecode == vaultLockingBytecode);       
            require(tx.outputs[6].tokenCategory == tx.inputs[0].outpointTransactionHash);
            require(tx.outputs[6].nftCommitment == 0x);
            require(tx.outputs[6].tokenAmount == tx.outputs[1].tokenAmount);     
            require(tx.outputs[6].value == 1000);

            require(tx.outputs[7].lockingBytecode == vaultLockingBytecode);       
            require(tx.outputs[7].tokenCategory == tx.inputs[0].outpointTransactionHash);
            require(tx.outputs[7].nftCommitment == 0x);
            require(tx.outputs[7].tokenAmount == tx.outputs[1].tokenAmount);     
            require(tx.outputs[7].value == 1000);

            require(tx.outputs[8].lockingBytecode == vaultLockingBytecode);       
            require(tx.outputs[8].tokenCategory == tx.inputs[0].outpointTransactionHash);
            require(tx.outputs[8].nftCommitment == 0x);
            require(tx.outputs[8].tokenAmount == tx.outputs[1].tokenAmount);     
            require(tx.outputs[8].value == 1000);

            // Tag FT metadata for indexers 
            //
            // 6a              OP_RETURN
            // 04 46 42 43 48  FBCH
            // 03 90 05 10     <locktime>
            bytes announcement =  0x6a0446424348 +
                                  bytes(bytes(locktime).length) +  bytes(locktime);
            require(tx.outputs[9].lockingBytecode == announcement);
            require(tx.outputs[9].tokenCategory == 0x);
            require(tx.outputs[9].value == 0);

            // Ensure no other outputs can be created
            require(tx.outputs.length == 10);  

        }     
        
    }
}
```

# Battery

The battery deploys a fixed number of gantries, similar to the way gantries deploy vaults. It then burns the minting baton used to create the gantries minting batons.

```solidity
pragma cashscript ^0.10.0;

// Battery - Spawn an array of vault deploying gantries from a single utxo.
//
// 2024-06-05
//
// From: Future Bitcoin Cash
//
// Author: 2qx <2qx_in_the_future@small.neomailbox.ch>
//
// A Battery releases a series of Gantries at small powers of 10 that 
// go on to create Futures Vaults on those respective intervals.
//
// Given a minting NFT with the commitment containing a power of 10, 
// mint a sequence of NFTs with minting capability
// sending mutable batons NFTs to the corresponding Gantry.
//
//  execute():
//
//  inputs                           outputs
//  [0] Battery + NFT 0x40420F00 10ᴇ6 ->  [0] Battery    + NFT  0xA0860100
//                                    =>  [1] Gantry10ᴇ6 + NFT* <startTime>
//
//  [0] Battery + NFT 0xA0860100 10ᴇ5 ->  [0] Battery    + NFT  0x10270000
//                                    =>  [1] Gantry10ᴇ5 + NFT* <startTime>
//
//  ... 0x10270000 10ᴇ4 ... 0xE8030000 10ᴇ3 ... 0x64000000 10ᴇ2
//
//  [0] Battery + NFT 0x<end>        ->  [0]  Burn NFT, sats are unencumbered.
//                                       [1]  Gantry10ᴇ2 + NFT* <startTime>
//
// 

contract Battery(

    // Correct contract initialization will have minting NFT's commitment
    // set to <step> from the NFT commitment, which will be the step set for 1st minted gantry,
    // and will then get decremented for the next one until end step is reached.

    // The end is the smallest power of 10 to create a Gantry for.
    int endStep,

    // Base time from which to calculate each Gantry's starting point, e.g.:
    // --| baseTime
    //   |------------------------------------| gantry 0 start
    //   |------------| gantry 1 start
    //   |----| gantry 2 start
    int baseTime,

    // Redeem bytecode tail of the gantry contracts
    bytes gantryReedemBytecodeTail,

    // Redeem bytecode tail of the vault contracts
    bytes vaultReedemBytecodeTail,

) {

    function execute() {

        // Get the current step, we will mint a Gantry for this step
        bytes stepBytes = tx.inputs[this.activeInputIndex].nftCommitment;
        int step = int(stepBytes);

        // Set the gantry's starting time at correct offset from baseTime
        bytes4 gantryStart = bytes4(baseTime - (baseTime % step) + step);
        require(tx.outputs[1].nftCommitment == gantryStart);

        // Construct the full redeem bytecode for the Gantry instance
        bytes gantryRedeemBytecode =
            bytes(vaultReedemBytecodeTail.length) + vaultReedemBytecodeTail +
            bytes(bytes(step).length)             + bytes(step)   + 
            gantryReedemBytecodeTail;

        require(
            // The second output must have the P2SH32 of the gantry redeem bytecode
            0xaa20 + hash256(gantryRedeemBytecode) + 0x87
            == tx.outputs[1].lockingBytecode
        );

        // Ensure that Gantry inherits a mutable NFT so that it may update the
        // commitment as it mints its Vaults.
        bytes gantryCategory =
            tx.inputs[this.activeInputIndex].tokenCategory.split(32)[0] +
            0x01;
        require(tx.outputs[1].tokenCategory == gantryCategory);

        // Exactly 2 outputs, so token state or BCH can't leak out.
        require(tx.outputs.length == 2);

        // Enforce exact dust amount on the Gantry so that remainder must go
        // back into Battery or pure BCH change at index 0.
        require(tx.outputs[1].value == 800);

        // Fee allowance = 1000
        require(tx.outputs[0].value >
            tx.inputs[this.activeInputIndex].value -
            1800);

        if(step > endStep) {
            // Calculate and enforce next baton's step,
            require(tx.outputs[0].nftCommitment == bytes4(step / 10));
            // token category & capability (pass on minting NFT),
            require(tx.outputs[0].tokenCategory ==
                tx.inputs[this.activeInputIndex].tokenCategory);
            // and contract code.
            require(tx.outputs[0].lockingBytecode ==
                tx.inputs[this.activeInputIndex].lockingBytecode);
        } else {
            // Burn the minting baton while allowing any remaining BCH
            // to be extracted to output 0.
            require(tx.outputs[0].tokenCategory == 0x);

            // Note: output 1 still mints a Gantry in this same TX,
            // and it will be the last one to get minted.
        }
    }
}
```