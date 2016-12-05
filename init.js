function init() {
    //create divs - my teacher wants to create everything using JS

    var arrow_left = document.createElement('img');
    arrow_left.setAttribute('src', 'arrow_left.png');
    arrow_left.setAttribute('alt', 'arrow_left');
    document.querySelector('body').appendChild(arrow_left);

    var image_left = document.createElement('img');
    image_left.setAttribute('id', 'image_left');
    image_left.setAttribute('src', 'graphics/graphic1.jpg');

    var image_right = document.createElement('img');
    image_right.setAttribute('id', 'image_right')
    image_right.setAttribute('src', 'graphics/graphic2.jpeg')

    var image = document.createElement('img');
    image.setAttribute('id', 'image_center');
    image.setAttribute('src', Game.get_image_source());
    image.onerror = function () {
        Game.set_image_source('graphics/graphic.jpg')
        this.src = 'graphics/graphic.jpg'
    };
    image.setAttribute('alt', 'graphic');
    var image_cont = document.createElement('div');
    image_cont.setAttribute('id', 'image_container')
    image_cont.appendChild(image_left)
    image_cont.appendChild(image)
    image_cont.appendChild(image_right)
    document.querySelector('body').appendChild(image_cont);

    var arrow_right = document.createElement('img');
    arrow_right.setAttribute('src', 'arrow_right.png');
    arrow_right.setAttribute('alt', 'arrow_right');
    document.querySelector('body').appendChild(arrow_right);

    document.querySelector('body').appendChild(document.createElement('br'))

    var button;
    for (var i = 3; i < 7; i++) {
        button = document.createElement('button');
        button.setAttribute('id', 'x' + i + 'x' + i);
        button.textContent = i + 'x' + i;
        document.querySelector('body').appendChild(button);
    }
    button = document.createElement('button');
    button.setAttribute('id', 'show_records_button');
    button.textContent = "Show records";
    document.querySelector('body').appendChild(button);
    var records_panel = document.createElement('div');
    records_panel.setAttribute('id', 'records_panel');
    for (var i = 3; i < 7; i++) {
        var x_panel = document.createElement('div');
        x_panel.setAttribute('id', 'x' + i + 'x' + i + '_panel');
        var h1 = document.createElement('h1');
        h1.textContent = i+'x'+i;
        x_panel.appendChild(h1);
        var list = document.createElement('ol');
        x_panel.appendChild(list);
        records_panel.appendChild(x_panel);
    }
    document.querySelector('body').appendChild(records_panel);

    var info_panel = document.createElement('div');
    info_panel.setAttribute('id', 'info_panel');
    info_panel.addEventListener('click', function(){
        document.getElementById('info_panel').classList.remove('info_panel_visible')
    })
    document.querySelector('body').appendChild(info_panel);


    var clock_container = document.createElement('div');
    clock_container.setAttribute('id', 'clock_container');
    document.querySelector('body').appendChild(clock_container);
    var img_ids = ['hours_first', 'hours_second', 'colon_first', 'minutes_first', 'minutes_second', 'colon_second', 'seconds_first', 'seconds_second', 'dot', 'milliseconds_first', 'milliseconds_second', 'milliseconds_third']
    for (var i = 0; i < 12; i++) {
        var clock_element = document.createElement('img');
        clock_element.setAttribute('id', img_ids[i]);
        document.getElementById('clock_container').appendChild(clock_element);
    }
    var container = document.createElement('div');
    container.setAttribute('id', 'container');
    document.querySelector('body').appendChild(container);
}
