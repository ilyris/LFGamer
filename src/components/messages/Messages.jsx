import React,{useState, useEffect, useRef} from 'react';
import S from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import '../../App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCircle } from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
import { decodeJWT } from '../../helperFuncs/cookie';


// let authToken = localStorage.getItem('auth-token');

const Messages = (props) => {

    // local state
    const [messageInput, setMessageInput] = useState('');
    const [userTyping, setUserTyping] = useState('');
    const [messages, setMessages] = useState('')
    console.log(props.conversationMessages)
    // dispatch
    const dispatch = useDispatch();
    console.log(props);
    // Redux State
    const socket = useSelector(state => state.messageConnections.socket);
    // const activeMessages = useSelector(state => state.messageConnections.messages);

    const handleMessageInput = (event) => {
        setMessageInput(event.target.value);

        // When user types, emit the event to the chat API that a user is typing.
        socket.emit('typing', {firstName: props.activeMessageSessions.firstName, lastName: props.activeMessageSessions.lastName});
    }
    // const sendMessage = (event,messageInputValue) => {
    //      if(messageInputValue == false) {
    //          event.preventDefault();
    //          return;
    //      } 
    //     event.preventDefault();
    //     // need an axios call to post these messages.
    //     axios.post(`${process.env.REACT_APP_API_LOCAL || process.env.REACT_APP_API_URL}/send-message`, {
    //         senderId: loggedInUserId,
    //         receiverId: props.activeMessageSessions.id,
    //         message: messageInputValue,
    //         sentAt: Date.now()
    //     }, {
    //         headers: {
    //             "content-type": "application/json", // Tell the server we are sending this over as JSON
    //             "authorization": authToken // Send the token in the header from the client.
    //         }
    //     })
        
    //     .then(response => {
    //         console.log(response);
    //         dispatch({
    //             type: "SET_MESSAGES",
    //             payload: {
    //               senderId: loggedInUserId,
    //               receiverId: props.activeMessageSessions.id,
    //               message: messageInputValue,
    //               sentAt: Date.now()
    //             }
    //           });
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })
    //     setMessageInput('');
    // }             

    const socketIOMessage = (event,messageInputValue) => {
        event.preventDefault();

        // When a user sends their message, emit an event to the chat API with the data {chatId / message}
        socket.emit('private-message', {
            // chatId: props.activeMessageSessions.id,
            message:messageInputValue
        });
        setMessageInput('');
        setUserTyping('');
    }

    // set up id to close message container out
    const handleClose = (e) => {
        const id = e.target.parentElement.getAttribute('data-user-id');
        dispatch({type: "DELETE_MESSAGE_SESSION", payload: id}) ;
    }
    const minimizeMessage = (event) => {
        event.target.parentElement.classList.toggle('minimize');
    }
    const messageTimestamp = (date) => {
        const dateObj = new Date(date);

        let dateString = dateObj.toDateString();
        dateString = dateString.split(' ');
        dateString = `${dateString[1]} ${dateString[2]}`;

        let sentAt = dateObj.toLocaleTimeString().split(':');
        sentAt = `${sentAt[0]}:${sentAt[2]}`;

        return [dateString, sentAt];
    }
    // useEffect( () => {
    //     socket.on('update-messages', message => {
    //         console.log(message);
    //         dispatch({
    //             type: "SET_MESSAGES",
    //             payload: {
    //             // senderId: loggedInUserId,
    //             // receiverId: props.activeMessageSessions.id,
    //             message: message,
    //             sentAt: Date.now()
    //             }
    //         });
    //     });
    //     socket.on('typing', data => {
    //         setUserTyping(data);
    //     })
    // }, [])

        // Emit an event "prive-message" to the backend with the user id and the active session id
        // socket.emit('private-message', loggedInUserId, props.activeMessageSessions.id)

        // listen to the message-received event and bring in the data it sends on that event.
        // socket.on(`message-received-${props.activeMessageSessions.id}`, data => {
        //     console.log(data)
        //     setMessages(data.message);
        // })

        // Listen to the typing event and display that data.


        // only show messages matching props.convo.id
    return(
        <MessageContainer data-user-id={props.activeMessageSessions.userId}>
            <MessagedUserName onClick={minimizeMessage}><StyledLink to={`/profile/${props.activeMessageSessions.userId}`}>{props.activeMessageSessions.friendUsername}</StyledLink></MessagedUserName>
            <ExitButton onClick={(e) => handleClose(e)}><StyledIcon icon={faTimes}/></ExitButton>
            <InnerMessagesContainer>
                {props.conversationMessages.length > 0 ? props.conversationMessages.map( (message,index) => {
                    const  [dateString, sentAt] = messageTimestamp(message.created_at);

                    if(message.id == props.loggedInUserId ){
                        return (
                            <UserMessages isFromFriend={false} >
                                <CardAvatar src={`https://cdn.discordapp.com/avatars/${message.discord_id}/${message.avatar}.png`} />
                                <TitleAndContentMessageCotnainer>
                                    <StyledUsername isFromFriend={false} >{message.username} <StyledCircle icon={faCircle}/> <MessageTime>{sentAt}</MessageTime></StyledUsername>
                                    <StyledP>{message.text}</StyledP>
                                </TitleAndContentMessageCotnainer>
                            </UserMessages>
                        )
                    } else {
                        return (
                            <UserMessages isFromFriend={true}>
                                 <CardAvatar src={`https://cdn.discordapp.com/avatars/${message.discord_id}/${message.avatar}.png`} />
                                <TitleAndContentMessageCotnainer>
                                    <StyledUsername isFromFriend={true} >{message.username} <StyledCircle icon={faCircle}/> <MessageTime>{sentAt}</MessageTime> </StyledUsername>
                                    <StyledP>{message.text}</StyledP>
                                </TitleAndContentMessageCotnainer>
                            </UserMessages>
                        )
                    }
                 }) : null}   
            </InnerMessagesContainer>
            {userTyping ? <UserTypingMessageAlert>{userTyping}</UserTypingMessageAlert> : null}
            <StyledForm onSubmit={(event) => socketIOMessage(event,messageInput)}>
                <StyledInput contentEditable={true} onChange={handleMessageInput}  type="textarea" value={messageInput}></StyledInput>
                <StyledButton>Send</StyledButton>
            </StyledForm>
        </MessageContainer>
    );
}

