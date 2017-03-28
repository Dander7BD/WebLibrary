using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.Serialization;
using System.Text;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web;
using System.Web.Http;
using System.Runtime.Serialization.Json;
using System.IO;

namespace Dander.Web.Net.WebShop
{
    [ToolboxData( "<{0}:ShoppingCart runat=\"server\" />" )]
    public class ShoppingCart : WebControl
    {
        public ShoppingCart() : base( HtmlTextWriterTag.Div )
        {
            this.CssClass = string.Empty; // force init or there is no guarantee that the class attribute is rendered
        }

        #region AJAX Client Configurations

        //[DataContract]
        //private class ClientConfigData
        //{
        //    [DataMember]
        //    public string FilterControlID = string.Empty;

        //    [DataMember]
        //    public Uri SelectItemsURL;

        //    [DataMember]
        //    public Uri GetItemContentURL;

        //    internal string AsJson()
        //    {
        //        DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(ClientConfigData));
        //        using( MemoryStream buffer = new MemoryStream( 256 ) )
        //        {
        //            serializer.WriteObject( buffer, this );
        //            return Encoding.Default.GetString( buffer.ToArray() );
        //        }
        //    }
        //}
        //private ClientConfigData clientConfig = new ClientConfigData();

        //private string dataConfigAttribute
        //{ set { this.Attributes["data-config"] = value; } }

        //public string BoundFilterControlID
        //{
        //    get { return this.clientConfig.FilterControlID; }
        //    private set
        //    {
        //        this.clientConfig.FilterControlID = value;
        //        this.dataConfigAttribute = this.clientConfig.AsJson();
        //    }
        //}
        //public ITextControl FilterControl
        //{
        //    set
        //    {
        //        if( value != null )
        //        {
        //            Debug.Assert( value is WebControl, "The ItemDisplay.FilterControl property is required to be a Webcontrol instance implementing the ITextControl interface." );
        //            this.BoundFilterControlID = (value as WebControl).ID;
        //        }
        //        else
        //            this.BoundFilterControlID = string.Empty;
        //    }
        //}

        #region URLs for JavaScripts & AJAX Request sources
        //public interface IScriptFileURLs
        //{
        //    /// <summary>
        //    /// Expected to return a list of URLs to required JavaScripts in order of dependency .
        //    /// </summary>
        //    IEnumerable<Uri> JavaScriptURL { get; }
        //}

        //public interface IAjaxServiceURLs
        //{
        //    /// <summary>
        //    /// Expected to return the URL where the AJAX JavaScript may call it's SelectItems GET request.
        //    /// See AjaxSearchRequest & AjaxSearchResponse for expected protocol for request arguments and response.
        //    /// Service contract syntax: AjaxSearchResponse SelectItems(AjaxSearchRequest)
        //    /// </summary>
        //    Uri SelectItemsURL { get; }

        //    /// <summary>
        //    /// Expected to return the URL where the AJAX JavaScript may call it's GetItemContent GET request.
        //    /// See AjaxSearchRequest & AjaxSearchResponse for expected protocol for request arguments and response.
        //    /// Service contract syntax: AjaxItemResponse SelectItems(AjaxItemRequest)
        //    /// </summary>
        //    Uri GetItemContentURL { get; }
        //}

        //[DataContract]
        //public class SelectItemsResponse
        //{
        //    [DataMember(Name = "itemRef")]
        //    public IEnumerable<string> ItemRef;
        //}

        //[DataContract]
        //public class GetItemContentResponse
        //{
        //    private static readonly HtmlString emptyHTML = new HtmlString(string.Empty);

        //    private HtmlString html = emptyHTML;

        //    /// <summary>
        //    /// HTML content to be displayed
        //    /// </summary>
        //    [DataMember( Name = "htmlContent" )]
        //    public string HTMLContent
        //    {
        //        get { return this.html.ToHtmlString(); }
        //        set { this.html = new HtmlString( value ); }
        //    }

        //    /// <summary>
        //    /// If true, then the entire item control is treated as a Shoppingcart button.
        //    /// If false, then an internal control in HTMLContent will need the HTML-class 'click-add-to-cart' in order to trigger the Shoppingcart.
        //    /// </summary>
        //    [DataMember(Name = "enableWholeAsButton")]
        //    public bool EnableWholeAsButton = true;
        //}

        [DataContract]
        public class UpdateItemResponse
        { }
        
        /// <summary>
        /// Interface to be implemented by a APIController instance
        /// </summary>
        public interface IApiController
        {
            [HttpPost]
            UpdateItemResponse UpdateShoppingCartItem();

            [HttpPost]
            GetItemContentResponse GetShoppingCartItems(string itemRef);
        }

        //public IScriptFileURLs ScriptURL
        //{
        //    set
        //    {
        //        try
        //        {
        //            var scripts = ScriptManager.GetCurrent( this.Page ).Scripts;
        //            foreach( Uri url in value.JavaScriptURL )
        //                scripts.Add( new ScriptReference( url.AbsolutePath ) );
        //        }
        //        catch( NullReferenceException )
        //        {
        //            throw new Exception( this.Page.Title + "(aspx-file) is required to provide a ScriptManager!" );
        //        }
        //    }
        //}
        //public IAjaxServiceURLs ServiceURL
        //{
        //    set
        //    {
        //        this.clientConfig.SelectItemsURL = value.SelectItemsURL;
        //        this.clientConfig.GetItemContentURL = value.GetItemContentURL;
        //        this.dataConfigAttribute = this.clientConfig.AsJson();
        //    }
        //}

        #endregion
        #endregion
        #region Static Resources       
        //public static string GetJavaScript_AbstractBase()
        //{
        //    return JavaScripts.dander_web_net_1_0_0;
        //}

        //public static string GetJavaScript_Implemented(JSPlatformEnum platform)
        //{
        //    switch( platform )
        //    {
        //        case JSPlatformEnum.JQUERY311:
        //            return JavaScripts.dander_item_display_jquery3_1_1;
        //        default:
        //            throw new NotImplementedException( "Library developers have missed implementing/providing the resource for this JS platform (" + platform.ToString() + ").\nThis should never happen!" );
        //    }
        //}
        #endregion

        public override string CssClass
        {
            set { base.CssClass = "danderweb shopping-cart" + (value.Length > 0 ? " " + value : ""); }
        }
        protected override string TagName
        {
            get { return "Web Shopping Cart"; }
        }
    }
}
