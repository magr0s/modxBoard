<?php
$xpdo_meta_map['AttributeItem']= array (
  'package' => 'modxboard',
  'version' => '1.1',
  'table' => 'attributes',
  'extends' => 'xPDOSimpleObject',
  'fields' => 
  array (
    'name' => '',
    'key' => '',
    'field_id' => NULL,
    'required' => 0,
  ),
  'fieldMeta' => 
  array (
    'name' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '255',
      'phptype' => 'string',
      'null' => false,
      'default' => '',
    ),
    'key' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '255',
      'phptype' => 'string',
      'null' => false,
      'default' => '',
    ),
    'field_id' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'phptype' => 'integer',
      'null' => false,
    ),
    'required' => 
    array (
      'dbtype' => 'tinyint',
      'precision' => '1',
      'phptype' => 'int',
      'null' => false,
      'default' => 0,
    ),
  ),
  'composites' => 
  array (
    'TypeAtributes' => 
    array (
      'class' => 'TypeAttribute',
      'local' => 'id',
      'foreign' => 'attr_id',
      'cardinality' => 'many',
      'owner' => 'local',
    ),
    'AdAttributes' => 
    array (
      'class' => 'AdAttribute',
      'local' => 'id',
      'foreign' => 'attr_id',
      'cardinality' => 'many',
      'owner' => 'local',
    ),
    'Values' => 
    array (
      'class' => 'AttributeValue',
      'local' => 'id',
      'foreign' => 'internalKey',
      'cardinality' => 'many',
      'owner' => 'local',
    ),
  ),
  'aggregates' => 
  array (
    'Field' => 
    array (
      'class' => 'AttributeField',
      'local' => 'field_id',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
  ),
);
