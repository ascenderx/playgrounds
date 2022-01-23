#include <stdio.h> // printf
#include <stdbool.h> // true
#include <stdlib.h> // malloc

struct Node {
  struct Node* next;
};

int main() {
  printf("Goodbye memory...\n");
  struct Node* node = (struct Node*)malloc(sizeof(struct Node));
  
  while (true) {
    node->next = (struct Node*)malloc(sizeof(struct Node));
    node = node->next;
  }

  return 0;
}

