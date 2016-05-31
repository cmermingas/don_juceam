$(function () {
    window.onload = function () {
        init()
    };

    var spreadsheet_key = '17LGyF0rlpo_o6hCun6X7Q01h3cgVdb0SENoijFuNdT0';

    function init() {
        Tabletop.init({
            key: spreadsheet_key,
            callback: showInfo,
            simpleSheet: true,
            prettyColumnNames: false,
            orderby: 'date'
        });
    }

    var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    function dateShortFormat(d) {
        return MONTHS[d.getMonth()] + ' ' + d.getDate();
    }

    function appendRowToTable(event_name, event_date, event_location) {
        var year = event_date.getFullYear();

        $('#' + year).append('<tr><td>' +
            dateShortFormat(event_date)+ '</td><td>' +
            event_name + '</td><td>' +
            event_location + '</td></tr>');

    }

    var schedule_div = $('#schedules');

    function startNewYear(year) {
        schedule_div.append(
            '<h3>' + year + '</h3>' +
            '<table id="' + year + '" class="table table-striped">' +
            '<tr><th>Day</th><th>Event</th><th>Location</th></tr>');
    }

    function endYear() {
        schedule_div.append('</table>');
    }


    function showInfo(data) {
        $('#schedule-spinner').detach();

        previous_year = null;
        data.reverse();

        for (i = 0; i < data.length; i++) {
            event_date = new Date(data[i].date);
            event_name = data[i].event;
            event_location = data[i].location;

            if (!isNaN(event_date.getFullYear())) {
                current_year = event_date.getFullYear();

                if (current_year != previous_year) {
                    if (previous_year !== null) {
                        endYear();
                    }

                    startNewYear(current_year);
                }

                appendRowToTable(event_name, event_date, event_location);

                previous_year = current_year;
            }
        }

        if (previous_year !== null) {
            endYear();
        }
    }

});
