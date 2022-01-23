import sys
from typing import BinaryIO, List, TextIO, Tuple


def convert_file(stream_in: TextIO, stream_out: BinaryIO) -> Tuple[int, int]:
    counter_in: int = 0
    counter_out: int = 0
    for line in stream_in:
        usable_part: str = line.split(";")[0].strip()
        if len(usable_part) == 0:
            continue
        print(usable_part)
        words = usable_part.split(" ")
        output: bytes = bytes([
            int(word, 16)
            for word in words
        ])
        stream_out.write(output)
        counter_in += len(line)
        counter_out += len(output)
    return counter_in, counter_out


def main(args: List[str]) -> None:
    if len(args) < 1:
        raise TypeError("Please provide an input file name")
    file_name_in: str = args[0]
    if len(args) < 2:
        raise TypeError("Please provide an output file name") 
    file_name_out: str = args[1]
    counter_in: int
    counter_out: int
    with open(file_name_in, "r") as file_in:
        with open(file_name_out, "wb+") as file_out:
            counter_in, counter_out = convert_file(file_in, file_out)
    print(f"Read {counter_in} hex values")
    print(f"Wrote {counter_out} bytes")


if __name__ == "__main__":
    main(sys.argv[1:])

