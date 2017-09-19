(function(){
	
	$.Login = {

		init: function() {
			var $form = $(App.settings.forms.login);
			
			App.plugins.validator($form, {
				rules: {
					login: {
						required: true
					},
					password: {
						required: true
					}
				},
				messages: {
					login: {
						required: 'Забыли ввести логин.'
					},
					password: {
						required: 'Забыли ввести пароль.'
					}
				}
			});
			
			$form.on({
				submit: $.Login.process.submit
			});
		},
		process: {
			submit: function(e) {
				e.preventDefault();
				
				var $this = $(this);
				
				if (!$this.valid()) return ;

				var _userData = {
					login: $this.find('input[name="login"]').val(),
					password: $this.find('input[name="password"]').val()
				};
				
				$.ajax({
					data: $this.serialize(),
					beforeSend: function() {
						$this.find('[type="submit"]')
							.addClass('disabled');
					},
					success: function(response) {
						if (response.success) {

							window.location.href = window.location.origin;

						} else if (response.object.deactivated) {
							
							App.plugins.dialogs({
								type: 'warning',
								title: 'Аккаунт не активирован!',
								html: 'Вам отправлен код активации. <a href="#!" data-control="retry">Повторить отправку.</a>',
								buttonsStyling: false,
								confirmButtonClass: 'btn waves-effect waves-light',
								confirmButtonText: 'Активировать',
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
												action: 'users/activate',
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

							var msg = $.Login.utilites.getResponseMessage(response.message);

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
			getResponseMessage: function(message) {
				var _a = message.split('.');
				return _a[0];
			}
		}
	};			
	
})(jQuery);
