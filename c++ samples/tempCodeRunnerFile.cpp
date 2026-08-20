#include <iostream>

#if __has_include(<version>)
    #include <version>
#endif

int main() {
#ifdef __cpp_concepts
    std::cout << "C++20 Concepts are supported! (Version: " << __cpp_concepts << ")\n";
#else
    std::cout << "Not using C++20 (Concepts not found).\n";
#endif
    return 0;
}