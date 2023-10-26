import { View, Text } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

const Chat = () => {
    const [messages, setMessages] = useState([])
    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'yassine',
              avatar: 'https://i.pravatar.cc/400',
            },
          },
        ])
      }, [])
      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages),
        )
      }, [])
  return (
    <GiftedChat
    messages={messages}
    onSend={messages => onSend(messages)}
    user={{
      _id: 1,
      name: 'yassine',
      avatar: 'https://i.pravatar.cc/500'

    }}
  />
  )
}

export default Chat