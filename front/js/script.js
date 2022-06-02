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
        })

        .then(function(results){
            const articles = results;
            console.log(articles);

            for (let article in articles) {

                let productLink = document.createElement("a");
                document.querySelector("section.items").appendChild(productLink);

                let productArticle = document.createElement("article");
                document.querySelector("section a").appendChild(productArticle);

                let productImg = document.createElement("img");
                document.querySelector("section article").appendChild(productImg);
                productImg.src = articles[article].imageUrl;

                let productH3 = document.createElement("h3");
                document.querySelector("section article").appendChild(productH3);

                let productDescription = document.createElement("p");
                document.querySelector("section article").appendChild(productDescription);
            }
        });
