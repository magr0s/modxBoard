<?php
$xpdo_meta_map['AdAttribute']= array (
  'package' => 'modxboard',
  'version' => '1.1',
  'table' => 'ad_attributes',
  'extends' => 'xPDOSimpleObject',
  'fields' => 
  array (
    'internalKey' => NULL,
    'attr_id' => NULL,
    'value' => '',
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
      'null' => false,
    ),
    'value' => 
    array (
      'dbtype' => 'text',
      'phptype' => 'string',
      'null' => false,
      'default' => '',
    ),
  ),
  'aggregates' => 
  array (
    'Ad' => 
    array (
      'class' => 'AdItem',
      'local' => 'internalKey',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
    'Attribute' => 
    array (
      'class' => 'AttributeItem',
      'local' => 'attr_id',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
  ),
);
