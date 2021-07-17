import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import S from 'styled-components';
import axios from 'axios';
import {env_be_url} from '../../globalVars/envURL';

 function Conversation({c,loggedInUserId}) {
    const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const [month, setMonth] = useState(null)
  const [date, setDate] = useState(null)
  const [fromText, setFromText] = useState('');

  const handleOpenConversation = (e) => {
    const userId = e.target.getAttribute("data-user-id");
      dispatch({type: 'SET_USER_CONNECTIONS', payload: {userId: userId, friendUsername: user.username, conversationId: c.id}})
  }

  useEffect( () => {
    const getReceiverUser = async () => {
      console.log(c)
      let friendId = c.members.filter(id => id !== loggedInUserId)
      try {
        const res = await axios.post(`${env_be_url}login/user`, {user_id: 1});
        setUser(res.data);
        console.log(res);
      } catch(err) {
        console.log(err);
      }
    }
    getReceiverUser();
  }, [c.receiverId]);

  useEffect( () => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`${env_be_url}message/${c.id}`); // This is why we're only getting messages for a specific cid
        console.log(res.data);
        await setLastMessage(res.data[res.data.length - 1]);
        dispatch({type: 'SET_MESSAGES', payload: res.data});
        // dispatch all messages to our global state
        const dateArray = Date(res.data[res.data.length - 1].created_at).split(' ');
        setMonth(dateArray[1]);
        setDate(dateArray[2]);
        if(loggedInUserId == res.data[res.data.length - 1].senderId) { 
          setFromText('You: ');
        } else {
          setFromText(`${res.data[res.data.length - 1].username}: ` );
        }
      } catch(err) {
        console.log(err);
      }
    }
    getMessages();
  }, [c.cid]);



    return (
      <>
        {user &&
        <UserConversation data-user-id={user.id} onClick={handleOpenConversation}>
          <AvatarContainer>
            {user &&
            <CardAvatar
              src={`https://cdn.discordapp.com/avatars/${user.dis}/${user.avatar}.png`}
            />}
            <div>
              <CardUsername>
                {user && user.username}
                <ConversationTimestamp>
                  {month} {date}
                </ConversationTimestamp>
              </CardUsername>
              <LastMessage>
                {fromText}
                {lastMessage && lastMessage.text}
              </LastMessage>
            </div>
          </AvatarContainer>
        </UserConversation>
        }
      </>
    );
}
export default Conversation;


const UserConversation = S.div`
    display: flex;
    flex-flow: row wrap;
    padding: 10px;
    width: 100%;
    &: hover {
        cursor: pointer;
        background-color: #49484824;
    }
    &:last-of-type {
        padding-bottom: 10px;
    }
`;
const AvatarContainer = S.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    pointer-events: none;
    width: 100%;
`;
const CardAvatar = S.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;
const CardUsername = S.div`
    font-size: 16px;
    color: #191818;
    font-weight: 500;
    text-align: right;
    margin-left: 10px;
    text-align: left;
    display: flex;
    justify-content: space-between;
`;
const LastMessage = S.p`
    font-size: 12px;
    color: #191818;
    text-align: left;
    padding-left: 10px;
`;
const ConversationTimestamp = S.p`
    font-size: 12px;
    padding-top: 4px;
`;