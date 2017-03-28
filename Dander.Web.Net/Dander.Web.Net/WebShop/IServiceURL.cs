using System;
using System.Runtime.Serialization;
using System.Web;

namespace Dander.Web.Net.WebShop
{
    namespace DataContract
    {
        [DataContract]
        public class FilterRequest
        {
            [DataMember]
            public string CallerID = "";

            [DataMember]
            public string Filter = "";

            [DataMember]
            public int Page = 1;

            [DataMember]
            public int PageCapacity = 10;
        }

        [DataContract]
        public class ShoopingCartRequest
        {
            [DataMember]
            public string CallerID = "";
        }

        [DataContract]
        public class UpdateCartItemRequest
        {
            [DataMember]
            public string CallerID = "";

            [DataMember]
            public string ItemID = "";

            [DataMember]
            public int Count = 0;
        }
    }

    public interface ISelectItemsURL
    {
        string SelectItemsURL { get; }
    }

    public interface IGetShoppingCartItemsURL
    {
        string GetShoppingCartItemsURL { get; }
    }

    public interface IUpdateShoppingCartItemServiceContractURL
    {
        string UpdateShoppingCartItemURL { get; }
    }

    public interface IServiceContractURL
        : ISelectItemsURL, IGetShoppingCartItemsURL, IUpdateShoppingCartItemServiceContractURL
    { }

    // used as a default that informs developers to provide their own implementations
    public class NotImplementedServiceContractURL : IServiceContractURL
    {
        public static readonly NotImplementedServiceContractURL Constant = new NotImplementedServiceContractURL();

        public string SelectItemsURL            { get { throw new NotImplementedException(); } }
        public string GetShoppingCartItemsURL   { get { throw new NotImplementedException(); } }
        public string UpdateShoppingCartItemURL { get { throw new NotImplementedException(); } }
    }
}
