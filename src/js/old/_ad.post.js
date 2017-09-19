
(function() {

    $.AdPost = {

        init: function($form) {            

            var defaults = {
                fields: {
                    region: '#region_field',
                    address: '#address_field',
                    building: '#building_field'
                },
                form: '#ad-post-form'
            };

            this.settings = defaults;

            $.kladr.setDefault({
                limit: 5,
                select: function(obj) {
                    switch (obj.contentType) {
                        case 'street':
                            $.AdPost.process.setData('address_kladr_id', obj.id);
                            break;
                        case 'building':
                            $.AdPost.process.setData('building_kladr_id', obj.id);
                            break;
                        default:
                            $(this).kladr('controller').clear();
                    }
                }
            });

            var $region = $( $.AdPost.settings.fields.region ),
                $building = $( $.AdPost.settings.fields.building ),
                $address = $( $.AdPost.settings.fields.address );

            $building.kladr('type', $.kladr.type.building);

            $region.on('change', function() {
                $.AdPost.process.changeRegion();
                $.AdPost.process.clearData('region');
            });

            $address.on('change', function() {
                $.AdPost.process.changeAddress();
                $.AdPost.process.clearData('address');
            });

            $.AdPost.process.changeRegion();            
            $.AdPost.process.changeAddress();

            $.AdPost.form.init();

        },
        process: {
            changeRegion: function () {
                var parentType  = $.kladr.type.region,
                    parentId    = $( $.AdPost.settings.fields.region ).val();

                var $address = $( $.AdPost.settings.fields.address );

                $address.kladr({
                    parentType: parentType,
                    parentId: parentId,
                    oneString: true,
                    verify: true,
                    labelFormat: function(obj, query) {
                        return $.AdPost.utitltes.getName(obj, parentId);
                    },
                    valueFormat: function(obj, query) {
                        return $.AdPost.utitltes.getName(obj, parentId);
                    }
                });
            },
            changeAddress: function () {
                var parentType = $.kladr.type.street,
                    parentId = $( $.AdPost.settings.fields.address ).attr('data-kladr-id'),
                    $building = $( $.AdPost.settings.fields.building );

                $building.kladr({
                    verify: false,
                    parentType: parentType,
                    parentId: parentId
                })
            },
            clearData: function(parent) {
                switch (parent) {
                    case 'region':
                        $.AdPost.utitltes.clear(
                            $( $.AdPost.settings.fields.address )
                        );
                    case 'address':
                        $.AdPost.utitltes.clear(
                            $( $.AdPost.settings.fields.building )
                        );
                        break;
                    default:;
                }
            },
            setData: function(name, value) {
                var $placement = $('input[name="' + name + '"]');

                if (!$placement.length) {
                    $placement = $('<input type="hidden" name="' + name + '">').appendTo(
                        $( $.AdPost.settings.form )
                    );
                }
                $placement.val(value);
            }
        }, 
        form: {
            init: function() {
                var $form = $($.AdPost.settings.form);

                $.validator.addMethod(
                    "kladr", function(value, element){                        
                        return !$(element).hasClass('kladr-error');
                    },
                    "Введите правильный адрес."
                );

                $.validator.addMethod(
                    'select', function(value, element) {
                        return value != null;
                    }
                );

                $form.validate(
                    $.AdPost.form.validate
                );
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

                    switch ($element.prop('tagName')){
                        case 'SELECT':
                                $element.closest('.select-wrapper')
                                    .find('input')
                                    .removeClass(validClass)
                                    .addClass(errorClass);
                            break;
                        default: 
                            switch ($element.attr('type')) {
                                case 'radio':
                                    $element.closest('.field')
                                        .children('label')
                                        .removeClass(validClass)
                                        .addClass(errorClass);
                                    break;
                                default: $element.removeClass(validClass)
                                            .addClass(errorClass);
                            }
                    }
                },
                unhighlight: function(element, errorClass, validClass) {
                    var $element = $(element);
                        
                    switch ($element.prop('tagName')){
                        case 'SELECT':
                            $element.closest('.select-wrapper')
                                .find('input')
                                .removeClass(errorClass)
                                .addClass(validClass);
                            break;
                        default: 
                            switch ($element.attr('type')) {
                                case 'radio':
                                    $element.closest('.field')
                                        .children('label').removeClass(errorClass)
                                        .addClass(validClass);
                                    break;
                                default: $element.removeClass(errorClass)
                                            .addClass(validClass);
                            }
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
                    region_field: {
                        select: true
                    },
                    address_field: {
                        required: true,
                        kladr: true
                    },
                    building_field: {
                        required: true
                    },
                    term: {
                        required: true
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
            }
        },
        utitltes: {
            getName: function(obj, parentId) {
                var label = "";

                if (obj.parents) {
                    
                    $.each(obj.parents, function(index, value) {

                        if (
                            value.contentType != 'region' &&
                            value.contentType != 'cityOwner' &&
                            value.id != parentId
                        ){
                            label += $.AdPost.utitltes.prepareName(value);
                        }

                    });
                }

                label += $.AdPost.utitltes.prepareName(obj);

                return label;
            },
            prepareName: function(obj) {
                var name = "";

                switch (obj.typeShort) {
                    default:
                        name = obj.typeShort + '. ' + obj.name;
                }

                return name;
            },
            clear: function($element) {                
                $element.val('');
                $element.kladr('controller').clear();                
            }
        }
    };
})(jQuery);