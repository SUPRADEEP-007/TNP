<?php
// WeatherAPI configuration
$apiKey = "905eef423f67499ba2643607241306";
$baseUrl = "https://api.weatherapi.com/v1/current.json";
$location = "Pondicherry";

// Construct the API URL
$url = "{$baseUrl}?key={$apiKey}&q={$location}";

// Initialize cURL session
$curl = curl_init();

// Set cURL options
curl_setopt_array($curl, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
));

// Execute cURL request
$response = curl_exec($curl);

// Check for errors
if ($response === false) {
    $error = curl_error($curl);
    echo json_encode(array("error" => "Failed to fetch weather data: {$error}"));
    exit;
}

// Close cURL session
curl_close($curl);

// Decode JSON response
$data = json_decode($response, true);

// Check if data is valid
if (!$data) {
    echo json_encode(array("error" => "Invalid weather data received"));
    exit;
}

// Extract relevant data
$temperatureCelsius = $data['current']['temp_c'];
$conditionText = $data['current']['condition']['text'];

// Prepare response as JSON
$responseData = array(
    "temperature" => $temperatureCelsius,
    "condition" => $conditionText,
);

// Send JSON response
header("Content-Type: application/json");
echo json_encode($responseData);
?>
