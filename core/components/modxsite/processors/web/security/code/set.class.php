<?php

class modWebSecurityCodeSetProcessor extends modProcessor {

    protected $topic;

    public function initialize() {

        $this->setProperties(array(
            'code'  => rand(1000, 9999)
        ));
        
        if (!$this->topic = $this->getProperty('topic', false)) {
    
            $this->addFieldError('topic', 'Ошибка инициализации.');
        }   

        return !$this->hasErrors();
    }

    public function process() {

        $this->modx->getService('regisrty', 'registry.modRegistry');
        $this->modx->registry->addRegister('security', 'registry.modFileRegister');
        
        if (!$this->modx->registry->security->connect()) {
            
            $this->modx->log(xPDO::LOG_LEVEL_ERROR, 'Registery [Security] not connected.');            
            return "Registery not connected.";
        } else {
            
            $this->modx->registry->security->subscribe("/{$this->topic}/");
        }
       
        $this->modx->registry->security->send(
            "/{$this->topic}/",
            array(
                $this->getProperty('code')
            ),
            array(
                'ttl'   => 86400 * 3
            )
        );

        return $this->success('New protection code.', $this->getProperty('code'));
    }
}
return 'modWebSecurityCodeSetProcessor';