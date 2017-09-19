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
            {else}
                <li>
                    <a class="dropdown-button" href="#!" data-activates="dropdown1">Кабинет<i class="material-icons right">arrow_drop_down</i></a>

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

            <li><a href="{$modx->makeUrl(5)}" class="waves-effect red waves-light btn">Добавить объявление</a></li>
        </ul>
        <ul class="side-nav" id="mobile-demo">
            <li><a href="sass.html">Sass</a></li>
            <li><a href="badges.html">Components</a></li>
            <li><a href="collapsible.html">Javascript</a></li>
            <li><a href="mobile.html">Mobile</a></li>
        </ul>
    </div>
</nav>