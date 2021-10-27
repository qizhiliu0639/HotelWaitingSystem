const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/waitlist';

async function testWithAddCuntomer() {
    console.log('\n--- testWithAddCuntomer ---');
    const client = new MongoClient(url, { useNewUrlParser: true });
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db();
        const collection = db.collection('waitlist');

        const customer = { id: 5, name: 'Jackson', phoneNumber: '101112' , date : new Date('2019-05-15')};
        const result = await collection.insertOne(customer);
        console.log('Result of insert:\n', result.insertedId);

        const docs = await collection.find({ _id: result.insertedId })
        .toArray();
        console.log('Result of find:\n', docs);
    } catch(err) {
        console.log(err);
    } finally {
        client.close();
    }
}

async function testWithDeleteCustomer() {
    console.log('\n--- testWithListAllCustomer ---');
    const client = new MongoClient(url, { useNewUrlParser: true });
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db();
        const collection = db.collection('waitlist');

        const result = await collection.deleteOne({id : 1});
        console.log('Delete Customer\n');
        const docs = await collection.find()
        .toArray();
        console.log('Result of find:\n', docs);
    } catch(err) {
        console.log(err);
    } finally {
        client.close();
    }
}

async function testWithListAllCustomer() {
    console.log('\n--- testWithDeleteCustomer ---');
    const client = new MongoClient(url, { useNewUrlParser: true });
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db();
        const collection = db.collection('waitlist');
        const docs = await collection.find()
        .toArray();
        console.log('Result of find:\n', docs);
    } catch(err) {
        console.log(err);
    } finally {
        client.close();
    }
}

testWithAddCuntomer();
testWithListAllCustomer();
testWithDeleteCustomer();