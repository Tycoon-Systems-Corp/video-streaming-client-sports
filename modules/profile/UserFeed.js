function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r,i=arguments[t];for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e}).apply(this,arguments)}import React from"react";import GridList from"../video/player/gridList";const Module=e=>React.createElement("div",{className:"ProfilePage_Feed"},React.createElement(GridList,_extends({loggedIn:e._loggedIn,_gridItems:e?.combinedFeed??[],_gridListType:"video"},e)));export default Module;