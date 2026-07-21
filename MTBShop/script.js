// ===== ИМПОРТ FIREBASE =====

console.log("script работает");
import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// ===== МЕНЮ =====

const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const menu = document.getElementById("menu");

if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
        menu.classList.add("active");
    });
}

if (closeMenu && menu) {
    closeMenu.addEventListener("click", () => {
        menu.classList.remove("active");
    });
}

// ===== ВХОД РАЗРАБОТЧИКА =====

const loginButton = document.getElementById("loginDeveloper");

loginButton.addEventListener("click", () => {

    const code = document.getElementById("devCode").value;

    if(code === "15893"){

        document.getElementById("loginStatus").innerHTML =
        "✅ Доступ разрешён";

        window.location.href = "admin/index.html";

    }else{

        document.getElementById("loginStatus").innerHTML =
        "❌ Неверный код";

    }

});
// ===== ЗАГРУЗКА ТОВАРОВ =====

const productsContainer = document.getElementById("products");

let products = [];

async function loadProducts() {

    const snapshot = await getDocs(collection(db, "products"));

    products = [];

    snapshot.forEach((doc) => {

        products.push({
            id: doc.id,
            ...doc.data()
        });

    });

    renderProducts(products);

}

function renderProducts(list) {

    productsContainer.innerHTML = "";

    list.forEach((item) => {

        productsContainer.innerHTML += `
        <div class="product">
            
            <img src="${item.image}" alt="${item.title}">

            <h3>${item.title}</h3>

            <p>${item.description}</p>

            <div class="price">${item.price} грн</div>

            <button onclick="window.open('https://t.me/rimik001')">
                Написать в Telegram
            </button>

        </div>
        `;

    });

}

loadProducts();


// ===== ПОИСК =====

const search = document.getElementById("search");

search.addEventListener("input", () => {

    const text = search.value.toLowerCase();

    const filtered = products.filter((item) =>

        item.title.toLowerCase().includes(text) ||

        item.category.toLowerCase().includes(text)

    );

    renderProducts(filtered);

});