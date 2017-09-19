<?php

require_once MODX_CORE_PATH . 'components/modxboard/processors/mgr/ads/create.class.php';

class modBoardWebAdsCreateProcessor extends modBoardMgrAdsCreateProcessor {

    public function initialize() {

        $this->unsetProperty('active');
        $this->unsetProperty('createdby');
        $this->unsetProperty('createdon');
        $this->unsetProperty('editedon');
        $this->unsetProperty('unpub_date');

        return parent::initialize();
    }

    public function beforeSet() {

        if (!$this->getProperty('createdby', false)) {

            if (!$response = $this->modx->runProcessor('users/create',
                    array(
                        'login' => $this->getProperty('phone'),
                        'fullname'  => $this->getProperty('fullname')
                    ), array(
                        'processors_path'   => MODX_CORE_PATH . 'components/modxsite/processors/web/'
                ))
                AND $response->isError
            ) {
                return "Ошибка регистрации новго пользователя.";
            }

            $object = $response->getObject();
            $this->setProperty('createdby', $object['id']);
            
        } else if (!$this->modx->user->Profile->phone) {
            if (
                !$response = $this->modx->runProcessor('users/update',
                    array(
                        'id'    => $this->getProperty('createdby'),
                        'phone' => $this->getProperty('phone')
                    ), 
                    array(
                        'processors_path'   => MODX_CORE_PATH . 'components/modxsite/processors/web/'
                ))
                AND $response->isError()
            ) {
                return "Ошибка обновления данных пользователя";
            }
        }

        return parent::beforeSet();
    }
}
return "modBoardWebAdsCreateProcessor";