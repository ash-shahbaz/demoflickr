// Gallery Constructor and get all data from cache

function store() {
    // get from cache
    this.products = $.parseJSON(localStorage["myData"]);
 
}

//get single product
store.prototype.getProduct = function (uniCode) {
    for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].uniCode == uniCode)
            return this.products[i];
    }
    return null;
}
