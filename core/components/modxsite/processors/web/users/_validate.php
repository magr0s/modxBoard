<?php

require_once MODX_PROCESSORS_PATH . 'security/user/_validation.php';

class modWebUsersValidation extends modUserValidation{

    public function validate() {
        $this->checkUsername();
        $this->checkPassword();
        if ($this->processor->getProperty('email')){
            $this->checkEmail();
        } else {
            $this->checkPhone();
        }
        $this->checkCellPhone();
        $this->checkBirthDate();
        $this->checkBlocked();
        return !$this->processor->hasErrors();
    }

    public function checkPhone(){
        parent::checkPhone();
        $phone = $this->processor->getProperty('phone');
        $phoneExists = $this->modx->getObject('modUserProfile', array('phone'=>$phone));
        if ($phoneExists) {
            if ($phoneExists->get('internalKey') != $this->processor->getProperty('id')) {
                $this->processor->addFieldError('phone', 'Этот номер телефона уже используется!');
            }
        }
        return $phone;
    }
}