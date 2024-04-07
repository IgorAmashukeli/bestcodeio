#include <iostream>

int main() {
  if (summa(1, 2) != 3) {
    std::cout << "WA!\n";
  } else if (summa(2, 2) != 4) {
    std::cout << "WA!\n";
  } else if (summa(3, 3) != 6) {
    std::cout << "WA!\n";
  } else {
    std::cout << "OK!\n";
  }
}