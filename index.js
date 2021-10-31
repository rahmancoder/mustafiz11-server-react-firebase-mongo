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

        const blogCollection = client.db("MustafizToursimSite").collection("blog");

        // GET API

        app.get('/travel', async (req, res) => {
            // res.send('Hello World from education')
            const cursor = travelCollection.find({});
            const toursimdata = await cursor.toArray();
            res.send(toursimdata);
        })

        // GET API FROM Single ID
        app.get('/travel/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const travel = await travelCollection.findOne(query);
            // console.log('load user with id: ', id);
            res.send(travel);
        })

        // POST API FOR  Add  NEW TravelList

        app.post('/travel', async (req, res) => {
            const travel = req.body;
            console.log('hit the post api', travel);

            const result = await travelCollection.insertOne(travel);
            console.log(result);
            res.json(result)
        });




        // GET API FOR  COnfirm Booking

        app.get('/booking', async (req, res) => {
            // res.send('Hello World from booking')
            const cursor = bookingCollection.find({});
            const bookingdata = await cursor.toArray();
            res.send(bookingdata);
        })

        // GET API for Booking ID only
        app.get('/booking/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const booking = await bookingCollection.findOne(query);
            // console.log('load user with id: ', id);
            res.send(booking);
        })

        // POST API FOR Add Confirm Bookings
        app.post('/booking', async (req, res) => {
            const booking = req.body;
            console.log('hit the post api', booking);

            const result = await bookingCollection.insertOne(booking);
            console.log(result);
            res.json(result)
        });


        // DELETE BOOKING

        // app.delete("/booking/:id", async (req, res) => {
        //     console.log(req.params.id);
        //     const result = await bookingCollection.deleteOne({
        //         _id: ObjectId(req.params.id),
        //     });
        //     res.send(result);
        // });

        app.delete('/booking/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await bookingCollection.deleteOne(query);

            console.log('deleting user with id ', result);

            res.json(result);
        })







        // POST API FOR ADD Travel BLOG

        // GET API FOR Travel BloG

        // GET API

        app.get('/blog', async (req, res) => {
            // res.send('Hello World from education')
            const cursor = blogCollection.find({});
            const blogdata = await cursor.toArray();
            res.send(blogdata);
        })

        // GET API FROM Single ID
        app.get('/blog/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const blog = await blogCollection.findOne(query);
            // console.log('load user with id: ', id);
            res.send(blog);
        })

        // POST API FOR  Add  NEW TravelList

        app.post('/blog', async (req, res) => {
            const blog = req.body;
            console.log('hit the post api', blog);

            const result = await blogCollection.insertOne(blog);
            console.log(result);
            res.json(result)
        });






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