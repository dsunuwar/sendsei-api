import React from "react";

import MessageDisplay from "./MessageDisplay";
import MessageForm from "./MessageForm";

const MessagePage = () => {
  return (
    <div className="MessagePage">
      <MessageForm />
      <MessageDisplay />
    </div>
  );
};

export default MessagePage;
