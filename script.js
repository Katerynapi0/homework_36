'use strict';

const productsData = {
    electronics: [
        {name: "Холодильник", description: "SAMSUNG"},
        {name: "Пральна машина", description: "Bosch"}
    ],

    clothing: [
        {name: "Джинси", description: "Next"},
        {name: "Футболка", description: "GAP"}
    ],

    books: [
        {name: "Наукова-фантастика", description: "Дюна"},
        {name: "Дитяча книга", description: "Гаррі Поттер і смертельні реліквії"}
    ]
};

function showProduct(category){
    const productList = document.getElementById("productList");
    productList.innerHTML = '';

    let productHTML = '';
    productsData[category].forEach(product => {
        productHTML += `<li><a href="#" class="productLink" data-name="${product.name}" data-description="${product.description}">${product.name}</a></li>`;
    });

    productList.innerHTML = productHTML;
    
    const productLinks = document.querySelectorAll('.productLink');
    productLinks.forEach(link => {
        link.addEventListener('click', function(){
            showProductInfo(this.dataset.name, this.dataset.description)
        });
    });
}

function showProductInfo(name, description){
    document.getElementById("productName").innerHTML = name;
    document.getElementById("productDescription").innerHTML = description;
}

function showOrderForm(){
    document.getElementById("orderForm").style.display = "block";
}

function submitOrder(){
    const fullName = document.getElementById("fullName").value;
    const city = document.getElementById("city").value;
    const delivery = document.getElementById("delivery").value;
    const payMethod = document.getElementById("payMethod").value;
    const count = document.getElementById("count").value;
    const comment = document.getElementById("comment").value;
    const productName = document.getElementById("productName").innerText; 
    const productDescription = document.getElementById("productDescription").innerText; 

    if(fullName && city && delivery && payMethod && count && comment && productName && productDescription){
        const orderDetails = {
            fullName: fullName,
            city: city,
            delivery: delivery,
            payMethod: payMethod,
            count: count,
            comment: comment,
            productName: productName, 
            productDescription: productDescription, 
            date: new Date().toLocaleString()
        };

        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(orderDetails);
        localStorage.setItem("orders", JSON.stringify(orders));

        const orderInfo = `
            <p><strong>Ім'я:</strong> ${orderDetails.fullName}</p>
            <p><strong>Місто:</strong> ${orderDetails.city}</p>
            <p><strong>Склад Нової пошти:</strong> ${orderDetails.delivery}</p>
            <p><strong>Метод оплати:</strong> ${orderDetails.payMethod}</p>
            <p><strong>Кількість товару:</strong> ${orderDetails.count} шт.</p>
            <p><strong>Продукт:</strong> ${orderDetails.productName}</p> 
            <p><strong>Опис продукту:</strong> ${orderDetails.productDescription}</p> 
            <p><strong>Коментар:</strong> ${orderDetails.comment}</p>
            <p><strong>Дата замовлення:</strong> ${orderDetails.date}</p>
        `;

        document.getElementById("orderDetails").innerHTML = orderInfo;
        document.getElementById("confirmOrder").style.display = "block";
        document.getElementById("orderForm").style.display = "none";
    } else {
        alert("Будь ласка, заповніть всі обов'язкові поля!");
    }
}

function showMyOrders() {
    document.getElementById("productList").style.display = "none";

    const myOrdersDiv = document.getElementById("myOrders");
    myOrdersDiv.style.display = "block";

    const orderList = document.getElementById("orderList");
    orderList.innerHTML = "";

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.forEach((order, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <p><strong>Замовлення ${index + 1}</strong></p>
            <p><strong>Продукт:</strong> ${order.productName}</p>
            <p><strong>Опис продукту:</strong> ${order.productDescription}</p>
            <p><strong>Кількість товару:</strong> ${order.count} шт.</p>
            <p><strong>Ім'я покупця:</strong> ${order.fullName}</p>
            <p><strong>Місто:</strong> ${order.city}</p>
            <p><strong>Склад Нової пошти:</strong> ${order.delivery}</p>
            <p><strong>Метод оплати:</strong> ${order.payMethod}</p>
            <p><strong>Коментар:</strong> ${order.comment}</p>
            <p><strong>Дата замовлення:</strong> ${order.date}</p>
            <button onclick="showOrderDetails(${index})">Деталі</button>
            <button onclick="removeOrder(${index})">Видалити</button>
        `;
        orderList.appendChild(listItem);
    });
}

function showOrderDetails(index) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const order = orders[index];
    if (order) {
        alert(`Дата замовлення: ${order.date}\nКількість: ${order.count} шт.\nПІБ: ${order.fullName}\nМісто: ${order.city}\nСклад Нової пошти: ${order.delivery}\nМетод оплати: ${order.payMethod}\nКоментар: ${order.comment}`);
    }
}

function removeOrder(index) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(orders));
    showMyOrders();
}