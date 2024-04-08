#include <iostream>

int summa(int i, int j) { return i + j + 1; }

int main() {
  int test_case_num = 0;
  for (int i = 0; i < 100; ++i) {
    for (int j = 0; j < 100; ++j) {
      int correct_result = i + j;
      int result = summa(i, j);
      if (result != i + j) {
        std::cout << test_case_num << "\n";
        std::cout << i << " " << j << "\n";
        std::cout << result << "\n";
        std::cout << correct_result << "\n";
        return 0;
      }
      test_case_num++;
    }
  }
  return 0;
}
