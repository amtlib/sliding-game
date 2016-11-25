var timeout = new Date();
function init_game() {
    Game.generate();
    if (!Game.randomize_block) {
        Game.randomize();
    }
    Stopwatch.reset();
    Game.activate_sliding();
}

function start_button_event() {
    if(Math.floor(new Date().getTime() / 1000) - Math.floor(timeout.getTime() / 1000) <1){
        alert('Slow down!');
        return;
    }
    timeout = new Date();
    Game.set_size(parseInt(this.getAttribute('id')[1]));
    init_game();
}

function left_arrow_event() {
//    if(Math.floor(new Date().getTime() / 1000) - Math.floor(timeout.getTime() / 1000) <=1){
//        alert('Slow down!');
//        return;
//    }
//    timeout = new Date();
    Game.stop_randomize();
    Stopwatch.stop_loop();
    Stopwatch.reset();
    Slider.slide_previous();
}

function right_arrow_event() {
//    if(Math.floor(new Date().getTime() / 1000) - Math.floor(timeout.getTime() / 1000) <=1){
//        alert('Slow down!');
//        return;
//    }
//    timeout = new Date();
    Game.stop_randomize();
    Stopwatch.stop_loop();
    Stopwatch.reset();
    Slider.slide_next();
}
document.addEventListener('DOMContentLoaded', function () {
    init();

    document.getElementById('x3x3').addEventListener('click', start_button_event);
    document.getElementById('x4x4').addEventListener('click', start_button_event);
    document.getElementById('x5x5').addEventListener('click', start_button_event);
    document.getElementById('x6x6').addEventListener('click', start_button_event);
    document.getElementById('show_records_button').addEventListener('click', function () {
        document.getElementById('records_panel').classList = 'visible'
        Records.update();
    });
    document.getElementById('records_panel').addEventListener('click', function () {
        document.getElementById('records_panel').classList = ''
    });
    document.querySelector('img[alt="arrow_right"]').addEventListener('click', right_arrow_event);
    document.querySelector('img[alt="arrow_left"]').addEventListener('click', left_arrow_event);
});
