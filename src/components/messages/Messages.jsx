import React,{useState, useEffect, useRef} from 'react';
import S from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import '../../App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { env_be_url } from '../../globalVars/envURL';
import UserMessage from './UserMessage';


// let authToken = localStorage.getItem('auth-token');

const Messages = (props) => {
    // local state
    const [messageInput, setMessageInput] = useState('');
    const [userTyping, setUserTyping] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    // dispatch
    const dispatch = useDispatch();
    const scrollRef = useRef(null);
    // Redux State
    const socket = useSelector(state => state.messageConnections.socket);


    const handleMessageInput = (event) => {
        setMessageInput(event.target.value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const messageObject = {
            conversationId: props.activeMessageSessions.conversationId,
            senderId: props.loggedInUserId,
            text: messageInput,
        }

        socket.emit("send-message", {
            senderId: props.loggedInUserId,
            receiverId: props.activeMessageSessions.userId,
            conversationId: props.activeMessageSessions.conversationId,
            text: messageInput

        })
        try {
            const res = await axios.post(`${env_be_url}message`, messageObject);
            dispatch({type: 'SET_MESSAGES', payload: res.data});
            setMessageInput('');
        } catch(err) {
            console.log(err)
        }
    }
    // set up id to close message container out
    const handleClose = (e) => {
        const id = e.target.parentElement.getAttribute('data-user-id');
        dispatch({type: "DELETE_MESSAGE_SESSION", payload: {userId: id}});
    }

    const minimizeMessage = (event) => {
        event.target.parentElement.classList.toggle('minimize');
    }

    
    function toTimestamp(strDate){
        var datum = Date.parse(strDate);
        // return datum/1000;
        return Math.round(datum);
    }

    useEffect(() => {
        socket.on('getMessage', (data) => {
            setArrivalMessage({
                username: data.username,
                avatar: data.avatar,
                discord_id: data.discord_id,
                conversationId: data.conversationId,
                sender: data.senderId,
                text: data.text,
                created_at: Date.now()
            })
        })
        return () => {
            setArrivalMessage(null);
        }
    }, [])

    useEffect(() => {
        if(arrivalMessage && props.activeMessageSessions.userId == arrivalMessage.sender) {
            dispatch({type: 'SET_MESSAGES', payload: arrivalMessage})
        }
    },[arrivalMessage, props.activeMessageSessions.userId, dispatch])

    useEffect(() => {
        console.log(scrollRef)
        console.log(props.conversationMessages)
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    },[ props.conversationMessages])

    return(
        <MessageContainer data-user-id={props.activeMessageSessions.userId}>
            <MessagedUserName onClick={minimizeMessage}><StyledLink to={`/profile/${props.activeMessageSessions.userId}`}>{props.activeMessageSessions.friendUsername}</StyledLink></MessagedUserName>
            <ExitButton onClick={(e) => handleClose(e)}><StyledIcon icon={faTimes}/></ExitButton>
            <InnerMessagesContainer data-cid={props.cid} ref={scrollRef} style={{transition: 'all ease 120ms', scrollBehavior: 'smooth'}} >
                {props.conversationMessages.length > 0 ? props.conversationMessages.map( (message,index) => {
                    toTimestamp(message.created_at);
                    // timestampToDate(toTimestamp(message.created_at))
                        if(message.id == props.loggedInUserId ){
                            return (
                                    <UserMessage key={index} message={message} isFromFriend={false}/>
                            )
                        } else {
                            return (
                                    <UserMessage key={index} message={message} isFromFriend={true}/>
                            )
                        }                        
                 }) : null}   
            </InnerMessagesContainer>
            {userTyping ? <UserTypingMessageAlert>{userTyping}</UserTypingMessageAlert> : null}
            <StyledForm onSubmit={(e) => handleSubmit(e)}>
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