.PHONY: clean

CFLAGS = -Wall -Wextra

hex2bin: bin/hex2bin
bin/hex2bin: src/hex2bin.cc
	$(CXX) -o $@ $^ $(CFLAGS)

clean:
	mkdir -p bin
	rm -rf bin/*

