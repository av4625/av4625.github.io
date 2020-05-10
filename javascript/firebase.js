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
    get_living_room_weeks();
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
    // Current main bedroom temperature listener
    var current_main_bedroom_ref = database.ref('main_bedroom/current');
    current_main_bedroom_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_temperature('main_bedroom', snapshot.val());
        }
    });

    // Current kitchen temperature listener
    var current_kitchen_ref = database.ref('kitchen/current');
    current_kitchen_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_temperature('kitchen', snapshot.val());
        }
    });

    // Current spare bedroom temperature listener
    var current_spare_bedroom_ref = database.ref('spare_bedroom/current');
    current_spare_bedroom_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_temperature('spare_bedroom', snapshot.val());
        }
    });

    // Current hot press temperature listener
    var current_hot_press_ref = database.ref('hot_press/current');
    current_hot_press_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_temperature('hot_press', snapshot.val());
        }
    });

    // Current dressing room temperature listener
    var current_dressing_room_ref = database.ref('dressing_room/current');
    current_dressing_room_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_temperature('dressing_room', snapshot.val());
        }
    });

    // Current dining room temperature listener
    var current_dining_room_ref = database.ref('dining_room/current');
    current_dining_room_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_temperature('dining_room', snapshot.val());
        }
    });

    // Current living room temperature listener
    var current_living_room_ref = database.ref('living_room/current');
    current_living_room_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_temperature('living_room', snapshot.val());
        }
    });

    // Current outside temperature listener
    var current_outside_ref = database.ref('outside/current');
    current_outside_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_outside_information(snapshot.val());
        }
    });

    // Main bedroom average temperature from previous week listener
    // Returns the current week if its the only week
    var weeks_main_bedroom_ref = database.ref('main_bedroom/weeks');
    weeks_main_bedroom_ref.limitToLast(1).on('child_added', function(s)
    {
        weeks_main_bedroom_ref.orderByKey().limitToLast(2).once('value').then(function(snapshot)
        {
            var is_first = true;
            snapshot.forEach(function(child)
            {
                if (is_first)
                {
                    set_average_temperature('main_bedroom', child.val());
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

    // Hot press average temperature from previous week listener
    // Returns the current week if its the only week
    var weeks_hot_press_ref = database.ref('hot_press/weeks');
    weeks_hot_press_ref.limitToLast(1).on('child_added', function(s)
    {
        weeks_hot_press_ref.orderByKey().limitToLast(2).once('value').then(function(snapshot)
        {
            var is_first = true;
            snapshot.forEach(function(child)
            {
                if (is_first)
                {
                    set_average_temperature('hot_press', child.val());
                    is_first = false;
                }
            });
        });
    });

    // Dressing room average temperature from previous week listener
    // Returns the current week if its the only week
    var weeks_dressing_room_ref = database.ref('dressing_room/weeks');
    weeks_dressing_room_ref.limitToLast(1).on('child_added', function(s)
    {
        weeks_dressing_room_ref.orderByKey().limitToLast(2).once('value').then(function(snapshot)
        {
            var is_first = true;
            snapshot.forEach(function(child)
            {
                if (is_first)
                {
                    set_average_temperature('dressing_room', child.val());
                    is_first = false;
                }
            });
        });
    });

    // Dining room average temperature from previous week listener
    // Returns the current week if its the only week
    var weeks_dining_room_ref = database.ref('dining_room/weeks');
    weeks_dining_room_ref.limitToLast(1).on('child_added', function(s)
    {
        weeks_dining_room_ref.orderByKey().limitToLast(2).once('value').then(function(snapshot)
        {
            var is_first = true;
            snapshot.forEach(function(child)
            {
                if (is_first)
                {
                    set_average_temperature('dining_room', child.val());
                    is_first = false;
                }
            });
        });
    });

    // Living room average temperature from previous week listener
    // Returns the current week if its the only week
    var weeks_living_room_ref = database.ref('living_room/weeks');
    weeks_living_room_ref.limitToLast(1).on('child_added', function(s)
    {
        weeks_living_room_ref.orderByKey().limitToLast(2).once('value').then(function(snapshot)
        {
            var is_first = true;
            snapshot.forEach(function(child)
            {
                if (is_first)
                {
                    set_average_temperature('living_room', child.val());
                    is_first = false;
                }
            });
        });
    });

    // Kicthen light listener
    var kitchen_light_ref = database.ref('kitchen/kitchen_light');
    kitchen_light_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_light('kitchen_light', snapshot.val());
        }
    });

    // Living room light listener
    var living_room_light_ref = database.ref('kitchen/living_room_light');
    living_room_light_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_light('living_room_light', snapshot.val());
        }
    });

    // Bedroom light listener
    var bedroom_light_ref = database.ref('bedroom/bedroom_light');
    bedroom_light_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_light('bedroom_light', snapshot.val());
        }
    });

    // Bedoom lamp listener
    var bedroom_lamp_ref = database.ref('bedroom/bedroom_lamp');
    bedroom_lamp_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_light('bedroom_lamp', snapshot.val());
        }
    });

    // Spare bedoom light listener
    var spare_bedroom_light_ref = database.ref('spare_bedroom/spare_bedroom_light');
    spare_bedroom_light_ref.on('value', function(snapshot)
    {
        if (snapshot.val() !== null)
        {
            set_light('spare_bedroom_light', snapshot.val());
        }
    });
}

