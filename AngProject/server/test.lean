def exists_unique (P : α → Prop) : Prop := (∃ (x : α), P x ∧ (∀ y : α, (P y → x = y)))
open Lean TSyntax.Compat in
macro "∃!" xs:explicitBinders ", " b:term : term => expandExplicitBinders ``exists_unique xs b
@[app_unexpander exists_unique] def unexpandexists_unique: Lean.PrettyPrinter.Unexpander
| `($(_) fun $x:ident ↦ ∃! $xs:binderIdent*, $b) => `(∃! $x:ident $xs:binderIdent*, $b)
| `($(_) fun $x:ident ↦ $b)                      => `(∃! $x:ident, $b)
| `($(_) fun ($x:ident : $t) ↦ $b)               => `(∃! ($x:ident : $t), $b)
| _                                               => throw ()




axiom Set : Type
axiom membership : Set → Set → Prop
infix:50 (priority := high) " ∈ " => membership
infix:50 (priority := high) " ∉ " => (fun (x : Set) => (fun (y : Set) => ¬ membership x y))


-- we proved before
axiom eq_subst (P : Set → Prop) : (∀ (a b : Set), a = b → P a → P b)
axiom eq_symm (x y : Set) : (x = y) → (y = x)
axiom iff_congr_pred_arg (P : Prop → Prop) : (∀ (x y : Prop), (x ↔ y) → (P x ↔ P y))
axiom iff_subst_pred_arg (P : Prop → Prop) : (∀ (x y : Prop), (x ↔ y) → (P x → P y))

axiom pick_P (P : Set → Prop) (h : ∃ x, P x) : Set
axiom pick_P_property (P : Set → Prop) (h : ∃ x, P x) : P (pick_P P h)
axiom pick_unique_P (P : Set → Prop) (h : ∃! x, P x) : Set
axiom pick_unique_P_property (P : Set → Prop) (h : ∃! x, P x) : P (pick_unique_P P h) ∧ ∀ x, x ≠ pick_unique_P P h → ¬P x


def forall_in_A (P : Set → Prop) (A : Set) : Prop := (∀ x, (x ∈ A → P x))
def exists_in_A (P : Set → Prop) (A : Set) : Prop := (∃ x, (x ∈ A ∧ P x))
def exists_uniq_in_A (P : Set → Prop) (A : Set) : Prop := (∃! x, (x ∈ A ∧ P x))

declare_syntax_cat idents
syntax ident : idents
syntax ident idents : idents

syntax "∀" idents "∈" term ";" term : term
syntax "∃" idents "∈" term ";" term : term
syntax "∃!" idents "∈" term ";" term : term


macro_rules
  | `(∀ $idnt:ident ∈ $A:term; $b:term)  => `(forall_in_A (fun $idnt:ident => $b) $A)
  | `(∀ $idnt:ident $idnts:idents ∈ $A:term; $b:term) => `(forall_in_A (fun $idnt:ident => (∀ $idnts:idents ∈ $A; $b)) $A)
  | `(∃ $idnt:ident ∈ $A:term; $b:term)  => `(exists_in_A (fun $idnt:ident => $b) $A)
  | `(∃ $idnt:ident $idnts:idents ∈ $A:term; $b:term) => `(exists_in_A (fun $idnt:ident => (∀ $idnts:idents ∈ $A; $b)) $A)
  | `(∃! $idnt:ident ∈ $A:term; $b:term)  => `(exists_uniq_in_A (fun $idnt:ident => $b) $A)
  | `(∃! $idnt:ident $idnts:idents ∈ $A:term; $b:term) => `(exists_uniq_in_A (fun $idnt:ident => (∀ $idnts:idents ∈ $A; $b)) $A)


def empty (A : Set) : Prop := ∀ b, (b ∉ A)
def non_empty (A : Set) : Prop := ∃ b, (b ∈ A)
def subset (A B : Set) : Prop := ∀ x ∈ A; x ∈ B
def is_successor (m n : Set) : Prop := ∀ x, (x ∈ n ↔ x ∈ m ∨ x = m)
infix:50 (priority := high) " ⊆ " => subset

axiom subset_refl : ∀ A, A ⊆ A

axiom subset_trans_curry : ∀ A B C, A ⊆ B → B ⊆ C → A ⊆ C
axiom subset_trans_export : ∀ A B C, A ⊆ B ∧ B ⊆ C → A ⊆ C
axiom empty_subset_any : ∀ A B, empty A → A ⊆ B


def set_equality (A B : Set) := ∀ x, (x ∈ A ↔ x ∈ B)
axiom boolean : ∀ A, ∃ B, ∀ x, (x ∈ B ↔ x ⊆ A)
axiom extensionality : ∀ A B, set_equality A B → (A = B)
axiom exists_unique_empty : (∃! x, empty x)
axiom unique_unordered_pair : (∀ a₁ a₂, ∃! C, ∀ x, (x ∈ C ↔ x = a₁ ∨ x = a₂))
axiom unique_union : ∀ A, ∃! B, ∀ x, (x ∈ B ↔ ∃ y ∈ A; x ∈ y)
axiom unique_specification (P : Set → Prop) : (∀ A, ∃! B, ∀ x, (x ∈ B ↔ x ∈ A ∧ P x))
axiom unique_boolean : (∀ A, ∃! B, ∀ x, (x ∈ B ↔ x ⊆ A))



noncomputable def empty_set := pick_unique_P empty exists_unique_empty
noncomputable def unordered_pair_set : (Set → Set → Set) := fun (a₁ : Set) => fun (a₂ : Set) =>
  pick_unique_P (fun (B) => ∀ x, (x ∈ B ↔ x = a₁ ∨ x = a₂)) (unique_unordered_pair a₁ a₂)
noncomputable def singleton_set : (Set → Set) := fun (a) => unordered_pair_set a a
noncomputable def union_set : (Set → Set) := fun (A) => pick_unique_P (fun (B) => ∀ x, (x ∈ B ↔ ∃ y ∈ A; x ∈ y)) (unique_union A)
noncomputable def specification_set (P : Set → Prop) : (Set → Set) :=
  fun (A) => pick_unique_P (fun (B) => (∀ x, x ∈ B ↔ x ∈ A ∧ P x)) (unique_specification P A)



notation (priority := high) "∅" => empty_set
notation (priority := high) "{" a₁ ", " a₂ "}" => unordered_pair_set a₁ a₂
notation (priority := high) "{" a "}" => singleton_set a
notation (priority := high) "⋃" => union_set
syntax "{" ident "∈" term "|" term "}" : term
macro_rules
  | `({ $x:ident ∈ $A:term | $property:term })  => `(specification_set (fun ($x) => $property) $A)

noncomputable def union_2sets (A B : Set) := ⋃ {A, B}
infix:60 (priority:=high) " ∪ " => union_2sets

noncomputable def intersect_2sets (A B : Set) := {x ∈ A | x ∈ B}
infix:60 (priority:=high) " ∩ " => intersect_2sets

noncomputable def difference (A B : Set) := {x ∈ A | x ∉ B}
infix:60 (priority:=high) " \\ " => difference

noncomputable def symmetric_difference (A B : Set) := (A \ B) ∪ (B \ A)
infix:60 (priority:=high) " △ " => symmetric_difference

noncomputable def intersection_set : Set → Set := fun (A) => {x ∈ ⋃ A | ∀ y ∈ A; x ∈ y}
notation (priority := high) "⋂" => intersection_set


declare_syntax_cat set_comprehension
syntax term "; " set_comprehension : set_comprehension
syntax term : set_comprehension
syntax "{" set_comprehension "}" : term

macro_rules
| `({$term1:term; $term2:term}) => `(unordered_pair_set $term1:term $term2:term)
| `({$elem:term; $rest:set_comprehension}) => `({$rest:set_comprehension} ∪ {$elem:term})


-- was proved in the previous problem
axiom empty_set_is_empty : empty ∅
axiom empty_set_is_subset_any : ∀ A, ∅ ⊆ A
axiom elem_in_singl : ∀ x, x ∈ {x}
axiom in_singl_elem : ∀ a x, x ∈ {a} → x = a
axiom unordered_pair_set_is_unordered_pair : ∀ a₁ a₂ x, x ∈ {a₁, a₂} ↔ x = a₁ ∨ x = a₂
axiom unordered_pair_is_unordered : ∀ a₁ a₂, {a₁, a₂} = {a₂, a₁}
axiom union_set_is_union : (∀ A x, (x ∈ ⋃ A ↔ ∃ y ∈ A; x ∈ y))
axiom union_sing : ∀ A, ⋃ {A} = A
axiom intersection_set_is_intersection : ∀ A x, x ∈ ⋂ A ↔ (x ∈ ⋃ A ∧ ∀ y ∈ A; x ∈ y)
axiom intersection_non_empty : ∀ A, (A ≠ ∅ → ∀ x, (x ∈ ⋂ A) ↔ ∀ y ∈ A; x ∈ y)
axiom specification_set_is_specification (P : Set → Prop) : (∀ A x, x ∈ {x ∈ A | P x} ↔ x ∈ A ∧ P x)
axiom specification_set_subset (P : Set → Prop) : (∀ A, {x ∈ A | P x} ⊆ A)
axiom subset_then_equality : ∀ A B, A ⊆ B ∧ B ⊆ A → A = B
axiom union2_sets_prop : (∀ A B x, x ∈ A ∪ B ↔ x ∈ A ∨ x ∈ B)
axiom union2_sets_subset_prop : (∀ A B, A ⊆ A ∪ B ∧ B ⊆ A ∪ B)
axiom intersect_2sets_prop : (∀ A B x, x ∈ A ∩ B ↔ x ∈ A ∧ x ∈ B)
axiom intersect_2sets_subset_prop : ∀ A B, (A ∩ B ⊆ A) ∧ (A ∩ B ⊆ B)
axiom comp_2sets_subset_prop : ∀ A B, A \ B ⊆ A
axiom difference_prop : (∀ A B x, x ∈ A \ B ↔ x ∈ A ∧ x ∉ B)
axiom left_unordered_pair : ∀ a₁ a₂, a₁ ∈ {a₁, a₂}
axiom right_unordered_pair : ∀ a₁ a₂, a₂ ∈ {a₁, a₂}

noncomputable def boolean_func_sym : Set → Set :=
  fun (A : Set) => pick_unique_P (fun (B : Set) => ∀ x, (x ∈ B ↔ x ⊆ A)) (unique_boolean A)


notation (priority := high) "ℙow" => boolean_func_sym

theorem boolean_set_is_boolean : ∀ A, (∀ x, x ∈ ℙow A ↔ x ⊆ A) :=
  fun (A : Set) => And.left (pick_unique_P_property (fun (B : Set) => ∀ x, (x ∈ B ↔ x ⊆ A)) (unique_boolean A))

noncomputable def ordered_pair_set (a b : Set) := {{a}, {a, b}}
notation (priority := high) "(" a₁ ", " a₂ ")" => ordered_pair_set a₁ a₂


theorem ordered_pair_set_prop : ∀ a b c d, (a, b) = (c, d) ↔ (a = c ∧ b = d) :=
  fun (a) => fun(b) => fun(c) => fun(d) =>
    Iff.intro
    (
      fun (h : (a, b) = (c, d)) =>
        let first: {a} ∈ {{a}, {a, b}} := left_unordered_pair {a} {a, b}
        let second: {a} ∈ {{c}, {c, d}} := eq_subst (fun (x) => {a} ∈ x) (a, b) (c, d) h first
        let third: {a} = {c} ∨ {a} = {c, d} := Iff.mp (unordered_pair_set_is_unordered_pair {c} {c, d} {a}) second
        let ac : a = c
        := Or.elim (third) (
          fun (g : {a} = {c}) =>
            let fourth: c ∈ {c} := elem_in_singl c
            let fifth: c ∈ {a} := eq_subst (fun (x) => c ∈ x) {c} {a} (Eq.symm g) fourth
            Eq.symm (in_singl_elem a c fifth)
        ) (
          fun (g : {a} = {c, d}) =>
            let fourth: c ∈ {c, d} := left_unordered_pair c d
            let fifth: c ∈ {a} := eq_subst (fun (x) => c ∈ x) {c, d} {a} (Eq.symm g) fourth
            Eq.symm (in_singl_elem a c fifth)

        )

        let fourth: {a, b} ∈ {{a}, {a, b}} := right_unordered_pair {a} {a, b}
        let fifth: {a, b} ∈ {{c}, {c, d}} := eq_subst (fun (x) => {a, b} ∈ x) (a, b) (c, d) h fourth
        let sixth: {a, b} = {c} ∨ {a, b} = {c, d} :=Iff.mp (unordered_pair_set_is_unordered_pair {c} {c, d} {a, b}) fifth
        Or.elim (sixth) (
            fun (g : {a, b} = {c}) =>
              let seventh : b ∈ {a, b} := right_unordered_pair a b
              let eighth: b ∈ {c} := eq_subst (fun (x) => b ∈ x) {a, b} {c} g seventh
              let nineth: b = c := in_singl_elem c b eighth
              let tenth: {c, d} ∈ {{c}, {c, d}} := right_unordered_pair {c} {c, d}
              let eleventh: {c, d} ∈ {{a}, {a, b}} := eq_subst (fun (x) => {c, d} ∈ x) (c, d) (a, b) (Eq.symm h) tenth
              let twelve: {c, d} = {a} ∨ {c, d} = {a, b} := Iff.mp (unordered_pair_set_is_unordered_pair {a} {a, b} {c, d}) eleventh
              Or.elim (twelve)
              (
                fun (s : {c, d} = {a}) =>
                  let y₁ : d ∈ {c, d} := right_unordered_pair c d
                  let y₂ : d ∈ {a} := eq_subst (fun (x) => d ∈ x) {c, d} {a} s y₁
                  let y₃ : d = a := in_singl_elem a d y₂
                  let y₄ : d = c := Eq.trans y₃ ac
                  let y₅ : b = d := Eq.trans nineth (Eq.symm y₄)
                  And.intro ac y₅
              )
              (
                fun (s : {c, d} = {a, b}) =>
                  let y₁: d ∈ {c, d} := right_unordered_pair c d
                  let y₂ : d ∈ {a, b} := eq_subst (fun (x) => d ∈ x) {c, d} {a, b} s y₁
                  let y₃ : d = a ∨ d = b := Iff.mp (unordered_pair_set_is_unordered_pair a b d) y₂
                  Or.elim (y₃)
                  (
                    fun (y₄ : d = a) =>
                      let y₅ : d = c := Eq.trans y₄ ac
                      let y₆ : b = d := Eq.trans nineth (Eq.symm y₅)
                      And.intro ac y₆
                  )
                  (
                    fun (y₄ : d = b) =>
                      And.intro ac (Eq.symm y₄)
                  )
              )

        )
        (
          fun (g : {a, b} = {c, d}) =>
            let y₁ : {c, d} = {a, d} := eq_subst (fun (x) => {c, d} = {x, d}) c a (Eq.symm ac) (Eq.refl {c, d})
            let y₂ : {a, b} = {a, d} := Eq.trans g y₁
            let y₃ : d ∈ {a, d} := right_unordered_pair a d
            let y₄ : d ∈ {a, b} := eq_subst (fun (x) => d ∈ x) {a, d} {a, b} (Eq.symm y₂) y₃
            let y₅ := Iff.mp (unordered_pair_set_is_unordered_pair a b d) y₄
            Or.elim (y₅)
            (
              fun (y₆: d = a) =>
                let y₇ : d = c := Eq.trans y₆ ac
                let y₈ : b ∈ {a, b} := right_unordered_pair a b
                let y₉ : b ∈ {c, d} := eq_subst (fun (x) => b ∈ x) {a, b} {c, d} g y₈
                let t : b = c ∨ b = d := Iff.mp (unordered_pair_set_is_unordered_pair c d b) y₉
                Or.elim (t)
                (
                  fun (u : b = c) =>
                    And.intro ac (Eq.trans (u) (Eq.symm y₇))
                )
                (
                  fun (u : b = d) =>
                    And.intro ac u
                )
            )
            (
              fun (y₆ : d = b) =>
                And.intro ac (Eq.symm y₆)
            )
        )

    )
    (
      fun (h : (a = c ∧ b = d)) =>
        eq_subst (fun (x) => (a, b) = x) (c, b) (c, d)
        (eq_subst (fun (x) => (c, b) = (c, x)) b d (And.right h) (Eq.refl (c, b)))
        (eq_subst (fun (x) => (a, b) = (x, b)) a c (And.left h) (Eq.refl (a, b)))
    )







