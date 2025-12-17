import React, { useEffect } from 'react';

import TOS from "./components/builtin/TOS.mdx"

import "./Docs.css"

export default function TermsOfService() {
    useEffect(() =>{
        document.title = 'Flamality | Terms Of Service'
    },[])
    return (
        <div className='docs-document'>
            <div className='docs-document-body'>
                <TOS />
            </div>
        </div>
    )
}