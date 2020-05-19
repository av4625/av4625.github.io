// Initialize Firebase
var config = {
    apiKey: "AIzaSyDyjwcOJ0TePhze4N9G7WdKiAQ5iOSebZw",
    authDomain: "house-temperature-c66ca.firebaseapp.com",
    databaseURL: "https://house-temperature-c66ca.firebaseio.com",
    projectId: "house-temperature-c66ca",
    storageBucket: "house-temperature-c66ca.appspot.com",
    messagingSenderId: "847481592400"
};

$(document).ready(function()
{
    listeners();
});

firebase.initializeApp(config);

var database = firebase.database().ref();

// Activate listeners to listen to firebase
function listeners()
{
    // Current main bedroom temperature listener
    var current_main_bedroom_ref = database.child('main_bedroom/current');
    current_main_bedroom_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_inside_temperature('main_bedroom', snapshot.val());
        }
    });

    // Current kitchen temperature listener
    var current_kitchen_ref = database.child('kitchen/current');
    current_kitchen_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_inside_temperature('kitchen', snapshot.val());
        }
    });

    // Current spare bedroom temperature listener
    var current_spare_bedroom_ref = database.child('spare_bedroom/current');
    current_spare_bedroom_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_inside_temperature('spare_bedroom', snapshot.val());
        }
    });

    // Current hot press temperature listener
    var current_hot_press_ref = database.child('hot_press/current');
    current_hot_press_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_inside_temperature('hot_press', snapshot.val());
        }
    });

    // Current dressing room temperature listener
    var current_dressing_room_ref = database.child('dressing_room/current');
    current_dressing_room_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_inside_temperature('dressing_room', snapshot.val());
        }
    });

    // Current dining room temperature listener
    var current_dining_room_ref = database.child('dining_room/current');
    current_dining_room_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_inside_temperature('dining_room', snapshot.val());
        }
    });

    // Current living room temperature listener
    var current_living_room_ref = database.child('living_room/current');
    current_living_room_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_inside_temperature('living_room', snapshot.val());
        }
    });

    // Current garden room temperature listener
    var current_garden_room_ref = database.child('garden_room/current');
    current_garden_room_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_inside_temperature('garden_room', snapshot.val());
        }
    });

    // Current outside temperature listener
    var current_outside_ref = database.child('outside/current');
    current_outside_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_outside_information(snapshot.val());
        }
    });

    // Kicthen light listener
    var kitchen_light_ref = database.child('kitchen/kitchen_light');
    kitchen_light_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_light('kitchen_light', snapshot.val());
        }
    });

    // Living room light listener
    var living_room_light_ref = database.child('kitchen/living_room_light');
    living_room_light_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_light('living_room_light', snapshot.val());
        }
    });

    // Bedroom light listener
    var bedroom_light_ref = database.child('bedroom/bedroom_light');
    bedroom_light_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_light('bedroom_light', snapshot.val());
        }
    });

    // Bedoom lamp listener
    var bedroom_lamp_ref = database.child('bedroom/bedroom_lamp');
    bedroom_lamp_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_light('bedroom_lamp', snapshot.val());
        }
    });

    // Spare bedoom light listener
    var spare_bedroom_light_ref = database.child('spare_bedroom/spare_bedroom_light');
    spare_bedroom_light_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_light('spare_bedroom_light', snapshot.val());
        }
    });
}
