(function() {

    $.Recovery = {
        init: function() {
            
            var urlParams = new URLSearchParams(window.location.search),
                _accountData = null;

            switch (urlParams.get('action')){
                case 'confirm':
                    $.Recovery.state.confirm();
                    break;
                default: $.Recovery.state.recovery();
            }            
        },
        state: {
            recovery: function () {

                var $form = $( App.settings.forms.recovery );

                App.plugins.validator($form, {
                    rules: {
                        login: {
                            required: true
                        }
                    },
                    messages: {
                        login: {
                            required: 'Забыли ввести логин.'
                        }
                    }
                });

                $form.on({
                    submit: $.Recovery.process.recovery.submit
                });
            },
            confirm: function() {

                var $form = $( App.settings.forms.recovery_confirm );

                App.plugins.formatter($form.find('input[name="code"]'), {
                    'pattern': '{{9999}}'
                });

                App.plugins.validator($form, {
                    rules: {
                        code: {
                            required: true
                        }
                    },
                    messages: {
                        code: {
                            required: 'Введите код.'
                        }
                    }
                });
            }
        },
        process: {
            recovery: {
                submit: function(e) {
                    e.preventDefault();

                    var $this = $(this);

                    if (!$this.valid()) return ;

                    _accountData = {
                        login: $this.find('username').val()
                    }

                    $.ajax({
                        data: $this.serialize(),
                        beforeSend: function() {
                            $this.find('[type="submit"]')
                                .addClass('disabled');
                        },
                        success: function(response) {
                            
                            if (response.success) {

                                App.plugins.dialogs({
                                    type: 'info',
                                    title: 'Восстановление пароля!',
                                    html: 'Вам отправлен код для подтверждения сброса пароль. <a href="#!" data-control="retry">Повторить отправку.</a>',
                                    buttonsStyling: false,
                                    confirmButtonClass: 'btn waves-effect waves-light',
                                    confirmButtonText: 'Отправить',
                                    input: "text",
                                    inputPlaceholder: "Введите код",
                                    onOpen: function() {
                                        $( App.settings.controls.retry ).on('click', App.utilites.retryCode);
    
                                        App.plugins.formatter([{
                                            element: $('.swal2-input'),
                                            options: {
                                                'pattern':	'{{9999}}'
                                            }
                                        }]);
                                    },
                                    preConfirm: function(value) {
                                        return new Promise(function(resolve, reject){
                                            
                                            $.ajax({
                                                data: $.extend(_userData, {
                                                    action: 'users/reset',
                                                    code: value
                                                }),
                                                success: function(response) {
                                                    
                                                    if (response.success) {

                                                        window.location.reload();
                                                        
                                                    } else {
                                                        reject(App.settings.toast.msgs.code_fail);
                                                    }
                                                }
                                            });
                                        });
                                    }
                                });

                            } else {

                                Materialize.toast(
                                    App.settings.toast.msgs.acc_not_found,
                                    App.settings.toast.ttl
                                );
                            }
                        },
                        complete: function(response) {
                            $this.find('[type="submit"]')
                                .removeClass('disabled');
                        }
                    });
                }
            }
        }
    };

})(jQuery);