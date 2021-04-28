const { assert } = require('chai');

const Token = artifacts.require('./Token.sol');
require('chai')
  .use(require('chai-as-promised'))
  .should();

contract('Token', (accounts) => {
  let contract;

  before(async () => {
    contract = await Token.deployed();
  });
  describe('it gets deployed', async () => {
    it('gets address', async () => {
      const Address = await contract.getAddress();
      assert.equal(Address, accounts[0]);
    })
  })
  describe('it mints', async () => {
    it('mints', async () => {
      await contract.mint(1000,
        50,
        "Milan-Skriniar",
        "Szx-Skriniar",
        114353,
        "e3124917393e37f2f3fdebb56d311965",
        "e3124917393e37f2f3fdebb56d311965");
        const supply = await contract.getTotalSupply();
        assert.equal(1,supply);
        const status = await contract.getTokenStatus("e3124917393e37f2f3fdebb56d311965");
        assert.equal(status , true);
        const _name = await contract.getTokenName("e3124917393e37f2f3fdebb56d311965");
        assert.equal("Milan-Skriniar",_name);
        const _symbol = await contract.getTokenSymbol("e3124917393e37f2f3fdebb56d311965");
        assert.equal("Szx-Skriniar",_symbol);
        const _price = await contract.getTokenPrice("e3124917393e37f2f3fdebb56d311965");
        assert.equal(_price, 1000);
        const _number = await contract.getNumberOfTokens("e3124917393e37f2f3fdebb56d311965");
        assert.equal(_number,50);
        const _deed = await contract.getTokenDeed("e3124917393e37f2f3fdebb56d311965");
        assert.equal(_deed,114353);
        const _owner = await contract.getTokenOwner("e3124917393e37f2f3fdebb56d311965");
        assert.equal(accounts[0],_owner);
    })
  })


});
