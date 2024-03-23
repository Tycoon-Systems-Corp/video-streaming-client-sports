import React from"react";import Tooltip from"@mui/material/Tooltip";import{resolveDefaultStyle,resolveImg,doUploadImageForLineupParticipant}from"../../utility/ecommerce";import{getFormattedTime}from"../../util";import PIMStyles from"./ProductImageManager.module.scss";import{allowedTypes,defaultLineup}from"./defaults";import{v4 as uuidv4}from"uuid";const Module=a=>{const[t,e]=React.useState({}),[i,n]=React.useState(null),[l,r]=React.useState(null),[u,d]=React.useState(null);var o=React.useRef();const p=React.useRef(),c=React.useRef(),m=React.useRef();resolveDefaultStyle(a.product,t,e,i,n);const s=React.useCallback(e=>{var t;e.currentTarget&&e.currentTarget.getAttribute("option")&&(t={...a.product.detailmeta},"add"===e.currentTarget.getAttribute("option")?t.lineup&&t.lineup.length<10&&(t.lineup.push(defaultLineup()),a.setCurrentLineupEditing(t.lineup.length-1),d(t.lineup[t.lineup.length-1].id),p.current.value="",c.current.value="",m.current.value=null):"remove"===e.currentTarget.getAttribute("option")?t.lineup&&0<t.lineup.length&&(t.lineup.pop(),a.setCurrentLineupEditing(-1<t.lineup.length-1?t.lineup.length-1:null),0!==t.lineup.length&&d(t.lineup[t.lineup.length-1].id),p.current.value="",c.current.value="",m.current.value=null):"setSelected"===e.currentTarget.getAttribute("option")&&(e=e.currentTarget.getAttribute("index"),isNaN(e)||(a.setCurrentLineupEditing(e),d(t.lineup[e].id),p.current.value=t.lineup[e].title,c.current.value=t.lineup[e].description,m.current.value=t.lineup[e].time)))}),g=(React.useEffect(()=>{let e=a.currentLineupEditing;null===a.currentLineupEditing&&(a.setCurrentLineupEditing(0),e=0),a.editing&&a.editing.detailmeta&&a.editing.detailmeta.lineup&&0<a.editing.detailmeta.lineup.length&&a.editing.detailmeta.lineup[e]&&p.current&&(d(a.editing.detailmeta.lineup[e].id),p.current.value=a.editing.detailmeta.lineup[e].title,c.current.value=a.editing.detailmeta.lineup[e].description,m.current.value=a.editing.detailmeta.lineup[e].time)},[a.currentLineupEditing,a.editing.id,a?.editing?.detailmeta?.lineup,p.current,c.current,m.current]),React.useRef()),y=React.useCallback(e=>{a?.setWarning&&a.setWarning(null),r(e.currentTarget.getAttribute("lineupid")),setTimeout(()=>{g.current&&g.current.click()},1)});var f=React.useCallback(e=>{try{if(e&&e.target&&e.target.files){var t=e.target.files;if(t&&0<t.length){const n=Array.from(t).slice(0,1<t.length?1:t.length).filter(e=>e.type&&-1<allowedTypes.indexOf(e.type)).map(e=>{var t=e.slice(0,e.size,e.type),i=allowedTypes[allowedTypes.indexOf(e.type)].match(/\/([a-zA-Z0-9].*)/)[1];return new File([t],uuidv4()+"."+i,{type:e.type})});a?.product?.new&&a?.appendFormData?a.appendFormData(n,"lineup",l):(async()=>{if(!a.fetchBusy&&a.apiUrl&&a.domainKey&&a._loggedIn&&a.editing&&a.publishProduct){const t=new FormData,i=[];n&&(n.forEach(e=>{t.append("image",e),i.push({name:e.name,modif:"lineup"})}),t.append("imgNames",JSON.stringify(i))),t.append("domainKey",a.domainKey),t.append("hash",a._loggedIn.hash),t.append("identifier",a._loggedIn.identifier),t.append("product",a.editing.id),t.append("detailmeta",JSON.stringify(a.editing.detailmeta)),t.append("lineupid",l);new Promise(async(t,e)=>{try{t(await a.publishProduct("publish","true",!0))}catch(e){t(null)}}).then(async()=>{a.setFetchBusy&&(a.setFetchBusy(!0),setTimeout(()=>{a.setFetchBusy(!1)},1e4)),console.log(a.editing);var e=await doUploadImageForLineupParticipant(a.apiUrl,a.domainKey,a.editing.id,a._loggedIn,t);e&&e.product&&e.product.products?(g?.current?.value&&(g.current.value=null),a.setFetchBusy&&a.setFetchBusy(!1),a.setCombinedFeed&&(console.log("Set Combined Feed",e.product.products,a.setCombinedFeed),a.setCombinedFeed(e.product.products),a.setEditing)&&(e=e.product.products.find(e=>e.id===a.editing.id))&&(a.setEditing(e),e.detailmeta)&&a.setEditingOptionsMeta(e.detailmeta)):g.current=null})}})()}}}catch(e){console.log(e),a?.setWarning&&a.setWarning({message:"There was an issue uploading images"})}}),h=t&&a.product&&a.product.styles&&a.product.styles.find(e=>e.sid===t)?a.product.styles.find(e=>e.sid===t):null,v=h&&h.option?i?h.option.find(e=>e.sid===i):h.option[0]||null:null,R=(a.product&&a.product.owner&&a._loggedIn&&a._loggedIn.identifier&&(a._loggedIn.identifier,a.product.owner),console.log(a.product,a.editingOptionsMeta,t,"$",a.currentDefinePriceCurrency,a.priceInput,h,a.editing,a.currentLineupEditing),a?.editing?.id&&a?.product?.id&&a.editing.id===a.product.id),R=R&&a?.editingOptionsMeta||!R&&a.product.detailmeta;return React.createElement("div",{className:""+a.className,id:a.product&&a.product.id?a.product.id:"",selectedstyle:h?.sid?h.sid:"",currentoption:v?.sid?v.sid:""},"virtual"===a?.editingOptionsMeta?.productType?React.createElement("div",null,React.createElement("div",null,R.livestream?React.createElement("div",{style:{background:"#222222",marginTop:".25rem",marginBottom:".25rem",borderRadius:".25rem",padding:".25rem"}},React.createElement("div",{style:{fontSize:".8rem",fontWeight:"600"}},"Lineup"),React.createElement("div",null,React.createElement("div",{style:{fontSize:".6rem"},ref:o},u??""),React.createElement(Tooltip,{title:"Enter participants name",placement:"right"},React.createElement("input",{type:"text",placeholder:"Name",style:{fontSize:".8rem",width:"100%"},onInput:a.setOptionsMetaData,option:"lineupTemp",option2:"title",ref:p})),React.createElement(Tooltip,{title:"Optional: Enter description of participant",placement:"right"},React.createElement("input",{type:"text",placeholder:"Description",style:{fontSize:".8rem",width:"100%"},onInput:a.setOptionsMetaData,option:"lineupTemp",option2:"description",ref:c})),React.createElement(Tooltip,{title:"Optional: Enter expected time for lineup participant to be performing",placement:"right"},React.createElement("input",{type:"time",placeholder:"Time",style:{fontSize:".8rem",width:"100%"},onInput:a.setOptionsMetaData,option:"lineupTemp",option2:"time",ref:m})),React.createElement("div",{className:"flex gap-p2",style:{alignItems:"center",marginTop:".125rem"}},a.product.detailmeta.lineup&&a.product.detailmeta.lineup.length<10&&-1<a.product.detailmeta.lineup.length?React.createElement(Tooltip,{title:"Add another Lineup Participant",placement:"bottom"},React.createElement("button",{style:{width:"100%",padding:".125rem 0"},onClick:s,option:"add"},"Add")):null,a.product.detailmeta.lineup&&a.product.detailmeta.lineup[a.currentLineupEditing]?React.createElement(Tooltip,{title:"Remove this Lineup Participant",placement:"bottom"},React.createElement("button",{style:{width:"100%",padding:".125rem 0"},onClick:s,option:"remove"},"Remove")):null),React.createElement("div",{className:"flex gap-p2",style:{overflowX:"auto",overflowY:"hidden",marginTop:".125rem"}},a.product.detailmeta.lineup&&a.product.detailmeta.lineup.map?a.product.detailmeta.lineup.map((e,t)=>React.createElement("div",{className:"lineupItem_editing "+(e.id===u?"lineupItem_current":""),style:{maxWidth:"75px"},onClick:s,option:"setSelected",index:t,key:t},React.createElement("div",{style:{fontSize:".7rem",fontWeight:"600",overflowWrap:"anywhere"}},""!==e.title?e.title:React.createElement("div",{style:{opacity:".7"}},"Participant")),React.createElement("div",{style:{marginTop:".125rem"}},React.createElement("div",{className:"ProductImageManager_container",style:{position:"relative",width:"68px",height:"68px"}},React.createElement("div",{className:""+PIMStyles.productImageListThumbnailContainer,style:{backgroundImage:`url(${a.cdn.static}/${e.image})`,height:"68px",backgroundSize:"cover",borderRadius:"1rem"}},React.createElement(Tooltip,{title:"Click here to upload an image for your lineup participant",placement:"bottom"},React.createElement("div",{className:PIMStyles.changeImageButtonSmall+" image material-icons",onClick:y,lineupid:e.id},"image")),React.createElement("img",{src:""+resolveImg(null),className:"Product_img",style:{width:"68px",height:"68px",borderRadius:"1rem",opacity:e.image?0:1}})))),e.time?React.createElement("div",{className:"lineupItem_time",style:{fontSize:"1rem"}},getFormattedTime(e.time,{simple:!0})):null)):null)),React.createElement("input",{type:"file",style:{display:"none"},ref:g,onChange:f})):null)):React.createElement("div",null))};export default Module;