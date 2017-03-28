<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="Dander.Web.Net.Test.Index" %>
<%@ Register Assembly="Dander.Web.Net" Namespace="Dander.Web.Net.WebShop" TagPrefix="DanderShop" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <asp:ScriptManager runat="server" />
        <asp:TextBox ID="filterBox" runat="server" />
        <% this.itemDisplay.FilterControl = this.filterBox; %>
        <DanderShop:ItemDisplay ID="itemDisplay" runat="server" />
    </form>
</body>
</html>
