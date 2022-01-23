#include <exception> // std::exception
#include <fstream> // std::ifstream, std::ofstream
#include <iostream> // std::cerr, std::cout
#include <sstream> // std::istringstream
#include <string> // std::string

int main(int argc, char** argv) {
  if (argc < 2) {
    std::cerr << "Please provide an input file name" << std::endl;
    return EXIT_FAILURE;
  } else if (argc < 3) {
    std::cerr << "Please provide an output file name" << std::endl;
    return EXIT_FAILURE;
  }

  std::ifstream fileIn(argv[1]);
  std::ofstream fileOut(argv[2]);
  try {
    std::string lineIn;
    while (std::getline(fileIn, lineIn)) {
      std::istringstream s;
    }
  } catch (std::exception& e) {
    std::cerr << e.what() << std::endl;
    return EXIT_FAILURE;
  }

  return EXIT_SUCCESS; 
}

