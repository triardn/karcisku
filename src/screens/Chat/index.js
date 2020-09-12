import React, {useState, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const usr = auth().currentUser;
    setUser(usr);
    getData();

    return () => {
      const db = database().ref('messages');
      if (db) {
        db.off();
      }
    };
  }, []);

  const getData = () => {
    database()
      .ref('messages')
      .limitToLast(20)
      .on('child_added', (snapshot) => {
        const value = snapshot.val();
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, value),
        );
      });
  };

  const onSend = (msgs = []) => {
    for (let i = 0; i < msgs.length; i++) {
      database().ref('messages').push({
        _id: msgs[i]._id,
        created: database.ServerValue.TIMESTAMP,
        text: msgs[i].text,
        user: msgs[i].user,
      });
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(msgs) => onSend(msgs)}
      user={{
        _id: user.uid,
        name: user.email,
        avatar: 'https://ui-avatars.com/api/?name=user',
      }}
    />
  );
};

export default Chat;
