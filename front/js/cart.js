// Fonction d'affichage de la commande
let productLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];

// Cache des prix pour éviter les appels réseau répétés
const priceCache = new Map();

async function getPrice(productId) {
  // Utiliser le cache si disponible
  if (priceCache.has(productId)) {
    return priceCache.get(productId);
  }

  try {
    let response = await fetch(
      `https://fabiend-5-23052022-1.onrender.com/api/products/${productId}`
    );
    let product = await response.json();

    // Stocker dans le cache
    priceCache.set(productId, product.price);
    return product.price;
  } catch (error) {
    console.error("Erreur du prix :", error);
    return 0; // Valeur par défaut en cas d'erreur
  }
}

function displayNone() {
  document.querySelector("h1").innerHTML = "Votre panier est vide !";
  document.querySelector(".cart").style.display = "none";
}

async function displayCart() {
  // On test s'il y a des produits dans le local storage
  if (productLocalStorage.length === 0) {
    displayNone();
    return;
  }

  // Pré-charger tous les prix en une seule fois
  const pricePromises = productLocalStorage.map((product) =>
    getPrice(product.idKanap)
  );
  await Promise.all(pricePromises);

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

    // Insertion du prix (maintenant synchrone grâce au cache)
    let productPrice = document.createElement("p");
    productItemContentDescription.appendChild(productPrice);
    productPrice.innerHTML =
      priceCache.get(productLocalStorage[product].idKanap) + " €";

    // Insertion de l'élément "div"
    let productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.className = "cart__item__content__settings";

    // Insertion de l'élément "div"
    let productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
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
    productDelete.addEventListener("click", async (e) => {
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

      // Recalcul synchrone des totaux
      calculateAndDisplayTotals();

      // Si pas de produits dans le local storage on affiche que le panier est vide
      if (productLocalStorage.length === 0) {
        localStorage.removeItem("cart");
        displayNone();
      }
    });
  }
}

// Fonction synchrone pour calculer et afficher les totaux
function calculateAndDisplayTotals() {
  let qtyTotal = 0;
  let priceTotal = 0;

  for (let i = 0; i < productLocalStorage.length; i++) {
    const qty = parseInt(productLocalStorage[i].qtyKanap);
    const price = priceCache.get(productLocalStorage[i].idKanap) || 0;

    qtyTotal += qty;
    priceTotal += price * qty;
  }

  // Affichage immédiat
  document.querySelector("#totalQuantity").innerHTML = qtyTotal;
  document.querySelector("#totalPrice").innerHTML = priceTotal;
}

// Variable pour gérer le debouncing
let updateTimeout = null;

// Fonction changement de quantité optimisée
function quantityChange() {
  const itemQtyChange = document.querySelectorAll(".itemQuantity");
  if (!productLocalStorage) return;

  for (let c = 0; c < productLocalStorage.length; c++) {
    itemQtyChange[c].addEventListener("input", function () {
      let newQty = parseInt(itemQtyChange[c].value, 10);

      // Validation et correction
      if (isNaN(newQty) || newQty < 1) newQty = 1;
      if (newQty > 100) newQty = 100;

      // Correction de l'input si nécessaire
      if (itemQtyChange[c].value !== String(newQty)) {
        itemQtyChange[c].value = String(newQty);
      }

      // Mise à jour immédiate du localStorage
      productLocalStorage[c].qtyKanap = newQty;
      localStorage.setItem("cart", JSON.stringify(productLocalStorage));

      // Debouncing pour éviter les calculs trop fréquents
      clearTimeout(updateTimeout);
      updateTimeout = setTimeout(() => {
        calculateAndDisplayTotals();
      }, 100); // 100ms de délai

      // Mise à jour immédiate pour un feedback rapide
      calculateAndDisplayTotals();
    });

    // Événement change pour la validation finale
    itemQtyChange[c].addEventListener("change", function () {
      calculateAndDisplayTotals();
    });
  }
}

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", async function () {
  await displayCart();
  calculateAndDisplayTotals();
  quantityChange();
});

//////////////////////////// Formulaire ////////////////////////////

// Fonction de formulaire de contact
const form = () => {
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
    const formAddress = () => {
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
    const formCity = () => {
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
    const formEmail = () => {
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
    if (valideInput) {
      const checkOut = {
        method: "POST",
        body: JSON.stringify(cartData),
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch(
        "https://fabiend-5-23052022-1.onrender.com/api/products/order",
        checkOut
      )
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("orderId", data.orderId);
          document.location.href = `confirmation.html?id=${data.orderId}`;
        })
        .catch((error) => {
          console.error("Erreur lors de la commande:", error);
        });
    }
  });
};

form();
