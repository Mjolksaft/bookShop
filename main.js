var cart = new Map();
var items;   
var totalPrice = 0
const imageURL = "https://source.unsplash.com/random/";

fetch("products.json", {
    method: "GET",
})
.then((result) => {
    return result.json()
})
.then((products) => {
    items = products
    displayItems()
})

function displayItems() {
    document.getElementById("container").innerHTML = ""
    var row = document.createElement("div")
    row.className = "row"

    let out = "";
    let i = 0
    for (const product of items) {
        if (i == 4) {
            //create another row
            var row = document.createElement("div")
            row.className = "row"
            i = 0;
            out = ""
        }
        out += `
        <div class ="card w-25 p-3" style="">
            <div class="col-sm" onclick="details(${product.id})"> 
                <img src="${imageURL}${randomSize()}" class="card-img-top">
                <div class="card-body"> 
                    <h4 class="card-title">${product.name}</h4>
                    <h4 class="card-title">${product.price}KR</h4>
                </div>
            </div>
            <button class="btn btn-primary" onclick="addToCart(${product.id})">add To cart</button>
        </div>
            `;
        i++;
        document.getElementById("container").appendChild(row)
        row.innerHTML = out
    }
} 

function randomSize() {
    return `${randomNumber()}x${randomNumber()}/?books/`;
}

function randomNumber() {
    return Math.floor(Math.random() * 10) + 300;    
}

function addToCart(id) {
    if (cart.has(id)) {
        cart.set(id, cart.get(id) + 1)
    } else {
        cart.set(id, 1)
    }
    console.log(cart);
    cart.forEach(function(value, key) {
        console.log(`${key}: ${value}`);
      });
}

function removeFromCart(id) {
    cart.forEach(function(value, key) {
        if(key == id) {
            if(cart.get(id) == 0){
                cart.delete(id)
                document.getElementById(`${key}quantity`).innerHTML = `Quantity: ${value }`
            } else if(cart.get(id) == 1){
                cart.set(id, cart.get(id) - 1)
                totalPrice -= items[id - 1].price
                document.getElementById(`${key}cashout`).remove();
            } else {
                cart.set(id, cart.get(id) - 1)
                totalPrice -= items[id - 1].price
                document.getElementById(`${key}quantity`).innerHTML = `Quantity: ${value - 1}`
                console.log(value * items[key - 1].price);
                document.getElementById(`${key}totalPrice`).innerHTML = `price: ${(value - 1) * items[key - 1].price}`
            }
        }
      });
      console.log(cart);
      var text = "total: "
      finalPrice = text.concat(totalPrice)
    document.getElementById("sum").innerHTML = finalPrice;
}

function filterUp() {
    items.sort(
        (a, b) => 
        (a.price < b.price) ? 1 : (a.price > b.price) ? -1 : 0);
        displayItems()
}
function filterDown() {
    items.sort(
        (a, b) => 
        (a.price > b.price) ? 1 : (a.price < b.price) ? -1 : 0);
        displayItems()
}

function filterName() {
    items.sort(
        (a, b) => 
        a.name.localeCompare(b.name));
        displayItems()
}

function filterNameReverse() {
    items.sort(
        (a, b) => 
        b.name.localeCompare(a.name));
        displayItems()
}

function details(id) {
    var popup = document.createElement("div");
    var close = document.createElement("button")
    var itemList = document.createElement("div")
    popup.setAttribute("id", "popUp")
    popup.className = "popUp"
    close.className = "btn-close position-absolute top-0 end-0"

    close.onclick = () => {
        popup.remove()
    }
    var product = items.find(obj => {
        return obj.id === id
    })
    let out = ""
    out += `
    <div class ="" id="${product.id}"> 
        <h4>${product.name}</h4>
        <h4>${product.price}KR</h4>
        <p> ${product.about}</p>
        <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">add To cart</button>
    </div>
    `
    itemList.innerHTML = out // displays the cart inventory  
    popup.appendChild(close)
    popup.appendChild(itemList)
    document.body.appendChild(popup);
}

function openPopup() {
    console.log(cart);
    var popup = document.createElement("div");
    var close = document.createElement("button")
    var itemList = document.createElement("div")
    var sum = document.createElement("p")
    sum.setAttribute("id", "sum")
    popup.setAttribute("id", "popUp")
    popup.className = "popUp"
    close.className = "btn-close position-absolute top-0 end-0"
    
    close.onclick = () => {
        popup.remove()
    }
    let out = ""
    totalPrice = 0
    cart.forEach(function(value, key) {
        if(items[key - 1].id == key){
            if (value != 0) {
                var product = items[key - 1]
                totalPrice += product.price  * value
                out += `
                <div class ="" id="${product.id}cashout"> 
                <h4>${product.name}</h4>
                    <h4>${product.price}KR</h4>
                    <p id="${key}quantity">Quantity: ${value}<p>
                    <p id="${key}totalPrice">price: ${value * product.price}<p>
                    <button onclick="removeFromCart(${product.id})">Remove</button> 
                    </div>
                    `
            }
        }
    });
    var text = "total: "
    finalPrice = text.concat(totalPrice)
    sum.innerHTML = finalPrice
    itemList.innerHTML = out // displays the cart inventory  
    popup.appendChild(close)
    popup.appendChild(itemList)
    popup.appendChild(sum)
    document.body.appendChild(popup);
  }