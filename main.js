var cart = []; //init cart // change to map 
var items;   
var totalPrice = 0

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
        <div class ="card w-25 h-25" >
            <div class="col-sm" onclick="details(${product.id})"> 
                <img src="${product.image}">
                <h4>${product.name}</h4>
                <h4>${product.price}KR</h4>
            </div>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">add To cart</button>
        </div>
            `;
        i++;
        document.getElementById("container").appendChild(row)
        row.innerHTML = out
    }
} 

function addToCart(id, name, price) {
    var item = {id: id, name: name, price: price}
    cart.push(item)
    console.log("item has been added to cart", item);
}

function removeFromCart(id) {
    let i = 0
    for (const product of cart) {
        if (product.id == id) {
            //remove
            cart.splice(i, 1) // 1 means how many you delete if you leave empty it delets everything after selected index
            totalPrice -= product.price
            console.log(totalPrice, totalPrice + product.price);
            console.log("removed: ", product);
        }
        i++;
    }
    document.getElementById("sum").innerHTML = totalPrice;
    document.getElementById(id).remove();
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
    close.innerHTML = "x"
    close.className = "exit"

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
    close.innerHTML = "x"
    close.className = "exit"
    
    close.onclick = () => {
        popup.remove()
    }
    let out = ""
    for (const product of cart) {
        totalPrice += product.price
        out += `
        <div class ="" id="${product.id}"> 
        <h4>${product.name}</h4>
            <h4>${product.price}KR</h4>
            <button onclick="removeFromCart(${product.id})">Remove</button> 
            </div>
            `
        }
    sum.innerHTML = totalPrice
    itemList.innerHTML = out // displays the cart inventory  
    popup.appendChild(close)
    popup.appendChild(itemList)
    popup.appendChild(sum)
    document.body.appendChild(popup);
  }