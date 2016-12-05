
var Slider = (function(){
    var gfx_prefix = 'graphics/';
    var gfx_list = [gfx_prefix+'graphic.jpg', gfx_prefix+'graphic1.jpg', gfx_prefix+'graphic2.jpeg'];
    var current_photo_index = 0;

    function slide_next(){
        current_photo_index++;
        current_photo_index %= gfx_list.length;
        Game.set_image_source(gfx_list[current_photo_index]);

        document.getElementById('image_center').classList.add('anim_right');
        document.getElementById('image_left').classList.add('anim_right');
        document.getElementById('image_right').classList.add('anim_right');
        setTimeout(function () {
            document.getElementById('image_center').classList.remove('anim_right');
            document.getElementById('image_left').classList.remove('anim_right');
            document.getElementById('image_right').classList.remove('anim_right');
            document.querySelector('img[alt="graphic"]').setAttribute('src', Game.get_image_source());
            document.getElementById('image_left').setAttribute('src', gfx_list[current_photo_index +1 >= gfx_list.length ? 0:current_photo_index+1])
            document.getElementById('image_right').setAttribute('src', gfx_list[current_photo_index - 1 < 0 ? gfx_list.length-1:current_photo_index-1])
        },310)
    }
    function slide_previous(){
        current_photo_index--;
        current_photo_index = current_photo_index < 0 ? gfx_list.length-1: current_photo_index;
        Game.set_image_source(gfx_list[current_photo_index]);

        document.getElementById('image_center').classList.add('anim_left');
        document.getElementById('image_left').classList.add('anim_left');
        document.getElementById('image_right').classList.add('anim_left');
        setTimeout(function () {
            document.getElementById('image_center').classList.remove('anim_left');
            document.getElementById('image_left').classList.remove('anim_left');
            document.getElementById('image_right').classList.remove('anim_left');
            document.querySelector('img[alt="graphic"]').setAttribute('src', Game.get_image_source());
            document.getElementById('image_left').setAttribute('src', gfx_list[current_photo_index +1 >= gfx_list.length ? 0:current_photo_index+1])
            document.getElementById('image_right').setAttribute('src', gfx_list[current_photo_index - 1 < 0 ? gfx_list.length-1:current_photo_index-1])
        },310)
    }
    return {
        slide_next:slide_next,
        slide_previous:slide_previous,
        gfx_list:gfx_list
    }
})();
