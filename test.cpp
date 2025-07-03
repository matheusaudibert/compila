#include <iostream>
#include <sstream>
#include <string>

int main() {
    std::string line;
    std::getline(std::cin, line);  // lê a linha inteira

    std::istringstream iss(line);
    int num, sum = 0;

    while (iss >> num) {
        sum += num;
    }

    std::cout << sum << std::endl;
    return 0;
}
