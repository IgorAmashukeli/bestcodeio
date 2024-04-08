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

const first_problem_code = [
    '--your proof goes here',

    'theorem neg_true : ¬ True ↔ False := sorry',
    'theorem neg_false : ¬ False ↔ True := sorry',

    'theorem conj_true (p : Prop) : p ∧ True ↔ p := sorry',
    'theorem conj_false (p : Prop) : p ∧ False ↔ False := sorry',

    'theorem disj_true (p : Prop) : p ∨ True ↔ True := sorry',
    'theorem disj_false (p : Prop) : p ∨ False ↔ p := sorry',

    'theorem impl_true (p : Prop) : p → True ↔ True := sorry',
    'theorem true_impl (p : Prop) : True → p ↔ p := sorry',
    'theorem impl_false (p : Prop) : p → False ↔ ¬ p := sorry',
    'theorem false_impl (p : Prop) : False → p ↔ True := sorry',

    'theorem axiomatic_rule (p : Prop) : p → p := sorry',
    'theorem trivial_equivalence (p : Prop) : p ↔ p := sorry',

    'theorem conj_idemp (p : Prop) : p ↔ p ∧ p := sorry',
    'theorem disj_idemp (p : Prop) : p ↔ p ∨ p := sorry',

    'theorem conj_comm (p q : Prop) : (p ∧ q) ↔ (q ∧ p) := sorry',
    'theorem disj_comm (p q : Prop) : (p ∨ q) ↔ (q ∨ p) := sorry',
    'theorem impl_comm (p q : Prop) : (p ↔ q) ↔ (q ↔ p) := sorry',

    'theorem conj_assoc (p q r : Prop) : (p ∧ q) ∧ r ↔ p ∧ (q ∧ r) := sorry',
    'theorem disj_assoc (p q r : Prop) : (p ∨ q) ∨ r ↔ p ∨ (q ∨ r) := sorry',

    'theorem conj_disj_distrib (p q r : Prop) : p ∧ (q ∨ r) ↔ (p ∧ q) ∨ (p ∧ r) := sorry',
    'theorem disj_conj_distrib (p q r : Prop) : p ∨ (q ∧ r) ↔ (p ∨ q) ∧ (p ∨ r) := sorry',

    'theorem morgan_disj (p q : Prop) :  ¬(p ∨ q) ↔ ¬p ∧ ¬q := sorry',
    'theorem morgan_conj_mpr (p q : Prop) : ¬p ∨ ¬q → ¬(p ∧ q) := sorry',

    'theorem impl_def_mpr (p q : Prop) : (¬p ∨ q) → (p → q) := sorry',
    'theorem neg_imp_def_mpr (p q : Prop) : p ∧ ¬q → ¬(p → q) := sorry',
    'theorem neg_to_impl (p q : Prop) : ¬p → (p → q) := sorry',
    'theorem contraposition_mp (p q : Prop) : (p → q) → (¬q → ¬p) := sorry',

    'theorem exportation_law (p q r : Prop) : (p → (q → r)) ↔ (p ∧ q → r) := sorry',

    'theorem cases_impl_left (p q r : Prop) : ((p ∨ q) → r) ↔ (p → r) ∧ (q → r) := sorry',

    'theorem syllogism (p q r : Prop) : (p → q) → (q → r) → (p → r) := sorry',

    'theorem disj_congr (p q r : Prop) : (p ↔ q) → ((p ∨ r) ↔ (q ∨ r)) := sorry',
    'theorem conj_congr (p q r : Prop) : (p ↔ q) → ((p ∧ r) ↔ (q ∧ r)) := sorry',
    'theorem impl_congr_right (p q r : Prop) : (p ↔ q) → ((p → r) ↔ (q → r)) := sorry',
    'theorem impl_congr_left (p q r : Prop) : (p ↔ q) → ((r → p) ↔ (r → q)) := sorry',
    'theorem iff_congr_ (p q r : Prop) : (p ↔ q) → ((p ↔ r) ↔ (q ↔ r)) := sorry',

    'theorem iff_conj_intro(p q r : Prop) : (p ↔ q) → (p ↔ r) → (p ↔ (q ∧ r)) := sorry',
    'theorem iff_transitivity (p q r : Prop) : (p ↔ q) → (q ↔ r) → (p ↔ r) := sorry',

    'theorem no_contradiction (p : Prop) : ¬ (p ∧ ¬ p) := sorry',

    'theorem double_negation_mp (p : Prop) : p → ¬¬ p := sorry',

    'theorem negation_not_equiv (p : Prop) : ¬(p ↔ ¬p) := sorry',

    'open Classical',

    'theorem double_negation (p : Prop) : p ↔ ¬¬p := sorry',

    'theorem tnd (p : Prop) : p ∨ ¬ p := sorry',

    'theorem cases_analysis (p q : Prop) : (p → q) → (¬p → q) → q := sorry',

    'theorem cases_impl_right (p q r : Prop) : (p → q ∨ r) → ((p → q) ∨ (p → r)) := sorry',

    'theorem Morgan_disj (p q : Prop) : ¬ (p ∧ q) ↔ ¬p ∨ ¬q := sorry',

    'theorem neg_imp_def (p q : Prop) :  ¬ (p → q) ↔ p ∧ ¬ q := sorry',
    'theorem imp_def (p q : Prop) : (p → q) ↔ (¬p ∨ q) := sorry',
    'theorem contraposition (p q : Prop) : (p → q) ↔ (¬q → ¬p) := sorry',

    'theorem peirce (p q : Prop) : (((p → q) → p) → p) := sorry',
];


