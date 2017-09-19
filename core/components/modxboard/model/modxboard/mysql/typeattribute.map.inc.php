<?php
$xpdo_meta_map['TypeAttribute']= array (
  'package' => 'modxboard',
  'version' => '1.1',
  'table' => 'type_attributes',
  'extends' => 'xPDOSimpleObject',
  'fields' => 
  array (
    'internalKey' => NULL,
    'attr_id' => NULL,
  ),
  'fieldMeta' => 
  array (
    'internalKey' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'phptype' => 'integer',
    ),
    'attr_id' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'phptype' => 'integer',
    ),
  ),
  'aggregates' => 
  array (
    'Type' => 
    array (
      'class' => 'TypeItem',
      'local' => 'internalKey',
      'foreign' => 'id',
      'owner' => 'foreign',
    ),
    'Attribute' => 
    array (
      'class' => 'AttributeItem',
      'local' => 'attr_id',
      'foreign' => 'id',
      'owner' => 'foreign',
    ),
  ),
);
