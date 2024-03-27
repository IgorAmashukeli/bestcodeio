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


async function getDocumentsByQuery(query) {
    try {
        const soda = connection.getSodaDatabase();

        collection = await soda.openCollection("mycollection");

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
        const problem = await getDocumentsByQuery(query);

        res.status(200).json(problem)

    } catch (error) {
        console.error("Error fetching problem:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

