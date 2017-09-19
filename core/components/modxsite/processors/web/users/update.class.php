<?php

require_once MODX_PROCESSORS_PATH . 'security/user/update.class.php';

class modWebUsersUpdateProcessor extends modUserUpdateProcessor {

    public $permission = '';
    public $checkSavePermission = false;

    function initialize() {

        return parent::initialize();
    }
}
return 'modWebUsersUpdateProcessor';