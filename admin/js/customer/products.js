function listAllProduct() {
    fetch(urlProd).then(res => res.json())
        .then(listSP => {
            var i = 1;
            listSP.forEach(sp => {
                list = document.querySelector('#list');
                var x = '';
                x += '<tr>';
                x += '<td>' + sp.id + '</td>';
                x += '<td>' + sp.name + ' </td>';
                x += '<td> <img src="'+ urlImage+sp.image + '" </td>';

                fetch(urlCate).then(data => data.json())
                    .then(category => {
                        category.forEach(element => {
                            if (element.id == sp.cate_id) {
                                x += '<td >' + element.name + '</td>';
                            }
                        });
                    }).then(data2 => {
                        x += "<td   >" + sp.detail.replace(/(.{60})..+/,"$1…") + "</td>";
                        x += "<td>" + numberFormat(sp.price) + " </td>";
                        x += '<td> <a  href="product-edit.html?id=' + sp.id + '"> <button class="btn btn-primary btn-rounded"><i class="mdi mdi-border-color"></i></button> </a>    <a  href="#" onclick="deleteProdById(' + sp.id + ')">     <button class="btn btn-danger btn-rounded"><i class="mdi mdi-delete-forever"></i></button></a> </td>'
                        x += '</tr>';
                        list.innerHTML += x;
                    }
                    )
            });
    })
}
// xoá sản phẩm
function deleteProdById(id) {
    const XacNhanXoa = confirm("Bạn có muốn xoá sản phẩm này? ");
    if (XacNhanXoa == false) { return };
    url = `http://localhost:3000/product/${id}`;
    fetch(url, { method: "delete" }).then(res => res.json())
      .then(data => {
        alert("Xoá Sản Phẩm Thành Công");
        document.location = "products.html";
      })
  }


// thêm sản phẩm
function addProd() {
   
  let getImage = document.querySelector("#image").value.trim();

    if(getImage.search(/https:/) == -1){
      getImage = "./img/"+getImage;
    }
    sp = {
      name: document.querySelector("#name").value.trim(),
      price: document.querySelector("#price").value.trim(),
      image: getImage,
      detail: document.querySelector("#detail").value.trim(),
      cate_id: parseInt(document.querySelector("#cate_id").value.trim())
    }
    options = {
      method: "POST",
      body: JSON.stringify(sp),
      headers: { "Content-Type": 'application/json' }
    }
    fetch(urlProd, options).then(res => res.json()).then(d => {
      alert("Thêm Sản Phẩm Thành Công");
    //   console.log("data= ", +d)
      document.location="products.html";
    })
  }

//   lấy và hiển thị sản phẩm theo id 
function getOneProdById(id) {
    url = `http://localhost:3000/product/${id}`;
    fetch(url).then(res => res.json()).then(data => {
      document.querySelector("#name").value = data.name;
      console.log(document.querySelector("#cate"));
      fetch(urlCate).then(data => data.json())
        .then(category => {
          let mainMenu = document.querySelector('#cate_id')
          category.forEach(element => {
            var op = '';
            if (element.id == data.cate_id) {
              op = `<option selected value="${element.id}">${element.name}</option>`;
            } else {
              op = `<option value="${element.id}">${element.name}</option>`;
            }

            mainMenu.innerHTML += op;
          });

        })
      // end danh mục
      document.querySelector("#price").value = data.price;
      document.querySelector("#image").value = data.image;
      document.querySelector('#hinhAnh').innerHTML += `<img src="${urlImage}${data.image}">`;
      document.querySelector("#detail").value = data.detail;

    });
  }

//   update one sản phẩm theo id
function updateProdById(idProd) {
    url = `http://localhost:3000/product/${idProd}`;
    let getImage = document.querySelector("#image").value.trim();
    getImage = "./img/"+getImage;
    sp = {
      name: document.querySelector("#name").value.trim(),
      price: document.querySelector("#price").value.trim(),
      image: getImage,
      detail: document.querySelector("#detail").value.trim(),
      cate_id: parseInt(document.querySelector("#cate_id").value.trim())
    }
    options = {
      method: "PUT",
      body: JSON.stringify(sp),
      headers: { "Content-Type": 'application/json' }
    }
    fetch(url, options).then(res => res.json()).then(d => {
      alert("Cập Nhập Sản Phẩm Thành Công");
      document.location = "products.html";
    })
  }