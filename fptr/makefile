.PHONY: clean

CFLAGS = -O3 -Wall -Wextra
BIN = fptr
SRC = fptr.c

$(BIN): $(SRC)
	$(CC) -o $@ $^ $(CFLAGS)

clean:
	rm -rf $(BIN) 