export default Messages;

const MessageContainer = S.div`
    width: 300px;
    border: 1px solid #000;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    border-bottom: none;
    margin-left: 10px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    background-color: #fff;
    max-height: 500px;
    max-width: 500px;
    transition: all ease-in-out 300ms;
    position: relative;
`;
const MessagedUserName = S.h3`
    background-color: #494848;
    width: 100%;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    letter-spacing: 1px;
    line-height: 40px;
    text-transform: capitalize;
    text-align: left;
    padding-left: 10px;
    min-width: 100.3%;
    transition: 150ms ease-in-out all;
    &: hover {
        cursor: pointer;
        background-color: rgb(96 95 95); 
    }
`;
const InnerMessagesContainer = S.div`
    background-color: #fff;
    height: 300px;
    flex-direction: column;
    width: 100%;
    overflow-y: scroll;
`;
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
    font-size: .4rem;
    color: #000;
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
const StyledLink = S(Link)`
    font-size: 1.6rem;
    color: #fff;
    font-weight: bold;
    text-decoration: none;

    &: hover {
        text-decoration: underline;
    }
`;
const StyledInput = S.input`
    width: 200px;
    min-width: 200px;
    font-size: 2rem;
    border: none;
    outline: none;
    min-height: 10px;
    max-height: 100px;
    overflow: auto;
    padding: 12px 10px 0 12px;
`;
const StyledButton = S.button`
    background: linear-gradient(to right, rgb(118, 238, 116) 0%, rgb(0, 152, 142) 100%);
    color: #fff;
    border: unset;
    padding: 3px;
    font-size: 1.8rem;
    min-width: 50px;
    width: 80px;
    transition: all ease 120ms;
    &: hover {
        cursor: pointer;
        background-color: rgb(118, 238, 116);
    }
`;
const StyledForm = S.form`
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #000;
`;
const UserTypingMessageAlert = S.p`
    background-color: #ddd;
    border-radius: 15px;
    padding: 2px 15px;
    font-size: 12px;
    margin: 0 0 10px 10px;
`;
const StyledIcon = S(FontAwesomeIcon)`
    pointer-events: none;
`;
const ExitButton = S.div`
    font-size: 24px;
    color: #fff;
    padding: 2px 5px 0px 5px;
    text-align: right;
    z-index: 1000;
    transition: all ease 120ms;
    right: 10px;
    position: absolute;
    &:hover {
        cursor: pointer;
        color: #000;
    }
`;