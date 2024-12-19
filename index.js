const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// routes 
app.get('/', (req, res) => {
  res.send('Welcome to Stock Portfolio Analysis API!');
});



// calculate returns

app.get('/calculate-returns', (req, res) => {
 const boughtAt = parseFloat(req.query.boughtAt);
 const marketPrice = parseFloat(req.query.marketPrice);
 const quantity = parseFloat(req.query.quantity);
 const returns = (marketPrice - boughtAt) * quantity;


 try {

  if(!returns) {
    res.status(400).send({ error: 'NO RETURN' });
  }

  res.status(200).json(returns.toString());

 } catch (error) {
  res.status(500).send({ error: error.message });
 }

});


// total returns

app.get('/total-returns', (req, res) => {
  const stock1 = parseFloat(req.query.stock1);
  const stock2 = parseFloat(req.query.stock2);
  const stock3 = parseFloat(req.query.stock3);
  const stock4 = parseFloat(req.query.stock4);

  const totalReturns = stock1 + stock2 + stock3 + stock4;

  res.status(200).json(totalReturns.toString());

});


// calculate-return-percentage

app.get('/calculate-return-percentage', (req, res) => {
  const returns = parseFloat(req.query.returns);
  const boughtAt = parseFloat(req.query.boughtAt);

  const returnPercentage = (returns / boughtAt) * 100;

  res.status(200).json(returnPercentage.toString());
});


// total-return-percentage

app.get('/total-return-percentage', (req, res) => {
  const stock1 = parseFloat(req.query.stock1);
  const stock2 = parseFloat(req.query.stock2);
  const stock3 = parseFloat(req.query.stock3);
  const stock4 = parseFloat(req.query.stock4);

  

  const totalReturnPercentage = stock1 + stock2 + stock3 + stock4;

  res.status(200).json(totalReturnPercentage.toString());
  
})

// check status

app.get('/status', (req, res) => {
  const returnPercentage = parseFloat(req.query.returnPercentage);

  if(returnPercentage > 0) {
    res.status(200).json('Profit');
  } else {
    res.status(200).json('Loss');
  }


});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
