const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
    body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
    body.classList.remove("active");
});

let products = [
    { id: 1, 
        name: "PRODUCT 1", 
        images: "images/shoes1.png", 
        price: 150 
    },
    { id: 2, 
        name: "PRODUCT 2", 
        images: "images/shoes2.png", 
        price: 170 
    },
    { id: 3, 
        name: "PRODUCT 3", 
        images: "images/shoes3.png", 
        price: 180 
    },
    { id: 4, 
        name: "PRODUCT 4", 
        images: "images/shoes4.png", 
        price: 200 
    },
    { id: 5, 
        name: "PRODUCT 5", 
        images: "images/shoes5.png", 
        price: 210 
    },
    { id: 6, 
        name: "PRODUCT 6", 
        images: "images/shoes6.png", 
        price: 190 
    }
];

let listCards = [];

const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src="${value.images}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onClick="addToCard(${key})">Add to Card</button>
        `;
        list.appendChild(newDiv);
    });
};

const addToCard = (key) => {
    if (!listCards[key]) {
        listCards[key] = { ...products[key], quantity: 1 };
    } else {
        listCards[key].quantity += 1;
    }
    reloadCard();
};

const reloadCard = () => {
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.price * value.quantity;
            count += value.quantity;

            // Create the item container with flex column layout
            let newDiv = document.createElement("li");
            newDiv.classList.add("cart-item");
            newDiv.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <img src="${value.images}" style="width: 100px; height: auto; margin-bottom: 8px;">
                    <div class="cardTitle">${value.name}</div>
                    <div class="cardPrice">${(value.price * value.quantity).toLocaleString()}</div>
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <button style="background-color: #560bad" class="cardButton" onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                        <div class="count">${value.quantity}</div>
                        <button style="background-color: #560bad" class="cardButton" onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                    </div>
                </div>
            `;
            listCard.appendChild(newDiv);
        }
    });

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}


const changeQuantity = (key, quantity) => {
    if (quantity === 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = products[key].price * quantity;
    }
    reloadCard();
};

initApp();
