import React from 'react'
import { fetchArticle } from "./articleRequest"

const Module = props => {
    const [ fetchBusy, setFetchBusy ] = React.useState(false)
    const [ pageError, setPageError ] = React.useState(null)
    const [ validCc, setValidCc ] = React.useState(true)
    const [ cartMessages, setCartMessages ] = React.useState([])

    fetchArticle()

    return (
        <React.Fragment>
            {/* <div>{res ? res.data.fetchedData[0].articleReq[0].title : null}</div> */}
        </React.Fragment>
    )
}

export default Module
