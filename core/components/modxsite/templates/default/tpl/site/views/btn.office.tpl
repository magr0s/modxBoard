{if $modx->user->isAuthenticated()}
    <div class="fixed-action-btn click-to-toggle">
        <a class="btn-floating btn-large waves-effect waves-light red z-depth-2">
            <i class="large material-icons">menu</i>
        </a>
        <ul>
            <li><a href="{$modx->makeUrl(5)}" class="btn-floating red"><i class="material-icons">add</i></a></li>
            <li><a class="btn-floating green"><i class="material-icons">account_circle</i></a></li>
            <li><a class="btn-floating blue"><i class="material-icons">mail</i></a></li>
        </ul>
    </div>
{/if}