// sk_test_51NNozKSBSugSQyZkL6vFP38ReImi0OYBuwwQdaOrgk7lWj9aJGhu4iM33QC8UQesmoZ6HWxCvgSrfO9Wu6OOGliV00MUUtWx8g
//Coffee:price_1NNp6rSBSugSQyZkmiAe8pNp
//camera:price_1NNp91SBSugSQyZkbGVy44Zl
//sunglass:price_1NNp8eSBSugSQyZk6QDtke7J
const express =require('express');
var cors=require('cors');
const stripe=require('stripe')('sk_test_51NNozKSBSugSQyZkL6vFP38ReImi0OYBuwwQdaOrgk7lWj9aJGhu4iM33QC8UQesmoZ6HWxCvgSrfO9Wu6OOGliV00MUUtWx8g')
const app=express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.post("/checkout", async (req, res) => {
    /*
    req.body.items
    [
        {
            id: 1,
            quantity: 3
        }
    ]

    stripe wants
    [
        {
            price: 1,
            quantity: 3
        }
    ]
    */
    // console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item)=> {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));
});
app.listen(4000,()=>
{
    console.log('listening on port 4000');
})