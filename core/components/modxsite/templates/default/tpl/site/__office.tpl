{extends file="index.tpl"}

{block name=page}
    <div id="office" class="row">
        <div class="col l3 hide-on-med-and-down">
            <div class="collection with-header">
                <div class="collection-header">Личный кабинет</div>
                <a href="#!" class="collection-item">Профиль</a>
                <a href="#!" class="collection-item">Объявления</a>
                <a href="#!" class="collection-item">Сообщения</a>
                <a href="#!" class="collection-item">Подписка</a>
            </div>
        </div>
        <div class="col s12 l9">
            {block name=page_content}{/block}
        </div>
    </div>
{/block}

{block name=office_control}{/block}