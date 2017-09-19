<?php

class modBoardMgrAdsCreateProcessor extends modObjectCreateProcessor {

    public $classKey = 'AdItem';

    public function initialize() {

        $this->setDefaultProperties(array(
            'createdon'     => time(),
            'editedon'      => time(),
            'unpub_date'    => strtotime("+1 week"),
            'createdby'     => $this->modx->user->id
        ));

        $this->setProperty('active', 0);

        return parent::initialize();
    }

    public function beforeSave() {

        $_attributes = array();

        if (!$response = $this->modx->runProcessor('types/attributes/getdata', array(
                'type_id'   => $this->getProperty('type')
            ), array(
                'processors_path'   => MODX_CORE_PATH . 'components/modxboard/processors/mgr/'
            ))
            AND $response->isError()
        ) {
            return "Ошибка установки параметров.";
        }

        $object = $response->getObject();

        foreach ($object as $o) {
            $key = $o['key'];

            if ($param = $this->getProperty($key)) {
                
                $attribute = $this->modx->newObject("AdAttribute");
                $attribute->set('attr_id', $o['object_id']);
                $value = ($o['attr_field'] == 'multi-listbox') ? json_encode($param) : $param;
                $attribute->set('value', $value);

                $_attributes[] = $attribute;
            }

            $this->object->addMany($_attributes);
        }

        return parent::beforeSave();
    }
}
return "modBoardMgrAdsCreateProcessor";