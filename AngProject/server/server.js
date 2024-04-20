const express = require('express');
const cors = require('cors');
const Docker = require('dockerode');
const fs = require('fs');


const docker = new Docker();

const volumePath = '/home/igor/Programming/Industry/PetProjects/bestcodeio/AngProject/server';

const containerPath = '/data'

const oracledb = require('oracledb');
const { get } = require('http');

let some_theorems = ""

let container = '';


function checkContainersForImage(imageName, callback) {
    docker.listContainers({ all: true }, function (err, containers) {
        if (err) {
            callback(err, null);
            return;
        }

        const containerWithImage = containers.some(c => c.Image === imageName);
        if (containerWithImage) {
            const existingContainer = containers.find(c => c.Image === imageName);
            container = docker.getContainer(existingContainer.Id);
        }

        callback(null, containerWithImage);
    });
}


async function runLEANContainer(data) {
    code = data["code"]
    required_theorems = data["required_theorems"]

    fs.writeFileSync(`${volumePath}/test.lean`, code);

    return new Promise((resolve, reject) => {
        checkContainersForImage('lean_image', async function (err, containerExists) {
            if (err) {
                console.error('Error checking containers for image:', err);
                reject(err);
                return;
            }

            if (!containerExists) {
                try {
                    const newContainer = await docker.createContainer({
                        Image: 'lean_image',
                        Tty: true,
                        AttachStdout: true,
                        AttachStderr: true,
                        HostConfig: {
                            Binds: [`${volumePath}:${containerPath}`],
                        },
                    });

                    container = newContainer;

                    await container.start();

                    const result = await executeLeanCommandWithTimeout(code, required_theorems, 1);
                    resolve(result);
                } catch (error) {
                    console.error('Error creating or starting container:', error);
                    reject(error);
                }
            } else {
                try {
                    await container.restart();
                    const result = await executeLeanCommandWithTimeout(code, required_theorems, 1);
                    resolve(result);
                } catch (error) {
                    console.error('Error restarting container:', error);
                    reject(error);
                }
            }
        });
    });
}


function check_including(code, required_theorems) {
    for (const theorem of required_theorems) {
        if (!code.includes(theorem)) {
            some_theorems = theorem;
            return false;
        }
    }

    return true;
}


function getTime() {
    var currentDate = new Date();

    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');

    var hours = currentDate.getHours().toString().padStart(2, '0');
    var minutes = currentDate.getMinutes().toString().padStart(2, '0');
    var seconds = currentDate.getSeconds().toString().padStart(2, '0');

    var currentDateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

    return currentDateTime;
}


async function executeLeanCommandWithTimeout(code, required_theorems, timeoutSeconds) {
    return new Promise((resolve, reject) => {
        const command = ['sh', '-c', `output=$(timeout ${timeoutSeconds}s lean /data/test.lean; timeout_exit_code=$?; if [ $timeout_exit_code -eq 124 ]; then echo "TIMEOUT"; fi); echo "$output"`];
        container.exec({
            Cmd: command,
            AttachStdout: true,
            AttachStderr: true
        }, function (err, exec) {
            if (err) {
                console.error('Error executing lean command:', err);
                reject(err);
                return;
            }

            exec.start(function (err, stream) {
                if (err) {
                    console.error('Error starting lean command:', err);
                    reject(err);
                    return;
                }

                let leanOutput = '';

                stream.on('data', function (chunk) {
                    leanOutput += chunk.toString();
                });


                stream.on('end', function () {
                    if (leanOutput.replace(/[^\x20-\x7E]/g, "").replace(/\s/g, "") === "TIMEOUT") {
                        resolve({ "status": 'TL', "log": 'Time Limit Exceeded' });
                    } else {
                        if (leanOutput.includes('error')) {
                            resolve({ "status": 'WP', "log": 'Wrong Proof:' + leanOutput.trim() });
                        } else if (leanOutput.includes('sorry')) {
                            resolve({ "status": 'MP', "log": 'Missing Proof:' + leanOutput.trim() });
                        } else {
                            if (check_including(code, required_theorems)) {
                                resolve({ "status": 'OK', "log": 'OK! All theorems are proved' });
                            } else {
                                resolve({ "status": 'MP', "log": 'Missing Proof: No "' + some_theorems + '" found' });
                            }
                        }
                    }
                });
            });
        });
    });
}






async function runCppContainer(data) {
    code = data["code"]
    extra_flag = data["extra_flag"]

    fs.writeFileSync(`${volumePath}/test.cpp`, code);

    return new Promise((resolve, reject) => {
        checkContainersForImage('gcc', async function (err, containerExists) {
            if (err) {
                console.error('Error checking containers for image:', err);
                reject(err);
                return;
            }

            if (!containerExists) {
                try {
                    const newContainer = await docker.createContainer({
                        Image: 'gcc',
                        Tty: true,
                        AttachStdout: true,
                        AttachStderr: true,
                        HostConfig: {
                            Binds: [`${volumePath}:${containerPath}`],
                        },
                    });

                    container = newContainer;

                    await container.start();

                    const result = await compileCppCommand(extra_flag);
                    resolve(result);
                } catch (error) {
                    console.error('Error creating or starting container:', error);
                    reject(error);
                }
            } else {
                try {
                    await container.restart();
                    const result = await compileCppCommand(extra_flag);
                    resolve(result);
                } catch (error) {
                    console.error('Error restarting container:', error);
                    reject(error);
                }
            }
        });
    });
}





