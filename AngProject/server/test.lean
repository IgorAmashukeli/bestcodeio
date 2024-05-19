theorem neg_true : ¬ True ↔ False :=
   Iff.intro
   (fun (x : ¬ True) => (x True.intro))
   (fun (x : False) => (False.elim : False  →  ¬ True) x)


theorem neg_false : ¬ False ↔ True :=
   Iff.intro
   (fun (_ : ¬ False) => True.intro)
   (fun (_ : True) => (fun (g : False) => g))


theorem conj_true (p : Prop) : p ∧ True ↔ p :=
   Iff.intro
   (fun (x : p ∧ True) => And.left x)
   (fun (x : p) => And.intro x True.intro)


theorem conj_false (p : Prop) : p ∧ False ↔ False :=
   Iff.intro
   (fun (x : p ∧ False) => And.right x)
   (fun (x : False) => (False.elim : False → p ∧ False) x)


theorem disj_true (p : Prop) : p ∨ True ↔ True :=
   Iff.intro
   (fun (_ : p ∨ True) => True.intro)
   (fun (x : True) => (Or.inr : True → p ∨ True) x)


theorem disj_false (p : Prop) : p ∨ False ↔ p :=
   Iff.intro
   (fun (x : p ∨ False) => Or.elim x
                           (fun (y : p) => y)
                           (fun (y : False) => (False.elim : False → p) y)
   )
   (fun (x : p) => (Or.inl : p → p ∨ False) x)



theorem impl_true (p : Prop) : p → True ↔ True :=
   Iff.intro
   (fun (_ : p → True) => True.intro)
   (fun (_ : True) => (fun (_ : p) => True.intro))



theorem true_impl (p : Prop) : True → p ↔ p :=
   Iff.intro
   (fun (x : True → p) => x True.intro)
   (fun (x : p) => (fun (_ : True) => x))



theorem impl_false (p : Prop) : p → False ↔ ¬ p :=
   Iff.intro
   (fun (x : p → False) => x)
   (fun (x : ¬ p) => x)



theorem false_impl (p : Prop) : False → p ↔ True :=
   Iff.intro
   (fun (_ : False → p) => True.intro)
   (fun (_ : True) => (fun (g : False) => (False.elim : False → p) g))



theorem axiomatic_rule (p : Prop) : p → p :=
   fun (x : p) => x


theorem trivial_equivalence (p : Prop) : p ↔ p :=
   Iff.intro
   (axiomatic_rule p)
   (axiomatic_rule p)


theorem conj_idemp (p : Prop) : p ↔ p ∧ p :=
   Iff.intro
   (fun (x : p) => And.intro x x)
   (fun (x : p ∧ p) => And.left x)



theorem disj_idemp (p : Prop) : p ↔ p ∨ p :=
   Iff.intro
   (fun (x : p) => (Or.inl : p → p ∨ p) x)
   (fun (x : p ∨ p) => Or.elim x
                        (fun (g : p) => g)
                        (fun (g : p) => g)
   )




theorem conj_comm (p q : Prop) : (p ∧ q) ↔ (q ∧ p) :=
   Iff.intro
   (fun (x : p ∧ q) => And.intro (And.right x) (And.left x))
   (fun (x : q ∧ p) => And.intro (And.right x) (And.left x))


theorem disj_comm (p q : Prop) : (p ∨ q) ↔ (q ∨ p) :=
   Iff.intro
   (fun (x : p ∨ q) => Or.elim x
                       (fun (g : p) => (Or.inr : p → q ∨ p) g)
                       (fun (g : q) => (Or.inl : q → q ∨ p) g)
   )
   (fun (x : q ∨ p) => Or.elim x
                       (fun (g : q) => (Or.inr : q → p ∨ q) g)
                       (fun (g : p) => (Or.inl : p → p ∨ q) g)
   )


theorem impl_comm (p q : Prop) : (p ↔ q) ↔ (q ↔ p) :=
   Iff.intro
   (fun (x : p ↔ q) => Iff.intro (Iff.mpr x) (Iff.mp x))
   (fun (x : q ↔ p) => Iff.intro (Iff.mpr x) (Iff.mp x))



theorem conj_assoc (p q r : Prop) : (p ∧ q) ∧ r ↔ p ∧ (q ∧ r) :=
   Iff.intro
   (fun (x : (p ∧ q) ∧ r) =>
      And.intro
      (And.left (And.left x))
      (And.intro
         (And.right (And.left x))
         (And.right x)
      )
   )

   (fun (x : p ∧ (q ∧ r)) =>
      And.intro
      (And.intro
      (And.left x)
      (And.left (And.right x))
      )
      (And.right (And.right x))
   )




