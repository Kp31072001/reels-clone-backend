import express from 'express'
import mongoose from 'mongoose'
import data from './data.js'
import Videos from './dbModel.js'




//app config
const app = express(); //instance of our app
const port = 9000;

//middleware
app.use(express.json()) //needed to pass a json object
app.use((req, res, next) => {
    res.setHeaders('Access-Control-Allow-Origin', '*'),
    res.setHeaders('Access-Control-Allow-Headers', '*'),
    next()
})

//DB config
const connection_url = 'mongodb+srv://admin:j1k9wtwKr5olvkDb@cluster0.ywy6n.mongodb.net/tiktok?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});

//api endpoints
app.get('/',(req,res) => res.status(200).send('Hello world!!!!'));
app.get('/v1/posts', (req,res) => res.status(200).send(data));


app.post('/v2/posts', (req,res) => {
    //Adding a data to our mongodb
    const dbVideos = req.body

    Videos.create(dbVideos, (err, data) => {
        if (err){
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/v2/posts', (req,res) => {
    Videos.find((err, data) => {
        if (err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

//listen
app.listen(port, () => console.log(`listing on localhost: ${port}`));

// pass :  j1k9wtwKr5olvkDb