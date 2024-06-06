const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

//data in resources page
const url = 'mongodb+srv://supradeept07:YbW1QSfQzAW7XpuY@resourcesfordept.kgdzo35.mongodb.net/?retryWrites=true&w=majority&appName=resourcesfordept';
const dbName = 'resourcesfordept';

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
var database;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected successfully to server");

    database = client.db(dbName);

    app.listen(port, () => {
      console.log(`Server running at http://localhost:3000/`);
    });

  } catch (e) {
      console.error(e);
  }
}

connectToDatabase();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/:departmentId', async (req, res) => {

  const collection = database.collection('cse');
  const departmentId = req.params.departmentId;
  try {
    const document = await collection.findOne({});
  
    const dept_data = document[departmentId];;
    if (dept_data) {
      res.json(dept_data);
    } else {
      res.status(404).send('Document not found');
    }
  } catch (err) {
    console.error('Error retrieving data:', err);
    res.status(500).send('Error retrieving data');
  }
});


// Announcements
app.get('/', async (req, res) => {
  const collection = database.collection('announcements');
  try {
      const documents = await collection.find().toArray();
      res.json(documents);
  } catch (err) {
      console.error('Error retrieving data:', err);
      res.status(500).send('Error retrieving data');
  }
});

//Admin login
app.get('/login/:username/:password', async (req, res) => {
  const { username, password } = req.params; // Extract path parameters
  try {
    const collection = database.collection('admin_login');
    const user = await collection.findOne({ username, password });

    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
});

app.delete('/delete', async (req, res) => {
  const titles = req.body;
  const collection = database.collection('announcements');
  try {
    const deletePromises = titles.map(titleObj => 
      collection.deleteOne({ title: titleObj.title })
  );
      await Promise.all(deletePromises);
      res.status(200).send({ message: 'Documents deleted successfully' });
  } catch (error) {
      res.status(500).send({ message: 'Error deleting documents', error });
  }
});

app.post('/insert', async (req, res) => {
  const postData = req.body;

  const collection = database.collection('announcements');
  
  try {
      await collection.insertOne(postData);
      res.status(201).send({ message: 'Documents inserted successfully' });
  } catch (error) {
      res.status(500).send({ message: 'Error inserting documents', error });
  }
});


