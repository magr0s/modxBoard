<?php
$xpdo_meta_map['AttributeValue']= array (
  'package' => 'modxboard',
  'version' => '1.1',
  'table' => 'attribute_values',
  'extends' => 'xPDOSimpleObject',
  'fields' => 
  array (
    'internalKey' => NULL,
    'name' => '',
  ),
  'fieldMeta' => 
  array (
    'internalKey' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'phptype' => 'integer',
    ),
    'name' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '255',
      'phptype' => 'string',
      'null' => false,
      'default' => '',
    ),
  ),
  'aggregates' => 
  array (
    'Attribute' => 
    array (
      'class' => 'AttributeItem',
      'local' => 'internalKey',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
  ),
);
