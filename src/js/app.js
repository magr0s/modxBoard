var _arr = [];

var _libs = {
	materialize: "js/materialize.min.js",
	sweetalert2: "libs/sweetalert2/sweetalert2.min.js",
	formatter: "libs/formatter/jquery.formatter.min.js",
	validate: "libs/form.validate/jquery.validate.min.js",
	validate_methods: "libs/form.validate/validate.methods.js"
};

//= _modules.js
//= _login.js
//= _logout.js
//= _recovery.js
//= _signup.js
//= _ad-post.js


var App = {
	init: function( settings ) {
		var defaults = {
            connector: 'assets/components/modxsite/connectors/connector.php',
            forms: {
				login: '#login-form',
				recovery: '#recovery-form',
				recovery_confirm: '#recovery-confirm-form',
				signup: '#signup-form',
				signup_confirm: '#signup-confirm-form',
				ad_post: '#ad-post-form'
            },
            controls: {
                logout: 'a[data-control="logout"]'
            },
			toast: {
				msgs: {
					error: 'Ошибка в работе сервиса.',
					response_error: 'Сервис временно недоступен.',
					code_fail: 'Не верный код активации аккаунта.',
					acc_not_found: 'Пользователь не найден.',
					form_fail: 'Ошибка данных в форме.'
				},
				ttl: 4000
			},
			custom_validate: {
				ignore: [],
				submitHandler: function() {
					return false;
				},
				errorPlacement: function(error, element) {
					var $element = $(element);
					
					$element.next()
						.attr('data-error', error[0].innerText);
					
					return true;
				},
				errorClass: 'invalid',
				validClass: 'valid',
				focusInvalid: false,
				invalidHandler: function(form, validator) {
            
                    if(!validator.numberOfInvalids())
                        return;
            
                    $('html, body').animate({
                        scrollTop: $(validator.errorList[0].element).offset().top - 100
                    }, 2000);            
                }
			}
		};
		
		$.extend(defaults, settings);
		this.settings = defaults;
		
		this.utilites.loadScript(_libs.materialize, function() {
			
			$.ajaxSetup({
				url: App.settings.connector,
				method: 'post',
				error: function(XMLHttpRequest, textStatus, errorThrown){
					Materialize.toast(
						App.settings.toast.msgs.error, 
						App.settings.toast.ttl
					);
				}
			});

			$('select').material_select();
			Waves.displayEffect();
			$(".button-collapse").sideNav();
			
			try {
				
				$.Module.init();
				
			} catch(e) {
				
				console.log(e);
				
				Materialize.toast(
					App.settings.toast.msgs.error, 
					App.settings.toast.ttl
				);
			}
		});		
	},
	plugins: {
		validator: function($_form, _options) {
			App.utilites.loadScript(_libs.validate, function() {
				App.utilites.loadScript(_libs.validate_methods, function() {
					
					$_form.validate($.extend(
						App.settings.custom_validate,
						_options
					));
				});
			});
        },
        dialogs: function(_options) {
            App.utilites.loadScript(_libs.sweetalert2, function() {
                swal($.extend({
                    allowOutsideClick: false,
                    allowEscapeKey: false
                }, _options));
            });
		},
		formatter: function(data) {
			App.utilites.loadScript(_libs.formatter, function() {				
				$.each(data, function(i, row) {
					
					row.element.formatter(row.options);
				});
			});
		}
	},
	utilites: {
		loadScript: function(name, callback) {
			if(!_arr[name]) {
				
				_arr[name] = true;
				
				var body = document.getElementsByTagName('body')[0],
					script = document.createElement('script');
				
				script.type = 'text/javascript';
				script.src = App.settings.plugin_path + name;
				script.onload = callback;
				
				body.appendChild(script);				
				
			} else if(callback) {
				callback();
			}
		},
		retryCode: function(e) {
			e.preventDefault();

			console.log('Retry code.');
		}
	}
};
