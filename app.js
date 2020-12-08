// Initialize express
const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyParser = require('body-parser');
const models = require('./db/models');

app.use(bodyParser.urlencoded({ extended: true }));
// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
// Use handlebars to render
app.set('view engine', 'handlebars');

var shoes = [
  { title: "Nike React Infinity Run Flyknit", desc: "$120", imgUrl: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/05c38a6c-3059-487f-8143-1b73344fdfbb/react-infinity-run-flyknit-mens-running-shoe-RQ484B.jpg" },
  { title: "Brooks Ravenna 11", desc: "$85", imgUrl: "https://www.brooksrunning.com/dw/image/v2/aaev_prd/on/demandware.static/-/Sites-BrooksCatalog/default/dw71f78c52/images/ProductImages/110330/110330_049_l_WR.jpg?sw=640" },
  { title: "Adidas ZX 2K BOOST SHOES", desc: "$150", imgUrl: "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/a00e176273414e2d986babc90099fa3e_9366/ZX_2K_Boost_Shoes_White_FV9996_01_standard.jpg" }
]

// Render the "home" layout for the main page and send the following msg
app.get('/', (req, res) => {
  res.render('home',);
})

// var events = [
//   { title: "I am your first event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
//   { title: "I am your second event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
//   { title: "I am your third event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" }
// ]

// INDEX
app.get('/shoes', (req, res) => {
  models.Shoes.findAll({ order: [['createdAt', 'DESC']] }).then(shoes => {
    res.render('shoes', { shoes: shoes });
  })
})

// CREATE Comment
app.post('/shoes', (req, res) => {
  models.Shoes.create(req.body).then(shoes => {
    res.redirect(`/shoes`);
  }).catch((err) => {
    console.log(err)
  });
})

// SHOW
app.get('/shoes/:id', (req, res) => {
  // Search for the event by its id that was passed in via req.params
  models.Shoes.findByPk(req.params.id).then((shoes) => {
    // If the id is for a valid event, show it
    res.render('shoes-show', { shoes: shoes })
  }).catch((err) => {
    // if they id was for an event not in our db, log an error
    console.log(err.message);
  })
})

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
