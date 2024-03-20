const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const uri =
  'mongodb+srv://jonmichaeldelemos:go22HHane5J8xFWE@cluster0.stcij7x.mongodb.net/SSVOL1';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


document.getElementById('description').textContent = wrapText(item.description, 84);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

run().catch(console.dir);

// Middleware for handling CORS preflight requests
app.options('/submit', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://jdelemos.github.io');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.status(200).send();
});

// Serve static files from the root directory
app.use(express.static(__dirname));

// Handle requests to the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/event.html');
});

// Handle CORS preflight and POST request to submit data
app.route('/submit')
  .options((req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://jdelemos.github.io');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).send();
  })
  .post(async (req, res) => {
    const data = req.body;

    try {
      // Insert data into MongoDB
      const result = await client.db('SSVOLV1').collection('Events').insertOne(data);
      console.log('Insert result:', result);

      if (result.insertedCount === 1) {
        console.log('Data inserted successfully');
        res.send('Data inserted successfully');
      } else {
        console.log('Data not inserted successfully:', result);
        res.status(500).send('Data not inserted successfully');
      }
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).send('Internal Server Error');
    }
  });

// Handle request to fetch data
app.get('/data', async (req, res) => {
  try {
    const db = client.db('SSVOLV1');
    const collection = db.collection('Events');
    const data = await collection.find().toArray();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
