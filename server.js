require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 3000;


mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Database connected successfully");
}).catch(err => {
  console.log('Could not connect to the database', err);
  process.exit();
})

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));


app.use(methodOverride('_method'));
app.use('/styles', express.static('styles'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/', require('./routes/login'));
app.use('/adminEdit', require('./routes/adminEdit'));
app.use('/adminCarousel', require('./routes/adminCarousel'));
app.use('/login', require('./routes/login'));
app.use('/SignUp', require('./routes/SignUp'));
app.use('/index', require('./routes/index'));
app.use('/currency', require('./routes/currency'));
app.use('/add', require('./routes/add'));
app.use('/update', require('./routes/update'));
app.use('/delete', require('./routes/delete'));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));