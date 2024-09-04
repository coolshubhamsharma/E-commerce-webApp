
const mongoose = require('mongoose');

const Product = require ('./models/Product');

const products = [
    {
        name:"Iphone 14Pro",
        img:"https://unsplash.com/photos/a-close-up-of-a-cell-phone-on-a-table--8TXkj60yd8",
        price:130000,
        desc:"aukaat ke bahar",
    },
    {
        name:"macbook",
        img:"https://plus.unsplash.com/premium_photo-1671247953201-2fdc17af6692?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D",
        price:250000,
        desc:"ye bhi aukaat ke bahar"
    },
    {
        name:"Iwatch",
        img:"https://images.unsplash.com/photo-1517420879524-86d64ac2f339?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price:51000,
        desc:"yahan ke ham sikandar"
    },
    {
        name:"Ipad Pro",
        img:"https://unsplash.com/photos/black-tablet-computer-on-gray-textile-doTjbfxrmRw",
        price:250000,
        desc:"yahan ke bhi ham hi sikandar"
    },
    {
        name:"airpods",
        img:"https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price:12000,
        desc:"sasta hai lelo"

    }
]

async function seedDB(){
    await Product.insertMany(products);
    // .then(()=>{
    //     console.log('seeded')
    // })
    // .catch(()=>{
    //     console.log('seeding uncessfull')
    // });
    console.log('Data seeded successfully');
}

module.exports = seedDB;

