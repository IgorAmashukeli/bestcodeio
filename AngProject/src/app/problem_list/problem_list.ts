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
  languages: Array<string>;
};

export const math_problems: Array<Array<Problem>> = [
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
    },
    {
      id: 1,
      title: 'Problem2',
      difficulty: 'Medium',
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
      constraints: [],
      note: '<b><b>Follow up</b></b>: Can you do it in <b>O(0)</b>?',
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
    },
    {
      id: 2,
      title: 'Problem3',
      difficulty: 'Hard',
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
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
      languages: ['C++', 'Python', 'JavaScript', 'Java', 'C#'],
    },
  ],
];
