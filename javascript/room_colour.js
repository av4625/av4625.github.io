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

    var date_to_check = new Date(d[0], d[1] - 1, d[2], d[3], d[4], d[5]);

    if ((now - date_to_check) > one_and_half_mins)
    {
        return true;
    }

    return false;
}
