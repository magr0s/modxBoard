{extends file="page.inner.tpl"}

{block name=page_content}
    <div class="row">
        <div class="col s12 l9">
            <div class="card-panel">

                <form id="ad-post-form">
                    <input type="hidden" name="action" value="ads/create">
                    <div class="section">
                        <div class="row">
                            <div class="input-field col s12 m9 l4">
                                <select id="region_field" class="validation" name="region_field">
                                    <option value="" disabled selected>Выберите регион</option>
                                    <option value="7700000000000">Москва</option>
                                    <option value="5000000000000">Московская область</option>
                                </select>
                                <label>Регион</label>
                            </div>
                            <div class="input-field col s12 m9 l6">
                                <input type="text" id="address_field" class="autocomplete validation" name="address_field">
                                <label for="address_field">Адрес</label>
                            </div>
                            <div class="input-field col s6 m3 l2">
                                <input type="text" id="building_field" class="autocomplete validation" name="building_field">
                                <label for="building_field">Дом</label>
                            </div>
                        </div>
                    </div>

                    <div class="area-title valign-wrapper">
                        <i class="material-icons">info_outline</i> Основная информация
                    </div>

                    <div class="section nopadding">
                        <div class="row">
                            <div class="field col s12 m6">
                                <label>Срок аренды</label>
                                <p>
                                    <input class="with-gap validation" name="type" type="radio" id="type_1" value="1" />
                                    <label for="type_1">Длительно</label>
                                    <input class="with-gap validation" name="type" type="radio" id="type_2" value="2" />
                                    <label for="type_2">Посуточно</label>
                                </p>                        
                            </div>

                            <div class="field col s12 m6">
                                <label>Количество комнат</label>
                                <p>
                                    <input class="with-gap validation" name="rooms" type="radio" id="rooms_1" value="1" />
                                    <label for="rooms_1">1</label>
                                    <input class="with-gap validation" name="rooms" type="radio" id="rooms_2" value="2" />
                                    <label for="rooms_2">2</label>                                
                                    <input class="with-gap validation" name="rooms" type="radio" id="rooms_3" value="3" />
                                    <label for="rooms_3">3</label>                                
                                    <input class="with-gap validation" name="rooms" type="radio" id="rooms_4" value="4" />
                                    <label for="rooms_4">4</label>                                
                                    <input class="with-gap validation" name="rooms" type="radio" id="rooms_5" value="5" />
                                    <label for="rooms_5">5+</label>
                                </p>
                            </div>

                            <div class="input-field col s6 m4 xl3">
                                <input type="text" id="floor_field" class="validation" name="floor">
                                <label for="floor_field">Этаж</label>
                            </div>

                            <div class="input-field col s6 m4 xl3">
                                <input type="text" id="floors_field" class="validation" name="floors">
                                <label for="floors_field">Этажей в доме</label>
                            </div>
                        
                        </div>

                        <div class="row">

                            <div class="input-field col s6 m4 xl3">
                                <input type="text" id="sq_field" name="sq" data-equals-group="1">
                                <label for="sq_field">Общая площадь, м<sup>2</sup></label>
                            </div>
                            
                            <div class="input-field col s6 m4 xl3">
                                <input type="text" id="live_sq_field" name="live_sq" data-equals-group="1">
                                <label for="live_sq_field">Жилая площадь, м<sup>2</sup></label>
                            </div>

                            <div class="input-field col s6 m4 xl3">
                                <input type="text" id="kitchen_sq_field" name="kitchen_sq" data-equals-group="1">
                                <label for="kitchen_sq_field">Площадь кухни, м<sup>2</sup></label>
                            </div>

                            <div class="field col s12">
                                <label>Балкон</label>
                                <p>
                                    <input class="with-gap" name="balcony" type="radio" id="balcony_0" value="0" />
                                    <label for="balcony_0">0</label>
                                    <input class="with-gap" name="balcony" type="radio" id="balcony_1" value="1" />
                                    <label for="balcony_1">1</label>
                                    <input class="with-gap" name="balcony" type="radio" id="balcony_2" value="2" />
                                    <label for="balcony_2">2</label>
                                    <input class="with-gap" name="balcony" type="radio" id="balcony_3" value="3" />
                                    <label for="balcony_3">3</label>
                                    <input class="with-gap" name="balcony" type="radio" id="balcony_4" value="4" />
                                    <label for="balcony_4">4+</label>
                                </p>
                            </div>

                            <div class="field col s12 m6">
                                <label>Раздельных санузлов</label>
                                <p>
                                    <input class="with-gap" name="wc_sep" type="radio" id="wc_sep_0" value="0" />
                                    <label for="wc_sep_0">0</label>
                                    <input class="with-gap" name="wc_sep" type="radio" id="wc_sep_1" value="1" />
                                    <label for="wc_sep_1">1</label>
                                    <input class="with-gap" name="wc_sep" type="radio" id="wc_sep_2" value="2" />
                                    <label for="wc_sep_2">2</label>
                                    <input class="with-gap" name="wc_sep" type="radio" id="wc_sep_3" value="3" />
                                    <label for="wc_sep_3">3</label>
                                    <input class="with-gap" name="wc_sep" type="radio" id="wc_sep_4" value="4" />
                                    <label for="wc_sep_4">4+</label>
                                </p>
                            </div>
                            
                            <div class="field col s12 m6">
                                <label>Совмещенных санузлов</label>
                                <p>
                                    <input class="with-gap" name="wc" type="radio" id="wc_0" value="0" />
                                    <label for="wc_0">0</label>
                                    <input class="with-gap" name="wc" type="radio" id="wc_1" value="1" />
                                    <label for="wc_1">1</label>
                                    <input class="with-gap" name="wc" type="radio" id="wc_2" value="2" />
                                    <label for="wc_2">2</label>
                                    <input class="with-gap" name="wc" type="radio" id="wc_3" value="3" />
                                    <label for="wc_3">3</label>
                                    <input class="with-gap" name="wc" type="radio" id="wc_4" value="4" />
                                    <label for="wc_4">4+</label>
                                </p>
                            </div>

                            <div class="field col s12 m6">
                                <label>Пассажирских лифтов</label>
                                <p>
                                    <input class="with-gap" name="lift" type="radio" id="lift_0" value="0" />
                                    <label for="lift_0">0</label>
                                    <input class="with-gap" name="lift" type="radio" id="lift_1" value="1" />
                                    <label for="lift_1">1</label>
                                    <input class="with-gap" name="lift" type="radio" id="lift_2" value="2" />
                                    <label for="lift_2">2</label>
                                    <input class="with-gap" name="lift" type="radio" id="lift_3" value="3" />
                                    <label for="lift_3">3</label>
                                    <input class="with-gap" name="lift" type="radio" id="lift_4" value="4" />
                                    <label for="lift_4">4+</label>
                                </p>
                            </div>

                            <div class="field col s12 m6">
                                <label>Грузовых лифтов</label>
                                <p>
                                    <input class="with-gap" name="service_lift" type="radio" id="service_lift_0" value="0" />
                                    <label for="service_lift_0">0</label>
                                    <input class="with-gap" name="service_lift" type="radio" id="service_lift_1" value="1" />
                                    <label for="service_lift_1">1</label>
                                    <input class="with-gap" name="service_lift" type="radio" id="service_lift_2" value="2" />
                                    <label for="service_lift_2">2</label>
                                    <input class="with-gap" name="service_lift" type="radio" id="service_lift_3" value="3" />
                                    <label for="service_lift_3">3</label>
                                    <input class="with-gap" name="service_lift" type="radio" id="service_lift_4" value="4" />
                                    <label for="service_lift_4">4+</label>
                                </p>
                            </div>
                            
                        </div>
                    </div>

                    <div class="section no-tp">
                        <div class="row">

                            <div class="field col s12 m6">
                                <label>Можно с детьми</label>
                                <div class="switch">
                                    <label>
                                        Нет
                                        <input type="checkbox" name="children" value="1">
                                        <span class="lever"></span>
                                        Можно
                                    </label>
                                </div>
                            </div>

                            <div class="field col s12 m6">
                                <label>Можно с животными</label>
                                <div class="switch">
                                    <label>
                                        Нет
                                        <input type="checkbox" name="animal" value="1">
                                        <span class="lever"></span>
                                        Можно
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="area-title valign-wrapper">
                        <i class="material-icons">star_border</i> Комфорт
                    </div>

                    <div class="section no-tp">
                        <div class="row">
                            
                            <div class="field col s12 m4">
                                <label>Кухонная техника</label>
                                <div class="switch">
                                    <label>
                                        Нет
                                        <input type="checkbox" name="kitchen_app" value="1">
                                        <span class="lever"></span>
                                        Есть
                                    </label>
                                </div>
                            </div>

                            <div class="field col s12 m4">
                                <label>Кондиционер</label>
                                <div class="switch">
                                    <label>
                                        Нет
                                        <input type="checkbox" name="condition" value="1">
                                        <span class="lever"></span>
                                        Есть
                                    </label>
                                </div>
                            </div>

                            <div class="field col s12 m4">
                                <label>Телевизор</label>
                                <div class="switch">
                                    <label>
                                        Нет
                                        <input type="checkbox" name="tv" value="1">
                                        <span class="lever"></span>
                                        Есть
                                    </label>
                                </div>
                            </div>

                            <div class="field col s12 m4">
                                <label>Интернет</label>
                                <div class="switch">
                                    <label>
                                        Нет
                                        <input type="checkbox" name="internet" value="1">
                                        <span class="lever"></span>
                                        Есть
                                    </label>
                                </div>
                            </div>

                            <div class="field col s12 m4">
                                <label>Стиральная машина</label>
                                <div class="switch">
                                    <label>
                                        Нет
                                        <input type="checkbox" name="washer" value="1">
                                        <span class="lever"></span>
                                        Есть
                                    </label>
                                </div>
                            </div>

                            <div class="field col s12 m4">
                                <label>Кухонная техника</label>
                                <div class="switch">
                                    <label>
                                        Нет
                                        <input type="checkbox" name="kitchen_app" value="1">
                                        <span class="lever"></span>
                                        Есть
                                    </label>
                                </div>
                            </div>

                            <div class="field col s12 m4">
                                <label>Телефон</label>
                                <div class="switch">
                                    <label>
                                        Нет
                                        <input type="checkbox" name="tel" value="1">
                                        <span class="lever"></span>
                                        Есть
                                    </label>
                                </div>
                            </div>

                            <div class="field col s12 m4">
                                <label>Охрана</label>
                                <div class="switch">
                                    <label>
                                        Нет
                                        <input type="checkbox" name="security" value="1">
                                        <span class="lever"></span>
                                        Есть
                                    </label>
                                </div>
                            </div>

                            <div class="field col s12 m4">
                                <label>Пастельное белье</label>
                                <div class="switch">
                                    <label>
                                        Нет
                                        <input type="checkbox" name="bad_clothes" value="1">
                                        <span class="lever"></span>
                                        Есть
                                    </label>
                                </div>
                            </div>

                            <div class="field col s12 m4">
                                <label>Туалетные пренадлежности</label>
                                <div class="switch">
                                    <label>
                                        Нет
                                        <input type="checkbox" name="accessories" value="1">
                                        <span class="lever"></span>
                                        Есть
                                    </label>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div class="area-title valign-wrapper">
                        <i class="material-icons">description</i> Описание
                    </div>

                    <div class="section">
                        <div class="row">
                            <div class="input-field col s12">
                                <textarea id="textarea1" class="materialize-textarea" name="desc"></textarea>
                                <label for="textarea1">Дополнительная информация</label>
                            </div>
                        </div>
                    </div>

                    <div class="area-title valign-wrapper">
                        <i class="material-icons">attach_money</i> Стоимость
                    </div>

                    <div class="section">
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="price" type="text" class="validation" name="price">
                                <label for="price">Цена, руб</label>
                            </div>

                            <div class="field col s6">
                                <label>Залог</label>
                                <p>
                                    <input type="checkbox" id="deposit" class="filled-in" name="deposit" value="1" />
                                    <label for="deposit">Без залога</label>
                                </p>
                            </div>
                        </div>
                    </div>

                    {if !$modx->user->isAuthenticated() OR !$modx->user->Profile->phone OR !$modx->user->Profile->fullname}

                        <div class="area-title valign-wrapper">
                            <i class="material-icons">person_outline</i> Контактные данные
                        </div>

                        <div class="section">
                            <div class="row">
                                {if !$modx->user->Profile->phone}
                                    <div class="input-field col s12 m6">
                                        <input id="phone_field" type="tel" name="phone" class="validate" value="">
                                        <label for="phone_field">Телефон</label>
                                    </div>
                                {/if}
                                {if !$modx->user->Profile->fullname}
                                    <div class="input-field col s12 m6">
                                        <input id="phone_field" type="text" name="fullname" class="validate" value="">
                                        <label for="phone_field">Ваше имя</label>
                                    </div>
                                {/if}
                            </div>
                        </div>
                    
                    {/if}

                    <div class="center-align">
                        <button class="btn waves-effect waves-light" type="submit">Подать объявление
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </form>
                
            </div>
        </div>
    </div>
{/block}