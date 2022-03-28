const express = require('express');

const app = express();
require("./db/conn");
const db = require("./db/connsql");

const Register = require("./models/users");
const path = require("path")
const hbs = require("hbs");
const req = require('express/lib/request');
const res = require('express/lib/response');
const session = require("express-session");

const flash = require("connect-flash");
const async = require('hbs/lib/async');
const exp = require('constants');
const Letter = require('./models/newsletter');
const Feedback = require('./models/feedback');
const Food = require('./models/orders');
const Cart = require('./models/cart');
const { default: mongoose } = require('mongoose');
const MongoStore = require('connect-mongo');
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"../public");
const template_path= path.join(__dirname,"../templates/views");
const partials_path= path.join(__dirname,"../templates/partials");


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'mysecret',
    resave:false,
    saveUninitialized:false,
    store:  MongoStore.create({
        
        mongoUrl:"mongodb://127.0.0.1:27017/reg"





    }),
    cookie:{maxAge:180 * 60 * 1000}
    }));
app.use(flash())
// console.log(path.join(__dirname,"../public"));
app.use(express.static(static_path));
app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});
app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get('/index', (req, res) => {
    res.render('index')
});


app.get('/register',(req, res) => {
    res.render('register')
});

app.get('/menulogin',(req, res)=>{

    res.render('menulogin')
});

app.get('/menu',(req, res) => {
    res.render('menu')
});

app.get('/feedback',(req, res) => {
    res.render('feedback')
});


app.get('/login',(req, res) => {
    res.render('login')
});

app.get('/booking',(req,res)=> {
    res.render('booking')
});

app.get('/add-to-cart/:id',function(req, res, next ){

    const foodId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart.items : {});


    Food.findById(foodId, function(err, food){

        if (err){

            return res.redirect('/')

        }

        cart.add(food, food.id);

        req.session.cart = cart;
        console.log(req.session.cart);
        res.render('/')
    });








});

// app.post('/menu', async(req,res) => {
//     try {
//         const registernewsletter = new Letter({

            
//             email:req.body.email



//         })

//         const newsletterd = await registernewsletter.save();
//         res.status(201).render('menu');
        
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

app.post('/register', async(req, res) => {
    try {
        
            const password = req.body.password;
            const cpassword =  req.body.cpassword;

            if (password === cpassword){

                const registerUser = new  Register ({

                    fullname: req.body.fullname,
                    username: req.body.username,
                    email:req.body.email,
                    address:req.body.address,
                    password:password,
                    cpassword:cpassword,
                    gender:req.body.gender

                })

                const registered = await registerUser.save();
                res.status(201).render('login');

            }else{
                res.send('passwords dont match')
            }
    } 
    
    catch (error) {
        res.status(400).send(error);
    } 
});

app.post("/booking", async (req,res) => {

    try {

            const name = req.body.name;
            const number = req.body.number;
            const capacity = req.body.capacity;
            const time = req.body.time;

            if (time ==0) {
                blah = "UPDATE lunch  SET avail = 0,booker_name=?,booker_number=? WHERE capacity = ? && avail = 1 limit 1";
            }
            else {
                blah = "UPDATE dinner  SET avail = 0,booker_name=?,booker_number= ? WHERE capacity = ? && avail = 1 limit 1";
            }
             db.query(blah,[name,number,capacity],function(err,res){

                if (err)
                {
                    console.log('sorry all tables are booked');
                }
                else {

                    console.log('table booked!');
                    res.render('booking')

                    
                    

                    
                }



            });

            db.query(blah,function(err,res){

                if (err)
                {
                    console.log('sorry all tables are booked')
                }
                else {

                    console.log('table booked!')
                    res.render('index')

                    
                }

            
            })

            } catch (error) {
        res.status(400).send(error)
    }
})

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        const useremail =  await Register.findOne({email:email});
        

        if(useremail.password === password){
            res.status(201).render("index");

        }else{
            res.send("Invalid Email or Password")
        }
        
    } catch (error) {
        res.status(400).send("Invalid Email or Password")
    }
});

app.post("/feedback", async (req, res) => {

    try {

        const registerFeedback = new Feedback({

            experience: req.body.experience,
            comments: req.body.comments,
            name:req.body.name,
            email:req.body.email



        })

        const feedbacked = await registerFeedback.save();
        res.status(201).render('feedback');


        
    } catch (error) {
        res.status(400).send(error);
        
    }
})

// const foods = [ 
//     new Food ({
//         imagePath:"img/menu-burger.jpg",
//         title:"Mini cheese Burger",
//         price:9

// }),
// new Food ({
//     imagePath:"img/menu-burger.jpg",
//     title:"Mini cheese Burger",
//     price:9

// }),
// new Food ({
//     imagePath:"img/menu-burger.jpg",
//     title:"Double size Burger",
//     price:11

// }),
// new Food ({
//     imagePath:"img/menu-burger.jpg",
//     title:"Bacon, EGG and Cheese",
//     price:13

// }),
// new Food ({
//     imagePath:"img/menu-burger.jpg",
//     title:"Pulled porx Burger",
//     price:18

// }),
// new Food ({
//     imagePath:"img/menu-burger.jpg",
//     title:"Fried chicken Burger",
//     price:22

// }),
// new Food ({
//     imagePath:"img/menu-snack.jpg",
//     title:"Corn Tikki - Spicy fried Aloo",
//     price:15

// }),

// new Food ({
//     imagePath:"img/menu-snack.jpg",
//     title:"Bread besan Toast",
//     price:35

// }),

// new Food ({
//     imagePath:"img/menu-snack.jpg",
//     title:"Healthy soya nugget snacks",
//     price:20

// }),

// new Food ({
//     imagePath:"img/menu-snack.jpg",
//     title:"Tandoori Soya Chunks",
//     price:30

// }),

// new Food ({
//     imagePath:"img/menu-beverage.jpg",
//     title:"Single Cup Brew",
//     price:7

// }),

// new Food ({
//     imagePath:"img/menu-beverage.jpg",
//     title:"Caffe Americano",
//     price:9

// }),

// new Food ({
//     imagePath:"img/menu-beverage.jpg",
//     title:"Caramel Macchiato",
//     price:15

// }),

// new Food ({
//     imagePath:"img/menu-beverage.jpg",
//     title:"Standard black coffee",
//     price:8

// }),
// new Food ({
//     imagePath:"img/menu-beverage.jpg",
//     title:"Large black coffee",
//     price:12

// })







// ];
// var done = 0;
// for (var i = 0;i<foods.length; i++ ){

//     foods[i].save(function(err, result) {
//         done++;
//         if (done === foods.length) {
//             mongoose.disconnect();
//         }
//     });
// };








app.listen(port, ()=> {console.log('server is running at 3000')}) ;