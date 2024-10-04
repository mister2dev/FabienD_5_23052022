// Fonction d'affichage de la commande
let productLocalStorage = JSON.parse(localStorage.getItem("cart"));

function displayCart() {
  // On test s'il y a des produits dans le local storage, on indique que le panier est vide sans afficher le formulaire si celui ci est vide
  if (!productLocalStorage) {
    const titleCart = document.querySelector("h1");
    const sectionCart = document.querySelector(".cart");

    titleCart.innerHTML = "Votre panier est vide !";
    sectionCart.style.display = "none";
  } else {
    // sinon on crée les balises une par une pour chaque article
    for (const product in productLocalStorage) {
      let productArticle = document.createElement("article");
      document.querySelector("#cart__items").appendChild(productArticle);
      productArticle.className = "cart__item";
      productArticle.setAttribute(
        "data-id",
        productLocalStorage[product].idKanap
      );
      productArticle.setAttribute(
        "data-color",
        productLocalStorage[product].colorKanap
      );

      // Insertion de l'élément "div" pour l'image produit
      let productDivImg = document.createElement("div");
      productArticle.appendChild(productDivImg);
      productDivImg.className = "cart__item__img";

      // Insertion de l'image
      let productImg = document.createElement("img");
      productDivImg.appendChild(productImg);
      productImg.src = productLocalStorage[product].imgKanap;
      productImg.alt = productLocalStorage[product].altTxt;

      // Insertion de l'élément "div" pour la description produit
      let productItemContent = document.createElement("div");
      productArticle.appendChild(productItemContent);
      productItemContent.className = "cart__item__content";

      // Insertion de l'élément "div"
      let productItemContentDescription = document.createElement("div");
      productItemContent.appendChild(productItemContentDescription);
      productItemContentDescription.className =
        "cart__item__content__Description";

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
      productItemContentSettings.appendChild(
        productItemContentSettingsQuantity
      );
      productItemContentSettingsQuantity.className =
        "cart__item__content__settings__quantity";

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
      productItemContentSettingsDelete.className =
        "cart__item__content__settings__delete";

      // Insertion de "p" supprimer
      let productDelete = document.createElement("p");
      productItemContentSettingsDelete.appendChild(productDelete);
      productDelete.className = "deleteItem";
      productDelete.innerHTML = "Supprimer";
      productDelete.addEventListener("click", (e) => {
        e.preventDefault();

        // Enregistrer l'id et la couleur séléctionnés par le bouton supprimer
        let deleteId = productLocalStorage[product].idKanap;
        let deleteColor = productLocalStorage[product].colorKanap;

        // Filtrer l'élément cliqué en ne concervant que les autres elements
        productLocalStorage = productLocalStorage.filter(
          (elt) => elt.idKanap !== deleteId || elt.colorKanap !== deleteColor
        );

        // Envoyer les nouvelles données dans le localStorage
        localStorage.setItem("cart", JSON.stringify(productLocalStorage));

        // Avertir de la suppression et recharger la page
        alert("Votre article a bien été supprimé.");

        // Si pas de produits dans le local storage on affiche que le panier est vide
        if (productLocalStorage.length === 0) {
          localStorage.clear();
        }
        // Refresh rapide de la page
        location.reload();
      });
    }
  }
}

displayCart();

let qtyTotal = 0;
let priceTotal = 0;

// Fonction de récupération des quantitées total et du prix total
function getTotal() {
  if (productLocalStorage) {
    for (let t = 0; t < productLocalStorage.length; t++) {
      qtyTotal += parseInt(productLocalStorage[t].qtyKanap);
      priceTotal +=
        parseInt(productLocalStorage[t].priceKanap) *
        parseInt(productLocalStorage[t].qtyKanap);
    }
  }
}

getTotal();

// Fonction affichage du résultat
function displayResults() {
  document.querySelector("#totalQuantity").innerHTML = qtyTotal;
  document.querySelector("#totalPrice").innerHTML = priceTotal;
}

