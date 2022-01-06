const restaurantName= document.getElementById("restaurantName");
const deliveryFee= document.getElementById('deliveryFee');
const minimumOrder= document.getElementById('minimumOrder');
const submitButton= document.getElementById('submitButton');

submitButton.addEventListener("click", function(){
    let restaurantInfo={id: 0, name:restaurantName.value, delivery_fee:deliveryFee.value, min_order:minimumOrder.value, menu:{}};
    let xhttp= new XMLHttpRequest();
    xhttp.onreadystatechange= function(){
        if(this.readyState===4 && this.status===200){
            const response= JSON.parse(xhttp.response);
            let id= response.id;
            window.location.replace('http://localhost:3000/restaurants/'+(Number(id)));
        }
    }
    xhttp.open("POST", "/restaurants");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(restaurantInfo));
})