async function compileCppCommand(extra_flag) {
    return new Promise((resolve, reject) => {
        const command = ['sh', '-c', `g++ --std=c++20 -Wall -Wextra -Werror ${extra_flag} /data/test.cpp`];
        container.exec({
            Cmd: command,
            AttachStdout: true,
            AttachStderr: true
        }, function (err, exec) {
            if (err) {
                console.error('Error compiling c++ code:', err);
                reject(err);
                return;
            }

            exec.start(function (err, stream) {
                if (err) {
                    console.error('Error compiling c++ code:', err);
                    reject(err);
                    return;
                }

                let compileCppCommand = '';

                stream.on('data', function (chunk) {
                    compileCppCommand += chunk.toString();
                });


                stream.on('end', function () {
                    resolve({ 'compile_logs': compileCppCommand });
                });
            });
        });
    });
}



async function executeCppCommandWithTimeout(code, timeoutSeconds) {
    return new Promise((resolve, reject) => {
        const command = ['sh', '-c', `output=$(timeout ${timeoutSeconds}s ./a.out; timeout_exit_code=$?; if [ $timeout_exit_code -eq 124 ]; then echo "TIMEOUT"; fi); echo "$output"`];
        container.exec({
            Cmd: command,
            AttachStdout: true,
            AttachStderr: true
        }, function (err, exec) {
            if (err) {
                console.error('Error executing cpp code:', err);
                reject(err);
                return;
            }

            exec.start(function (err, stream) {
                if (err) {
                    console.error('Error starting cpp code:', err);
                    reject(err);
                    return;
                }

                let cppOutput = '';

                stream.on('data', function (chunk) {
                    cppOutput += chunk.toString();
                });


                stream.on('end', function () {
                    if (cppOutput.replace(/[^\x20-\x7E]/g, "").replace(/\s/g, "") === "TIMEOUT") {
                        resolve({ "status": 'TL', "log": 'Time Limit Exceeded' });
                    } else {
                        if (cppOutput.includes('WA')) {
                            resolve({ "status": 'WA', "log": 'Wrong Solution: ' + cppOutput.trim() });
                        } else if (cppOutput.includes('OK')) {
                            resolve({ "status": 'OK', "log": 'OK! All testcases passed' });
                        } else {
                            resolve({ "status": 'RE', "log": 'RE' + cppOutput.trim() })
                        }
                    }
                });
            });
        });
    });
}







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


