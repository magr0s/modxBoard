<?php

require_once __DIR__ . '/getdata.class.php';

class modWebUsersFinduserProcessor extends modWebUsersGetdataProcessor{

    function initialize() {

        $login = trim($this->getProperty('login'));

        if (
            !filter_var($login, FILTER_VALIDATE_EMAIL)
            AND preg_match('#^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$#', $login)
        ) {
            $login = preg_replace('![^0-9]+!', '', $login);
        }

        $this->setProperty('query', $login);

        if(!$this->getProperty('query')){
            return "Не указан логин или емейл";
        }

        $this->setDefaultProperties(array(
            "current" => true,
        ));

        return parent::initialize();        
    }
}
return 'modWebUsersFinduserProcessor';