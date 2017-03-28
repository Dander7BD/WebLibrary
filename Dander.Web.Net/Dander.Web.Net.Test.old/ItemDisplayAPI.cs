using System.Web.Http;
using Dander.Web.Net.WebShop;

namespace Dander.Web.Net.Test
{
    [RoutePrefix( "api/itemdisplay" )]
    public class ItemDisplayAPI : ApiController, ItemDisplay.IApiController
    {
        [HttpGet]
        public ItemDisplay.GetItemContentResponse GetItemContent(string itemRef)
        {
            switch( itemRef )
            {
                case "pi000":
                    return new ItemDisplay.GetItemContentResponse()
                    {
                        EnableWholeAsButton = true,
                        HTMLContent = "<img src='/Img/mini_cooper.png'>"
                    };
                case "pi001":
                    return new ItemDisplay.GetItemContentResponse()
                    {
                        EnableWholeAsButton = true,
                        HTMLContent = "Green socks"
                    };
                case "HelloWorld":
                    return new ItemDisplay.GetItemContentResponse()
                    {
                        EnableWholeAsButton = false,
                        HTMLContent = "Hello <a class='click-add-to-cart'>World</a>!"
                    };
                default:
                    return new ItemDisplay.GetItemContentResponse()
                    {
                        EnableWholeAsButton = false
                    };
            }
        }

        [HttpGet]
        public ItemDisplay.SelectItemsResponse SelectItems(string filter, int page = 1, int pageCapacity = 10)
        {
            return new ItemDisplay.SelectItemsResponse()
            {
                ItemRef = new string[] { "pi000", "pi001", "HelloWorld" }
            };
        }
    }
}