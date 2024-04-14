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
            console.log("All documents with keys retrieved successfully:", allDocuments[0]['content']['problems']);
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


async function updateUserProblems(newProblem) {
    try {
        const soda = connection.getSodaDatabase();

        collection = await soda.openCollection('users');

        let docs = await collection.find().getDocuments();

        for (let doc of docs) {
            
            let content = doc.getContent()
            let key = doc.key;
            content['problems'][newProblem] = {'status' : 'Not solved', 'last solutions' : []};
            
            await updateDocumentByKey('users', key, content);

        }

        let docs2 = await collection.find().getDocuments();
        

    } catch (err) {
        console.error(err);
        return null;
    }
}



async function getAllDocumentKeys() {
    try {
        const soda = connection.getSodaDatabase();

        collection = await soda.openCollection("keys_collection");

        const keys = await collection.find().getDocuments();

        if (keys.length > 0) {
            console.log("All documents with keys retrieved successfully:", keys[0].getContent()['keys']);
            return keys[0];
        } else {
            console.log("No documents found in the collection.");
            return [];
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}



async function addNewDocument(collectionName, content) {
    try {
        const soda = connection.getSodaDatabase();

        collection = await soda.openCollection(collectionName);

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



async function deleteDocumentByKey(collectionName, key) {
    try {
        const soda = connection.getSodaDatabase();

        collection = await soda.openCollection(collectionName);

        await collection.find().key(key).remove();

        console.log("Document deleted successfully.");
    } catch (err) {
        console.error(err);
    }
}


async function getTotalDataSize(collection_names) {
    try {

        let totalSize = 0;

        for (let collection_name of collection_names) {
            const soda = connection.getSodaDatabase();
            const collection = await soda.openCollection(collection_name);


            const documents = await collection.find().getDocuments();

            for (let doc of documents) {
                const size = JSON.stringify(doc.getContent()).length;
                totalSize += size;
            }
        }


        console.log(totalSize / 1024, "Kb");

        return totalSize;
    } catch (err) {
        console.error(err);
        return -1;
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
    constraints: ['1 <= n <= 100', '1 <= k <= 100'],
    note: '<b><b>Follow up</b></b>: Can you do it in <b>O(1)</b>?',
    languages: [
        ['C++', 'cpp']
    ],
    initial_codes: {
        cpp: '#include <iostream>\n\nint summa(int n, int k) {\n    // your code here\n}'
    },
    initial_language: 'cpp',
    run_code: '\n\nint main() {\n  if (summa(1, 2) != 3) {\n    std::cout << "WA!\\n";\nreturn 0;\n  } else if (summa(2, 2) != 4) {\n    std::cout << "WA!\\n"; return 0;\n  } else if (summa(3, 3) != 6) {\n    std::cout << "WA!\\n"; return 0;\n  } else {\n    std::cout << "OK!\\n";\n  }\n}',
    submit_code: '\n\nint main() {\n  for (int i = 0; i < 100; ++i) {\n    for (int j = 0; j < 100; ++j) {\n      if (summa(i, j) != i + j) {\n        std::cout << "WA! input: " << i << " " << j << "\\n"\n                  << "correct output: " << i + j\n                  << " your output: " << summa(i, j) << "\\n";\n        return 0;\n      }\n    }\n  }\n  std::cout << "OK!"\n            << "\\n";\n}'

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


async function createNewCollection(collection_name) {
    const soda = connection.getSodaDatabase();

    collection = await soda.createCollection(collection_name);
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


async function getDocumentsByQuery(collection_name, query) {
    try {
        const soda = connection.getSodaDatabase();

        collection = await soda.openCollection(collection_name);

        const documents = await collection.find().filter(query).getDocuments();
        const jsonObjects = documents.map(doc => doc.getContent());

        if (jsonObjects.length > 0) {
            console.log(jsonObjects);
            return jsonObjects;

        } else {
            console.log([]);
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
            console.log(jsonObjects);
            return jsonObjects;

        } else {
            console.log([]);
            return [];
        }
    } catch (err) {
        console.error(err);
        return [];
    }
}





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




const second_problem_code = 
[
    '-- your proof goes here',
    'theorem uni : ∀ _ : α, True := sorry',
    'theorem exi_uni_then_uni (P : α → Prop) : (∃ _ : α, ∀ x : α, P x) → (∀ x : α, P x) := sorry',
    'theorem exi_exi_then_exi (P : α → Prop) : (∃ _ : α, ∃ x : α, P x) → (∃ x : α, P x) := sorry',
    'theorem uni_uni_then_uni (P : α → Prop) : (∀ _ : α, ∀ x : α, P x) → (∀ x : α, P x) := sorry',
    'theorem change_variable_uni (P: α → Prop) : (∀ x : α, P x) ↔ (∀ y : α, P y) := sorry',
    'theorem change_variable_exi (P: α → Prop) : (∃ x : α, P x) ↔ (∃ y : α, P y) := sorry',
    'theorem uni_congr (P Q : α → Prop) : (∀ x : α, (P x ↔ Q x)) → ((∀ x : α, P x) ↔ (∀ x : α, Q x)) := sorry',
    'theorem exi_congr (P Q : α → Prop) : (∀ x : α, (P x ↔ Q x)) → ((∃ x : α, P x) ↔ (∃ x: α, Q x)) := sorry',
    'theorem uni_comm (P : α →  β → Prop) : (∀ x : α, ∀ y : β, P x y) ↔ (∀ y : β, ∀ x : α, P x y) := sorry',
    'theorem exi_comm (P : α → β → Prop) : (∃ x : α, ∃ y : β, P x y) ↔ (∃ y : β, ∃ x : α, P x y) := sorry',
    'theorem exi_uni_then_uni_exi (P : α → β → Prop) : (∃ x : α, ∀ y : β, P x y) → (∀ y : β, ∃ x : α, P x y) := sorry',
    'theorem uni_conj (P Q: α → Prop) : (∀ x: α, P x ∧ Q x) ↔ (∀ x : α, P x) ∧ (∀ x : α, Q x) := sorry',
    'theorem exi_disj (P Q : α → Prop) : (∃ x : α, P x ∨ Q x) ↔ (∃ x : α, P x) ∨ (∃ x: α, Q x) := sorry',
    'theorem morgan_uni (P : α → Prop) : (∀ x : α, ¬ P x) ↔ (¬ ∃ x : α, P x) := sorry',
    'theorem morgan_exi_mp (P : α → Prop) : (∃ x : α, ¬ P x) →  (¬ ∀ x : α, P x) := sorry',
    'theorem brackets_exi_conj (P : Prop) (Q : α → Prop) : (∃ x : α, P ∧ Q x) ↔ (P ∧ ∃ x : α, Q x) := sorry',
    'theorem brackets_uni_conj_mpr (P : Prop) (Q : α → Prop) : (P ∧ ∀ x : α, Q x) → (∀ x : α, P ∧ Q x) := sorry',
    'theorem brackets_exi_disj_mp (P : Prop) (Q : α → Prop) : (∃ x : α, P ∨ Q x) → (P ∨ ∃ x : α, Q x) := sorry',
    'theorem brackets_uni_disj_mpr (P : Prop) (Q : α → Prop) : (P ∨ ∀ x : α, Q x) → (∀ x : α, P ∨ Q x) := sorry',
    'theorem brackets_left_uni_impl (P : Prop) (Q : α → Prop) : (P → ∀ x : α, Q x) ↔ (∀ x : α, (P → Q x)) := sorry',
    'theorem brackets_left_exi_impl_mpr (P : Prop) (Q : α → Prop) : (∃ x : α, (P → Q x)) → (P → ∃ x : α, Q x) := sorry',
    'theorem brackets_right_uni_impl_mpr (P : α → Prop) (Q : Prop) : (∃ x : α, (P x → Q)) → ((∀ x : α, P x) → Q) := sorry',
    'theorem brackets_right_exi_impl (P : α → Prop) (Q : Prop) : ((∃ x : α, P x) → Q) ↔ (∀ x : α, (P x → Q)) := sorry',
    'theorem inh_exi [Inhabited α] : ∃ _ : α, True := sorry',
    'theorem inh_uni_exi_then_exi [Inhabited α] (P : α → Prop) : (∀ _ : α, ∃ x : α, P x) → (∃ x : α, P x) := sorry',
    'theorem inh_uni_then_exi [Inhabited α] (P : α → Prop) : (∀ x : α, P x) → (∃ x : α, P x) := sorry',
    'theorem inh_brackets_uni_conj [Inhabited α] (P : Prop) (Q : α → Prop) : (∀ x : α, P ∧ Q x) ↔ (P ∧ ∀ x : α, Q x) := sorry',
    'theorem inh_brackets_exi_disj [Inhabited α] (P : Prop) (Q : α → Prop) : (∃ x : α, P ∨ Q x) ↔ (P ∨ ∃ x : α, Q x) := sorry',
    'open Classical',
    'theorem brackets_uni_disj (P : Prop) (Q : α → Prop) : (∀ x : α, P ∨ Q x) ↔ (P ∨ ∀ x : α, Q x) := sorry',
    'theorem morgan_exi (P : α → Prop) : (∃ x : α, ¬ P x) ↔ (¬ ∀ x : α, P x) := sorry',
    'theorem inh_brackets_left_exi_impl [Inhabited α] (P : Prop) (Q : α → Prop) : (P → ∃ x : α, Q x) ↔ (∃ x : α, (P → Q x)) := sorry',
    'theorem inh_brackets_right_uni_impl [Inhabited α] (P: α → Prop)  (Q : Prop) :  ((∀ x : α, P x) → Q) ↔ (∃ x : α, (P x → Q)) := sorry',
    '-- In a non empty pub there is someone such that, if he or she is drinking, then everyone in the pub is drinking',
    'theorem drinker_paradox (is_drinking : pub_visitor → Prop) [Inhabited pub_visitor] : (∃ someone : pub_visitor, (is_drinking someone  → ∀ person : pub_visitor, is_drinking person)) := sorry'
]


const second_requirements = [
    'theorem uni : ∀ _ : α, True :=',
    'theorem exi_uni_then_uni (P : α → Prop) : (∃ _ : α, ∀ x : α, P x) → (∀ x : α, P x) :=',
    'theorem exi_exi_then_exi (P : α → Prop) : (∃ _ : α, ∃ x : α, P x) → (∃ x : α, P x) :=',
    'theorem uni_uni_then_uni (P : α → Prop) : (∀ _ : α, ∀ x : α, P x) → (∀ x : α, P x) :=',
    'theorem change_variable_uni (P: α → Prop) : (∀ x : α, P x) ↔ (∀ y : α, P y) :=',
    'theorem change_variable_exi (P: α → Prop) : (∃ x : α, P x) ↔ (∃ y : α, P y) :=',
    'theorem uni_congr (P Q : α → Prop) : (∀ x : α, (P x ↔ Q x)) → ((∀ x : α, P x) ↔ (∀ x : α, Q x)) :=',
    'theorem exi_congr (P Q : α → Prop) : (∀ x : α, (P x ↔ Q x)) → ((∃ x : α, P x) ↔ (∃ x: α, Q x)) :=',
    'theorem uni_comm (P : α →  β → Prop) : (∀ x : α, ∀ y : β, P x y) ↔ (∀ y : β, ∀ x : α, P x y) :=',
    'theorem exi_comm (P : α → β → Prop) : (∃ x : α, ∃ y : β, P x y) ↔ (∃ y : β, ∃ x : α, P x y) :=',
    'theorem exi_uni_then_uni_exi (P : α → β → Prop) : (∃ x : α, ∀ y : β, P x y) → (∀ y : β, ∃ x : α, P x y) :=',
    'theorem uni_conj (P Q: α → Prop) : (∀ x: α, P x ∧ Q x) ↔ (∀ x : α, P x) ∧ (∀ x : α, Q x) :=',
    'theorem exi_disj (P Q : α → Prop) : (∃ x : α, P x ∨ Q x) ↔ (∃ x : α, P x) ∨ (∃ x: α, Q x) :=',
    'theorem morgan_uni (P : α → Prop) : (∀ x : α, ¬ P x) ↔ (¬ ∃ x : α, P x) :=',
    'theorem morgan_exi_mp (P : α → Prop) : (∃ x : α, ¬ P x) →  (¬ ∀ x : α, P x) :=',
    'theorem brackets_exi_conj (P : Prop) (Q : α → Prop) : (∃ x : α, P ∧ Q x) ↔ (P ∧ ∃ x : α, Q x) :=',
    'theorem brackets_uni_conj_mpr (P : Prop) (Q : α → Prop) : (P ∧ ∀ x : α, Q x) → (∀ x : α, P ∧ Q x) :=',
    'theorem brackets_exi_disj_mp (P : Prop) (Q : α → Prop) : (∃ x : α, P ∨ Q x) → (P ∨ ∃ x : α, Q x) :=',
    'theorem brackets_uni_disj_mpr (P : Prop) (Q : α → Prop) : (P ∨ ∀ x : α, Q x) → (∀ x : α, P ∨ Q x) :=',
    'theorem brackets_left_uni_impl (P : Prop) (Q : α → Prop) : (P → ∀ x : α, Q x) ↔ (∀ x : α, (P → Q x)) :=',
    'theorem brackets_left_exi_impl_mpr (P : Prop) (Q : α → Prop) : (∃ x : α, (P → Q x)) → (P → ∃ x : α, Q x) :=',
    'theorem brackets_right_uni_impl_mpr (P : α → Prop) (Q : Prop) : (∃ x : α, (P x → Q)) → ((∀ x : α, P x) → Q) :=',
    'theorem brackets_right_exi_impl (P : α → Prop) (Q : Prop) : ((∃ x : α, P x) → Q) ↔ (∀ x : α, (P x → Q)) :=',
    'theorem inh_exi [Inhabited α] : ∃ _ : α, True :=',
    'theorem inh_uni_exi_then_exi [Inhabited α] (P : α → Prop) : (∀ _ : α, ∃ x : α, P x) → (∃ x : α, P x) :=',
    'theorem inh_uni_then_exi [Inhabited α] (P : α → Prop) : (∀ x : α, P x) → (∃ x : α, P x) :=',
    'theorem inh_brackets_uni_conj [Inhabited α] (P : Prop) (Q : α → Prop) : (∀ x : α, P ∧ Q x) ↔ (P ∧ ∀ x : α, Q x) :=',
    'theorem inh_brackets_exi_disj [Inhabited α] (P : Prop) (Q : α → Prop) : (∃ x : α, P ∨ Q x) ↔ (P ∨ ∃ x : α, Q x) :=',
    'theorem brackets_uni_disj (P : Prop) (Q : α → Prop) : (∀ x : α, P ∨ Q x) ↔ (P ∨ ∀ x : α, Q x) :=',
    'theorem morgan_exi (P : α → Prop) : (∃ x : α, ¬ P x) ↔ (¬ ∀ x : α, P x) :=',
    'theorem inh_brackets_left_exi_impl [Inhabited α] (P : Prop) (Q : α → Prop) : (P → ∃ x : α, Q x) ↔ (∃ x : α, (P → Q x)) :=',
    'theorem inh_brackets_right_uni_impl [Inhabited α] (P: α → Prop)  (Q : Prop) :  ((∀ x : α, P x) → Q) ↔ (∃ x : α, (P x → Q)) :=',
    'theorem drinker_paradox (is_drinking : pub_visitor → Prop) [Inhabited pub_visitor] : (∃ someone : pub_visitor, (is_drinking someone  → ∀ person : pub_visitor, is_drinking person)) :='
]





const document3 = {
    id: 1,
    course: '/math/logic',
    title: 'Quantifier validities',
    difficulty: 'Easy',
    video_id: 'y3svPgyGnLc',
    accepted: 0,
    submitted: 0,
    description_text:
        'This is task to prove, using <b>LEAN 4</b> language. <br> Proofs should be done, by writing constructive <b>proof terms with the help of constructors and destructors</b>. <br> In each math problem you will be given a list of permitted constructors, destructors and theorems <br> To proof each theorem, remove <b>"sorry"</b> and replace it with <b>proof term</b>. <br> You can use following constructors and destructors: <br>' +
        '<br>All the constructors and destructors from previous problem<br>' +
        '<br>You can assume all theorems from previous problem as axioms<br>' +
        '<br><i>Constructor and destructor for the universal quantifier:</i><br>' +
        '<i> Constructor: </i> <b> fun (x : α) => (φ : Prop) </b> creates <b> ∀ x : α, φ</b> proposition from <b>φ</b> proposition <br>' +
        '<i> Destructor: </i> <b> (h : ∀ x : α, φ) (s : α) </b> creates <b>φ</b> proposition from <b> ∀ x : α, φ</b> proposition and <b>α</b> type <br>' +
        '<br><i>Constructor and destructor for the existential quantifier:</i><br>' +
        '<i> Constructor: </i> <b> Exists.intro (x : α) (φ : Prop) </b> creates <b> ∃ x : α, φ</b> proposition from <b>α</b> type and <b>φ</b> proposition<br>' +
        '<i> Destructor: </i> <b> Exists.elim (∃ x : α, φ) (fun (w : α) => fun (hw : φ[w/x]) => ψ) </b> creates <b> ψ</b> proposition from <b> ∃ x : α, φ</b> proposition <br>' +
        '<br> If the type <b>α</b> is <b>Inhabited</b>, you can use <b>Inhabited.default : α</b><br>' +
        '<br>P.S. <b>φ[w/x]</b> is a <b>φ</b> proposition, where all variables <b>x</b> are changed to <b>w</b><br>'
        ,


    examples: [],
    constraints: [],
    note: 'Note that you can only use <b>Classical (em and ByContradiction)</b> for the theorems, defined after <i>open Classical</i>.  <br> <br> For reference, see this documentation: <a href="https://leanprover.github.io/theorem_proving_in_lean4/title_page.html">LEAN 4 proving</a>',
    languages: [['LEAN', 'lean']],
    initial_codes: {
        lean: add_lines(second_problem_code),
    },
    initial_language: 'lean',
    requirements: second_requirements
}








connectToDatabase()
    .then(async () => {
        await getAllDocumentsWithKeys('users');
        await closeConnection();
    })
    .catch(err => {
        console.error(err);
    });


