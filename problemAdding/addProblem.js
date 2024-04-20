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




const third_problem_code = 
[
   '--your proof goes here',
   'theorem eq_refl : (∀ x : α, x = x) := sorry',
   'theorem eq_subst (P : α → Prop) : (∀ (a b : α), a = b → P a → P b) := sorry',
   'theorem eq_symm : (∀ (x y : α), x = y → y = x) := sorry',
   'theorem eq_substr (P : α → Prop) : (∀ (a b : α), a = b → P b → P a) := sorry',
   'def eq_mp (α : Sort u₁) (β : Sort u₁) (h : α = β) (a : α) : β := sorry',
   'def eq_mpr (α : Sort u₁) (β : Sort u₁) (h : α = β) (b : β) : α := sorry',
   'theorem eq_trans_curry : (∀ (x y z : α), x = y → y = z → x = z) := sorry',
   'theorem eq_trans_export : (∀ (x y z : α), x = y ∧ y = z → x = z) := sorry',
   'theorem eq_congr_func_arg (f : α → β) : (∀ (x y : α), x = y → f x = f y) := sorry',
   'theorem iff_is_eq (p q : Prop) : (p ↔ q) ↔ (p = q) := sorry',
   'theorem eq_congr_pred_arg (P : α → Prop) : (∀ (x y : α), x = y → (P x ↔ P y)) := sorry',
   'theorem eq_congr_func_symb (f g : α → β) (h : f = g) : (∀ x : α, f x = g x) := sorry',
   'theorem eq_congr_pred_symb (P Q : α → Prop) (h : P = Q) : (∀ x : α, P x ↔ Q x) := sorry',
   'theorem eq_commut : (∀ x : α, ∀ y : α, x = y ↔ y = x) := sorry',
   'theorem eq_prop_intro (p q : Prop) : (p → q) → (q → p) → (p = q) := sorry',
   'theorem eq_congr_func_arg_symb (f₁ f₂ : α → β) : ∀ (a₁ a₂ : α), (f₁ = f₂) → (a₁ = a₂) → (f₁ a₁ = f₂ a₂) := sorry',
   'theorem eq_congr_pred_arg_symb (P₁ P₂ : α → Prop) : ∀ (a₁ a₂ : α), (P₁ = P₂) → (a₁ = a₂) → (P₁ a₁ ↔ P₂ a₂) := sorry',
   '-- ≠ is a symbol, x ≠ y is parsed as ¬ (x = y)',
   '-- prove trivial theorem for that',
   'theorem neq_symbol : (∀ (x y : α), ¬ (x = y) ↔ x ≠ y) := sorry',
   'theorem exists_eq_C_PC_then_P (P : α → Prop) : (∃ x : α, x = C) → (P C) → (∃ x : α, P x) := sorry',
   'theorem forall_eq_C_PC_then_P (P : α → Prop) : (∀ x : α, x = C) → (P C) → (∀ x : α, P x) := sorry',
   '-- we define exists unique quantifier',
   'def exists_unique (P : α → Prop) : Prop := (∃ (x : α), P x ∧ (∀ y : α, (P y → x = y)))',
   'open Lean TSyntax.Compat in',
   'macro "∃!" xs:explicitBinders ", " b:term : term => expandExplicitBinders ``exists_unique xs b',
   '@[app_unexpander exists_unique] def unexpandexists_unique: Lean.PrettyPrinter.Unexpander',
   '| `($(_) fun $x:ident ↦ ∃! $xs:binderIdent*, $b) => `(∃! $x:ident $xs:binderIdent*, $b)',
   '| `($(_) fun $x:ident ↦ $b)                      => `(∃! $x:ident, $b)',
   '| `($(_) fun ($x:ident : $t) ↦ $b)               => `(∃! ($x:ident : $t), $b)',
   '| _                                               => throw ()',
   'theorem exists_unique_intro (P : α → Prop) (w : α) (h : P w) (g : ∀ y : α, P y → w = y) : ∃! (x : α), P x := sorry',
   'theorem exists_unique_elim (q : Prop) (P : α → Prop) (h : ∃! (x : α), P x) (g : ∀ w : α, ∀ _ : P w, ((∀ y : α, P y → w = y) → q)) : q := sorry',
   'theorem exists_unique_expansion_export (P : α → Prop) : (∃! (x : α), P x) ↔ (∃ (x : α), P x) ∧ (∀ (x y : α), (P x ∧ P y → x = y)) := sorry',
   'theorem exists_unique_expansion_curry (P : α → Prop) : (∃! (x : α), P x) ↔ (∃ (x : α), P x) ∧ (∀ (x y : α), (P x → P y → x = y)) := sorry',
   'theorem exists_unique_then_exists (P : α → Prop) (h : ∃! (x : α), P x) : (∃ (x : α), P x) := sorry',
   'theorem exists_unique_then_unique (P : α → Prop)  (h : ∃! (x : α), P x) (x : α) (y : α) (h₁ : P x) (h₂ : P y) : x = y := sorry',
   'theorem exists_unique_congr (P Q : α → Prop) : (∀ x : α, (P x ↔ Q x)) → ((∃! (x : α), P x) ↔ (∃! (x : α), Q x)) := sorry',
   '-- axioms and theorems for picking an element',
   '-- these axioms can be used for all further problems',
   'axiom pick_P (α : Type) (P : α → Prop) (h : ∃ (x : α), P x) : α',
   'axiom pick_P_property (α : Type) (P : α → Prop) (h : ∃ (x : α), P x) : P (pick_P α P h)',
   '@[instance] noncomputable def exists_then_inhabited (α : Type) (P : α → Prop) (h : ∃ (x : α), P x) : Inhabited α := sorry',
   'noncomputable def pick_unique_P (α : Type) (P : α → Prop) (h : ∃! (x : α), P x) : α := sorry',
   'theorem pick_unique_P_property (α : Type) (P : α → Prop) (h : ∃! (x : α), P x) : P (pick_unique_P α P h) ∧ ∀ x : α, x ≠ pick_unique_P α P h → ¬P x := sorry',
   'open Classical',
   'theorem uni_eq_partition (P : α → α → Prop) : (∀ x : α, ∀ y : α, P x y) ↔ ((∀ x : α, P x x) ∧ ∀ x : α, ∀ y : α, (x ≠ y → P x y)) := sorry',
   'theorem exi_eq_partition (P : α → α → Prop) : (∃ x : α, ∃ y : α, P x y) ↔ ((∃ x : α, P x x) ∨ ∃ x : α, ∃ y : α, (x ≠ y ∧ P x y)) := sorry',


]


