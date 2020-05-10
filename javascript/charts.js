google.charts.load('current', {packages: ['corechart', 'line']});

function draw_living_room_all_time_chart(temp_data)
{
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Day');
    data.addColumn('number', 'Temperature');

    data.addRows(temp_data);

    var options = {
        hAxis:
        {
            title: 'Time'
        },
        vAxis:
        {
            title: 'Temperature'
        }
    };

    var chart = new google.visualization.LineChart(
        document.getElementById('living_room_all_time'));

    chart.draw(data, options);
}
