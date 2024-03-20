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

app.get('/data', async (req, res) => {
  try {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true });
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const data = await collection.find().toArray();

    res.json(data);

    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.route('/delete-event')
  .options((req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://jdelemos.github.io');
    res.header('Access-Control-Allow-Methods', 'DELETE');
    res.status(200).send();
  })
  .delete(async (req, res) => {
    const eventIdToDelete = req.query.eventId;

    try {
      const db = client.db('SSVOLV1');
      const collection = db.collection('Events');

      // Check if the event exists before deletion
      const existingEvent = await collection.findOne({ eventId: eventIdToDelete });

      if (existingEvent) {
        // Delete the event with the given eventId
        const deleteResult = await collection.deleteOne({ eventId: eventIdToDelete });

        if (deleteResult.deletedCount === 1) {
          console.log('Event deleted successfully');
          res.status(200).send('Event deleted successfully');
        } else {
          console.log('Failed to delete event:', deleteResult);
          res.status(500).send('Failed to delete event');
        }
      } else {
        console.log('Event not found');
        res.status(404).send('Event not found');
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });


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
// Handle CORS preflight and POST request to submit data for user information
app.route('/user-submit')
  .options((req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://jdelemos.github.io');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).send();
  })
  .post(async (req, res) => {
    const data = req.body;
    try {
      
      // Convert googleId to the appropriate type if needed, e.g., ObjectId
      googleId = data.userId;
      console.log(googleId)
      const existingUser = await client.db('SSVOLV1').collection('Users').findOne({ userId: googleId });
    
      if (existingUser) {
        // If a user with the same Google ID exists, delete the record
        const deleteResult = await client.db('SSVOLV1').collection('Users').deleteOne({ userId: googleId });
        console.log('Delete result:', deleteResult);
    
        if (deleteResult.deletedCount === 1) {
          console.log('Existing record deleted successfully');
        } else {
          console.log('Failed to delete existing record:', deleteResult);
        }
      }
    
      // Insert data into MongoDB
      const result = await client.db('SSVOLV1').collection('Users').insertOne(data);
      console.log('Insert result:', result);
    
      if (result.insertedCount === 1) {
        console.log('Data inserted successfully');
        res.send('Data inserted successfully');
      } else {
        console.log('Data not inserted successfully:', result);
        res.status(500).send('Data not inserted successfully');
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });

//// Handle CORS preflight and POST request to retrieve data for user information
app.get('/user-data', async (req, res) => {
  // Assuming the Google ID is sent in the request body with the key 'googleId'
  const googleId = req.query.userId;
  console.log(googleId)
  
  try {
    const db = client.db('SSVOLV1');
    const collection = db.collection('Users');

    // Find the user document based on Google ID
    const userDocument = await collection.findOne({ userId: googleId });

    // Check if the user document was found
    if (userDocument) {
      res.json(userDocument);
    } else {
      // Handle the case where no user is found
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//// Handle CORS preflight and POST request to retrieve data for user information
app.get('/event-data', async (req, res) => {
  // Assuming the Google ID is sent in the request body with the key 'googleId'
  const eventId = req.query.eventId;
  console.log(eventId)
  
  try {
    const db = client.db('SSVOLV1');
    const collection = db.collection('Events');

    // Find the user document based on Google ID
    const userDocument = await collection.findOne({ eventId: eventId });

    // Check if the user document was found
    if (userDocument) {
      res.json(userDocument);
    } else {
      // Handle the case where no user is found
      res.status(404).send('Event not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Handle CORS preflight and POST request to submit data for event creation
app.route('/event-submit')
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

// Handle request to fetch Event Data
app.get('/events-data', async (req, res) => {
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

app.route('/apply')
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
      const result = await client.db('SSVOLV1').collection('Applications').insertOne(data);
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

  app.get('/apply-data', async (req, res) => {
    const googleId = req.query.userId;
    const eventId = req.query.eventId;
    try {
        const db = client.db('SSVOLV1');
        const collection = db.collection('Applications');
        const data = await collection.find({ userId: googleId, eventId: eventId }).toArray();
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

app.get('/application-data', async (req, res) => {
  // Assuming the event ID is sent in the request query parameters with the key 'eventId'
  const eventId = req.query.eventId;

  try {
    const db = client.db('SSVOLV1');
    const collection = db.collection('Applications');

    // Find all application documents based on event ID
    const applicationDocuments = await collection.find({ eventId: eventId }).toArray();

    // Check if any application documents were found
    if (applicationDocuments.length) {
      res.json(applicationDocuments);
    } else {
      // Handle the case where no applications are found
      res.status(404).send('No applications found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.route('/accept')
  .options((req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://jdelemos.github.io');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).send();
  })
  .post(async (req, res) => {
    const data = req.body;
    try {
      const googleId = data.userId;
      const eventId = data.eventId;

      // Check if an application with the same userId and eventId exists
      const existingApplication = await client
        .db('SSVOLV1')
        .collection('Applications')
        .findOne({ userId: googleId, eventId: eventId });

      if (existingApplication) {
        // Update existing application
        await client
          .db('SSVOLV1')
          .collection('Applications')
          .updateOne({ userId: googleId, eventId: eventId }, { $set: { status: 'accepted' } });

        res.status(200).send('Application status updated to accepted');
      } else {
        // Create a new application if it doesn't exist
        await client
          .db('SSVOLV1')
          .collection('Applications')
          .insertOne({ userId: googleId, eventId: eventId, status: 'accepted' });

        res.status(200).send('Application created and status updated to accepted');
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.route('/deny')
  .options((req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://jdelemos.github.io');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).send();
  })
  .post(async (req, res) => {
    const data = req.body;
    try {
      const googleId = data.userId;
      const eventId = data.eventId;

      // Check if an application with the same userId and eventId exists
      const existingApplication = await client
        .db('SSVOLV1')
        .collection('Applications')
        .findOne({ userId: googleId, eventId: eventId });

      if (existingApplication) {
        // Update existing application
        await client
          .db('SSVOLV1')
          .collection('Applications')
          .updateOne({ userId: googleId, eventId: eventId }, { $set: { status: 'denied' } });

        res.status(200).send('Application status updated to denied');
      } else {
        // Create a new application if it doesn't exist
        await client
          .db('SSVOLV1')
          .collection('Applications')
          .insertOne({ userId: googleId, eventId: eventId, status: 'denied' });

        res.status(200).send('Application created and status updated to denied');
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/admin-check', async (req, res) => {
    const googleId = req.query.userId;
    console.log(googleId);
    
    try {
        const db = client.db('SSVOLV1');
        const collection = db.collection('Admins');

        // Find the user document based on Google ID
        const userDocument = await collection.findOne({ userId: googleId });

        // Check if the user document was found and if they are an admin
        if (userDocument) {
            res.json({ isAdmin: true });
        } else {
            res.json({ isAdmin: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/user-check', async (req, res) => {
  const googleId = req.query.userId;
  console.log('Checking user for Google ID:', googleId);
  
  try {
      const db = client.db('SSVOLV1');
      const collection = db.collection('Users');

      // Find the user document based on Google ID
      const userDocument = await collection.findOne({ userId: googleId });

      // Check if the user document was found
      if (userDocument) {
          res.json({ isUser: true });
      } else {
          console.log(`No user found with Google ID: ${googleId}`);
          res.json({ isUser: false });
      }
  } catch (error) {
      console.error('Error while checking user:', error);
      res.status(500).send('Internal Server Error');
  }
});

//user apply data
app.get('/user-apply-data', async (req, res) => {
  const googleId = req.query.userId;
  console.log('Checking user for Google ID:', googleId);

  try {
      const db = client.db('SSVOLV1');
      const collection = db.collection('Applications');

      // Find the user document based on Google ID
      const userDocuments = await collection.find({ userId: googleId }).toArray();

      // Check if any documents were found
      if (userDocuments) {
          res.json(userDocuments);
      } else {
          console.log(`No user found with Google ID: ${googleId}`);
          res.status(404).json({ message: "No applications found for this user" });
      }
  } catch (error) {
      console.error('Error while checking user:', error);
      res.status(500).send('Internal Server Error');
  }
});

