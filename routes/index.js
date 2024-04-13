var express = require('express');
var router = express.Router();
const Razorpay = require('razorpay')
var instance = new Razorpay({
  key_id: 'rzp_test_FVJ4As4pB9TVIP',
  key_secret: 'Pe4Pzo7EMr1xIkM3B4XyEv0a',
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create/orderId', (req, res)=>{
  var options = {
    amount: 5000,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  instance.orders.create(options, function(err, order) {
    console.log(order);
    res.send(order);
  });
});


router.post('/api/payment/verify',(req,res)=>{
  const razorpayOrderId = req.body.response.Razorpay_order_id;
  const razorpayPaymentId = req.body.response.Razorpay_payment_id;
  const signature = req.body.response.Razorpay_signature;
  const secret = 'Pe4Pzo7EMr1xIkM3B4XyEv0a';
  var { validatePaymentVerification, validateWebhookSignature } = require('../node_modules/razorpay/dist/utils/razorpay-utils');
  const result = validatePaymentVerification({"order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
  res.send(result);
});

module.exports = router;
