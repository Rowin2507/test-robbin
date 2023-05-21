<?php
// Define the path to the JSON file
$dataFile = 'data.json';

// Endpoint to clear the user list
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Clear the user data by setting an empty array
    saveUserData([]);

    // Respond with a success message
    http_response_code(200);
    echo json_encode(['message' => 'User list cleared successfully.']);
    exit();
}

// Helper function to save user data to the JSON file
function saveUserData($userData)
{
    global $dataFile;
    $data = json_encode($userData, JSON_PRETTY_PRINT);
    file_put_contents($dataFile, $data);
}