const first_requirements = [
    'theorem neg_true : ¬ True ↔ False',
    'theorem neg_false : ¬ False ↔ True',

    'theorem conj_true (p : Prop) : p ∧ True ↔ p',
    'theorem conj_false (p : Prop) : p ∧ False ↔ False',

    'theorem disj_true (p : Prop) : p ∨ True ↔ True',
    'theorem disj_false (p : Prop) : p ∨ False ↔ p',

    'theorem impl_true (p : Prop) : p → True ↔ True',
    'theorem true_impl (p : Prop) : True → p ↔ p',
    'theorem impl_false (p : Prop) : p → False ↔ ¬ p',
    'theorem false_impl (p : Prop) : False → p ↔ True',

    'theorem axiomatic_rule (p : Prop) : p → p',
    'theorem trivial_equivalence (p : Prop) : p ↔ p',

    'theorem conj_idemp (p : Prop) : p ↔ p ∧ p',
    'theorem disj_idemp (p : Prop) : p ↔ p ∨ p',

    'theorem conj_comm (p q : Prop) : (p ∧ q) ↔ (q ∧ p)',
    'theorem disj_comm (p q : Prop) : (p ∨ q) ↔ (q ∨ p)',
    'theorem impl_comm (p q : Prop) : (p ↔ q) ↔ (q ↔ p)',

    'theorem conj_assoc (p q r : Prop) : (p ∧ q) ∧ r ↔ p ∧ (q ∧ r)',
    'theorem disj_assoc (p q r : Prop) : (p ∨ q) ∨ r ↔ p ∨ (q ∨ r)',

    'theorem conj_disj_distrib (p q r : Prop) : p ∧ (q ∨ r) ↔ (p ∧ q) ∨ (p ∧ r)',
    'theorem disj_conj_distrib (p q r : Prop) : p ∨ (q ∧ r) ↔ (p ∨ q) ∧ (p ∨ r)',

    'theorem morgan_disj (p q : Prop) :  ¬(p ∨ q) ↔ ¬p ∧ ¬q',
    'theorem morgan_conj_mpr (p q : Prop) : ¬p ∨ ¬q → ¬(p ∧ q)',

    'theorem impl_def_mpr (p q : Prop) : (¬p ∨ q) → (p → q)',
    'theorem neg_imp_def_mpr (p q : Prop) : p ∧ ¬q → ¬(p → q)',
    'theorem neg_to_impl (p q : Prop) : ¬p → (p → q)',
    'theorem contraposition_mp (p q : Prop) : (p → q) → (¬q → ¬p)',

    'theorem exportation_law (p q r : Prop) : (p → (q → r)) ↔ (p ∧ q → r)',

    'theorem cases_impl_left (p q r : Prop) : ((p ∨ q) → r) ↔ (p → r) ∧ (q → r)',

    'theorem syllogism (p q r : Prop) : (p → q) → (q → r) → (p → r)',

    'theorem disj_congr (p q r : Prop) : (p ↔ q) → ((p ∨ r) ↔ (q ∨ r))',
    'theorem conj_congr (p q r : Prop) : (p ↔ q) → ((p ∧ r) ↔ (q ∧ r))',
    'theorem impl_congr_right (p q r : Prop) : (p ↔ q) → ((p → r) ↔ (q → r))',
    'theorem impl_congr_left (p q r : Prop) : (p ↔ q) → ((r → p) ↔ (r → q))',
    'theorem iff_congr_ (p q r : Prop) : (p ↔ q) → ((p ↔ r) ↔ (q ↔ r))',

    'theorem iff_conj_intro(p q r : Prop) : (p ↔ q) → (p ↔ r) → (p ↔ (q ∧ r))',
    'theorem iff_transitivity (p q r : Prop) : (p ↔ q) → (q ↔ r) → (p ↔ r)',

    'theorem no_contradiction (p : Prop) : ¬ (p ∧ ¬ p)',

    'theorem negation_not_equiv (p : Prop) : ¬(p ↔ ¬p)',
    'theorem double_negation_mp (p : Prop) : p → ¬¬ p',

    'theorem tnd (p : Prop) : p ∨ ¬ p',

    'theorem double_negation (p : Prop) : p ↔ ¬¬p',

    'theorem cases_analysis (p q : Prop) : (p → q) → (¬p → q) → q',

    'theorem cases_impl_right (p q r : Prop) : (p → q ∨ r) → ((p → q) ∨ (p → r))',

    'theorem Morgan_disj (p q : Prop) : ¬ (p ∧ q) ↔ ¬p ∨ ¬q',

    'theorem neg_imp_def (p q : Prop) :  ¬ (p → q) ↔ p ∧ ¬ q',
    'theorem imp_def (p q : Prop) : (p → q) ↔ (¬p ∨ q)',
    'theorem contraposition (p q : Prop) : (p → q) ↔ (¬q → ¬p)',

    'theorem peirce (p q : Prop) : (((p → q) → p) → p)',
]