theorem ordered_pair_set_belonging: ∀ A B, ∀ a ∈ A; ∀ b ∈ B; (a, b) ∈ ℙow (ℙow (A ∪ B)) :=
    fun (A) => fun (B) => fun (a) => fun (g : (a ∈ A)) =>
      fun (b) => fun (h : (b ∈ B)) =>
        let first : ({a, b} ⊆ A ∪ B)
        := fun (x) => fun (s : (x ∈ {a, b})) => Or.elim (Iff.mp (unordered_pair_set_is_unordered_pair a b x) s)  (fun (r : x = a) =>
                let second := eq_subst (fun (s) => s ∈ A) (a) (x) (Eq.symm r) (g)
                let third := (Or.inl : (x ∈ A) → (x ∈ A ∨ x ∈ B)) second
                Iff.mpr (union2_sets_prop A B x) third
          ) (fun (r : x = b) =>
                let second := eq_subst (fun (s) => s ∈ B) (b) (x) (Eq.symm r) (h)
                let third := (Or.inr : (x ∈ B) → (x ∈ A ∨ x ∈ B)) second
                Iff.mpr (union2_sets_prop A B x) third

          )

        let fourth : ({a} ⊆ A ∪ B) := fun (x) => fun (s : (x ∈ {a})) => (
          let second := in_singl_elem a x s
          let third := eq_subst (fun (s) => s ∈ A) (a) (x) (Eq.symm second) (g)
          let fourth := (Or.inl : (x ∈ A) → (x ∈ A ∨ x ∈ B)) third
          Iff.mpr (union2_sets_prop A B x) fourth
        )

        let fifth : {a} ∈ ℙow (A ∪ B) := Iff.mpr (boolean_set_is_boolean (A ∪ B) {a}) (fourth)
        let sixth : {a, b} ∈ ℙow (A ∪ B) := Iff.mpr (boolean_set_is_boolean (A ∪ B) {a, b}) (first)

        let seventh : {{a}, {a, b}} ⊆ ℙow (A ∪ B) := fun (x) => fun (s : x ∈ {{a}, {a, b}}) => Or.elim (Iff.mp (unordered_pair_set_is_unordered_pair {a} {a, b} x) s) (fun (r : x = {a}) =>
          eq_subst (fun (t) => t ∈ ℙow (A ∪ B)) {a} x (Eq.symm r) fifth

        ) (
          fun (r : x = {a, b}) => eq_subst (fun (t) => t ∈ ℙow (A ∪ B)) {a, b} x (Eq.symm r) sixth
        )

        Iff.mpr (boolean_set_is_boolean (ℙow (A ∪ B)) (a, b)) seventh


theorem inter_pair_is_singl_fst : ∀ a b, ⋂ (a, b) = {a} :=
  fun (a) => fun (b) =>
    extensionality (⋂ (a, b)) {a}
    (
      fun (x) =>
      Iff.intro
      (
        fun (h : x ∈ ⋂ (a, b)) =>
          And.right (Iff.mp (intersection_set_is_intersection (a, b) x) h) {a} (left_unordered_pair {a} {a, b})

      )
      (
        fun (h : x ∈ {a}) =>
          let first := in_singl_elem a x h
          let h₁ : forall_in_A (fun y => a ∈ y) (a, b) := (
              fun (m : Set) => fun (r : m ∈ (a, b)) =>
              let third := Iff.mp (unordered_pair_set_is_unordered_pair {a} {a, b} m) r
              Or.elim third
              (
                fun (t : m = {a}) =>
                  let fourth := left_unordered_pair a a
                  eq_subst (fun (u) => a ∈ u) {a} m (Eq.symm t) fourth

              )
              (
                fun (t : m = {a, b}) =>
                  let fourth := left_unordered_pair a b
                  eq_subst (fun (u) => a ∈ u) {a, b} m (Eq.symm t) fourth

              )
          )
          let second := Iff.mpr (intersection_non_empty (a, b) (fun (g : (a, b) = ∅) => (empty_set_is_empty {a}) (eq_subst (fun (s) => {a} ∈ s) (a, b) ∅ (g) (left_unordered_pair {a} {a, b}))) a) (h₁)
          eq_subst (fun (u) => u ∈ ⋂ (a, b)) a x (Eq.symm first) (second)
      )
  )


theorem union_pair_is_all_coords : ∀ a b, ⋃ (a, b) = {a, b} :=
  fun (a) => fun (b) =>
    extensionality (⋃ (a, b)) {a, b}
    (
      fun (x) =>
      Iff.intro
      (
        fun (h : x ∈ ⋃ (a, b)) =>
          let first := Iff.mp (union2_sets_prop {a} {a, b} x) h
          Or.elim first
          (
            fun (t : x ∈ {a}) =>
              Iff.mpr (unordered_pair_set_is_unordered_pair a b x) ( (Or.inl : x = a → x = a ∨ x = b)  (in_singl_elem a x t))
          )
          (
            fun (t : x ∈ {a, b}) => t
          )

      )
      (
        fun (h : x ∈ {a, b}) =>
          let first := Iff.mp (unordered_pair_set_is_unordered_pair a b x) h
          Or.elim first
          (
            fun (g : x = a) =>
              Iff.mpr (union2_sets_prop {a} {a, b} x) ((Or.inl : x ∈ {a} → x ∈ {a} ∨ x ∈ {a, b}) (eq_subst (fun (u) => u ∈ {a}) a x (Eq.symm g) (elem_in_singl a)))

          )
          (
            fun (g : x = b) =>
              Iff.mpr (union2_sets_prop {a} {a, b} x) ((Or.inr : x ∈ {a, b} → x ∈ {a} ∨ x ∈ {a, b}) (eq_subst (fun (u) => u ∈ {a, b}) b x (Eq.symm g) (right_unordered_pair a b)))
          )

      )
  )



axiom contraposition (p q : Prop) : (p → q) ↔ (¬q → ¬p)

open Classical


theorem coordinates_snd_corr_lemma : ∀ a b, {x ∈ ⋃ (a, b) | ⋃ (a, b) ≠ ⋂ (a, b) → x ∉ ⋂ (a, b)} = {b} :=
  fun (a) => fun (b) =>
    extensionality {x ∈ ⋃ (a, b) | ⋃ (a, b) ≠ ⋂ (a, b) → x ∉ ⋂ (a, b)} {b}
    (
      fun (x) =>
      Iff.intro
      (
        fun (h : x ∈ {x ∈ ⋃ (a, b) | ⋃ (a, b) ≠ ⋂ (a, b) → x ∉ ⋂ (a, b)}) =>
          let first := Iff.mp (specification_set_is_specification (fun (p) => ⋃ (a, b) ≠ ⋂ (a, b) → p ∉ ⋂ (a, b)) (⋃ (a, b)) x) h
          let second := And.left first
          let third := And.right first
          let fourth := eq_subst (fun (u) => x ∈ u) (⋃ (a, b)) {a, b} (union_pair_is_all_coords a b) (second)
          let fifth := Iff.mp (unordered_pair_set_is_unordered_pair a b x) fourth
          Or.elim fifth
          (
            fun (t : x = a) =>
              Or.elim (em (⋃ (a, b) = ⋂ (a, b)))
              (
                fun (r : ⋃ (a, b) = ⋂ (a, b)) =>
                let fourth := eq_subst (fun (u) => ⋃ (a, b) = u) (⋂ (a, b)) {a} (inter_pair_is_singl_fst a b) (r)
                let fifth := eq_subst (fun (u) => u = {a}) (⋃ (a, b)) {a, b} (union_pair_is_all_coords a b) (fourth)
                let sixth := eq_subst (fun (u) => b ∈ u) {a, b} {a} fifth (right_unordered_pair a b)
                let seventh := in_singl_elem a b sixth
                let eightht := eq_subst (fun (u) => u = b) a x (Eq.symm t) (Eq.symm seventh)

                eq_subst (fun (u) => u ∈ {b}) b x (Eq.symm eightht) (elem_in_singl b)

              )
              (
                fun (r : ⋃ (a, b) ≠ ⋂ (a, b)) =>
                  let fourth := third r
                  let fifth := eq_subst (fun (u) => x ∉ u) (⋂ (a, b)) {a} (inter_pair_is_singl_fst a b) (fourth)
                  let sixth := (fun (g : x = a) => fifth (eq_subst (fun (u) => u ∈ {a}) a x (Eq.symm g) (elem_in_singl a)))
                  let seventh := sixth t
                  (False.elim : False → (x ∈ {b})) (seventh)
              )
          )
          (
            fun (t : x = b) =>
              eq_subst (fun (u) => u ∈ {b}) b x (Eq.symm t) (elem_in_singl b)
          )
      )
      (
        fun (h : x ∈ {b}) =>
          let first := in_singl_elem b x h
          let second: b ∈ ⋃ (a, b) := eq_subst (fun (u) => b ∈ u) ({a, b}) (⋃ (a, b)) (Eq.symm (union_pair_is_all_coords a b)) (right_unordered_pair a b)
          let third : ⋃ (a, b) ≠ ⋂ (a, b) → b ∉ ⋂ (a, b) := (Iff.mp (contraposition (b ∈ ⋂ (a, b)) (⋃ (a, b) = ⋂ (a, b)))) (
            fun (t : b ∈ ⋂ (a, b)) =>
                let fourth := eq_subst (fun (u) => b ∈ u) (⋂ (a, b)) {a} (inter_pair_is_singl_fst a b) (t)
                let fifth := in_singl_elem a b fourth
                let _ : ⋃ (a, b) = {a, b} := union_pair_is_all_coords a b
                let seventh : {a, b} = {a} := extensionality {a, b} {a} (
                  fun (s) =>
                  Iff.intro
                  (
                    fun (property : s ∈ {a, b}) =>
                      let h₁ := Iff.mp (unordered_pair_set_is_unordered_pair a b s) property
                      Or.elim (h₁)
                      (
                        fun (h₂ : s = a) =>
                          eq_subst (fun (u) => u ∈ {a}) a s (Eq.symm h₂) (elem_in_singl a)
                      )
                      (
                        fun (h₂ : s = b) =>
                          eq_subst (fun (u) => u ∈ {a}) a s (Eq.trans (Eq.symm fifth) (Eq.symm h₂)) (elem_in_singl a)
                      )
                  )
                  (
                    fun (property : s ∈ {a}) =>
                      Iff.mpr (unordered_pair_set_is_unordered_pair a b s) ((Or.inl : s = a → s = a ∨ s = b) (in_singl_elem a s (property)))
                  )
                )
                let eighth : ⋃ (a, b) = {a} := eq_subst (fun (u) => ⋃ (a, b) = u) {a, b} {a} (seventh) (union_pair_is_all_coords a b)
                eq_subst (fun (u) => ⋃ (a, b) = u) {a} (⋂ (a, b)) (Eq.symm (inter_pair_is_singl_fst a b)) (eighth)
          )
          let fourth : b ∈ ⋃ (a, b) ∧ (⋃ (a, b) ≠ ⋂ (a, b) → b ∉ ⋂ (a, b)) := And.intro (second) (third)
          let fifth: x ∈ ⋃ (a, b) ∧ (⋃ (a, b) ≠ ⋂ (a, b) → x ∉ ⋂ (a, b)) := eq_subst (fun (u) => u ∈ ⋃ (a, b) ∧ (⋃ (a, b) ≠ ⋂ (a, b) → u ∉ ⋂ (a, b))) b x (Eq.symm first) (fourth)
          Iff.mpr (specification_set_is_specification (fun (u) => (⋃ (a, b) ≠ ⋂ (a, b) → u ∉ ⋂ (a, b))) (⋃ (a, b)) x) (fifth)
      )
    )


