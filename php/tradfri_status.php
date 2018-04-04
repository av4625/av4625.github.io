<?php
// Create array
$json_array = [];

$light_ids =
[
    'kitchen' => '65548',
    'living_room' => '65553',
    'bedroom' => '65570',
    'bedroom_lamp' => '65561'
];

// Loop through id's and get the status of each light
foreach ($light_ids as $light => $id)
{
    $output = `coap-client -m get -u "google" -k "dsqtsiIgba2IaccE" "coaps://192.168.0.105:5684/15001/$id" | tail -n 1`;
    $output = trim(preg_replace('/\s+/', ' ', $output));

    $json_array[$light] = json_decode($output);
}

echo(json_encode($json_array));
?>
