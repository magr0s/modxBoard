{extends file="index.tpl"}

{block name=page}
    <div class="page-wrapper">
        <div class="container">
            <div class="row">
                <div class="col s12">

                    <div class="center-box card-panel">
                        
                        {if $smarty.get.action == 'confirm'}

                            {assign var=params value=[
                                'username'  => $smarty.get.u,
                                'password'  => $smarty.get.p,
                                'code'      => $smarty.get.c
                            ]}

                            {processor action="web/users/activation" ns="modxsite" params=$params assign=result}

                            {if !$result.success}

                                <div class="panel-title">
                                    Активация
                                </div>

                                <form id="signup-confirm-form" autocomplete="off">
                                    <input type="hidden" name="action" value="users/activate">
                                    <div class="input-field">
                                        <input id="code_field" type="text" name="code" class="validation" value="">
                                        <label for="code_field">Код подтверждения</label>
                                    </div>
                                    <div class="field center-align">
                                        <button class="btn waves-effect waves-light" type="submit">Восстановить</button>
                                    </div>
                                    <div class="panel-footer center-align small">
                                        <a href="#!" data-control="retry">Отправить повторно</a>
                                    </div>
                                </form>
                            {/if}
                        {else}
                            <div class="panel-title">
                                {field name=pagetitle}
                            </div>

                            <form id="signup-form" autocomplete="off">
                                <input type="hidden" name="action" value="users/signup">
                                <div class="input-field">
                                    <input id="login_field" type="text" name="login" class="validation">
                                    <label for="login_field">Email или телефон</label>
                                </div>
                                <div class="input-field">
                                    <input id="name_field" type="text" name="fullname" class="validation">
                                    <label for="name_field">Ваше имя</label>
                                </div>
                                <div class="field">
                                    <p>
                                        <input type="checkbox" id="confirm_field" name="policy" class="validation" value="1">
                                        <label for="confirm_field">Даю согласие на обработку персональных данных</label>
                                    </p>
                                </div>
                                <div class="field center-align">
                                    <button class="btn waves-effect waves-light" type="submit">Зарегистрировать</button>
                                </div>
                                <div class="panel-footer center-align small">
                                    Есть аккаут? <a href="{$modx->makeUrl(2)}">Вход</a><br>
                                </div>
                            </form>
                        {/if}

                    </div>
                </div>
            </div>
        </div>
    </div>
{/block}
