Dander.Web.Shop.DisplayedItem = /*constructor*/ function (/*jqeuryObject*/ _jqThis, /*string*/ _itemRef, /*string*/ _getContentURL)
{
    console.assert(_jqThis.length == 1, 'Argument is required represent a unique DOM element wrapped as a JQuery Object.');
    Dander.Utility.assertNoneEmptyString(_itemRef);
    Dander.Utility.assertNoneEmptyString(_getContentURL);

    /*inheritance*/
    Dander.Web.Shop.Abstract.DisplayedItem.call(this);

    /*priviliged*/
    this.ajaxRefresh = function ()
    {
        _jqThis.data('itemRef', _itemRef);
        $.ajax(
        {
            url: _getContentURL,
            data: { itemRef: _itemRef },
            type: 'get',
            datatype: 'json',
            success: function (feed)
            {
                _jqThis.empty();
                _jqThis.html(feed.htmlContent);
                if (feed.enableWholeAsButton)
                    _jqThis.addClass('click-add-to-cart');
                else
                    _jqThis.removeClass('click-add-to-cart');
            },
            error: function ()
            {
                console.log('GetItemContent service is unavailable.');
            }
        });
        return this;
    }
};
Object.defineProperty(Dander.Web.Shop, 'DisplayedItem', { enumerable: false, writeable: false, configurable: false });

Dander.Web.Shop.ItemDisplay = /*constructor*/ function (/*jqeuryObject*/ _jqThis)
{
    console.assert(_jqThis.length == 1, 'Argument is required represent a unique DOM element wrapped as a JQuery Object.');

    /*inheritance*/
    Dander.Web.Shop.Abstract.ItemDisplay.call(this);

    /*private*/
    var _config = _jqThis.data('config');
    console.assert(typeof _config != 'undefined', 'Could not load the config data.');

    /*ensuring that these do have values*/
    _config.FilterControlID = _config.FilterControlID || '';
    _config.GetItemContentURL = _config.GetItemContentURL || '/';
    _config.SelectItemsURL = _config.SelectItemsURL || '/';

    var _jqFilter = _config.FilterControlID.length > 0
        ? $('#' + _config.FilterControlID)
        : { text: function () { return ''; }, length: 1 }; /* an empty emissary object as default */
    console.assert(_jqFilter.length == 1, 'Could not bind to a unique Filter source(' + _config.FilterControlID + ').');

    /*public*/
    this.page = _jqThis.data('page') || 1;
    this.pageCapacity = _jqThis.data('pageCapacity') || 10;

    /*priviliged*/
    Object.defineProperty(this, 'id',
    {
        get: function () { return _jqThis[0].id; },
        enumerable: true,
        writeable: false,
        configurable: false
    });

    this.ajaxRefresh = function ()
    {
        $.ajax(
        {
            url: _config.SelectItemsURL,
            data:
            {
                filter: _jqFilter.val(),
                page: this.page,
                pageCapacity: this.pageCapacity
            },
            type: 'get',
            datatype: 'json',
            success: function (feed)
            {
                _jqThis.empty();
                $(feed.itemRef).each(function (index, ref)
                {
                    var element = $('<div></div>');
                    _jqThis.append(element);
                    element = new Dander.Web.Shop.DisplayedItem(element, ref, _config.GetItemContentURL);
                    element.ajaxRefresh();
                });
            },
            error: function ()
            {
                console.log('SelectItem service is unavailable.');
            }
        });
        return this;
    };
}
Object.defineProperty(Dander.Web.Shop, 'ItemDisplay', { enumerable: false, writeable: false, configurable: false });

$(function ()
{
    $('.danderweb.item-display').each(function ()
    {
        var display = new Dander.Web.Shop.ItemDisplay($(this));
        display.ajaxRefresh();
    });
});