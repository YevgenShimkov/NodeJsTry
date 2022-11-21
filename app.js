const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config()
require('./cron')
const MongoDBStore = require('connect-mongodb-session')(session);

const adminRoutes = require('./routes/admin');
const basicRoutes = require('./routes/basic');
const authRoutes = require('./routes/auth');
const bcrypt = require("bcryptjs");

const errorController = require('./controllers/error');
const User = require('./models/user');
const Role = require('./models/role');
const checkRole = require("./util/checkRole");
const swaggerOptions = require('./swagger')

const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGO_DB,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const specs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs",swaggerUI.serve, swaggerUI.setup(specs))



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
  })
);



app.use(( req, res, next ) => {
  if( !req.session.user ) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use(async ( req, res, next ) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.adminLoged = await checkRole(req, "ADMIN");
  next();
});


app.use('/admin', adminRoutes);
app.use(basicRoutes);
app.use(authRoutes);

app.use(errorController.get404);

const startServer = async () => {
  try {
    await mongoose
      .connect('mongodb+srv://yak1:Yakimo2883@cluster0.tomul.mongodb.net/WWWMMM?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
      })

    const roles = await Role.find()
    if( roles.length === 0 ) {
      const userRole = new Role()
      const adminRole = new Role({ value: 'ADMIN' })
      const investorRole = new Role({ value: 'INVESTOR' })

      await userRole.save()
      await adminRole.save()
      await investorRole.save()
    }

    const searchAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL })
    if( !searchAdmin ) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12)
      const adminRole = await Role.findOne({ value: 'ADMIN' })
      const adminUser = await new User({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: [adminRole.value],
        capital: {
          totalAmountInvestment: process.env.START_CAPITAL
        }
      });
      await adminUser.save();
    }
    app.listen(process.env.PORT);
  } catch(err) {
    console.log(err)
  }
};

startServer();