theorem disj_assoc (p q r : Prop) : (p ∨ q) ∨ r ↔ p ∨ (q ∨ r) :=
   Iff.intro
   (fun (x : (p ∨ q) ∨ r) => Or.elim x
                             (fun (g : (p ∨ q)) => Or.elim g
                                                   (fun (h : p) => (Or.inl : p → p ∨ (q ∨ r)) h)

                                                   (fun (h : q) =>
                                                      (Or.inr : q ∨ r → (p ∨ (q ∨ r)))
                                                      ((Or.inl : q → (q ∨ r)) h)
                                                   )
                             )
                             (fun (g : r) =>
                                 (Or.inr : q ∨ r → p ∨ (q ∨ r))
                                 ((Or.inr : r → q ∨ r) g)
                             )
   )
   (fun (x : p ∨ (q ∨ r)) => Or.elim x
                             (fun (g : p) => (Or.inl : (p ∨ q → (p ∨ q) ∨ r)) ((Or.inl : p → (p ∨ q)) g))

                             (fun (g : (q ∨ r)) => Or.elim g
                                                   (fun (h : q) =>
                                                      (Or.inl : p ∨ q → ((p ∨ q) ∨ r))
                                                      ((Or.inr : q → p ∨ q) h))

                                                   (fun (h : r) =>
                                                      (Or.inr : r → (p ∨ q) ∨ r) h
                                                   )
                             )
   )



theorem conj_disj_distrib (p q r : Prop) : p ∧ (q ∨ r) ↔ (p ∧ q) ∨ (p ∧ r) :=
   Iff.intro
   (fun (x : p ∧ (q ∨ r)) => Or.elim (And.right x)
                             (fun (h : q) => (Or.inl : (p ∧ q) → (p ∧ q) ∨ (p ∧ r)) (And.intro (And.left x) h))
                             (fun (h : r) => (Or.inr : (p ∧ r) → (p ∧ q) ∨ (p ∧ r)) (And.intro (And.left x) h))

   )
   (fun (x : (p ∧ q) ∨ (p ∧ r)) => Or.elim x
                                    (fun (h : p ∧ q) => And.intro (And.left h) ((Or.inl : q → q ∨ r) (And.right h)))
                                    (fun (h : p ∧ r) => And.intro (And.left h) ((Or.inr : r → q ∨ r) (And.right h)))
   )



theorem disj_conj_distrib (p q r : Prop) : p ∨ (q ∧ r) ↔ (p ∨ q) ∧ (p ∨ r) :=
   Iff.intro
   (fun (x : p ∨ (q ∧ r)) => Or.elim x
                             (fun (h : p) => And.intro
                                             ((Or.inl : p → p ∨ q) h)
                                             ((Or.inl : p → p ∨ r) h))
                             (fun (h : q ∧ r) => And.intro
                                                ((Or.inr : q → p ∨ q) (And.left h))
                                                ((Or.inr : r → p ∨ r) (And.right h)))
   )
   (fun (x : (p ∨ q) ∧ (p ∨ r)) => Or.elim (And.left x)
                                   (fun (h : p) => (Or.inl : p → p ∨ (q ∧ r)) h)
                                   (fun (h : q) => Or.elim (And.right x)
                                                   (fun (g : p) => (Or.inl : p → p ∨ (q ∧ r)) g)
                                                   (fun (g : r) => (Or.inr : (q ∧ r) → p ∨ (q ∧ r))
                                                                   (And.intro h g))
                                   )

   )




theorem morgan_disj (p q : Prop) :  ¬(p ∨ q) ↔ ¬p ∧ ¬q :=
   Iff.intro
   (fun (x : ¬(p ∨ q)) => And.intro (fun (h : p) => x ((Or.inl : p → p ∨ q) h))
                                    (fun (h : q) => x ((Or.inr : q → p ∨ q) h))
   )
   (fun (x : ¬p ∧ ¬q) => (fun (h : p ∨ q) => Or.elim h
                                             (fun (g : p) => (And.left x) g)
                                             (fun (g : q) => (And.right x) g)
   ))


theorem morgan_conj_mpr (p q : Prop) : ¬p ∨ ¬q → ¬(p ∧ q) :=
   fun (x : ¬p ∨ ¬q) => (fun (g : p ∧ q) => Or.elim x
                                             (fun (h : ¬ p) => h (And.left g))
                                             (fun (h : ¬ q) => h (And.right g))
   )


theorem impl_def_mpr (p q : Prop) : (¬p ∨ q) → (p → q) :=
   fun (x : (¬p ∨ q)) => (fun (g : p) => Or.elim x
                                         (fun (h : ¬p) => (False.elim : False → q) (h g))
                                         (fun (h : q) => h)
   )


