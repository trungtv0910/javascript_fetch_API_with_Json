// danh sách đơn hàng
function listOrder() {
    fetch(urlOrder).then(data => data.json())
      .then(order => {
        let list = document.querySelector('#list')
        order.forEach(element => {
          var tr = `  <tr>
                          <td>${element.id}</td>
                          <td>${element.customer_name}</td>
                          <td>${element.customer_address}</td>
                          <td>
                            ${element.customer_email}<br> ${element.customer_phone_number}
                          </td>
                       
                          <td><button class="btn btn-primary">${element.status}</button></td>
                          <td>${element.created_date}</td>
                          <td>
                            <a href="order-detail.html?id=${element.id}">  <button class="btn btn-primary btn-rounded"><i class="mdi mdi-border-color"></i></button></a>
                          
                           
                          </td>
                        </tr>`;
          list.innerHTML += tr;

        });
      })
  }

// lấy ra danh sánh sản phẩm của đơn hàng
function getProdBillById(id) {
    let Tong = 0;
    fetch(urlOrderDetail).then(res => res.json()).then(data => {
      data.forEach(element => {
        if (element.order_id === id) {
          var x = '';
          urlProdInOrder = urlProd + `/${element.product_id}`;
          fetch(urlProdInOrder).then(resSp => resSp.json()).then(dataProd => {
            x += '<tr>';
            x += '<td> <img src="'+urlImage + dataProd.image + '"></td>';
            x += '<td>' + dataProd.name + '</td>';
            x += '<td>' + element.quantity + '</td>';
            Tong += element.unit_price * element.quantity;
            x += '<td>' + numberFormat(element.unit_price * element.quantity) + 'đ' + '</td>';
            x += '</tr>';
          }).then(data2 => {
            document.querySelector('#list').innerHTML += x;
            document.querySelector("#thanhTien").innerHTML = numberFormat(Tong) + 'đ';
          })
        }
      });
    })
  }

//   cập nhập trạng thái đơn hàng
function trangThaiDon(status) {
    var url = `http://localhost:3000/orders/${id}`;
    order = {};
    fetch(url).then(res => res.json()).then(data => {
      order = {
        created_date: data.created_date,
        customer_address: data.customer_address,
        customer_email: data.customer_email,
        customer_name: data.customer_name,
        customer_phone_number: data.customer_phone_number,
        id: data.id,
        status: status

      }
    }).then(data2 => {

      options = {
        method: "PUT",
        body: JSON.stringify(order),
        headers: { "Content-Type": 'application/json' }
      }
      fetch(url, options).then(res => res.json()).then(d => {
        document.location = "orders.html";
        alert("Cập Nhập Thành Công Trạng Thái Đơn Hàng");
      })
    })
  }