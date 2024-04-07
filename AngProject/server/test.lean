--your proof goes here

theorem neg_true : ¬ True ↔ False := sorry

theorem neg_false : ¬ False ↔ True := sorry

theorem conj_true (p : Prop) : p ∧ True ↔ p := sorry

theorem conj_false (p : Prop) : p ∧ False ↔ False := sorry

theorem disj_true (p : Prop) : p ∨ True ↔ True := sorry

theorem disj_false (p : Prop) : p ∨ False ↔ p := sorry

theorem impl_true (p : Prop) : p → True ↔ True := sorry

theorem true_impl (p : Prop) : True → p ↔ p := sorry

theorem impl_false (p : Prop) : p → False ↔ ¬ p := sorry

theorem false_impl (p : Prop) : False → p ↔ True := sorry

theorem axiomatic_rule (p : Prop) : p → p := sorry

theorem trivial_equivalence (p : Prop) : p ↔ p := sorry

theorem conj_idemp (p : Prop) : p ↔ p ∧ p := sorry

theorem disj_idemp (p : Prop) : p ↔ p ∨ p := sorry

theorem conj_comm (p q : Prop) : (p ∧ q) ↔ (q ∧ p) := sorry

theorem disj_comm (p q : Prop) : (p ∨ q) ↔ (q ∨ p) := sorry

theorem impl_comm (p q : Prop) : (p ↔ q) ↔ (q ↔ p) := sorry

theorem conj_assoc (p q r : Prop) : (p ∧ q) ∧ r ↔ p ∧ (q ∧ r) := sorry

theorem disj_assoc (p q r : Prop) : (p ∨ q) ∨ r ↔ p ∨ (q ∨ r) := sorry

theorem conj_disj_distrib (p q r : Prop) : p ∧ (q ∨ r) ↔ (p ∧ q) ∨ (p ∧ r) := sorry

theorem disj_conj_distrib (p q r : Prop) : p ∨ (q ∧ r) ↔ (p ∨ q) ∧ (p ∨ r) := sorry

theorem morgan_disj (p q : Prop) :  ¬(p ∨ q) ↔ ¬p ∧ ¬q := sorry

theorem morgan_conj_mpr (p q : Prop) : ¬p ∨ ¬q → ¬(p ∧ q) := sorry

theorem impl_def_mpr (p q : Prop) : (¬p ∨ q) → (p → q) := sorry

theorem neg_imp_def_mpr (p q : Prop) : p ∧ ¬q → ¬(p → q) := sorry

theorem neg_to_impl (p q : Prop) : ¬p → (p → q) := sorry

theorem contraposition_mp (p q : Prop) : (p → q) → (¬q → ¬p) := sorry

theorem exportation_law (p q r : Prop) : (p → (q → r)) ↔ (p ∧ q → r) := sorry

theorem cases_impl_left (p q r : Prop) : ((p ∨ q) → r) ↔ (p → r) ∧ (q → r) := sorry

theorem syllogism (p q r : Prop) : (p → q) → (q → r) → (p → r) := sorry

theorem disj_congr (p q r : Prop) : (p ↔ q) → ((p ∨ r) ↔ (q ∨ r)) := sorry

theorem conj_congr (p q r : Prop) : (p ↔ q) → ((p ∧ r) ↔ (q ∧ r)) := sorry

theorem impl_congr_right (p q r : Prop) : (p ↔ q) → ((p → r) ↔ (q → r)) := sorry

theorem impl_congr_left (p q r : Prop) : (p ↔ q) → ((r → p) ↔ (r → q)) := sorry

theorem iff_congr_ (p q r : Prop) : (p ↔ q) → ((p ↔ r) ↔ (q ↔ r)) := sorry

theorem iff_conj_intro(p q r : Prop) : (p ↔ q) → (p ↔ r) → (p ↔ (q ∧ r)) := sorry

theorem iff_transitivity (p q r : Prop) : (p ↔ q) → (q ↔ r) → (p ↔ r) := sorry

theorem no_contradiction (p : Prop) : ¬ (p ∧ ¬ p) := sorry

theorem double_negation_mp (p : Prop) : p → ¬¬ p := sorry

theorem negation_not_equiv (p : Prop) : ¬(p ↔ ¬p) := sorry

open Classical

theorem double_negation (p : Prop) : p ↔ ¬¬p := sorry

theorem tnd (p : Prop) : p ∨ ¬ p := sorry

theorem cases_analysis (p q : Prop) : (p → q) → (¬p → q) → q := sorry

theorem cases_impl_right (p q r : Prop) : (p → q ∨ r) → ((p → q) ∨ (p → r)) := sorry

theorem Morgan_disj (p q : Prop) : ¬ (p ∧ q) ↔ ¬p ∨ ¬q := sorry

theorem neg_imp_def (p q : Prop) :  ¬ (p → q) ↔ p ∧ ¬ q := sorry

theorem imp_def (p q : Prop) : (p → q) ↔ (¬p ∨ q) := sorry

theorem contraposition (p q : Prop) : (p → q) ↔ (¬q → ¬p) := sorry

theorem peirce (p q : Prop) : (((p → q) → p) → p) := sorry