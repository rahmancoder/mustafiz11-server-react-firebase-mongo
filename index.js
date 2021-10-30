const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000;

//middlewire
app.use(cors());
app.use(express.json());



// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.swu9d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


// Without Environement variables
// const uri = 'mongodb+srv://mustafizPractice:qH9d5y2tAs90BDGI@cluster0.gqmhk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

//  With ENV file
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gqmhk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


// with environment variable got bad auth , Authentication failed
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gqmhk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('database connected');

        const database = client.db('MustafizToursimSite');
        const travelCollection = database.collection('MustafizPlaces');

        const bookingCollection = client.db("MustafizToursimSite").collection("booking");

        // const blogCollection = client.db("MustafizToursimSite").collection("blog");

        // GET API

        app.get('/travel', async (req, res) => {
            // res.send('Hello World from education')
            const cursor = travelCollection.find({});
            const toursimdata = await cursor.toArray();
            res.send(toursimdata);
        })

        // GET API FROM Single ID


        // POST API FOR  Add  NEW TravelList

        app.post('/travel', async (req, res) => {
            const travel = req.body;
            console.log('hit the post api', travel);

            const result = await travelCollection.insertOne(travel);
            console.log(result);
            res.json(result)
        });


        // POST API FOR Add Confirm Bookings
        app.post('/booking', async (req, res) => {
            const booking = req.body;
            console.log('hit the post api', booking);

            const result = await bookingCollection.insertOne(booking);
            console.log(result);
            res.json(result)
        });

        // GET API FOR  COnfirm Booking

        app.get('/booking', async (req, res) => {
            // res.send('Hello World from education')
            const cursor = bookingCollection.find({});
            const bookingdata = await cursor.toArray();
            res.send(bookingdata);
        })




        // POST API FOR ADD Travel BLOG

        // GET API FOR Travel BloG

    }
    finally {
        // await client.close()
    }

}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Mustafiz Assignment elevent Toursim delivery site!')
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// Deploument Server link in Heroku
// https://shrouded-eyrie-89480.herokuapp.com/mustafizeducation
//  1. Steps install Heroku CLI 
//  2. heroku login
//  3. heroku create
//-------------------------------
// For continuos integrate and deployment in Heroky CLI
//  4. git push heroku main