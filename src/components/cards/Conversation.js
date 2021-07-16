import React, {useState, useEffect} from 'react';
import S from 'styled-components';
import axios from 'axios';

 function Conversation({c,loggedInUserId}) {
    
    const dateArray = Date(c.updated_at).split(' ');
    const month = dateArray[1];
    const date = dateArray[2];
    let fromText;

    if(loggedInUserId == c.uid) {
        fromText = "You: ";
    }
    else {
        fromText = `${c.senderUsername}: `;
    }

    return (
      <UserConversation>
        <AvatarContainer>
          <CardAvatar
            src={`https://cdn.discordapp.com/avatars/${c.senderDiscordId}/${c.senderAvatar}.png`}
          />
          <div>
            <CardUsername>
              {c.senderUsername}
              <ConversationTimestamp>
                {month} {date}
              </ConversationTimestamp>
            </CardUsername>
            <LastMessage>
              {fromText}
              {c.text}
            </LastMessage>
          </div>
        </AvatarContainer>
      </UserConversation>
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