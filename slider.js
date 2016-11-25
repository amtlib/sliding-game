var Slider = (function(){
    var gfx_prefix = 'graphics/';
    var gfx_list = [gfx_prefix+'graphic.jpg', gfx_prefix+'graphic1.jpg', gfx_prefix+'graphic2.jpeg', gfx_prefix+'graphic3.jpg'];
    var current_photo_index = 0;
    function slide_next(){
        current_photo_index++;
        current_photo_index %= gfx_list.length;
        Game.set_image_source(gfx_list[current_photo_index]);
        document.querySelector('img[alt="graphic"]').setAttribute('src', Game.get_image_source());
    }
    function slide_previous(){
        current_photo_index--;
        current_photo_index = current_photo_index < 0 ? gfx_list.length-1: current_photo_index;
        Game.set_image_source(gfx_list[current_photo_index]);
        document.querySelector('img[alt="graphic"]').setAttribute('src', Game.get_image_source());
    }
    return {
        slide_next:slide_next,
        slide_previous:slide_previous,
        gfx_list:gfx_list
    }
})();
