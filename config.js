const dotenv = require('dotenv');

dotenv.config();

const PRICE = process.env.PRICE;
const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STATIC_DIR = process.env.STATIC_DIR;
const DOMAIN = process.env.DOMAIN;

module.exports = {
    PRICE,
    STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY,
    STATIC_DIR,
    DOMAIN,
}