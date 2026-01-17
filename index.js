const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

/* const port = 2001;
app.listen(port, () => {
    console.log("Connected to the port", port)
});
 */

//============================================================Collection Area======================================================================================================================================================

const otitem = require("./Collection/item");
const admin = require("./Collection/firbase");
const corimage = require("./Collection/image");


//==============================================================Segregated======================================================================================================================================================

const usero = require('./bridge/appuser');
const profileo = require('./bridge/profile');
const carteeo = require('./bridge/cart')
const categ = require('./bridge/category')
const oldotuser = require('./bridge/oldotuser');
const buyo = require('./bridge/buy');
const addresso = require('./bridge/address');


/*mongoose.connect("mongodb://localhost:27017/ot").then(() => {console.log("Mongodb connected Successfully")}).catch((err) => {console.log("Errore : ",err)}); */
mongoose.connect(process.env.MONGO_URI).then(() => {console.log("Mongodb connected Successfully")}).catch((err) => {console.log("Errore : ",err)});



//================================================================Image related=======================================================================================================================================

app.use("/ot/baseone/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename : (req, file, cb) => {
        const uniquename = Date.now() + path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniquename); 
    }
});

const filefilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    if (allowed.includes(file.mimetype)) {
        cb(null, true); 
      } else {
        cb(new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed."), false); 
      }
};

const upload = multer({
    storage: storage,
    fileFilter: filefilter,
    limits: { fileSize: 2 * 1024 * 1024 }, 
  });


//******************************************************************API Area****************************************************************

//Segregated
app.use('/ot/baseone',usero);
app.use('/ot/baseone',profileo);
app.use('/ot/baseone',carteeo);
app.use('/ot/baseone',categ);
app.use('/ot/baseone',oldotuser);
app.use('/ot/baseone',buyo);
app.use('/ot/baseone',addresso);

module.exports = app;