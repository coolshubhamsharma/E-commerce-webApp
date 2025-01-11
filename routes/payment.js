
const express = require('express');
const router = express.Router();
const request = require('request');//We are using request for making an HTTP/HTTPS call to payumoney server
const jsSHA = require('jssha');
const {v4:uuid} = require('uuid');
const {isLoggedIn} = require('../middleware');

router.post('/payment_gateway/payumoney',isLoggedIn , (req, res) => {

    //Here pass txnid and it should be different on every call
    req.body.txnid = uuid();
    req.body.email = req.user.email;
    req.body.firstname = req.user.username;

    //Here save all the details in pay object 
    const pay = req.body;
    
    // const hashString = process.env.MERCHANT_KEY //store in in different file
    //  + '|' + pay.txnid
    //  + '|' + pay.amount 
    //  + '|' + pay.productinfo 
    //  + '|' + pay.firstname 
    //  + '|' + pay.email 
    //  + '|' + '||||||||||'
    //  +  process.env.MERCHANT_SALT//store in in different file;

    const hashString = `${process.env.MERCHANT_KEY}|${pay.txnid}|${pay.amount}|${pay.productinfo}|${pay.firstname}|${pay.email}|||||||||||${process.env.MERCHANT_SALT}`;


    const sha = new jsSHA('SHA-512', "TEXT");
    sha.update(hashString);

    //Getting hashed value from sha module
     const hash = sha.getHash("HEX");
 
    //We have to additionally pass merchant key to API so remember to include it.
    pay.key = process.env.MERCHANT_KEY //store in in different file;
    pay.surl = 'http://localhost:8080/payment/success';
    pay.furl = 'http://localhost:8080/payment/fail';
    pay.hash = hash;

    // const object = { list of parameters in the object
    //     amount: pay.amount,
    //     phone: pay.phone,
    //     service_provider: pay.service_provider,
    //     productinfo: 'TestProduct',
    //     firstname: pay.firstname,
    //     email: pay.email,
    //     txnid: pay.txnid,
    //     key: pay.key,
    //     surl: pay.surl,
    //     furl: pay.furl,
    //     hash: pay.hash
    // }
    


    //Making an HTTP/HTTPS call with request
    request.post({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: 'https://test.payu.in/_payment', //Testing url
        form: pay,
        }, 
        function (error, httpRes, body) {
            if (error) {
                console.error('Request Error:', error);
                return res.status(500).json({
                    status: false,
                    message: 'Payment request failed',
                    error: error.toString(),
                });
            }
    
            // Ensure httpRes is defined before accessing properties i.e.whether we are getting an http response or not
            if (!httpRes) {
                console.error('No response received from PayU server');
                return res.status(500).json({
                    status: false,
                    message: 'No response received from PayU server',
                });
            }
    
            if (httpRes.statusCode === 200) {
                res.send(body);
            } else if (httpRes.statusCode >= 300 && httpRes.statusCode <= 400) {
                res.redirect(httpRes.headers.location); //This tells your Express.js application to redirect the client's browser to the URL specified in the Location header of the HTTP response.
            } else {
                console.error('Unexpected status code:', httpRes.statusCode, body);
                res.status(httpRes.statusCode).json({
                    status: false,
                    message: 'Unexpected response from PayU',
                    response: body,
                });
            }
    });

});

//success route
router.get('/payment/success' , (req , res)=>{
    res.send("payment successfull!!!" ,req.body);
})

//failute route
router.get('/payment/fail' , (req , res)=>{
    res.send('Payment Failed !!!', req.body);
    
})

module.exports = router;