import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import Styles from '../../modules/presentation/Presentation.module.scss'
import SideBarStyles from './SideBar.module.scss'
import { fetchArticle } from "./articleRequest"
import Link from 'next/link'
import Image from 'next/image'
import Glide, { Autoplay } from "@glidejs/glide/dist/glide.modular.esm"

const sideBarConfig = [
        {
            lead: "THE NBA SUPERSTAR EXPERIENCE",
            description: "Feel like a pro regardless of your skill level!",
            ctaBtnText: "LEARN MORE",
            imageUrl: "https://digitalshift-assets.sfo2.cdn.digitaloceanspaces.com/pw/6e7aa105-ef52-4ef0-aa61-6774fa74e015/p-fb47b3dd-394e-444a-8ae8-181af479b2f3/1701994288-promo.jpg"
        },
        {
            lead: "POWERED BY CANADA BASKETBALL",
            description: "As seen on ESPN, Overtime, House of Highlights and more!",
            ctaBtnText: "REGISTER NOW",
            imageUrl: "https://digitalshift-assets.sfo2.cdn.digitaloceanspaces.com/pw/6e7aa105-ef52-4ef0-aa61-6774fa74e015/p-c47e50f0-a4c0-4ab4-b39a-c34be0ab4ca3/1701994314-promo.png"
        }
    ]

const moduleName = 'IndexBgHello'