// Add a number of days to a date object
function add_days_to_date(date, number_of_days)
{
    date.setDate(date.getDate() + number_of_days);
    return date;
}

// Get the date for a day of the week from the start date
function get_date(start_date, day)
{
    var week_start = string_to_date(start_date);

    switch (day)
    {
        case 'tuesday':
            week_start = add_days_to_date(week_start, 1);
            break;
        case 'wednesday':
            week_start = add_days_to_date(week_start, 2);
            break;
        case 'thursday':
            week_start = add_days_to_date(week_start, 3);
            break;
        case 'friday':
            week_start = add_days_to_date(week_start, 4);
            break;
        case 'saturday':
            week_start = add_days_to_date(week_start, 5);
            break;
        case 'sunday':
            week_start = add_days_to_date(week_start, 6);
            break;
    }

    return week_start;
}

function get_living_room_weeks()
{
    database.ref('living_room/weeks').orderByKey().once('value').then(function(snapshot)
    {
        var data = [];

        snapshot.forEach(function(child)
        {
            var json = child.val();
            var keys = Object.keys(json);

            if (keys.includes('monday'))
            {
                data.push(
                [
                    get_date(json['start_date'], 'monday'),
                    json['monday'].total_temperature / json['monday'].entries
                ]);
            }

            if (keys.includes('tuesday'))
            {
                data.push(
                [
                    get_date(json['start_date'], 'tuesday'),
                    json['tuesday'].total_temperature / json['tuesday'].entries
                ]);
            }

            if (keys.includes('wednesday'))
            {
                data.push(
                [
                    get_date(json['start_date'], 'wednesday'),
                    json['wednesday'].total_temperature / json['wednesday'].entries
                ]);
            }

            if (keys.includes('thursday'))
            {
                data.push(
                [
                    get_date(json['start_date'], 'thursday'),
                    json['thursday'].total_temperature / json['thursday'].entries
                ]);
            }

            if (keys.includes('friday'))
            {
                data.push(
                [
                    get_date(json['start_date'], 'friday'),
                    json['friday'].total_temperature / json['friday'].entries
                ]);
            }

            if (keys.includes('saturday'))
            {
                data.push(
                [
                    get_date(json['start_date'], 'saturday'),
                    json['saturday'].total_temperature / json['saturday'].entries
                ]);
            }

            if (keys.includes('sunday'))
            {
                data.push(
                [
                    get_date(json['start_date'], 'sunday'),
                    json['sunday'].total_temperature / json['sunday'].entries
                ]);
            }
        });

        draw_living_room_all_time_chart(data);
    });
}