const third_requirements = [
    'theorem eq_refl : (∀ x : α, x = x) :=',
    'theorem eq_subst (P : α → Prop) : (∀ (a b : α), a = b → P a → P b) :=',
    'theorem eq_symm : (∀ (x y : α), x = y → y = x) :=',
    'theorem eq_substr (P : α → Prop) : (∀ (a b : α), a = b → P b → P a) :=',
    'def eq_mp (α : Sort u₁) (β : Sort u₁) (h : α = β) (a : α) : β :=',
    'def eq_mpr (α : Sort u₁) (β : Sort u₁) (h : α = β) (b : β) : α :=',
    'theorem eq_trans_curry : (∀ (x y z : α), x = y → y = z → x = z) :=',
    'theorem eq_trans_export : (∀ (x y z : α), x = y ∧ y = z → x = z) :=',
    'theorem eq_congr_func_arg (f : α → β) : (∀ (x y : α), x = y → f x = f y) :=',
    'theorem iff_is_eq (p q : Prop) : (p ↔ q) ↔ (p = q) :=',
    'theorem eq_congr_pred_arg (P : α → Prop) : (∀ (x y : α), x = y → (P x ↔ P y)) :=',
    'theorem eq_congr_func_symb (f g : α → β) (h : f = g) : (∀ x : α, f x = g x) :=',
    'theorem eq_congr_pred_symb (P Q : α → Prop) (h : P = Q) : (∀ x : α, P x ↔ Q x) :=',
    'theorem eq_commut : (∀ x : α, ∀ y : α, x = y ↔ y = x) :=',
    'theorem eq_prop_intro (p q : Prop) : (p → q) → (q → p) → (p = q) :=',
    'theorem eq_congr_func_arg_symb (f₁ f₂ : α → β) : ∀ (a₁ a₂ : α), (f₁ = f₂) → (a₁ = a₂) → (f₁ a₁ = f₂ a₂) :=',
    'theorem eq_congr_pred_arg_symb (P₁ P₂ : α → Prop) : ∀ (a₁ a₂ : α), (P₁ = P₂) → (a₁ = a₂) → (P₁ a₁ ↔ P₂ a₂) :=',
    'theorem neq_symbol : (∀ (x y : α), ¬ (x = y) ↔ x ≠ y) :=',
    'theorem exists_eq_C_PC_then_P (P : α → Prop) : (∃ x : α, x = C) → (P C) → (∃ x : α, P x) :=',
    'theorem forall_eq_C_PC_then_P (P : α → Prop) : (∀ x : α, x = C) → (P C) → (∀ x : α, P x) :=',
    'theorem uni_eq_partition (P : α → α → Prop) : (∀ x : α, ∀ y : α, P x y) ↔ ((∀ x : α, P x x) ∧ ∀ x : α, ∀ y : α, (x ≠ y → P x y)) :=',
    'theorem exi_eq_partition (P : α → α → Prop) : (∃ x : α, ∃ y : α, P x y) ↔ ((∃ x : α, P x x) ∨ ∃ x : α, ∃ y : α, (x ≠ y ∧ P x y)) :=',
    'theorem exists_unique_intro (P : α → Prop) (w : α) (h : P w) (g : ∀ y : α, P y → w = y) : ∃! (x : α), P x :=',
    'theorem exists_unique_elim (q : Prop) (P : α → Prop) (h : ∃! (x : α), P x) (g : ∀ w : α, ∀ _ : P w, ((∀ y : α, P y → w = y) → q)) : q :=',
    'theorem exists_unique_expansion_export (P : α → Prop) : (∃! (x : α), P x) ↔ (∃ (x : α), P x) ∧ (∀ (x y : α), (P x ∧ P y → x = y)) :=',
    'theorem exists_unique_expansion_curry (P : α → Prop) : (∃! (x : α), P x) ↔ (∃ (x : α), P x) ∧ (∀ (x y : α), (P x → P y → x = y)) :=',
    'theorem exists_unique_then_exists (P : α → Prop) (h : ∃! (x : α), P x) : (∃ (x : α), P x) :=',
    'theorem exists_unique_then_unique (P : α → Prop)  (h : ∃! (x : α), P x) (x : α) (y : α) (h₁ : P x) (h₂ : P y) : x = y :=',
    'theorem exists_unique_congr (P Q : α → Prop) : (∀ x : α, (P x ↔ Q x)) → ((∃! (x : α), P x) ↔ (∃! (x : α), Q x)) :=',
    '@[instance] noncomputable def exists_then_inhabited (α : Type) (P : α → Prop) (h : ∃ (x : α), P x) : Inhabited α :=',
    'noncomputable def pick_unique_P (α : Type) (P : α → Prop) (h : ∃! (x : α), P x) : α :=',
    'theorem pick_unique_P_property (α : Type) (P : α → Prop) (h : ∃! (x : α), P x) : P (pick_unique_P α P h) ∧ ∀ x : α, x ≠ pick_unique_P α P h → ¬P x :='
 ]





