import React from 'react'
import { fetchArticle } from "./articleRequest"

const Module = props => {
    const [ componentDidMount, setComponentDidMount ] = React.useState(false)
    const [ fetchBusy, setFetchBusy ] = React.useState(false)
    const [ pageError, setPageError ] = React.useState(null)
    const [ validCc, setValidCc ] = React.useState(true)
    const [ cartMessages, setCartMessages ] = React.useState([])
    const [ articleData, setArticleData ] = React.useState(null)

    React.useEffect(() => {
        if (!componentDidMount) {
            setComponentDidMount(true)
            fetchArticle().then((response) => {
                console.log(response)
                response ? setArticleData(response.data.fetchedData[0].articleReq[0]) : "test"
            })
        } 
    },[])
    // console.log(fetchArticle())

    return (
        <React.Fragment>
            {console.log("ARTICLE STATE:", articleData)}
            {articleData ? articleData.map(article => <div>{article.title}</div>) : "loading..."}
        </React.Fragment>
    )
}

export default Module
