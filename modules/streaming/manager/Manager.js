var _div, _b, _div2, _div3;
var REACT_ELEMENT_TYPE;
function _jsx(e, r, E, l) { REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103); var o = e && e.defaultProps, n = arguments.length - 3; if (r || 0 === n || (r = { children: void 0 }), 1 === n) r.children = l;else if (n > 1) { for (var t = new Array(n), f = 0; f < n; f++) t[f] = arguments[f + 3]; r.children = t; } if (r && o) for (var i in o) void 0 === r[i] && (r[i] = o[i]);else r || (r = o || {}); return { $$typeof: REACT_ELEMENT_TYPE, type: e, key: void 0 === E ? null : "" + E, ref: null, props: r, _owner: null }; }
import React from 'react';
import { useRouter } from 'next/router';
import { beginStream, endStream, updateStreamConfigRequest, requestStreamingPermissions } from '../../utility/streaming';
import { checkSignedIn, logout } from '../../utility/onboarding/SignIn';
import { createShop } from '../../utility/ecommerce';
import { selectThisText } from '../../utility/utility/event';
import { v4 as uuidv4 } from 'uuid';
import Tooltip from '@mui/material/Tooltip';
import ManagerStyles from './Manager.module.scss';
import LinearProgress from '@mui/material/LinearProgress';
const Module = props => {
  let [pageError, setPageError] = React.useState(null);
  const [componentDidMount, setComponentDidMount] = React.useState(false);
  const [componentId, setComponentId] = React.useState(null);
  const [didCheckStream, setDidCheckStream] = React.useState(false);
  const [currentlyStreaming, setCurrentlyStreaming] = React.useState(false);
  const [streamKey, setStreamKey] = React.useState(null);
  const [streamTo, setStreamTo] = React.useState(null);
  const [fetchBusy, setFetchBusy] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState('stream');
  const [creatingShop, setCreatingShop] = React.useState({});
  const [streamSettings, setStreamSettings] = React.useState({
    password: null,
    private: false,
    dates: [],
    tags: [],
    input: ''
  });
  const [askEndStream, setAskEndStream] = React.useState(false);
  const [updatingStreamConfig, setUpdatingStreamConfig] = React.useState(false);
  const [canStream, setCanStream] = React.useState(false);
  const [didAskStream, setDidAskStream] = React.useState(false);
  const fetchTimeoutRef = React.useRef();
  const proposedShopName = React.useRef();
  const proposedShopDesc = React.useRef();
  const privateRef = React.useRef();
  const privateRef2 = React.useRef();
  const passwordRef = React.useRef();
  const passwordRef2 = React.useRef();
  const titleRef = React.useRef();
  const descriptionRef = React.useRef();
  const myTagsRef = React.useRef();
  if (componentId) {
    props._LocalEventEmitter.unsubscribe(componentId);
    props._LocalEventEmitter.subscribe(componentId, d => {
      if (d && d.dispatch) {
        if (d.dispatch === 'paintStreamData') {
          setStreamData(currentlyStreaming);
        }
      }
    });
  }
  props._LocalEventEmitter.unsubscribe('manager');
  props._LocalEventEmitter.subscribe('manager', d => {
    if (d && d.dispatch) {
      if (d.dispatch === 'setMenu') {
        if (d?.menu === 'stream') {
          setOpenMenu('stream');
        }
      }
    }
  });
  const router = useRouter();
  React.useEffect(() => {
    if (!componentDidMount) {
      const id = uuidv4();
      setComponentId(id);
      setComponentDidMount(true);
    }
  }, [componentDidMount]);
  React.useEffect(() => {
    if (props._loggedIn && props._loggedIn.username && !didCheckStream) {
      setDidCheckStream(true);
      checkStream(true);
    }
  }, [props._loggedIn, didCheckStream]);
  const checkStream = async (dontForce = false) => {
    try {
      if (!fetchBusy) {
        setFetchBusy(true);
        fetchTimeoutRef.current = setTimeout(() => {
          setFetchBusy(false);
        }, 10000);
        const data = {
          stripeSecret: props._stripeSecret,
          dontForce: dontForce,
          streamSettings: streamSettings
        };
        const res = await beginStream(props.apiUrl, props.domainKey, data, checkSignedIn);
        if (fetchTimeoutRef.current) {
          clearTimeout(fetchTimeoutRef.current);
        }
        if (!res) {
          if (dontForce) {
            setFetchBusy(false);
            return;
          }
          props._setPageError("Failed to save begin stream");
          setFetchBusy(false);
        } else if (res == "disauthenticated") {
          props._setLoggedIn(false);
          props._setStripeSecret(false);
          setFetchBusy(false);
          logout();
        } else if (res.status == 'success') {
          // On successfull credit card received, purchase phone number and then update locally
          setFetchBusy(false);
          console.log('check stream', res);
          setCanStream(res.canStream);
          if (res.askStream) {
            setDidAskStream(true);
          }
          if (res.data && res.data.status == 'streaming' && res.data.stream) {
            setCurrentlyStreaming(res.data.stream);
            if (props?._setCurrentlyStreaming) {
              props._setCurrentlyStreaming(res.data.stream);
            }
            setStreamData(res.data.stream);
            if (res.data.key) {
              setStreamKey(res.data.key);
            }
            if (res.data.streamTo) {
              setStreamTo(res.data.streamTo);
            }
            if (res.data.stream.meta && res.data.stream.meta.streamSettings) {
              const d = res.data.stream.meta.streamSettings;
              setStreamSettings(d);
            }
            if (props._LocalEventEmitter) {
              props._LocalEventEmitter.dispatch('refetchDefaults', {
                dispatch: 'simple'
              });
            }
          }
        }
      }
    } catch (err) {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
      setFetchBusy(false);
    }
  };
  const setStreamData = stream => {
    try {
      if (stream) {
        titleRef.current.value = stream.title;
        descriptionRef.current.value = stream.description;
        myTagsRef.current.value = stream.tags;
      }
    } catch (err) {
      // fail silently
    }
  };
  const updateStreamConfig = React.useCallback(e => {
    updateStreamConfigFn();
  });
  const updateStreamConfigFn = async () => {
    try {
      if (!fetchBusy) {
        setFetchBusy(true);
        setUpdatingStreamConfig(true);
        fetchTimeoutRef.current = setTimeout(() => {
          setFetchBusy(false);
          setUpdatingStreamConfig(false);
        }, 10000);
        const streamData = {
          title: titleRef.current && titleRef.current.value ? titleRef.current.value : null,
          description: descriptionRef.current && descriptionRef.current.value ? descriptionRef.current.value : null,
          tags: myTagsRef.current && myTagsRef.current.value ? myTagsRef.current.value : null
        };
        const data = {
          stream: currentlyStreaming.id,
          streamData: streamData,
          streamSettings: streamSettings
        };
        const res = await updateStreamConfigRequest(props.apiUrl, props.domainKey, data, checkSignedIn);
        if (fetchTimeoutRef.current) {
          clearTimeout(fetchTimeoutRef.current);
        }
        if (!res) {
          props._setPageError("Failed to save begin stream");
          setFetchBusy(false);
          setUpdatingStreamConfig(false);
        } else if (res == "disauthenticated") {
          props._setLoggedIn(false);
          props._setStripeSecret(false);
          setFetchBusy(false);
          setUpdatingStreamConfig(false);
          logout();
        } else if (res.status == 'success') {
          // On successfull credit card received, purchase phone number and then update locally
          console.log('check stream', res);
          setFetchBusy(false);
          setUpdatingStreamConfig(false);
          if (res.data && res.data.status == 'streaming') {
            setCurrentlyStreaming(res.data.stream);
            if (props?._setCurrentlyStreaming) {
              props._setCurrentlyStreaming(res.data.stream);
            }
            if (res.data.key) {
              setStreamKey(res.data.key);
            }
            if (res.data.streamTo) {
              setStreamTo(res.data.streamTo);
            }
            if (res.data.stream) {
              if (res.data.stream.meta && res.data.stream.meta.streamSettings) {
                const d = res.data.stream.meta.streamSettings;
                setStreamSettings(d);
              }
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
      setFetchBusy(false);
      setUpdatingStreamConfig(false);
    }
  };
  const beginStreaming = React.useCallback(e => {
    checkStream();
  });
  const handleSetAdminMenu = React.useCallback(e => {
    try {
      if (e.target.getAttribute('menu')) {
        const menu = e.target.getAttribute('menu');
        setOpenMenu(menu);
      }
    } catch (err) {
      // fail silently
    }
  });
  React.useEffect(() => {
    if (streamSettings) {
      resolveState(streamSettings);
      props._LocalEventEmitter.dispatch(componentId, {
        dispatch: 'paintStreamData'
      });
    }
  }, [componentId, props._LocalEventEmitter, props.adminPanelState, streamSettings]);
  const resolveState = d => {
    let useSettings = d ? d : streamSettings;
    privateRef.current ? privateRef.current.checked = useSettings.private : null;
    privateRef2.current ? privateRef2.current.checked = useSettings.private : null;
    passwordRef.current ? passwordRef.current.value = useSettings.password : null;
    passwordRef2.current ? passwordRef2.current.value = useSettings.password : null;
  };
  console.log(props, streamSettings);
  const handleCreateShop = React.useCallback(async e => {
    try {
      setPageError(null);
      if (e.target.getAttribute('phase')) {
        const phase = e.target.getAttribute('phase');
        if (phase == '1') {
          setCreatingShop({
            status: 'start'
          });
        } else if (phase == 'end') {
          console.log('Run request create shop', proposedShopName.current);
          setFetchBusy(true);
          if (proposedShopName.current && proposedShopName.current.value) {
            const res = await createShop(props.apiUrl, props.domainKey, props._loggedIn, {
              shopName: proposedShopName.current.value,
              shopDescription: proposedShopDesc.current.value
            });
            if (res) {
              console.log(res);
              router.reload(window.location.pathname);
            } else {
              setPageError({
                message: 'Shop creation submission failed',
                placement: 'openshop'
              });
            }
          } else {
            setPageError({
              message: 'Please fill out a Shop Name',
              placement: 'description'
            });
          }
        }
      }
    } catch (err) {
      console.log(err); // fail silently
    }
  });
  const handleClearError = React.useCallback(e => {
    setPageError(null);
  });
  const updateTags = React.useCallback(e => {
    const temp = {
      ...streamSettings
    };
    const values = e.currentTarget.value.split(' ');
    const dates = [];
    const tags = [];
    values.map(v => {
      if (!isNaN(new Date(v))) {
        dates.push(new Date(v));
      } else {
        tags.push(v);
      }
    });
    temp.dates = dates;
    temp.tags = tags;
    setStreamSettings(temp);
  });
  const setPrivate = React.useCallback(e => {
    const temp = {
      ...streamSettings
    };
    temp.private = e.currentTarget.checked;
    setStreamSettings(temp);
  });
  const setPassword = React.useCallback(e => {
    const temp = {
      ...streamSettings
    };
    temp.password = e.currentTarget.value;
    setStreamSettings(temp);
  });
  const handleAskEndStream = React.useCallback(e => {
    if (e.currentTarget.getAttribute('modif')) {
      const m = e.currentTarget.getAttribute('modif');
      if (m == 'yes') {
        // end stream
        try {
          const f = async () => {
            console.log('end st', fetchBusy);
            if (!fetchBusy) {
              setFetchBusy(true);
              fetchTimeoutRef.current = setTimeout(() => {
                setFetchBusy(false);
              }, 10000);
              const data = {
                stream: currentlyStreaming.id
              };
              const res = await endStream(props.apiUrl, props.domainKey, data, checkSignedIn);
              if (fetchTimeoutRef.current) {
                clearTimeout(fetchTimeoutRef.current);
              }
              if (!res) {
                setAskEndStream(false);
                props._setPageError("Failed to end stream");
                setFetchBusy(false);
              } else if (res == "disauthenticated") {
                setAskEndStream(false);
                props._setLoggedIn(false);
                props._setStripeSecret(false);
                setFetchBusy(false);
                logout();
              } else if (res.status == 'success') {
                setAskEndStream(false);
                // On successfull credit card received, purchase phone number and then update locally
                setFetchBusy(false);
                setCurrentlyStreaming(false);
                if (props?._setCurrentlyStreaming) {
                  props._setCurrentlyStreaming(false);
                }
                setStreamKey(null);
                setStreamTo(null);
                setStreamSettings({
                  password: null,
                  private: false,
                  dates: [],
                  tags: [],
                  input: ''
                });
                if (props._LocalEventEmitter) {
                  props._LocalEventEmitter.dispatch('refetchDefaults', {
                    dispatch: 'simple'
                  });
                }
              }
            }
          };
          f();
        } catch (err) {
          setAskEndStream(false);
          if (fetchTimeoutRef.current) {
            clearTimeout(fetchTimeoutRef.current);
          }
          setFetchBusy(false);
        }
      } else {
        setAskEndStream(false);
      }
    } else if (!askEndStream) {
      setAskEndStream(true);
    }
  });
  const handleAskForStreamingPermissions = React.useCallback(e => {
    try {
      const f = async () => {
        if (!fetchBusy) {
          setFetchBusy(true);
          fetchTimeoutRef.current = setTimeout(() => {
            setFetchBusy(false);
          }, 10000);
          const res = await requestStreamingPermissions(props.apiUrl, props.domainKey, checkSignedIn);
          if (fetchTimeoutRef.current) {
            clearTimeout(fetchTimeoutRef.current);
          }
          if (!res) {
            setAskEndStream(false);
            setFetchBusy(false);
          } else if (res == "disauthenticated") {
            setAskEndStream(false);
            props._setLoggedIn(false);
            props._setStripeSecret(false);
            setFetchBusy(false);
            logout();
          } else if (res.status == 'success') {
            setAskEndStream(false);
            // On successfull credit card received, purchase phone number and then update locally
            setFetchBusy(false);
            if (res?.data?.created) {
              setDidAskStream(true);
            }
            if (props._LocalEventEmitter) {
              props._LocalEventEmitter.dispatch('refetchDefaults', {
                dispatch: 'simple'
              });
            }
          }
        }
      };
      f();
    } catch (err) {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
      setFetchBusy(false);
    }
  });
  return /*#__PURE__*/_jsx("div", {
    className: `${ManagerStyles.container} ${props.className}`
  }, void 0, pageError && pageError.message && !pageError.placement ? /*#__PURE__*/_jsx("div", {
    className: "error",
    style: {
      margin: '.25rem',
      marginBottom: '0'
    },
    onClick: handleClearError
  }, void 0, pageError.message) : null, /*#__PURE__*/_jsx("div", {
    className: `${ManagerStyles.innerContainer} flex gap-p2`,
    style: {
      flexDirection: 'column'
    }
  }, void 0, /*#__PURE__*/_jsx("div", {
    className: `${ManagerStyles.itemsContainer} flex Manager_Items`,
    style: {
      padding: '.5rem'
    }
  }, void 0, /*#__PURE__*/_jsx("button", {
    className: `${openMenu == 'stream' ? ManagerStyles.activeItem : ''} ${ManagerStyles.item}`,
    onClick: handleSetAdminMenu,
    menu: "stream"
  }, void 0, "Stream"), /*#__PURE__*/_jsx("button", {
    className: `${openMenu == 'shop' ? ManagerStyles.activeItem : ''} ${ManagerStyles.item}`,
    onClick: handleSetAdminMenu,
    menu: "shop"
  }, void 0, "Shop")), openMenu === 'stream' ? props._loggedIn && props._loggedIn.username ? /*#__PURE__*/_jsx("div", {
    className: `${ManagerStyles.settingsSectionContainer} flex gap-p5`,
    style: {
      padding: '.25rem'
    }
  }, void 0, /*#__PURE__*/_jsx("div", {
    className: `${ManagerStyles.settingContainer} ${ManagerStyles.streamingInfoContainer} ${currentlyStreaming ? `${ManagerStyles.isStreamingContainer}` : ''}`
  }, void 0, !fetchBusy && didCheckStream && didAskStream ? /*#__PURE__*/_jsx("div", {
    style: {
      marginBottom: '.25rem',
      textAlign: 'center'
    }
  }, void 0, /*#__PURE__*/_jsx("div", {
    style: {
      fontSize: '.85rem',
      marginBottom: '.25rem'
    }
  }, void 0, "You have asked for permission to stream. Please check back soon.")) : !fetchBusy && didCheckStream && !canStream ? /*#__PURE__*/_jsx("div", {
    style: {
      marginBottom: '.25rem',
      textAlign: 'center'
    }
  }, void 0, /*#__PURE__*/_jsx("div", {
    style: {
      fontSize: '.85rem',
      marginBottom: '.25rem'
    }
  }, void 0, "You are currently not authorized to stream"), /*#__PURE__*/_jsx("button", {
    style: {
      borderRadius: '.25rem'
    },
    onClick: handleAskForStreamingPermissions
  }, void 0, "Ask For Streaming Permissions?")) : null, !currentlyStreaming && canStream ? /*#__PURE__*/_jsx("div", {
    style: {
      height: '100%'
    }
  }, void 0, /*#__PURE__*/_jsx("div", {
    style: {
      fontSize: '1rem',
      fontWeight: '600',
      paddingTop: '0',
      paddingBottom: '.125rem',
      textAlign: 'center'
    }
  }, void 0, "Stream on ", props.siteTitle, " Now"), !fetchBusy ? /*#__PURE__*/_jsx("div", {
    style: {
      alignItems: 'center',
      marginBottom: '.125rem',
      height: 'inherit'
    }
  }, void 0, /*#__PURE__*/_jsx("button", {
    className: `${ManagerStyles.streamingButton}`,
    onClick: beginStreaming,
    style: {
      padding: '.125rem 2rem',
      fontSize: '1.5rem',
      paddingTop: '.125rem',
      width: '-webkit-fill-available',
      height: '75px'
    }
  }, void 0, "Begin Stream"), /*#__PURE__*/_jsx("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      background: 'black',
      padding: '0 .25rem',
      borderRadius: '.25rem',
      marginTop: '.25rem',
      justifyContent: 'space-between'
    }
  }, void 0, /*#__PURE__*/_jsx("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, void 0, /*#__PURE__*/_jsx("label", {
    style: {
      fontSize: '.8rem'
    }
  }, void 0, "Private"), <input type='checkbox' onChange={setPrivate} ref={privateRef} />), streamSettings.private ? /*#__PURE__*/_jsx("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, void 0, /*#__PURE__*/_jsx("label", {
    style: {
      fontSize: '.8rem'
    }
  }, void 0, "Password"), <input type='text' onChange={setPassword} style={{
    maxWidth: '100px',
    maxHeight: '16px',
    fontSize: '.85rem',
    marginLeft: '.25rem',
    borderRadius: '.25rem'
  }} ref={passwordRef} />) : null)) : /*#__PURE__*/_jsx("div", {
    style: {
      fontSize: '.85rem'
    }
  }, void 0, "Please wait...")) : currentlyStreaming ? /*#__PURE__*/_jsx("div", {}, void 0, /*#__PURE__*/_jsx("div", {
    className: `${ManagerStyles.streamingButtonStreaming} importantPrompt`
  }, void 0, "Now Streaming ", _div || (_div = /*#__PURE__*/_jsx("div", {
    className: "RecordingCircle RecordingCircle_Small"
  }))), /*#__PURE__*/_jsx("div", {
    style: {
      fontSize: '.85rem',
      overflowWrap: 'anywhere'
    }
  }, void 0, _b || (_b = /*#__PURE__*/_jsx("b", {}, void 0, "Share your stream link:")), " ", /*#__PURE__*/_jsx("span", {
    style: {
      background: 'black',
      padding: '0 .125rem'
    }
  }, void 0, /*#__PURE__*/_jsx("a", {
    href: `${props.devLocal ? props.devAddress : 'https://' + props.domainUrl}/w?u=${props._loggedIn.username}`,
    onClick: selectThisText,
    selectValue: `${props.devLocal ? props.devAddress : props.domainUrl}/w?u=${props._loggedIn.username}`
  }, void 0, `${props.devLocal ? props.devAddress : props.domainUrl}/w?u=${props._loggedIn.username}`))), /*#__PURE__*/_jsx("div", {
    style: {
      fontSize: '.85rem',
      fontWeight: 600,
      color: '#94ff94',
      overflowWrap: 'anywhere'
    }
  }, void 0, "Stream Endpoint: ", /*#__PURE__*/_jsx("span", {
    style: {
      fontWeight: 400,
      background: 'black',
      padding: '0 .125rem'
    },
    onClick: selectThisText,
    selectValue: streamTo
  }, void 0, streamTo)), /*#__PURE__*/_jsx("div", {
    style: {
      fontSize: '.85rem',
      fontWeight: 600,
      color: '#ff81ca',
      overflowWrap: 'anywhere'
    }
  }, void 0, "Private Stream Key: ", /*#__PURE__*/_jsx("span", {
    style: {
      fontWeight: 400,
      background: 'black',
      padding: '0 .125rem'
    },
    onClick: selectThisText,
    selectValue: streamKey
  }, void 0, streamKey))) : null, currentlyStreaming ? !askEndStream ? /*#__PURE__*/_jsx(React.Fragment, {}, void 0, !updatingStreamConfig ? /*#__PURE__*/_jsx("button", {
    style: {
      width: '100%',
      marginTop: '.25rem',
      lineHeight: '12.5px',
      fontSize: '.8rem'
    },
    onClick: updateStreamConfig
  }, void 0, "Update Changed Settings") : /*#__PURE__*/_jsx(LinearProgress, {
    color: "inherit",
    style: {
      height: '18.25px',
      marginTop: '.25rem'
    }
  }), /*#__PURE__*/_jsx("button", {
    style: {
      width: '100%',
      marginTop: '.25rem',
      lineHeight: '12.5px',
      fontSize: '.8rem'
    },
    onClick: handleAskEndStream
  }, void 0, "Terminate Stream")) : /*#__PURE__*/_jsx(React.Fragment, {}, void 0, /*#__PURE__*/_jsx("div", {
    style: {
      fontWeight: 600,
      textAlign: 'center',
      marginTop: '.42rem'
    }
  }, void 0, "Terminate the Stream?"), /*#__PURE__*/_jsx("div", {
    className: "flex gap-p2"
  }, void 0, /*#__PURE__*/_jsx("button", {
    style: {
      width: '100%',
      marginTop: '.25rem',
      lineHeight: '12.5px',
      fontSize: '.8rem'
    },
    onClick: handleAskEndStream,
    modif: "yes"
  }, void 0, "Yes"), /*#__PURE__*/_jsx("button", {
    style: {
      width: '100%',
      marginTop: '.25rem',
      lineHeight: '12.5px',
      fontSize: '.8rem'
    },
    onClick: handleAskEndStream,
    modif: "no"
  }, void 0, "No"))) : null), /*#__PURE__*/_jsx("div", {
    className: ManagerStyles.settingContainer
  }, void 0, /*#__PURE__*/_jsx("div", {}, void 0, <input type='text' modif={'title'} ref={titleRef} placeholder='Title' style={{
    width: '100%'
  }} />), /*#__PURE__*/_jsx("div", {}, void 0, <textarea modif={'description'} ref={descriptionRef} placeholder='Description' style={{
    maxWidth: '100%',
    marginTop: '.25rem',
    width: '100%',
    height: '90px'
  }} />), /*#__PURE__*/_jsx("div", {}, void 0, <input type='text' modif={'tags'} ref={myTagsRef} placeholder='Tags' style={{
    width: '100%'
  }} />)), /*#__PURE__*/_jsx("div", {
    className: ManagerStyles.settingContainer
  }, void 0, /*#__PURE__*/_jsx("div", {
    style: {
      fontSize: '.8rem',
      marginBottom: '.125rem',
      marginTop: '.125rem'
    }
  }, void 0, "Create your own Auth Keys to provide authorization to watch the stream for any tickets with matching tags"), /*#__PURE__*/_jsx(Tooltip, {
    title: "Enter dates in the following format MON-DD-YYYY or they will not be parsed as dates. Values that do not match dates will be parsed as tags that can be added to livestreams. Any matches will authorize viewership of tickets with matching tags for the stream",
    className: "flex gap-p2",
    style: {
      alignItems: 'center'
    },
    placement: "right"
  }, void 0, /*#__PURE__*/_jsx("input", {
    type: "text",
    style: {
      marginBottom: '.125rem',
      width: '-webkit-fill-available'
    },
    placeholder: "Date in DD/MM/YY format or a Tag",
    onInput: updateTags,
    option: "livestreamDef",
    defaultValue: streamSettings.input
  })), streamSettings.dates.length > 0 ? /*#__PURE__*/_jsx("div", {
    className: "tagContainer",
    style: {
      marginTop: '.25rem'
    }
  }, void 0, streamSettings.dates.map((d, i) => {
    return /*#__PURE__*/_jsx("div", {
      className: "tagItem"
    }, i, d && d.toLocaleString ? d.toLocaleString("en-US", {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    }) : '');
  })) : _div2 || (_div2 = /*#__PURE__*/_jsx("div", {})), streamSettings.tags.length > 0 ? /*#__PURE__*/_jsx("div", {
    className: "tagContainer",
    style: {
      marginTop: '.25rem'
    }
  }, void 0, streamSettings.tags.map((d, i) => {
    return /*#__PURE__*/_jsx("div", {
      className: "tagItem"
    }, i, d);
  })) : _div3 || (_div3 = /*#__PURE__*/_jsx("div", {})), currentlyStreaming ? /*#__PURE__*/_jsx("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      background: 'black',
      padding: '0 .25rem',
      borderRadius: '.25rem',
      marginTop: '.25rem',
      justifyContent: 'space-between'
    }
  }, void 0, /*#__PURE__*/_jsx("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, void 0, /*#__PURE__*/_jsx("label", {
    style: {
      fontSize: '.8rem'
    }
  }, void 0, "Private"), <input type='checkbox' onChange={setPrivate} ref={privateRef2} />), streamSettings && streamSettings.private ? /*#__PURE__*/_jsx("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, void 0, /*#__PURE__*/_jsx("label", {
    style: {
      fontSize: '.8rem'
    }
  }, void 0, "Password"), <input type='text' onChange={setPassword} style={{
    maxWidth: '100px',
    maxHeight: '16px',
    fontSize: '.85rem',
    marginLeft: '.25rem',
    borderRadius: '.25rem'
  }} ref={passwordRef2} />) : null) : null)) : /*#__PURE__*/_jsx("div", {}, void 0, props._loggedIn ? !props._loggedIn.username ? 'Please register Username to begin streaming' : 'Please login to begin streaming' : null) : openMenu === 'shop' ? /*#__PURE__*/_jsx("div", {
    style: {
      padding: '.25rem'
    }
  }, void 0, props.shopProfileData && props.shopProfileData.shop && props.shopProfileData.shop.status && props.shopProfileData.shop.status == 'nonexistent' ? /*#__PURE__*/_jsx("div", {}, void 0, !creatingShop.status ? /*#__PURE__*/_jsx("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '.25rem',
      paddingTop: '.25rem'
    }
  }, void 0, /*#__PURE__*/_jsx("div", {
    style: {
      fontSize: '.85rem'
    }
  }, void 0, "You do not currently own a shop. Would you like to request to open one?"), /*#__PURE__*/_jsx("button", {
    onClick: handleCreateShop,
    phase: "1"
  }, void 0, "Start Creating Shop"), /*#__PURE__*/_jsx("div", {
    style: {
      fontSize: '.85rem'
    }
  }, void 0, "A shop allows for you to sell products on ", props.siteTitle, " with ease to all customers, fans, collectors, enthusiasts and passerbys utilizing all the tools offered on the platform. You will be able to track pending orders that have yet to be completed, products in carts, your personal inventory, sales and much more as well as sell products in such a way that makes it easier for your customers.")) : creatingShop.status && creatingShop.status == 'start' ? /*#__PURE__*/_jsx("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '.25rem',
      paddingTop: '.25rem'
    }
  }, void 0, /*#__PURE__*/_jsx("div", {
    style: {
      fontSize: '.85rem'
    }
  }, void 0, "Name your Shop"), <input ref={proposedShopName} type="text" placeholder="Shop Name" className='simpleTextInput' />, <textarea rows='5' style={{
    height: 'auto',
    resize: 'none'
  }} ref={proposedShopDesc} type="text" placeholder="You can describe your Shop here. You might put a company slogan, introduce your business, describe the products you sell or nothing at all. It is up to you and your stakeholders." className='simpleTextInput' />, pageError && pageError.message && pageError.placement == 'description' ? /*#__PURE__*/_jsx("div", {
    className: "error",
    onClick: handleClearError
  }, void 0, pageError.message) : null, /*#__PURE__*/_jsx("div", {
    style: {
      fontSize: '.75rem',
      background: 'black',
      padding: '.125rem'
    }
  }, void 0, "When creating your shop, you must set up your vendor account. Please have your banking details ready for direct deposit setup. If you don't have banking details prepared at the moment, you can always set them up later. Once your shop is created, you can start creating products and showcasing them to the public. For all physical products, it is your responsibility to ensure that you have sufficient inventory available for direct-to-consumer sales through the platform. If any products offered for sale are out of stock, any payments received must be fully refunded to customers without exceptions. As a shop owner, you will be subject to platform fees, which will be deducted from your total revenues on the platform. ", props.siteTitle, " reserves the right to close any shop that is suspected of operating in a manner that jeopardizes the quality of service and integrity of the platform. All transactions on ", props.siteTitle, " are handled using Tycoon Systems Ecommerce Services. Any disputes on ", props.siteTitle, " are settled by the ", props.siteTitle, " platform. By submitting a request to open your shop below, you agree to the above terms and conditions."), /*#__PURE__*/_jsx("button", {
    onClick: handleCreateShop,
    phase: "end"
  }, void 0, "Open Shop"), pageError && pageError.message && pageError.placement == 'openshop' ? /*#__PURE__*/_jsx("div", {
    className: "error",
    onClick: handleClearError
  }, void 0, pageError.message) : null) : null) : props.shopProfileData && props.shopProfileData.shop && props.shopProfileData.shop.name ? /*#__PURE__*/_jsx("div", {}, void 0, /*#__PURE__*/_jsx("div", {
    style: {
      fontSize: '.85rem'
    }
  }, void 0, props.shopProfileData.shop.name)) : null) : null));
};
export default Module;