noncomputable def fst_coor (A : Set) : Set := ⋃ (⋂ A)
noncomputable def snd_coor (A : Set) : Set := ⋃ ({x ∈ ⋃ A | ⋃ A ≠ ⋂ A → x ∉ ⋂ A})


theorem coordinates_fst_coor : ∀ a b, fst_coor (a, b) = a :=
  fun (a) => fun (b) =>
    let first : ⋃ (⋂ (a, b)) = ⋃ ({a}) := eq_subst (fun (u) => ⋃ (⋂ (a, b)) = ⋃ u) (⋂ (a, b)) {a} (inter_pair_is_singl_fst a b) (Eq.refl (⋃ (⋂ (a, b))))
    eq_subst (fun (u) => ⋃ (⋂ (a, b)) = u) (⋃ ({a})) a (union_sing a) (first)



theorem coordinates_snd_coor : ∀ a b, snd_coor (a, b) = b :=
  fun (a) => fun (b) =>
    let first : ⋃ ({x ∈ ⋃ (a, b) | ⋃ (a, b) ≠ ⋂ (a, b) → x ∉ ⋂ (a, b)}) = ⋃ ({b})
    := eq_subst (fun (u) => ⋃ ({x ∈ ⋃ (a, b) | ⋃ (a, b) ≠ ⋂ (a, b) → x ∉ ⋂ (a, b)}) = ⋃ u) ({x ∈ ⋃ (a, b) | ⋃ (a, b) ≠ ⋂ (a, b) → x ∉ ⋂ (a, b)}) {b} (coordinates_snd_corr_lemma a b) (Eq.refl (⋃ ({x ∈ ⋃ (a, b) | ⋃ (a, b) ≠ ⋂ (a, b) → x ∉ ⋂ (a, b)})))
    eq_subst (fun (u) => ⋃ ({x ∈ ⋃ (a, b) | ⋃ (a, b) ≠ ⋂ (a, b) → x ∉ ⋂ (a, b)}) = u) (⋃ {b}) (b) (union_sing b) (first)



noncomputable def cartesian_product (A : Set) (B : Set) : Set := {z ∈ ℙow (ℙow (A ∪ B)) | ∃ x ∈ A; ∃ y ∈ B; z = (x, y)}
infix:60 (priority:=high) " × " => cartesian_product


theorem cartesian_product_is_cartesian: ∀ A B pr, pr ∈ (A × B) ↔ (∃ x ∈ A; ∃ y ∈ B; pr = (x, y)) :=
    fun (A) => fun (B) => fun (pr) =>
      Iff.intro
      (
        fun (h : pr ∈ A × B) =>
          let second := ℙow (ℙow (A ∪ B))
          And.right (Iff.mp (specification_set_is_specification (fun (pr) => (∃ x ∈ A; ∃ y ∈ B; pr = (x, y))) second pr) h)

      )
      (
        fun (h : (∃ x ∈ A; ∃ y ∈ B; pr = (x, y))) =>
          Exists.elim h
          (
            fun (w) =>
              fun (hw : w ∈ A ∧ ∃ y ∈ B; pr = (w, y)) =>
                Exists.elim (And.right (hw))
                (
                  fun (u) =>
                    fun (hu : u ∈ B ∧ pr = (w, u)) =>
                    let first : (w, u) ∈ ℙow (ℙow (A ∪ B)) := ordered_pair_set_belonging A B w (And.left hw) u (And.left hu)
                    let second : pr ∈ ℙow (ℙow (A ∪ B)):= eq_subst (fun (st) => st ∈ ℙow (ℙow (A ∪ B))) ((w, u)) (pr) (Eq.symm (And.right hu)) (first)
                    let third := And.intro second h
                    Iff.mpr (specification_set_is_specification (fun (pr) => (∃ x ∈ A; ∃ y ∈ B; pr = (x, y))) (ℙow (ℙow (A ∪ B))) pr) third
                )
          )
      )



theorem cartesian_product_pair_prop : ∀ A B a b, (a, b) ∈ (A × B) ↔ (a ∈ A ∧ b ∈ B) :=
  fun (A B a b) =>
    Iff.intro
    (
      fun (h : (a, b) ∈ (A × B)) =>
        let first := Iff.mp (cartesian_product_is_cartesian A B (a, b)) h
        Exists.elim first
        (
          fun (w) =>
            fun (hw : w ∈ A ∧ ∃ y ∈ B; (a, b) = (w, y)) =>
              Exists.elim (And.right hw)
              (
                fun (u) =>
                  fun (hu : u ∈ B ∧ (a, b) = (w, u)) =>
                    let first := Iff.mp (ordered_pair_set_prop a b w u) (And.right hu)
                    let second := eq_subst (fun (elem1) => elem1 ∈ A) w a (Eq.symm (And.left first)) (And.left hw)
                    let third := eq_subst (fun (elem1) => elem1 ∈ B) u b (Eq.symm (And.right first)) (And.left hu)
                    And.intro second third
              )
        )
    )
    (
      fun (h : a ∈ A ∧ b ∈ B) =>
        let first := Iff.mpr (cartesian_product_is_cartesian A B (a, b))
        let second: exists_in_A (fun x => exists_in_A (fun y => (a, b) = (x, y)) B) A := Exists.intro a (And.intro (And.left h) (Exists.intro b (And.intro (And.right h) (Eq.refl (a, b)))))
        first second
    )


-- tuple syntax
declare_syntax_cat pair_comprehension
syntax  pair_comprehension "; " term : pair_comprehension
syntax term : pair_comprehension
syntax "⁅" pair_comprehension "⁆" : term
macro_rules
| `(⁅ $term1:term⁆) => `($term1)
| `(⁅ $term1:term; $term2:term⁆) => `(ordered_pair_set $term1 $term2)
| `(⁅ $rest:pair_comprehension; $elem:term⁆) => `(ordered_pair_set ⁅$rest:pair_comprehension⁆ $elem:term)




noncomputable def binary_relation (R : Set) : Prop := ∀ z ∈ R; ∃ a, ∃ b, z = (a, b)

-- write (x . P . y) istead of (x, y) ∈ P
macro_rules
| `(($x:term . $P:term . $y:term)) => `(($x, $y) ∈ $P)


theorem binary_relation_elements_set: ∀ R x y, (x . R . y) → (x ∈ ⋃ (⋃ R) ∧ y ∈ ⋃ (⋃ R)) :=
  fun (R : Set) => fun (x : Set) => fun (y : Set) =>
    fun (h : (x . R . y)) =>
      let first: {x, y} ∈ (x, y) := right_unordered_pair {x} {x, y}
      let second: {x, y} ∈ ⋃ R := Iff.mpr (union_set_is_union R {x, y}) (Exists.intro (x, y) (And.intro (h) (first)))
      let third := right_unordered_pair x y
      let fourth := left_unordered_pair x y
      let fifth := Iff.mpr (union_set_is_union (⋃ R) x) (Exists.intro {x, y} (And.intro (second) (fourth)))
      let sixth := Iff.mpr (union_set_is_union (⋃ R) y) (Exists.intro {x, y} (And.intro (second) (third)))
      And.intro fifth sixth





noncomputable def dom (R : Set) := {x ∈ ⋃ (⋃ R) | ∃ y, (x . R . y)}
noncomputable def rng (R : Set) := {y ∈ ⋃ (⋃ R) | ∃ x, (x . R . y)}


theorem dom_rng_rel_prop: ∀ R, (binary_relation R) → (dom R ∪ rng R = ⋃ (⋃ R)) :=
    fun (R : Set) =>
      fun (h : (binary_relation R)) =>
        subset_then_equality (dom R ∪ rng R) (⋃ (⋃ R)) (
          And.intro
          (
            fun (x) =>
              fun (g : x ∈ (dom R ∪ rng R)) =>
                let first:= Iff.mp (union2_sets_prop (dom R) (rng R) x) g
                Or.elim first
                (
                  fun (f : x ∈ dom R) =>
                    And.left (Iff.mp (specification_set_is_specification (fun (t) => ∃ y, (t . R . y)) (⋃ (⋃ R)) x) f)
                )
                (
                  fun (f : x ∈ rng R) =>
                    And.left (Iff.mp (specification_set_is_specification (fun (t) => ∃ x, (x . R . t)) (⋃ (⋃ R)) x) f)
                )

          )
          (
            fun (coor) =>
              fun (g : coor ∈ ⋃ (⋃ R)) =>
                let first := (Iff.mp (union_set_is_union (⋃ R) coor) g)
                Exists.elim first
                (
                  fun (w) =>
                    fun (hw : w ∈ ⋃ R ∧ coor ∈ w) =>
                      let second := Iff.mp ((union_set_is_union R w)) (And.left hw)
                      Exists.elim second
                      (
                        fun (u) =>
                          fun (hu : u ∈ R ∧ w ∈ u) =>
                            let third := h u (And.left hu)
                            Exists.elim third (
                              fun (a) =>
                                fun (ha : ∃ b, u = (a, b)) =>
                                  Exists.elim ha
                                  (
                                    fun (b) =>
                                      fun (hb : u = (a, b)) =>
                                        let fourth := Iff.mp (unordered_pair_set_is_unordered_pair {a} {a, b} w) (
                                          eq_subst (fun (t) => w ∈ t) u (a, b) (hb) (And.right hu)
                                          )
                                        Or.elim (fourth)
                                        (
                                          fun (s : w = {a}) =>
                                            let fifth := eq_subst (fun (t) => coor ∈ t) w {a} s (And.right hw)
                                            let sixth := in_singl_elem a coor fifth
                                            let seventh := eq_subst (fun (t) => t ∈ R) u (a, b) hb (And.left hu)
                                            let eight := eq_subst (fun (t) => (t . R . b)) a coor (Eq.symm sixth) (seventh)
                                            let nineth: ∃ y, (coor . R . y) := Exists.intro b eight
                                            let tenth: coor ∈ dom R
                                            := Iff.mpr (specification_set_is_specification (fun (t) => ∃ y, (t . R . y)) (⋃ (⋃ R)) coor) (And.intro (g) (nineth))
                                            let eleventh := (Or.inl : coor ∈ dom R → coor ∈ dom R ∨ coor ∈ rng R) tenth
                                            Iff.mpr (union2_sets_prop (dom R) (rng R) coor) eleventh


                                        )
                                        (
                                          fun (s : w = {a, b}) =>
                                            let fifth := eq_subst (fun (t) => coor ∈ t) w {a, b} s (And.right hw)
                                            let h₁ := Iff.mp (unordered_pair_set_is_unordered_pair a b coor) fifth
                                            Or.elim (h₁)
                                            (
                                              fun (sixth : coor = a) =>
                                                let seventh := eq_subst (fun (t) => t ∈ R) u (a, b) hb (And.left hu)
                                                let eight := eq_subst (fun (t) => (t . R . b)) a coor (Eq.symm sixth) (seventh)
                                                let nineth: ∃ y, (coor . R . y) := Exists.intro b eight
                                                let tenth: coor ∈ dom R
                                                := Iff.mpr (specification_set_is_specification (fun (t) => ∃ y, (t . R . y)) (⋃ (⋃ R)) coor) (And.intro (g) (nineth))
                                                let eleventh := (Or.inl : coor ∈ dom R → coor ∈ dom R ∨ coor ∈ rng R) tenth
                                                Iff.mpr (union2_sets_prop (dom R) (rng R) coor) eleventh
                                            )
                                            (
                                              fun (sixth : coor = b) =>
                                                let seventh := eq_subst (fun (t) => t ∈ R) u (a, b) hb (And.left hu)
                                                let eight := eq_subst (fun (t) => (a . R . t)) b coor (Eq.symm sixth) (seventh)
                                                let nineth: ∃ x, (x . R . coor) := Exists.intro a eight
                                                let tenth: coor ∈ rng R
                                                := Iff.mpr (specification_set_is_specification (fun (t) => ∃ x, (x . R . t)) (⋃ (⋃ R)) coor) (And.intro (g) (nineth))
                                                let eleventh := (Or.inr : coor ∈ rng R → coor ∈ dom R ∨ coor ∈ rng R) tenth
                                                Iff.mpr (union2_sets_prop (dom R) (rng R) coor) eleventh

                                            )
                                        )
                                  )
                            )
                      )
                )
         )
        )



theorem dom_prop : ∀ R x, x ∈ dom R ↔ ∃ y, (x . R . y) :=
  fun (R) =>
    fun (x) =>
      Iff.intro
      (
        fun (s : x ∈ dom R) =>
          And.right (Iff.mp (specification_set_is_specification (fun (t) => ∃ y, (t . R . y)) (⋃ (⋃ R)) x) s)

      )
      (
        fun (s : ∃ y, (x . R . y)) =>
          Exists.elim (s)
          (
            fun (w) =>
              fun (hw : (x . R . w)) =>
              let first := And.left (binary_relation_elements_set R x w hw)
              Iff.mpr (specification_set_is_specification (fun (t) => ∃ y, (t . R . y)) (⋃ (⋃ R)) x) (And.intro (first) (s))

          )
      )


