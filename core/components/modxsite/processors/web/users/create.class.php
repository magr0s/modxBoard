<?php

require_once MODX_PROCESSORS_PATH . 'security/user/create.class.php';
require_once dirname(__FILE__) . '/_validate.php';


class modWebUsersCreateProcessor extends modUserCreateProcessor {

    public $permission = "";

    function initialize() {

        // Reset danger properties

        $this->unsetProperty('groups');
        $this->unsetProperty('sudo');
        $this->unsetProperty('active');

        $this->setProperties(array(
            'groups' => array(
                array(
                    'usergroup' => 2,
                    'role'      => 2,
                    'rank'      => 0
                )
            )
        ));

        if (!$this->getProperty('fullname', false)) {
            $this->addFieldError('fullname', 'Введите имя.');
        }

        $login = trim( $this->getProperty('login') );

        $properties = array();

        if (filter_var($login, FILTER_VALIDATE_EMAIL)) {
            $properties = array(
                'username'  => $login,
                'email'     => $login
            );
        } else if (preg_match('#^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$#', $login)) {
            $properties = array(
                'username'  => preg_replace('![^0-9]+!', '', $login),
                'phone'     => $login
            );
        } else {

            $this->addFieldError('login', 'Не корректно заполнен телефон либо email.');
        }

        $properties['passwordnotifymethod'] = ($properties['email']) ? 'e' : 'p';

        $this->setProperties($properties);
        

        return parent::initialize();

    }

    public function beforeSave(){
        $this->addProfile();
        $sudo = $this->getProperty('sudo',null);
        if ($sudo !== null) {
            $this->object->setSudo(!empty($sudo));
        }
        
        $this->validator = new modWebUsersValidation($this,$this->object,$this->profile);
        $this->validator->validate();
        
        return !$this->hasErrors();
    }

    function afterSave(){
        $this->setUserGroups();

        if 
        (
            $response = $this->modx->runProcessor('security/code/set', array(
                    'topic' => $this->object->username
                ),
                array(
                    'processors_path' => MODX_CORE_PATH . 'components/modxsite/processors/web/',    
                )
            )
            AND !$response->isError()
            AND $data = $response->getObject()
        ) {

            $this->sendNotification($data);            
        }
        return !$this->hasErrors();
    }

    function sendNotification($data) {
        $method = $this->getProperty('passwordnotifymethod');

        switch($method) {
            case 'e' : 
                break;
            default :
                
        }
    }

    public function cleanup() {
        return $this->success('Registration completed successfully.', array(
            'id'        => $this->object->id,
            'username'  => $this->object->username,
            'password'  => $this->newPassword
        ));
    }
}
return 'modWebUsersCreateProcessor';