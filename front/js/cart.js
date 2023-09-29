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
    if (productLocalStorage) {
        for (let c = 0; c < productLocalStorage.length; c++) {
          itemQtyChange[c].addEventListener("change", function () {
            if (itemQtyChange[c].value > 0) {
              //Modification des totaux + affichage
              let quantityDiff = itemQtyChange[c].value - productLocalStorage[c].qtyKanap;
              qtyTotal += quantityDiff;
              priceTotal += quantityDiff * productLocalStorage[c].priceKanap;
              displayResults();
              //Ajout des modifications dans le localStorage
              productLocalStorage[c].qtyKanap = itemQtyChange[c].value;
              localStorage.setItem("cart", JSON.stringify(productLocalStorage));
              //Affichage du nouveau prix du produit
              productPrice[c].innerHTML =
                parseInt(productLocalStorage[c].qtyKanap) *
                parseInt(productLocalStorage[c].priceKanap) +
                " €";
             }
          });
        }
      }
    };
quantityChange();



//////////////////////////// Formulaire ////////////////////////////

form = () => {
  const order = document.getElementById("order");

  order.addEventListener("click", (event) => {
    event.preventDefault();

    // Récupération des données du formulaire dans un objet
    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };

    function validInput() {
      
      // Créer une variable qui indique si le formulaire est valide ou non
      let valide = true;

      // Contrôle du prénom
      formFirstName = () => {
        const validFirstName = contact.firstName;
        if (/^[a-zA-Z--]{2,20}$/.test(validFirstName)) { 
          firstNameErrorMsg.innerHTML = ""
          return true;
        } else {
          let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
          firstNameErrorMsg.innerHTML = "Prénom invalide";
          valide = false; // Mettre la variable à false si le contrôle échoue
        }
      };

      // Contrôle du nom
      formName = () => {
        const validName = contact.lastName;

        if (/^[a-zA-Z\s-]{2,20}$/.test(validName)) {
          lastNameErrorMsg.innerHTML = ""
          return true;
        } else {
          let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
          lastNameErrorMsg.innerHTML = "Nom invalide";
          valide = false; // Mettre la variable à false si le contrôle échoue
        }
      };

      // Contrôle de l'adresse
      formAddress = () => {
        const validAddress = contact.address;
        if (/^[a-zA-Z0-9\s-]{2,50}$/.test(validAddress)) {
          addressErrorMsg.innerHTML = ""
          return true;
        } else {
          let addressErrorMsg = document.getElementById("addressErrorMsg");
          addressErrorMsg.innerHTML = "Adresse invalide";
          valide = false; // Mettre la variable à false si le contrôle échoue
        }
      };

      // Contrôle de la ville
      formCity = () => {
        const validAddress = contact.city;
        if (/^[a-zA-Z-\s-]{2,20}$/.test(validAddress)) {
          cityErrorMsg.innerHTML = ""
          return true;
        } else {
          let cityErrorMsg = document.getElementById("cityErrorMsg");
          cityErrorMsg.innerHTML = "Ville invalide";
          valide = false; // Mettre la variable à false si le contrôle échoue
        }
      };

      // Contrôle de l'email
      formEmail = () => {
        const validEmail = contact.email;
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(validEmail)) {
          emailErrorMsg.innerHTML = ""
          return true;
        } else {
          let emailErrorMsg = document.getElementById("emailErrorMsg");
          emailErrorMsg.innerHTML = "Mail invalide";
          valide = false; // Mettre la variable à false si le contrôle échoue
        }
      };

      // Appeler les fonctions de contrôle à l'intérieur de la fonction validInput
      formFirstName();
      formName();
      formAddress();
      formCity();
      formEmail();

      // Retourner la valeur de la variable valide
      return valide;
    }

    // Vérification des informations récupérées
    formCheck = () => {
      if (validInput()) { // Appeler la fonction validInput dans la condition du formCheck
        // Envoi des informations dans le local storage
        // localStorage.setItem('contact', JSON.stringify(contact)); // données utilisateur
        // Méthode booléan
        return true;

      } else {
        alert("Une erreur est survenue, merci de vérifier vos informations");
      }
    };

    formCheck();

      //Construction d'un array d'id depuis le local storage
      let products = [];
      for (let i = 0; i<productLocalStorage.length;i++) {
          products.push(productLocalStorage[i].idKanap);
      }
      console.log(products);

//-------------------------------------------------

      // Récupération des données du formulaire et des produits dans un objet
      const cartData = {
        contact,
        products,
      };

      console.log(cartData);

      // Envoi des données du formulaire et des produits au serveur avec la méthode POST
      const checkOut = {
        method: "POST",
        body: JSON.stringify(cartData),
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch("http://localhost:3000/api/products/order", checkOut)
        .then((response) => response.json())
        .then((data) => {
          
          localStorage.setItem("orderId", data.orderId);
          
          if (formCheck()) {
            document.location.href = `confirmation.html?id=${data.orderId}`;
          }
        });
    }); // addeventlistener fin
  };

form();