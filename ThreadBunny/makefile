.PHONY: clean

CFLAGS = -O3 -Wall -Wextra
LFLAGS = -lpthread
BIN = bunny
SRC = bunny.c

$(BIN): $(SRC)
	$(CC) -o $@ $^ $(CFLAGS) $(LFLAGS)

clean:
	rm -rf $(BIN) 

