function datHang() {
    ho = document.querySelector("#ho").value.trim();
    ten = document.querySelector("#ten").value.trim();
    diachi = document.querySelector("#diaChi").value.trim();
    phone = document.querySelector("#phone").value.trim();
    email = document.querySelector("#email").value.trim();
    diachi = document.querySelector("#diaChi").value.trim();
    ghichu = document.querySelector("#note").value.trim();

    if (ho == "" && ten == "") {
        alert("Chưa nhập họ tên");
        return;
    }
    if (diachi == "") {
        alert("Chưa nhập địa chỉ");
        return;
    }
    if (phone == "") {
        alert("Chưa nhập số điện thoại");
        return;
    }
    if (email == "") {
        alert("Chưa nhập địa chỉ Email");
        return;
    }
    // event.preventdefault()
    var donhang = {
        "customer_name": ho + " " + ten,
        "customer_address": diachi,
        "customer_email": email,
        "customer_phone_number": phone,
        "created_date": new Date().toISOString().slice(0, 10),
        "status": "Chờ xác nhận"
    }
    url = "http://localhost:3000/orders";

    options = {
        method: "post",
        body: JSON.stringify(donhang),
        headers: { "Content-Type": 'application/json' }
    }
    fetch(url, options).then(res => res.json()).then(data => {
        order_id = data.id;
        new Promise(function (resolve, reject) {
            return resolve(LuuChiTietDonHang(data.id));
        })
    }).then(data2 => {
        alert("Đặt Hàng Thành Công. Đơn hàng chờ xác nhận.");
        cart =[];
        localStorage.setItem("cart", JSON.stringify(cart));
    })

}
//  lưu chi tiết đơn hàng
function LuuChiTietDonHang(order_id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.forEach(sp => {
        let objSP = {
            "order_id": order_id,
            "product_id": sp.id,
            "quantity": sp.quantity,
            "unit_price": sp.price
        }
        url = "http://localhost:3000/order_details";
        options = {
            method: "POST",
            body: JSON.stringify(objSP),
            headers: { "Content-Type": 'application/json' }
        }
        fetch(url, options).then(res => res.json()).then(d => { })
    });
}