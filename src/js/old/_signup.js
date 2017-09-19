(function() {

    $.Signup = {

        init: function( settings ) {
            var defaults = {
                messages: {
                    connect_error: 'Сервис недоступен.',
                    form_error: 'Форма заполнена с ошибками.'
                },
                login_page_uri: '/signin/'
            };

            $.extend(defaults, settings);
            this.settings = defaults;

            $.Signup.form.init();

        },
        form: {
            init: function() {
                var $form = $($.Signup.settings.forms.signup);

                //$.Signup.form.format();

                $.validator.addMethod("eitherEmailPhone", function(value, element) {
                    isPhone = (this.optional(element) || /^\d+$/.test(value)) && this.getLength($.trim(value), element) <= 12 && this.getLength($.trim(value), element) >= 11 ;
                    isEmail = this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
                
                    return isPhone || isEmail;
                
                }, "Введите номер телефона или email.");

                $form.validate($.Signup.form.validate);
                
                $form.on('submit', $.Signup.form.process.submit);
                
            },
            format: function() {
                $('#name_field').formatter({
                    "pattern" : "a: [A-Za-z]"
                });
            },
            process: {
                submit: function(e) {
                    e.preventDefault();
                    
                    var $this = $(this);

                    $.ajax({
                        url: $.Signup.settings.connector,
                        data: $this.serialize(),
                        method: 'post',
                        beforeSend: function() {
                            $this.find('[type="submit"]')
                                .addClass('disabled');
                        },
                        success: function(response) {

                            if (response.success) {
                                
                                $.Signup.dialogs.activation(response.object);

                            } else {
                                var error = $.Signup.utilites.getErrors(response);

                                Materialize.toast(error, $.Signup.settings.toast_ttl);
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown){
                            Materialize.toast($.Signup.settings.messages.connect_error, $.Signup.settings.toast_ttl);
                        },
        
                        complete: function() {
                            $this.find('[type="submit"]')
                                .removeClass('disabled');
                        }
                    });
                }
            },
            validate: {
                ignore: [],               
                submitHandler: function( form ){
                    return false;
                },
                errorPlacement: function(error, element) {
                    $(element).next('label')
                        .attr('data-error', error[0]['innerText']);
                    return true;
                },
                highlight: function(element, errorClass, validClass) {

                    var $element = $(element);

                    switch ($element.attr('type')) {
                        case 'checkbox':
                            $element.closest('.field')
                                .children('label')
                                .removeClass(validClass)
                                .addClass(errorClass);
                            break;
                        default: $element.removeClass(validClass)
                                    .addClass(errorClass);
                    }
                },
                unhighlight: function(element, errorClass, validClass) {
                    var $element = $(element);
                        
                    switch ($element.attr('type')) {
                        case 'checkbox':
                            $element.closest('.field')
                                .children('label').removeClass(errorClass)
                                .addClass(validClass);
                            break;

                        default: $element.removeClass(errorClass)
                                    .addClass(validClass);
                    }
                },
                errorClass: 'invalid',
                validClass: 'valid',
                focusInvalid: false,
                invalidHandler: function(form, validator) {
            
                    if (!validator.numberOfInvalids())
                        return;
            
                    $('html, body').animate({
                        scrollTop: $(validator.errorList[0].element).offset().top
                    }, 2000);
            
                },
                rules: {
                    fullname : { required : true },
                    login : { 
                        required : true,
                        eitherEmailPhone: true
                    },
                    policy: { required : true }
                }
            }
        },
        dialogs: {
            activation: function(userData) {
                swal({
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
                        $('.swal2-input').formatter({
                            'pattern': '{{9999}}'
                        })
                    },
                    showLoaderOnConfirm: true,
                    preConfirm: function (value) {
                        return new Promise(function (resolve, reject) {

                            $.ajax({
                                url: $.Signup.settings.connector,
                                data: $.extend(userData, {
                                    action: 'users/activate',
                                    code: value
                                }),
                                success: function(response) {
                                    
                                    if (response.success) {
                                        //window.location.href = window.location.origin + $.Signup.settings.login_page_uri;
                                    } else {
                                        reject('Ошибка проверки кода активации.');
                                    }
                                },
                                error: function(XMLHttpRequest, textStatus, errorThrown){
                                    Materialize.toast($.Signup.settings.messages.connect_error, $.Signup.settings.toast_ttl);
                                }
                            });
                        });
                    }
                });
            }
        },
        utilites: {
            getErrors: function(response) {
                console.log(response);
                var error = '';

                if (!response.message && response.data) {
                    
                    if (response.data.length > 1) {
                        $.each(response.data, function(index, data) {
                            switch (data.id) {
                                default: 
                                    error = $.Signup.settings.messages.form_error
                            }
                        });
                    } else {
                        error = response.data[0].msg;
                    }

                } else {
                    error = $.Signup.settings.messages.connect_error;
                }

                return error;
            }
        }
    }

})(jQuery);