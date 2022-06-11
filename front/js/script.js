main()

function main(){
    getArticles();
}

// Fonction de récupération des données articles de l'API
function getArticles() {
    fetch("http://localhost:3000/api/products")
        .then(function(res){
            return res.json();
        })

// Fonction d'affichage des articles sur la page index (nom, description et image)
        .then(function(articles){

            for (let article in articles) {
                let productLink = document.createElement("a");
                document.querySelector("section.items").appendChild(productLink);
                productLink.href = `product.html?id=${articles[article]._id}`;

                let productArticle = document.createElement("article");
                productLink.appendChild(productArticle);

                let productImg = document.createElement("img");
                productArticle.appendChild(productImg);
                productImg.src = articles[article].imageUrl;
                productImg.alt = articles[article].altTxt;

                let productH3 = document.createElement("h3");
                productArticle.appendChild(productH3);
                productH3.innerText = articles[article].name;
                productH3.classList.add("productName");

                let productDescription = document.createElement("p");
                productArticle.appendChild(productDescription);
                productDescription.innerText = articles[article].description;
                productDescription.classList.add("productDescription");
            }
        })

        .catch(function(error) {
            alert(error)
        });

    }