async function getDocumentKeysByQuery(collection_name, query) {
    try {
        const soda = connection.getSodaDatabase();

        collection = await soda.openCollection(collection_name);

        const documents = await collection.find().filter(query).getDocuments();
        const jsonObjects = documents.map(doc => doc.key);

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


async function getDocumentAndKeysByQuery(collection_name, query) {
    try {
        const soda = connection.getSodaDatabase();

        collection = await soda.openCollection(collection_name);

        const documents = await collection.find().filter(query).getDocuments();
        const jsonObjects = documents.map(doc => [doc.key, doc.getContent()]);

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

        let userInfo_result = {};

        keys.forEach(key => {
            userInfo_result[key] = {
                "status": "Not solved",
                "last solutions": []
            };
        });

        const userInfo = { "user_id": user_id, "problems": userInfo_result };

        const ins_res = await collection.insertOneAndGet(userInfo);
        if (ins_res) {
            res.status(200).json(ins_res);
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Internal server error2' });
    }
})



async function updateDocumentByKey(collection_name, key, updatedContent) {
    try {
        const soda = connection.getSodaDatabase();
        const collection = await soda.openCollection(collection_name);
        const doc = await collection.find().key(key).getOne();

        if (doc) {
            const updatedDoc = await collection.find().key(key).replaceOneAndGet(updatedContent);

            if (updatedDoc) {
                return true;
            } else {
                return false;
            }
        } else {
            console.log("Document with key", key, "not found.");
            return false;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
}



app.get('/get_problems/:course/:topic', async (req, res) => {
    try {
        const course = req.params.course;
        const topic = req.params.topic;
        const list = await getAllDocumentsWithKeysByCourse("mycollection", '/' + course + '/' + topic);
        res.status(200).json(list);

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})



app.post('/submit_math/:topic/:problem_id', async (req, res) => {
    try {
        const code = req.body;
        const topic = req.params.topic;
        const problemId = req.params.problem_id;

        const query = { "id": parseInt(problemId), "course": '/' + 'math' + '/' + topic };
        const problems = await getDocumentsByQuery("mycollection", query);
        const problem = problems[0];
        const requirements = problem['requirements'];
        const result = await runLEANContainer({ "code": code["code"], "required_theorems": requirements });

        problem['submitted']++;

        const keys = await getDocumentKeysByQuery("mycollection", query);
        const key = keys[0];

        const response = await updateDocumentByKey("mycollection", key, problem);

        result['time'] = getTime()
        result['code'] = code["code"];


        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.put('/problem_solved/:user_id/:course/:topic/:problem_id', async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const course = req.params.course;
        const topic = req.params.topic;
        const problem_id = req.params.problem_id;

        const query_problem = { "id": parseInt(problem_id), "course": '/' + course + '/' + topic };
        const keys_problem = await getDocumentKeysByQuery('mycollection', query_problem);
        const key_problem = keys_problem[0];

        const query_user = { "user_id": user_id };
        const keys_and_objects_user = await getDocumentAndKeysByQuery('users', query_user);
        const key_and_objects_user = keys_and_objects_user[0]
        const key_user = key_and_objects_user[0]
        let content_user = key_and_objects_user[1];
        content_user["problems"][key_problem]["status"] = "Solved";

        const result = await updateDocumentByKey("users", key_user, content_user);

        const problems = await getDocumentsByQuery("mycollection", query_problem);
        const problem = problems[0];
        problem['accepted']++;


        const response = await updateDocumentByKey("mycollection", key_problem, problem);

        if (result) {
            res.status(200).json("OK");
        } else {
            res.status(404).json("Something went wrong");
        }


    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
})



app.put('/add_submissions/:user_id/:course/:topic/:problem_id', async (req, res) => {
    try {
        const json_object = req.body;

        const user_id = req.params.user_id;
        const course = req.params.course;
        const topic = req.params.topic;
        const problem_id = req.params.problem_id;

        const query_problem = { "id": parseInt(problem_id), "course": '/' + course + '/' + topic };
        const keys_problem = await getDocumentKeysByQuery('mycollection', query_problem);
        const key_problem = keys_problem[0];

        const query_user = { "user_id": user_id };
        const keys_and_objects_user = await getDocumentAndKeysByQuery('users', query_user);
        const key_and_objects_user = keys_and_objects_user[0]
        const key_user = key_and_objects_user[0]
        let content_user = key_and_objects_user[1];



        if ((content_user["problems"][key_problem]["last solutions"]).length < 3) {

            content_user["problems"][key_problem]["last solutions"].push(json_object);

            const result = await updateDocumentByKey("users", key_user, content_user);

            if (result) {
                res.status(200).json(content_user);
            } else {
                res.status(404).json("Something went wrong");
            }




        } else if (content_user["problems"][key_problem]["last solutions"].length == 3) {


            content_user["problems"][key_problem]["last solutions"] = [
                content_user["problems"][key_problem]["last solutions"][1],
                content_user["problems"][key_problem]["last solutions"][2],
                json_object
            ]

            const result = await updateDocumentByKey("users", key_user, content_user);

            if (result) {
                res.status(200).json(content_user);
            } else {
                res.status(404).json("Something went wrong");
            }



        } else {
            res.status(404).json("Something went wrong")
        }

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})



app.get('/get_submissions/:user_id/:course/:topic/:problem_id', async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const course = req.params.course;
        const topic = req.params.topic;
        const problem_id = req.params.problem_id;

        const query_problem = { "id": parseInt(problem_id), "course": '/' + course + '/' + topic };
        const keys_problem = await getDocumentKeysByQuery('mycollection', query_problem);
        const key_problem = keys_problem[0];

        const query_user = { "user_id": user_id };
        const keys_and_objects_user = await getDocumentAndKeysByQuery('users', query_user);
        const key_and_objects_user = keys_and_objects_user[0]
        const content_user = key_and_objects_user[1];

        const result = content_user["problems"][key_problem]["last solutions"];


        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})




app.post('/run_programming/:topic/:problem_id', async (req, res) => {
    try {
        const code = req.body;
        const topic = req.params.topic;
        const problemId = req.params.problem_id;

        const query = { "id": parseInt(problemId), "course": '/' + 'programming' + '/' + topic };
        const problem = await getDocumentsByQuery("mycollection", query);
        const run_adding = problem[0]['run_code'];
        const run_code = code["code"] + run_adding;


        const compile_result = await runCppContainer({ "code": run_code, "extra_flag": "-fsanitize=address" });
        const logs = compile_result["compile_logs"];
        if (logs != '') {
            res.status(200).json(logs);
        } else {
            const result = await executeCppCommandWithTimeout(run_code, 1);
            res.status(200).json(result);
        }

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})



app.post('/submit_programming/:topic/:problem_id', async (req, res) => {
    try {

        const code = req.body;
        const topic = req.params.topic;
        const problemId = req.params.problem_id;

        const query = { "id": parseInt(problemId), "course": '/' + 'programming' + '/' + topic };
        const problem = await getDocumentsByQuery("mycollection", query);
        const submit_adding = problem[0]['submit_code'];
        const submit_code = code["code"] + submit_adding;

        const compile_result = await runCppContainer({ "code": submit_code, "extra_flag": "-fsanitize=address" });
        const logs = compile_result["compile_logs"];
        if (logs != '') {
            res.status(200).json(logs);
        } else {
            const result = await executeCppCommandWithTimeout(submit_code, 1);
            res.status(200).json(result);
        }

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})