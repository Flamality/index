import React from 'react';

import TOS from "./components/builtin/TOS.mdx"

import "./Docs.css"

export default function TermsOfService() {

    return (
        <div className='docs-document'>
            <div className='docs-document-body'>
                <TOS />
            </div>
        </div>
    )
}