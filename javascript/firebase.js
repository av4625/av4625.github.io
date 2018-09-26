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

// Get the average temperature from the different days
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

// Set the average temperature for a room
function set_average_temperature(room, data)
{
    weekly_average_room_temperatures[room] = get_average_temperature(data);
    set_weekly_averages();
}

// Activate listeners to listen to firebase
function listeners()
{
    // Current bedroom temperature listener
    var current_bedroom_ref = database.ref('bedroom/current');
    current_bedroom_ref.on('value', function(snapshot)
    {
        set_temperature('bedroom', snapshot.val());
    });

    // Current kitchen temperature listener
    var current_kitchen_ref = database.ref('kitchen/current');
    current_kitchen_ref.on('value', function(snapshot)
    {
        set_temperature('kitchen', snapshot.val());
    });

    // Current spare bedroom temperature listener
    var current_spare_bedroom_ref = database.ref('spare_bedroom/current');
    current_spare_bedroom_ref.on('value', function(snapshot)
    {
        set_temperature('spare_bedroom', snapshot.val());
    });

    // Current study temperature listener
    var current_study_ref = database.ref('study/current');
    current_study_ref.on('value', function(snapshot)
    {
        set_temperature('study', snapshot.val());
    });

    // Bedroom average temperature from previous week listener
    // Returns the current week if its the only week
    var weeks_bedroom_ref = database.ref('bedroom/weeks');
    weeks_bedroom_ref.limitToLast(1).on('child_added', function(s)
    {
        weeks_bedroom_ref.orderByKey().limitToLast(2).once('value').then(function(snapshot)
        {
            var is_first = true;
            snapshot.forEach(function(child)
            {
                if (is_first)
                {
                    set_average_temperature('bedroom', child.val());
                    is_first = false;
                }
            });
        });
    });

    // Kitchen average temperature from previous week listener
    // Returns the current week if its the only week
    var weeks_kitchen_ref = database.ref('kitchen/weeks');
    weeks_kitchen_ref.limitToLast(1).on('child_added', function(s)
    {
        weeks_kitchen_ref.orderByKey().limitToLast(2).once('value').then(function(snapshot)
        {
            var is_first = true;
            snapshot.forEach(function(child)
            {
                if (is_first)
                {
                    set_average_temperature('kitchen', child.val());
                    is_first = false;
                }
            });
        });
    });

    // Spare bedroom average temperature from previous week listener
    // Returns the current week if its the only week
    var weeks_spare_bedroom_ref = database.ref('spare_bedroom/weeks');
    weeks_spare_bedroom_ref.limitToLast(1).on('child_added', function(s)
    {
        weeks_spare_bedroom_ref.orderByKey().limitToLast(2).once('value').then(function(snapshot)
        {
            var is_first = true;
            snapshot.forEach(function(child)
            {
                if (is_first)
                {
                    set_average_temperature('spare_bedroom', child.val());
                    is_first = false;
                }
            });
        });
    });

    // Study average temperature from previous week listener
    // Returns the current week if its the only week
    var weeks_study_ref = database.ref('study/weeks');
    weeks_study_ref.limitToLast(1).on('child_added', function(s)
    {
        weeks_study_ref.orderByKey().limitToLast(2).once('value').then(function(snapshot)
        {
            var is_first = true;
            snapshot.forEach(function(child)
            {
                if (is_first)
                {
                    set_average_temperature('study', child.val());
                    is_first = false;
                }
            });
        });
    });

    // Kicthen light listener
    var kitchen_light_ref = database.ref('kitchen/kitchen_light');
    kitchen_light_ref.on('value', function(snapshot)
    {
        set_light('kitchen_light', snapshot.val());
    });

    // Living room light listener
    var living_room_light_ref = database.ref('kitchen/living_room_light');
    living_room_light_ref.on('value', function(snapshot)
    {
        set_light('living_room_light', snapshot.val());
    });

    // Bedroom light listener
    var bedroom_light_ref = database.ref('bedroom/bedroom_light');
    bedroom_light_ref.on('value', function(snapshot)
    {
        set_light('bedroom_light', snapshot.val());
    });

    // Bedoom lamp listener
    var bedroom_lamp_ref = database.ref('bedroom/bedroom_lamp');
    bedroom_lamp_ref.on('value', function(snapshot)
    {
        set_light('bedroom_lamp', snapshot.val());
    });
}

