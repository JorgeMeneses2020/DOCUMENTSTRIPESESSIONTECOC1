const express = require('express');
const api = express.Router();

const paymentController = require('../controllers/payment.controller');

api.get('/', paymentController.defaultFunction);
api.post('/create-checkout-session', paymentController.createCheckoutSession)
api.get('/retrive-checkout-session', paymentController.checkoutSession);

module.exports = api;


