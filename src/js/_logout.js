(function() {

    $.Logout = {

        init: function() {
            var $control = $( App.settings.controls.logout );

            $control.on({
                click: $.Logout.process.click
            })
        },
        process: {
            click: function(e) {
                e.preventDefault();

                var $this = $(this);

                $.ajax({
                    data: {
                        action: 'logout'
                    },
                    success: function(response) {
                        if (response.success){

                            window.location.href = window.location.origin;
                            
                        } else {
                            Materialize.toast(
                                App.settings.toast.msgs.respose_error,
                                App.settings.toast.ttl
                            );
                        }
                    }
                })
            }
        }
    };

})(jQuery);