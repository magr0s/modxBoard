{extends file="index.tpl"}

{block name=page}
    <div class="page-wrapper">
        <div class="container">
            <div class="row">
                <div class="col s12">
                    <div class="center-box card-panel">
                        <div class="panel-title">
                            {field name=pagetitle}
                        </div>
                        <form id="login-form">
                            <input type="hidden" name="action" value="login">
                            <div class="input-field">
                                <input id="login_field" type="text" name="login" class="validation" value="">
                                <label for="login_field">Логин</label>
                            </div>
                            <div class="input-field">
                                <input id="pass_field" type="password" name="password" class="validation" autocomplete="new-password">
                                <label for="pass_field">Пароль</label>
                            </div>
                            <div class="field">
                                <p>
                                    <input type="checkbox" id="rememberme_field" name="rememberme" value="1">
                                    <label for="rememberme_field">Запомнить</label>
                                </p>
                            </div>
                            <div class="field center-align">
                                <button class="btn waves-effect waves-light" type="submit">Войти</button>
                            </div>
                            <div class="panel-footer center-align small">
                                <a href="{$modx->makeUrl(4)}">Забыли пароль?</a><br>                        
                                <a href="{$modx->makeUrl(3)}">Регистрация</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/block}