const Module = props => {
    const [ componentId, setComponentId ] = React.useState(null)
    const [ componentDidMount, setComponentDidMount ] = React.useState(false)
    const [ fetchBusy, setFetchBusy ] = React.useState(false)
    const [ pageError, setPageError ] = React.useState(null)
    const [ validCc, setValidCc ] = React.useState(true)
    const [ cartMessages, setCartMessages ] = React.useState([])
    const [ articleData, setArticleData ] = React.useState(null)
    const [ imageArray, setImageArray ] = React.useState([])
    const [ stagger, setStagger ] = React.useState(false)
    const [ currentTab, setCurrentTab ] = React.useState(1)
    const staggerRef = React.useRef()

    
    
    React.useEffect(() => {
        if (!componentDidMount) {

            if (props.stagger) {
                staggerRef.current = setTimeout(() => {
                    setStagger(true)
                }, props.stagger)
            }

            const id = uuidv4()
            setComponentId(id)

            setComponentDidMount(true)

            fetchArticle().then((response) => {
                console.log(response)   
                response ? setArticleData(response.data.fetchedData[0].articleReq[0]) : null
                articleData ? articleData.map(article => {
                    article.meta.featuredImg ? setImageArray(article.meta.featuredImg) : null
                }) : null

            })
        } 
    },[ componentDidMount, props.stagger ])

    React.useEffect(() => {
        if (componentId && window && window.Glide) {
            // if (currentGlide?.current) {
            //     currentGlide.current.destroy()
            // }
            const glideAuto = new window.Glide(`.glide_${componentId}`, {
                type: 'carousel',
                animationDuration: 1000,
                perView: 1,
                focusAt: 'center',
                startAt: 0,
                autoplay: 2000,
            })
            // glide.on(['build.before'], function() {
            //     document.querySelector(`.glide_${componentId}`).classList.add(`opacity1`)
            // })

            // console.log("LOGGING CAROUSEL INFO:", glideAuto)
            console.log("LOGGING CAROUSEL INFO TEST")
            currentGlide.current = glideAuto
            glideAuto.mount({ Autoplay })

            return () => glideAuto.destroy()
        }
    }, [ componentId ])

    // const useItems = props?.items?.map ? props.items : [ "https://cdn.nba.com/manage/2024/05/under25_v2_16x9-1-copy.jpg", "https://cdn.nba.com/manage/2024/05/under25_v2_16x9-1-copy.jpg", "https://cdn.nba.com/manage/2024/05/under25_v2_16x9-1-copy.jpg", "https://cdn.nba.com/manage/2024/05/under25_v2_16x9-1-copy.jpg" ]
    // const useItems = [ "https://cdn.nba.com/manage/2024/05/under25_v2_16x9-1-copy.jpg", "https://cdn.nba.com/manage/2024/05/under25_v2_16x9-1-copy.jpg", "https://cdn.nba.com/manage/2024/05/under25_v2_16x9-1-copy.jpg", "https://cdn.nba.com/manage/2024/05/under25_v2_16x9-1-copy.jpg" ]
    // const useItems = articleData ? articleData.meta.featuredImg : [ {}, {}, {}, {} ]

    // let imageArray = []

    // articleData ? articleData.map(article => imageArray.push(article.meta.featuredImg)) : null
    // console.log(imageArray)

    // const staticArray = [1, 2, 3, 4]

    return (
        <React.Fragment>
            {console.log("ARTICLE STATE:", articleData)}
            {console.log("IMAGE STATE:", imageArray)}
            {console.log("PROPS:", props)}

            {/* <div className={`glide_${componentId}`}>
                <div className="glide__track" data-glide-el="track">
                    <ul className="glide__slides">
                        {articleData ? articleData.map((article, index) => 
                            <li className='glide__slide' style={{ border: "1px solid white" }} key={index}>{article.title}</li>)
                            : "loading..."}
                    </ul>
                </div>
            </div> */}


            {/* <div className={`glide_${componentId}`}>
                <div className="glide__track" data-glide-el="track">
                    <ul className="glide__slides">
                        {staticArray ? staticArray.map((item, index) => 
                            <li className='glide__slide' style={{ border: "1px solid white" }} key={index}>{item}</li>)
                            : "loading..."}
                    </ul>
                </div>
            </div> */}

            <div className={`${Styles.CarouselParent}`}>
                <div data-glide-el="track" className={`${Styles.GlideTrack} ${Styles.AutoplayGlideTrack} glide__track`}>
                    <ul className={`${Styles.IndexItemsContainer} glide__slides ${moduleName}_IndexItemsContainer ${props.IndexItemsContainerClassName} ${Styles.AutoplayCarouselContainer}`} style={{ backgroundImage: 'url("https://cdn.nba.com/manage/2024/05/luka-dort-1080-2001613153.jpg")', height: '100%', width: '100%' }}>

                        {articleData ? articleData.map((article, index) => 
                            <li className={`${Styles.TextOverlayContainer} glide__slide`} key={index}>
                                <div className={`${Styles.RedLine}`}></div>
                                <div>
                                    <div className={`${Styles.CarouselLeadText}`}>{article.title}</div>
                                    <Link href='https://www.google.ca' className={`${Styles.ReadMoreLink}`} target='_blank'>READ MORE</Link>
                                 </div>
                            </li>)
                            
                            : "loading..."}

                        
                        
                        
                        {/* {
                            useItems.map((m, i) =>
                                (
                                    <div className={`${Styles.IndexItemUpperContainer} ${props.tall ? `${Styles.IndexItemsUpperContainerTall}` : null} ${moduleName}_Container`} key={i}>
                                        <Link href={m.date && !datePassed(m.date) && m?.item?.id ? `/e?p=${m.item.id}` : m.streamId ? `/w?v=${m.streamId}` : `/w?u=${m.author}`} style={{ alignSelf: 'center' }}>
                                            <div className={`${Styles.BgContainer} ${props.tall ? `${Styles.BgContainerTall}` : null} ${moduleName}_BgContainer ${props.bgClassName}`} style={{ backgroundImage: `url(${m.leadBg && m?.leadBg !== '' ? m.leadBg : "img/default/greythumb.jpg"})` }}>
                                                {props.children}
                                                <div className={`${Styles.FillPageContainer} ${moduleName}_FillPageContainer`}>
                                                    <div className={`${Styles.TimeContainer} ${moduleName}_TimeContainer ${props.timeContainerClassName}`}>
                                                        {
                                                            m.showSimpleDate
                                                                ? <div className={`${Styles.TimeSimple} ${moduleName}_TimeSimple ${props.timeSimpleClassName} ${datePassed(m.date) ? `${Styles.DatePassed}` : ''}`}>
                                                                    <div>{m?.date ? resolveGoodDate(m.date) : ''}</div>
                                                                </div>
                                                                : null
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>

                                        <div>
                                            <div className={`${Styles.MetaContainer} ${moduleName}_MetaContainer ${props.metaContainerClassName}`}>
                                                {
                                                    m?.icon !== ''
                                                        ? <div className={`${Styles.IconContainer} ${moduleName}_IconContainer ${props.iconContainerClassName}`}>
                                                            <Link href={`/p?u=${m?.author}`} style={{ alignSelf: 'center' }}>
                                                                <Image
                                                                    loader={() => {
                                                                        return props.dev && m.icon ? `${m.icon}` : m.icon && props.cdn && props.cdn.static && props.cdn.static.length > 0 ? `${props.cdn.static}/${m.icon}` : 'img/default/greythumb.jpg'
                                                                    }}
                                                                    src={"https://cdn.nba.com/manage/2024/05/under25_v2_16x9-1-copy.jpg"}
                                                                    style={{ maxWidth: '60px', borderRadius: '4rem' }}
                                                                    alt={m.author}
                                                                    width={m.iconWidth ?? '60'}
                                                                    height={m.iconHeight ?? '60'}
                                                                    layout="responsive"
                                                                />
                                                            </Link>
                                                        </div>: null
                                                }
                                                <div className={`${Styles.DataContainer} ${moduleName}_DataContainer ${props.DataContainerClassName}`}>
                                                    <Link href={m.date && !datePassed(m.date) && m?.item?.id ? `/e?p=${m.item.id}` : m.streamId ? `/w?v=${m.streamId}` : `/w?u=${m.author}`} style={{ alignSelf: 'center' }}>
                                                        <div className={`${Styles.Lead} ${moduleName}_Lead ${props.leadClassName}`}>{m.title}</div>
                                                    </Link>
                                                    <div className={`${Styles.CtaHolder} ${moduleName}_CtaHolder ${props.CtaHolderClassName}`}>
                                                        <Link href={`/p?u=${m?.author}`} style={{ alignSelf: 'center' }}>
                                                            <div className={`${Styles.Author} ${moduleName}_Author ${props.authorClassName}`}>{m.author}</div>
                                                        </Link>
                                                        {
                                                            m.description && m.description !== ''
                                                                ? <div className={`${Styles.Description} ${moduleName}_Description ${props.descriptionClassName}`}>{m.description}</div>
                                                                : null
                                                        }
                                                        {
                                                            m?.item?.type === 'ticket' && m?.item?.id && m?.item?.style && m?.item?.option
                                                                ? <button className={`${Styles.CtaButton} ${moduleName}_Cta ${props.ctaClassName}`} onClick={handleFireGlobalEvent} action={['add_to_cart', 'buy'].indexOf(m?.action) > -1 ? m.action : 'add_to_cart'} item={m?.item?.id} selectedstyle={m?.item?.style} currentoption={m?.item?.option} ref={ctaRef} ctaAfter={m.ctaAfter} cta={m.cta}>{m.cta}</button>
                                                                : null
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )
                        } */}
                    </ul>

                    <div className={`${Styles.CarouselTabContainer}`}>
                        {articleData ? articleData.map((article, index) => 
                            <div className={currentTab ? `${Styles.CurrentTab}` : `${Styles.CarouselTab}`}>{article.title}</div> )
                            
                            : "loading..."}
                    </div>
                </div>
            </div>

            <div className={`${SideBarStyles.SideBarContainer}`}>
                {sideBarConfig ? sideBarConfig.map(card => {
                    return (
                        <div className={`${SideBarStyles.SideBarCard}`}>
                        
                        <img 
                        src={card.imageUrl}
                        alt='placeholder'
                        // width={"100px"}
                        // height={'auto'}
                        // layout='responsive'
                        className={`${SideBarStyles.CardImage}`}
                        />

                        <div className={`${SideBarStyles.CardTextContainer}`}>
                            <p style={{ fontWeight: 'bold', fontSize: '1.3rem', margin: '0px' }}>{card.lead}</p>
                            <p>{card.description}</p>
                            <button className={`ctaButton`}>
                                <span>{card.ctaBtnText}</span>
                            </button>
                        </div>
                    </div>
                    )
                }): null } 

                <a href="https://wwww.google.ca" target='_blank' style={{ backgroundColor: 'black', color: 'red', fontWeight: 'bold', padding: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '.8rem', marginTop: '.8rem', marginBottom: '.9rem' }}>
                    <span>BRODIE BETTING IS LIVE!</span>
                    <span>LEARN MORE</span>
                </a>

                <img src="https://digitalshift-assets.sfo2.cdn.digitaloceanspaces.com/pw/6e7aa105-ef52-4ef0-aa61-6774fa74e015/p-fdaa3774-5bdb-4242-b50e-8bb9c5374bce/1713733157-full.jpg" alt="placeholder"
                className={`${SideBarStyles.BrodieFantasyImg}`} 
                />
            </div>
        </React.Fragment>
    )
}

export default Module
