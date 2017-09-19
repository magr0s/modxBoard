<?php

class modWebUsersRecoveryPasswordProcessor extends modProcessor {

    protected $user;
    protected $newPassword;

    function process() {
        $canRecovery = $this->beforeRecovery();
        if ($canRecovery !== true) return $this->failure($canRecovery);

        $this->newPassword = $this->getNewPassword();
        $this->modx->cacheManager->set('recovery' . $this->user->username, $this->newPassword);

        $this->afterRecovery();

        return $this->success("Отправлен новый пароль.");
    }

    function beforeRecovery() {
        if (
            !$response = $this->modx->runProcessor('users/find_user', 
                $this->getProperties(),
                array(
                    'processors_path'   => MODX_CORE_PATH . 'components/modxsite/processors/web/'
                )
            )
            OR !$object = $response->getObject()
        ) {
            $this->modx->log(xPDO::LOG_LEVEL_ERROR, 'modxBoard - ' . __CLASS__ . ' user not found.');            
            $this->modx->log(xPDO::LOG_LEVEL_ERROR, print_r($this->getProperties(), true));
            return "Пользователь не найден.";
        }

        $this->user = $this->modx->getObject('modUser', $object['object_id']);

        return true;
    }

    protected function getNewPassword() {
        $length = $this->modx->getOption('password_min_length', 8);
        $charmap = '0123456789bcdfghjkmnpqrstvwxyz';
        $pwd = '';

        $i= 0;
        while ($i < $length) {
            $char = substr($charmap, rand(0, strlen($charmap) - 1), 1);

            if (!strstr($pwd, $char)) {
                $pwd .= $char;
                $i++;
            }
        }

        return $pwd;
    }

    function afterRecovery() {
        if 
        (
            $response = $this->modx->runProcessor('security/code/set', array(
                    'topic' => $this->user->username
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
    }

    function sendNotification() {

    }
}
return 'modWebUsersRecoveryPasswordProcessor';