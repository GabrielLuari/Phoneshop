const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Payment endpoint
app.post('/api/payment', async (req, res) => {
  try {
    const { token, amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'usd',
      payment_method: token,
      confirmation_method: 'manual',
      confirm: true,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Load routes
require('./config/mongoose.config');
require('./routes/person.routes')(app);
require('./routes/user.routes')(app);

app.listen(PORT, () => {
  console.log(`Listening at Port ${PORT}`);
});
