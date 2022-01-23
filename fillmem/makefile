.PHONY: clean

CFLAGS = -O3 -Wall -Wextra
BIN = fillmem
SRC = fillmem.c

$(BIN): $(SRC)
	$(CC) -o $@ $^ $(CFLAGS)

clean:
	rm -rf $(BIN) 

