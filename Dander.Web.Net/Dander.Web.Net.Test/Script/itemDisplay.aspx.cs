using System;
using Dander.Web.Net.WebShop;

namespace Dander.Web.Net.Test.Script
{
    public partial class itemDisplay : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.Write( ItemDisplay.GetJavaScript_AbstractBase() );
            Response.Write( ItemDisplay.GetJavaScript_Implemented(JSPlatformEnum.JQUERY311) );
        }
    }
}