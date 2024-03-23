import React from"react";import{useRouter}from"next/router";import{checkSignedIn,attemptThirdPartySignIn}from"../../utility/onboarding/SignIn";import{setStripeSecretData}from"../../utility/payment/index";import{fetchPost}from"../../utility/fetch";const Module=n=>{const t=useRouter(),i=t["asPath"];let a=React.useRef();const[e,o]=React.useState(!1),[r,c]=React.useState(!1);let[,s]=React.useState(!1),[d,l]=React.useState(!1),[u,m]=React.useState(!1),[g,h]=React.useState(null);React.useEffect(()=>{o(!0)},[e]),n._LocalEventEmitter.unsubscribe("showSignIn"),n._LocalEventEmitter.subscribe("showSignIn",e=>{m(!1),f(500)}),n._LocalEventEmitter.unsubscribe("checkAdminAuth"),n._LocalEventEmitter.subscribe("checkAdminAuth",e=>{_(!0)}),React.useEffect(()=>{document.addEventListener("mute-login-error",()=>{h(null)},{once:!0})},[]);const p=async e=>{e=await attemptThirdPartySignIn(e,n.apiUrl,n.domainKey,n._LocalEventEmitter,n._setAdminAuth);e&&e.hasOwnProperty("username")&&(e.username||s(!0)),console.log(e),"error"!=typeof e&&(setStripeSecretData(n.apiUrl,n.domainKey,e,n._setStripeSecret),n._setLoggedIn(e),console.log(n.redirectOnAuth,e.username),"/admin"===i&&setTimeout(()=>{n._LocalEventEmitter.dispatch("checkAdminAuth",{})},1e3),n.redirectOnAuth&&e.username&&i!==n.redirectOnAuth?t.push(n.redirectOnAuth):n.redirectOnAuth&&e.username&&i===n.redirectOnAuth&&t.reload(n.redirectOnAuth),setTimeout(()=>{h(null)},2e4),setTimeout(()=>{m(!0)}))},f=e=>{try{if(!d){const t={theme:"outline",size:"medium",logo_alignment:"center"};setTimeout(()=>{try{var e=checkSignedIn();e?n._setLoggedIn(e):(google.accounts.id.renderButton(a.current,t),l(!0),google.accounts.id.prompt(e=>{console.log("on prompt notification",e)}))}catch(e){setTimeout(()=>{try{var e=checkSignedIn();e?n._setLoggedIn(e):(google.accounts.id.renderButton(a.current,t),l(!0),google.accounts.id.prompt(e=>{console.log("on prompt notification",e)}))}catch(e){console.log(e)}},1e4)}},e)}}catch(e){console.log(e)}},_=(React.useEffect(()=>{document.removeEventListener("thirdparty-signin",p),document.addEventListener("thirdparty-signin",p),f(500)},[]),async e=>{(n?.path.match(/\/admin/)&&!r||e)&&(console.log(n),n?._loggedIn?.identifier)&&n?._loggedIn?.hash&&n?.domainKey&&!n._adminAuth&&n?._setAdminAuth&&(c(!0),(e=await(async(e,t,n,i)=>{if(t)return!!(e=await fetchPost(e+"/m/checkadminauth",null,null,{identifier:t,hash:n,domainKey:i}))&&(e.hasOwnProperty("status")?"disauthenticated"==e.status?(logout(),"disauthenticated"):"failed"!=e.status&&("success"==e.status?e:void 0):void 0)})(n.apiUrl,n._loggedIn.identifier,n._loggedIn.hash,n.domainKey))?.admin)&&n._setAdminAuth(e.admin)});React.useEffect(()=>{n?._loggedIn?.identifier&&n?._adminAuth?.userid&&n._loggedIn.identifier!==n._adminAuth.userid&&n._setAdminAuth(null)},[n._loggedIn,n._adminAuth]),_();var y=(()=>{try{var e=document.getElementsByClassName("google-sign-in-btn");return e&&e[0]&&0<e[0].children.length&&e[0].children[0]?(console.log(e[0].children[0]),!0):!1}catch(e){return!1}})();return React.createElement("div",{className:n.classNameAlways+" "+(n._loggedIn||!y?"":n.className)}," ",React.createElement("div",{className:u||!y?"display-none":null,style:{maxWidth:n.maxWidth??"170px"}},React.createElement("div",{className:d?"googleSignInContainer googleSignInContainer-padding":"googleSignInContainer"},React.createElement("div",{className:"g_id_signin google-sign-in-btn",ref:a,"data-size":"medium","data-logo_alignment":"center","data-theme":"outline"}))),g?React.createElement("div",{style:{paddingLeft:"1rem",paddingRight:"1rem"}},React.createElement("p",{className:"googleSignInPromptSmall error errorBg"},g)):null)};export default Module;