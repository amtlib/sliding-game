var Stopwatch = (function () {
    var images_root = 'clock_elements/';
    var now;
    var hours;
    var minutes;
    var seconds;
    var milliseconds;
    var clock;
    var beggining_date;

    function update_clock(beginnig_date) {
        now = new Date();
        interval = new Date(now - beginnig_date);
        hours = interval.getHours() - 1;
        minutes = interval.getMinutes();
        seconds = interval.getSeconds();
        milliseconds = interval.getMilliseconds();
        update_something('hours', hours);
        update_something('minutes', minutes);
        update_something('seconds', seconds);
        update_something('milliseconds', milliseconds);
    }

    function reset() {
        stop_loop();
        hours = 0;
        minutes = 0;
        seconds = 0;
        milliseconds = 0;
        initalize_clock();
    }

    function loop() {
        stop_loop();
        beggining_date = new Date();
        clock = setInterval(function () {
            update_clock(beggining_date);
        }, 0);
    }

    function stop_loop() {
        try {
            clearInterval(clock);
        }
        catch (err) {}
    }

    function update_something(type, value) {
        value = value.toString();
        if (type == 'milliseconds') {
            if (value.length == 1) {
                document.getElementById(type + '_first').setAttribute('src', images_root + 'c0.gif');
                document.getElementById(type + '_second').setAttribute('src', images_root + 'c0.gif');
                document.getElementById(type + '_third').setAttribute('src', images_root + 'c' + value + '.gif');
            }
            else if (value.length == 2) {
                document.getElementById(type + '_first').setAttribute('src', images_root + 'c0.gif');
                document.getElementById(type + '_second').setAttribute('src', images_root + 'c' + value[0] + '.gif');
                document.getElementById(type + '_third').setAttribute('src', images_root + 'c' + value[1] + '.gif');
            }
            else {
                document.getElementById(type + '_first').setAttribute('src', images_root + 'c' + value[0] + '.gif');
                document.getElementById(type + '_second').setAttribute('src', images_root + 'c' + value[1] + '.gif');
                document.getElementById(type + '_third').setAttribute('src', images_root + 'c' + value[2] + '.gif');
            }
            return
        }
        if (value.length == 1) {
            document.getElementById(type + '_first').setAttribute('src', images_root + 'c0.gif');
            document.getElementById(type + '_second').setAttribute('src', images_root + 'c' + value + '.gif');
        }
        else {
            document.getElementById(type + '_first').setAttribute('src', images_root + 'c' + value[0] + '.gif');
            document.getElementById(type + '_second').setAttribute('src', images_root + 'c' + value[1] + '.gif');
        }
    }

    function get_hours() {
        return hours.toString().length == 1 ? '0'+hours : hours;
    }

    function get_minutes() {
        return minutes.toString().length == 1 ? '0'+minutes : minutes;
    }

    function get_seconds() {
        return seconds.toString().length == 1 ? '0'+seconds : seconds;
    }

    function get_milliseconds() {
        return milliseconds.toString().length == 2 ? '0'+milliseconds : (milliseconds.toString().length == 1 ? '00'+milliseconds : milliseconds);
    }

    function initalize_clock() {
        hours = 0;
        minutes = 0;
        seconds = 0;
        milliseconds = 0;
        for (var i = 0; i < 12; i++) {
            document.getElementById('clock_container').childNodes[i].setAttribute('src', 'clock_elements/c0.gif');
        }
        document.getElementById('colon_first').setAttribute('src', 'clock_elements/colon.gif');
        document.getElementById('colon_second').setAttribute('src', 'clock_elements/colon.gif');
        document.getElementById('dot').setAttribute('src', 'clock_elements/dot.gif');
    }
    return {
        init: initalize_clock
        , get_hours: get_hours
        , get_minutes: get_minutes
        , get_seconds: get_seconds
        , get_milliseconds: get_milliseconds
        , reset: reset
        , loop: loop
        , stop_loop: stop_loop
    , }
})()
