
function listAllCategory() {

    fetch(urlCate).then(data => data.json())
        .then(category => {
            let list = document.querySelector('#list')
            category.forEach(element => {
                var tr = `  <tr>
                          <td>${element.id}</td>
                          <td>${element.name}</td>
                          <td>
                            <a href="category-edit.html?id=${element.id}"><button class="btn btn-primary btn-rounded"><i class="mdi mdi-border-color"></i></button></a>
                            <a href="" onclick="deleteCate(${element.id})"> <button class="btn btn-danger btn-rounded"><i class="mdi mdi-delete-forever"></i></button></a>
                          </td>
                        </tr>`;
                list.innerHTML += tr;
            });
        })
}

// xoá sản phẩm
function deleteCate(id) {
    const XacNhan = confirm("Bạn có chắc muốn xoá danh mục");
    if (XacNhan == false) { return };

    url = `http://localhost:3000/categories/${id}`;
    fetch(url, { method: "delete" }).then(res => res.json())
        .then(data => {
            alert("Xoá Danh Mục Thành Công ");
            document.location = "categories.html";
        })
}

// thêm sản phẩm
function addCate() {
    event.preventDefault();
    data = {
        name: document.querySelector("#name").value.trim(),
    }
    options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": 'application/json' }
    }
    fetch(urlCate, options).then(res => res.json()).then(d => {
        alert("Thêm Danh Mục Mới Thành Công");
        document.location = "categories.html";
    })
}

//   load 1 danh mục theo id danh mục

function loadOneCateById(id) {
    url = `http://localhost:3000/categories/${id}`;
    fetch(url).then(res => res.json()).then(data => {
        document.querySelector('#name').value = data.name;
    });
}


// Cập nhập 1 loại sản phẩm
function updateCateById(idCate) {
    console.log(idCate)
    event.preventDefault();
    urlUpdate = `http://localhost:3000/categories/${idCate}`;
    sp = {
        name: document.querySelector("#name").value.trim()
    }
    options = {
        method: "PUT",
        body: JSON.stringify(sp),
        headers: { "Content-Type": 'application/json' }
    }
    fetch(urlUpdate, options).then(res => res.json()).then(d => {
        alert("Cập Nhập Danh Mục Thành Công");
        document.location = "categories.html";
    })
} 


// hiển thị danh sách danh mục
function getCategoryInProd (){
    fetch(urlCate).then(data => data.json())
      .then(category => {
        let mainMenu = document.querySelector('#cate_id')
        category.forEach(element => {
          var op= `   <option value="${element.id}">${element.name}</option>`;
          mainMenu.innerHTML += op;
  
        });
  
      })
}