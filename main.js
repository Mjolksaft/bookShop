
var cart = []; //init cart

fetch("products.json", {
    method: "GET",
})
.then((result) => {
    return result.json()
})
.then((products) => {
    let placeholder = document.querySelector("#data-output")
    let out = "";
    for (const product of products) {
        // console.log(product);
        out += `
            <div class ="container card"> 
                <img src="${product.image}">
                <h4>${product.name}</h4>
                <h4>${product.price}KR</h4>
                <p>${product.about}</p>
                <button onclick="addToCart()">add To cart</button>
            </div>
            `;
    }

    placeholder.innerHTML = out
})

const addToCart = ((itemName, itemPrice) => {
    var item = {name: itemName, price: itemPrice}
    cart.push(item)
    console.log("item has been added to cart", item);
});

function openPopup() {
    console.log(cart);
    var popup = document.createElement("div");
    var button = document.createElement("button")
    popup.className = "popUp"
    button.innerHTML = "x"
    button.className = "exit"

    popup.onclick = () => {
        popup.remove()
    }

    let out = ""
    for (const product of cart) {
        console.log(product.name);
        out += `
        <div class =""> 
            <h4>${product.name}</h4>
            <h4>${product.price}KR</h4>
        </div>
        `
    }
    popup.innerHTML = out // displays the cart inventory  
    popup.appendChild(button)
    document.body.appendChild(popup);
  }