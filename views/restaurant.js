const restaurantName= document.getElementById("restaurantName");
const deliveryFee= document.getElementById("deliveryFee");
const minimumOrder= document.getElementById("minimumOrder");
const menu= document.getElementById('menu');
const category= document.getElementById('category');
const addCategory= document.getElementById("addCategory");
const addCategoryButton= document.getElementById("addCategoryButton");
const newName= document.getElementById("newName");
const newDescription= document.getElementById("newDescription");
const newPrice= document.getElementById("newPrice");
const newCategory= document.getElementById("newCategory");
const saveMenuItem= document.getElementById("saveMenuItem");
const saveInfo= document.getElementById("saveInfo");
const restaurantID= document.getElementById('restID');
let newMenu=[];

//had trouble updating the ID of new items so I had to take this long route
let id= restaurantID.innerHTML.slice(15);  
let getIds=  category.getElementsByClassName('ids');
let lastItemID=0;
try{
    lastItemID= Number(getIds[getIds.length-1].innerHTML.slice(3))+1;
}catch(error){
    lastItemID=0;
}

//end


//add category button handler
addCategoryButton.addEventListener("click", function(){
    const ul= document.createElement('ul');
    const menItems=document.createElement('ul');
    ul.id= addCategory.value;
    ul.innerHTML=addCategory.value;
    menItems.id='menuItems';
    ul.appendChild(menItems);
    category.appendChild(ul);
    updateCategoryDropDown(ul.innerHTML);
});


//to re render the drop down after a category has been added
function updateCategoryDropDown(newCat){
    const newDropDown= document.createElement('option');
    newDropDown.innerHTML= newCat;
    newCategory.appendChild(newDropDown);
}

//handler for the button that adds new menu items to a category
saveMenuItem.addEventListener("click", function(){
    try{
        const nameOfItem= document.createElement('li');
        const newID= document.createElement('p');
        const description= document.createElement('p');
        const price= document.createElement('p');
        let newCat= newCategory.value;
        const matchingCat= document.getElementById(newCat).children[0];
        nameOfItem.innerHTML= newName.value;
        newID.innerHTML= 'ID: '+ lastItemID;
        description.innerHTML= 'Description: '+newDescription.value;
        price.innerHTML= 'Price: $'+ Number(newPrice.value);
        nameOfItem.appendChild(newID);
        nameOfItem.appendChild(description);
        nameOfItem.appendChild(price);
        matchingCat.appendChild(nameOfItem);
        lastItemID++;
    }catch(error){
        console.error(error);
    }
    
});



//save button handler, which saves all modified information for the restaurant and sends a PUT request to the server
saveInfo.addEventListener('click', function(){
    let newMenu={name: restaurantName.value, delivery_fee: deliveryFee.value, min_order: minimumOrder.value};
    let xhttp= new XMLHttpRequest();
    xhttp.onreadystatechange= function(){
        if(this.status===200 && this.readyState===4){
            alert("Information for restaurant updated");
        }
    }

    xhttp.open("PUT", '/restaurants/'+id);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(newMenu));
})