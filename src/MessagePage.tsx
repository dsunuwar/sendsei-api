import React from "react";

import MessageDisplay from "./MessageDisplay";
import MessageForm from "./MessageForm";

export type Message = {
  cost: number,
  message: string,
  recipient: string,
}

const MessagePage = () => {
  const [sentMessages, setSentMessages] = React.useState<Message[]>([]);

  const updateMessage = (sms: Message) => {
    if(sms) {
      setSentMessages([...sentMessages, sms]);
    }
  };

  return (
    <div className="MessagePage">
      <MessageForm updateMessage={updateMessage}/>
      <MessageDisplay sentMessages={sentMessages}/>
    </div>
  );
};

export default MessagePage;
