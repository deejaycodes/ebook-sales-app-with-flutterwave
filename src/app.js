const express = require('express')

const flutterwaveRouter = require('./routes/flutterwave.routes');
const fs = require('fs')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars');
const axios = require('axios')
const cors = require('cors')
require('./config/db')


const app = express();

// Handlebars Middleware
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// Set Static Folder
app.use(express.static(`${__dirname}/public`));

dotenv.config();
// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3002;

// Index Route
app.get('/', (req, res) => {
  res.render('index2')
});


// app.get('/', (req, res) => {
//   res.writeHead(200, {"Content-Type": "text/html"});
//   fs.readFile("./index.html", null, (error, data) => {
//       if(error) {
//           res.writeHead(404);
//           res.write("File not found")
//       }else{
//           res.write(data)
//       }
//       res.end()

//   })
// });

app.use('/flutterwave', flutterwaveRouter);

app.get('/css', (req, res) => {
  res.sendFile(__dirname + '/statics/main.css');
});


app.use(async (req, res) => {
  try {
    throw new Error('Route does not exist');
  } catch (error) {
    return res.status(error.status || 404).json({
      status: error.status || 404,
      error: error.message,
    });
  }
});

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
