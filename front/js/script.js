// Fonction de récupération des données articles de l'API
function getArticles() {
  // === Création du loader en JS ===
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.innerHTML = `<div class="spinner"></div><p>Chargement...</p>`;
  document.body.appendChild(loader);

  // Ajout du style directement via JS
  const style = document.createElement("style");
  style.textContent = `
    #loader {
      position: fixed;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: white;
      font-size: 1.2rem;
      z-index: 9999;
    }
    .spinner {
      width: 50px;
      height: 50px;
      border: 6px solid #ddd;
      border-top: 6px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 10px;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    #loader.hidden {
      display: none;
    }
  `;
  document.head.appendChild(style);

  // === Fetch API ===
  fetch("https://fabiend-5-23052022-1.onrender.com/api/products")
    .then((res) => res.json())
    .then((articles) => {
      // cacher le loader quand les données arrivent
      loader.classList.add("hidden");

      for (let article of articles) {
        let productLink = document.createElement("a");
        document.querySelector("section.items").appendChild(productLink);
        productLink.href = `product.html?id=${article._id}`;

        let productArticle = document.createElement("article");
        let productImg = document.createElement("img");

        productLink.appendChild(productArticle);
        productArticle.appendChild(productImg);
        productImg.src = article.imageUrl;
        productImg.alt = article.altTxt;

        productArticle.appendChild(
          createElm("h3", article.name, "productName")
        );

        productArticle.appendChild(
          createElm("p", article.description, "productDescription")
        );
      }
    })
    .catch((error) => {
      loader.innerHTML =
        "<p>❌ Erreur : impossible de charger les articles.</p>";
      console.error(error);
    });

  // Fonction de création de balise
  function createElm(balise, content, classTitle) {
    let productObject = document.createElement(balise);
    productObject.innerText = content;
    productObject.classList.add(classTitle);
    return productObject;
  }
}

getArticles();
