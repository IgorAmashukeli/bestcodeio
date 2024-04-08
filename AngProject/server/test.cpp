#include <iostream>

int summa(int n, int k) {
 return n + k; 
}

int main() {
  if (summa(1, 2) != 3) {
    std::cout << "WA!\n";
return 0;
  } else if (summa(2, 2) != 4) {
    std::cout << "WA!\n"; return 0;
  } else if (summa(3, 3) != 6) {
    std::cout << "WA!\n"; return 0;
  } else {
    std::cout << "OK!\n";
  }
}