displayResults();

// Fonction changement de quantité et mise à jour du prix total
function quantityChange() {
  let itemQtyChange = document.querySelectorAll(".itemQuantity");

  if (productLocalStorage) {
    for (let c = 0; c < productLocalStorage.length; c++) {
      itemQtyChange[c].addEventListener("change", function () {
        if (itemQtyChange[c].value > 0) {
          //Modification des totaux + affichage
          let quantityDiff =
            itemQtyChange[c].value - productLocalStorage[c].qtyKanap;
          qtyTotal += quantityDiff;
          priceTotal += quantityDiff * productLocalStorage[c].priceKanap;

          //Affichage mis à jour
          displayResults();

          //Ajout des modifications dans le localStorage
          productLocalStorage[c].qtyKanap = itemQtyChange[c].value;
          localStorage.setItem("cart", JSON.stringify(productLocalStorage));
        }
      });
    }
  }
}

quantityChange();

//////////////////////////// Formulaire ////////////////////////////

// Fonction de formulaire de contact
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

    // Fonction de validation des entrées pour la bonne correspondance avec le résultat envoyé à l'API
    function validInput() {
      // Créer une variable qui indique si le formulaire est valide ou non
      let valide = true;

      // Contrôle du prénom
      formFirstName = () => {
        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
        const validFirstName = contact.firstName;
        if (/^[a-zA-Z--]{2,20}$/.test(validFirstName)) {
          firstNameErrorMsg.innerHTML = "";
          return true;
        } else {
          firstNameErrorMsg.innerHTML = "Prénom invalide";
          valide = false; // Mettre la variable à false si le contrôle échoue
        }
      };

      // Contrôle du nom
      formName = () => {
        let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
        const validName = contact.lastName;
        if (/^[a-zA-Z\s-]{2,20}$/.test(validName)) {
          lastNameErrorMsg.innerHTML = "";
          return true;
        } else {
          lastNameErrorMsg.innerHTML = "Nom invalide";
          valide = false;
        }
      };

      // Contrôle de l'adresse
      formAddress = () => {
        let addressErrorMsg = document.getElementById("addressErrorMsg");
        const validAddress = contact.address;
        if (/^[a-zA-Z0-9\s-]{2,50}$/.test(validAddress)) {
          addressErrorMsg.innerHTML = "";
          return true;
        } else {
          addressErrorMsg.innerHTML = "Adresse invalide";
          valide = false;
        }
      };

      // Contrôle de la ville
      formCity = () => {
        let cityErrorMsg = document.getElementById("cityErrorMsg");
        const validAddress = contact.city;
        if (/^[a-zA-Z-\s-]{2,20}$/.test(validAddress)) {
          cityErrorMsg.innerHTML = "";
          return true;
        } else {
          cityErrorMsg.innerHTML = "Ville invalide";
          valide = false;
        }
      };

      // Contrôle de l'email
      formEmail = () => {
        let emailErrorMsg = document.getElementById("emailErrorMsg");
        const validEmail = contact.email;
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(validEmail)) {
          emailErrorMsg.innerHTML = "";
          return true;
        } else {
          emailErrorMsg.innerHTML = "Mail invalide";
          valide = false;
        }
      };

      // On appele les fonctions de contrôle à l'intérieur de la fonction validInput
      formFirstName();
      formName();
      formAddress();
      formCity();
      formEmail();

      // On retourne la valeur de la variable valide
      return valide;
    }

    // Fonction de vérification des informations récupérées
    formCheck = () => {
      if (validInput()) {
        return true;
      } else {
        alert("Une erreur est survenue, merci de vérifier vos informations");
      }
    };

    formCheck();

    //Construction d'un array d'id depuis le local storage
    let products = [];
    for (let i = 0; i < productLocalStorage.length; i++) {
      products.push(productLocalStorage[i].idKanap);
    }

    // Récupération des données du formulaire et des produits dans un objet
    const cartData = {
      contact,
      products,
    };

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
  });
};

form();
