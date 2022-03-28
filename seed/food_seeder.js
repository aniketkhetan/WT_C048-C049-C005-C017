const Food  = require('../src/models/orders');
const mongoose = require("mongoose");
const { exit } = require('process');
mongoose.connect("mongodb://127.0.0.1:27017/reg");

const foods = [ 
    new Food ({
        imagePath:"img/menu-burger.jpg",
        title:"Mini cheese Burger",
        Price:9

}),
new Food ({
    imagePath:"img/menu-burger.jpg",
    title:"Mini cheese Burger",
    Price:9

}),
new Food ({
    imagePath:"img/menu-burger.jpg",
    title:"Double size Burger",
    Price:11

}),
new Food ({
    imagePath:"img/menu-burger.jpg",
    title:"Bacon, EGG and Cheese",
    Price:13

}),
new Food ({
    imagePath:"img/menu-burger.jpg",
    title:"Pulled porx Burger",
    Price:18

}),
new Food ({
    imagePath:"img/menu-burger.jpg",
    title:"Fried chicken Burger",
    Price:22

}),
new Food ({
    imagePath:"img/menu-snack.jpg",
    title:"Corn Tikki - Spicy fried Aloo",
    Price:15

}),

new Food ({
    imagePath:"img/menu-snack.jpg",
    title:"Bread besan Toast",
    Price:35

}),

new Food ({
    imagePath:"img/menu-snack.jpg",
    title:"Healthy soya nugget snacks",
    Price:20

}),

new Food ({
    imagePath:"img/menu-snack.jpg",
    title:"Tandoori Soya Chunks",
    Price:30

}),

new Food ({
    imagePath:"img/menu-beverage.jpg",
    title:"Single Cup Brew",
    Price:7

}),

new Food ({
    imagePath:"img/menu-beverage.jpg",
    title:"Caffe Americano",
    Price:9

}),

new Food ({
    imagePath:"img/menu-beverage.jpg",
    title:"Caramel Macchiato",
    Price:15

}),

new Food ({
    imagePath:"img/menu-beverage.jpg",
    title:"Standard black coffee",
    Price:8

}),
new Food ({
    imagePath:"img/menu-beverage.jpg",
    title:"Large black coffee",
    Price:12

})







];

for (var i = 0;i<foods.length; i++ ){

    foods[i].save()
};

