{extends file="office.tpl"}

{block name=page_content}

    <h3>{$modx->user->Profile->fullname}</h3>

    <div class="card horizontal card-profile">
        <div class="card-image">
            {assign var=thumb value=[
                "input" => $modx->user->Profile->photo,
                "options" => "&w=180&h=180&zc=1&aoe=0&far=0" 
            ]}
            <img src="{snippet name="phpthumbon" params=$thumb}" class="rounded responsive-img">            
        </div>
        <div class="card-stacked">
            <div class="card-content">                
                <span class="card-title">{$modx->user->Profile->fullname}</span>
            </div>            
            <div class="card-action right-align">
                <a href="#"><i class="material-icons">add_a_photo</i> Добавить фото</a>
                <a href="#"><i class="material-icons">edit</i> Редактировать</a>
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
    </div>
{/block}