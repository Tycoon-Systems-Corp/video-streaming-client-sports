import React from"react";import Link from"next/link";const Module=e=>React.createElement(React.Fragment,null,e._loggedIn?React.createElement(React.Fragment,null,React.createElement(Link,{href:"/settings",className:"menuLinkSelector",onClick:e?.handleToggleSettings,style:{position:"relative",alignSelf:"center"}},React.createElement("li",null,React.createElement("div",{className:"material-icons"},"settings"),React.createElement("div",null,"Settings")))):null);export default Module;