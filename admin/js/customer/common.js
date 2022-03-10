const urlCate = "http://localhost:3000/categories";
const urlProd ="http://localhost:3000/product";
const urlOrder = "http://localhost:3000/orders";
const urlOrderDetail ="http://localhost:3000/order_details";
const urlImage =".";

function numberFormat(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
