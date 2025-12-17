import React, { useState } from 'react'

import "./TabGroup.css"

export default function TabGroup({value, onChange, children}) {
    const [activeTab, setActiveTab] = useState(value);
    const handleTabChange = (index) => {
        setActiveTab(index);
        onChange(index);
    }
    const tabs = React.Children.toArray(children);
  return (
    <div className='core-element-tabgroup'>{tabs?.map((Tab, i)=> {
        return React.cloneElement(Tab, {
            index: i,
            active: activeTab === i,
            onClick: handleTabChange
        })
    })}</div>
  )
}