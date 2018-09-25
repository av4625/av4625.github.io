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

var database = firebase.database();

function get_week_number(key)
{
    return parseInt(key.substring(5, key.length));
}

function get_average_temperature(days_data)
{
    const keys = Object.keys(days_data);
    var total_temp = 0;
    var total_entries = 0;

    for (var i = 0; i < keys.length; i++)
    {
        if (keys[i] != 'start_date')
        {
            total_temp += parseFloat(days_data[keys[i]].total_temperature);
            total_entries += parseFloat(days_data[keys[i]].entries);
        }
    }

    return total_temp / total_entries;
}

// Set the average temperature, and listen for a new week
function set_average_temperature(room, data)
{
    // Make sure the keys are in the correct order
    const ordered = {};
    Object.keys(data).sort().forEach(function(key)
    {
        ordered[key] = data[key];
    });

    // Set week one data
    weekly_average_room_temperatures[room] = get_average_temperature(ordered[Object.keys(ordered)[0]]);
    set_weekly_averages();
}

// Activate listeners to listen to firebase
function listeners()
{
    var current_bedroom_ref = database.ref('bedroom/current');
    current_bedroom_ref.on('value', function(snapshot)
    {
        set_temperature('bedroom', snapshot.val());
    });

    var current_kitchen_ref = database.ref('kitchen/current');
    current_kitchen_ref.on('value', function(snapshot)
    {
        set_temperature('kitchen', snapshot.val());
    });

    var current_spare_bedroom_ref = database.ref('spare_bedroom/current');
    current_spare_bedroom_ref.on('value', function(snapshot)
    {
        set_temperature('spare_bedroom', snapshot.val());
    });

    var current_study_ref = database.ref('study/current');
    current_study_ref.on('value', function(snapshot)
    {
        set_temperature('study', snapshot.val());
    });

    var weeks_bedroom_ref = database.ref('bedroom/weeks');
    weeks_bedroom_ref.limitToLast(1).on('child_added', function(s)
    {
        weeks_bedroom_ref.orderByKey().limitToLast(2).once('value').then(function(snapshot)
        {
            set_average_temperature('bedroom', snapshot.val());
        });
    });

    var weeks_kitchen_ref = database.ref('kitchen/weeks');
    weeks_kitchen_ref.limitToLast(1).on('child_added', function(s)
    {
        weeks_kitchen_ref.orderByKey().limitToLast(2).once('value').then(function(snapshot)
        {
            set_average_temperature('kitchen', snapshot.val());
        });
    });

    var weeks_spare_bedroom_ref = database.ref('spare_bedroom/weeks');
    weeks_spare_bedroom_ref.limitToLast(1).on('child_added', function(s)
    {
        weeks_spare_bedroom_ref.orderByKey().limitToLast(2).once('value').then(function(snapshot)
        {
            set_average_temperature('spare_bedroom', snapshot.val());
        });
    });

    var weeks_study_ref = database.ref('study/weeks');
    weeks_study_ref.limitToLast(1).on('child_added', function(s)
    {
        weeks_study_ref.orderByKey().limitToLast(2).once('value').then(function(snapshot)
        {
            set_average_temperature('study', snapshot.val());
        });
    });

    var kitchen_light_ref = database.ref('kitchen/kitchen_light');
    kitchen_light_ref.on('value', function(snapshot)
    {
        set_light('kitchen_light', snapshot.val());
    });

    var living_room_light_ref = database.ref('kitchen/living_room_light');
    living_room_light_ref.on('value', function(snapshot)
    {
        set_light('living_room_light', snapshot.val());
    });

    var bedroom_light_ref = database.ref('bedroom/bedroom_light');
    bedroom_light_ref.on('value', function(snapshot)
    {
        set_light('bedroom_light', snapshot.val());
    });

    var bedroom_lamp_ref = database.ref('bedroom/bedroom_lamp');
    bedroom_lamp_ref.on('value', function(snapshot)
    {
        set_light('bedroom_lamp', snapshot.val());
    });
}

