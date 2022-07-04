let adress = new URL(window.location.href).searchParams;
let id = adress.get("id");


main()

function main(){
    getArticles();
}

// Fonction de récupération de l'id dans l'url
function getArticles(){

// Fonction de récupération des données articles de l'API selon l'id
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(function(res){
            return res.json();
        })

// Fonction d'affichage des données de l'article
        .then(function(article){
        let productImg = document.createElement("img");
        document.querySelector("div.item__img").appendChild(productImg);
        productImg.src = article.imageUrl;
        productImg.alt = article.altTxt;

        let productTitle = document.getElementById("title");
        productTitle.innerText = article.name;

        let productPrice = document.getElementById("price");
        productPrice.innerText = article.price;

        let productDescription = document.getElementById("description");
        productDescription.innerText = article.description;

        let colorSelect = document.getElementById("colors");
            for (let color of article.colors) {
                let option = document.createElement("option");
                option.setAttribute("value", color);
                option.innerText = color;
                colorSelect.appendChild(option);
            }
        })

        .catch(function(error) {
            alert(error)
        });
}

let addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", addToCart);

    // let objectTest = {
    //     Id : 32165161561,
    //     Color : "black",
    //     Quantity : 2,
    // }

    // localStorage.setItem ("productId", objectTest.Id)
    // localStorage.setItem ("objecKey", objectTest.Color)
    // localStorage.setItem ("Qty", objectTest.Quantity)

function addToCart(){
    const quantityChoice = document.querySelector("#quantity");

    if (quantityChoice.value > 0 && quantityChoice.value <= 100 ) {
//  création d'un array
    let productCart = []
//  création des variables du produit    
    let idKanap = id
    let colorKanap = document.querySelector("#colors").value;
    let qtyKanap = document.querySelector("#quantity").value;

//  création de l'objet produit
    let productCartObject = {
        idKanap : idKanap,
        colorKanap : colorKanap,
        qtyKanap : qtyKanap,
    };

    if (localStorage.getItem("cart")){
        productCart = JSON.parse(localStorage.getItem("cart"));
    }

//  on injecte l'objet dans le array
    productCart.push(productCartObject);

// on injecte le tout dans le local storage
    let objCart = JSON.stringify(productCart);
    localStorage.setItem("cart", objCart);

    alert("Ajouté au panier !");
   }
}