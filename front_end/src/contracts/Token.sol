pragma solidity >=0.4.21;

contract Token {
    uint256 totalSupply;
    mapping(string => bool) hashExist;
    mapping(string => bool) tokenExist;
    mapping(string => bool) symbolExist;
    mapping(string => string) tokenSymbol;
    mapping(string => string) tokenName;
    mapping(string => uint256) tokenPrice;
    mapping(string => uint256) tokenNumbers;
    mapping(string => bool) tokenStatus;
    mapping(string => uint256) tokenDeed;
    mapping(string => address) owners;
    mapping(uint256 => string) tokenID;
    mapping (string => string) deedHash;
    mapping (uint256=> bool) deedExist;
    mapping(string=>bool) deedHashExist;
    mapping (address => mapping (string =>uint256)) onSalePrice;
    mapping (address => mapping(string =>uint256)) onSale;
    mapping(address => mapping(string => uint256)) accountInfo;
    function getAccountTokens(address _address , string memory _hash) public view returns (uint256){
        return accountInfo[_address][_hash];
    }
    function putOnSale(address _address , string memory _hash, uint256 _ammount ,uint256 _price)   public{
          require(accountInfo[_address][_hash]>=_ammount);
           onSale[_address][_hash]+=_ammount;
           onSalePrice[_address][_hash]=_price;
           accountInfo[_address][_hash]-=_ammount;
    }
    function getOnSalePrice (address _address , string memory _hash)public view returns(uint256){
        return onSalePrice[_address][_hash];
    }
    function buyOnBid (address _address , string memory _hash , uint256 amount) public {
            require(onSale[_address][_hash]>=amount);
            onSale[_address][_hash]-=amount;
            accountInfo[msg.sender][_hash]+=amount;
    }
    function getSellStatus(address _address , string memory _hash) public view returns (uint256){
        return onSale[_address][_hash];
    } 
    function getDeedHash(string memory _hash) public view returns(string memory){
        return deedHash[_hash];
    }
    
    function getAddress() public view returns (address) {
        return msg.sender;
    }

    function getTotalSupply() public view returns (uint256) {
        return totalSupply;
    }

    function getNumberOfTokens(string memory _hash)
        public
        view
        returns (uint256)
    {
        return tokenNumbers[_hash];
    }

    function getTokenPrice(string memory _hash) public view returns (uint256) {
        return tokenPrice[_hash];
    }

    function getTokenName(string memory _hash)
        public
        view
        returns (string memory)
    {
        return tokenName[_hash];
    }

    function getTokenSymbol(string memory _hash)
        public
        view
        returns (string memory)
    {
        return tokenSymbol[_hash];
    }

    function getTokenOwner(string memory _hash) public view returns (address) {
        address ans= owners[_hash];
        return ans;
    }

    function getTokenStatus(string memory _hash) public view returns (bool) {
        return tokenStatus[_hash];
    }

    function getTokenDeed(string memory _hash) public view returns (uint256) {
        return tokenDeed[_hash];
    }

    function getBalance(address _address) public view returns (uint256) {
        return _address.balance;
    }

    function mint(
        uint256 _tokenPrice,
        uint256 _totalToken,
        string memory _name,
        string memory _symbol,
        uint256 deed,
        string memory _hash,
        string memory _deedHash
    ) public {
        require(!hashExist[_hash]);
        require(!tokenExist[_name]);
        require(!symbolExist[_symbol]);
        require(!deedExist[deed]);
        require(!deedHashExist[_deedHash]);
        totalSupply += 1;
        tokenID[totalSupply] = _hash;
        tokenName[_hash] = _name;
        tokenSymbol[_hash] = _symbol;
        tokenPrice[_hash] = _tokenPrice;
        tokenNumbers[_hash] = _totalToken;
        deedHash[_hash]=_deedHash;
        tokenStatus[_hash]=true;
        owners[_hash] = msg.sender;
        tokenDeed[_hash] = deed;
        deedExist[deed]=true;
        deedHashExist[_deedHash]=true;
        hashExist[_hash] = true;
        tokenExist[_name] = true;
        symbolExist[_symbol] = true;
    }

    function changeOwner(string memory _hash, address _to ) public {
        require(msg.sender == owners[_hash]);
        owners[_hash] = _to;
    }

    function buyToken(string memory _hash, uint256 _number) public {
        require(hashExist[_hash]);
        require(_number <= tokenNumbers[_hash]);
        address _address = msg.sender;
        uint256 tokenNow = accountInfo[_address][_hash];
        tokenNow += _number;
        accountInfo[_address][_hash] = tokenNow;
        tokenNumbers[_hash] -= _number;
    }

    function saleTokens(string memory _hash, uint256 ammount) public {
        require(hashExist[_hash]);
        require(accountInfo[msg.sender][_hash] >= ammount);
        accountInfo[msg.sender][_hash] -= ammount;
        tokenNumbers[_hash] += ammount;
    }

    function showAccountTokens(address _address, uint256 _id)
        public
        view
        returns (uint256)
    {
        string memory _hash = tokenID[_id];
        uint256 buyerTokenNumber = accountInfo[_address][_hash];
        return buyerTokenNumber;
    }
    function getTokenHashID(uint256 _id)public view returns(string memory){
        return tokenID[_id];
    }
}
