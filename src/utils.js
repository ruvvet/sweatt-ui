import dotenv from 'dotenv';
dotenv.config();

export const API = process.env.REACT_APP_API_HOST;

export default async function OTPRequest(url, options, returnRaw = false) {
  // get the code from local storage via the key UWU_TOKEN
  const userToken = localStorage.getItem('OTP_TOKEN');

  const headers = {
    ...options.headers,
    // 'Content-Type': 'application/json',
    'x-otp-user': userToken,
  };

  const response = await fetch(`${API}${url}`, { ...options, headers });

  if (response.status === 401) {
    // if 401, get rid of token, kick them out so they get a new one
    localStorage.removeItem('OTP_TOKEN');
    return '401';
  }

  const contentType = response.headers.get('Content-Type');

  if (!returnRaw && contentType && contentType.includes('application/json')) {
    return response.json();
  }

  return response;
}



export function discordAvatar (id, avatar){

  return `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`



}