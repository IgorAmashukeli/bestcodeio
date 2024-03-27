const express = require('express');

const oracledb = require('oracledb');


if (process.platform === 'linux') {
    oracledb.initOracleClient({
        libDir: '/opt/oracle/instantclient_21_13',
        configDir: '/home/igor/Programming/Industry/PetProjects/autDBWallet'
    });
}


oracledb.autoCommit = true;


const app = express();
app.use(express.json());


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



async function getAllDocumentsWithKeys() {
    try {
        const soda = connection.getSodaDatabase();

        collection = await soda.openCollection("mycollection");

        const docs = await collection.find().getDocuments();

        if (docs.length > 0) {
            const allDocuments = docs.map(doc => {
                return {
                    key: doc.key,
                    content: doc.getContent()
                };
            });
            console.log("All documents with keys retrieved successfully:", allDocuments);
            return allDocuments;
        } else {
            console.log("No documents found in the collection.");
            return [];
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}



async function addNewDocument(content) {
    try {
        const soda = connection.getSodaDatabase();

        collection = await soda.openCollection("mycollection");

        const doc = await collection.insertOneAndGet(content);

        if (doc) {
            console.log("New document added successfully.");
            return doc.key;
        } else {
            console.log("Failed to add new document.");
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}



async function deleteDocumentByKey(key) {
    try {
        const soda = connection.getSodaDatabase();

        collection = await soda.openCollection("mycollection");

        await collection.find().key(key).remove();

        console.log("Document deleted successfully.");
    } catch (err) {
        console.error(err);
    }
}


function add_lines(array_str) {
    return array_str.join('\n\n');
}

function add_br(array_str) {
    return array_str.join('<br>');
}


const document = {
    id: 0,
    course: '/programming/dsa',
    title: 'Sample template problem',
    difficulty: 'Easy',
    video_id: 'y3svPgyGnLc',
    accepted: 0,
    submitted: 0,
    description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return <b>n + k</b>',
    examples: [
        '\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: 3<br>\t<b><b>Explanation</b></b>: n + k = 1 + 2 = 3',
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: 4<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: 6<br>',
    ],
    constraints: ['1 <= n <= 3', '2 <= k <= 4'],
    note: '<b><b>Follow up</b></b>: Can you do it in <b>O(1)</b>?',
    languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
    ],
    initial_codes: {
        cpp: '#include <iostream>\n\nint summa(int n, int k) {\n    // your code here\n}\n\nint main() {\n    // your code here\n}',
        python: '#your code here:\ndef my_function(n, k):\n    return 0',
        javascript:
            '//your code here\nfunction myFunction(n, k) {\n\n    return 0;\n}',
        java: '//your code here\npublic class MyClass {\n    public static void myFunction(int n, int k) {\n        // Your Java code here\n        return 0;\n    }\n\n    public static void main(String[] args) {}\n}',
    },
    initial_language: 'cpp',
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


connectToDatabase()
    .then(async () => {
        await addNewDocument(document);
        await getAllDocumentsWithKeys();
        await closeConnection();
    })
    .catch(err => {
        console.error(err);
    });



