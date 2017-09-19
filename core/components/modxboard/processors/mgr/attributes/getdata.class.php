<?php

require_once MODX_CORE_PATH . 'components/modxsite/processors/site/web/getdata.class.php';

class modBaseMgrAttributesGetdataProcessor extends modSiteWebGetdataProcessor{

    public $classKey = 'AttributeItem';

    public function initialize() {
        $this->setDefaultProperties(array(
            'sort'      => "{$this->classKey}.id",
            'dir'       => 'ASC',
            'current'   => false,
            'limit'     => 0
        ));

        return parent::initialize();
    }

    public function setSelection(xPDOQuery $c) {
        $c = parent::setSelection($c);

        $c->leftJoin('AttributeValue', 'Value', "Value.internalKey={$this->classKey}.id");
        $c->innerJoin('AttributeField', 'Field', "Field.id={$this->classKey}.field_id");

        $c->select(array(
            "{$this->classKey}.*",
            'Value.id as attr_value_id',
            'Value.name as attr_value_name',
            'Field.name as attr_field'
        ));

        return $c;
    }

    protected function getResults(xPDOQuery & $c) {
        $list = array();
        $this->currentIndex = 0;
        if ($c->prepare()) {
            if($c->stmt->execute()){
                while($row = $c->stmt->fetch(PDO::FETCH_ASSOC)){
                    $object_id = $row['object_id'];
                    
                    if (empty($list[$object_id])) {
                        $list[$object_id] = $row;
                        $list[$object_id]['values'] = array();
                    }

                    if (!empty($row['attr_value_id'])) {
                        $list[$object_id]['values'][$row['attr_value_id']] = array(
                            'id'        => $row['attr_value_id'],
                            'caption'   => $row['attr_value_name']
                        );
                    }
                }
            }
            else{
                if($c->stmt->errorCode() !== "00000"){
                    $this->modx->log(xPDO::LOG_LEVEL_ERROR, __CLASS__);
                    $this->modx->log(xPDO::LOG_LEVEL_ERROR, print_r($c->stmt->errorInfo(), true));
                    $this->modx->log(xPDO::LOG_LEVEL_ERROR, $c->toSQL());
                }
            }
        }
        return $list;
    }

}
return "modBaseMgrAttributesGetdataProcessor";