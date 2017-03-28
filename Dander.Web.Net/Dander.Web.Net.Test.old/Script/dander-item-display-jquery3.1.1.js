Dander.Web.Shop.ItemDisplay = /*constructor*/ function (/*jqeuryObject*/ _jqThis)
{
    console.assert(_jqThis.length == 1, 'Argument is required represent a unique DOM element wrapped as a JQuery Object.');

    /*inheritance*/
    Dander.Web.Shop.Abstract.ItemDisplay.call(this);

    /*private*/
    var _config = _jqThis.data('config');
    console.assert(typeof _config != 'undefined', 'Could not load the config data.');

    // ensuring that these do have values
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
        var _requestData =
        {
            CallerID: this.id,
            Filter: _jqFilter.val(),
            Page: this.page,
            PageCapacity: this.pageCapacity
        };
        $.ajax(
        {
            url: _config.SelectItemsURL,
            data: _requestData,
            type: 'get',
            datatype: 'json',
            success: function (feed)
            {

                // todo: clear items, populate with new and then ajaxRefresh those
            },
            error: function ()
            {
                console.log('SelectItem service is unavailable.');
            }
        });
        //            success: function (feed)
        //            {
        //                var caller = $('#' + feed.callerID);
        //                var output = caller.children('.response');
        //                var template = caller.children('.template');

        //                output.empty();
        //                $(feed.books).each(function ()
        //                {
        //                    var item = $(template.html());
        //                    item.find('.title').html(this.Title);
        //                    item.find('.author').html(this.Author);
        //                    item.find('.price').html(parseFloat(this.Price).toFixed(2).toString());
        //                    item.find('.id').html(this.ID);
        //                    if (!this.InStock) item.addClass('stock-shortage');
        //                    output.append(item);
        //                });
        //            },
        //        });

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
        console.debug(display.id);
    });
});

//$(function ()
//{
//    function onChange()
//    {
//        $.ajax({
//            url: '/bookservice/',
//            data:
//            {
//                action: 'search',
//                callerID: $(this).parent().attr('id'),
//                search: $(this).val()
//            },
//            type: 'get',
//            dataType: 'json',
//            success: function (feed)
//            {
//                var caller = $('#' + feed.callerID);
//                var output = caller.children('.response');
//                var template = caller.children('.template');

//                output.empty();
//                $(feed.books).each(function ()
//                {
//                    var item = $(template.html());
//                    item.find('.title').html(this.Title);
//                    item.find('.author').html(this.Author);
//                    item.find('.price').html(parseFloat(this.Price).toFixed(2).toString());
//                    item.find('.id').html(this.ID);
//                    if (!this.InStock) item.addClass('stock-shortage');
//                    output.append(item);
//                });
//            },
//            error: function () { console.log('Book search feed is unavailable.'); },
//        });
//    }

//    $('.book-search').on('input', '.filter-input', onChange);
//    // preloading to ensure that there is content presented before the user starts to add filter
//    $('.book-search > .filter-input').trigger('input');
//});