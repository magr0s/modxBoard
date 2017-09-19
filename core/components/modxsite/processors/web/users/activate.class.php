<?php

class modWebusersActivateProcessor extends modProcessor {

    public function initialize() {

        $this->setDefaultProperties(array(
            'autologin' => true
        ));

        if (!$this->getProperty('code')) {
            $this->addFieldError('code', 'Проверочный код не указан.');
        }

        return !$this->hasErrors();
    }

    function process() {
        $canActivate = $this->beforeActivation();

        if (!$canActivate) return $this->failure('Protection code is invalid.');

        if (!$this->activation()) $this->failure('User can`t activated.');

        $this->afterActivation();

        return $this->success('User activated.');
    }

    function beforeActivation() {

        $verify = false;

        if (
            $response = $this->modx->runProcessor('security/code/get', array(
                'topic' => $this->getProperty('username')
            ),array(
                'processors_path'   => MODX_CORE_PATH . 'components/modxsite/processors/web/'
            ))
            AND !$response->isError()
            AND $codes = $response->getObject()
        ) {

            if (
                is_array($codes) 
                AND in_array($this->getProperty('code'), $codes)
            ) {
                $verify = true;
            }
        }

        $this->modx->error->reset;

        return $verify;
    }

    function activation() {

        $activated = false;

        if ($user = $this->modx->getObject('modUser', $this->getProperty('id'))) {

            $user->set('active', 1);
            if (!$user->save()) {

                $this->modx->log(xPDO::LOG_LEVEL_ERROR, 'modxBoard - ' . __CLASS__ . ' user not activated.');            
                $this->modx->log(xPDO::LOG_LEVEL_ERROR, print_r($this->getProperties(), true));
            } else {

                $activated = true;
            }

        } else {
            $this->modx->log(xPDO::LOG_LEVEL_ERROR, 'modxBoard - ' . __CLASS__ . ' user not found.');            
            $this->modx->log(xPDO::LOG_LEVEL_ERROR, print_r($this->getProperties(), true));
        }

        return $activated;
    }

    function afterActivation() {
        if ($this->getProperty('autologin', false)){
            if (
                !$response = $this->modx->runProcessor('users/login', array(
                    'login'     => $this->getProperty('username'),
                    'password'      => $this->getProperty('password'),
                    'rememberme'    => 1
                ),
                array(
                    'processors_path'   => MODX_CORE_PATH . 'components/modxsite/processors/site/web/'
                )) 
                OR !$response->isError()
            ) {
                $this->modx->log(xPDO::LOG_LEVEL_ERROR, 'modxBoard - ' . __CLASS__ . ' error auto login.');            
                $this->modx->log(xPDO::LOG_LEVEL_ERROR, print_r($this->getProperties(), true));
            }
        }
    }

}
return 'modUserUpdateProcessor';