// Red: #FF232E
// Green: #57ED69
// Blue: #0083FF

var current_room_temperatures = {
    'kitchen':       0,
    'main_bedroom':  0,
    'spare_bedroom': 0,
    'hot_press':     0,
    'dressing_room': 0,
    'living_room':   0,
    'dining_room':   0
};
var weekly_average_room_temperatures = {
    'kitchen':       0,
    'main_bedroom':  0,
    'spare_bedroom': 0,
    'hot_press':     0,
    'dressing_room': 0,
    'living_room':   0,
    'dining_room':   0
};

var living_room_light_rgb = [0, 0, 0];

// Sets the room temperature, called when database updates
function set_temperature(room, data)
{
    var is_old = is_date_old(data.date_time);
    var temperature = parseFloat(data.temperature);
    current_room_temperatures[room] = temperature;

    // Set temperature rounded to 1 decimal place and with '*C' after it
    $('div#' + room + ' p.temperature')
        .html(temperature.toFixed(1) + '&#8451;');

    // Set the colour of the room
    $('div#' + room)
        .css('background-color', generate_room_colour(temperature, is_old));

    // Set emoji
    set_image('div#' + room + ' img#' + room + '_emoji',
        get_image($('div#' + room).css('background-color'), is_old));

    // Set the average house temperature
    set_current_average();

}

function set_outside_information(data)
{
    var is_old = is_date_old(data.date_time);
    var temperature = parseFloat(data.temperature);

    $('p#outside_temp').html(
        parseFloat(data.temperature).toFixed(1) + '&#8451;');
    $('p#outside_pressure').html(
        parseFloat(data.pressure).toFixed(2) + ' hPa');
    $('p#outside_humidity').html(
        parseFloat(data.humidity).toFixed(2) + ' %RH');
    $('p#outside_altitude').html(
        parseFloat(data.altitude).toFixed(2) + 'm');
    $('p#outside_battery').html(
        parseFloat(data.battery).toFixed(2) + 'V');
}

// Set wether the light is on or off
function set_light(light, data)
{
    // Check if the light is on
    if (data.is_on == 'true')
    {
        if (light === 'living_room_light')
        {
            // Get colours of the living room light
            var hue = data.hue / 65535;
            var saturation = data.saturation / 65535;
            var rgb = hsv_to_rgb(hue, saturation, 1);

            // If the colour has changed since last check draw the new image
            if (!are_arrays_equal(rgb, living_room_light_rgb))
            {
                set_bulb_colour('img#' + light + '_emoji', rgb);
                living_room_light_rgb = rgb;
            }
        }
        else
        {
            // Set image src as the light bulb image
            $('img#' + light + '_emoji').attr('src', 'images/light_bulb.png');
        }

        // Show image
        $('img#' + light + '_emoji').show();
    }
    else
    {
        // Hide image if the light is off
        $('img#' + light + '_emoji').hide();
    }
}

// Sets the current average house temperature
function set_current_average()
{
    var total_temp = 0;
    var number_of_rooms = 0;

    Object.keys(current_room_temperatures).forEach(function(room)
    {
        if (current_room_temperatures[room] !== 0)
        {
            total_temp += current_room_temperatures[room];
            number_of_rooms++;
        }
    });

    $('p#average_house_temp').html(
        (total_temp / number_of_rooms).toFixed(1) + '&#8451;');
}

// Sets the weekly average house temperature
function set_weekly_averages()
{
    var total_temp = 0;
    var number_of_rooms = 0;

    Object.keys(weekly_average_room_temperatures).forEach(function(room)
    {
        if (current_room_temperatures[room] !== 0)
        {
            total_temp += weekly_average_room_temperatures[room];
            number_of_rooms++;
        }
    });

    $('p#weekly_average_house_temp').html(
        (total_temp / number_of_rooms).toFixed(1) + '&#8451;');
}

// Return the hex colour of the room given the temperature
function generate_room_colour(temperature, is_date_old)
{
    var upper_limit = 22;
    var lower_limit = 18;

    if (is_date_old)
    {
        return '#AD42F4';
    }

    if (temperature > upper_limit)
    {
        return '#FF4444';
    }
    else if (temperature < lower_limit)
    {
        return '#6DC2FF';
    }
    else
    {
        return '#57ED69';
    }
}

// Return the image to be displayed depening on background colour
function get_image(color, is_date_old)
{
    if (is_date_old)
    {
        return 'images/sad_emoji.png';
    }

    if (color == 'rgb(255, 68, 68)')
    {
        return 'images/fire.png';
    }
    else if (color == 'rgb(109, 194, 255)')
    {
        return 'images/snowflake.png';
    }
    else
    {
        return '';
    }
}

// Set image fore the room
function set_image(img_id, image)
{
    if (image !== '')
    {
        $(img_id).attr('src', image);
        $(img_id).show();
    }
    else
    {
        $(img_id).hide();
    }
}

// Convert string date made by Python to JavaScript
function string_to_date(date)
{
    var d = date.split(/[- :]/);
    return new Date(d[0], d[1] - 1, d[2], d[3], d[4], d[5]);
}

// Check if date is recent
function is_date_old(date)
{
    var now = new Date();
    var one_and_half_mins = 1.5 * 60 * 1000;
    var date_to_check = string_to_date(date);

    if ((now - date_to_check) > one_and_half_mins)
    {
        return true;
    }

    return false;
}

// Set colour of light bulb
function set_bulb_colour(img_id, rgb_colour)
{
    // Load the light bulb image in and redraw it with the new colour
    var img = new Image();

    img.onload = function()
    {
        var canvas = document.createElement('canvas');

        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        var image_data = ctx.getImageData(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < image_data.data.length; i += 4)
        {
            // If the pixel is yellow set it to the new colour
            if (image_data.data[i + 3] !== 0 &&
                (image_data.data[i] > 200 &&
                    image_data.data[i + 2] < 100))
            {
                image_data.data[i] = rgb_colour[0];
                image_data.data[i + 1] = rgb_colour[1];
                image_data.data[i + 2] = rgb_colour[2];
            }
        }

        ctx.putImageData(image_data, 0, 0);

        // Set the image src to the bulb with the new colour
        $(img_id).attr('src', canvas.toDataURL());
        canvas = null;
    };

    // Set the image src, when it loads it will call the function above and
    // redraw it the correct colour
    img.src = 'images/light_bulb.png';
}

/**
* Converts an HSV color value to RGB. Conversion formula
* adapted from http://en.wikipedia.org/wiki/HSV_color_space.
* Assumes h, s, and v are contained in the set [0, 1] and
* returns r, g, and b in the set [0, 255].
*
* @param   Number  h       The hue
* @param   Number  s       The saturation
* @param   Number  v       The value
* @return  Array           The RGB representation
*/
function hsv_to_rgb(h, s, v)
{
    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch (i % 6)
    {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return [ Math.round(r * 255), Math.round(g * 255), Math.round(b * 255) ];
}

// Return true if the arrays are the same else return false
function are_arrays_equal(array_one, array_two)
{
    if (array_one.length != array_two.length)
    {
        return false;
    }

    for (var i = 0; i < array_one.length; i++)
    {
        if (array_one[i] != array_two[i])
        {
            return false;
        }
    }

    return true;
}
