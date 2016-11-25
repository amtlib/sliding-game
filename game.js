var Game = (function () {
    var size = 3
        , href = 'graphics/graphic.jpg'
        , timeout_queue = []
        , interval, randomize_block = false
        , previous_previous_item = undefined
        , previous_item = undefined
        , a
        , randomization_timeout = 50;

    function user_won() {
        //check - maybe user won game
        var won = true;
        for (var i = 0; i < size * size - 1; i++) {
            if (!(document.getElementById('container').childNodes[i].getAttribute('index') == i + 1 && document.getElementById('container').childNodes[size * size - 1].getAttribute('index') == 0)) {
                won = false;
            }
        }
        if (won) {
            setTimeout(function () {
                alert('Congratulations! You made it! Your time is: ' + Stopwatch.get_hours() + ':' + Stopwatch.get_minutes() + ':' + Stopwatch.get_seconds() + '.' + Stopwatch.get_milliseconds());
                Records.set_record(size, Stopwatch.get_hours(), Stopwatch.get_minutes(), Stopwatch.get_seconds(), Stopwatch.get_milliseconds());
                Stopwatch.stop_loop();
                deactivate_sliding();
                Stopwatch.stop_loop();
            }, 100)
        }
    }

    function deactivate_sliding() {
        for (var i = 0; i < document.getElementById('container').childNodes.length; i++) {
            document.getElementById('container').childNodes[i].removeEventListener('click', part_event);
        }
    }

    function activate_sliding() {
        for (var i = 0; i < document.getElementById('container').childNodes.length; i++) {
            document.getElementById('container').childNodes[i].addEventListener('click', part_event);
        }
    }

    function near_blank_space(element) {
        //0 - they are not siblings
        //1 - element is to the right of blank
        //2 - element is to the left of blank
        //3 - element is on blank
        //4 - element is under blank
        var blank_id_y = parseInt(document.querySelector('div[index="0"]').getAttribute('current_index').split(' ')[0]);
        var blank_id_x = parseInt(document.querySelector('div[index="0"]').getAttribute('current_index').split(' ')[1]);
        var element_id_y = parseInt(element.getAttribute('current_index').split(' ')[0]);
        var element_id_x = parseInt(element.getAttribute('current_index').split(' ')[1]);
        if (blank_id_y == element_id_y) { //they are in the same row
            if (element_id_x - 1 == blank_id_x) { //they are next to each other
                return 1;
            }
            if (element_id_x + 1 == blank_id_x) {
                return 2;
            }
            return 0;
        }
        if (blank_id_x == element_id_x) {
            if (blank_id_y - 1 == element_id_y) {
                return 3;
            }
            if (blank_id_y + 1 == element_id_y) {
                return 4;
            }
            return 0;
        }
        return 0;
    }

    function part_event() {
        swap_with_blank(this);
        reindex();
        user_won();
    }

    function swap_with_blank(element) {
        reindex();
        var temp;
        var corelation = near_blank_space(element);
        if (corelation == 0) {
            return;
        }
        else if (corelation == 1) { //to the right
            temp = element.cloneNode(true);
            temp.addEventListener('click', part_event);
            element.remove();
            try {
                document.getElementById('container').insertBefore(temp, document.querySelector('div[index="0"]'));
            }
            catch (err) {
                document.querySelector('#container').appendChild(temp);
            }
        }
        else if (corelation == 2) { //to the left
            temp = element.cloneNode(true);
            temp.addEventListener('click', part_event);
            element.remove();
            try {
                insertAfter(temp, document.querySelector('div[index="0"]'));
            }
            catch (err) {
                document.querySelector('#container').appendChild(temp);
            }
        }
        else if (corelation == 3) { //on
            var temp_next_element = element.nextSibling;
            try {
                var blank_next_element = document.querySelector('div[index="0"]').nextSibling;
            }
            catch (err) {
                var blank_next_element = undefined;
            }
            temp = element.cloneNode(true);
            temp.addEventListener('click', part_event);
            element.remove();
            var temp_blank = document.querySelector('div[index="0"]').cloneNode();
            document.querySelector('div[index="0"]').remove();
            if (blank_next_element == undefined) {
                document.getElementById('container').appendChild(temp);
            }
            else {
                document.getElementById('container').insertBefore(temp, blank_next_element);
            }
            document.getElementById('container').insertBefore(temp_blank, temp_next_element);
        }
        else if (corelation == 4) { //under
            try {
                var temp_next_element = element.nextSibling;
            }
            catch (err) {
                var temp_next_element = undefined;
            }
            var blank_next_element = document.querySelector('div[index="0"]').nextSibling;
            temp = element.cloneNode(true);
            temp.addEventListener('click', part_event);
            element.remove();
            var temp_blank = document.querySelector('div[index="0"]').cloneNode();
            document.querySelector('div[index="0"]').remove();
            if (temp_next_element == undefined) {
                document.getElementById('container').appendChild(temp_blank);
            }
            else {
                document.getElementById('container').insertBefore(temp_blank, temp_next_element);
            }
            document.getElementById('container').insertBefore(temp, blank_next_element);
        }
    }

    function generate() {
        var clip_couter_x = 0;
        var clip_couter_y = 0;
        var blank_div = size * size - 1;
        document.getElementById('container').innerHTML = '';
        var container_size = document.getElementById('container').clientWidth;
        var fragment_size = container_size / size; //size of one fragment, also clip step
        for (var i = 1; i < size * size; i++) { //generate divs
            var fragment_div = document.createElement('div');
            fragment_div.style.width = fragment_size + 'px';
            fragment_div.style.height = fragment_size + 'px';
            fragment_div.setAttribute('index', i);
            fragment_div.className = 'fragment_div';
            var image = document.createElement('img');
            image.className = 'background_img';
            image.src = href;
            image.style.left = 0;
            image.style.top = 0;
            image.style.left = parseInt(image.style.left) - clip_couter_x++ * (fragment_size) + 'px';
            image.style.top = parseInt(image.style.top) - clip_couter_y * (fragment_size) + 'px';
            fragment_div.appendChild(image);
            var info = document.createElement('div');
            info.setAttribute('class', 'info');
            var info_p = document.createElement('p');
            info_p.textContent = i;
            info_p.style.fontSize = 400 / size + 'px';
            info.appendChild(info_p);
            fragment_div.appendChild(info)
            document.getElementById('container').appendChild(fragment_div);
            if (clip_couter_x % size == 0 && clip_couter_x != 0) {
                clip_couter_y++;
                clip_couter_x = 0;
            }
        }
        var blank_div = document.createElement('div');
        blank_div.style.width = fragment_size + 'px';
        blank_div.style.height = fragment_size + 'px';
        blank_div.className = 'fragment_div';
        blank_div.setAttribute('index', 0);
        //document.getElementById('container').insertBefore(blank_div, document.getElementById('container').firstChild);
        //for debugging - when i want to quickly check winning
        document.getElementById('container').appendChild(blank_div);
        reindex();
    }

    function clear_timeout() {
        for (var i = 0; i < timeout_queue.length; i++) {
            try {
                clearTimeout(timeout_queue[i]);
            }
            catch (err) {}
        }
        timeout_queue = [];
        clearInterval(a);
    }

    function disable_buttons() {
        document.querySelector('img[alt="arrow_left"]').removeEventListener('click', left_arrow_event);
        document.querySelector('img[alt="arrow_right"]').removeEventListener('click', right_arrow_event);
        document.getElementById('x3x3').removeEventListener('click', start_button_event);
        document.getElementById('x4x4').removeEventListener('click', start_button_event);
        document.getElementById('x5x5').removeEventListener('click', start_button_event);
        document.getElementById('x6x6').removeEventListener('click', start_button_event);
    }

    function enable_buttons() {
        document.querySelector('img[alt="arrow_left"]').addEventListener('click', left_arrow_event);
        document.querySelector('img[alt="arrow_right"]').addEventListener('click', right_arrow_event);
        document.getElementById('x3x3').addEventListener('click', start_button_event);
        document.getElementById('x4x4').addEventListener('click', start_button_event);
        document.getElementById('x5x5').addEventListener('click', start_button_event);
        document.getElementById('x6x6').addEventListener('click', start_button_event);
    }

    function randomize() {
        document.getElementById('container').insertBefore(document.querySelector('div[index="0"]'), document.getElementById('container').firstChild);
        clear_timeout();
        for (var i = 0; i < size * size * 10; i++) {
            timeout_queue.push(setTimeout(function () {
                randomly_swap();
                timeout_queue.shift();
            }, i * randomization_timeout));
        }
        a = setInterval(function () {
            if (timeout_queue.length == 0) {
                clearInterval(a);
                Stopwatch.loop();
            }
        }, 0)
    }

    function randomly_swap() {
        var possible_elements = []
        var blank_current_index_y = parseInt(document.querySelector('div[index="0"]').getAttribute('current_index').split(' ')[0]);
        var blank_current_index_x = parseInt(document.querySelector('div[index="0"]').getAttribute('current_index').split(' ')[1]);
        var top = document.querySelector('div[current_index="' + parseInt(blank_current_index_y - 1) + ' ' + blank_current_index_x + '"]');
        var bottom = document.querySelector('div[current_index="' + parseInt(blank_current_index_y + 1) + ' ' + blank_current_index_x + '"]');
        var right = document.querySelector('div[current_index="' + blank_current_index_y + ' ' + parseInt(blank_current_index_x + 1) + '"]');
        var left = document.querySelector('div[current_index="' + blank_current_index_y + ' ' + parseInt(blank_current_index_x - 1) + '"]');
        if (top != null) {
            possible_elements.push(top)
        }
        if (bottom != null) {
            possible_elements.push(bottom)
        }
        if (left != null) {
            possible_elements.push(left)
        }
        if (right != null) {
            possible_elements.push(right)
        }
        var item = possible_elements[Math.floor(Math.random() * possible_elements.length)];
        try {
            while (item.getAttribute('index') == previous_previous_item.getAttribute('index') || item.getAttribute('index') == previous_item.getAttribute('index')) {
                var item = possible_elements[Math.floor(Math.random() * possible_elements.length)];
            }
        }
        catch (err) {}
        previous_previous_item = previous_item;
        previous_item = item;
        item.click();
    }

    function set_size(s) {
        size = s;
    }

    function get_size() {
        return size;
    }

    function set_image_source(source) {
        href = source;
        generate();
    }

    function get_image_source() {
        return href;
    }

    function reindex() {
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                document.getElementById('container').childNodes[i * size + j].setAttribute('current_index', i + ' ' + j);
            }
        }
    }
    return {
        randomize: randomize
        , generate: generate
        , get_size: get_size
        , set_size: set_size
        , set_image_source: set_image_source
        , get_image_source: get_image_source
        , randomize_block: randomize_block
        , stop_randomize: clear_timeout
        , activate_sliding: activate_sliding
        , randomization_timeout: randomization_timeout
    , }
})()
