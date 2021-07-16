const cookieValue = document.cookie ? document.cookie.split(';').find(row => row.startsWith('token=')).split('=')[1] : '';



function clearOutputCookieValue() {
  let output = document.cookie;
  output = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"

}
const decodeJWT = (jwt) => {
    if(!jwt) return;
    let token = {};
    token.raw = jwt;
    token.header = JSON.parse(window.atob(jwt.split('.')[0]));
    token.payload = JSON.parse(window.atob(jwt.split('.')[1]));
    return (token)
}

export { cookieValue, clearOutputCookieValue, decodeJWT };
