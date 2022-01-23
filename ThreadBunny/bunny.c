#include <pthread.h> // pthread_create
#include <stdbool.h> // true
#include <stdlib.h> // malloc

void* noOperation(void* dummy) {
  while (true) {
    pthread_t* thread = (pthread_t*)malloc(sizeof(pthread_t));
    pthread_create(thread, NULL, noOperation, dummy);
  }
}

int main() {
  noOperation(NULL);
  return 0;
}

