<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read the incoming JSON data
    $data = file_get_contents('php://input');
    $gameData = json_decode($data, true);

    // Append the new game data to gameLogs.json
    $currentData = file_exists('gameLogs.json') ? json_decode(file_get_contents('gameLogs.json'), true) : [];
    $currentData[] = $gameData;

    // Save the updated data back to the file
    file_put_contents('gameLogs.json', json_encode($currentData, JSON_PRETTY_PRINT));

    http_response_code(200);
    echo json_encode(['status' => 'success']);
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
}
?>
