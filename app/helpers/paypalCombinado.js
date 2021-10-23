module.exports = {
    client_id: 'AdpKGVt5tw1yLRkg8KJMUAjD87p9hRkCcwMTMSJXWQCUSzwbWov7Lx57Wxk6sGxc2eQ_bgNc7AiirUet',
    client_secret: 'EAFoy7chzi6QGntLRtNte5d8xpJWBflP-IpTtrkXWhzxm_7mpXqnSPcRexCHtowl6-akYhgHuJIhVjhF',
    billingPlan: 'P-8G060401R63730707SGIDE3Y'
};

/*

When you create a App on paypal this App has client_id and client_secret. So you will
need of this to create the plan.

create the plan

var paypal = require('paypal-rest-sdk');
var credentials = require('./paypalCombinado'); // it keep client_id and client_secret
console.log(credentials);
paypal.configure({
    mode: 'sandbox',
    client_id: credentials.client_id,
    client_secret: credentials.client_secret
});

var billingPlanAttribs = {
    name: 'Combinado: Standard',
    description: 'Query Scheduling System.',
    type: 'fixed',
    payment_definitions: [{
        name: 'Standard Plan',
        type: 'REGULAR',
        frequency_interval: '1',
        frequency: 'MONTH',
        cycles: '12',
        amount: {
            currency: 'BRL',
            value: '9.99'
        }
    }],
    merchant_preferences: {
        setup_fee: {
            currency: 'BRL',
            value: '1'
        },
        cancel_url: 'http://combinado.kinghost.net:21095/cancel',
        return_url: 'http://combinado.kinghost.net:21095/processagreement',
        max_fail_attempts: '0',
        auto_bill_amount: 'YES',
        initial_fail_amount_action: 'CONTINUE'
    }
};

paypal.billingPlan.create(billingPlanAttribs, function(error, billingPlan) {
    var billingPlanUpdateAttributes;

    if (error) {
        console.error(JSON.stringify(error));
        throw error;
    } else {
        // Create billing plan patch object
        billingPlanUpdateAttributes = [{
            op: 'replace',
            path: '/',
            value: {
                state: 'ACTIVE'
            }
        }];

        // Activate the plan by changing status to active
        paypal.billingPlan.update(billingPlan.id, billingPlanUpdateAttributes, function(error, response) {
            if (error) {
                console.error(JSON.stringify(error));
                throw error;
            } else {
                console.log('response: ', response);
                console.log('Billing plan created under ID: ' + billingPlan.id);
            }
        });
    }
});
// Plan created
// response:  { httpStatusCode: 200 }
// Billing plan created under ID: P-8G060401R63730707SGIDE3Y

you need of plan id to create billing agreements. So you need keep it

Create a billing agreement:

var paypal = require('paypal-rest-sdk');
    const credentials = application.app.helpers.paypalCombinado;
    paypal.configure({
        mode: 'sandbox',
        client_id: credentials.client_id,
        client_secret: credentials.client_secret
    });

    var billingPlan = credentials.billingPlan; // plan id
    var billingAgreementAttributes;
    var isoDate = new Date();

    isoDate.setSeconds(isoDate.getSeconds() + 4);
    isoDate.toISOString().slice(0, 19) + 'z';

    billingAgreementAttributes = {
        name: 'Standart Membershit',
        description: 'Combinado Club Standard Membership',
        start_date: isoDate,
        plan: {
            id: billingPlan
        },
        payer: {
            payment_method: 'paypal'
        }
    };

    var links = {};

    paypal.billingAgreement.create(billingAgreementAttributes, function(error, billingAgreement) {
        if (error) {
            console.error(JSON.stringify(error));
            res.json(error);
        } else {
            // Capture HATEOAS links
            billingAgreement.links.forEach(linkObj => {
                links[linkObj.rel] = {
                    href: linkObj.href,
                    method: linkObj.method
                };
            });
            // If redirect url present, redirect user
            if (links.hasOwnProperty('approval_url')) {
                //REDIRECT USER TO links['approval_url'].href
                console.log('redirect to: ', links['approval_url'].href);
                res.redirect(links['approval_url'].href);
            } else {
                res.send('No links receiveds');
            }
        }
    });

*/