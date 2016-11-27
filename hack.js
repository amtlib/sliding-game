var Hack = {
    hack_me: function () {
        Game.stop_randomize();
        var size = parseInt(Game.get_size());
        console.log('size: ', size);
        var elements = [];

        for (var i = size*size-1; i >=0; i--) {
            var temp = document.querySelector('div[index="' + i + '"]').cloneNode(true);
            document.querySelector('div[index="' + i + '"]').parentElement.removeChild(document.querySelector('div[index="' + i + '"]'));
            document.getElementById('container').insertBefore(temp, document.getElementById('container').firstChild);
        }
        var temp = document.querySelector('div[index="0"]').cloneNode(true);
        document.querySelector('div[index="0"]').parentElement.removeChild(document.querySelector('div[index="0"]'));
        document.getElementById('container').appendChild(temp);
        Game.user_won();
    }
}
