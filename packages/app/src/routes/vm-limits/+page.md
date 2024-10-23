---
layout: splash
---

<svelte:head>

<title>FBCH supports CHIP-2021-05 VM Limits</title>
<meta
			property="og:title"
			content="FBCH supports CHIP-2021-05 VM Limits"
		/>
<meta name="description" content="Future Bitcoin Cash supports CHIP-2021-05 VM Limits (Targeted Virtual Machine Limits) for the May 2025 BCH Upgrade." />
</svelte:head>

## Future Bitcoin Cash supports CHIP-2021-05 VM Limits (Targeted Virtual Machine Limits) for the May 2025 BCH Upgrade.

The implementation of Future Bitcoin Cash (FBCH) in the summer of 2024 hit *both* the 520-byte stack element size limit AND the 201 operation limit. Here's why the design for FBCH went up to the limits, and why those limits should be raised in May 2025 for BCH defi designers going forward. 


While building a system of time-locked fungible tokens for Bitcoin Cash, both the 520-byte limit and the 201 operation limit were encountered. These limits affected the design of a contract that funds each Vault with tokens, and in turn, an initial contract that spawned a set of four minting contracts. 

Given the work [Jason and others](https://bitcoincashresearch.org/t/chip-2021-05-targeted-virtual-machine-limits/437) have done to show the 520-byte limit and the 201 operation limits can be safely removed without impacting node performance, retargeting the limits based on a operation cost should make building BCH defi systems easier going forward.

**Future Bitcoin Cash supports [CHIP-2021-05 VM Limits (Targeted Virtual Machine Limits)](https://github.com/bitjson/bch-vm-limits/#) for the May 2025 BCH Upgrade.**

## What is FBCH? 

Future Bitcoin Cash (FBCH) isn't a CashToken. Which is to say, FBCH is neither an NFT nor single fungible token series. Rather, it's a regularly minted series of fungible tokens using contract controlled NFTs as a minting authority. So, for example, there's *FBCH-0869000* for tokens maturing some Wednesday in 2024, and *FBCH-1000000* for FBCH tokens maturing in at the millionth BCH block sometime in 2027. 

But there is no FBCH base token. It's a defi system, or an idea, or a CashToken markets.

There are about a hundred FBCH series that exist today. In total, there may be about five thousand series over the next century, but they weren't all printed at once because that would have basically doubled the number of CashToken categories in existence.

## Who owns, mints, controls, or authoritatively issues more FBCH series?

Anyone and/or everyone can issue new FBCH series. Nothing is permissioned or controlled by a central authority. It's controlled on-chain with BitcoinScript contracts.

- All FBCH series are minted from one of four anyone-can-spend contacts.
- Each Vault must be funded with the entire supply of an FBCH series.
- Anyone can spend the NFT proving each FBCH series is real, as long as they are minting a new series correctly and the nft baton is sent back to the issuing contract.
- Anyone can easily verify new FBCH tokens by examining the transaction matching the token id. 

For legal and compliance reasons, the logic to have Future Bitcoin Cash tokens exists, and has always existed. It has now also been funded with sufficient sats for fees and dust allowances, but no party or entity is offering specific tokens for an initial offering. Rather, anyone can issue new fungible tokens. Once issued, anyone may swap their BCH for FBCH with a Vault contract directly without a commission or third party. This on-chain infrastructure is part of the Bitcoin Cash commons now, and we all own it.

## How does an anyone-can-spend system work? 

DeFi systems like unspent.app, cauldron.quest, wrapped.cash and now futurebitcoin.cash are using a feature of bitcoin that has existed since 2009 to craft transactions without requiring a cryptographically signed message. Recent upgrades to the BitcoinScrip operations in the Bitcoin Cash VM (introspection upgrades, transaction self-referencing operations) greatly expanded the logic available in the scripting system, so these types of contracts became much more useful. However, the idea of an anyone-can-spend transactions have been possible since 2009.

Rather than enforce transactions as signed by a particular public key, the contracts are using other logic, mostly related to properties on inputs and outputs. 

However, because spending of the coins is not restricted to a specific party, there are some trade offs with these types of transactions in terms of security and finality on the network. Two parties may attempt to spend the same coin at the same time. And if a miner wanted to, they might alter an anyone-can-spend transaction to their benefit, within limits.

## A problem with anyone can spend systems.

One of the drawbacks these "anyone-can" designs have is that any party may attempt to reuse, or race, an anyone-can-spend defi output that was just used by a "legitimate" user. 

It's not difficult to imagine a griefer, or bad faith actor, participating in a bitcoin space that doesn't want to gain anything from using bitcoin themselves, but rather their intent is to stop others from using it and diminishing the use of peer-to-peer currency in general. 

For example, someone could listen to the Bitcoin Cash network for any Wrapped Bitcoin Cash (WBCH) vault transactions, then try to modify and broadcast a competing transaction to make any use of the WBCH vault contract unreliable for others. Conflicting double spends are obviously bad for a payment network, and Bitcoin Cash full nodes use the "first seen" rule to reject transactions using conflicting coins as inputs. In practice, each conflicting "griefer" transaction, if successful, could block the vault for a few seconds, while the user's transaction is propagating across the network. But the user could retry again after seeing the competing output and try rebuilding their transaction continuing on from the griefer's input.

Transactions are currently 1 sat/byte, and transactions are usually a few hundred bytes. So to block one thread of these type of defi contracts for a few seconds will cost a spoiler several hundred sats per second, in addition to their overhead of running a special suite of nodes and network connections to race the users' transactions on the network. 

So part of the design of these defi systems should take into consideration these potential griefing or bad-faith actors.

[There's a much longer post about "Anti-Griefing Strategies for Anyone Can Spend DeFi Contracts on Bitcoin Cash
" here](https://www.reddit.com/r/btc/comments/1e02p56/antigriefing_strategies_for_anyone_can_spend_defi/)

## Mitigating double spend denial-of-service attacks with threading

The simple approach taken with Future Bitcoin Cash was to create multiple threads for each vault to both multiply the cost of a denial of service attack, as well as increase the throughput of the system at scale and reduce the chances of a double-spend under "normal" use. 

There is a contract in the FBCH system (called a ["Gantry"](/contracts#gantry)) and it places new tokens in each new FBCH weekly "Vault". So this contract has to enforce that the correct number of threads is created each week, and that each thread meets certain requirements about token supply and properties. 

There are five requirements enforced for each vault thread. Without the ability to program with loops, these constraints are enforced with very duplicated verbose code that is essentially identical for each thread. 

Checking a the first three Vault threads looks like this:

```
    ...

    OP_1 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY 
    OP_1 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY 
    OP_1 OP_OUTPUTTOKENCOMMITMENT OP_0 OP_EQUALVERIFY 
    OP_1 OP_OUTPUTTOKENAMOUNT 0040075af07507 OP_NUMEQUALVERIFY 
    OP_1 OP_OUTPUTVALUE e803 OP_NUMEQUALVERIFY

    OP_2 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY 
    OP_2 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY 
    OP_2 OP_OUTPUTTOKENCOMMITMENT OP_0 OP_EQUALVERIFY 
    OP_2 OP_OUTPUTTOKENAMOUNT 0040075af07507 OP_NUMEQUALVERIFY 
    OP_2 OP_OUTPUTVALUE e803 OP_NUMEQUALVERIFY 

    OP_3 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY 
    OP_3 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY 
    OP_3 OP_OUTPUTTOKENCOMMITMENT OP_0 OP_EQUALVERIFY 
    OP_3 OP_OUTPUTTOKENAMOUNT 0040075af07507 OP_NUMEQUALVERIFY 
    OP_3 OP_OUTPUTVALUE e803 OP_NUMEQUALVERIFY
    
    ...
    
    OP_7 OP_OUTPUTBYTECODE ...
    
    ...
```

To check a single vault thread is minted with the correct amount of tokens takes 18 operations, and to check all seven threads is about 126 operations. 

After checking for the minting baton, fees, printing some metadata in an op_return and checking the total number of inputs and outputs, there wasn't enough room under the 201 operation limit to check eight vault threads, only seven. So FBCH vaults have seven threads, because of the 201 operation code limit.

Generally, academics would say, if the tooling is allowed to influence a design, this can be seen as a bad or flawed design. Thankfully, the design of FBCH aims to be pragmatic, not purist―so seven threads is probably fine.

## Pushing the max bytes to the stack

Bitcoin Script pay-to-script contracts are "locked" with a hash of the logic (or code) to unlock them. 

So it's possible to have contracts interact with one another or reference each other by passing the unlocking code for one contract to another. The lock (or addresses) for a type of contract can then be calculated generally using the source code from within the BitcoinScript VM system. 

Since the logic of each FBCH Vault contract is identical, and only the locktime changes every week, it's possible to write a contract to fund vaults at regular intervals by passing the source code for the generic Vault contract as an argument.

The FBCH vault contract is only about 35-bytes, so it's well within the 520-byte stack element size limit, right? Yes. 

But with futures and options markets, it's typical to have contracts available far in the the future at more staggered intervals. So there may be futures settling every week for the next few weeks, but after that they're only every couple months or every quarter. 

This staggered and concentrated market feature is important to crafting liquid markets, so long-dated instruments are more sparsely issued in time. So in addition to a single gantry contract printing weekly tokens, FBCH has a gantry contracts printing series every 10 weeks, and every 100 weeks, and every 1000 weeks (~20 years). There are four of these identical Vault token printing Gantry contracts operating at different magnitude time scales. 

These contracts were also funded with an anyone-can-spend transaction, from a single higher contract that also enforced the creation and distribution of four mutable NFT-batons. 

To create an array of Gantry contracts at different time scales, both the 366-byte unlocking code of the Gantry contracts, the 35-byte code for the Vaults and a few other parameters were pushed to the stack of the "Battery" contract. In checking the NFT minting baton, the stack depth hit the 520-byte stack limit around the eight thread vault range again. 

So even if the 201 operation limit were raised alone, some of the constraints for a contract controlled NFT system would have bumped up against a different limit if more than seven threads were being checked without bounded loops.

A Bitcoin Cash CHIP for loop operations (or "bounded loops") may be on the horizon for 2026. Loops could certainly shrink the size of contracts enforcing lots of threads. 

But in the present, in 2024, if you wanted to fund contracts to fund contracts to fund contracts, Future Bitcoin Cash expanded design right up to the current limits. Hopefully, but in the future, such limits can be removed.

Or course, FBCH is a case where a very simple contract is being funded by a more elaborate contract that expanded to fill the space available. But it's not difficult to imagine a more complex base contract where the logic easily hits the 520-byte stack or 201 operation limits.