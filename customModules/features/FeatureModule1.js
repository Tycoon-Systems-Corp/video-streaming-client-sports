import React from 'react'
import { fetchArticle } from "./articleRequest"

const Module = props => {
    const [ fetchBusy, setFetchBusy ] = React.useState(false)
    const [ pageError, setPageError ] = React.useState(null)
    const [ validCc, setValidCc ] = React.useState(true)
    const [ cartMessages, setCartMessages ] = React.useState([])
    const [ articleData, setArticleData ] = React.useState(null)

    React.useEffect(() => {
        fetchArticle().then((data) => {
        articleData ? setArticleData(data) : null
        console.log("DATA FROM COMPONENT:", articleData.status)
    })
    },[])
    // console.log(fetchArticle())

    return (
        <React.Fragment>
            <div>{articleData ? articleData.status : "loading..."}</div>
        </React.Fragment>
    )
}

export default Module
