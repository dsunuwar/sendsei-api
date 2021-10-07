// there's a proxy config in package.json that specifies all unknown requests are proxied to the sendsei api
// this means instead of making a call to https://api.transmitmessage.com/v1/sender you would call just /v1/sender
import { Message } from './MessagePage';
type SendSMSResponse = Promise<Message|void>;

const postMessage = async (url='', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'x-api-key': process.env.REACT_APP_API_KEY || '',
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(data),
    redirect: 'follow',
  });

return res.json();
}

export const sendSMS = (
  sender: string,
  recipient: string,
  message: string
): SendSMSResponse => {
  return postMessage('/v1/sms/message', { message, sender, recipient })
    .then(({ sms }) => {
      return {
        cost: sms.cost,
        message: sms.message,
        recipient: sms.recipient,
      };
    })
    .catch((err) => console.error(err));
};