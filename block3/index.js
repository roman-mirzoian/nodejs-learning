const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const homeRoutes = require('./routes/home');
const coursesRoutes = require('./routes/courses');
const cardRoutes = require('./routes/card');
const addRoutes = require('./routes/add');

const User = require('./models/user');

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
}); 

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(async (req, res, next) => {
  try {
    const user = await User.findById('60fda7f88f5be73068784828');
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
  } 
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/add', addRoutes);
app.use('/card', cardRoutes);

const PORT = process.env.PORT || 8000;

const password = 'INwiIwOLYgNxwAnh';

async function start() {
  try {
    const url = 'mongodb+srv://roman:INwiIwOLYgNxwAnh@cluster0.d5z8s.mongodb.net/shop';
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    const candidate = await User.findOne();
    if(!candidate) {
      const user = new User({
        email: 'roma@gmail.com',
        name: 'Roma',
        cart: {
          items: []
        }
      });
      await user.save();
    }
  
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
  } catch(e) {
    console.log(e);
  }
}

start();