theorem rng_prop : ∀ R y, y ∈ rng R ↔ ∃ x, (x . R . y) :=
  fun (R) =>
    fun (y) =>
      Iff.intro
      (
        fun (s : y ∈ rng R) =>
          And.right (Iff.mp (specification_set_is_specification (fun (t) => ∃ x, (x . R . t)) (⋃ (⋃ R)) y) s)

      )
      (
        fun (s : ∃ x, (x . R . y)) =>
          Exists.elim (s)
          (
            fun (w) =>
              fun (hw : (w . R . y)) =>
              let first := And.right (binary_relation_elements_set R w y hw)
              Iff.mpr (specification_set_is_specification (fun (t) => ∃ x, (x . R . t)) (⋃ (⋃ R)) y) (And.intro (first) (s))
          )
      )



theorem binary_relation_prop : ∀ R, binary_relation R → R ⊆ dom R × rng R :=
  fun (R) => fun (h : binary_relation R) =>
    fun (pr) =>
      fun (g : pr ∈ R) =>
        Exists.elim  (h pr g)
        (
          fun (a) =>
            fun (ha : ∃ b, pr = (a, b)) =>
              Exists.elim (ha)
              (
                fun (b) =>
                  fun (hb : pr = (a, b)) =>
                    let first := eq_subst (fun(t) => t ∈ R) pr (a, b) (hb) g
                    let second := And.left (binary_relation_elements_set R a b first)
                    let third := And.right (binary_relation_elements_set R a b first)
                    let h₁ : ∃ b, (a . R . b) := Exists.intro b (eq_subst (fun (t) => t ∈ R) pr (a, b) (hb) (g))
                    let fourth: a ∈ dom R := Iff.mpr (specification_set_is_specification (fun (t) => ∃ y, (t . R . y)) (⋃ (⋃ R)) a) (And.intro second h₁)
                    let h₂ : ∃ a, (a . R . b) := Exists.intro a (eq_subst (fun (t) => t ∈ R) pr (a, b) (hb) (g))
                    let fifth: b ∈ rng R := Iff.mpr (specification_set_is_specification (fun (t) => ∃ x, (x . R . t)) (⋃ (⋃ R)) b) (And.intro third h₂)
                    let sixth := Iff.mpr (cartesian_product_pair_prop (dom R) (rng R) a b)
                    let seventh := And.intro fourth fifth
                    let eighth := sixth seventh
                    eq_subst (fun (t) => t ∈ dom R × rng R) (a, b) pr (Eq.symm hb) (eighth)
              )
        )




theorem prop_then_binary_relation : ∀ A B R, R ⊆ A × B → binary_relation R ∧ dom R ⊆ A ∧ rng R ⊆ B :=
  fun (A B R) => fun (h : R ⊆ A × B) =>
    let first : binary_relation R := fun (z) => fun (g : z ∈ R) =>
      Exists.elim (Iff.mp (cartesian_product_is_cartesian A B z) (h z g))
      (
        fun (a) =>
          fun (ha : a ∈ A ∧ ∃ b ∈ B; z = (a, b)) =>
            Exists.elim (And.right ha)
            (
              fun (b) =>
                fun (hb : b ∈ B ∧ z = (a, b)) =>
                  Exists.intro a (Exists.intro b (And.right hb))
            )
      )

    And.intro (
      first
    ) (
      And.intro
      (
        fun (a) => fun (g : a ∈ dom R) =>

        let second := And.right (Iff.mp (specification_set_is_specification (fun (t) => ∃ y, (t . R . y)) (⋃ (⋃ R)) a) g)
        Exists.elim second
        (
          fun (b) =>
            fun (hb : (a . R . b)) =>
              And.left (Iff.mp (cartesian_product_pair_prop A B a b) (h (a, b) hb))
        )
      )
      (
        fun (b) => fun (g : b ∈ rng R) =>

        let second := And.right (Iff.mp ((specification_set_is_specification (fun (t) => ∃ x, (x . R . t)) (⋃ (⋃ R)) b)) g)
        Exists.elim second
        (
          fun (a) =>
            fun (ha : (a . R . b)) =>
              And.right (Iff.mp (cartesian_product_pair_prop A B a b) (h (a, b) ha))
        )
      )
    )


theorem rel_dom_rng_elem : ∀ R, binary_relation R → ∀ x y, (x . R . y) → x ∈ dom R ∧ y ∈ rng R :=
  fun (R) => fun (h : binary_relation R) =>
    fun (x) => fun (y) => fun (g : (x . R . y)) =>
    let first := binary_relation_prop R h (x, y) g
    Iff.mp (cartesian_product_pair_prop (dom R) (rng R) x y) first




theorem union2_rel_is_rel : ∀ P Q, binary_relation P → binary_relation Q → binary_relation (P ∪ Q) :=
  fun (P) => fun (Q) => fun (h : binary_relation P) => fun (g : binary_relation Q) =>
    fun (z) => fun (h₁ : z ∈ (P ∪ Q)) =>
      let first := Iff.mp (union2_sets_prop P Q z) h₁
      Or.elim first
      (
        fun (s : z ∈ P) =>
          h z s
      )
      (
        fun (s : z ∈ Q) =>
          g z s
      )


theorem intersect2_rel_is_rel : ∀ P Q, binary_relation P → binary_relation Q → binary_relation (P ∩ Q) :=
  fun (P) => fun (Q) => fun (h : binary_relation P) => fun (_ : binary_relation Q) =>
    fun (z) => fun (h₁ : z ∈ (P ∩ Q)) =>
      h z ((And.left (intersect_2sets_subset_prop P Q)) z h₁)




noncomputable def binary_relation_between (A B R : Set) : Prop := R ⊆ A × B
noncomputable def binary_relation_on (A R : Set) : Prop := R ⊆ A × A

noncomputable def comp (A B R : Set) : Set := (A × B) \ R



theorem comp_is_rel : ∀ A B R, binary_relation (comp A B R) :=
  fun (A B R) => fun (z) => fun (h : z ∈ (comp A B R)) =>
    let first := comp_2sets_subset_prop (A × B) R z h
    let second := (Iff.mp (cartesian_product_is_cartesian A B z) first)
    Exists.elim (second)
    (
      fun (w) =>
        fun (hw : w ∈ A ∧ ∃ u ∈ B; z = (w, u)) =>
          Exists.elim (And.right hw)
          (
            fun (u) =>
              fun (hu : u ∈ B ∧ z = (w, u)) =>
              Exists.intro w (Exists.intro u (And.right hu))
          )
    )




noncomputable def inv (R : Set) : Set := {z ∈ rng R × dom R | ∃ x, ∃ y, (z = (y, x) ∧ (x . R . y))}

syntax term"⁻¹" : term

macro_rules
| `($term1:term⁻¹) => `(inv $term1)



theorem inv_is_rel : ∀ R, binary_relation R → (binary_relation (R⁻¹)) :=
  fun (R) => fun (_ : binary_relation R) =>
    fun (z) => fun (h : z ∈ R⁻¹) =>
      let first := And.right (Iff.mp (specification_set_is_specification (fun (t) => ∃ x, ∃ y, (t = (y, x) ∧ (x . R . y))) (rng R × dom R) z) h)
      Exists.elim first (
        fun (a) =>
          fun (ha : ∃ b, z = (b, a) ∧ (a . R . b)) =>
            Exists.elim ha
            (
              fun (b) =>
                fun (hb : z = (b, a) ∧ (a . R . b)) =>
                  Exists.intro b (Exists.intro a (And.left hb))
            )
      )


theorem inv_pair_prop: ∀ R, binary_relation R → ∀ x y, (x . R . y) ↔ (y . (R⁻¹) . x):=
  fun (R) => fun (h : binary_relation R) =>
    fun (x) => fun (y) =>
      Iff.intro
      (
        fun (h₂ : (x . R . y)) =>
          let first: ((y . (rng R × dom R) . x) ∧ ∃ x_1 y_1, (y, x) = (y_1, x_1) ∧ (x_1 . R . y_1)) → (y . (R⁻¹) . x)
          := Iff.mpr (specification_set_is_specification (fun (t) => ∃ x, ∃ y, (t = (y, x) ∧ (x . R . y))) (rng R × dom R) (y, x))
          let second := And.right ((rel_dom_rng_elem R h) x y h₂)
          let third:= And.left ((rel_dom_rng_elem R h) x y h₂)
          let fourth := Iff.mpr (cartesian_product_pair_prop (rng R) (dom R) y x) (And.intro second third)
          let fifth : ∃ x_1 y_1, (y, x) = (y_1, x_1) ∧ (x_1 . R . y_1) := Exists.intro x (Exists.intro y (And.intro (Eq.refl (y, x)) (h₂)))

          first (And.intro (fourth) (fifth))



      )
      (
        fun (h₂ : (y . (R⁻¹) . x)) =>
          Exists.elim (And.right (Iff.mp (specification_set_is_specification (fun (t) => ∃ x, ∃ y, (t = (y, x) ∧ (x . R . y))) (rng R × dom R) (y, x)) h₂))
          (
            fun (x_1) =>
              fun (hx_1 : ∃ y_1, (y, x) = (y_1, x_1) ∧ (x_1 . R . y_1)) =>
                Exists.elim (hx_1)
                (
                  fun (y_1) =>
                    fun (hy_1 : (y, x) = (y_1, x_1) ∧ (x_1 . R . y_1)) =>
                      let first := Iff.mp (ordered_pair_set_prop y_1 x_1 y x) (Eq.symm (And.left hy_1))
                      let second := Iff.mpr (ordered_pair_set_prop x y x_1 y_1) (And.intro (Eq.symm (And.right first)) (Eq.symm (And.left first)))
                      let third := eq_subst (fun (t) => t ∈ R) (x_1, y_1) (x, y) (Eq.symm second) (And.right hy_1)
                      third
                )
          )
      )



theorem inv_prop : ∀ R, binary_relation R → (R⁻¹)⁻¹ = R :=
  fun (R) => fun (h : binary_relation R) =>
    extensionality ((R⁻¹)⁻¹) R
    (
      fun (x) =>
      Iff.intro
      (
        fun (s : x ∈ ((R⁻¹)⁻¹)) =>
          let first := inv_is_rel R h
          Exists.elim (inv_is_rel (R⁻¹) first x s)
          (
            fun (a) =>
              fun (ha : ∃ b, x = (a, b) ) =>
              Exists.elim ha
              (
                fun (b) =>
                  fun (hb : x = (a, b)) =>
                    let second := eq_subst (fun (t) => t ∈ ((R⁻¹)⁻¹)) x (a, b) hb s
                    let third := Iff.mpr (inv_pair_prop (R⁻¹) first b a) second
                    let fourth := Iff.mpr (inv_pair_prop R h a b) third
                    eq_subst (fun (t) => t ∈ R) (a, b) x (Eq.symm hb) (fourth)
              )
          )
      )
      (
        fun (s : x ∈ R) =>
          let h₁ := inv_is_rel R h
          Exists.elim (h x s)
          (
            fun (a) =>
              fun (ha : ∃ b, x = (a, b)) =>
                Exists.elim ha
                (
                  fun (b) =>
                    fun (hb : x = (a, b)) =>
                      let first := eq_subst (fun (t) => t ∈ R) x (a, b) hb s
                      let second:= Iff.mp (inv_pair_prop R (h) a b) first
                      let third:= Iff.mp (inv_pair_prop (R⁻¹) (h₁) b a) second
                      eq_subst (fun (t) => t ∈ (R⁻¹)⁻¹) (a, b) x (Eq.symm hb) (third)
                )
          )
      )
    )





theorem inv_dom: ∀ R, binary_relation R → dom (R⁻¹) = rng R :=
  fun (R) => fun (h : binary_relation R) =>
    (
      extensionality (dom (R⁻¹)) (rng R) (
        fun (x) =>
        Iff.intro
        (
          fun (g : x ∈ dom (R⁻¹)) =>
            Exists.elim (Iff.mp (dom_prop (R⁻¹) x) g)
            (
              fun (y) =>
                fun (hy: (x . (R⁻¹) . y)) =>
                  let second:= Iff.mpr (inv_pair_prop R h y x) hy
                  let third: ∃ a, (a . R . x) := Exists.intro y second
                  Iff.mpr (rng_prop R x) third
            )
        )
        (
          fun (g : x ∈ rng R) =>
            Exists.elim (Iff.mp (rng_prop R x) g)
            (
              fun (y) =>
                fun (hy : (y . R . x)) =>
                  let second := Iff.mp (inv_pair_prop R h y x) hy
                  let third: ∃ a, (x . (R⁻¹) . a)  := Exists.intro y second
                  Iff.mpr (dom_prop (R⁻¹) x) third
            )
        )
      )
    )


theorem inv_rng: ∀ R, binary_relation R → rng (R⁻¹) = dom R :=
  fun (R) => fun (h : binary_relation R) =>
    let first := inv_is_rel R h
    let second := Eq.symm (inv_dom (R⁻¹) first)
    eq_subst (fun (t) => rng (R⁻¹) = dom t) ((R⁻¹)⁻¹) R (inv_prop R h) second






noncomputable def composition (P Q : Set) : Set := {pr ∈ dom Q × rng P | ∃ x y, (pr = (x, y)) ∧ ∃ z, (x . Q . z) ∧ (z . P . y)}

infix:60 (priority:=high) " ∘ " => composition



theorem composition_is_rel : ∀ P Q, binary_relation (P ∘ Q) :=
  fun (P) => fun (Q) =>
        fun (z) => fun (r : z ∈ (P ∘ Q)) =>
          let first := specification_set_subset (fun (t) => ∃ x y, (t = (x, y) ∧ ∃ z, (x . Q . z) ∧ (z . P . y) )) (dom Q × rng P) z r
          let second := Iff.mp (cartesian_product_is_cartesian (dom Q) (rng P) z) first
          Exists.elim second
          (
            fun (w) =>
              fun (hw : (w ∈ dom Q ∧ ∃ y ∈ (rng P); z = (w, y))) =>
                Exists.elim (And.right hw)
                (
                  fun (u) =>
                    fun (hu : (u ∈ rng P ∧ z = (w, u))) =>
                      Exists.intro w (Exists.intro u (And.right hu))
                )
          )



