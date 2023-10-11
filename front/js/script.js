// Fonction de récupération des données articles de l'API
function getArticles() {
    fetch("http://localhost:3000/api/products")
        .then(function(res){
            return res.json();
        })

        // Fonction d'affichage des articles sur la page index (nom, description et image)
        .then(function(articles){

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
                    createElm ("h3", article.name,"productName")
                );

                productArticle.appendChild(
                    createElm ("p", article.description, "productDescription")
                );
                
                // Fonction de création de balise
                function createElm (balise, content, classTitle){
                    let productObject = document.createElement(balise);
                    productObject.innerText = content;
                    productObject.classList.add(classTitle); 
                    return productObject
                };
            }
        })

        // affichage dans la console d'une erreur en cas de non réponse
        .catch(function(error) {
            console.log(error)
        });
}

getArticles();