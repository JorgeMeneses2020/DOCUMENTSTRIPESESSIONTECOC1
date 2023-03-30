const express = require('express');
const app = express();
const { STATIC_DIR } = require('./config')

const paymentRoute = require('./routes/payment.route')
app.use(express.static(STATIC_DIR));
app.use(express.urlencoded());
app.use(
    express.json({
        // We need the raw body to verify webhook signatures.
        // Let's compute it only when hitting the Stripe webhook endpoint.
        verify: function (req, res, buf) {
            if (req.originalUrl.startsWith('/webhook')) {
                req.rawBody = buf.toString();
            }
        },
    })
);
app.use(paymentRoute)
app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));