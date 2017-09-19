(function(){

    $.AdPost = {

        init: function() {
            
            var $form = $(App.settings.forms.ad_post);           

            App.plugins.validator($form, {
                rules: {
                    type: {
                        required: true,
                    },
                    rooms: {
                        required: true
                    },
                    floor: {
                        required: true
                    },
                    floors: {
                        required: true
                    },
                    price: {
                        required: true
                    }
                }
            });

            App.plugins.formatter([
                {
                    element: $('#floor_field'),
                    options: {
                        'pattern':  "{{99}}"
                    }
                },{
                    element: $('#floors_field'),
                    options: {
                        'pattern':  "{{99}}"
                    }
                },{
                    element: $('#sq_field'),
                    options: {
                        'pattern':  "{{9999}}"
                    }
                },{
                    element: $('#live_sql_field'),
                    options: {
                        'pattern':  "{{9999}}"
                    }
                },{
                    element: $('#kitchen_sq_field'),
                    options: {
                        'pattern':  "{{99}}"
                    }
                },{
                    element: $('#phone_field'),
                    options: {
                        'pattern':  "{{9}} ({{999}}) {{999}}-{{9999}}"
                    }
                },
            ]);

            $form.on({
                submit: $.AdPost.process.submit
            });
        },
        process: {
            submit: function(e) {
                e.preventDefault();

                var $this = $(this);

                if (!$this.valid()) return ;

                $.ajax({
                    data: $this.serialize(),
                    beforeSend: function() {
                        $this.find('[type="submit"]')
                            .addClass('disabled');
                    },
                    success: function(response) {
                        if (response.success) {

                        } else {
                            var msg = $.AdPost.utilites.getResponseMessage(response);
                            
                            Materialize.toast(
                                msg,
                                App.settings.toast.ttl
                            );
                        }
                    },
                    complete: function() {
                        $this.find('[type="submit"]')
                            .removeClass('disabled');
                    }
                });
            }
        },
        utilites: {
            getResponseMessage: function(response) {
                console.log(response);
                var _msg = '';

                if (!response.message && response.data) {
                    if (response.data.length > 1) {
                        $.each(response.data, function(index, data) {
                            switch (data.id) {
                                case 'email':
                                case 'phone':
                                    _msg = data.msg;
                                    break;
                                default: 
                                    _msg = App.settings.toast.msgs.form_fail
                            }
                        });
                    } else {
                        _msg = response.data[0].msg;
                    }
                } else {
                    _msg = App.settings.toast.msgs.response_error;
                }

                return _msg;
            }
        }        
    };

})(jQuery);