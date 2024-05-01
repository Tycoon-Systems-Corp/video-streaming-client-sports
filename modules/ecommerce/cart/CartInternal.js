function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a,r=arguments[t];for(a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e}).apply(this,arguments)}import React from"react";import{fireGlobalEvent}from"../../utility/utility/event.js";import{CreditCard}from"../../payment/index.js";import{logout}from"/modules/utility/onboarding/SignIn.js";import{Cart}from"/layout/index.js";import{addToCart,calculateTotal,performPurchase,resolveCurrentStyle,resolveCurrentOption,resolveMoneyFormat,resolveRegionBasedPrice,updateCart,resolveImg}from"/modules/utility/ecommerce/ecommerce.js";import Inventory from"@mui/icons-material/Inventory";import{v4 as uuidv4}from"uuid";const Module=i=>{const[e,t]=React.useState(!1),[p,d]=React.useState(!1),[a,n]=React.useState(null);var[r,s]=React.useState(!0);const[o,u]=React.useState([]),[c,l]=React.useState(!1);var[m,g]=React.useState(!0);const[y,h]=React.useState(!1),[f,v]=React.useState(!1),C=React.useRef(),_=React.useRef(),R=(React.useEffect(()=>{e||(C.current.addEventListener("mouseover",R),t(!0))},[e]),()=>{i._LocalEventEmitter.dispatch("cart_update",{dispatch:"mouseOver"})});var b=React.useCallback(e=>{e&&i&&i._toggleSingleOpenMenu&&i._toggleSingleOpenMenu(e,"main_settings")},[i._openMenu]),P=(i._LocalEventEmitter.unsubscribe("cart_update"),i._LocalEventEmitter.subscribe("cart_update",e=>{let t=[...o];var a;e&&(console.log("Cart Update",e),"purchase"===e.dispatch?(t=t.filter(e=>e&&"purchase"!==e.type),a=i.devLocal?i.devAddress:"https://"+i.domainUrl,t.push({message:"Purchase success",href:a+"/r?o="+e.id,hrefCta:"View your Receipt Here",type:"purchase"}),u(t)):"flashCart"===e.dispatch?(l(!0),i.passOveride&&i.passOveride("cart"),setTimeout(()=>{l(!1)},1500)):"purchaseComplete"===e.dispatch?"paystack"===e.type&&(console.log("paystack purchase",e),a=setTimeout(()=>{d(!1)},2e4),T(e.data.snapshot,e.data.cart,a,e.data)):"mouseOver"===e.dispatch&&(console.log("Did mouse over",i,f),"cart"===i?._openMenu?.currentMenu)&&!f&&i._toggleSingleOpenMenu&&i._toggleSingleOpenMenu(null,"cart",!0))}),React.useCallback(e=>{n(null)})),E=React.useCallback(async t=>{try{if(console.log(t.currentTarget.getAttribute,p),!p&&t&&t.currentTarget&&t.currentTarget.getAttribute){d(!0);var a=t.currentTarget.getAttribute("styleId"),r=t.currentTarget.getAttribute("optionId"),s=t.currentTarget.getAttribute("quantity");const l=t.currentTarget.getAttribute("productId");var c={};Number(t.currentTarget.value)<Number(s)&&(c.decrement=!0);let e;var n,o,u=JSON.parse(localStorage.getItem("cart"));(e=l&&u&&u.items?u.items.find(e=>e.product.id===l):e)&&(n=await addToCart(i.apiUrl,i.domainKey,i._loggedIn,u,e.product,{style:a,option:r},d,c))&&"success"===n.status&&(updateCart(u,n.cart),n.cart)&&n.cart.items&&(o=n.cart.items.find(e=>e.product.id===l))&&(t.target.value=o.quantity),d(!1)}}catch(e){console.log(e),d(!1)}});const S="undefined"!=typeof window?JSON.parse(localStorage.getItem("cart")):null,T=async(t,a,e,r={})=>{if(i._loggedIn)if(0<i?._stripeSecret?.card?.data.length)n({message:"You must add a Credit Card to Purchase",placement:"purchase"}),d(!1);else{var s=await performPurchase(i.apiUrl,i.domainKey,i._loggedIn,a,d,{snapshot:t,extra:r});if(console.log(s),s)if(e&&clearTimeout(e),d(!1),console.log(s),"success"===s.status){s.data&&s.data.cart&&updateCart(i._cart,s.data.cart);let e=[...o];e=e.filter(e=>e&&"purchase"!==e.type);var c=i.devLocal?i.devAddress:"https://"+i.domainUrl;e.push({message:"Purchase success",href:c+"/r?o="+s.data.order.id,hrefCta:"View your Receipt Here",type:"purchase"}),u(e),fireGlobalEvent({event:"product_purchase",status:"success",prePurchaseCart:a,cart:s.data.cart,snapshot:t,extra:r,receipt:s.data.order.id,receiptUrl:c+"/r?o="+s.data.order.id},i._LocalEventEmitter),console.log("Purchase Success",s)}else n({message:"Purchase failed",placement:"purchase"}),fireGlobalEvent({event:"product_purchase",status:"failed",prePurchaseCart:a,snapshot:t,extra:r},i._LocalEventEmitter);else e&&clearTimeout(e),d(!1),n({message:"Purchase failed",placement:"purchase"})}else n({message:"You must sign in to purchase",placement:"purchase"}),d(!1)},O=React.useMemo(()=>{const t=S?.items&&S.items[0];if(t?.product?.styles){var e=t.product.styles.find(e=>e.sid===t.style);if(e){const a=resolveRegionBasedPrice(i,e);if(console.log(a),a){const r=[];e={items:S.items.filter(t=>{var e=t.product.styles.find(e=>e.sid===t.style);if(e){e=resolveRegionBasedPrice(i,e);if(e&&e.currency===a.currency)return!0}return r.push(t),!1}),currency:a,user:S.user};return e.remaining=r,e}}}},[i,S]);var k=React.useCallback(async e=>{try{if(!p){d(!0);var t=setTimeout(()=>{d(!1)},2e4);n(null),console.log(O);const a=calculateTotal(O,null,{region:O?.currency??null,object:!0},i);if(console.log("snapshot",a,i._solution),i._solution){if("stripe"===i._solution.payment)T(a,O,t,{type:"stripe"});else if("paystack"===i._solution.payment&&PaystackPop&&i?.paymentConfig?.keys?.paystack&&i?._loggedIn?.email){const r=uuidv4();clearTimeout(t),O?.currency?.currency&&(await PaystackPop.setup({key:i.paymentConfig.keys.paystack,email:i._loggedIn.email,amount:100*a.total,currency:O.currency.currency,ref:r,callback:function(e){i._LocalEventEmitter.dispatch("cart_update",{dispatch:"purchaseComplete",type:"paystack",data:{cart:O,paystackResponse:e,snapshot:a,status:"payment_complete",transactionRef:r,type:"paystack"}})},onClose:function(){d(!1),n({message:"Purchase failed",placement:"purchase"})}})).openIframe()}}else d(!1),n({message:"Purchase currently not supported in your Country",placement:"purchase"})}}catch(e){d(!1)}}),M=(React.useEffect(()=>{var e;"cart"!==i?._openMenu?.currentMenu&&!c||y?"cart"!==i?._openMenu?.currentMenu&&!c&&y&&(v(!0),e=setTimeout(()=>{v(!1),h(!1),_.current=null},500),_.current=e):(h(!0),v(!1),_?.current&&clearTimeout(_.current))},[i?._openMenu?.currentMenu,f,y,_?.current]),calculateTotal(O,null,{region:O?.currency??null,object:!0},i)),M=M&&Object.prototype.hasOwnProperty.call(M,"total")&&0===M.total&&0<S?.items?.length;return React.createElement(React.Fragment,null,React.createElement(Cart,_extends({},i,{fetchBusy:p,menuOpen:y,closing:f,cart:S,useCartOfCurrency:O,handleUpdateQuantity:E,handlePerformPurchase:k,handleClearError:P,pageError:a,free:M,validCc:r,setValidCc:s,cartMessages:o,handleToggleSettings:b,showContent:m,setShowContent:g,ccChildren:i?.ccChildren,container:C,setPageError:n})))};export default Module;