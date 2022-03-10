// load tất cả sản phẩm
function loadAllProduct() {
    fetch(urlProd).then(data => data.json())
        .then(product => {
            var listProduct = document.querySelector('#listProduct');
            product.forEach(sp => {
                let col = `<div class="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">
                <div class="featured__item">
                    <div class="featured__item__pic set-bg" data-setbg="${sp.image}" style="background-image: url(&quot;${sp.image}&quot;);">
                        <ul class="featured__item__pic__hover">
                            <li><a href="#"><i class="fa fa-heart"></i></a></li>
                            <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                            <li><a href="#" onclick="addToCart(${sp.id},'${sp.name}','${sp.price}','${sp.image}')"><i class="fa fa-shopping-cart"></i></a></li>
                        </ul>
                    </div>
                    <div class="featured__item__text">
                        <h6><a href="shop-details.html?id=${sp.id}">${sp.name}</a></h6>
                        <h5>${numberFormat(sp.price)}đ</h5>
                    </div>
                </div>
            </div>`;
                listProduct.innerHTML += col;
            })
        })
}

// load sản phẩm theo danh mục ở trang index
function loadProdByCate(cateId, element) {
    var str = '';
    // var url1 = `http://localhost:3000/product`;
    fetch(urlProd).then(res => res.json()).then(data => {
        new Promise(function (resolve, reject) {
            data.forEach(element => {
                if (element.cate_id == cateId) {
                    str += ` 
                            <a href="shop-details.html?id=${element.id}" class="latest-product__item">
                                <div class="latest-product__item__pic">
                                    <img src="${element.image}" alt="">
                                </div>
                                <div class="latest-product__item__text">
                                    <h6>${element.name}</h6>
                                    <span>${numberFormat(element.price)}đ</span>
                                </div>
                            </a>`;
                }
            });
            return resolve(str)
        }).then(function (data) {
            element.innerHTML += str;
        })
    })
}

//Lấy sản phẩm theo id sản phẩm
function getOneProdById(id) {
    url = `http://localhost:3000/product/${id}`;
    fetch(url).then(res => res.json()).then(data => {
        document.querySelector("#name").innerHTML = data.name;

        new Promise(function (resolve, reject) {
            document.querySelector("#price").innerHTML = numberFormat(data.price);
            //   document.querySelector("#image").innerHTML = data.image;
            document.querySelector('#hinhAnh').innerHTML += `<img src="${data.image}">`;
            document.querySelector("#detail").innerHTML = data.detail;
            document.querySelector("#info").innerHTML = data.detail;
            document.querySelector('#addCart').onclick = function () {
                addToCart(data.id, data.name, data.price, data.image);
            }
            cate_id = data.cate_id;
            return resolve(cate_id);
        })

    }).then(data2 => {
        console.log(cate_id);
        listProd = document.querySelector("#sanPhamLienQuan");
        urlListProduct = 'http://localhost:3000/product';
        fetch(urlListProduct).then(data => data.json())
            .then(products => {

                products.forEach(element => {
                    var op = '';
                    if (element.cate_id == cate_id) {
                        op = `
                    <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="product__item">
                        <div class="product__item__pic set-bg" style="background-image: url(' ${element.image}'); background-size:cover">
                            <ul class="product__item__pic__hover">
                                <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                                <li><a href="#" onclick="addToCart(${element.id},'${element.name}','${element.price}','${element.image}')"><i class="fa fa-shopping-cart"></i></a></li>
                            </ul>
                        </div>
                        <div class="product__item__text">
                            <h6><a href="shop-details.html?id=${element.id}">${element.name}</a></h6>
                            <h5>${numberFormat(element.price)}đ</h5>
                        </div>
                    </div>
                    </div> `;
                    }
                    listProd.innerHTML += op;
                });

            })
        // end danh mục
    });
}

// load sản phẩm theo key word tìm kiếm
function loadSearchProduct(keywords,elementHtml) {
    var urlSearch = urlProd + "?name_like=" + keywords;
    fetch(urlSearch).then(res => res.json()).then(data => {
        var str = '';
        console.log(document.querySelector("#danhSachSanPham"));
        data.forEach(element => {
            str = `
                <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="product__item">
                            <div class="product__item__pic data-setbg" style="background-image: url('${element.image}'); background-size:cover;" >
                                <ul class="product__item__pic__hover">
                                    <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                    <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                                    <li><a href="#" onclick="addToCart(${element.id},'${element.name}','${element.price}','${element.image}')"><i class="fa fa-shopping-cart"></i></a></li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6><a href="shop-details.html?id=${element.id}">${element.name}y</a></h6>
                                <h5>${numberFormat(element.price)}đ</h5>
                    
                            </div>
                        </div>
                </div>
                    `;
            elementHtml.innerHTML += str;
        })
    })
}



// load danh sách sản phẩm theo danh mục sản phẩm 
function listProdByCateId(id, elementHtml) {
    // id sản phẩm được lấy từ url bằng new URLSearchParams(location.search)
    fetch(urlProd).then(res => res.json()).then(data => {
        var str = '';
        data.forEach(element => {
            if (element.cate_id == id) {
                str = `
                <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="product__item">
                            <div class="product__item__pic data-setbg" style="background-image: url('${element.image}'); background-size:cover;" >
                                <ul class="product__item__pic__hover">
                                    <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                    <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                                    <li><a href="#" onclick="addToCart(${element.id},'${element.name}','${element.price}','${element.image}')"><i class="fa fa-shopping-cart"></i></a></li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6><a href="shop-details.html?id=${element.id}">${element.name}y</a></h6>
                                <h5>${numberWithCommas(element.price)}đ</h5>
                    
                            </div>
                        </div>
                </div>`;
                elementHtml.innerHTML += str;
            }
        })
    })
}