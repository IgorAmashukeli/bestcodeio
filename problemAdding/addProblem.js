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

async function initializeConnectionPool() {
    try {
        await oracledb.createPool({
            user: 'first_user',
            password: process.env.MYPW,
            connectString: 'autodb_high',
            poolMax: 10,
            poolMin: 2,
            poolIncrement: 2,
            poolTimeout: 60,
            queueTimeout: 60000
        });
        console.log('Connection pool initialized successfully.');
    } catch (err) {
        console.error('Error initializing connection pool:', err);
        throw err;
    }
}

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



async function updateKeysProblems(newProblem) {
    try {
        const soda = connection.getSodaDatabase();

        collection = await soda.openCollection('keys_collection');

        let docs = await collection.find().getDocuments();

        const doc = docs[0];

        const key = doc.key;

        let content = doc.getContent();

        let keys_arr = content["keys"];

        keys_arr.push(newProblem);

        content = {"keys" : keys_arr};

        await updateDocumentByKey('keys_collection', key, content)

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


const first_problem_code = [
    '--your proof goes here',

    'def exists_unique (P : α → Prop) : Prop := (∃ (x : α), P x ∧ (∀ y : α, (P y → x = y)))',
    'open Lean TSyntax.Compat in',
    'macro "∃!" xs:explicitBinders ", " b:term : term => expandExplicitBinders ``exists_unique xs b',
    '@[app_unexpander exists_unique] def unexpandexists_unique: Lean.PrettyPrinter.Unexpander',
    '| `($(_) fun $x:ident ↦ ∃! $xs:binderIdent*, $b) => `(∃! $x:ident $xs:binderIdent*, $b)',
    '| `($(_) fun $x:ident ↦ $b)                      => `(∃! $x:ident, $b)',
    '| `($(_) fun ($x:ident : $t) ↦ $b)               => `(∃! ($x:ident : $t), $b)',
    '| _                                               => throw ()',


    'axiom Set : Type',
    'axiom membership : Set → Set → Prop',
    'infix:50 (priority := high) " ∈ " => membership',
    'infix:50 (priority := high) " ∉ " => (fun (x : Set) => (fun (y : Set) => ¬ membership x y))',

    'axiom pick_P (P : Set → Prop) (h : ∃ x, P x) : Set',

    'axiom pick_P_property (P : Set → Prop) (h : ∃ x, P x) : P (pick_P P h)',
    'axiom pick_unique_P (P : Set → Prop) (h : ∃! x, P x) : Set',
    'axiom pick_unique_P_property (P : Set → Prop) (h : ∃! x, P x) : P (pick_unique_P P h) ∧ ∀ x, x ≠ pick_unique_P P h → ¬P x',
    'def forall_in_A (P : Set → Prop) (A : Set) : Prop := (∀ x, (x ∈ A → P x))',

    'def exists_in_A (P : Set → Prop) (A : Set) : Prop := (∃ x, (x ∈ A ∧ P x))',
    'def exists_uniq_in_A (P : Set → Prop) (A : Set) : Prop := (∃! x, (x ∈ A ∧ P x))',

    'declare_syntax_cat idents',
    'syntax ident : idents',

    'syntax ident idents : idents',
    'syntax "∀" idents "∈" term ";" term : term',
    'syntax "∃" idents "∈" term ";" term : term',
    'syntax "∃!" idents "∈" term ";" term : term',

    'macro_rules',
    '| `(∀ $idnt:ident ∈ $A:term; $b:term)  => `(forall_in_A (fun $idnt:ident => $b) $A)',
    '| `(∀ $idnt:ident $idnts:idents ∈ $A:term; $b:term) => `(forall_in_A (fun $idnt:ident => (∀ $idnts:idents ∈ $A; $b)) $A)',
    '| `(∃ $idnt:ident ∈ $A:term; $b:term)  => `(exists_in_A (fun $idnt:ident => $b) $A)',
    '| `(∃ $idnt:ident $idnts:idents ∈ $A:term; $b:term) => `(exists_in_A (fun $idnt:ident => (∀ $idnts:idents ∈ $A; $b)) $A)',
    '| `(∃! $idnt:ident ∈ $A:term; $b:term)  => `(exists_uniq_in_A (fun $idnt:ident => $b) $A)',
    '| `(∃! $idnt:ident $idnts:idents ∈ $A:term; $b:term) => `(exists_uniq_in_A (fun $idnt:ident => (∀ $idnts:idents ∈ $A; $b)) $A)',


    'def empty (A : Set) : Prop := ∀ b, (b ∉ A)',
    'def non_empty (A : Set) : Prop := ∃ b, (b ∈ A)',
    'def subset (A B : Set) : Prop := ∀ x ∈ A; x ∈ B',
    'def is_successor (m n : Set) : Prop := ∀ x, (x ∈ n ↔ x ∈ m ∨ x = m)',
    'infix:50 (priority := high) " ⊆ " => subset',
    'axiom exists_unique_empty : (∃! x, empty x)',
    'axiom unique_unordered_pair : (∀ a₁ a₂, ∃! C, ∀ x, (x ∈ C ↔ x = a₁ ∨ x = a₂))',
    'axiom unique_union : ∀ A, ∃! B, ∀ x, (x ∈ B ↔ ∃ y ∈ A; x ∈ y)',
    'axiom unique_specification (P : Set → Prop) : (∀ A, ∃! B, ∀ x, (x ∈ B ↔ x ∈ A ∧ P x))',
    'axiom unique_boolean : (∀ A, ∃! B, ∀ x, (x ∈ B ↔ x ⊆ A))',
    'noncomputable def empty_set := pick_unique_P empty exists_unique_empty',
    'noncomputable def unordered_pair_set : (Set → Set → Set) := fun (a₁ : Set) => fun (a₂ : Set) =>',
      'pick_unique_P (fun (B) => ∀ x, (x ∈ B ↔ x = a₁ ∨ x = a₂)) (unique_unordered_pair a₁ a₂)',
    'noncomputable def singleton_set : (Set → Set) := fun (a) => unordered_pair_set a a',
    'noncomputable def union_set : (Set → Set) := fun (A) => pick_unique_P (fun (B) => ∀ x, (x ∈ B ↔ ∃ y ∈ A; x ∈ y)) (unique_union A)',
    'noncomputable def specification_set (P : Set → Prop) : (Set → Set) :=',
    '  fun (A) => pick_unique_P (fun (B) => (∀ x, x ∈ B ↔ x ∈ A ∧ P x)) (unique_specification P A)',
    'noncomputable def boolean_func_sym : Set → Set :=',
    'fun (A : Set) => pick_unique_P (fun (B : Set) => ∀ x, (x ∈ B ↔ x ⊆ A)) (unique_boolean A)',
    'notation (priority := high) "∅" => empty_set',
    'notation (priority := high) "{" a₁ ", " a₂ "}" => unordered_pair_set a₁ a₂',
    'notation (priority := high) "{" a "}" => singleton_set a',
    'notation (priority := high) "⋃" => union_set',
    'notation (priority := high) "ℙow" => boolean_func_sym',

    'syntax "{" ident "∈" term "|" term "}" : term',
    'macro_rules',
    '| `({ $x:ident ∈ $A:term | $property:term })  => `(specification_set (fun ($x) => $property) $A)',

    'noncomputable def intersection_set : Set → Set := fun (A) => {x ∈ ⋃ A | ∀ y ∈ A; x ∈ y}',
    'notation (priority := high) "⋂" => intersection_set',
    
    'noncomputable def union_2sets (A B : Set) := ⋃ {A, B}',
    'infix:60 (priority:=high) " ∪ " => union_2sets',

    'noncomputable def intersect_2sets (A B : Set) := {x ∈ A | x ∈ B}',
    'infix:60 (priority:=high) " ∩ " => intersect_2sets',

    'noncomputable def difference (A B : Set) := {x ∈ A | x ∉ B}',
    'infix:60 (priority:=high) " \\\\ " => difference',

    'noncomputable def symmetric_difference (A B : Set) := (A \\ B) ∪ (B \\ A)',
    'infix:60 (priority:=high) " △ " => symmetric_difference',
    'declare_syntax_cat set_comprehension',

    'syntax term "; " set_comprehension : set_comprehension',
    'syntax term : set_comprehension',
    
    'syntax "{" set_comprehension "}" : term',
    
    'macro_rules',
    '| `({$term1:term; $term2:term}) => `(unordered_pair_set $term1:term $term2:term)',
    '| `({$elem:term; $rest:set_comprehension}) => `({$rest:set_comprehension} ∪ {$elem:term})',

    'noncomputable def ordered_pair_set (a b : Set) := {{a}, {a, b}}',
    'notation (priority := high) "(" a₁ ", " a₂ ")" => ordered_pair_set a₁ a₂',

    'theorem ordered_pair_set_prop : ∀ a b c d, (a, b) = (c, d) ↔ (a = c ∧ b = d) := sorry',
    'theorem ordered_pair_set_belonging: ∀ A B, ∀ a ∈ A; ∀ b ∈ B; (a, b) ∈ ℙow (ℙow (A ∪ B)) := sorry',
    'theorem inter_pair_is_singl_fst : ∀ a b, ⋂ (a, b) = {a} := sorry',
    'theorem union_pair_is_all_coords : ∀ a b, ⋃ (a, b) = {a, b} := sorry',
    'theorem coordinates_snd_corr_lemma : ∀ a b, {x ∈ ⋃ (a, b) | ⋃ (a, b) ≠ ⋂ (a, b) → x ∉ ⋂ (a, b)} = {b} := sorry',
    'noncomputable def fst_coor (A : Set) : Set := ⋃ (⋂ A)',
    'noncomputable def snd_coor (A : Set) : Set := ⋃ ({x ∈ ⋃ A | ⋃ A ≠ ⋂ A → x ∉ ⋂ A})',
    'theorem coordinates_fst_coor : ∀ a b, fst_coor (a, b) = a := sorry',
    'theorem coordinates_snd_coor : ∀ a b, snd_coor (a, b) = b := sorry',
    'noncomputable def cartesian_product (A : Set) (B : Set) : Set := {z ∈ ℙow (ℙow (A ∪ B)) | ∃ x ∈ A; ∃ y ∈ B; z = (x, y)}',
    'infix:60 (priority:=high) " × " => cartesian_product',
    'theorem cartesian_product_is_cartesian: ∀ A B pr, pr ∈ (A × B) ↔ (∃ x ∈ A; ∃ y ∈ B; pr = (x, y)) := sorry',
    'theorem cartesian_product_pair_prop : ∀ A B a b, (a, b) ∈ (A × B) ↔ (a ∈ A ∧ b ∈ B) := sorry',
    'declare_syntax_cat pair_comprehension',
    'syntax  pair_comprehension "; " term : pair_comprehension',
    'syntax term : pair_comprehension',
    'syntax "⁅" pair_comprehension "⁆" : term',
    'macro_rules',
    '| `(⁅ $term1:term⁆) => `($term1)',
    '| `(⁅ $term1:term; $term2:term⁆) => `(ordered_pair_set $term1 $term2)',
    '| `(⁅ $rest:pair_comprehension; $elem:term⁆) => `(ordered_pair_set ⁅$rest:pair_comprehension⁆ $elem:term)',
    'noncomputable def binary_relation (R : Set) : Prop := ∀ z ∈ R; ∃ a, ∃ b, z = (a, b)',
    'macro_rules',
    '| `(($x:term . $P:term . $y:term)) => `(($x, $y) ∈ $P)',
    'theorem binary_relation_elements_set: ∀ R x y, (x . R . y) → (x ∈ ⋃ (⋃ R) ∧ y ∈ ⋃ (⋃ R)) := sorry',
    'noncomputable def dom (R : Set) := {x ∈ ⋃ (⋃ R) | ∃ y, (x . R . y)}',
    'noncomputable def rng (R : Set) := {y ∈ ⋃ (⋃ R) | ∃ x, (x . R . y)}',
    'theorem dom_rng_rel_prop: ∀ R, (binary_relation R) → (dom R ∪ rng R = ⋃ (⋃ R)) := sorry',
    'theorem dom_prop : ∀ R x, x ∈ dom R ↔ ∃ y, (x . R . y) := sorry',
    'theorem rng_prop : ∀ R y, y ∈ rng R ↔ ∃ x, (x . R . y) := sorry',
    'theorem binary_relation_prop : ∀ R, binary_relation R → R ⊆ dom R × rng R := sorry',
    'theorem prop_then_binary_relation : ∀ A B R, R ⊆ A × B → binary_relation R ∧ dom R ⊆ A ∧ rng R ⊆ B := sorry',
    'theorem rel_dom_rng_elem : ∀ R, binary_relation R → ∀ x y, (x . R . y) → x ∈ dom R ∧ y ∈ rng R := sorry',
    'theorem union2_rel_is_rel : ∀ P Q, binary_relation P → binary_relation Q → binary_relation (P ∪ Q) := sorry',
    'theorem intersect2_rel_is_rel : ∀ P Q, binary_relation P → binary_relation Q → binary_relation (P ∩ Q) := sorry',
    'noncomputable def binary_relation_between (A B R : Set) : Prop := R ⊆ A × B',
    'noncomputable def binary_relation_on (A R : Set) : Prop := R ⊆ A × A',
    'noncomputable def comp (A B R : Set) : Set := (A × B) \\ R',
    'theorem comp_is_rel : ∀ A B R, binary_relation (comp A B R) := sorry',
    'noncomputable def inv (R : Set) : Set := {z ∈ rng R × dom R | ∃ x, ∃ y, (z = (y, x) ∧ (x . R . y))}',
    'syntax term"⁻¹" : term',
    'macro_rules',
    '| `($term1:term⁻¹) => `(inv $term1)',
    'noncomputable def composition (P Q : Set) : Set := {pr ∈ dom Q × rng P | ∃ x y, (pr = (x, y)) ∧ ∃ z, (x . Q . z) ∧ (z . P . y)}',

    'infix:60 (priority:=high) " ∘ " => composition',
    'theorem inv_is_rel : ∀ R, binary_relation R → (binary_relation (R⁻¹)) := sorry',
    'theorem relation_equality : (∀ P Q, binary_relation P → binary_relation Q → ((∀ x y, (x . P . y) ↔ (x . Q . y)) → P = Q)) := sorry',
    'theorem inv_prop : ∀ R, binary_relation R → (R⁻¹)⁻¹ = R := sorry',
    'theorem composition_assoc : ∀ P Q R, ((P ∘ Q) ∘ R) = (P ∘ (Q ∘ R)) := sorry',
    'theorem inv_composition_prop : ∀ P Q, binary_relation P → binary_relation Q → (P ∘ Q)⁻¹ = ((Q⁻¹) ∘ (P⁻¹)) := sorry',
    'theorem inv_union_prop : ∀ P Q, binary_relation P → binary_relation Q → (P ∪ Q)⁻¹ = ((P⁻¹) ∪ Q⁻¹) := sorry',
    'theorem comp_inv_prop : ∀ P A B, binary_relation_between A B P → comp A B (P⁻¹) = (comp B A P)⁻¹ := sorry',
    'theorem union_composition_prop_right : ∀ P Q R, ((P ∪ Q) ∘ R) = ((P ∘ R) ∪ (Q ∘ R)) := sorry',
    'theorem compostion_union_prop_left : ∀ P Q R, P ∘ (Q ∪ R) = (P ∘ Q) ∪ (P ∘ R) := sorry',
    'theorem monotonic_subset_composition_right : ∀ P Q R, P ⊆ Q → P ∘ R ⊆ Q ∘ R := sorry',
    'theorem monotonic_subset_composition_left : ∀ P Q R, P ⊆ Q → R ∘ P ⊆ R ∘ Q := sorry',
    'theorem intersect2_composition_prop_right: ∀ P Q R, (P ∩ Q) ∘ R ⊆ (P ∘ R) ∩ (Q ∘ R) := sorry',
    'theorem intersect2_composition_prop: ∀ P Q R, P ∘ (Q ∩ R) ⊆ (P ∘ Q) ∩ (P ∘ R) := sorry',
    'noncomputable def id_ (A : Set) : Set := {t ∈ (A × A) | ∃ x : Set, t = (x, x)}',
    'theorem id_is_rel : ∀ A, binary_relation (id_ A) := sorry',
    'theorem id_prop : ∀ A x y, (x . (id_ A) . y) → (((x = y) ∧ (x ∈ A)) ∧ (y ∈ A)) := sorry',
    'theorem prop_then_id : ∀ A, ∀ x ∈ A; (x . (id_ A) . x) := sorry',
    'theorem inv_id : ∀ A, ((id_ A)⁻¹) = (id_ A) := sorry',
    'theorem id_rel_composition_right : ∀ A B R, binary_relation_between A B R → (R ∘ (id_ A)) = R := sorry',
    'theorem id_rel_composition_left : ∀ A B  R, binary_relation_between A B R → ((id_ B) ∘ R) = R := sorry',
    'noncomputable def rel_image (X R : Set) := {b ∈ rng R | ∃ a ∈ X; (a . R . b)}',
    'syntax  term ".[" term "]" : term',
    'macro_rules',
    '  | `($R:term .[ $X:term ])  => `(rel_image $X $R)',
    'theorem rng_is_rel_image : ∀ R, binary_relation R → rng R = R.[dom R] := sorry',
    'theorem rel_pre_image_eq : ∀ Y R, binary_relation R → R⁻¹.[Y] = {a ∈ dom R | ∃ b ∈ Y; (a . R . b)} := sorry',
    'theorem dom_preimage : ∀ A B P, binary_relation_between A B P → dom P = P⁻¹.[B] := sorry',
    'theorem rel_image_union : ∀ X Y R, binary_relation R → R.[X ∪ Y] = R.[X] ∪ R.[Y] := sorry',
    'theorem rel_preimage_union : ∀ X Y R , binary_relation R → R⁻¹.[X ∪ Y] = R⁻¹.[X] ∪ R⁻¹.[Y] := sorry',
    'theorem monotonic_rel_image : ∀ X Y R, binary_relation R → X ⊆ Y → R.[X] ⊆ R.[Y] := sorry',
    'theorem monotonic_rel_preimage : ∀ X Y R, binary_relation R → X ⊆ Y → R⁻¹.[X] ⊆ R⁻¹.[Y] := sorry',
    'theorem rel_image_inter : ∀ X Y R, binary_relation R → R.[X ∩ Y] ⊆ (R.[X] ∩ R.[Y]) := sorry',
    'theorem rel_preimage_inter : ∀ X Y R, binary_relation R → R⁻¹.[X ∩ Y] ⊆ (R⁻¹.[X] ∩ R⁻¹.[Y]) := sorry',
    'theorem rel_image_composition : ∀ P Q X, (P ∘ Q).[X] = P.[Q.[X]] := sorry',
    'theorem rel_preimage_composition : ∀ P Q X, binary_relation P → binary_relation Q → (P ∘ Q)⁻¹.[X] = Q⁻¹.[P⁻¹.[X]] := sorry'
];


const first_requirements = [
    'theorem ordered_pair_set_prop : ∀ a b c d, (a, b) = (c, d) ↔ (a = c ∧ b = d) :=',
    'theorem ordered_pair_set_belonging: ∀ A B, ∀ a ∈ A; ∀ b ∈ B; (a, b) ∈ ℙow (ℙow (A ∪ B)) :=',
    'theorem inter_pair_is_singl_fst : ∀ a b, ⋂ (a, b) = {a} :=',
    'theorem union_pair_is_all_coords : ∀ a b, ⋃ (a, b) = {a, b} :=',
    'theorem coordinates_snd_corr_lemma : ∀ a b, {x ∈ ⋃ (a, b) | ⋃ (a, b) ≠ ⋂ (a, b) → x ∉ ⋂ (a, b)} = {b} :=',
    'theorem coordinates_fst_coor : ∀ a b, fst_coor (a, b) = a :=',
    'theorem coordinates_snd_coor : ∀ a b, snd_coor (a, b) = b :=',
    'theorem cartesian_product_is_cartesian: ∀ A B pr, pr ∈ (A × B) ↔ (∃ x ∈ A; ∃ y ∈ B; pr = (x, y)) :=',
    'theorem cartesian_product_pair_prop : ∀ A B a b, (a, b) ∈ (A × B) ↔ (a ∈ A ∧ b ∈ B) :=',
    'theorem binary_relation_elements_set: ∀ R x y, (x . R . y) → (x ∈ ⋃ (⋃ R) ∧ y ∈ ⋃ (⋃ R)) :=',
    'theorem dom_rng_rel_prop: ∀ R, (binary_relation R) → (dom R ∪ rng R = ⋃ (⋃ R)) :=',
    'theorem dom_prop : ∀ R x, x ∈ dom R ↔ ∃ y, (x . R . y) :=',
    'theorem rng_prop : ∀ R y, y ∈ rng R ↔ ∃ x, (x . R . y) :=',
    'theorem binary_relation_prop : ∀ R, binary_relation R → R ⊆ dom R × rng R :=',
    'theorem prop_then_binary_relation : ∀ A B R, R ⊆ A × B → binary_relation R ∧ dom R ⊆ A ∧ rng R ⊆ B :=',
    'theorem rel_dom_rng_elem : ∀ R, binary_relation R → ∀ x y, (x . R . y) → x ∈ dom R ∧ y ∈ rng R :=',
    'theorem union2_rel_is_rel : ∀ P Q, binary_relation P → binary_relation Q → binary_relation (P ∪ Q) :=',
    'theorem intersect2_rel_is_rel : ∀ P Q, binary_relation P → binary_relation Q → binary_relation (P ∩ Q) :=',
    'theorem comp_is_rel : ∀ A B R, binary_relation (comp A B R) :=',
    'theorem inv_is_rel : ∀ R, binary_relation R → (binary_relation (R⁻¹)) :=',
    'theorem relation_equality : (∀ P Q, binary_relation P → binary_relation Q → ((∀ x y, (x . P . y) ↔ (x . Q . y)) → P = Q)) :=',
    'theorem inv_prop : ∀ R, binary_relation R → (R⁻¹)⁻¹ = R :=',
    'theorem composition_assoc : ∀ P Q R, ((P ∘ Q) ∘ R) = (P ∘ (Q ∘ R)) :=',
    'theorem inv_composition_prop : ∀ P Q, binary_relation P → binary_relation Q → (P ∘ Q)⁻¹ = ((Q⁻¹) ∘ (P⁻¹)) :=',
    'theorem inv_union_prop : ∀ P Q, binary_relation P → binary_relation Q → (P ∪ Q)⁻¹ = ((P⁻¹) ∪ Q⁻¹) :=',
    'theorem comp_inv_prop : ∀ P A B, binary_relation_between A B P → comp A B (P⁻¹) = (comp B A P)⁻¹ :=',
    'theorem union_composition_prop_right : ∀ P Q R, ((P ∪ Q) ∘ R) = ((P ∘ R) ∪ (Q ∘ R)) :=',
    'theorem compostion_union_prop_left : ∀ P Q R, P ∘ (Q ∪ R) = (P ∘ Q) ∪ (P ∘ R) :=',
    'theorem monotonic_subset_composition_right : ∀ P Q R, P ⊆ Q → P ∘ R ⊆ Q ∘ R :=',
    'theorem monotonic_subset_composition_left : ∀ P Q R, P ⊆ Q → R ∘ P ⊆ R ∘ Q :=',
    'theorem intersect2_composition_prop_right: ∀ P Q R, (P ∩ Q) ∘ R ⊆ (P ∘ R) ∩ (Q ∘ R) :=',
    'theorem intersect2_composition_prop: ∀ P Q R, P ∘ (Q ∩ R) ⊆ (P ∘ Q) ∩ (P ∘ R) :=',
    'theorem id_is_rel : ∀ A, binary_relation (id_ A) :=',
    'theorem id_prop : ∀ A x y, (x . (id_ A) . y) → (((x = y) ∧ (x ∈ A)) ∧ (y ∈ A)) :=',
    'theorem prop_then_id : ∀ A, ∀ x ∈ A; (x . (id_ A) . x) :=',
    'theorem inv_id : ∀ A, ((id_ A)⁻¹) = (id_ A) :=',
    'theorem id_rel_composition_right : ∀ A B R, binary_relation_between A B R → (R ∘ (id_ A)) = R :=',
    'theorem id_rel_composition_left : ∀ A B  R, binary_relation_between A B R → ((id_ B) ∘ R) = R :=',
    'theorem rng_is_rel_image : ∀ R, binary_relation R → rng R = R.[dom R] :=',
    'theorem rel_pre_image_eq : ∀ Y R, binary_relation R → R⁻¹.[Y] = {a ∈ dom R | ∃ b ∈ Y; (a . R . b)} :=',
    'theorem dom_preimage : ∀ A B P, binary_relation_between A B P → dom P = P⁻¹.[B] :=',
    'theorem rel_image_union : ∀ X Y R, binary_relation R → R.[X ∪ Y] = R.[X] ∪ R.[Y] :=',
    'theorem rel_preimage_union : ∀ X Y R , binary_relation R → R⁻¹.[X ∪ Y] = R⁻¹.[X] ∪ R⁻¹.[Y] :=',
    'theorem monotonic_rel_image : ∀ X Y R, binary_relation R → X ⊆ Y → R.[X] ⊆ R.[Y] :=',
    'theorem monotonic_rel_preimage : ∀ X Y R, binary_relation R → X ⊆ Y → R⁻¹.[X] ⊆ R⁻¹.[Y] :=',
    'theorem rel_image_inter : ∀ X Y R, binary_relation R → R.[X ∩ Y] ⊆ (R.[X] ∩ R.[Y]) :=',
    'theorem rel_preimage_inter : ∀ X Y R, binary_relation R → R⁻¹.[X ∩ Y] ⊆ (R⁻¹.[X] ∩ R⁻¹.[Y]) :=',
    'theorem rel_image_composition : ∀ P Q X, (P ∘ Q).[X] = P.[Q.[X]] :=',
    'theorem rel_preimage_composition : ∀ P Q X, binary_relation P → binary_relation Q → (P ∘ Q)⁻¹.[X] = Q⁻¹.[P⁻¹.[X]] :='
]




const document2 = {
    id: 2,
    course: '/math/set',
    title: 'Binary relations',
    difficulty: 'Medium',
    video_id: 'y3svPgyGnLc',
    accepted: 0,
    submitted: 0,
    description_text:
        'This is task to prove, using <b>LEAN 4</b> language. <br> Proofs should be done, by writing constructive <b>proof terms with the help of constructors and destructors</b>.' + 
        '<br> In each math problem you will be given a list of permitted constructors, destructors and theorems <br>' + 
        '<br> To proof each theorem, remove <b>"sorry"</b> and replace it with <b>proof term</b>. <br>' +
        '<br> In this problem we will define ordered pair, cartesian product, binary relation, domain, range, inverse relation, composition of relations, image, preimage' +
        '<br> You will need to proof theorems about this concepts' +
        '<br> You can use all logical constructors and destructors' +
        '<br> You can use all proved logical theorems and their built-in implementation' +
        '<br> You can use all statements in the previous Set Theory task' +
        '<br> You can use "let ident := term" constructions to create provisional variables to name some proved logic expressions or Sets' +
        '<br> You can use calc expression to proof something by transitivity (don\'t use rewrite, simp or something like this) or tactics',

    examples: [],
    constraints: [],
    note: 'You can use Classical wherever you want.  <br> <br> For reference, see this documentation: <a href="https://leanprover.github.io/theorem_proving_in_lean4/title_page.html">LEAN 4 proving</a>',
    languages: [['LEAN', 'lean']],
    initial_codes: {
        lean: add_lines(first_problem_code),
    },
    initial_language: 'lean',
    requirements: first_requirements
}









connectToDatabase()
    .then(async () => {
        await initializeConnectionPool();
        await updateDocumentByKey('mycollection', '60E878EFEBDE4F3ABF91488630421E90', document2);
        await closeConnection();

    })
    .catch(err => {
        console.error(err);
    });



