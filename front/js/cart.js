function displayCart (){
    //  test si il y a déjà des produits dans le local storage
    let productLocalStorage = JSON.parse(localStorage.getItem("cart"));

    if (!productLocalStorage) {
    
        const titleCart = document.querySelector("h1");
        const sectionCart = document.querySelector(".cart");
    
        titleCart.innerHTML = "Votre panier est vide !";
        sectionCart.style.display = "none";
    
    } else {

        for (const product in productLocalStorage) {

            // Création de la balise "article" et insertion dans la section
            let productArticle = document.createElement("article");
            document.querySelector("#cart__items").appendChild(productArticle);
            productArticle.className = "cart__item";
            productArticle.setAttribute("data-id", productLocalStorage[product].idKanap);
            productArticle.setAttribute("data-color", productLocalStorage[product].color);

             // Insertion de l'élément "div" pour l'image produit
            let productDivImg = document.createElement("div");
            productArticle.appendChild(productDivImg);
            productDivImg.className = "cart__item__img";
            
            // Insertion de l'image
            let productImg = document.createElement("img");
            productDivImg.appendChild(productImg);
            productImg.src = productLocalStorage[product].imgKanap;
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
            productItemContentDescription.appendChild(productTitle);
            productTitle.innerHTML = productLocalStorage[product].nameKanap;

            // Insertion de la couleur
            let productColor = document.createElement("p");
            productItemContentDescription.appendChild(productColor);
            productColor.innerHTML = productLocalStorage[product].colorKanap;

            // Insertion du prix
            let productPrice = document.createElement("p");
            productItemContentDescription.appendChild(productPrice);
            productPrice.innerHTML = productLocalStorage[product].priceKanap + " €";

            // Insertion de l'élément "div"
            let productItemContentSettings = document.createElement("div");
            productItemContent.appendChild(productItemContentSettings);
            productItemContentSettings.className = "cart__item__content__settings";

            // Insertion de l'élément "div"
            let productItemContentSettingsQuantity = document.createElement("div");
            productItemContentSettings.appendChild(productItemContentSettingsQuantity);
            productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
            
            // Insertion de "Qté : "
            let productQty = document.createElement("p");
            productItemContentSettingsQuantity.appendChild(productQty);
            productQty.innerHTML = "Qté : ";

            // Insertion de la quantité
            let productQuantity = document.createElement("input");
            productItemContentSettingsQuantity.appendChild(productQuantity);
            productQuantity.value = productLocalStorage[product].qtyKanap;
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "itemQuantity");

            // Insertion de l'élément "div"
            let productItemContentSettingsDelete = document.createElement("div");
            productItemContentSettings.appendChild(productItemContentSettingsDelete);
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

            // Insertion de "p" supprimer
            let productDelete = document.createElement("p");
            productItemContentSettingsDelete.appendChild(productDelete);
            productDelete.className = "deleteItem";
            productDelete.innerHTML = "Supprimer";
            productDelete.addEventListener("click", (e) => {
                e.preventDefault;
            
                // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
                let deleteId = productLocalStorage[product].idKanap;
                let deleteColor = productLocalStorage[product].colorKanap;

                // filtrer l'élément cliqué par le bouton supprimer
                productLocalStorage = productLocalStorage.filter( elt => elt.idKanap !== deleteId || elt.colorKanap !== deleteColor);

                // envoyer les nouvelles données dans le localStorage
                localStorage.setItem('cart', JSON.stringify(productLocalStorage));               

                // avertir de la suppression et recharger la page
                alert('Votre article a bien été supprimé.');
                
                //Si pas de produits dans le local storage on affiche que le panier est vide
                if (productLocalStorage.length === 0) {
                    localStorage.clear();
                }
                //Refresh rapide de la page
                location.reload();
            });


        }    
    }
}

displayCart();

let qtyTotal = 0;
let priceTotal = 0;
let productLocalStorage = JSON.parse(localStorage.getItem("cart"));


// récupération des quantitées total et du prix total
function getTotal() {
    if (productLocalStorage) {
        for (let t = 0; t < productLocalStorage.length; t++) {
            qtyTotal += parseInt(productLocalStorage[t].qtyKanap);
            priceTotal += parseInt(productLocalStorage[t].priceKanap) * parseInt(productLocalStorage[t].qtyKanap)
        }
    }
}

getTotal();

function displayResults() {
    document.querySelector("#totalQuantity").innerHTML = qtyTotal;
    document.querySelector("#totalPrice").innerHTML = priceTotal;
  }

displayResults();

function quantityChange() {
    let itemQtyChange = document.querySelectorAll(".itemQuantity");
    console.log(itemQtyChange)
            console.log(productLocalStorage)
    if (productLocalStorage){
        for (let i = 0; i < itemQtyChange.length; i++) {
            itemQtyChange[i].addEventListener("change" , (event) => {
                event.preventDefault();
    
            //Selection de l'element à modifier
            let qtyToModify = productLocalStorage[i].qtyKanap;

            let qtyModifValue = itemQtyChange[i].valueAsNumber;
            
            const resultFind = productLocalStorage.find((el) => el.qtyModifValue !== qtyToModify);

            resultFind.qtyKanap = qtyModifValue;
            productLocalStorage[i].qtyKanap = resultFind.qtyKanap;

            localStorage.setItem("cart", JSON.stringify(productLocalStorage));
        
            // refresh rapide
            location.reload();
            });
        }
    }
}

quantityChange();