theorem neg_imp_def_mpr (p q : Prop) : p ∧ ¬q → ¬(p → q) :=
   fun (x : p ∧ ¬q) => (fun (g : p → q) => (And.right x) (g (And.left x)))


theorem neg_to_impl (p q : Prop) : ¬p → (p → q) :=
   fun (x : ¬p) => (fun (g : p) => (False.elim : False → q) (x g))




theorem contraposition_mp (p q : Prop) : (p → q) → (¬q → ¬p) :=
   fun (x : p → q) => (fun (g : ¬q) => (fun (h : p) => g (x h)))



theorem exportation_law (p q r : Prop) : (p → (q → r)) ↔ (p ∧ q → r) :=
   Iff.intro
   (fun (h : (p → (q → r))) => fun (g : p ∧ q) => h (And.left g) (And.right g))
   (fun (h : (p ∧ q → r)) => fun (x : p) => (fun (y : q) => h (And.intro x y)))



theorem cases_impl_left (p q r : Prop) : ((p ∨ q) → r) ↔ (p → r) ∧ (q → r) :=
   Iff.intro
   (fun (h : (p ∨ q) → r) => And.intro
                           (fun (g : p) => h ((Or.inl : p → p ∨ q) g))
                           (fun (g : q) => h ((Or.inr : q → p ∨ q) g))
   )
   (fun (h : (p → r) ∧ (q → r)) => (fun (g : (p ∨ q)) => Or.elim g
                                                         (fun (x : p) => (And.left h) x)
                                                         (fun (x : q) => (And.right h) x)
                                   )
   )


theorem syllogism (p q r : Prop) : (p → q) → (q → r) → (p → r) :=
   fun (h : p → q) => (fun (g : q → r) => (fun (s : p) => g (h s)))


theorem neg_congr (p q : Prop) : (p ↔ q) → (¬p ↔ ¬q) :=
   fun (h : p ↔ q) =>
      Iff.intro
      (fun (g : ¬p) => fun (s : q) => g (Iff.mpr h s))
      (fun (g : ¬q) => fun (s : p) => g (Iff.mp h s))


theorem disj_congr (p q r : Prop) : (p ↔ q) → ((p ∨ r) ↔ (q ∨ r)) :=
   fun (h : (p ↔ q)) => Iff.intro
                        (fun (s : p ∨ r) => Or.elim s
                                            (fun (g : p) => (Or.inl : q → q ∨ r) (Iff.mp h g))
                                            (fun (g : r) => (Or.inr : r → q ∨ r) g)
                        )
                        (fun (s : q ∨ r) => Or.elim s
                                            (fun (g : q) => (Or.inl : p → p ∨ r) (Iff.mpr h g))
                                            (fun (g : r) => (Or.inr : r → p ∨ r) g)

                        )


theorem conj_congr (p q r : Prop) : (p ↔ q) → ((p ∧ r) ↔ (q ∧ r)) :=
   fun (h : p ↔ q) => Iff.intro
                      (fun (g : p ∧ r) => And.intro (Iff.mp h (And.left g)) (And.right g))
                      (fun (g : q ∧ r) => And.intro (Iff.mpr h (And.left g)) (And.right g))



theorem impl_congr_right (p q r : Prop) : (p ↔ q) → ((p → r) ↔ (q → r)) :=
   fun (h : p ↔ q) => Iff.intro
                     (fun (g : p → r) => syllogism q p r (Iff.mpr h) g)
                     (fun (g : q → r) => syllogism p q r (Iff.mp h) g)


theorem impl_congr_left (p q r : Prop) : (p ↔ q) → ((r → p) ↔ (r → q)) :=
   fun (h : p ↔ q) => Iff.intro
                     (fun (g : r → p) => syllogism r p q g (Iff.mp h))
                     (fun (g : r → q) => syllogism r q p g (Iff.mpr h))


theorem iff_congr_ (p q r : Prop) : (p ↔ q) → ((p ↔ r) ↔ (q ↔ r)) :=
   fun (h : (p ↔ q)) => Iff.intro
                        (fun (g : p ↔ r) => Iff.intro
                                            (syllogism q p r (Iff.mpr h) (Iff.mp g))
                                            (syllogism r p q (Iff.mpr g) (Iff.mp h))
                        )
                        (fun (g : q ↔ r) => Iff.intro
                                            (syllogism p q r (Iff.mp h) (Iff.mp g))
                                            (syllogism r q p (Iff.mpr g) (Iff.mpr h))
                        )


theorem iff_conj_intro(p q r : Prop) : (p ↔ q) → (p ↔ r) → (p ↔ (q ∧ r)) :=
   fun (h : p ↔ q) => fun (g : p ↔ r) => Iff.intro
                                       (fun (s : p) => And.intro (Iff.mp h s) (Iff.mp g s))
                                       (fun (s : q ∧ r) => (Iff.mpr h) (And.left s))


