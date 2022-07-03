main()

function main(){
    getArticles();
    addToCart();
}

// Fonction de récupération de l'id dans l'url
function getArticles(){

    let adress = new URL(window.location.href).searchParams;
    let id = adress.get("id");

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

    // const colorChoice = document.querySelector("#colors");
    const quantityChoice = document.querySelector("#quantity");

   if (quantityChoice.value > 0 && quantityChoice.value <= 100 ) {
    let productCart = []

    let idKanap = id
    let colorKanap = document.querySelector("#colors").value;
    let qtyKanap = document.querySelector("#quantity").value;

    let productCartObject = {
        idKanap : id,
        colorKanap : colorKanap,
        qtyKanap : qtyKanap,
    };

    productCart.push(productCartObject);

    let objCart = JSON.stringify(productCart);
    localStorage.setItem("cart", objCart);


    alert("Ajouté au panier !");

    // let objectCart = {
    //    _id : id,
    //    quantity : document.querySelector("#quantity").value,
    //    color : document.querySelector("#colors").value,
    //    }
   } else {

   }
}