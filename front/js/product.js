main()

function main(){
    getArticles();
}

function getArticles(){

    let params = new URL(document.location).searchParams;
    let id = params.get("id");

    fetch(`http://localhost:3000/api/products/${id}`)
        .then(function(res){
                return res.json();
        })
        .catch(function(error) {
            alert(error)
        })
        
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
        });

        let colorSelect = document.getElementById("colors");
        
}