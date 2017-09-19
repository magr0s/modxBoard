<?php 

require_once MODX_PROCESSORS_PATH . 'security/login.class.php';

class modWebUsersLoginProcessor extends modSecurityLoginProcessor {

    function initialize() {

        $login = trim($this->getProperty('login'));

        if (
            !filter_var($login, FILTER_VALIDATE_EMAIL)
            AND preg_match('#^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$#', $login)
        ) {
            $login = preg_replace('![^0-9]+!', '', $login);
        }

        $this->setDefaultProperties(array(
            "username"      => $login,
        ));

        return parent::initialize();
    }

    public function process() {
        $preventLogin = $this->beforeLogin();
        if (!empty($preventLogin)) {            
            return $this->failure($preventLogin, array(
                'deactivated'   => ($this->user->active) ? false : true
            ));
        }
        $canLogin = $this->fireOnAuthenticationEvent();
        $preventLogin = $this->checkPassword($canLogin);
        if (!empty($preventLogin)) {
            return $this->failure($preventLogin);
        }
        $response = $this->afterLogin();
        return $this->cleanup($response);
    }
}
return 'modWebUsersLoginProcessor';