theorem composition_pair_prop : ∀ P Q, ∀ x y, (x . (P ∘ Q) . y) ↔ ∃ z, (x . Q . z) ∧ (z . P . y) :=
  fun (P Q x y) =>
    Iff.intro
    (
      fun (h : (x . (P ∘ Q) . y)) =>
        let first := And.right (Iff.mp (specification_set_is_specification (fun (t) => ∃ x y, (t = (x, y) ∧ ∃ z, (x . Q . z) ∧ (z . P . y) )) (dom Q × rng P) (x, y)) h)
        Exists.elim first
        (
          fun (w) =>
            fun (hw : ∃ y_1, (x, y) = (w, y_1) ∧ ∃ z, (w . Q . z) ∧ (z . P . y_1)) =>
              Exists.elim hw
              (
                fun (u) =>
                  fun (hu : ((x, y) = (w, u)) ∧ ∃ z, (w . Q . z) ∧ (z . P . u)) =>
                    let h₁ := Iff.mp (ordered_pair_set_prop x y w u) (And.left hu)
                    let _ := And.right hu
                    let third := eq_subst (fun (t) => ∃ z, (t . Q . z) ∧ (z . P . u)) (w) (x) (Eq.symm (And.left h₁)) (And.right hu)
                    eq_subst (fun (t) => ∃ z, (x . Q . z) ∧ (z . P . t)) (u) (y) (Eq.symm (And.right h₁)) (third)

              )

        )


    )
    (
      fun (h : ∃ z, (x . Q . z) ∧ (z . P . y) ) =>
        Exists.elim h
        (
          fun (w) =>
            fun (hw : (x . Q . w) ∧ (w . P . y)) =>
              let first := Iff.mpr (specification_set_is_specification (fun (t) => ∃ x y, (t = (x, y) ∧ ∃ z, (x . Q . z) ∧ (z . P . y) )) (dom Q × rng P) (x, y))

              let second := Iff.mpr (dom_prop Q x) (Exists.intro w (And.left hw))
              let third := Iff.mpr (rng_prop P y) (Exists.intro w (And.right hw))
              let fourth := Iff.mpr (cartesian_product_pair_prop (dom Q) (rng P) x y) (And.intro second third)
              let fifth: ∃ x_1 y_1, (x, y) = (x_1, y_1) ∧ ∃ z, (x_1, z) ∈ Q ∧ (z, y_1) ∈ P := Exists.intro x (Exists.intro y (And.intro (Eq.refl (x, y)) (h)))
              first (And.intro (fourth) (fifth))
        )
    )



theorem rel_subset : (∀ P Q, binary_relation P → binary_relation Q → (∀ x y, (x . P . y) → (x . Q . y)) → P ⊆ Q) :=
  fun (P Q) => fun (h : binary_relation P) => fun (_ : binary_relation Q) =>
    fun (s : ∀ x y, (x . P . y) → (x . Q . y)) =>
      fun (x) =>
        fun (h₁ : x ∈ P) =>
              let first := h x h₁
              Exists.elim first
              (
                fun (w) =>
                  fun (hw : ∃ u, x = (w, u)) =>
                    Exists.elim hw
                    (
                      fun (u) =>
                        fun (hu: x = (w, u)) =>
                          let second := eq_subst (fun (t) => t ∈ P) x (w, u) (hu) (h₁)
                          let third := s w u second
                          eq_subst (fun (t) => t ∈ Q) (w, u) x (Eq.symm hu) (third)
                    )
              )



theorem relation_equality : (∀ P Q, binary_relation P → binary_relation Q → ((∀ x y, (x . P . y) ↔ (x . Q . y)) → P = Q)) :=
    fun (P Q) => fun (h : binary_relation P) => fun (g : binary_relation Q) =>
      fun (s : ∀ x y, (x . P . y) ↔ (x . Q . y)) =>
        subset_then_equality P Q (And.intro (rel_subset P Q h g (fun (x) => fun (y) => Iff.mp (s x y))) (rel_subset Q P g h (fun (x) => fun (y) => Iff.mp (iff_comm.mp (s x y)))))



theorem composition_pair_assoc: ∀ P Q R x y, (x . ((P ∘ Q) ∘ R) . y) ↔ (x . (P ∘ (Q ∘ R)) . y) :=
  fun (P) => fun (Q) => fun (R) => fun (x) => fun (y) =>
    Iff.intro
    (
      fun (h : (x . ((P ∘ Q) ∘ R) . y)) =>
        let first := Iff.mp (composition_pair_prop (P ∘ Q) R x y) h
        Exists.elim first
        (
          fun (w) =>
            fun (hw : (x . R . w) ∧ (w . (P ∘ Q) . y)) =>
              let second := Iff.mp (composition_pair_prop P Q w y) (And.right hw)
              Exists.elim second
              (
                fun (u) =>
                  fun (hu : (w . Q . u) ∧ (u . P . y)) =>
                    Iff.mpr (composition_pair_prop P (Q ∘ R) x y)
                     (Exists.intro u (And.intro (Iff.mpr (composition_pair_prop Q R x u)
                      (Exists.intro w (And.intro (And.left hw) (And.left hu)))) (And.right hu))
                     )

              )
        )

    )
    (
      fun (h : (x . (P ∘ (Q ∘ R)) . y)) =>
        let first := Iff.mp (composition_pair_prop (P) (Q ∘ R) x y) h
        Exists.elim first
        (
          fun (w) =>
            fun (hw : (x . (Q ∘ R) . w) ∧ (w . P . y)) =>
              let second := Iff.mp (composition_pair_prop Q R x w) (And.left hw)
              Exists.elim second
              (
                fun (u) =>
                  fun (hu : (x . R . u) ∧ (u . Q . w)) =>
                    Iff.mpr (composition_pair_prop (P ∘ Q) R x y)
                    (Exists.intro u (And.intro (And.left hu) (Iff.mpr (composition_pair_prop P Q u y)
                    (Exists.intro w (And.intro (And.right hu) (And.right hw)))))
                    )
              )

        )
    )



theorem composition_assoc : ∀ P Q R, ((P ∘ Q) ∘ R) = (P ∘ (Q ∘ R)) :=
  fun (P) => fun (Q) => fun (R) =>
    relation_equality ((P ∘ Q) ∘ R) (P ∘ (Q ∘ R)) (composition_is_rel (P ∘ Q) (R)) (composition_is_rel (P) (Q ∘ R)) (composition_pair_assoc P Q R)



theorem inv_composition_pair_prop : ∀ P Q, binary_relation P → binary_relation Q → (∀ x y, (x . ((P ∘ Q)⁻¹) . y) ↔ (x . ((Q⁻¹) ∘ P⁻¹) . y)) :=
  fun (P) => fun (Q) => fun (h : binary_relation P) => fun (g : binary_relation Q) =>
    fun (x) => fun (y) =>
      Iff.intro
      (
        fun (h₁ : (x . ((P ∘ Q)⁻¹) . y)) =>
          let first := Iff.mpr (inv_pair_prop (P ∘ Q) (composition_is_rel P Q) y x) h₁
          Exists.elim (Iff.mp (composition_pair_prop P Q y x) first)
          (
            fun (w) =>
              fun (hw : (y . Q . w) ∧ (w . P . x)) =>
                Iff.mpr (composition_pair_prop (Q⁻¹) (P⁻¹) x y) (Exists.intro w (And.intro (Iff.mp (inv_pair_prop P h w x) (And.right hw)) (Iff.mp (inv_pair_prop Q g y w) (And.left hw))))
          )
      )
      (
        fun (h₁ : (x . ((Q⁻¹) ∘ P⁻¹) . y)) =>
          let first := Iff.mp (composition_pair_prop (Q⁻¹) (P⁻¹) x y) h₁
          Exists.elim first
          (
            fun (w) =>
              fun (hw: (x . (P⁻¹) . w) ∧ (w . (Q⁻¹) . y)) =>
                Iff.mp (inv_pair_prop (P ∘ Q) (composition_is_rel P Q) y x)
                 (Iff.mpr (composition_pair_prop P Q y x) (Exists.intro w (And.intro (Iff.mpr (inv_pair_prop Q g y w) (And.right hw)) (Iff.mpr (inv_pair_prop P h w x) (And.left hw)))))
          )
      )



theorem inv_composition_prop : ∀ P Q, binary_relation P → binary_relation Q → (P ∘ Q)⁻¹ = ((Q⁻¹) ∘ (P⁻¹)) :=
  fun (P) => fun (Q) => fun (h : binary_relation P) => fun (g : binary_relation Q) =>
    relation_equality ((P ∘ Q)⁻¹) ((Q⁻¹) ∘ P⁻¹) (inv_is_rel (P ∘ Q) (composition_is_rel P Q)) (composition_is_rel (Q⁻¹) (P⁻¹)) (inv_composition_pair_prop P Q h g)



theorem inv_union_pair_prop : ∀ P Q, binary_relation P → binary_relation Q → ∀ x y, (x . ((P ∪ Q)⁻¹) . y) ↔ (x . (P⁻¹ ∪ Q⁻¹) . y) :=
    fun (P) => fun (Q) => fun (h : binary_relation P) => fun (g : binary_relation Q) => fun (x) => fun (y) =>
      Iff.intro
      (
        fun (h₁ : (x . ((P ∪ Q)⁻¹) . y)) =>
          let first := Iff.mpr (inv_pair_prop (P ∪ Q) (union2_rel_is_rel P Q h g) y x) h₁
          let second := Iff.mp (union2_sets_prop P Q (y, x)) first
          Or.elim second
          (
            fun (h₂ : (y . P . x)) =>
              let third := Iff.mp (inv_pair_prop P h y x) h₂
              And.left (union2_sets_subset_prop (P⁻¹) (Q⁻¹)) (x, y) third
          )
          (
            fun (h₂ : (y . Q . x)) =>
              let third := Iff.mp (inv_pair_prop Q g y x) h₂
              And.right (union2_sets_subset_prop (P⁻¹) (Q⁻¹)) (x, y) third
          )
      )
      (
        fun (h₂ : (x . (P⁻¹ ∪ Q⁻¹) . y)) =>
          let first := Iff.mp (union2_sets_prop (P⁻¹) (Q⁻¹) (x, y)) h₂
          Or.elim first
          (
            fun (h₃ : (x . (P⁻¹) . y)) =>
              let second := Iff.mpr (inv_pair_prop P h y x) h₃
              let third := And.left (union2_sets_subset_prop P Q) (y, x) second
              Iff.mp (inv_pair_prop (P ∪ Q) (union2_rel_is_rel P Q h g) y x) (third)
          )
          (
            fun (h₃ : (x . (Q⁻¹) . y)) =>
              let second := Iff.mpr (inv_pair_prop Q g y x) h₃
              let third := And.right (union2_sets_subset_prop P Q) (y, x) second
              Iff.mp (inv_pair_prop (P ∪ Q) (union2_rel_is_rel P Q h g) y x) (third)
          )
      )


theorem inv_union_prop : ∀ P Q, binary_relation P → binary_relation Q → (P ∪ Q)⁻¹ = ((P⁻¹) ∪ Q⁻¹) :=
  fun (P) => fun (Q) => fun (h : binary_relation P) => fun (g : binary_relation Q) =>
    relation_equality ((P ∪ Q)⁻¹) ((P⁻¹) ∪ Q⁻¹) (inv_is_rel (P ∪ Q) (union2_rel_is_rel P Q h g)) (union2_rel_is_rel (P⁻¹) (Q⁻¹) (inv_is_rel P h) (inv_is_rel Q g)) (inv_union_pair_prop P Q h g)


axiom conj_comm (p q : Prop) : (p ∧ q ↔ q ∧ p)
axiom neg_conj (p q : Prop) : ((p ↔ q) → (¬p ↔ ¬q))

theorem comp_inv_prop_pair : ∀ P A B, binary_relation_between A B P → ∀ x y, (x . (comp A B (P⁻¹)) . y) ↔ (x . ((comp B A P)⁻¹) . y) :=
  fun (P) => fun (A) => fun (B) => fun (h : binary_relation_between A B P) => fun (x) => fun (y) =>
    Iff.intro
    (
      fun (h₁ : (x . (comp A B (P⁻¹)) . y)) =>
        let first := Iff.mp (difference_prop (A × B) (P⁻¹) (x, y)) h₁
        let second := Iff.mpr (cartesian_product_pair_prop B A y x) (Iff.mp (conj_comm (x ∈ A) (y ∈ B)) (Iff.mp (cartesian_product_pair_prop A B x y) (And.left first)))
        let third := Iff.mpr (neg_conj ((y, x) ∈ P) ((x, y) ∈ (P⁻¹)) (inv_pair_prop P (And.left (prop_then_binary_relation A B P h)) y x)) (And.right first)
        let fourth := Iff.mpr (difference_prop (B × A) (P) (y, x)) (And.intro (second) (third))
        Iff.mp (inv_pair_prop (comp B A P) (comp_is_rel B A P) y x) fourth
    )
    (
      fun (h₂ : (x . ((comp B A P)⁻¹) . y)) =>
        let first := Iff.mpr (inv_pair_prop (comp B A P) (comp_is_rel B A P) y x) h₂
        let second := Iff.mp (difference_prop (B × A) (P) (y, x)) first
        let third := Iff.mpr ((cartesian_product_pair_prop A B x y)) ((Iff.mp (conj_comm (y ∈ B) (x ∈ A))) (Iff.mp (cartesian_product_pair_prop B A y x) (And.left second)))
        let fourth := Iff.mp (((neg_conj ((y, x) ∈ P) ((x, y) ∈ (P⁻¹)))) (inv_pair_prop P (And.left ((prop_then_binary_relation A B P h))) y x)) (And.right (second))
        Iff.mpr (difference_prop (A × B) (P⁻¹) (x, y)) (And.intro (third) (fourth))



    )


