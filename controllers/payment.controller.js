const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

const createPaymentIntent = async (req, res) => {
    try {
        const { amount, currency = 'inr' } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ['card'],
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Payment Intent creation failed' });
    }
};

module.exports = { createPaymentIntent };
