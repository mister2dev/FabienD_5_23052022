// Fonction de récupération de l'id dans l'url
let adress = new URL(window.location.href).searchParams;
let id = adress.get("id");

// Fonction de récupération des données articles de l'API selon l'id
function getArticles() {
  // Version local
  // fetch(`http://localhost:3000/api/products/${id}`)
  //Version en ligne
  fetch(`https://fabiend-5-23052022-1.onrender.com/api/products/${id}`)
    .then(function (res) {
      return res.json();
    })

    // Fonction d'affichage des données de l'article
    .then(function (article) {
      let productImg = document.createElement("img");
      document.querySelector("div.item__img").appendChild(productImg);
      productImg.src = article.imageUrl;
      productImg.alt = article.altTxt;

      document.getElementById("title").innerText = article.name;
      document.getElementById("price").innerText = article.price;
      document.getElementById("description").innerText = article.description;

      let colorSelect = document.getElementById("colors");
      for (let color of article.colors) {
        let option = document.createElement("option");
        option.setAttribute("value", color);
        option.innerText = color;
        colorSelect.appendChild(option);
      }
    })
    // Affichage dans la console d'une erreur en cas de non réponse
    .catch(function (error) {
      alert(error);
    });
}

getArticles();

// Fonction d'ajout au panier
function addToCart() {
  const quantityChoice = document.querySelector("#quantity");
  const colorChoice = document.querySelector("#colors");

  // Vérifier si la quantité est valide et si une couleur a été choisie
  if (quantityChoice.value <= 0 || quantityChoice.value > 100) {
    alert("Veuillez sélectionner une quantité valide (entre 1 et 100).");
    return;
  }

  if (!colorChoice.value) {
    alert("Veuillez sélectionner une couleur.");
    return;
  }

  // Récupérer les informations du produit
  let productCart = getCartFromLocalStorage();
  let productCartObject = createProductObject();

  // Vérifier si le produit existe déjà dans le panier
  const existingProduct = productCart.find(
    (item) =>
      item.idKanap === productCartObject.idKanap &&
      item.colorKanap === productCartObject.colorKanap
  );

  // Mise à jour de la quantité si le produit est déjà dans le panier
  if (existingProduct) {
    existingProduct.qtyKanap = (
      parseInt(existingProduct.qtyKanap) + parseInt(productCartObject.qtyKanap)
    ).toString();
    alert("Quantité mise à jour !");
  } else {
    // Sinon ajout du nouveau produit au panier
    productCart.push(productCartObject);
    alert("Produit ajouté au panier !");
  }

  // Sauvegarder les modifications dans le localStorage
  saveCartToLocalStorage(productCart);
}

// Fonction pour créer l'objet produit à ajouter au panier
function createProductObject() {
  let idKanap = id;
  let colorKanap = document.querySelector("#colors").value;
  let qtyKanap = document.querySelector("#quantity").value;
  let nameKanap = document.querySelector("#title").textContent;
  let imgKanap = document.querySelector("div.item__img img").src;
  let altTxt = document.querySelector("div.item__img img").alt;

  return {
    idKanap,
    colorKanap,
    qtyKanap,
    nameKanap,
    imgKanap,
    altTxt,
  };
}

// Récupérer le panier à partir du localStorage
function getCartFromLocalStorage() {
  let cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Sauvegarder le panier dans le localStorage
function saveCartToLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Ajouter un listener pour l'ajout au panier
let addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", addToCart);
