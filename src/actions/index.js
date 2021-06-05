import axios from "axios";

let authToken = localStorage.getItem("auth-token");

export const setLoggedInUser = apiResponse => {
    return {
        type: "SET_LOGGEDIN_USER",
        payload: apiResponse.data.loggedInUserData[0]
    };
};

export const toggleIsLoggedIn = flag => {
    return flag ? {
        type: "SET_ISLOADING",
        payload: true
    } : {
        type: "REMOVE_ISLOADING",
        payload: false
    };
};

export const setMessagesGet = (loggedInUserId) => {
    console.log(loggedInUserId)
    return dispatch => {
        return axios
            .get(
                `${process.env.REACT_APP_API_LOCAL ||
                            process.env.REACT_APP_API_URL}/profile/${loggedInUserId}/messages`, {
                    headers: {
                        "content-type": "application/json", // Tell the server we are sending this over as JSON
                        "authorization": authToken, // Send the token in the header from the client.
                    }
                }
            )
            .then(response => {
                const object = response.data.messages;
                console.log(object);
                object.forEach(object => {
                    dispatch({
                        type: "SET_MESSAGES",
                        payload: {
                            senderId: object.senderId,
                            receiverId: object.receiverId,
                            message: object.message,
                            sentAt: object.sentAt
                        }
                    });
                });
            })
            .catch(error => {
                console.log("the get request failed: " + error);
            });
    }

};
export const setUserSocket = socket => {
    return {
        type: "SET_USER_SOCKET",
        payload: socket,
    };
};