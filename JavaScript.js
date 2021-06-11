var cartpool = new Array();

function Cart(id) {
    this.products = new Array();
    this.id = id;
    cartpool[id] = this;
    this.fillcart();
    this.Totalprice = getTotalprice(this);
}
Cart.prototype.fillcart = function() {
    var p1 = new product("Dairy Milk", "$8", 1, 1, this.id);
    var p2 = new product("Headsets", "$5", 2, 2, this.id);
    var p3 = new product("Hand Sanitizer", "$7", 3, 3, this.id)
    this.products.push(p1);
    this.products.push(p2);
    this.products.push(p3);
   
}
function getTotalprice(c) {
    var sum = 0;
    for (var j = 0; j < c.products.length; j++) {
        var lol = c.products[j].total;
        var b = lol.substring(1);
        var o = 1 * b;
        sum += o;
    }
    return sum;
}
Cart.prototype.render = function (divId) {


    var html = "<div id=\"" + "cc" + this.id + "\"><div class='row'><div class='col'><div class='mycart'><i class='fa fa-shopping-cart'></i> &nbspMy cart <i class='fa fa-times'  style='float:right; color:grey'></i> </div> </div> </div>";
    
    for (var j = 0; j < this.products.length; j++) {
        //alert(this.products[j].rowid);
        console.log(this.products[j].name);
        var r = "row" + this.products[j].rowid;
        var c = this.products[j].rowid + "n" + this.id;
        //alert(r);
        //<img src="images/i1.png">
		var image_id = j + 1;
        html += "<div class=\"" + r + "\" id=\"" + this.products[j].rowid + "b" + this.id + "\"><div class='col'> <div class='cart' style='border-top: 1px solid grey;'><div class='col-1'> <img src=\"" + "images/m" + image_id +".jpg" + "\"></div> <div id='d1' style='padding-top:1%'><span class='col-2' >" + this.products[j].name + "</span> <span class='col-3' >" + this.products[j].unitprice + "</span><input id=\"" + c + "\" name=\"" + c + "\" class='col-4' style ='height: 0px;padding-left: 1.5%;' onkeydown='updateprice(event)'><span class='col-5' > " + this.products[j].total + "</span><button href='#' id= \"" + "cross" + this.products[j].rowid + "\"  class='cross' style='background-color:red; display: inline; margin-top: 2.2%; float:right; cursor:pointer;' onclick='remove(\"" + this.products[j].rowid + "," + this.id + "\")'> <i class='fa fa-times' aria-hidden='true' style='color:white;background-color:red;'></i></button></div></div></div></div></div>";
    }

    var subtotal = "$" + this.Totalprice;
    html += "<div class='row'><div class='col'><div class='cart' style='height: 30px; padding-top:0px;padding-bottom:18px'><div id=\"" + "total" + this.id + "\" style='font-weight: bold;'> <span class='col-7'> </span> <span class='col-8'> Total: </span><span class='col-9'>" + subtotal + "</span> </div></div></div></div><div class='row'><div class='col'><button class='button button1' style='background-color:whitesmoke;color: black; margin-left:37%;'>Close</button><button class='button button2' style='margin-left:1%;'>Checkout</button></div></div></div>"
    document.getElementById(divId).innerHTML = html;
    for (var j = 0; j < this.products.length; j++) {
        var c = this.products[j].rowid + "n" + this.id;
        document.getElementById(c).value = this.products[j].quantity;
    }
}

function computesubtotal() {
    var subtotal = 0;
    for (var j = 0; j < cart.length; j++) {
        var b = cart[j].total.substring(1);
        var c = 1 * b;
        //alert(cart[j].name);
        subtotal = subtotal + c;
    }
    Totalprice = subtotal;
    renderTotal("total");
}
function product(name, unitprice, i, row, cartID) {
    this.name = name;
    this.unitprice = unitprice;
    this.quantity = 1;
    this.total = unitprice;
    this.i = i;
    this.rowid = row;
    this.cartID = cartID;
}


function updateprice(event) {

    if (event.which == 13 || event.keyCode == 13) {
        var x = event.currentTarget.getAttribute('id');
        //alert(x);
        var pval = x.charAt(0);
        var cval = x.charAt(x.length - 1);
        var ugh = 0;
        for (var j = 0; j < cartpool[cval].products.length; j++) {
            if (cartpool[cval].products[j].rowid == pval)
                ugh = j;
        }
        var w = document.getElementById(x).value;
        //alert(cartpool[cval].products[ugh].name);
        if (Number.isInteger(+w) == true) {
            cartpool[cval].products[ugh].updateproductprice(w, cval, ugh);
        }
        else {
            alert("Please enter correct quantity");
        }
    }
}

product.prototype.updateproductprice = function (q, cartindex, pindex) {

    var id = this.rowid;
    this.quantity = q;
    var temp = this.unitprice;
    temp = temp.substring(1);
    var t = q * temp;
    var str = this.total;
    str = str.substring(1);
    cartpool[cartindex].Totalprice -= str;
    cartpool[cartindex].Totalprice += t;
    cartpool[cartindex].products[pindex].total = "$" + t;
    //this.render("d" + id);
    cartpool[cartindex].render("c" + cartpool[cartindex].id);
}
function remove(ids) {
    // alert(ids);
    var cid = ids.charAt(ids.length - 1);
    var pid = ids.charAt(0);
    var val = 0;
    for (var l = 0; l < cartpool[cid].products.length; l++) {
        if (cartpool[cid].products[l].rowid == pid)
            val = l;
    }
   
    var f = cartpool[cid].products[val].rowid + "b" + cartpool[cid].id;
    document.getElementById(f).remove();

    var r = cartpool[cid].products.splice(val, 1);
    var minus = r[0].total;
    minus = minus.substring(1);
    cartpool[cid].Totalprice -= minus;
    var subtotal = "$" + cartpool[cid].Totalprice;
    var divid = "total" + cid;
    cartpool[cid].render("c" + cid);
    for (var j = 0; j < cartpool[cid].products.length; j++) {
        if (j >= val) {
            catpool[cid].products[j].i--;
        }
    }
}
