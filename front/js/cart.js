main()

function main(){
    displayCart();
}

function displayCart (){
    //  test si il y a déjà des produits dans le local storage
    let productLocalStorage = JSON.parse(localStorage.getItem("cart"));

    if (!productLocalStorage) {
    
        const titleCart = document.querySelector("h1");
        const sectionCart = document.querySelector(".cart");
    
        titleCart.innerHTML = "Votre panier est vide !";
        sectionCart.style.display = "none";
    
    } else {
        fetch(`http://localhost:3000/api/products/${id}`)
        .then(function(res){
            return res.json();
        })

        for (let i=0; i < productLocalStorage.length; i++) {

            // Création de la balise "article" et insertion dans la section
            let productArticle = document.createElement("article");
            document.querySelector("#cart__items").appendChild(productArticle);
            productArticle.className = "cart__item";
            productArticle.setAttribute("data-id", productLocalStorage[i].idKanap);
            productArticle.setAttribute("data-color", productLocalStorage[i].color);

             // Insertion de l'élément "div" pour l'image produit
            let productDivImg = document.createElement("div");
            productArticle.appendChild(productDivImg);
            productDivImg.className = "cart__item__img";
            
            // Insertion de l'image
            let productImg = document.createElement("img");
            productDivImg.appendChild(productImg);
            productImg.src = productLocalStorage[i].imgKanap;
            productImg.src = productLocalStorage[i].imgKanap;
            productImg.alt = productLocalStorage.altImgProduit;

            // Insertion de l'élément "div" pour la description produit
            let productItemContent = document.createElement("div");
            productArticle.appendChild(productItemContent);
            productItemContent.className = "cart__item__content";

            // Insertion de l'élément "div"
            let productItemContentDescription = document.createElement("div");
            productItemContent.appendChild(productItemContentDescription);
            productItemContentDescription.className = "cart__item__content__Description";
            
            // Insertion du titre h2
            let productTitle = document.createElement("h2");
            productItemContentTitlePrice.appendChild(productTitle);
            productTitle.innerHTML = productLocalStorage[i].nameKanap;

            // Insertion de la couleur
            let productColor = document.createElement("p");
            productTitle.appendChild(productColor);
            productColor.innerHTML = productLocalStorage[i].colorKanap;

            // Insertion du prix
            let productPrice = document.createElement("p");
            productItemContentTitlePrice.appendChild(productPrice);
            productPrice.innerHTML = productLocalStorage[i].priceKanap + " €";

        }    
    }
}