(function() {

    $.Module = {

        init: function() {

            if ($( App.settings.forms.login ).length > 0) {
                
                $.Login.init();
            }
            
            if ($( App.settings.controls.logout ).length > 0) {

                $.Logout.init();
            }
            
            if (
                $( App.settings.forms.recovery ).length > 0 ||
                $( App.settings.forms.recovery_confirm ).length > 0
            ) {

                $.Recovery.init();
            }

            if (
                $( App.settings.forms.signup ).length > 0 ||
                $( App.settings.forms.signup_confirm ).length > 0
            ) {

                $.Signup.init();
            }

            if ($( App.settings.forms.ad_post ).length > 0) {
                
                $.AdPost.init();
            }
        }
    };

})(jQuery);