main()

function main(){
    getArticles();
}

// Fonction de récupération de l'id dans l'url
function getArticles(){

    let adress = new URL(window.location.href).searchParams;
    let id = adress.get("id");

// Fonction de récupération des données articles de l'API selon l'id
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(function(res){
                return res.json();
        })

// Fonction d'affichage des données de l'article
        .then(function(article){
        let productImg = document.createElement("img");
        document.querySelector("div.item__img").appendChild(productImg);
        productImg.src = article.imageUrl;
        productImg.alt = article.altTxt;

        let productTitle = document.getElementById("title");
        productTitle.innerText = article.name;

        let productPrice = document.getElementById("price");
        productPrice.innerText = article.price;

        let productDescription = document.getElementById("description");
        productDescription.innerText = article.description;

        let colorSelect = document.getElementById("colors");
            for (let i=0; i < article.colors.length; i++) {
                let option = document.createElement("option");
                option.setAttribute("value", article.colors[i]);
                option.innerText = article.colors[i];
                colorSelect.appendChild(option);
            }
        })

        .catch(function(error) {
            alert(error)
        });
}