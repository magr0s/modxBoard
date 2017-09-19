<!DOCTYPE html>
<html>
<head>

    {snippet name="MetaX@MetaX"}
    
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <link type="text/css" rel="stylesheet" href="{$template_url}css/libs.css"  media="screen,projection"/>
    <link type="text/css" rel="stylesheet" href="{$template_url}css/app.min.css"  media="screen,projection"/>
    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>

<body>    

    <main>
        <nav class="white">
            <div class="nav-wrapper container">
                <a href="{$modx->makeUrl({config name=site_start})}" class="brand-logo">
                    <i class="material-icons ln-shadow-logo shape-0 hide-on-small-only">search</i>
                    Город <span>без посредников</span>
                </a>
                <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
                <ul class="right hide-on-med-and-down">
                    
                    {if !$modx->user->isAuthenticated()}
                        {snippet name="Wayfinder@authMenu"}
                        <li><a href="{$modx->makeUrl(5)}" class="waves-effect red waves-light btn">Добавить объявление</a></li>
                    {else}
                        <li>
                            <a class="dropdown-button" href="#!" data-activates="dropdown1" data-beloworigin="true">
                                Мой кабинет<i class="material-icons right">arrow_drop_down</i>
                            </a>

                            <ul id='dropdown1' class='dropdown-content'>
                                <li><a href="#!">Профиль</a></li>
                                <li><a href="#!">Объявления</a></li>
                                <li><a href="#!">Сообщения</a></li>
                                <li><a href="#!">Подписка</a></li>
                                <li class="divider"></li>                        
                                <li><a href="#!" data-control="logout">Выход</a></li>
                            </ul>
                        </li>                
                    {/if}
                </ul>
                <ul class="side-nav" id="mobile-demo">
                    <li><a href="sass.html">Sass</a></li>
                    <li><a href="badges.html">Components</a></li>
                    <li><a href="collapsible.html">Javascript</a></li>
                    <li><a href="mobile.html">Mobile</a></li>
                </ul>
            </div>
        </nav>
        
        {block name=page}{/block}

    </main>

    {include file="tpl/site/views/footer.tpl"}
    
    {block name=office_controls}
        {include file="tpl/site/views/btn.office.tpl"}
    {/block}
    
    
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="{$template_url}js/scripts.min.js"></script>

    <script type="text/javascript">
        $(window).ready(function() {

            App.init({
                plugin_path: "{$template_url}"
            });
        });
    </script>

</body>
</html>