// there's a proxy config in package.json that specifies all unknown requests are proxied to the sendsei api
// this means instead of making a call to https://api.transmitmessage.com/v1/sender you would call just /v1/sender

type SendSMSResponse = void;

export const sendSMS = (
  sender: string,
  recipient: string,
  message: string
): SendSMSResponse => {};
