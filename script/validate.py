from bitcash.network import NetworkAPI
from bitcash import utils
import sys

BATON = 'fbc0b001313509454331f23f4b1891a8d9a284421efcc33187f1a1cdd37ccb46'

GANTRY_SET = set([
    "bitcoincash:pw4au340uajkakz7j2afhetzs6aw20mhxgfn83mlk0depc5yghspqqqckly70",
    "bitcoincash:pw9chw4eqgllfj2w8wj935snchmznn6d9a6s4qf78p2l4zug7ausqxsg2dxve",
    "bitcoincash:pdk0tnv5fjnu730d8gc82620af0h4kfdqqghsnyfvguqf9jnuszljj3fnpfhq",
    "bitcoincash:pd8p4pnfya0skhqaa2slz6x7g2dgm3fljxkvfzwmeqvj884ung24w2mx7x8yd"
])

def validate_future_series(category_id, get_series=False):
    
    transaction = NetworkAPI.get_transaction(category_id)
    print(transaction)
    v0 = transaction.outputs[0]
    
    # assure the first output of the pre-genesis transaction
    # was sent to a valid gantry
    if not (v0.address in GANTRY_SET):
        return False
    
    # assure the token 
    if (v0.category_id != BATON):
        return False

    # Return the series number from the commitment
    if(get_series):
        seriesHex = utils.bytes_to_hex(v0.nft_commitment)
        seriesHex = utils.flip_hex_byte_order(seriesHex)
        return utils.hex_to_int(seriesHex)
    else:
        return True
    
def main():
    category_id = sys.argv[1]
    valid = validate_future_series(sys.argv[1], True)
    if valid > 850000:
        print(category_id + " valid. FBCH-" + str(valid).zfill(7))
    elif valid:
        print(category_id + " valid")
    else:
        print(category_id + " FAILED VALIDATION")

if __name__ == "__main__":
    main()


