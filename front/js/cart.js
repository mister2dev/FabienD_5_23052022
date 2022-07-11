main()

function main(){
    displayCart();
}

function displayCart (){
    //  test si il y a déjà des produits dans le local storage
    if (localStorage.getItem("cart")){
        let productCart = JSON.parse(localStorage.getItem("cart"));
        console.log(productCart);
    }
}