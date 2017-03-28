// defining up "namespaces"
Dander =
{
	Utility: {},
	Abstract: {},
	Web:
	{
		Abstract: {},
		Shop:
        {
            Abstract: {}
        }
	}
};

Dander.Utility.assertNoneEmptyString = function (/*any*/ arg)
{
	console.assert(typeof arg == 'string' && arg.length > 0, 'Argument is required to be a none-empty string.');
}
Object.defineProperty(Dander.Utility, 'assertNoneEmptyString', { enumerable: false, writeable: false, configurable: false });

Dander.Utility.assertInt1plus = function (/*any*/ arg)
{
	var v = arg;
	if (typeof v != 'number')
		v = parseInt(arg, 10);

	console.assert(v >= 1 && Math.floor(v) == v, 'Argument (or parseInt(arg, 10)) is required to be an integral value greater than 0.');
};
Object.defineProperty(Dander.Utility, 'assertInt1plus', { enumerable: false, writeable: false, configurable: false });

Dander.Utility.assertFunction = function (/*any*/ arg)
{
	console.assert(typeof arg == 'function', 'Argument is required to be a function.');
}
Object.defineProperty(Dander.Utility, 'assertFunction', { enumerable: false, writeable: false, configurable: false });

Dander.Utility.assertObject = function (/*any*/ arg)
{
    console.assert(typeof arg == 'object', 'Argument is required to be an Object.');
}
Object.defineProperty(Dander.Utility, 'assertObject', { enumerable: false, writeable: false, configurable: false });

Dander.Utility.assertAbstract = function (/*object*/ arg)
{
	console.assert(arg instanceof Dander.IAbstract, 'Argument is required to be a sub instance of Dander.IAbstract.');
}
Object.defineProperty(Dander.Utility, 'assertAbstract', { enumerable: false, writeable: false, configurable: false });

Dander.Abstract.IOverrideableContract = /*constructor*/ function (/*this object*/ _this, /*function*/ assertArguments, /*function*/ assertReturn)
{
    Dander.Utility.assertObject(_this);
	Dander.Utility.assertFunction(assertArguments);
	Dander.Utility.assertFunction(assertReturn);

    /*private*/
	var _functionHook = function () { console.error('IOverrideableContract method is missing implementation.'); };
	var _functionRun = function ()
	{
	    assertArguments.apply(_this, arguments[0]);
		var output = _functionHook.apply(_this, arguments[0]);
		assertReturn.call(_this, output);
		return output;
	};

	/*priviliged*/
	Object.defineProperty(this, 'callFunction',
	{
		get: function ()
		{
			return _functionRun;
		},
		set: function (/*function(..)*/ func)
		{
			Dander.Utility.assertFunction(func);
			_functionHook = func;
		},
		enumerable: false,
		configurable: false,
		writeable: false
	});
};
Object.defineProperty(Dander.Abstract, 'IOverrideableContract', { enumerable: false, writeable: false, configurable: false });

Dander.Web.Abstract.AjaxRefreshAble = /*constructor*/ function ()
{
	/*private*/
    var _ajaxRefresh = new Dander.Abstract.IOverrideableContract(
        this,
		function ()		{ console.assert(arguments.length == 0, 'Usage: Object(this) AjaxRefreshAble.ajaxRefresh(void).'); },
		function (out)	{ console.assert(out === this, 'Alert: Assigned AjaxRefreshAble.ajaxRefresh(void) implementation is expected to return Object(this).'); });
	_ajaxRefresh.callFunction = function ()
	{
		console.error('Object(this) AjaxRefreshAble.ajaxRefresh(void) is missing an implementation!');
		return this;
	};

	/*priviliged*/
	Object.defineProperty(this, 'ajaxRefresh',
	{
		get: function (/*void*/) { return _ajaxRefresh.callFunction; },
		set: function (/*function(void)*/ func) { _ajaxRefresh.callFunction = func; },
		enumerable: false,
		configurable: false,
		writeable: false
	});
};
Object.defineProperty(Dander.Web.Abstract, 'AjaxRefreshAble', { enumerable: false, writeable: false, configurable: false });

Dander.Web.Abstract.HavePages = /*constructor*/ function ( /*void*/)
{
	/* private*/
	var _page = 1;
	var _pageCapacity = 10;

	/* priviliged*/
	Object.defineProperty(this, 'page',
	{
		get: function () { return _page; },
		set: function (/*int {1+}*/ arg_page)
		{
			Dander.Utility.assertInt1plus(arg_page);
			_page = arg_page;
		},
		enumerable: true,
		configurable: false,
		writeable: false
	});

	Object.defineProperty(this, 'pageCapacity',
	{
		get: function () { return _pageCapacity; },
		set: function (/*int {1+}*/ arg_capacity)
		{
			Dander.Utility.assertInt1plus(arg_capacity);
			_pageCapacity = arg_capacity;
		},
		enumerable: true,
		configurable: false,
		writeable: false
	});
};
Object.defineProperty(Dander.Web.Abstract, 'HavePages', { enumerable: false, writeable: false, configurable: false });

// COMPOSING
Dander.Web.Shop.Abstract.ItemDisplay = /*constructor*/ function ( /*void*/)
{
    Dander.Web.Abstract.HavePages.call(this);
    Dander.Web.Abstract.AjaxRefreshAble.call(this);
};
Object.defineProperty(Dander.Web.Shop.Abstract, 'ItemDisplay', { enumerable: false, writeable: false, configurable: false });

//todo clean up Object.defineProperty with a single Object.defineProperties