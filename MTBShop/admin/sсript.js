import { db } from "../firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
    } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
console.log("Админка работает");

const publish = document.getElementById("publish");

publish.onclick = async function () {

    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const image = document.getElementById("image").value;

    if (
        title === "" ||
        price === "" ||
        image === ""
    ) {
        document.getElementById("status").innerHTML =
        "❌ Заполните все поля";
        return;
    }

    try {

        await addDoc(collection(db, "products"), {

            title: title,
            price: price,
            category: category,
            description: description,
            image: image

        });

        document.getElementById("status").innerHTML =
        "✅ Товар добавлен";

        document.getElementById("title").value = "";
        document.getElementById("price").value = "";
        document.getElementById("description").value = "";
        document.getElementById("image").value = "";

    } catch (e) {

        document.getElementById("status").innerHTML =
        "❌ Ошибка: " + e.message;

    }

};
// ===== УДАЛЕНИЕ ТОВАРОВ =====

async function loadAdminProducts(){

    const list = document.getElementById("adminProducts");

    if(!list) return;

    const snapshot = await getDocs(collection(db, "products"));

    list.innerHTML = "";

    snapshot.forEach((item)=>{

        list.innerHTML += `
            <div>
                ${item.data().title}
                <button onclick="deleteProduct('${item.id}')">
                    Удалить
                </button>
            </div>
        `;

    });

}


window.deleteProduct = async function(id){

    await deleteDoc(doc(db, "products", id));

    alert("Товар удалён");

    loadAdminProducts();

};


loadAdminProducts();