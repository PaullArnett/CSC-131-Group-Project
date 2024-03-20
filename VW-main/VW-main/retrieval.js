const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const path = require('path');
const cors = require('cors');

const app = express();

const mongoURI = 'mongodb+srv://jonmichaeldelemos:go22HHane5J8xFWE@cluster0.stcij7x.mongodb.net/SSVOL1';
const dbName = 'SSVOLV1';
const collectionName = 'Users';

app.use(cors());
app.use(bodyParser.json());

app.post('/add-element', async (req, res) => {
  try {
      const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();

      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      const { _id, approvalValue } = req.body;

      // Update the document based on the approvalValue
      const updateField = approvalValue === 'Approved' ? 'approval' : 'denial';

      // Check if the document with the given _id exists
      const existingDoc = await collection.findOne({ _id: new ObjectId(_id) });

      // Determine the field to update based on the approvalValue
      const updateData = { $set: { [updateField]: approvalValue } };

      // Update the document based on whether the field exists
      const result = existingDoc
          ? await collection.findOneAndUpdate({ _id: new ObjectId(_id) }, updateData, { returnDocument: 'after' })
          : await collection.insertOne({ _id: new ObjectId(_id), ...updateData });

      client.close();

      res.json({ success: true, result });
  } catch (error) {
      console.error('Error updating/inserting element in MongoDB:', error);
      res.status(500).json({ error: 'Error updating/inserting element in MongoDB' });
  }
});


// Serve static files from the 'test' directory
app.use('/admin', express.static(path.join(__dirname, 'admin'), { extensions: ['html', 'css', 'png'] }));

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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'adminsee.html'));
});









const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
