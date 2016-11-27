var Info = {
    show_message: function(message){
        document.getElementById('info_panel').textContent = message;
        document.getElementById('info_panel').classList += ' info_panel_visible';

    }
}
