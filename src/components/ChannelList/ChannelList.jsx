import React, { use, useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch.jsx'
import { createNewChannel, getChannelListByWorkspaceId } from '../../services/channelService.js'
import { Link, useParams } from 'react-router'
import useChannels from '../../hooks/useChannels'

const ChannelList = () => {
    const {workspace_id} = useParams()
    const {channels} = useChannels()


    console.log({channels})

    return (
        <div style={{display: 'flex', flexDirection:"column"}}>
            {
                channels.map((elemento) => {
                    return (
                        <Link key={elemento.channel_id} to={`/workspace/${workspace_id}/${elemento._id}`}>{elemento.name}</Link>
                    )
                })
            }
        </div>
    )
}

export default ChannelList