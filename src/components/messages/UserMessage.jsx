import React from "react";
import S from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
function UserMessage({message,isFromFriend}) {

    const messageTimestamp = (date) => {
      CONSOLE.LOG(date);
        const dateObj = new Date(date);

        let dateString = dateObj.toDateString();
        dateString = dateString.split(' ');
        dateString = `${dateString[1]} ${dateString[2]}`;

        let sentAt = dateObj.toLocaleTimeString().split(':');
        sentAt = `${sentAt[0]}:${sentAt[2]}`;

        return [dateString, sentAt];
    }

    const  [dateString, sentAt] = messageTimestamp(message.created_at);

  return (
    <UserMessages isFromFriend={isFromFriend}>
      <CardAvatar
        src={`https://cdn.discordapp.com/avatars/${message.discord_id}/${message.avatar}.png`}
      />
      <TitleAndContentMessageCotnainer>
        <StyledUsername isFromFriend={isFromFriend}>
          {message.username} <StyledCircle icon={faCircle} />{" "}
          <MessageTime>{sentAt}</MessageTime>
        </StyledUsername>
        <StyledP>{message.text}</StyledP>
      </TitleAndContentMessageCotnainer>
    </UserMessages>
  );
}
export default UserMessage;

const UserMessages = S.div`
    height: fit-content;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 10px;
    display: flex;
    background-color: ${props => props.isFromFriend ? '#fff' : 'rgba(73, 72, 72, 0.14)'};
    min-width: 100%;
`;
const CardAvatar = S.img`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 10px;
`;
const TitleAndContentMessageCotnainer = S.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
`;
const StyledUsername = S.p`
    text-align: left;
    font-size: 1.6rem;
    color: #000;
    display: flex;
    align-items: center;
    font-weight: 600;
`;
const StyledCircle = S(FontAwesomeIcon)`
    font-size: .2rem;
    color: #0000007a;
    margin: 0 5px;
`;
const MessageTime = S.span`
    font-size: 1.2rem;
    color: #0000007a;
    font-weight: 100;
`;
const StyledP = S.p`
    text-align: left;
    font-size: 1.4rem;
    color: rgb(73, 72, 72);
`;