axiom iff_transitivity (p q r : Prop) : (p ↔ q) → (q ↔ r) → (p ↔ r)
axiom conj_disj_distr_left (p q r : Prop) : (p ∧ (q ∨ r)) ↔ ((p ∧ q) ∨ (p ∧ r))
axiom conj_disj_distr_right (p q r : Prop) : ((q ∨ r) ∧ p) ↔ ((q ∧ p) ∨ (r ∧ p))
axiom exits_or_prop (P Q : Set → Prop) : (∃ x, (P x ∨ Q x)) ↔ ((∃ x, P x) ∨ (∃ x, Q x))
axiom disj_congr (p q r s : Prop) : (p ↔ q) →  (r ↔ s) → (p ∨ r ↔ q ∨ s)


theorem comp_inv_prop : ∀ P A B, binary_relation_between A B P → comp A B (P⁻¹) = (comp B A P)⁻¹ :=
  fun (P) => fun (A) => fun (B) => fun (h : binary_relation_between A B P) =>
    relation_equality (comp A B (P⁻¹)) ((comp B A P)⁻¹) (comp_is_rel A B (P⁻¹)) (inv_is_rel (comp B A P) (comp_is_rel B A P)) (comp_inv_prop_pair P A B h)



theorem union_composition_pair_prop_right : ∀ P Q R, ∀ x y, (x . ((P ∪ Q) ∘ R) . y) ↔ (x . ((P ∘ R) ∪ (Q ∘ R)) . y) :=
  fun (P Q R x y) =>
    let first: (x, y) ∈ (P ∪ Q) ∘ R ↔ ∃ z, (x, z) ∈ R ∧ (z, y) ∈ P ∪ Q  := composition_pair_prop (P ∪ Q) R x y
    let second : (∃ z, (x, z) ∈ R ∧ (z, y) ∈ P ∪ Q) ↔ (∃ z, (x, z) ∈ R ∧ (((z, y) ∈ P) ∨ (z, y) ∈ Q) ) := exists_congr (fun (z) => and_congr_right' (union2_sets_prop P Q (z, y)))
    let third : (x, y) ∈ (P ∪ Q) ∘ R ↔ ∃ z, (x, z) ∈ R ∧ (((z, y) ∈ P) ∨ (z, y) ∈ Q)
      := iff_transitivity ((x, y) ∈ (P ∪ Q) ∘ R) (∃ z, (x, z) ∈ R ∧ (z, y) ∈ P ∪ Q) (∃ z, (x, z) ∈ R ∧ (((z, y) ∈ P) ∨ (z, y) ∈ Q) )
      (first) (second)
    let h₁ : (∃ z, (x, z) ∈ R ∧ ((z, y) ∈ P ∨ (z, y) ∈ Q)) ↔ ∃ z, ((x, z) ∈ R ∧ (z, y) ∈ P) ∨ (x, z) ∈ R ∧ (z, y) ∈ Q := exists_congr (fun (z) => conj_disj_distr_left ((x, z) ∈ R) ((z, y) ∈ P) ((z, y) ∈ Q))
    let fourth : (x, y) ∈ (P ∪ Q) ∘ R ↔ (∃ z, ((x, z) ∈ R ∧ ((z, y) ∈ P)) ∨ ((x, z) ∈ R ∧ (z, y) ∈ Q))
      := iff_transitivity ((x, y) ∈ (P ∪ Q) ∘ R) (∃ z, (x, z) ∈ R ∧ (((z, y) ∈ P) ∨ (z, y) ∈ Q) ) (∃ z, ((x, z) ∈ R ∧ ((z, y) ∈ P)) ∨ ((x, z) ∈ R ∧ (z, y) ∈ Q))
      (third) (h₁)
    let fifth : (x, y) ∈ (P ∪ Q) ∘ R ↔ (∃ z, ((x, z) ∈ R ∧ ((z, y) ∈ P))) ∨ (∃ z, ( (x, z) ∈ R ∧ (z, y) ∈ Q)) :=
      iff_subst_pred_arg (fun (s) => (x, y) ∈ (P ∪ Q) ∘ R ↔ s) (∃ z, ((x, z) ∈ R ∧ ((z, y) ∈ P)) ∨ ((x, z) ∈ R ∧ (z, y) ∈ Q)) ((∃ z, ((x, z) ∈ R ∧ ((z, y) ∈ P))) ∨ (∃ z, ( (x, z) ∈ R ∧ (z, y) ∈ Q)))
      (exits_or_prop (fun (z) => (((x, z) ∈ R) ∧ ((z, y) ∈ P))) (fun (z) =>  ( (x, z) ∈ R ∧ (z, y) ∈ Q))) (fourth)
    let sixth : (x, y) ∈ (P ∪ Q) ∘ R ↔ ((x, y) ∈ (P ∘ R)) ∨ ((x, y) ∈ (Q ∘ R)) :=
      iff_subst_pred_arg (fun (s) => (x, y) ∈ (P ∪ Q) ∘ R ↔ s) ((∃ z, ((x, z) ∈ R ∧ ((z, y) ∈ P))) ∨ (∃ z, ( (x, z) ∈ R ∧ (z, y) ∈ Q))) (((x, y) ∈ (P ∘ R)) ∨ ((x, y) ∈ (Q ∘ R)))
      (disj_congr (∃ z, ((x, z) ∈ R ∧ ((z, y) ∈ P))) ((x, y) ∈ (P ∘ R)) ((∃ z, ( (x, z) ∈ R ∧ (z, y) ∈ Q))) ((x, y) ∈ (Q ∘ R)) (iff_comm.mp (composition_pair_prop P R x y)) (iff_comm.mp (composition_pair_prop Q R x y))) (fifth)

    iff_subst_pred_arg (fun (s) => (x, y) ∈ (P ∪ Q) ∘ R ↔ s) (((x, y) ∈ (P ∘ R)) ∨ ((x, y) ∈ (Q ∘ R))) ((x, y) ∈ ((P ∘ R) ∪ (Q ∘ R))) (iff_comm.mp (union2_sets_prop (P ∘ R) (Q ∘ R) (x, y))) (sixth)


theorem union_composition_prop_right : ∀ P Q R, ((P ∪ Q) ∘ R) = ((P ∘ R) ∪ (Q ∘ R)) :=
  fun (P Q R) =>
    relation_equality ((P ∪ Q) ∘ R) ((P ∘ R) ∪ (Q ∘ R)) (composition_is_rel (P ∪ Q) R) (union2_rel_is_rel (P ∘ R) (Q ∘ R) (composition_is_rel P R) (composition_is_rel Q R)) (union_composition_pair_prop_right P Q R)


theorem union_composition_pair_prop_left : ∀ P Q R, ∀ x y, (x . (P ∘ (Q ∪ R)) . y) ↔ (x . ((P ∘ Q) ∪ (P ∘ R)) . y) :=
  fun (P Q R x y) =>
    let first: (x, y) ∈ P ∘ (Q ∪ R) ↔ ∃ z, (x, z) ∈ Q ∪ R ∧ (z, y) ∈ P  := composition_pair_prop P (Q ∪ R) x y

    let second : (∃ z, (x, z) ∈ (Q ∪ R) ∧ (z, y) ∈ P) ↔ (∃ z, (((x, z) ∈ Q ∨ (x, z) ∈ R) ∧ ((z, y) ∈ P))) := exists_congr (fun (z) => and_congr_left' (union2_sets_prop Q R (x, z)))

    let third : (x, y) ∈ P ∘ (Q ∪ R) ↔ (∃ z, (((x, z) ∈ Q ∨ (x, z) ∈ R) ∧ ((z, y) ∈ P)))
      := iff_transitivity ((x, y) ∈ P ∘ (Q ∪ R)) (∃ z, (x, z) ∈ (Q ∪ R) ∧ (z, y) ∈ P) (∃ z, (((x, z) ∈ Q ∨ (x, z) ∈ R) ∧ ((z, y) ∈ P)))
      (first) (second)

    let h₁ : (∃ z, (((x, z) ∈ Q ∨ (x, z) ∈ R) ∧ ((z, y) ∈ P))) ↔ ∃ z, ((x, z) ∈ Q ∧ (z, y) ∈ P) ∨ ((x, z) ∈ R ∧ (z, y) ∈ P) := exists_congr (fun (z) => conj_disj_distr_right ((z, y) ∈ P) ((x, z) ∈ Q) ((x, z) ∈ R))

    let fourth : (x, y) ∈ P ∘ (Q ∪ R) ↔ ∃ z, ((x, z) ∈ Q ∧ (z, y) ∈ P) ∨ ((x, z) ∈ R ∧ (z, y) ∈ P)
      := iff_transitivity  ((x, y) ∈ P ∘ (Q ∪ R))  (∃ z, (((x, z) ∈ Q ∨ (x, z) ∈ R) ∧ ((z, y) ∈ P))) (∃ z, ((x, z) ∈ Q ∧ (z, y) ∈ P) ∨ ((x, z) ∈ R ∧ (z, y) ∈ P) )
      (third) (h₁)


    let fifth : (x, y) ∈ P ∘ (Q ∪ R) ↔ (∃ z, ((x, z) ∈ Q ∧ (z, y) ∈ P)) ∨ (∃ z, ((x, z) ∈ R ∧ (z, y) ∈ P)) :=
      iff_subst_pred_arg (fun (s) => (x, y) ∈ P ∘ (Q ∪ R) ↔ s) (∃ z, ((x, z) ∈ Q ∧ (z, y) ∈ P) ∨ ((x, z) ∈ R ∧ (z, y) ∈ P))  ((∃ z, ((x, z) ∈ Q ∧ (z, y) ∈ P)) ∨ (∃ z, ((x, z) ∈ R ∧ (z, y) ∈ P)))
      (exits_or_prop (fun (z) => ((x, z) ∈ Q ∧ (z, y) ∈ P)) (fun (z) => ((x, z) ∈ R ∧ (z, y) ∈ P))) (fourth)


    let sixth : (x, y) ∈ P ∘ (Q ∪ R) ↔ ((x, y) ∈ (P ∘ Q)) ∨ ((x, y) ∈ (P ∘ R)) :=
      iff_subst_pred_arg (fun (s) => (x, y) ∈ P ∘ (Q ∪ R) ↔ s) ((∃ z, ((x, z) ∈ Q ∧ (z, y) ∈ P)) ∨ (∃ z, ((x, z) ∈ R ∧ (z, y) ∈ P)))  (((x, y) ∈ (P ∘ Q)) ∨ ((x, y) ∈ (P ∘ R)))
      (disj_congr (∃ z, ((x, z) ∈ Q ∧ (z, y) ∈ P)) ((x, y) ∈ (P ∘ Q)) ((∃ z, ((x, z) ∈ R ∧ (z, y) ∈ P))) ((x, y) ∈ (P ∘ R)) (iff_comm.mp (composition_pair_prop P Q x y)) (iff_comm.mp (composition_pair_prop P R x y))) (fifth)

    iff_subst_pred_arg (fun (s) => (x, y) ∈ P ∘ (Q ∪ R) ↔ s) (((x, y) ∈ (P ∘ Q)) ∨ ((x, y) ∈ (P ∘ R))) ((x, y) ∈ ((P ∘ Q) ∪ (P ∘ R))) (iff_comm.mp (union2_sets_prop (P ∘ Q) (P ∘ R) (x, y))) (sixth)



theorem compostion_union_prop_left : ∀ P Q R, P ∘ (Q ∪ R) = (P ∘ Q) ∪ (P ∘ R) :=
  fun (P Q R) =>
    relation_equality (P ∘ (Q ∪ R)) ((P ∘ Q) ∪ (P ∘ R)) (composition_is_rel (P) (Q ∪ R)) (union2_rel_is_rel (P ∘ Q) (P ∘ R) (composition_is_rel P Q) (composition_is_rel P R)) (union_composition_pair_prop_left P Q R)


theorem monotonic_subset_composition_pair_right : ∀ P Q R, P ⊆ Q → (∀ x y, (x . (P ∘ R) . y) → (x . (Q ∘ R) . y)) :=
  fun (P Q R) => fun (h : P ⊆ Q) =>
    fun (x y) => fun (g : (x . (P ∘ R) . y)) =>
      let first := Iff.mp (composition_pair_prop P R x y) g
      Exists.elim (first)
      (
        fun (w) =>
          fun (hw : (x . R . w) ∧ (w . P . y)) =>
            Iff.mpr (composition_pair_prop Q R x y) (Exists.intro w (And.intro (And.left hw) (h (w, y) (And.right hw))))
      )



theorem monotonic_subset_composition_right : ∀ P Q R, P ⊆ Q → P ∘ R ⊆ Q ∘ R :=
  fun (P Q R) =>
    fun (h : P ⊆ Q) =>
      rel_subset (P ∘ R) (Q ∘ R) (composition_is_rel P R) (composition_is_rel Q R) (
        monotonic_subset_composition_pair_right P Q R h
      )


theorem monotonic_subset_composition_pair_left : ∀ P Q R, P ⊆ Q → (∀ x y, (x . (R ∘ P) . y) → (x . (R ∘ Q) . y)) :=
  fun (P Q R) => fun (h : P ⊆ Q) =>
    fun (x y) => fun (g : (x . (R ∘ P) . y)) =>
      let first := Iff.mp (composition_pair_prop R P x y) g
      Exists.elim (first)
      (
        fun (w) =>
          fun (hw : (x . P . w) ∧ (w . R . y)) =>
            Iff.mpr (composition_pair_prop R Q x y) (Exists.intro w (And.intro (h (x, w) (And.left hw)) (And.right hw)))
      )


theorem monotonic_subset_composition_left : ∀ P Q R, P ⊆ Q → R ∘ P ⊆ R ∘ Q :=
  fun (P Q R) =>
    fun (h : P ⊆ Q) =>
      rel_subset (R ∘ P) (R ∘ Q) (composition_is_rel R P) (composition_is_rel R Q) (
        monotonic_subset_composition_pair_left  P Q R h
      )


theorem intersect2_composition_prop_right: ∀ P Q R, (P ∩ Q) ∘ R ⊆ (P ∘ R) ∩ (Q ∘ R) :=
  fun (P Q R) =>
    fun (x) =>
      fun (h : x ∈ (P ∩ Q) ∘ R) =>
        let first := monotonic_subset_composition_right (P ∩ Q) P R (And.left (intersect_2sets_subset_prop P Q)) x h
        let second := monotonic_subset_composition_right (P ∩ Q) Q R (And.right (intersect_2sets_subset_prop P Q)) x h
        Iff.mpr (intersect_2sets_prop (P ∘ R) (Q ∘ R) x) (And.intro (first) (second))




theorem intersect2_composition_prop: ∀ P Q R, P ∘ (Q ∩ R) ⊆ (P ∘ Q) ∩ (P ∘ R) :=
  fun (P Q R) =>
    fun (x) =>
      fun (h : x ∈ (P ∘ (Q ∩ R))) =>
        let first := monotonic_subset_composition_left (Q ∩ R) Q P (And.left (intersect_2sets_subset_prop Q R)) x h
        let second := monotonic_subset_composition_left (Q ∩ R) R P (And.right (intersect_2sets_subset_prop Q R)) x h
        Iff.mpr (intersect_2sets_prop (P ∘ Q) (P ∘ R) x) (And.intro (first) (second))




noncomputable def id_ (A : Set) : Set := {t ∈ (A × A) | ∃ x : Set, t = (x, x)}

theorem id_is_rel : ∀ A, binary_relation (id_ A) :=
  fun (A) =>
    let first := specification_set_subset (fun (u) => ∃ x : Set, u = (x, x)) (A × A)
    And.left (prop_then_binary_relation A A (id_ A) (first))


theorem id_prop : ∀ A x y, (x . (id_ A) . y) → (((x = y) ∧ (x ∈ A)) ∧ (y ∈ A)) :=
  fun (A) => fun (x) => fun (y) => fun (h : (x . (id_ A) . y)) =>
    let first := And.right (Iff.mp (specification_set_is_specification (fun (u) => ∃ x : Set, u = (x, x)) (A × A) (x, y)) h)
    let second := And.left (Iff.mp (specification_set_is_specification (fun (u) => ∃ x : Set, u = (x, x)) (A × A) (x, y)) h)
    let third := Iff.mp (cartesian_product_pair_prop A A x y) second
    Exists.elim first
    (
      fun (w) =>
        fun (hw : (x, y) = (w, w)) =>
          let fourth := And.left (Iff.mp (ordered_pair_set_prop x y w w) hw)
          let fifth := And.right (Iff.mp (ordered_pair_set_prop x y w w) hw)
          And.intro (And.intro (eq_subst (fun (u) => u = y) w x (Eq.symm fourth) (Eq.symm fifth)) (And.left third)) (And.right third)
    )



theorem prop_then_id : ∀ A, ∀ x ∈ A; (x . (id_ A) . x) :=
  fun (A) => fun (x) => fun (h : x ∈ A) =>
    Iff.mpr (specification_set_is_specification (fun (u) => ∃ x : Set, u = (x, x)) (A × A) (x, x))
     (And.intro (Iff.mpr (cartesian_product_pair_prop A A x x) (And.intro h h)) (Exists.intro x (Eq.refl (x, x))))



theorem inv_id : ∀ A, ((id_ A)⁻¹) = (id_ A) :=
  fun (A) =>
    relation_equality ((id_ A)⁻¹) (id_ A) (inv_is_rel (id_ A) (id_is_rel A)) (id_is_rel A) (fun (x) => fun (y) =>
      Iff.intro
      (
        fun (h : (x . ((id_ A)⁻¹) . y) ) =>
          let first := Iff.mpr (inv_pair_prop (id_ A) (id_is_rel A) y x) h
          let second := And.left (And.left (id_prop A y x first))
          eq_subst (fun (u) => (x . (id_ A) . u)) x y (Eq.symm second) (prop_then_id A x (And.right (id_prop A y x first)))
      )
      (
        fun (h : (x . (id_ A) . y)) =>
          let _ := Iff.mp (inv_pair_prop (id_ A) (id_is_rel A) x y) h
          let second := And.left (And.left (id_prop A x y h))
          eq_subst (fun (u) => (u . ((id_ A)⁻¹) . y)) y x (Eq.symm second) (Iff.mp (inv_pair_prop (id_ A) (id_is_rel A) (y) y) (prop_then_id A y (And.right (id_prop A x y h))))

      )
    )



theorem id_rel_composition_right : ∀ A B R, binary_relation_between A B R → (R ∘ (id_ A)) = R :=
  fun (A B R) => fun (h : binary_relation_between A B R) =>
    relation_equality (R ∘ id_ A) (R)  (composition_is_rel R (id_ A)) (And.left (prop_then_binary_relation A B R (h)))  (fun (x y) => Iff.intro
    (
      fun (g : ((x . (R ∘ (id_ A)) . y))) =>
        let first := Iff.mp (composition_pair_prop R (id_ A) x y) g
        Exists.elim first
        (
          fun (w) =>
            fun (hw : (x, w) ∈ id_ A ∧ (w, y) ∈ R) =>
              let _ := id_prop A x w (And.left hw)
              eq_subst (fun (u) => (u, y) ∈ R) w x (Eq.symm (And.left (And.left (id_prop A x w (And.left hw))))) (And.right hw)
        )

    )
    (
      fun (g : (x . R . y)) =>

        Iff.mpr (composition_pair_prop R (id_ A) x y) (Exists.intro x (And.intro (prop_then_id A x (And.left (Iff.mp (cartesian_product_pair_prop A B x y) (h (x, y) (g))))) (g)))
    )
    )




theorem id_rel_composition_left : ∀ A B  R, binary_relation_between A B R → ((id_ B) ∘ R) = R :=
  fun (A B R) => fun (h : binary_relation_between A B R) =>
    relation_equality (id_ B ∘ R) (R)  (composition_is_rel (id_ B) (R)) (And.left (prop_then_binary_relation A B R (h)))  (fun (x y) => Iff.intro
    (
      fun (g : ((x . (id_ B ∘ R) . y))) =>
        let first := Iff.mp (composition_pair_prop (id_ B) (R) x y) g
        Exists.elim first
        (
          fun (w) =>
            fun (hw : (x, w) ∈ R ∧ (w, y) ∈ id_ B) =>
              eq_subst (fun (u) => (x, u) ∈ R) w y (And.left (And.left (id_prop B w y (And.right hw)))) (And.left hw)
        )

    )
    (
      fun (g : (x . R . y)) =>

        Iff.mpr (composition_pair_prop (id_ B) R x y) (Exists.intro y (And.intro (g) (prop_then_id B y  (
            And.right ( (Iff.mp (cartesian_product_pair_prop A B x y)) (h (x, y) g) )
        ))))
    )
    )



noncomputable def rel_image (X R : Set) := {b ∈ rng R | ∃ a ∈ X; (a . R . b)}

syntax  term ".[" term "]" : term

macro_rules
  | `($R:term .[ $X:term ])  => `(rel_image $X $R)



theorem rng_is_rel_image : ∀ R, binary_relation R → rng R = R.[dom R] :=
  fun (R) => fun (_ : binary_relation R) =>
    extensionality (rng R) (R.[dom R]) (
      fun (x) =>
      Iff.intro
      (
        fun (h : x ∈ rng R) =>
          let first := Iff.mp (rng_prop R x) h
          Exists.elim (first) (
            fun (w) =>
              fun (hw : (w . R . x)) =>
                let second := Iff.mpr (dom_prop R w) (Exists.intro x (hw))
                let third: ∃ m ∈ dom R; (m . R . x) := Exists.intro w (And.intro (second) (hw))
                (Iff.mpr (specification_set_is_specification (fun (u) => ∃ a ∈ (dom R) ; (a . R . u)) (rng R) x)) (And.intro (h) (third))
          )
      )
      (
        fun (h : x ∈ R.[dom R]) =>
        specification_set_subset (fun (u) => ∃ a ∈ (dom R); (a . R . u)) (rng R) x h
      )
    )



theorem rel_pre_image_eq : ∀ Y R, binary_relation R → R⁻¹.[Y] = {a ∈ dom R | ∃ b ∈ Y; (a . R . b)} :=
  fun (Y) => fun (R) => fun (g : binary_relation R) =>
    extensionality (R⁻¹.[Y]) ({a ∈ dom R | ∃ b ∈ Y; (a . R . b)}) (
      fun (x) =>
      Iff.intro
      (
        fun (h : x ∈ R⁻¹.[Y]) =>
          let first := inv_rng R g
          let second := And.left (Iff.mp (specification_set_is_specification (fun (u) => ∃ a ∈ Y; (a . (R⁻¹) . u)) (rng (R⁻¹)) x) h)
          let third := And.right (Iff.mp (specification_set_is_specification (fun (u) => ∃ a ∈ Y; (a . (R⁻¹) . u)) (rng (R⁻¹)) x) h)
          let fourth := eq_subst (fun (u) => x ∈ u) (rng (R⁻¹)) (dom R) (first) (second)
          Exists.elim third
          (
            fun (w) =>
              fun (hw: w ∈ Y ∧ (w . (R⁻¹) . x)) =>
                let fifth := Iff.mpr (inv_pair_prop R g x w) (And.right hw)
                let sixth: ∃ b ∈ Y; (x . R . b) := Exists.intro w (And.intro (And.left hw) (fifth))
                (Iff.mpr (specification_set_is_specification (fun (u) => ∃ b ∈ Y; (u . R . b)) (dom R) x)) (And.intro (fourth) (sixth))

          )

      )
      (
        fun (h : x ∈ {a ∈ dom R | ∃ b ∈ Y; (a . R . b)}) =>
          let first := inv_rng R g
          let second := And.left (Iff.mp (specification_set_is_specification (fun (u) => ∃ b ∈ Y; (u . R . b)) (dom R) x) h)
          let third := And.right (Iff.mp (specification_set_is_specification (fun (u) => ∃ b ∈ Y; (u . R . b)) (dom R) x) h)
          let fourth := eq_subst (fun (u) => x ∈ u) (dom R) (rng (R⁻¹)) (Eq.symm first) (second)
          Exists.elim third
          (
            fun (w) =>
              fun (hw : w ∈ Y ∧ (x . R . w)) =>
                let fifth := Iff.mp (inv_pair_prop R g x w) (And.right hw)
                let sixth : ∃ a ∈ Y; (a . (R⁻¹) . x) := Exists.intro w (And.intro (And.left hw) (fifth))
                (Iff.mpr (specification_set_is_specification (fun (u) => ∃ a ∈ Y; (a . (R⁻¹) . u)) (rng (R⁻¹)) x)) (And.intro (fourth) (sixth))
          )
      )
    )



theorem dom_preimage : ∀ A B P, binary_relation_between A B P → dom P = P⁻¹.[B] :=
  fun (A B P) => fun (h₁ : binary_relation_between A B P) =>
    extensionality (dom P) (P⁻¹.[B]) (
      fun (x) =>
        Iff.intro
        (
          fun (s : x ∈ dom P) =>
            let first := Iff.mp (dom_prop P x) s
            Exists.elim first
            (
              fun (w) =>
                fun (hw : (x, w) ∈ P) =>
                  let second := rel_pre_image_eq B P (And.left (prop_then_binary_relation A B P h₁))
                  eq_subst (fun (u) => x ∈ u) (({a ∈ dom P | ∃ b ∈ B; (a . P . b)})) (P⁻¹.[B])  (Eq.symm second) (
                    Iff.mpr (specification_set_is_specification (fun (u) => ∃ b ∈ B; (u . P . b)) (dom P) x) (And.intro (s) (Exists.intro w (And.intro (And.right (Iff.mp (cartesian_product_pair_prop A B x w) (h₁ (x, w) hw))) (hw))))

                  )

            )

        )
        (
          fun (s : x ∈ P⁻¹.[B]) =>
            let first := rel_pre_image_eq B P (And.left (prop_then_binary_relation A B P h₁))
            let second:= eq_subst (fun (u) => x ∈ u) (P⁻¹.[B]) ({a ∈ dom P | ∃ b ∈ B; (a . P . b)})  (first) (s)

            specification_set_subset (fun (u) => ∃ b ∈ B; (u . P . b)) (dom P) x (second)

        )
    )


theorem rel_image_union : ∀ X Y R, binary_relation R → R.[X ∪ Y] = R.[X] ∪ R.[Y] :=
  fun (X) => fun (Y) => fun (R) => fun (_ : binary_relation R) =>
    extensionality (R.[X ∪ Y]) (R.[X] ∪ R.[Y])
    (
      fun (b) =>
        let first : b ∈ R.[X ∪ Y] ↔ b ∈ rng R ∧ (∃ s, (s ∈ X ∪ Y) ∧ (s . R . b)) :=
          specification_set_is_specification (fun (u) => ∃ a ∈ (X ∪ Y); (a . R . u)) (rng R) (b)

        let second : b ∈ R.[X ∪ Y] ↔ b ∈ rng R ∧ (∃ s, (s ∈ X ∨ s ∈ Y) ∧ (s . R . b)) :=
          iff_subst_pred_arg (fun (u) => b ∈ R.[X ∪ Y] ↔ b ∈ rng R ∧ u) (∃ s, (s ∈ X ∪ Y) ∧ (s . R . b)) (∃ s, (s ∈ X ∨ s ∈ Y) ∧ (s . R . b))
          (exists_congr (fun (z) => and_congr_left' (union2_sets_prop X Y z))) (first)

        let third : b ∈ R.[X ∪ Y] ↔ b ∈ rng R ∧ (∃ s, (s ∈ X ∧ (s . R . b)) ∨ (s ∈ Y ∧ (s . R . b))) :=
          iff_subst_pred_arg (fun (u) => b ∈ R.[X ∪ Y] ↔ b ∈ rng R ∧ u) (∃ s, (s ∈ X ∨ s ∈ Y) ∧ (s . R . b)) (∃ s, (s ∈ X ∧ (s . R . b)) ∨ (s ∈ Y ∧ (s . R . b)))
          (exists_congr (fun (z) => conj_disj_distr_right (z . R . b) (z ∈ X) (z ∈ Y))) (second)

        let fourth : b ∈ R.[X ∪ Y] ↔ b ∈ rng R ∧ ((∃ s, (s ∈ X) ∧ (s . R . b)) ∨ (∃ s, (s ∈ Y) ∧ (s . R . b))) :=
          iff_subst_pred_arg (fun (u) => b ∈ R.[X ∪ Y] ↔ b ∈ rng R ∧ u) (∃ s, (s ∈ X ∧ (s . R . b)) ∨ (s ∈ Y ∧ (s . R . b))) ((∃ s, (s ∈ X) ∧ (s . R . b)) ∨ (∃ s, (s ∈ Y) ∧ (s . R . b)))
          (exists_or) (third)

        let fifth : b ∈ R.[X ∪ Y] ↔ (b ∈ rng R ∧ (∃ s, (s ∈ X) ∧ (s . R . b))) ∨ (b ∈ rng R ∧ (∃ s, (s ∈ Y) ∧ (s . R . b))) :=
          iff_subst_pred_arg (fun (u) => b ∈ R.[X ∪ Y] ↔ u) (b ∈ rng R ∧ ((∃ s, (s ∈ X) ∧ (s . R . b)) ∨ (∃ s, (s ∈ Y) ∧ (s . R . b)))) ((b ∈ rng R ∧ (∃ s, (s ∈ X) ∧ (s . R . b))) ∨ (b ∈ rng R ∧ (∃ s, (s ∈ Y) ∧ (s . R . b))))
          (conj_disj_distr_left (b ∈ rng R) ((∃ s, (s ∈ X) ∧ (s . R . b))) ((∃ s, (s ∈ Y) ∧ (s . R . b)))) (fourth)


        let sixth : b ∈ R.[X ∪ Y] ↔ (b ∈ R.[X]) ∨ (b ∈ R.[Y]) :=
          iff_subst_pred_arg (fun (u) => b ∈ R.[X ∪ Y] ↔ u) ((b ∈ rng R ∧ (∃ s, (s ∈ X) ∧ (s . R . b))) ∨ (b ∈ rng R ∧ (∃ s, (s ∈ Y) ∧ (s . R . b)))) ((b ∈ R.[X]) ∨ (b ∈ R.[Y]))
          (disj_congr ((b ∈ rng R ∧ (∃ s, (s ∈ X) ∧ (s . R . b)))) ((b ∈ R.[X])) (b ∈ rng R ∧ (∃ s, (s ∈ Y) ∧ (s . R . b))) (b ∈ R.[Y])
          (iff_comm.mp (specification_set_is_specification (fun (u) => ∃ s ∈ X; (s . R . u)) (rng R) b)) (iff_comm.mp
          (specification_set_is_specification (fun (u) => ∃ s ∈ Y; (s . R . u)) (rng R) b))
          ) (fifth)

        iff_subst_pred_arg (fun (u) => b ∈ R.[X ∪ Y] ↔ u) ((b ∈ R.[X]) ∨ (b ∈ R.[Y])) (b ∈ R.[X] ∪ R.[Y])
        (iff_comm.mp (union2_sets_prop (R.[X]) (R.[Y]) b)) (sixth)
    )


theorem rel_preimage_union : ∀ X Y R , binary_relation R → R⁻¹.[X ∪ Y] = R⁻¹.[X] ∪ R⁻¹.[Y] :=
  fun (X Y R) => fun (h : binary_relation R) =>
    rel_image_union X Y (R⁻¹) (inv_is_rel R h)



theorem monotonic_rel_image : ∀ X Y R, binary_relation R → X ⊆ Y → R.[X] ⊆ R.[Y] :=
  fun (X Y R) => fun (_ : binary_relation R) => fun (g : X ⊆ Y) =>
    fun (x) => fun (s : x ∈ R.[X]) =>
      let first := Iff.mp (specification_set_is_specification (fun (u) => ∃ a ∈ X; (a . R . u)) (rng R) x) s
      Exists.elim (And.right (first))
      (
        fun (w) =>
          fun (hw : w ∈ X ∧ (w . R . x)) =>
            let second := g w (And.left hw)
            (Iff.mpr (specification_set_is_specification (fun (u) => ∃ a ∈ Y; (a . R . u)) (rng R) x)) (And.intro (And.left first) (Exists.intro w (And.intro (second) (And.right hw))))
      )



theorem monotonic_rel_preimage : ∀ X Y R, binary_relation R → X ⊆ Y → R⁻¹.[X] ⊆ R⁻¹.[Y] :=
  fun (X Y R) => fun (h : binary_relation R) => fun (g : X ⊆ Y) =>
    monotonic_rel_image X Y (R⁻¹) (inv_is_rel R h) g


theorem lemma_subset_intersec : ∀ A B C, A ⊆ B → A ⊆ C → A ⊆ (B ∩ C) :=
  fun (A B C) => fun (h : A ⊆ B) => fun (g : A ⊆ C) =>
    fun (x) => fun (t : x ∈ A) =>
      Iff.mpr (intersect_2sets_prop B C x) (And.intro (h x t) (g x t))


theorem rel_image_inter : ∀ X Y R, binary_relation R → R.[X ∩ Y] ⊆ (R.[X] ∩ R.[Y]) :=
  fun (X Y R) => fun (h : binary_relation R) =>
    let first := And.left (intersect_2sets_subset_prop X Y)
    let second := monotonic_rel_image (X ∩ Y) X R h first
    let third := And.right (intersect_2sets_subset_prop X Y)
    let fourth := monotonic_rel_image (X ∩ Y) Y R h third
    lemma_subset_intersec (R.[X ∩ Y]) (R.[X]) (R.[Y]) (second) (fourth)



theorem rel_preimage_inter : ∀ X Y R, binary_relation R → R⁻¹.[X ∩ Y] ⊆ (R⁻¹.[X] ∩ R⁻¹.[Y]) :=
  fun (X Y R) => fun (h : binary_relation R) =>
  rel_image_inter X Y (R⁻¹) (inv_is_rel R (h))




theorem rel_image_composition : ∀ P Q X, (P ∘ Q).[X] = P.[Q.[X]] :=
  fun (P Q X) =>
    extensionality ((P ∘ Q).[X]) (P.[Q.[X]]) (
      fun (c) =>

        let first: c ∈ (P ∘ Q).[X] ↔ c ∈ rng (P ∘ Q) ∧ (∃ a ∈ X; (a . (P ∘ Q) . c))
          := specification_set_is_specification (fun (u) => ∃ a ∈ X; (a . (P ∘ Q) . u)) (rng (P ∘ Q)) c

        let second : c ∈ (P ∘ Q).[X] ↔ c ∈ rng (P ∘ Q) ∧ (∃ a ∈ X; (∃ b, (a . Q . b) ∧ (b . P . c))) :=
          iff_subst_pred_arg (fun (u) => c ∈ (P ∘ Q).[X] ↔ c ∈ rng (P ∘ Q) ∧ u) (∃ a ∈ X; (a . (P ∘ Q) . c))  (∃ a ∈ X; (∃ b, (a . Q . b) ∧ (b . P . c)))
          (exists_congr (fun (a) => and_congr_right' (composition_pair_prop P Q a c))) (first)

        let third : c ∈ (P ∘ Q).[X] ↔ c ∈ rng (P ∘ Q) ∧ ∃ a, ∃ b, (a ∈ X ∧ (a . Q . b) ∧ (b . P . c)) :=
          iff_subst_pred_arg (fun (u) => c ∈ (P ∘ Q).[X] ↔ c ∈ rng (P ∘ Q) ∧ u) ((∃ a ∈ X; (∃ b, (a . Q . b) ∧ (b . P . c)))) ( ∃ a, ∃ b, (a ∈ X ∧ (a . Q . b) ∧ (b . P . c)))
          (exists_congr (fun (_) => iff_comm.mp (exists_and_left))) (second)

        let fourth : c ∈ (P ∘ Q).[X] ↔ c ∈ rng (P ∘ Q) ∧ ∃ b, ∃ a, (a ∈ X ∧ (a . Q . b) ∧ (b . P . c)) :=
          iff_subst_pred_arg (fun (u) => c ∈ (P ∘ Q).[X] ↔ c ∈ rng (P ∘ Q) ∧ u) ( ∃ a, ∃ b, (a ∈ X ∧ (a . Q . b) ∧ (b . P . c))) (∃ b, ∃ a, (a ∈ X ∧ (a . Q . b) ∧ (b . P . c)))
          (exists_comm) (third)

        let fifth : c ∈ (P ∘ Q).[X] ↔ c ∈ rng (P ∘ Q) ∧ ∃ b, ∃ a, (((a ∈ X ∧ (a . Q . b))) ∧ (b . P . c)) :=
          iff_subst_pred_arg (fun (u) => c ∈ (P ∘ Q).[X] ↔ c ∈ rng (P ∘ Q) ∧ u) (∃ b, ∃ a, (a ∈ X ∧ (a . Q . b) ∧ (b . P . c)) ) (∃ b, ∃ a, (((a ∈ X ∧ (a . Q . b))) ∧ (b . P . c)))
          (exists_congr (fun (_) => exists_congr (fun (_) => iff_comm.mp and_assoc))) (fourth)

        let sixth : c ∈ (P ∘ Q).[X] ↔ c ∈ rng (P ∘ Q) ∧ ∃ b, (∃ a, (a ∈ X ∧ (a . Q . b))) ∧ (b . P . c) :=
          iff_subst_pred_arg (fun (u) => c ∈ (P ∘ Q).[X] ↔ c ∈ rng (P ∘ Q) ∧ u) (∃ b, ∃ a, (((a ∈ X ∧ (a . Q . b))) ∧ (b . P . c))) (∃ b, (∃ a, (a ∈ X ∧ (a . Q . b))) ∧ (b . P . c))
          (exists_congr (fun (_) => exists_and_right)) (fifth)

        Iff.intro
        (
          fun (h : c ∈ (P ∘ Q).[X]) =>
            let h₁ := Iff.mp sixth h
            let _ := And.left h₁
            let h₃ := And.right h₁
            Exists.elim h₃
            (
              fun (w) =>
                fun (hw : (∃ a, (a ∈ X ∧ (a . Q . w))) ∧ (w . P . c)) =>
                  Exists.elim (And.left hw)
                  (
                    fun (u) =>
                      fun (hu : u ∈ X ∧ (u . Q . w)) =>
                        let h₄ := Iff.mpr (rng_prop Q w)  (Exists.intro u (And.right hu))
                        let h₅ : w ∈ Q.[X] := Iff.mpr (specification_set_is_specification (fun (u) => ∃ a ∈ X; (a . Q . u)) (rng Q) w) (And.intro (h₄) (Exists.intro u (And.intro (And.left hu) (And.right (hu)))))
                        let h₆ := Iff.mpr (rng_prop P c) (Exists.intro w (And.right hw))
                        let h₇ : c ∈ P.[Q.[X]] := (Iff.mpr (specification_set_is_specification (fun (u) => ∃ a ∈ Q.[X]; (a . P . u)) (rng P) c)) (And.intro (h₆) (Exists.intro w (And.intro (h₅)  (And.right hw))))
                        h₇
                  )


            )

        )
        (
          fun (h : c ∈ P.[Q.[X]]) =>
            let h₁ := Iff.mp (specification_set_is_specification (fun (u) => ∃ a ∈ Q.[X]; (a . P . u)) (rng P) c) h
            let _ := And.left h₁
            let h₃ := And.right h₁
            Exists.elim h₃
            (
              fun (w) =>
                fun (hw : w ∈ Q.[X] ∧ (w . P . c)) =>
                  let h₄ := Iff.mp (specification_set_is_specification (fun (u) => ∃ a ∈ X; (a . Q . u)) (rng Q) w) (And.left hw)
                  Exists.elim (And.right h₄)
                  (
                    fun (u) =>
                      fun (hu : u ∈ X ∧ (u . Q . w)) =>
                        (Iff.mpr (sixth)) (And.intro (Iff.mpr (rng_prop (P ∘ Q) c) (Exists.intro u ( (Iff.mpr (composition_pair_prop P Q u c)) (Exists.intro w (And.intro (And.right hu) (And.right hw))))))
                         (Exists.intro w (And.intro (Exists.intro u (hu)) (And.right hw)))
                        )
                  )
            )
        )

    )


theorem rel_preimage_composition : ∀ P Q X, binary_relation P → binary_relation Q → (P ∘ Q)⁻¹.[X] = Q⁻¹.[P⁻¹.[X]] :=
  fun (P Q X) => fun (h : binary_relation P) => fun (g : binary_relation Q) =>
    let first : (P ∘ Q)⁻¹.[X] = (Q⁻¹ ∘ P⁻¹).[X] :=
      eq_subst (fun (u) => (P ∘ Q)⁻¹.[X] = u.[X]) ((P ∘ Q)⁻¹) (Q⁻¹ ∘ P⁻¹) (inv_composition_prop P Q h g) (Eq.refl ((P ∘ Q)⁻¹.[X]))

    eq_subst (fun (u) => (P ∘ Q)⁻¹.[X] = u) ((Q⁻¹ ∘ P⁻¹).[X]) (Q⁻¹.[P⁻¹.[X]]) (rel_image_composition (Q⁻¹) (P⁻¹) X) (first)
