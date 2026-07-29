#include <iostream>
#include <fstream> // Needed to write to a file

using namespace std;

// We use an ofstream object to write to a file instead of just printing to the console
ofstream logFile;

void log_json(string type, string var_name, string value, bool is_last = false) {
    logFile << "  { \"type\": \"" << type 
            << "\", \"var_name\": \"" << var_name 
            << "\", \"value\": \"" << value << "\" }";
    
    if (!is_last) {
        logFile << ",\n"; // Add a comma if it's not the final event
    } else {
        logFile << "\n";
    }
}

int main() {
    // Open a file named log.json
    logFile.open("log.json");
    logFile << "[\n"; // Start the JSON array

    log_json("program_started", "", "");

    int a = 5;
    log_json("variable_created", "a", "5");

    int b = 10;
    log_json("variable_created", "b", "10");

    // Swap logic
    int temp = a;
    a = b;
    b = temp;
    log_json("variable_updated", "a", "10");
    log_json("variable_updated", "b", "5");

    log_json("program_finished", "", "", true); // True means last item
    logFile << "]"; // Close the JSON array

    logFile.close();
    cout << "log.json file generated successfully!" << endl;
    return 0;
}