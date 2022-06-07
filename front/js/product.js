main()

function main(){
    getArticles();
}

function getArticles(){
    fetch("http://localhost:3000/api/products")
        .then(function(res){
            return res.json();
        })
        


        .catch(function(error) {
            alert(error)
        })

}