theorem iff_transitivity (p q r : Prop) : (p ↔ q) → (q ↔ r) → (p ↔ r) :=
   fun (h : p ↔ q) => fun (g : q ↔ r) => Iff.intro
                                        (syllogism p q r (Iff.mp h) (Iff.mp g))
                                        (syllogism r q p (Iff.mpr g) (Iff.mpr h))


theorem no_contradiction (p : Prop) : ¬ (p ∧ ¬ p) :=
   fun (h : p ∧ ¬ p) => (And.right h) (And.left h)


theorem double_negation_mp (p : Prop) : p → ¬¬ p :=
   fun (h : p) => (fun (g : ¬ p) => g h)


theorem not_equiv_then_not_p (p : Prop) : (p ↔ ¬p) → ¬p :=
   fun (h : p ↔ ¬p) => (fun (g : p) => (Iff.mp h g) g)


theorem negation_not_equiv (p : Prop) : ¬(p ↔ ¬p) :=
   fun (h : p ↔ ¬ p) => (not_equiv_then_not_p p h) (Iff.mpr h (not_equiv_then_not_p p h))


open Classical

theorem double_negation (p : Prop) : p ↔ ¬¬p :=
   Iff.intro
   (double_negation_mp p)
   byContradiction


theorem tnd (p : Prop) : p ∨ ¬ p :=
   byContradiction (
      fun (h : ¬ (p ∨ ¬ p)) =>
        (And.right ((Iff.mp (morgan_disj p ¬ p)) h))
        (And.left ((Iff.mp (morgan_disj p ¬ p)) h))
   )

theorem cases_analysis (p q : Prop) : (p → q) → (¬p → q) → q :=
   Or.elim (tnd p)

theorem cases_impl_right (p q r : Prop) : (p → q ∨ r) → ((p → q) ∨ (p → r)) :=
   fun (h : (p → q ∨ r)) =>
      Or.elim (tnd p)
      (fun (g : p) => Or.elim (h g)
                      (fun (s : q) => (Or.inl : (p → q) → ((p → q) ∨ (p → r))) (fun (x : p) => s))
                      (fun (s : r) => (Or.inr : (p → r) → ((p → q) ∨ (p → r))) (fun (x : p) => s))
      )
      (fun (g : ¬p) => (Or.inl : (p → q) → ((p → q) ∨ (p → r))) (neg_to_impl p q g))


theorem Morgan_disj (p q : Prop) : ¬ (p ∧ q) ↔ ¬p ∨ ¬q :=
   Iff.intro
   (
      fun (h : ¬ (p ∧ q)) => cases_analysis p (¬p ∨ ¬q)
                             (
                              fun (g : p) =>
                                 cases_analysis q (¬p ∨ ¬q)
                                 (fun (s : q) => (False.elim : False → (¬p ∨ ¬q)) (h (And.intro g s)))
                                 (Or.inr : ¬ q → ¬ p ∨ ¬q)
                             )
                             (Or.inl : ¬ p → ¬ p ∨ ¬q)
   )
   (morgan_conj_mpr p q)



theorem neg_imp_def (p q : Prop) :  ¬ (p → q) ↔ p ∧ ¬ q :=
   Iff.intro
   (fun (h : ¬ (p → q)) =>
      Or.elim (tnd p)
      (fun (s : p) =>
         Or.elim (tnd q)
         (fun (t : q) => (False.elim : False → p ∧ ¬ q) (h (fun (r : p) => t)))
         (fun (t : ¬q) => And.intro s t)

      )
      (fun (s : ¬ p) => (False.elim : False → p ∧ ¬ q) (h (neg_to_impl p q s)))
   )
   (neg_imp_def_mpr p q)


theorem imp_def (p q : Prop) : (p → q) ↔ (¬p ∨ q) :=
   Iff.intro
   (fun (h : p → q) => Or.elim (tnd p)
                       (fun (s : p) => (Or.inr : q → ¬ p ∨ q) (h s))
                       (Or.inl : ¬ p → ¬p ∨ q)
   )
   (impl_def_mpr p q)

theorem contraposition (p q : Prop) : (p → q) ↔ (¬q → ¬p) :=
   Iff.intro
   (contraposition_mp p q)
   (fun (h : ¬q → ¬ p) => (fun (s : p) => Or.elim (tnd q)
                                          (axiomatic_rule q)
                                          (fun (r : ¬q) => (False.elim : False → q) (h r s))

                          )
   )


theorem peirce (p q : Prop) : (((p → q) → p) → p) :=
   fun (h : (p → q) → p) =>
      Or.elim (tnd p)
      (axiomatic_rule p)
      (fun (s : ¬p) => h (neg_to_impl p q s))
