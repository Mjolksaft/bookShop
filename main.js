
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
        out += `
            <div class ="container card"> 
                <img src="${product.image}">
                <h4 class="image">${product.name}</h4>
                <h4>${product.price}KR</h4>
                <p>${product.about}</p>
                <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">add To cart</button>
            </div>
            `;
    }

    placeholder.innerHTML = out
})

function addToCart(id, name, price) {
    var item = {id: id, name: name, price: price}
    cart.push(item)
    console.log("item has been added to cart", item);
}

function removeFromCart(id) {
    console.log(id);
    cart.splice(id - 1)
}

function openPopup() {
    console.log(cart);
    var popup = document.createElement("div");
    var close = document.createElement("button")
    popup.className = "popUp"
    close.innerHTML = "x"
    close.className = "exit"

    close.onclick = () => {
        popup.remove()
    }

    let out = ""
    for (const product of cart) {
        out += `
        <div class =""> 
            <h4>${product.name}</h4>
            <h4>${product.price}KR</h4>
            <button onclick="removeFromCart(${product.id})">Remove</button> 
        </div>
        `
    }

    popup.innerHTML = out // displays the cart inventory  
    popup.appendChild(close)
    document.body.appendChild(popup);
  }