import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import Styles from '../../modules/presentation/Presentation.module.scss'
import { fetchArticle } from "./articleRequest"
import Link from 'next/link'
import Image from 'next/image'
import Glide, { Autoplay } from "@glidejs/glide/dist/glide.modular.esm"


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
    },[])
    // console.log(fetchArticle())

    React.useEffect(() => {
        if (componentId && window && window.Glide) {
            if (currentGlide?.current) {
                currentGlide.current.destroy()
            }
            const glide = new window.Glide(`.glide_${componentId}`, {
                type: 'carousel',
                animationDuration: 800,
                perView: 1,
                focusAt: 'center',
                startAt: 0,
                autoplay: 2000,
            })
            // glide.on(['build.before'], function() {
            //     document.querySelector(`.glide_${componentId}`).classList.add(`opacity1`)
            // })
            currentGlide.current = glide
            glide.mount({ Autoplay })
            glide.start()
        }
    }, [ componentId ])

    // const useItems = props?.items?.map ? props.items : [ "https://cdn.nba.com/manage/2024/05/under25_v2_16x9-1-copy.jpg", "https://cdn.nba.com/manage/2024/05/under25_v2_16x9-1-copy.jpg", "https://cdn.nba.com/manage/2024/05/under25_v2_16x9-1-copy.jpg", "https://cdn.nba.com/manage/2024/05/under25_v2_16x9-1-copy.jpg" ]
    const useItems = [ "https://cdn.nba.com/manage/2024/05/under25_v2_16x9-1-copy.jpg", "https://cdn.nba.com/manage/2024/05/under25_v2_16x9-1-copy.jpg", "https://cdn.nba.com/manage/2024/05/under25_v2_16x9-1-copy.jpg", "https://cdn.nba.com/manage/2024/05/under25_v2_16x9-1-copy.jpg" ]
    // const useItems = articleData ? articleData.meta.featuredImg : [ {}, {}, {}, {} ]

    // let imageArray = []

    // articleData ? articleData.map(article => imageArray.push(article.meta.featuredImg)) : null
    // console.log(imageArray)


    return (
        <React.Fragment>
            {console.log("ARTICLE STATE:", articleData)}
            {console.log("IMAGE STATE:", imageArray)}
            {console.log("PROPS:", props)}

            <div className={`${Styles.IndexHelloContainer} glide_${componentId} ${moduleName}_IndexHelloContainer ${props.className}`}>
            {
                props.groupLabel
                    ? <div className={`${Styles.GroupLabelContainer} ${moduleName}_groupLabelContainer ${props.groupLabelContainerClassName}`}>
                        <div className={`${Styles.GroupLabel} ${moduleName}_groupLabel ${props.groupLabelClassName}`}>{props.groupLabel}</div>
                    </div>
                    : null
            }
            <div data-glide-el="track" className={`${Styles.GlideTrack} glide__track`}>
                <ul className={`${Styles.IndexItemsContainer} glide__slides ${moduleName}_IndexItemsContainer ${props.IndexItemsContainerClassName}`}>

                    {articleData ? articleData.map((article, index) => <li className='glide__slide' style={{ border: "1px solid white" }} key={index}>{article.title}</li>) : "loading..."}
                    
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
            </div>
        </div>
        </React.Fragment>
    )
}

export default Module
