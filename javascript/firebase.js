// Initialize Firebase
var config = {
    apiKey: "AIzaSyDyjwcOJ0TePhze4N9G7WdKiAQ5iOSebZw",
    authDomain: "house-temperature-c66ca.firebaseapp.com",
    databaseURL: "https://house-temperature-c66ca.firebaseio.com",
    projectId: "house-temperature-c66ca",
    storageBucket: "house-temperature-c66ca.appspot.com",
    messagingSenderId: "847481592400"
};

document.addEventListener('DOMContentLoaded', function(){ 
    listeners();
}, false);

firebase.initializeApp(config);

var database = firebase.database();

function get_week_number(key)
{
    return parseInt(key.substring(5, key.length));
}

// Set the average temperature, and listen for a new week
function set_average_temperature(room, data)
{
    var current_key = Object.keys(data)[0];

    // If the current week is week_1 set the data
    if (current_key === 'week_1')
    {
        // Set week one data
        weekly_average_room_temperatures[room] = parseFloat(data[current_key]['total_temperature']) / parseFloat(data[current_key]['entries']);
        set_weekly_averages();
    }
    // Else, Get data from previous week and set the average data
    else
    {
        // Get data for the week before current (Unless week is 1)
        var week_before_ref = database.ref(room + '/weeks/week_' + (get_week_number(current_key) - 1));
        week_before_ref.once('value').then(function(snapshot)
        {
            // Set average for previous week
            var data = snapshot.val();
            weekly_average_room_temperatures[room] = parseFloat(data['total_temperature']) / parseFloat(data['entries']);
            set_weekly_averages();
        });
    }

    // Create a listener for the week after the current week
        // Call this function again with week afters snapshot
    var week_after_ref = database.ref(room + '/weeks/week_' + (get_week_number(current_key) + 1));
    week_after_ref.on('value', function(snapshot)
    {
        if (snapshot.val() != null)
        {
            week_after_ref.off();
            listen_for_new_week(room, snapshot.val()['week_number']);
        }
    });
}

// Activate listeners to listen to firebase
function listeners()
{
    database.ref('bedroom/current').on('value', function(snapshot)
    {
        set_temperature('bedroom', snapshot.val());
    });

    database.ref('kitchen/current').on('value', function(snapshot)
    {
        set_temperature('kitchen', snapshot.val());
    });

    database.ref('spare_bedroom/current').on('value', function(snapshot)
    {
        set_temperature('spare_bedroom', snapshot.val());
    });

    database.ref('study/current').on('value', function(snapshot)
    {
        set_temperature('study', snapshot.val());
    });

    database.ref('bedroom/weeks').orderByKey().limitToLast(1).once('value').then(function(snapshot)
    {
        set_average_temperature('bedroom', snapshot.val());
    });

    database.ref('kitchen/weeks').orderByKey().limitToLast(1).once('value').then(function(snapshot)
    {
        set_average_temperature('kitchen', snapshot.val());
    });

    database.ref('spare_bedroom/weeks').orderByKey().limitToLast(1).once('value').then(function(snapshot)
    {
        set_average_temperature('spare_bedroom', snapshot.val());
    });

    database.ref('study/weeks').orderByKey().limitToLast(1).once('value').then(function(snapshot)
    {
        set_average_temperature('study', snapshot.val());
    });

    database.ref('kitchen/kitchen_light').on('value', function(snapshot)
    {
        set_light('kitchenLightbulb', snapshot.val());
    });

    database.ref('kitchen/living_room_light').on('value', function(snapshot)
    {
        set_light('living_roomLightbulb', snapshot.val());
    });

    database.ref('bedroom/bedroom_light').on('value', function(snapshot)
    {
        set_light('bedroomLightbulb', snapshot.val());
    });

    database.ref('bedroom/bedroom_lamp').on('value', function(snapshot)
    {
        set_light('bedroom_lampLightbulb', snapshot.val());
    });
}

