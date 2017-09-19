{extends file="tpl/site/user.office.tpl"}

{block name=page_content}
    <div class="card horizontal office-card">
        <div class="card-image">
            {assign var=thumb value=[
                "input" => $modx->user->Profile->photo,
                "options" => "&w=200&h=200&zc=1&aoe=0&far=0" 
            ]}
            <img src="{snippet name="phpthumbon" params=$thumb}">                        
        </div>
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">{$modx->user->Profile->fullname}</span>
                    <ul>
                        {if $email = $modx->user->Profile->email}
                            <li class="valign-wrapper"><i class="material-icons tiny">mail</i> {$email}</li>
                        {/if}
                        {if $phone = $modx->user->Profile->phone}
                            <li class="valign-wrapper"><i class="material-icons tiny">phone</i> {$phone}</li>
                        {/if}
                    </ul>
                </div>
                <div class="card-action right-align">
                    <a href="#"><i class="material-icons tiny">add_a_photo</i></a>
                    <a href="#"><i class="material-icons tiny">edit</i></a>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col s12 m6">
            <div class="card">                            
                <div class="card-content">
                    <span class="card-title">Объявления</span>                                
                    <p class="grey-text">У вас нет объявлений.</p>
                </div>
                <div class="card-action right-align small">
                    <a href="#">Открыть</a>
                </div>
            </div>
         </div>
        <div class="col s12 m6">
            <div class="card">                            
                <div class="card-content">
                    <span class="card-title">Сообщения</span>                                
                    <p class="grey-text">У вас нет сообщений.</p>
                </div>
            </div>
        </div>
    </div>
    
    <div class="card">                            
        <div class="card-content">
            <span class="card-title">Подписки</span>
            <p class="grey-text">У вас нет подписок на объявления.</p>
        </div>
        <div class="card-action right-align">
            <a href="#">This is a link</a>
        </div>
    </div>
{/block}