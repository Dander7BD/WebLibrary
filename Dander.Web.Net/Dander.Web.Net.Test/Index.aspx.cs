using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Dander.Web.Net.WebShop;

namespace Dander.Web.Net.Test
{
    internal class ItemDisplayURLs : ItemDisplay.IAjaxServiceURLs, ItemDisplay.IScriptFileURLs
    {
        private string siteUrl;
        public ItemDisplayURLs(string siteUrl)
        {
            this.siteUrl = siteUrl;
        }

        public IEnumerable<Uri> JavaScriptURL
        {
            get
            {
                return new Uri[]
                {
                    new Uri( this.siteUrl + "/Script/jquery-3.1.1.min.js" ),
                    new Uri( this.siteUrl + "/Script/itemDisplay.aspx" )
                };
            }
        }

        public Uri SelectItemsURL
        {
            get { return new Uri( this.siteUrl + "/api/itemdisplay/SelectItems" ); }
        }

        public Uri GetItemContentURL
        {
            get { return new Uri( this.siteUrl + "/api/itemdisplay/GetItemContent" ); }
        }
    }

    public partial class Index : System.Web.UI.Page
    {
        internal static readonly ItemDisplayURLs itemDisplayURLs = new ItemDisplayURLs( HttpContext.Current.Request.Url.AbsoluteUri.Replace(HttpContext.Current.Request.Url.AbsolutePath, string.Empty) );

        protected void Page_Load(object sender, EventArgs e)
        {
            this.itemDisplay.ScriptURL = itemDisplayURLs;
            this.itemDisplay.ServiceURL = itemDisplayURLs;
        }
    }
}