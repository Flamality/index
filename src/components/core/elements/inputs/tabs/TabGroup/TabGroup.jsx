import React, { useState } from 'react'

export default function TabGroup({value, onChange, children}) {
    const [activeTab, setActiveTab] = useState(value);
    const handleTabChange = (index) => {
        setActiveTab(index);
        onChange(index);
    }
  return (
    <div>{children?.map((Tab, i)=> {
        return React.cloneElement(child, {
            index: i,
            active: activeTab === i,
            onClick: handleTabChange
        })
    })}</div>
  )
}