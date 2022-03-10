function showCart() {
    var cart = JSON.parse(localStorage.getItem("cart"));
    document.querySelector("#tblcart").innerHTML ='';
    if (cart) cart.forEach((sp, index) => {
        document.querySelector("#tblcart").innerHTML += `
    <tr>
        <td class="shoping__cart__item">
            <img class="img_cart" src="${sp.image}" alt="${sp.name}">
            <h5>${sp.name}</h5>
        </td>
        <td class="shoping__cart__price">
           <span class=" giaHienThi"> ${numberFormat(sp.price)}</span>đ
           <span hidden class="giaGoc"> ${sp.price}</span>
        </td>
        <td class="shoping__cart__quantity">
            <div class="quantity">
                <div class="pro-qty">
                    <input type="text" min=0 value=" ${sp.quantity}" onkeyup=tinhtien(${sp.price},this.value,${index},${sp.id}) >
                </div>
            </div>
        </td>
        <td class="shoping__cart__total ">
            <span class="tienHienThi">  ${   numberFormat(sp.price * sp.quantity)}</span>
            <span hidden class="tien">  ${   sp.price * sp.quantity}</span>
          đ
        </td>
        <td class="shoping__cart__item__close">
            <span id="deleteProduct" onclick="deleteProdByCart(${sp.id})" class="icon_close"></span>
        </td>
    </tr>
    `;
    });
}
//  tính tổng tiền
function tinhtien(gia, soluong, i, id) {
    tien = gia * soluong;
    document.getElementsByClassName('tien')[i].innerHTML = tien;
    document.getElementsByClassName('tienHienThi')[i].innerHTML =  numberFormat(tien);

    var cart = JSON.parse(localStorage.getItem("cart"));
    new Promise(function (resolve, reject) {
        cart.forEach((element, index) => {
            if (element.id == id) {
              element.quantity = soluong;
            }
            return resolve(cart)
        });
    }).then(data => {
        localStorage.setItem("cart", JSON.stringify(cart));

        tinhtongtien();
    })



}


function tinhtongtien() {
    arrTien = document.getElementsByClassName('tien');
    tongTien = 0;
    for (let t of arrTien) {
        tongTien += parseInt(t.innerHTML);
    }
    document.querySelector('#thanhTien').innerHTML = numberFormat(tongTien)+'đ';
}
//  xoá cart khỏi giỏ hành theo id sản phẩm
function deleteProdByCart(id) {
    var cart = JSON.parse(localStorage.getItem("cart"));
    new Promise(function (resolve, reject) {
        cart.forEach((element, index) => {
            if (element.id == id) {
                cart.splice(index, 1)
            }
            return resolve(cart)
        });
    }).then(data => {
        localStorage.setItem("cart", JSON.stringify(cart));
        showCart();
        tinhtongtien();
        alert("Xoá Sản Phẩm Thành Công")
    })

}
