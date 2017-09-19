<?php

require_once MODX_CORE_PATH . 'components/modxsite/processors/site/web/getdata.class.php';

class modBoardMgrTypesGetdataProcessor extends modSiteWebGetdataProcessor{
    
    public $classKey = 'TypeItem';

    public function initialize() {
        
        $this->setDefaultProperties(array(
            'limit'         => 0,
            'includeAttr'   => true
        ));

        return parent::initialize();
    }   

    public function afterIteration(array $list) {
        $list = parent::afterIteration($list);

        if ($this->getProperty('includeAttr')) {
            foreach ($list as & $l) {
                if (
                    $response = $this->modx->runProcessor('attributes/getdata', array(
                        'type_id'   => $l['object_id']
                    ), array(
                        'processors_path'   => dirname(__FILE__) .'/'
                    ))
                    AND !$response->isError()
                    AND $object = $response->getObject()
                ) {
                    $l['attributes'] = $object;
                    unset($l['tvs']);
                }
            }
        }

        return $list;
    }
}
return 'modBoardMgrTypesGetdataProcessor';