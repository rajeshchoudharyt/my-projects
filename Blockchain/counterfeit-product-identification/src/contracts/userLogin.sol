// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

contract UserLogin {

    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier isOwner() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }
    

    struct Manufacturer {
        string name;
        bytes32 username;
        string password;
        string mfdId;
        string date;
    }

    struct Seller {
        string name;
        bytes32 username;
        string password;
        string mfdId;
        string sellerId;
        string date;
    }

    struct Customer { 
        string name;
        bytes32 username;
        string password;
    }

    Manufacturer[] manufacturers;
    Seller[] sellers;
    Customer[] customers;

    mapping (string => uint) sellerCount;
    event AddUserEvent(string message);
    

    // Manufacturer
    function authenticateManufacturer(bytes32 _username)
    public isOwner view returns (string memory) {

        for (uint i=0; i<manufacturers.length; i++)
            if (manufacturers[i].username == _username) return manufacturers[i].password;
        
        return "Invalid username";
    }
    
    // Adding New Manufacturer
    function validateManufacturer(string memory _mfdId, bytes32 _username) 
    public isOwner view returns (string memory) {
        
        for (uint i=0; i<manufacturers.length; i++) {
            if (keccak256(abi.encodePacked(manufacturers[i].mfdId)) == 
                    keccak256(abi.encodePacked(_mfdId))) 
                return "ID already exist";
                
            if (manufacturers[i].username == _username)
                return "Username already exist";
        }
        return "Valid user";
    }
    
    function addManufacturer(
        string memory _name,
        bytes32 _username,
        string memory _password,
        string memory _mfdId,
        string memory _date
    ) public isOwner {

        string memory message = validateManufacturer(_mfdId, _username);
        if (keccak256(abi.encodePacked(message)) != keccak256(abi.encodePacked("Valid user")))
            return;

        Manufacturer memory newManufacturer = 
            Manufacturer(_name, _username, _password, _mfdId, _date);
        manufacturers.push(newManufacturer);

        emit AddUserEvent("Successful");
    }
    

    // Seller
    function authenticateSeller(bytes32 _username)
    public isOwner view returns (string memory) {

        for (uint i=0; i<sellers.length; i++) 
            if (sellers[i].username == _username) return sellers[i].password;
        
        return "Invalid username";
    }
    
    // Adding New seller
    function validateSeller(string memory _sellerId, bytes32 _username)
    public isOwner view returns (string memory) {
            
        for (uint i=0; i<sellers.length; i++) {
            if (keccak256(abi.encodePacked(sellers[i].sellerId)) == 
                    keccak256(abi.encodePacked(_sellerId)))
                return "ID already exist";

            if (sellers[i].username == _username)
                return "Username already exist";
        }
        return "Valid user";
    }
    
    function addSeller(
        string memory _name,
        bytes32 _username,
        string memory _password,
        string memory _mfdId,
        string memory _sellerId,
        string memory _date
    ) public isOwner {

        string memory message = validateSeller(_sellerId, _username);
        if (keccak256(abi.encodePacked(message)) != keccak256(abi.encodePacked("Valid user")))
            return;

        Seller memory newSeller = 
            Seller(_name, _username, _password, _mfdId, _sellerId, _date);
        sellers.push(newSeller);
        sellerCount[_mfdId] = sellerCount[_mfdId] + 1;

        emit AddUserEvent("Successful");
    }


    // Customer
    function authenticateCustomer(bytes32 _username)
    public isOwner view returns (string memory) {

        for (uint i=0; i<customers.length; i++)
            if (customers[i].username == _username) return customers[i].password;

        return "Invalid username";
    }
    
    // Adding New Customer
    function validateCustomer(bytes32 _username) public isOwner 
    view returns (string memory) {

        for (uint i=0; i<customers.length; i++)
            if (customers[i].username == _username) return "Username already exist";

        return "Valid user";
    }
    
    function addCustomer(
        string memory _name,
        bytes32 _username,
        string memory _password
    ) public isOwner {

        string memory message = validateCustomer(_username);
        if (keccak256(abi.encodePacked(message)) != keccak256(abi.encodePacked("Valid user")))
            return;  

        Customer memory newCustomer = Customer(_name, _username, _password);
        customers.push(newCustomer);

        emit AddUserEvent("Successful");
    }


    // Retrieve Manufacturer
    function getManufacturer(bytes32 _username)
    public isOwner view returns (string[] memory) {

        for (uint i=0; i<manufacturers.length; i++)
            if (manufacturers[i].username == _username) {
                string[] memory manufacturer = new string[](3);
                manufacturer[0] = manufacturers[i].name;
                manufacturer[1] = manufacturers[i].mfdId;
                manufacturer[2] = manufacturers[i].date;
                return manufacturer;
            }
        
        string[] memory emptyArray;
        return emptyArray;
    }

    // Retrieve Seller
    function getSeller(bytes32 _username)
    public isOwner view returns (string[] memory) {

        for (uint i=0; i<sellers.length; i++)
            if (sellers[i].username == _username) {
                string[] memory seller = new string[](4);
                seller[0] = sellers[i].name;
                seller[1] = sellers[i].mfdId;
                seller[2] = sellers[i].sellerId;
                seller[3] = sellers[i].date;
                return seller;
            }
        
        string[] memory emptyArray;
        return emptyArray;
    }

    // Retrieve All Seller By Manufacturer
    function getAllSeller(string memory _mfdId)
    public isOwner view returns (string[][] memory) {
        
        uint count = sellerCount[_mfdId];
        string[][] memory allSeller = new string[][](count);
        
        uint j = 0;
        for (uint i=0; i<sellers.length; i++)
            if (keccak256(abi.encodePacked(sellers[i].mfdId)) == 
                    keccak256(abi.encodePacked(_mfdId))) {
                
                string[] memory seller = new string[](4);
                seller[0] = sellers[i].name;
                seller[1] = sellers[i].sellerId;
                seller[2] = sellers[i].mfdId;
                seller[3] = sellers[i].date;
                
                allSeller[j] = seller;
                j = j + 1;
            }
        
        return allSeller;
    }
}