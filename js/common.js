const urlCate='http://localhost:3000/categories';
const urlProd='http://localhost:3000/product';


// list danh mục
function getCategory() {
    // lấy danh sách category
    fetch(urlCate).then(data => data.json())
        .then(category => {
            let mainMenu = document.querySelector('#mainMenu')
            category.forEach(element => {
                var li = `<li><a href="shop-grid.html?id=${element.id}">${element.name} </a> </li>`;
                mainMenu.innerHTML += li;

            });

        })
}




function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function numberFormat(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}



function addToCart(id, name, price, image) {
    alert("ĐÃ Thêm Vào Giỏ Hàng: " + name);
    let cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart)
    if (cart == null) {
        cart = [];
        cart.push({ "id": id, "name": name, "price": price, "image": image, "quantity": 1 });

    } else {
        let item = cart.find(item => item.id === id);
        if (item) {
            item.quantity++;
        } else {
            cart.push({ "id": id, "name": name, "price": price, "image": image, "quantity": 1 });
        }
    }
    // console.log('Cart Them=' + cart);
    localStorage.setItem("cart", JSON.stringify(cart));
}