const document4 = {
    id: 2,
    course: '/math/logic',
    title: 'Equality validities',
    difficulty: 'Easy',
    video_id: 'y3svPgyGnLc',
    accepted: 0,
    submitted: 0,
    description_text:
        'This is task to prove, using <b>LEAN 4</b> language. <br> Proofs should be done, by writing constructive <b>proof terms with the help of constructors and destructors</b>. <br> In each math problem you will be given a list of permitted constructors, destructors and theorems <br> To proof each theorem, remove <b>"sorry"</b> and replace it with <b>proof term</b>. <br> You can use following constructors and destructors: <br>' +
        '<br>All the constructors and destructors from previous problem<br>' +
        '<br>You can assume all theorems from previous problem as axioms<br>' +
        '<br><i>Constructor and destructor for the equality relation: </i><br>' +
        '<i> Constructor refl: </i> <b> Eq.refl : ∀ (a : α), (a = a) </b> from a variable of <b>α</b> type <br>' +
        '<i> Constructor for Prop equality: </i> <b> Eq.propIntro : ∀ (a b : Prop), (a → b) → (b → a) → (a = b) </b> from <b>a b</b> variables of type <b>Prop</b> <br>' +
        '<i> Destructor substitution: </i> <b> Eq.subst : ∀ (P : α → Prop), (a b : α), (a = b) → P a → P b </b> from <b>P</b> variable of type <b>α → Prop</b> and <b>a</b> <b>b</b> variables of type <b>α</b> <br>' +
        '<i> Destructor for equal types: </i> <b> Eq.mp : ∀ (α β : Type), (α = β) → α → β </b> from <b>α β</b> of type <b>Type</b> <br>',

    examples: [],
    constraints: [],
    note: 'Note that you can only use <b>Classical (em and ByContradiction)</b> for the theorems, defined after <i>open Classical</i>.  <br> <br> For reference, see this documentation: <a href="https://leanprover.github.io/theorem_proving_in_lean4/title_page.html">LEAN 4 proving</a>',
    languages: [['LEAN', 'lean']],
    initial_codes: {
        lean: add_lines(third_problem_code),
    },
    initial_language: 'lean',
    requirements: third_requirements
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
    'theorem neg_congr (p q : Prop) : (p ↔ q) → (¬p ↔ ¬q) := sorry',

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

    'theorem neg_congr (p q : Prop) : (p ↔ q) → (¬p ↔ ¬q)',

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
        'This is task to prove, using <b>LEAN 4</b> language. <br> Proofs should be done, by writing constructive <b>proof terms with the help of propositional constructors and destructors</b>. <br> In each math problem you will be given a list of permitted constructors, destructors and theorems <br> To proof each theorem, remove <b>"sorry"</b> and replace it with <b>proof term</b>. <br> <br> You can use following constructors and destructors <br>' +
        '<br><i>Constructor and destructor for conjunction:</i><br>' +
        '<i>Constructor: </i> <b>And.intro (h : p) (h : q) </b> creates <b>p ∧ q</b> proposition from <b>p</b> and <b>q</b> propositions</br>' +
        '<i>Destructor-a: </i> <b> And.left </b> creates <b>p</b> proposition from <b>p ∧ q</b> <br>' +
        '<i>Destructor-b: </i> <b> And.right </b> creates <b>q</b> proposition from <b>p ∧ q</b> <br>' +
        '<br><i>Constructor and destructor for disjunction:</i><br>' +
        '<i>Constructor-a: </i> <b> Or.intro_left (q : Prop) (h : p) </b> creates <b>p ∨ q</b> proposition from <b>p</b> proposition<br>' +
        '<i>Constructor-b: </i> <b> Or.intro_left (q : Prop) (h : p) </b> creates <b>p ∨ q</b> proposition from <b>p</b> proposition<br>' +
        '<i>Destructor:</i> <b> Or.elim (hpq : p ∨ q) (hpr : p → r) (hqr : q → r)</b> creates <b>r</b> proposition from <b>p ∨ q</b>, <b>p → r</b>, <b>q → r</b> propositions<br>' +
        '<br><i>Constructor and destructor for implication:</i> <br>' +
        '<i>Constructor: </i> <b>fun (hp : p) => (hq : q)</b> creates <b>p → q</b> proposition from <b>q</b> proposition</br>' +
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









connectToDatabase()
    .then(async () => {
        await getAllDocumentKeys('mycollection');
        await updateDocumentByKey('mycollection', '726B828068834F27BFAFCFE0B9502CB2', document2)
        await closeConnection();
    })
    .catch(err => {
        console.error(err);
    });



