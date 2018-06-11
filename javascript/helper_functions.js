// Red: #FF232E
// Green: #57ED69
// Blue: #0083FF

// Return the hex colour of the room given the temperature
function generate_room_colour(temperature, is_date_old)
{
    var upper_limit = 22;
    var lower_limit = 19.5;

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
    if (image != '')
    {
        $(img_id).attr('src', image);
        $(img_id).show();
    }
    else
    {
        $(img_id).hide();
    }
}

// Check if date is recent
function is_date_old(date)
{
    var now = new Date();
    var one_and_half_mins = 1.5 * 60 * 1000;
    var d = date.split(/[- :]/);

    var date_to_check = new Date(d[0], d[1] - 1, d[2], d[4], d[5], d[6]);

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
            if (image_data.data[i + 3] != 0 && (image_data.data[i] > 200 && image_data.data[i + 2] < 100))
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
    }

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

// Return true if the arrys are the same else return false
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

