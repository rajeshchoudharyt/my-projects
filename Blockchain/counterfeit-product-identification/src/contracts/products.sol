// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

contract Products {

    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier isOwner() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }
    

    struct Product {
        string code;
        string mfdId;
        string date;
        string details;
        string[][] status;
    }    

    Product[] products;
    mapping (string => uint) productCount;

    event AddProductEvent(string message);
    event ProductStatusEvent(string message);


    // Add Product
    function validateProduct(string memory _code) public isOwner
    view returns (string memory) {

        for (uint i=0; i<products.length; i++) 
            if ( keccak256(abi.encodePacked(products[i].code)) == 
                    keccak256(abi.encodePacked(_code)) )
                return ("Product already exist");
        
        return "Valid product";
    }

    function addProduct(
        string memory _code, 
        string memory _mfdId, 
        string memory _date,
        string memory _details 
    ) public isOwner {

        string memory message = validateProduct(_code);
        if (keccak256(abi.encodePacked(message)) != keccak256(abi.encodePacked("Valid product")))
            return; 
        
        string[][] memory emptyArray;
        Product memory newProduct = Product(_code, _mfdId, _date, _details, emptyArray);
        products.push(newProduct);
        productCount[_mfdId] = productCount[_mfdId] + 1;

        emit AddProductEvent("Successful");
    }


    // Update Product Status
    function updateProductStatus(
        string memory _code,
        string memory _status,
        string memory _sellerId,
        string memory _date
    ) public isOwner {

        for (uint i=0; i<products.length; i++)
            if (keccak256(abi.encodePacked(products[i].code)) == 
                    keccak256(abi.encodePacked(_code))) {

                products[i].status.push([_status, _sellerId, _date]);
                emit ProductStatusEvent("Successful");
                return;
            }
        
        emit ProductStatusEvent("Product does not exist");
    }


    // Retrieve Product
    function getProduct(string memory _code) public isOwner 
    view returns (string[] memory, string[][] memory) {

        for (uint i=0; i<products.length; i++) 
            if (keccak256(abi.encodePacked(products[i].code)) == 
                    keccak256(abi.encodePacked(_code))) {

                string[] memory product = new string[](4);
                product[0] = products[i].code;
                product[1] = products[i].mfdId;
                product[2] = products[i].date;
                product[3] = products[i].details;
                
                return (product, products[i].status);
            }
        
        string[] memory empty;
        string[][] memory emptyStatus;
        return (empty, emptyStatus);
    }


    // Retrieve All Products By Manufacturer
    function getAllProduct(string memory _mfdId) public isOwner 
    view returns (string[][] memory, string[][][] memory) {

        uint count = productCount[_mfdId];
        string[][] memory allProduct = new string[][](count);
        string[][][] memory allProductStatus = new string[][][](count);

        if (count == 0) return (allProduct, allProductStatus);

        uint j = 0;
        for (uint i=0; i<products.length; i++)
            if ( keccak256(abi.encodePacked(products[i].mfdId)) ==
                    keccak256(abi.encodePacked(_mfdId)) ) {

                string[] memory product = new string[](4);
                product[0] = products[i].code;
                product[1] = products[i].mfdId; 
                product[2] = products[i].date; 
                product[3] = products[i].details;

                allProduct[j] = product;
                allProductStatus[j] = products[i].status;
                j = j + 1;
            }

        return (allProduct, allProductStatus);
    }

}