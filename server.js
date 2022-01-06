const { response } = require('express');
const express= require('express');
let fs=require('fs');
let app=express();
app.set("view engine", "pug");
app.use('/views', express.static("views"));
app.use(express.json());
let restaurants=[];
let restaurantID=3;


app.post('/restaurants', (request, response)=>{
    if('id' in request.body && 'name' in request.body && 'min_order' in request.body && 'delivery_fee' in request.body){
        request.body.id=restaurantID;
        restaurantID++;
        restaurants.push(request.body);
        response.send(request.body);
    }else{
        response.status(404).send("Invalid POST request");
    }    
});

app.get('/', (request, response)=>{
    response.render("home");
});

app.get('/restaurants', (request, response)=>{
    response.format({'text/html':()=>{
        response.render("restaurants", {restaurants: restaurants});
    }, 'application/json':()=>{
        response.send(restaurants);
    }})
});

app.get('/addrestaurant', (request, response)=>{
    response.render('addRestaurant');
});

app.get('/restaurants/:restID', (request, response)=>{
    let id= Number(request.params.restID);
    restaurants.forEach(restaurant=>{
        if(restaurant.id === id){
            response.render("restaurant", {restaurant: restaurant});
            response.end();
        }
    });
});

app.put('/restaurants/:restID', (request, response)=>{
    let id= Number(request.params.restID);
    restaurants.forEach(restaurant=>{
        if(restaurant.id===id){
            restaurant.name= request.body.name;
            restaurant.delivery_fee= request.body.delivery_fee;
            restaurant.min_order= request.body.min_order;
            response.end();
        }
    })
    response.status(404).send('ID not found');
});


app.listen(3000, function (error){
    if(error){
        throw error;
    }
    fs.readdir('./restaurants', function (err, data){
        if(err){
            throw err;
        }
        data.forEach(restaurant=>{
            if(restaurant.endsWith(".json")){
                const path= './restaurants/'+restaurant;
                restaurants.push(require(path));
            }
        })
    })
    console.log("Server listening at http://localhost:3000");
});

