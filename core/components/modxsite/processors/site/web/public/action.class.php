<?php

/*
Процессор, определяющий по запрошенному действию какой процессор выполнять
*/


class modSiteWebPublicActionProcessor extends modProcessor{
    
    protected static $actualClassName;
    
    public static function getInstance(modX &$modx,$className,$properties = array()) {

        // Здесь мы имеем возможность переопределить реальный класс процессора
        if(!empty($properties['action']) && !self::$actualClassName){
             
            switch($properties['action']){
                

                case 'login':
                    require_once MODX_CORE_PATH . 'components/modxsite/processors/web/users/login.class.php';
                    self::$actualClassName = "modWebUsersLoginProcessor";
                    break;

                case 'logout':
                    require_once __DIR__ . '/../users/logout.class.php';
                    self::$actualClassName = "modSiteWebUsersLogoutProcessor";
                    break;

                #case 'users/find_user':
                #    require __DIR__ . '/../users/find_user.class.php';
                #    self::$actualClassName = 'modSiteWebUsersFinduserProcessor';
                #    break;


                #case 'users/get_own_data':
                #    require __DIR__ . '/../users/own_profile/getdata.class.php';
                #    self::$actualClassName = 'modSiteWebUsersOwnprofileGetdataProcessor';
                #    break;
                
                case 'users/signup':
                    require MODX_CORE_PATH . 'components/modxsite/processors/web/users/create.class.php';
                    self::$actualClassName = 'modWebUsersCreateProcessor';
                    break;

                case 'users/recovery':
                    require MODX_CORE_PATH . 'components/modxsite/processors/web/users/recovery.class.php';
                    self::$actualClassName = 'modWebUsersRecoveryPasswordProcessor';
                    break;

                case 'users/activate':
                    require MODX_CORE_PATH . 'components/modxsite/processors/web/users/activate.class.php';
                    self::$actualClassName = 'modWebUsersActivateProcessor';
                    break;

                case 'ads/create':
                    require MODX_CORE_PATH . 'components/modxboard/processors/web/ads/create.class.php';
                    self::$actualClassName = 'modBoardWebAdsCreateProcessor';
                    break;

                default:;
            } 
        }
        
        if(self::$actualClassName){
            $className = self::$actualClassName;
            return $className::getInstance($modx,$className,$properties);
        }

        return parent::getInstance($modx,$className,$properties);
    }
    
    
    public function process(){
        
        $error = 'Действие не существует или не может быть выполнено';
        $this->modx->log(xPDO::LOG_LEVEL_ERROR, __CLASS__ . " - {$error}");
        $this->modx->log(xPDO::LOG_LEVEL_ERROR, print_r($this->getProperties(), true));
        return $this->failure($error);
    }
    
}

return 'modSiteWebPublicActionProcessor';