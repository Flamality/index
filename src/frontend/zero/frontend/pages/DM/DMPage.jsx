import React from 'react'

import "./DMPage.css"
import { useParams } from 'react-router-dom'
import DMBar from '../../components/bars/DMBar/DMBar';
import ChannelContainer from '../../components/messages/ChannelContainer/ChannelContainer';

export default function DMPage() {
    const { dm } = useParams();
  return (
    <div className='page-dms'><DMBar />
    <ChannelContainer channel={dm} />
    </div>
  )
}
