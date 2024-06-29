// "Coupon" contract constructor parameters
// locking bytecode of contract coupon applies to
<lock> // bytes25
// Minimum spent (sats) to claim each coupon utxo.
<amount> // int

// assure at the minium amount is sent to the intended contract
OP_0 OP_OUTPUTVALUE OP_0 OP_UTXOVALUE OP_SUB OP_1 OP_ROLL OP_GREATERTHANOREQUAL OP_VERIFY

// Check that the Coupon is interacting with an existing Vault instance
OP_0 OP_UTXOBYTECODE OP_1 OP_ROLL OP_EQUAL OP_VERIFY

// The coupon must be spent as the last input,
//   therefore only coupon may be spent at a time.
OP_INPUTINDEX OP_1 OP_ADD OP_TXINPUTCOUNT OP_NUMEQUAL