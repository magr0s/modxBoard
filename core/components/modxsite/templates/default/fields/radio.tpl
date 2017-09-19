<label>{$data.name}</label>
<p>
    {foreach $data.values as $key => $row}
        <input class="with-gap {if $data.required}validation{/if}" name="{$data.key}" type="radio" id="{$data.key}_{$key}" value="{$row.id}" />
        <label for="{$data.key}_{$key}">{$row.value}</label>
    {/foreach}
</p>