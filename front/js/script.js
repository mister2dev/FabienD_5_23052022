// Fonction de récupération des données articles de l'API
function getArticles() {
  const itemsSection = document.querySelector("section.items");

  // On attend que le DOM + images du banner soient chargés
  window.addEventListener("load", () => {
    // === Création du loader dans la section items ===
    const loader = document.createElement("div");
    loader.className = "loader";
    loader.innerHTML = `<div class="spinner"></div><p>Chargement des articles...</p>`;
    itemsSection.appendChild(loader);

    // Ajout du style directement via JS
    const style = document.createElement("style");
    style.textContent = `
      .loader {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 200px;
        font-size: 1.2rem;
        color: #555;
      }
      .spinner {
        width: 40px;
        height: 40px;
        border: 5px solid #ddd;
        border-top: 5px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 10px;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    // === Fetch API ===
    fetch("https://fabiend-5-23052022-1.onrender.com/api/products")
      .then((res) => res.json())
      .then((articles) => {
        // retirer le loader
        loader.remove();

        for (let article of articles) {
          let productLink = document.createElement("a");
          itemsSection.appendChild(productLink);
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
