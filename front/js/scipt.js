fetch("http://localhost:3000/api/products")
    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(function(value){
        console.log(value);
    })
    .catch(function(err){
        'une erreur est survenue'
    });

let productLink = document.createElement("a");
document.querySelector(".items").appendChild(productLink);

let productArticle = document.createElement("article");
document.getElementsByTagName("a").appendChild(productArticle);

let productImg = document.createElement("img");
document.getElementsByTagName("article").appendChild(productImg);

let productH3 = document.createElement("h3");
document.getElementsByTagName("article").appendChild(productH3);

let productDescription = document.createElement("p");
document.getElementsByTagName("article").appendChild(productDescription);
