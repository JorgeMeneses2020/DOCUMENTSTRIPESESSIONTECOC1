const {
    PRICE,
    STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY,
    STATIC_DIR,
    DOMAIN,
} = require('../config');
const { resolve } = require('path');
const stripe = require('stripe')(STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
    appInfo: { // For sample support and debugging, not required for production:
        name: "stripe-samples/checkout-one-time-payments",
        version: "0.0.1",
        url: "https://github.com/stripe-samples/checkout-one-time-payments"
    }
});

const defaultFunction = (req, res) => {
    const path = resolve(STATIC_DIR + '/index.html');
    res.sendFile(path);
}
const createCheckoutSession = async (req, res) => {
    const domainURL = DOMAIN;
    const { quantity } = req.body;
    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
            {
                price: PRICE,
                quantity: quantity
            }
        ],
        // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
        success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domainURL}/canceled.html`,
        // automatic_tax: {enabled: true},
    });
    console.log(session.url);
    return res.redirect(303, session.url);
}
const checkoutSession = async (req, res) => {
    const { sessionId } = req.query;

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.send(session);
}


module.exports = {
    defaultFunction,
    createCheckoutSession,
    checkoutSession
}



