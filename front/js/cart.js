// Fonction d'affichage de la commande
let productLocalStorage = JSON.parse(localStorage.getItem("cart"));

async function getPrice(productId) {
  try {
    let response = await fetch(
      `http://localhost:3000/api/products/${productId}`
    );
    let product = await response.json();
    return product.price;
  } catch (error) {
    console.error("Erreur du prix :", error);
  }
}

function displayNone() {
  const titleCart = document.querySelector("h1");
  const sectionCart = document.querySelector(".cart");

  titleCart.innerHTML = "Votre panier est vide !";
  sectionCart.style.display = "none";
}

async function displayCart() {
  // On test s'il y a des produits dans le local storage, on indique que le panier est vide sans afficher le formulaire si celui ci est vide
  if (!productLocalStorage) {
    displayNone();
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
      productPrice.innerHTML =
        (await getPrice(productLocalStorage[product].idKanap)) + " €";

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
        productArticle.remove();
        // Avertir de la suppression
        alert("Votre article a bien été supprimé.");

        // Si pas de produits dans le local storage on affiche que le panier est vide
        if (productLocalStorage.length === 0) {
          localStorage.clear();
          displayNone();
        }
      });
    }
  }
}

let qtyTotal = 0;
let priceTotal = 0;

// Fonction de récupération des quantitées total et du prix total
async function getTotal() {
  if (productLocalStorage) {
    for (let t = 0; t < productLocalStorage.length; t++) {
      qtyTotal += parseInt(productLocalStorage[t].qtyKanap);
      priceTotal +=
        parseInt(await getPrice(productLocalStorage[t].idKanap)) *
        parseInt(productLocalStorage[t].qtyKanap);
    }
  }
}

// Fonction affichage du résultat
function displayResults() {
  document.querySelector("#totalQuantity").innerHTML = qtyTotal;
  document.querySelector("#totalPrice").innerHTML = priceTotal;
}

// Fonction changement de quantité et mise à jour du prix total
async function quantityChange() {
  let itemQtyChange = document.querySelectorAll(".itemQuantity");

  if (productLocalStorage) {
    for (let c = 0; c < productLocalStorage.length; c++) {
      itemQtyChange[c].addEventListener("change", async function () {
        if (itemQtyChange[c].value > 0) {
          //Modification des totaux + affichage
          let quantityDiff =
            itemQtyChange[c].value - productLocalStorage[c].qtyKanap;
          qtyTotal += quantityDiff;
          priceTotal +=
            quantityDiff * (await getPrice(productLocalStorage[c].idKanap));
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
document.addEventListener("DOMContentLoaded", async function () {
  await displayCart();
  await getTotal();
  displayResults();
  quantityChange();
});
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

    // Créer une variable qui indique si le formulaire est valide ou non
    let valideInput = true;

    function names(contactValue, regex, errorMsgId, errorMsg) {
      let errorMsgElement = document.getElementById(errorMsgId);
      if (regex.test(contactValue)) {
        errorMsgElement.innerHTML = "";
      } else {
        errorMsgElement.innerHTML = errorMsg;
        valideInput = false;
      }
    }

    // Utilisation pour le contrôle du prénom
    function formFirstName() {
      return names(
        contact.firstName,
        /^[a-zA-Z-]{2,20}$/,
        "firstNameErrorMsg",
        "Prénom invalide"
      );
    }

    // Utilisation pour le contrôle du nom
    function formName() {
      return names(
        contact.lastName,
        /^[a-zA-Z\s-]{2,20}$/,
        "lastNameErrorMsg",
        "Nom invalide"
      );
    }

    // Contrôle de l'adresse
    formAddress = () => {
      let addressErrorMsg = document.getElementById("addressErrorMsg");
      const validAddress = contact.address;
      if (/^[a-zA-Z0-9\s-]{2,50}$/.test(validAddress)) {
        addressErrorMsg.innerHTML = "";
      } else {
        addressErrorMsg.innerHTML = "Adresse invalide";
        valideInput = false;
      }
    };

    // Contrôle de la ville
    formCity = () => {
      let cityErrorMsg = document.getElementById("cityErrorMsg");
      const validAddress = contact.city;
      if (/^[a-zA-Z-\s-]{2,20}$/.test(validAddress)) {
        cityErrorMsg.innerHTML = "";
      } else {
        cityErrorMsg.innerHTML = "Ville invalide";
        valideInput = false;
      }
    };

    // Contrôle de l'email
    formEmail = () => {
      let emailErrorMsg = document.getElementById("emailErrorMsg");
      const validEmail = contact.email;
      if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(validEmail)) {
        emailErrorMsg.innerHTML = "";
      } else {
        emailErrorMsg.innerHTML = "Mail invalide";
        valideInput = false;
      }
    };

    formFirstName();
    formName();
    formAddress();
    formCity();
    formEmail();

    if (valideInput === false) {
      alert("Une erreur est survenue, merci de vérifier vos informations");
    }

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

        if (valideInput) {
          document.location.href = `confirmation.html?id=${data.orderId}`;
        }
      });
  });
};

form();
