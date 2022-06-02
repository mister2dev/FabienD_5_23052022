    fetch("http://localhost:3000/api/products/")
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

        .then((value) => {
                let productLink = document.createElement("a");
                document.querySelector("section.items").appendChild(productLink);

                let productArticle = document.createElement("article");
                document.querySelector("section a").appendChild(productArticle);

                let productImg = document.createElement("img");
                document.querySelector("section article").appendChild(productImg);

                let productH3 = document.createElement("h3");
                document.querySelector("section article").appendChild(productH3);

                let productDescription = document.createElement("p");
                document.querySelector("section article").appendChild(productDescription);


                let title = document.getElementById("title")
                title.innerText = value.name
        })