//= _login.js
//= _logout.js
//= _signup.js
//= _ad.post.js


(function() {

    var _arr = [];

    $.App = {
        init: function() {
            var defaults = {
                connector: 'assets/components/modxsite/connectors/connector.php',
                script_path:  'assets/components/modxsite/templates/default/',
                toast_ttl: 4000,
                forms : {
                    ad_post: '#ad-post-form',
                    signup: '#signup-form',
                },
                action_links: {
                    logout_link: '.logout-action'
                }
            };

            this.settings = defaults;

            $.App.plugins.init();
        },
        plugins: {
            init: function() {
                $.App.utilites.loadScript('js/materialize.min.js', function() {

                    // init materialize components
                    $('select').material_select();

                });

                if ($( $.App.settings.forms.ad_post).length > 0) {                    

                    $.App.utilites.loadScript('libs/kladr/jquery.kladr.min.js', function() {

                        $.App.utilites.loadScript("libs/form.validate/jquery.validate.min.js", function() {

                            $.AdPost.init();
                        });

                    });
                }

                if ($( $.App.settings.forms.signup).length > 0) {  
                    $.App.utilites.loadScript("libs/form.validate/jquery.validate.min.js", function() {
                        
                        $.Signup.init($.App.settings);
                    });
                }

                $.App.utilites.loadScript("libs/sweetalert2/sweetalert2.min.js");
                $.App.utilites.loadScript("libs/formatter/jquery.formatter.min.js");

                if ($($.App.settings.action_links.logout).length > 0) {
                    $.Logout.init($.App.settings);
                }
            }
        },
        utilites: {

            loadScript: function(name, callback) {

                if (!_arr[name]) {
                    _arr[name] = true;

                    var body = document.getElementsByTagName('body')[0],
                        script = document.createElement('script');

                    script.type = 'text/javascript';
                    script.src = $.App.settings.script_path + name;
                    script.onload = callback;

                    body.appendChild(script);

                } else if (callback) {
                    callback();
                }
            }
        }
    };

})(jQuery);

$(window).ready(function(){
    $.App.init();
});