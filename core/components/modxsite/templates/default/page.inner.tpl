{extends file="index.tpl"}

{block name=page}
    <div class="page-wrapper">
        <div class="container">
            <div class="pagetitle">
                <h1>{field name=pagetitle}</h1>
            </div>
            {snippet name="BreadCrumb@BreadCrumb"}
            
            {block name=page_content}{/block}
        </div>
    </div>
{/block}