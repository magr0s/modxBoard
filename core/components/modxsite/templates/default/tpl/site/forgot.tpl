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

                        {if $smarty.get.action == 'confirm'}

                            {assign var=params value=[
                                'login'     => $smarty.get.l,
                                'code'      => $smarty.get.c,
                                'redirect'  => ''
                            ]}

                            {processor action="web/users/reset" ns="modxsite" params=$params assign=result}

                            {if !$result.success}

                                <form id="recovery-confirm-form" autocomplete="off">
                                    <input type="hidden" name="action" value="users/reset">
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
                            <form id="recovery-form" autocomplete="off">
                                <input type="hidden" name="action" value="users/recovery">
                                <div class="input-field">
                                    <input id="login_field" type="text" name="login" class="validation" value="">
                                    <label for="login_field">Email или телефон</label>
                                </div>
                                <div class="field center-align">
                                    <button class="btn waves-effect waves-light" type="submit">Восстановить</button>
                                </div>
                                <div class="panel-footer center-align small">
                                    <a href="{$modx->makeUrl(2)}">Вход</a><br>
                                    <a href="{$modx->makeUrl(3)}">Регистрация</a>
                                </div>
                            </form>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
{/block}