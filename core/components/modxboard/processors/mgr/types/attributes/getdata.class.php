<?php
require_once MODX_CORE_PATH . 'components/modxboard/processors/mgr/attributes/getdata.class.php';

class modBoardMgrTypesAttributesGetdataProcessor extends modBaseMgrAttributesGetdataProcessor{

    public function prepareQueryBeforeCount(xPDOQuery $c) {

        $c = parent::prepareQueryBeforeCount($c);
        $c->innerJoin('TypeAttribute', 'TypeAttribute', "{$this->classKey}.id=TypeAttribute.attr_id AND TypeAttribute.internalKey={$this->getProperty('type_id')}");

        return $c;
    }
}
return "modBoardMgrTypesAttributesGetdataProcessor";