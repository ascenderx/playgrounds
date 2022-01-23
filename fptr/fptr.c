#include <stdint.h> // uint8_t
#include <stdio.h> // printf
#include <stdlib.h> // atoi

#define NUM_FUNCTIONS 4

void func1(uint8_t* const value) {
  *value += 2;
}

void func2(uint8_t* const value) {
  *value /= 2;
}

void func3(uint8_t* const value) {
  *value *= 2;
}

void func4(uint8_t* const value) {
  *value -= 2;
}

#define EXIT_SUCCESS 0

int main() {
  void (*functions[NUM_FUNCTIONS]) (uint8_t* const) = {func1, func2, func3, func4};
  const uint8_t original = 25;
  for (uint8_t f = 0; f < NUM_FUNCTIONS; f++) {
    uint8_t value = original;
    void (*function)(uint8_t* const) = functions[f];
    function(&value);
    printf("%u is now %u\n", original, value);
  }

  return EXIT_SUCCESS;
}

