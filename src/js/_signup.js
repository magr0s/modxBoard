(function(){

    $.Signup = {

        init: function() {
            var urlParams = new URLSearchParams(window.location.search),
                _accountData = null;

            switch (urlParams.get('action')){
                case 'confirm':
                    $.Signup.state.confirm();
                    break;
                default: $.Signup.state.register();
            }
        },
        state: {
            register : function() {

                var $form = $( App.settings.forms.signup );

                App.plugins.validator($form, {
                    rules: {
                        login: {
                            required: true
                        },
                        fullname: {
                            required: true
                        },
                        policy: {
                            required: true
                        }
                    },
                    messages: {
                        login: {
                            required: 'Заполните правильно данные.'
                        },
                        fullname: {
                            required: 'Укажите свое имя.'
                        }
                    }
                });

                $form.on({
                    submit: $.Signup.process.register.submit
                });
                
            }
        },
        process: {
            register: {
                submit: function(e) {
                    e.preventDefault();

                    var $this = $(this);

                    if (!$this.valid()) return ;

                    _accountData = {
                        login: $this.find('input[name="login"]').val()
                    };

                    $.ajax({
                        data: $this.serialize(),
                        beforeSuccess: function() {
                            $this.find('[type="submit"]')
                                .addClass('disabled');
                        },
                        success: function(response) {

                            if (response.success) {

                                $.extend(_accountData, response.object);

                                App.plugins.dialogs({
                                    type: "success",
                                    title: "Спасибо за регистрацию!",
                                    html: 'Вам отправлен проверочный код активации аккаунта. <a href="!#">Повторить отправку.</a>',
                                    input: "text",
                                    allowOutsideClick: false,
                                    allowEscapeKey: false,
                                    confirmButtonText: 'Активировать',
                                    inputPlaceholder: "Введите код",
                                    confirmButtonClass: 'btn waves-effect waves-light',
                                    buttonsStyling: false,
                                    onOpen: function() {
                                        App.plugins.formatter([{
                                            element: $('.swal2-input'),
                                            options: {
                                                'pattern':	'{{9999}}'
                                            }
                                        }]);
                                    },
                                    showLoaderOnConfirm: true,
                                    preConfirm: function (value) {
                                        return new Promise(function (resolve, reject) {
                
                                            $.ajax({
                                                data: $.extend(_accountData, {
                                                    action: 'users/activate',
                                                    code: value
                                                }),
                                                success: function(response) {
                                                    
                                                    if (response.success) {
                                                        window.location.reload();
                                                    } else {
                                                        reject('Ошибка проверки кода активации.');
                                                    }
                                                }
                                            });
                                        });
                                    }
                                });
                            } else {
                                var msg = $.Signup.utilites.getResponseMessage(response);

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