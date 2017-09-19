<?php
$xpdo_meta_map['TypeItem']= array (
  'package' => 'modxboard',
  'version' => '1.1',
  'table' => 'types',
  'extends' => 'xPDOSimpleObject',
  'fields' => 
  array (
    'name' => '',
    'title' => '',
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
    'title' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '255',
      'phptype' => 'string',
      'null' => false,
      'default' => '',
    ),
  ),
  'composites' => 
  array (
    'Attributes' => 
    array (
      'class' => 'TypeItemAttribute',
      'local' => 'id',
      'foreign' => 'internalKey',
      'cardinality' => 'many',
      'owner' => 'local',
    ),
    'Ads' => 
    array (
      'class' => 'AdItem',
      'local' => 'id',
      'foreign' => 'type',
      'cardinality' => 'many',
      'owner' => 'local',
    ),
  ),
);
