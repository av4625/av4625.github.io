<?php
// Get the status of the kitchen light
$kitchen = `coap-client -m get -u "google" -k "dsqtsiIgba2IaccE" "coaps://192.168.0.105:5684/15001/65548" | tail -n 1`;
$kitchen = trim(preg_replace('/\s+/', ' ', $kitchen));

// Get the status of the living room light
$living_room = `coap-client -m get -u "google" -k "dsqtsiIgba2IaccE" "coaps://192.168.0.105:5684/15001/65553" | tail -n 1`;
$living_room = trim(preg_replace('/\s+/', ' ', $living_room));

// Get the status of bedroom light
$bedroom = `coap-client -m get -u "google" -k "dsqtsiIgba2IaccE" "coaps://192.168.0.105:5684/15001/65570" | tail -n 1`;
$bedroom = trim(preg_replace('/\s+/', ' ', $bedroom));

// Get the status of the bedroom lamp
$bedroom_lamp = `coap-client -m get -u "google" -k "dsqtsiIgba2IaccE" "coaps://192.168.0.105:5684/15001/65561" | tail -n 1`;
$bedroom_lamp = trim(preg_replace('/\s+/', ' ', $bedroom_lamp));

$json_array = (object) [
    'kitchen' => json_decode($kitchen),
    'living_room' => json_decode($living_room),
    'bedroom' => json_decode($bedroom),
    'bedroom_lamp' => json_decode($bedroom_lamp)
];

echo(json_encode($json_array));
?>
