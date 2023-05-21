<?php
// Define the path to the JSON file
$dataFile = 'data.json';

// Endpoint to receive user data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read the incoming JSON data
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate the data
    if (isset($data['name']) && isset($data['isStudying'])) {
        // Load the existing user data from the JSON file
        $userData = loadUserData();

        // Add the new user to the data
        $userData[] = $data;

        // Save the updated user data to the JSON file
        saveUserData($userData);

        // Respond with a success message
        http_response_code(200);
        echo json_encode(['message' => 'User data saved successfully.']);
        exit();
    }
}

// Helper function to load user data from the JSON file
function loadUserData()
{
    global $dataFile;
    if (file_exists($dataFile)) {
        $data = file_get_contents($dataFile);
        return json_decode($data, true);
    }
    return [];
}

// Helper function to save user data to the JSON file
function saveUserData($userData)
{
    global $dataFile;
    $data = json_encode($userData, JSON_PRETTY_PRINT);
    file_put_contents($dataFile, $data);
}

// Endpoint to fetch the user data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Load the user data from the JSON file
    $userData = loadUserData();

    // Respond with the user data
    http_response_code(200);
    echo json_encode($userData);
    exit();
}
