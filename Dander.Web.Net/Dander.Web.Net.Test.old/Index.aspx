<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="Dander.Web.Net.Test.Index" %>

<%@ Register Assembly="Dander.Web.Net" Namespace="Dander.Web.Net.WebShop" TagPrefix="DanderShop" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <asp:ScriptManager runat="server">
        </asp:ScriptManager>

        <asp:TextBox ID="TextBox1" runat="server" />
        <%
            this.ItemDisplay1.FilterControl = this.TextBox1;
            this.ShoppingCart1.BindItemDisplay( this.ItemDisplay1 );
            this.ShoppingCart1.BindAllItemDisplays = false;
        %>
        <DanderShop:ItemDisplay ID="ItemDisplay1" runat="server" />
        <DanderShop:ShoppingCart ID="ShoppingCart1" runat="server" />
    </form>
</body>
</html>
