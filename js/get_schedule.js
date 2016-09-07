$(function () {
    window.onload = function () {
        init()
    };

    //var spreadsheet_key = '17LGyF0rlpo_o6hCun6X7Q01h3cgVdb0SENoijFuNdT0';
    var spreadsheet_key = '1AkuZ0E0XScWjpwjYGPTnUm9YBYr0RQTKE-58wyrKIls';
    const DATE_COLUMN = 'date';
    const EVENT_COLUMN = 'event';
    const LOCATION_COLUMN = 'location';

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

    function startSchedule() {
        schedule_div.append('<table class="table" id="schedule-table">');
    }

    function endSchedule() {
        schedule_div.append('</table>');
    }

    function appendRowToTable(event_name, event_date, event_location) {
        // var year = event_date.getFullYear();
        $('#schedule-table').append(
            '<tr><td>' +
            dateShortFormat(event_date) + '</td><td>' +
            event_name + '</td><td>' +
            event_location + '</td></tr>'
        );
    }

    var schedule_div = $('#schedules');

    function startNewYear(year) {
        $('#schedule-table').append(
            '<tr><td colspan="3"><h3>' + year + '</h3></td></tr>' +
            // '<table id="' + year + '" class="table table-striped">' +
            '<tr><th>Day</th><th>Event</th><th>Location</th></tr>');
    }

    function endYear() {
        // schedule_div.append('</table>');
    }


    function showInfo(data) {
        $('#schedule-spinner').detach();

        previous_year = null;
        data.reverse();

        startSchedule();

        for (i = 0; i < data.length; i++) {
            event_date = new Date(data[i][DATE_COLUMN]);
            event_name = data[i][EVENT_COLUMN];
            event_location = data[i][LOCATION_COLUMN];

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

        // if (previous_year !== null) {
        //     endYear();
        // }

        endSchedule();
    }

});
