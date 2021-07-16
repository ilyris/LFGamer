import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import S from 'styled-components';
import axios from 'axios';
import {env_be_url} from '../../globalVars/envURL';

 function Conversation({c,loggedInUserId}) {
    const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [month, setMonth] = useState(null)
  const [date, setDate] = useState(null)
  const [fromText, setFromText] = useState('');
  console.log(c);

  const handleOpenConversation = (e) => {
    const userId = e.target.getAttribute("data-user-id");
      dispatch({type: 'SET_USER_CONNECTIONS', payload: {userId: userId, friendUsername: user.username}})
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
    const getLastReceivedMessage = async () => {
      try {
        const res = await axios.get(`${env_be_url}message/${c.id}`);
        console.log(res.data);
        setMessage(res.data);

        const dateArray = Date(res.data.created_at).split(' ');
        setMonth(dateArray[1]);
        setDate(dateArray[2]);
        if(loggedInUserId == res.data.senderId) { 
          setFromText('You: ');
        } else {
          setFromText(`${res.data.username}: ` );
        }
      } catch(err) {
        console.log(err);
      }
    }
    getLastReceivedMessage();
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
                {message && message.text}
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