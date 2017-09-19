(function() {

    $.Logout = {

        init: function(settings) {
            var defaults = {
                messages: {
                    error: 'Сервис недоступен.'
                },
                toast_time: 4000
            };

            $.extend(defaults, settings);
            this.settings = defaults;

            $( $.Logout.settings.action_links.logout ).on('click', $.Logout.process.click);
        },
        process: function() {

            e.preventDefault;                
            $.post($.Logout.settings.connector, {action: 'logout'}, function(response) {
                if (response.success) {
                    window.location.reload();
                } else {
                    Materialize.toast($.Logout.settings.messages.error, $.Logout.settings.toast_ttl);
                }
            })
                .fail(function() {
                    Materialize.toast($.Logout.settings.messages.error, $.Logout.settings.toast_ttl);
                });
        }
    };

})(jQuery);