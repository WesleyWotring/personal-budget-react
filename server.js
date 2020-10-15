const express = require('express');
const app = express();
const port = 3001;
const budget = require("./budget.json");
const cors = require('cors');
const fs = require('fs');

app.use(cors());


app.use( '/', express.static('public'));


app.get('/budget', (req, res) => {
    fs.readFile('./budget.json', 'utf8', (err, data) => {
        if(err){
            throw err;
        }
        const myBudget = JSON.parse(data)
        res.json(myBudget);
    });  
    
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    }); 