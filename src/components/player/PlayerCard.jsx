import React, { useEffect } from "react";
import axios from "axios";
import S from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { rankedEmblemArr } from "../pages/RankImageExport";
import { roleArr } from "../pages/RoleImageExport";
import { PrimaryCtaLink } from "../pageComponents/PrimaryCtaLink";
import { env_be_url } from "../../globalVars/envURL";
import {getTimeAgo} from '../../helperFuncs/getTimeAgo';

export function Playercard({ listing,isOnline }) {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.root.loggedInUser);
  // Filter our the rank file
  let rank = rankedEmblemArr.filter((rank) => rank.name == listing.rank);
  rank = rank[0].file;

  const messageUser = (e) => {
    // Start a conversation

    axios
      .post(`${env_be_url}conversation/startConversation`, {
        senderId: loggedInUser.id,
        receiverId: listing.id,
      })
      .then((res) => {
        console.log(res);
        // This should be handled by the socket, so when we read a message came in the chat box displays.
        dispatch({
          type: "SET_USER_CONNECTIONS",
          payload: {
            userId: String(listing.id),
            friendUsername: listing.username,
            conversationId: res.data.id,
          },
        });

        // pretty certain this can be removed now, as it pointlessly pulls in the messages to the session
        // there is other logic doing that atm.
        // if(res.data.id) {
        //     axios.get(`${env_be_url}message/${res.data.id}`)
        //     .then(res => {
        //         dispatch({type: 'SET_MESSAGES', payload: res.data});
        //     })
        //     .catch(err => console.log(err));
        // }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div class="pesudoContainer position-relative col-4">
      <div class="p-4 d-flex flex-wrap bg-dark rounded">
        <Link
          class="secondary-link fs-3 w-100 d-flex flex-wrap align-items-center justify-content-center online-status"
          to={`/profile/${listing.id}`}
        >
          <div 
            style={isOnline ? {backgroundColor: '#76ee74'}: {backgroundColor: 'gray'}} 
            class="fixed-dim-10 rounded-circle me-4"
          >
          </div>
          <img
            class="fixed-dim-50 rounded-circle me-2"
            src={`https://cdn.discordapp.com/avatars/${listing.discord_id}/${listing.avatar}.png`}
          />
          {`${listing.username}#${listing.discriminator}`}
        </Link>
        <div class="w-100 my-3">
          <div class="d-flex flex-wrap justify-content-between mt-3">
            <div class="w-50">
              <p class="text-light fs-3 mb-0">Rank:</p>
              <img class="w-75" src={rank} />
            </div>
            <div class="w-50">
              <p class="text-light fs-3 mb-0">Roles:</p>
              <RoleContainer>
                {roleArr.map((role, i) => {
                  let doesContain = false;
                  listing.roles.map((userRole) => {
                    if (role.name == userRole) doesContain = true;
                  });
                  if (doesContain) {
                    return <CardRole src={role.file} key={i} />;
                  }
                })}
              </RoleContainer>
            </div>
          </div>
          <div class="d-flex flex-wrap justify-content-between mt-3">
            <div class="w-50">
              <p class="text-light fs-3 mb-0">Champions:</p>
              <ChampionContainer>
                {listing.champions.map((champion, i) => {
                  return (
                    <img class="rounded-circle fixed-dim-50"
                      key={i}
                      src={`${process.env.PUBLIC_URL}/assets/riot_games_champion_images/${champion}.png`}
                    />
                  );
                })}
              </ChampionContainer>
            </div>
            <div class="w-50">
              <p class="text-light fs-3 mb-0">Looking for:</p>
              <RoleContainer>
                {roleArr.map((role) => {
                  let doesContain = false;
                  listing.roles.map((userRole) => {
                    if (role.name == userRole) doesContain = true;
                  });
                  if (doesContain) {
                    return <CardRole src={role.file} />;
                  }
                })}
              </RoleContainer>
            </div>
          </div>
        </div>
        <Container>
          <LabelContainer backSide={true}>
            <LabelContainerText>Description</LabelContainerText>
            <Text>{listing.post_description}</Text>
          </LabelContainer>
        </Container>
      </div>
      <ButtonContainer>
        <PrimaryCtaLink handleClick={(e) => messageUser(e)} text={"Message"} />
      </ButtonContainer>
      <div class="position-absolute bottom-0 end-0">
        <p class="text-light p-4 bg-black fs-4 m-0 fst-italic" style={{borderTopLeftRadius: '15px', borderBottomRightRadius: '15px'}}>{getTimeAgo(Date.now(),listing.created_at)}</p>
      </div>
    </div>
  );
}
export default Playercard;

const Container = S.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #232323;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    border-radius: 10px;
    padding: 15px;
    transform: translateY(80%);
    transition: 400ms all ease;
    opacity: 0;
`;

const ListingCard = S.div`
    margin-right: 15px;
    border-radius: 15px;
    padding: 15px 15px 35px 15px;
    display: flex;
    flex-flow: row wrap;
    max-width: 350px;
    justify-content: space-between;
    background-color: #232323;
    border-radius: 10px;
    box-shadow: 2px 2px 8px #00000061;
    position: relative;
    overflow: hidden;
    min-height: 425px;
    align-items: baseline;
    &:hover {
        ${Container} {
          transform:translateY(20%);
          z-index: 10;
        opacity: 1;
        }
    }
`;

const LeftColumn = S.div`
    flex: 1;
`;
const CardRank = S.img`
    width: 100px;
    height: auto;
    margin-top: 10px;

`;
const RoleContainer = S.div`
    margin-top: 10px;

`;
const CardRole = S.img`
    width: 45px;
    height: auto;
`;
const InformationContainer = S.div`
    display: flex;
    width: 100%;
    margin-top: 20px;
`;
const LabelContainer = S.div`
    width: ${(props) => (props.backSide ? "100%" : "49%")};
`;
const LabelContainerText = S.p`
    font-size: 14px;
    color: gray;
`;
const ChampionContainer = S.div`
    flex-flow: row wrap;
    justify-content: center;
    width: 100%;
    display: flex;
    margin-top: 10px;
    min-height: 100px;
`;
const ChampionImg = S.img`
    border-radius: 50%;
    margin: 5px;
    max-width: 40px;
    height: 40px;
`;
const Text = S.p`
    font-size: 18px;
    color: #fff;
    margin-top: 10px;
`;
const ButtonContainer = S.div`
    display: flex;
    width: 100%;
    justify-content: center;
    position: absolute;
    left: 0;
    bottom: -26px;
    z-index: 1000;
    pointer-event: none;
`;
