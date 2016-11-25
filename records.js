var Records = (function () {
    var top = 10;
    var records_size = 3;
    var expire_days = 1;

    function get_cookie(cname) { //function from w3schools
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function set_cookie(cname, cvalue) {
        var d = new Date();
        d.setTime(d.getTime() + (expire_days * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function save_record(size, hours, minutes, seconds, milliseconds) {
        try {
            var records = JSON.parse(get_cookie(size + 'x' + size));
        }
        catch (err) {
            var records = []
        }
        for (var i = 0; i < records.length; i++) {
            records[i] = new Date(records[i]);
        }
        records.push(new Date(1970, 0, 1, hours, minutes, seconds, milliseconds));
        records.sort();
        while (records.length > top) {
            records.pop();
        }
        set_cookie(size + 'x' + size, JSON.stringify(records));
    }

    function get_records(size) {
        try{
        var temp = JSON.parse(get_cookie(size + 'x' + size))
        }catch(err){
            var temp = [];
        }
        for (record in temp) {
            temp[record] = new Date(temp[record]);
        }
        temp.sort();
        while (temp.length > top) {
            temp.pop();
        }
        return temp;
    }

    function update(size) {
        for (var i = 3; i < 7; i++) {
            document.querySelector('#x' + i + 'x' + i + '_panel ol').innerHTML = '';
            var records = get_records(i);
            for (record in records) {
                var li = document.createElement('li');
                li.textContent = records[record].getHours() + ':' + records[record].getMinutes() + ':' + records[record].getSeconds() + '.' + records[record].getMilliseconds()
                document.querySelector('#x' + i + 'x' + i + '_panel ol').appendChild(li);
            }
        }
    }
    return {
        top: top
        , get_records: get_records
        , set_record: save_record
        , records_size: records_size
        , expire_days: expire_days
        , update: update
    , }
})()