const document2 = {
    id: 0,
    course: '/math/logic',
    title: 'Propositional tautologies',
    difficulty: 'Easy',
    video_id: 'y3svPgyGnLc',
    accepted: 0,
    submitted: 0,
    description_text:
        'This is task to prove, using <b>LEAN 4</b> language. <br> Proofs should be done, by writing constructive <b>proof terms with the help of propositional constructors and destructors</b>. <br> In each math problem you will be given a list of <br> To proof each theorem, remove <b>"sorry"</b> and replace it with <b>proof term</b>. <br> <br> You can use following constructors and destructors <br>' +
        '<br><i>Constructor and destructor for conjunction:</i><br>' +
        '<i>Constructor: </i> <b>And.intro (h : p) (h : q) </b> creates <b>p ∧ q</b> proposition from <b>p</b> and <b>q</b> propositions</br>' +
        '<i>Destructor-a: </i> <b> And.left </b> creates <b>p</b> proposition from <b>p ∧ q</b> <br>' +
        '<i>Destructor-b: </i> <b> And.right </b> creates <b>q</b> proposition from <b>p ∧ q</b> <br>' +
        '<br><i>Constructor and destructor for disjunction:</i><br>' +
        '<i>Constructor-a: </i> <b> Or.intro_left (q : Prop) (h : p) </b> creates <b>p ∨ q</b> proposition from <b>p</b> proposition<br>' +
        '<i>Constructor-b: </i> <b> Or.intro_left (q : Prop) (h : p) </b> creates <b>p ∨ q</b> proposition from <b>p</b> proposition<br>' +
        '<i>Destructor:</i> <b> Or.elim (hpq : p ∨ q) (hpr : p → r) (hqr : q → r)</b> creates <b>r</b> proposition from <b>p ∨ q</b>, <b>p → r</b>, <b>q → r</b> propositions<br>' +
        '<br><i>Constructor and destructor for implication:</i> <br>' +
        '<i>Constructor: </i> <b>fun (hp : p) => (hq : q)</b> creates <b>p → q</b> proposition from <b>p</b> and <b>q</b> propositions</br>' +
        '<i>Destructor: </i> <b>(hpq : p → q) (hp : p) </b> creates <b>q</b> proposition from <b>p → q</b> and <b>p</b> propositions <br>' +
        '<br><i>Constructor and destructor for negation, constructor and destructor for False:</i><br>' +
        '<i>Constructor for negation:</i> <b>fun (hp : p) => (h : False)</b> creates <b>¬p</b> from <b>p</b><br>' +
        '<i>Destructor for negation/Constructor for False: </i> <b> (hnp : ¬p) (hp : p)</b> creates <b>False</b> proposition from <b>¬p</b> and <b>p</b> propositions<br>' +
        '<i>Destructor for False:</i><b>False.elim (h : False)</b> creates any proposition <b>p</b> from <b>False</b> proposition<br>' +
        '<br><i>Constructor for True:</i> <b>True.intro</b> creates True propistion<br>' +
        '<br><i>Constructor for Logical equivalence:</i> <b>Iff.intro (hpq : p → q) (hqp : q → p) </b> creates <b>p ↔ q</b> proposition from <b>p → q</b> and <b>q → p</b> propositions' +
        '<br><i>Destructor-a for Logical equivalence:</i> <b>Iff.mp (hpq : p ↔ q)</b> creates <b>p → q</b> proposition from <b>p ↔ q</b> proposition' +
        '<br><i>Destructor-b for Logical equivalence:</i> <b>Iff.mp (hpq : p ↔ q)</b> creates <b>q → p</b> proposition from <b>p ↔ q</b> proposition' +
        '<br><br><i>Classical logic negation destructor:</i> <b>ByContradiction (hnnp : ¬¬p)</b> creates <b>p</b> proposition from <b>¬¬p</b> proposition',





    examples: [],
    constraints: [],
    note: 'Note that you can only use <b>ByContradiction</b> for the theorems, defined after <i>open Classical</i>. It is allowed to use <b>ByContradiction</b> for <i>negation_not_equiv</i>. However try not to use it.  <br> <br> For reference, see this documentation: <a href="https://leanprover.github.io/theorem_proving_in_lean4/title_page.html">LEAN 4 proving</a>',
    languages: [['LEAN', 'lean']],
    initial_codes: {
        lean: add_lines(first_problem_code),
    },
    initial_language: 'lean',
    requirements: first_requirements
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




connectToDatabase()
    .then(async () => {
        await updateDocumentByKey('mycollection', '11C0DB08DA2E4F63BFD95A3F87D0D7F2', document)
        await closeConnection();
    })
    .catch(err => {
        console.error(err);
    });


