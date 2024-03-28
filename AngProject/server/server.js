const express = require('express');
const cors = require('cors');

const oracledb = require('oracledb');


if (process.platform === 'linux') {
    oracledb.initOracleClient({
        libDir: '/opt/oracle/instantclient_21_13',
        configDir: '/home/igor/Programming/Industry/PetProjects/autDBWallet'
    });
}


oracledb.autoCommit = true;


const app = express();
const port = 3000;


let connection


async function connectToDatabase() {
    try {
        connection = await oracledb.getConnection({
            user: 'first_user',
            password: process.env.MYPW,
            connectString: 'autodb_high'
        });

        console.log("Connected to database successfully.");
    } catch (err) {
        console.error("Error connecting to database:", err);
    }
}


async function closeConnection() {
    if (connection) {
        try {
            await connection.close();
            console.log("Database connection closed successfully.");
        } catch (err) {
            console.error("Error closing database connection:", err);
        }
    }
}


async function getDocumentsByQuery(collection_name, query) {
    try {
        const soda = connection.getSodaDatabase();

        collection = await soda.openCollection(collection_name);

        const documents = await collection.find().filter(query).getDocuments();
        const jsonObjects = documents.map(doc => doc.getContent());

        if (jsonObjects.length > 0) {
            return jsonObjects;
        } else {
            return [];
        }
    } catch (err) {
        console.error(err);
        return [];
    }
}


let server;

connectToDatabase().then(async () => {
    server = app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
})


process.on('SIGINT', () => {
    closeServer();
});

async function closeServer() {
    try {
        closeConnection();
        console.log("Connection is closed");
        server.close(() => {
            console.log("Server is closed");
            process.exit(0);
        });
    } catch (err) {
        console.error("Error closing server:", err);
        process.exit(1);
    }
}


app.use(express.json());
app.use(cors())





app.get('/', (req, res) => {
    res.send('Hello, Nodemoon working!');
});


app.get('/get_problem/:course/:topic/:problemId', async (req, res) => {
    try {
        const course = req.params.course;
        const topic = req.params.topic;
        const problemId = req.params.problemId;

        const query = { "id": parseInt(problemId), "course": '/' + course + '/' + topic };
        const problem = await getDocumentsByQuery("mycollection", query);

        res.status(200).json(problem)

    } catch (error) {
        console.error("Error fetching problem:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/get_user/:user_id', async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const query = { "user_id": user_id }
        const user = await getDocumentsByQuery("users", query)
        res.status(200).json(user)

    } catch (error) {
        console.error("Error fetching problem:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
})


async function getAllDocumentsWithKeys(collectionName) {
    try {
        const soda = connection.getSodaDatabase();

        collection = await soda.openCollection(collectionName);

        const docs = await collection.find().getDocuments();

        if (docs.length > 0) {
            const allDocuments = docs.map(doc => {
                return {
                    key: doc.key,
                    content: doc.getContent()
                };
            });
            return allDocuments;
        } else {
            return [];
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}


async function getAllDocumentKeys() {
    try {
        const soda = connection.getSodaDatabase();

        const collection = await soda.openCollection("keys_collection");
        const collection2 = await soda.openCollection("users");

        const keys = await collection.find().getDocuments();

        if (keys.length > 0) {
            return [keys[0].getContent()['keys'], collection2];
        } else {
            return [];
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}


async function getAllDocumentsWithKeysByCourse(collectionName, cur_course) {
    try {
        const soda = connection.getSodaDatabase();

        const collection = await soda.openCollection(collectionName);

        const query = {
            "$query": {
                "course": cur_course
            },
            "$orderby": [
                { "path": "id", "datatype": "number", "order": "asc" }
            ]
        };

        const docs = await collection.find().filter(query).getDocuments();

        if (docs.length > 0) {
            const allDocuments = docs.map(doc => {
                doc_content = doc.getContent();
                return {
                    key: doc.key,
                    content: {
                        "title": doc_content['title'],
                        "course": doc_content['course'],
                        "id": doc_content['id'],
                        "difficulty": doc_content['difficulty'],
                        "video_id": doc_content['video_id']
                    }
                };
            });
            console.log(allDocuments);
            return allDocuments;

        } else {
            return [];
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}


app.post('/create_user/:user_id', async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const result = await getAllDocumentKeys();
        if (result == null || result.length != 2) {
            res.status(500).json({ error: "Wrong result" });
        }
        const [keys, collection] = result;

        const problems = keys.map(cur_problem_key => {
            return {
                "problem_key": cur_problem_key,
                "status": "Not solved",
                "last solutions": []
            }
        });

        const userInfo = { "user_id": user_id, "problems": problems };

        const ins_res = await collection.insertOneAndGet(userInfo);
        if (ins_res) {
            res.status(200).json("OK");
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Internal server error2' });
    }
})


app.get('/get_problems/:course/:topic/', async (req, res) => {
    try {
        const course = req.params.course;
        const topic = req.params.topic;
        const list = await getAllDocumentsWithKeysByCourse("mycollection", '/' + course + '/' + topic);
        res.status(200).json(list);

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})