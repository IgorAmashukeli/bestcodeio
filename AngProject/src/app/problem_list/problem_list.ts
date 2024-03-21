export type Problem = {
  id: number;
  title: string;
  difficulty: string;
  video_id: string;
  accepted: number;
  submitted: number;
  description_text: string;
  examples: Array<string>;
  constraints: Array<string>;
  note: string;
  languages: Array<Array<string>>;
  initial_codes: any;
  initial_language: string;
};

export const math_problems: Array<Array<Problem>> = [
  [
    {
      id: 0,
      title: 'Propositional tautologies',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'This is task to prove, using <b>LEAN 4</b> language. <br> Proofs should be done, using <b>tactics</b>. <br> In each math problem you will be given a list of permitted/forbiden tactis. <br> To proof each theorem, remove <b>"admit"</b> and replace it with <b>proof tree of tactics</b>.<br> To make it simplier, use curly brackets, when need to prove multiple cases.<br><br> <br> Proof the following propositional tautologies. <br> Suppose, <b>p</b>, <b>q</b> and <b>r</b> - propositional variables. <br><br>- commutativity of conjuction: <b>p ∧ q ↔ q ∧ p</b><br>- commutativity of disjunction: <b>p ∨ q ↔ q ∨ p</b><br><br>- associativity of conjunction: <b>(p ∧ q) ∧ r ↔ p ∧ (q ∧ r)</b><br>- associativity of disjunction: <b>(p ∨ q) ∨ r ↔ p ∨ (q ∨ r)</b><br><br>- distributivity of conjunction over disjunction:<b> p ∧ (q ∨ r) ↔ (p ∧ q) ∨ (p ∧ r)</b><br> - distributivity of disjunction over conjunction: <b>p ∧ (q ∨ r) ↔ (p ∧ q) ∨ (p ∧ r)</b>',
      examples: [],
      constraints: [],
      note: '<br> Note that in this task you are allowed to use only the following tactics: <br><br>- <i>Hypothesis renaming: </i> <b>rename_i</b> <br>- <i>Hypothesis selection</i>: <b>exact h</b>, where h is the current hypothesis and <b>assumption</b><br><br>- ∧ <i>introduction</i>: <b>apply And.intro</b><br>- ∧ <i>elimination</i>: <b>cases h with | intro h₁ h₂ =></b>, where h is then current hypothesis and h₁, h₂ are new hypothesis names<br><br>- ∨ <i>introduction left</i>: <b>apply Or.inl</b><br> - ∨ <i>introduction right</i>: <b>apply Or.inr</b><br> - ∨ <i>elimination</i>: <b>cases h {} {}</b>, where h is the current hypothesis<br><br>- → <i>introduction:</i> <b>intro h</b>, where h is a new hypothesis name<br>- → <i>elimination: </i> <b>apply h</b>, where h is such current hypothesis that has type <b>g → goal</b> for some proposition <b>g</b> <br><br>- ¬ <i>introduction</i> - <b>intro h</b>, where h is a new hypothesis<br> - ¬ <i>elimination: </i> <b> apply byContradiction</b>* <br> Also remember that <b>¬ p</b> is <b>p → False</b> and you may want to use → rules.<br><br> You are allowed to <b>apply</b> any theorem, proved upper. <br> You are also allowed to create your own helper theorems and prove them, using aforesaid tactics or previously proved (including your another own helper) theorems. <br><br> *Note that you are allowed to use <b>apply byContradiction</b> only for the theorems below <i>open Classical</i> statement. <br> <br> For reference, see this documentation: <a href="https://leanprover.github.io/theorem_proving_in_lean4/title_page.html">LEAN 4 proving</a>',
      languages: [['LEAN', 'lean']],
      initial_codes: {
        lean: '--your proof goes here\n\nvariable (p q r : Prop)\n\ntheorem and_comm : p ∧ q ↔ q ∧ p := by\n\tadmit\n\ntheorem or_comm : p ∨ q ↔ q ∨ p := by\n\tadmit\n\ntheorem and_assoc : (p ∧ q) ∧ r ↔ p ∧ (q ∧ r) := by\n\tadmit\n\ntheorem or_assoc : (p ∨ q) ∨ r ↔ p ∨ (q ∨ r) := by\n\tadmit\n\ntheorem and_or_distributivity : p ∧ (q ∨ r) ↔ (p ∧ q) ∨ (p ∧ r) := by\n\tadmit\n\ntheorem or_and_distributivity : p ∨ (q ∧ r) ↔ (p ∨ q) ∧ (p ∨ r) := by\n\tadmit\n\ntheorem curry_prop : (p → (q → r)) ↔ (p ∧ q → r) := by\n\tadmit\n\ntheorem cases_equiv : ((p ∨ q) → r) ↔ (p → r) ∧ (q → r) := by\n\tadmit\n\ntheorem MorganOr :  ¬(p ∨ q) ↔ ¬p ∧ ¬q := by\n\tadmit\n\ntheorem MorganAnd_mpr: ¬p ∨ ¬q → ¬(p ∧ q) := by\n\tadmit\n\ntheorem no_contradiction : ¬(p ∧ ¬p) := by\n\tadmit\n\ntheorem no_implication_mpr : p ∧ ¬q → ¬(p → q) := by\n\tadmit\n\ntheorem false_implication : ¬p → (p → q) := by\n\tadmit\n\ntheorem implication_or_not_def_mpr: (¬p ∨ q) → (p → q) := by\n\tadmit\n\ntheorem false_disjunction : p ∨ False ↔ p := by\n\tadmit\n\ntheorem false_conjunction : p ∧ False ↔ False := by\n\tadmit\n\ntheorem truth_conjunction : p ∧ True ↔ p := by\n\tadmit\n\ntheorem truth_disjunction : p ∨ True ↔ True := by\n\tadmit\n\ntheorem contraposition_mp : (p → q) → (¬q → ¬p) := by\n\tadmit\n\ntheorem and_reflexivity : p ∧ p ↔ p := by\n\tadmit\n\ntheorem or_reflexivity : p ∨ p ↔ p := by\n\tadmit\n\ntheorem add_or_term : (p ↔ q) -> ((p ∨ r) ↔ (q ∨ r)) := by\n\tadmit\n\ntheorem add_and_term : (p ↔ q) -> ((p ∧ r) ↔ (q ∧ r)) := by\n\tadmit\n\ntheorem add_impl_term_left : (p ↔ q) → ((p → r) ↔ (q → r)) := by\n\tadmit\n\ntheorem add_impl_term_right : (p ↔ q) → ((r → p) ↔ (r → q)) := by\n\tadmit\n\ntheorem add_iff_term : (p ↔ q) → ((p ↔ r) ↔ (q ↔ r)) := by\n\tadmit\n\ntheorem iff_equiv : (p ↔ q) ↔ (q ↔ p) := by\n\tadmit\n\ntheorem iff_reflexivity : p ↔ p := by\n\tadmit\n\ntheorem iff_symetry{p q : Prop} : (p ↔ q) → (q ↔ p) := by\n\tadmit\n\ntheorem iff_transitivity {p q r : Prop} : (p ↔ q) -> (q ↔ r) → (p ↔ r) := by\n\tadmit\n\ntheorem iff_and_distributivity{p q r : Prop} : (p ↔ q) → (p ↔ r) → (p ↔ (q ∧ r)) := by\n\tadmit\n\ntheorem negation_not_equiv : ¬(p ↔ ¬p) := by\n\tadmit\n\nopen Classical\n\ntheorem contradiction_by {p : Prop} (hnnp : ¬¬p) : p := by\n\tadmit\n\ntheorem cases_by (fst_cs : p → q) (sn_cs : ¬ p → q) : q := by\n\tadmit\n\ntheorem impl_or_distributivity_mp : (p → q ∨ r) → ((p → q) ∨ (p → r)) := by\n\tadmit\n\ntheorem MorganAnd_mp : ¬(p ∧ q) → ¬p ∨ ¬q := by\n\tadmit\n\ntheorem Morgan_And : ¬ (p ∧ q) ↔ ¬p ∨ ¬q := by\n\tadmit\n\ntheorem no_implication_mp : ¬(p → q) → p ∧ ¬q := by\n\tadmit\n\ntheorem no_implication : ¬ (p → q) ↔ p ∧ ¬ q := by\n\tadmit\n\ntheorem implication_or_not_def_mp : (p → q) → (¬p ∨ q) := by\n\tadmit\n\ntheorem implication_or_not : (p → q) ↔ (¬p ∨ q) := by\n\tadmit\n\ntheorem contraposition_mpr : (¬q → ¬p) → (p → q) := by\n\tadmit\n\ntheorem contraposition : (p → q) ↔ (¬q → ¬p) := by\n\tadmit\n\ntheorem peirce : (((p → q) → p) → p) := by\n\tadmit\n\n',
      },
      initial_language: 'lean',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
];

export const programming_problems: Array<Array<Problem>> = [
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
  [
    {
      id: 0,
      title: 'Problem1',
      difficulty: 'Easy',
      video_id: 'y3svPgyGnLc',
      accepted: 0,
      submitted: 0,
      description_text:
        'Given two integers: <b><b>n</b></b> and <b>k</b>, return the string encoding of the leetcode clone with <b><b>n</b></b> problems and <b>k</b> users.<br><br>You may assume that each input would have exactly one solution.<br><br>You need to return the the string encoding in the correct format.',
      examples: [
        "\t<b><b>Input</b></b>: n = 1, k = 2<br>\t<b><b>Output</b></b>: BestCode<br>\t<b><b>Explanation</b></b>: I am the creator and I don't want to explain anything.",
        '\t<b><b>Input</b></b>: n = 2, k = 2<br>\t<b><b>Output</b></b>: WorstCode<br>',
        '\t<b><b>Input</b></b>: n = 3, k = 3<br>\t<b><b>Output</b></b>: BestCode<br>',
      ],
      constraints: ['1 <= n <= 3', '2 <= k <= 4'],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: [
        ['C++', 'cpp'],
        ['Python', 'python'],
        ['JavaScript', 'javascript'],
        ['Java', 'java'],
      ],
      initial_codes: {
        cpp: '//your code here\n#include <iostream>\n\nint main() {\n    std::cout << "BestCode" << std::endl;\n    return 0;\n}',
        python: '#your code here:\nprint("BestCode")',
        javascript: '//your code here\nconsole.log("BestCode");',
        java: '//your code here\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("BestCode");\n    }\n}',
      },
      initial_language: 'cpp',
    },
  ],
];
