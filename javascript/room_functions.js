// Red: #FF232E
// Green: #57ED69
// Blue: #0083FF

var current_room_temperatures = {
    'kitchen':       0,
    'bedroom':       0,
    'spare_bedroom': 0,
    'study':         0
};
var weekly_average_room_temperatures = {
    'kitchen':       0,
    'bedroom':       0,
    'spare_bedroom': 0,
    'study':         0
};

var living_room_light_rgb = [0, 0, 0];

// Sets the room temperature, called when database updates
function set_temperature(room, data)
{
    const svgDoc = document.getElementById('floorPlan').getSVGDocument();
    const is_old = is_date_old(data.date_time);
    const temperature = parseFloat(data.temperature);
    current_room_temperatures[room] = temperature;

    svgDoc.getElementById(`${room}Temperature`).textContent = `${temperature.toFixed(1)}℃`

    const colour = generate_room_colour(temperature, is_old)
    if (room === 'spare_bedroom' || room === 'study')
    {
        // Set the colour of the room and room hall
        svgDoc.getElementById(`svg_spare_bedroom`).style.fill = colour
        svgDoc.getElementById(`svg_study`).style.fill = colour
    }
    else
    {
        // Set the colour of the room
        svgDoc.getElementById(`svg_${room}`).style.fill = colour
    }

    // Set emoji
    svgDoc.getElementById(`${room}Icon`).textContent = get_image(colour, is_old)

    // Set the average house temperature
    set_current_average();

}

// Set wether the light is on or off
function set_light(light, data)
{
    const current_light = document.getElementById('floorPlan').getSVGDocument().getElementById(light);
    // Check if the light is on
    if (data.is_on == 'true')
    {
        if (light === 'living_room_light')
        {
            current_light.style.fill=`hsl(${data.hue / 65535}, ${data.saturation / 65535}, 1)`;
        }
        current_light.style.visibility = '';
    }
    else
    {
        // Hide image if the light is off
        current_light.style.visibility = 'hidden';
    }
}

// Sets the current average house temperature
function set_current_average()
{
    let total_temp = 0;

    Object.keys(current_room_temperatures).forEach((room) => {
        total_temp += current_room_temperatures[room];
    });

    document.getElementById('average_house_temp').innerHTML = (total_temp / Object.keys(current_room_temperatures).length).toFixed(1) + '℃';
}

// Sets the weekly average house temperature
function set_weekly_averages()
{
    let total_temp = 0;

    Object.keys(weekly_average_room_temperatures).forEach((room) => {
        total_temp += weekly_average_room_temperatures[room];
    });
    document.getElementById('weekly_average_house_temp').innerHTML = (total_temp / Object.keys(weekly_average_room_temperatures).length).toFixed(1) + '℃';
}

// Return the hex colour of the room given the temperature
function generate_room_colour(temperature, is_date_old)
{
    const upper_limit = 22;
    const lower_limit = 19.5;

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

// Return the image to be displayed depending on background colour
function get_image(colour, is_date_old)
{
    if (is_date_old)
    {
        return '😭';
    }

    if (colour == '#FF4444')
    {
        return '🔥';
    }
    else if (colour == '#6DC2FF')
    {
        return '❄️';
    }
    else
    {
        return '';
    }
}

// Check if date is recent
function is_date_old(date)
{
    const now = new Date();
    const one_and_half_mins = 1.5 * 60 * 1000;
    const d = date.split(/[- :]/);

    const date_to_check = new Date(d[0], d[1] - 1, d[2], d[4], d[5], d[6]);

    return ((now - date_to_check) > one_and_half_mins);
}

function listen_for_new_week() {
    console.log("IMPLEMENT ME AARON, WHY DO YOU HATE ME AARON?")
}