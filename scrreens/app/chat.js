import { View, Text, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, InputToolbar, Actions, Bubble, SystemMessage, Composer, Send, Message } from 'react-native-gifted-chat'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig'
import send from "../../assets/send.png"
import camera from "../../assets/camera.png"

import { addDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore'

const Chat = () => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
  const [image, setImage] = useState(null)
  // console.log(image);
  const auth = FIREBASE_AUTH
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    }

    )
    // result.canceled=false
    if (!result.canceled) {
      setImage(result.assets[0].uri)
    } else {
      alert('You did not select any image.');
    }
    // if (hasGalleryPermission === false) {
    //   return <Text>no permmison</Text>
    // }
  }
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('');
  useEffect(() => {
    const collectionRef = collection(FIREBASE_DB, "chats")
    const q = query(collectionRef, orderBy("createdAt", "desc"))
    const unscribe = onSnapshot(q, snapshot => {
      setMessages(
        snapshot.docs.map(doc => {
          return (
            {
              _id: doc.id,
              text: doc.data().text,
              createdAt: doc.data().createdAt.toDate(),
              user: doc.data().user,
              image: doc.data().image
            }
          )
        })
      )
    })
    return () => unscribe();
  }, [])
  const onSend = useCallback(async (messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
    const { _id, createdAt, text, user } = messages[0]
    console.log("before add ");
    // console.log(image);
    await addDoc(collection(FIREBASE_DB, "chats"), {
      _id, createdAt, text, user, image
    })

  }, [])
  return (
    <GiftedChat


      messages={messages}
      text={text}
      // isTyping
      isCustomViewBottom
      alwaysShowSend
      renderSend={(props) => (
        <Send
          {...props}
          disabled={!props.text}
          containerStyle={{
            width: 44,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 4,
          }}
        >
          <Image
            style={{ width: 32, height: 32 }}
            source={send}
          />
        </Send>
      )}
      renderComposer={(props) => (
        <Composer
          placeholder='Aa'
          {...props}
          textInputStyle={{
            fontSize: 16,
            fontFamily: "",
            color: '#000',
            backgroundColor: '#e8e9eb',
            opacity: 0.5,
            borderWidth: 1,
            borderRadius: 20,
            borderColor: "transparent",
            paddingHorizontal: 12,
            marginLeft: 0,
            paddingLeft: 15
          }}
        />
      )}
      renderActions={(props) => (
        <Actions
          {...props}
          containerStyle={{
            width: 44,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 4,
            marginRight: 4,
            marginBottom: 0,
          }}
          icon={() => (
            <Image
              style={{ width: 20, height: 20 }}
              source={camera}
            />
          )}
          options={{
            'Choose From Library': async () => {
              // here
              // (async () => {
              //   const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
              //   setHasGalleryPermission(galleryStatus.status == "granted")
              // })()

              await pickImage()
              // console.log('Choose From Library');
            },
            Cancel: () => {
              console.log('Cancel from Library');
            },
          }}
          optionTintColor="#222B45"
        />
      )}
      renderInputToolbar={props => < InputToolbar
        {...props}

        containerStyle={{
          backgroundColor: '#fff',
          padding: 8,

        }}
        primaryStyle={{ alignItems: 'center' }}
      />


      }
      // renderSystemMessage = {(props) => (
      //   <SystemMessage
      //     {...props}
      //     containerStyle={{ backgroundColor: 'pink' }}
      //     wrapperStyle={{ borderWidth: 10, borderColor: 'white' }}
      //     textStyle={{ color: 'crimson', fontWeight: '900' }}
      //   />
      // )}
      // renderBubble= {(props) => (
      //   <Bubble
      //     {...props}
      //     // renderTime={() => <Text>Time</Text>}
      //     // renderTicks={() => <Text>Ticks</Text>}
      //     containerStyle={{
      //       left: { borderColor: 'teal', borderWidth: 8 },
      //       right: {},
      //     }}
      //     wrapperStyle={{
      //       left: { borderColor: 'tomato', borderWidth: 4 },
      //       right: {},
      //     }}
      //     bottomContainerStyle={{
      //       left: { borderColor: 'purple', borderWidth: 4 },
      //       right: {},
      //     }}
      //     tickStyle={{}}
      //     usernameStyle={{ color: 'tomato', fontWeight: '100' }}
      //     containerToNextStyle={{
      //       left: { borderColor: 'navy', borderWidth: 4 },
      //       right: {},
      //     }}
      //     containerToPreviousStyle={{
      //       left: { borderColor: 'mediumorchid', borderWidth: 4 },
      //       right: {},
      //     }}
      //   />
      // )}
      renderUsernameOnMessage
      showAvatarForEveryMessage
      scrollToBottom
      onInputTextChanged={setText}
      onSend={messages => onSend(messages)}
      user={{
        _id: auth?.currentUser?.uid,
        avatar: 'https://i.pravatar.cc/500',
        name: "yassine"
      }}
    />
  )
}

export default Chat