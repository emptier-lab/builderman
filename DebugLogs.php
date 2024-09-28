<?php
// Read the incoming JSON data
$data = file_get_contents('php://input');

// Decode the JSON data
$gameData = json_decode($data, true);

// Save the game data (e.g., in a file or database)
file_put_contents('gameLogs.json', json_encode($gameData, JSON_PRETTY_PRINT) . PHP_EOL, FILE_APPEND);

// Return a success response
http_response_code(200);
echo json_encode(['status' => 'success']);
?>
