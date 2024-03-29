let adress = new URL(window.location.href).searchParams;
let id = adress.get("id");

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

        // affichage dans la console d'une erreur en cas de non réponse
        .catch(function(error) {
            alert(error)
        });
}

getArticles();

let addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", addToCart);


// Fonction d'ajout de l'article au panier
function addToCart(){
    const quantityChoice = document.querySelector("#quantity");
    const colorChoice = document.querySelector('#colors');

    //  création d'un array
    let productCart = []
    //  création des variables du produit    
    let idKanap = id
    let colorKanap = document.querySelector("#colors").value;
    let qtyKanap = document.querySelector("#quantity").value;
    let nameKanap = document.querySelector("#title").textContent;
    let imgKanap = document.querySelector("div.item__img img").src;
    let altTxt = document.querySelector("div.item__img img").alt;
    let priceKanap = document.querySelector("#price").textContent;

    //  création de l'objet produit
    let productCartObject = {
        idKanap,
        colorKanap,
        qtyKanap,
        nameKanap,
        imgKanap,
        altTxt,
        priceKanap
    };

    if (quantityChoice.value > 0 && quantityChoice.value <= 100 & colorChoice.value != 0) {

        // test si il y a déjà des produits dans le local storage
        if (localStorage.getItem("cart")){
            productCart = JSON.parse(localStorage.getItem("cart"));
            console.log(productCart);

            // test si le produit commandé est déjà dans le panier
            const resultFind = productCart.find(alreadyInCart => alreadyInCart.idKanap === id && alreadyInCart.colorKanap === colorKanap);
            console.log("result find :");
            console.log(resultFind);

            if (resultFind) {
                let upDateQty = parseInt(qtyKanap) + parseInt(resultFind.qtyKanap);
                console.log("upDateQty : " + upDateQty);
                resultFind.qtyKanap = upDateQty.toString();
                saveToLocalStorage();
                console.log(productCart);
            } else {
                productCart.push(productCartObject);
                saveToLocalStorage();
            }
        } else {
        // on injecte l'objet dans le array puis le tout dans le local storage
        productCart.push(productCartObject);
        saveToLocalStorage();
        }
        alert("Ajouté au panier !");
    }
    // Fonctione de sauvegarde dans le local storage
    function saveToLocalStorage() {
        let objCart = JSON.stringify(productCart);
        localStorage.setItem("cart", objCart);
        console.log(productCart);
    }
}