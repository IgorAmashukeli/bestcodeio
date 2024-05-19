const { MongoClient, ObjectId } = require("mongodb");

async function connect(client) {
    try {
        await client.connect();
        console.log("Connected to Cosmos DB");
    } catch (err) {
        console.error("Error connecting to Cosmos DB:", err);
    }
}


async function disconnect(client) {
    try {
        await client.close();
        console.log("Disconnected from Cosmos DB");
    } catch (err) {
        console.error("Error disconnecting to Cosmos DB:", err);
        process.exit(1);
    }
}


async function getDatabase(client, databaseName) {
    try {
        const database = await client.db(databaseName);
        return database;
    } catch (err) {
        console.error("Error creating/finding database:", err);
    }
}


async function getCollection(db, collectionName) {
    try {
        const collection = await db.collection(collectionName);
        return collection;
    } catch (err) {
        console.error("Error creating/finding collection:", err);
    }
}


async function getAllDocuments(collection) {
    try {
        const documents = await collection.find({}).toArray();
        return documents;
    } catch(err) {
        console.error("Error retrieving all documents from collection", err);
    }
}


async function insertDocument(collection, document) {
    try {
        const _ = await collection.insertOne(document);
    } catch (err) {
        console.error("Error inserting the document into the collection", err);
    }
}

async function getDocumentByKey(collection, key) {
    try {
        const document = await collection.findOne({ _id: ObjectId.createFromHexString(key) });
        if (!document) {
            console.log("No document with this key");
            return {};
        }
        return document;
    } catch (err) {
        console.error("Error retrieving the document by key", err);
    }
}

async function getDocumentbyQuery(collection, query) {
    try {
        const document = await collection.findOne(query);
        if (!document) {
            console.log("No document with this query");
            return {};
        }
        return document;
    } catch (err) {
        console.error("Error retrieving the document by the query", err);
    }
}

async function getDocumentsByQuery(collection, query) {
    try {
        const documents = await collection.find(query).toArray();
        return documents;
    } catch (err) {
        console.error("Error retrieving the documents by the query", err);
    }
}

async function updateDocumentByKey(collection, key, set_document, unset_document) {
    try {
        const _ = await collection.updateOne({ _id: ObjectId.createFromHexString(key) },
         {$set : set_document, $unset : unset_document})
    } catch (err) {
        console.error("Error updating the document by key", err);
    }
}

async function updateDocumentByQuery(collection, query, set_document, unset_document) {
    try {
        const _ = await collection.updateOne(query, {$set : set_document, $unset : unset_document});
    } catch (err) {
        console.error("Error updating the document by the query", err);
    }
}

async function updateDocumentsByQuery(collection, query, set_document, unset_document) {
    try {
        const _ = await collection.updateMany(query, {$set : set_document, $unset : unset_document});
    } catch (err) {
        console.error("Error updating the documents by the query", err);
    }
}



async function deleteDocumentByKey(collection, key) {
    try {
        const _ = await collection.deleteOne({ _id: ObjectId.createFromHexString(key) });
    } catch (err) {
        console.error("Error deleting the document by key", err);
    }
}


async function deleteDocumentByQuery(collection, query) {
    try {
        const _ = await collection.deleteOne(query);
    } catch (err) {
        console.error("Error deleting the document by the query", err);
    }
}


async function deleteDocumentsByQuery(collection, query) {
    try {
        const _ = await collection.deleteMany(query);
    } catch (err) {
        console.error("Error deleting the documents by the query", err);
    }
}

const uri = "mongodb+srv://IgorAmashukeli:*Rb$XUFbXrrjr9a@cosmosclusteramashukeli.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000";
const client = new MongoClient(uri);
const database_name = "BestCode";
const collection_name = ["Users", "Problems", "ProblemKeys"];


function add_lines(array_str) {
    return array_str.join('\n\n');
}


connect(client).then (async() => {
    const db = await getDatabase(client, "BestCode");
    const collection = await getCollection(db, "Users");
    const documents = await getAllDocuments(collection);
    console.log(documents);

    await disconnect(client);
})