import React from "react";

type Message = {
  cost: number,
  message: string,
  recipient: string,
}

interface Props {
  sentMessages: Array<Message>
}

const MessageDisplay: React.FC<Props> = ({ sentMessages=[] }) => {
  return (
    <div className="MessageDisplay">
      <header>Sent SMS</header>
      <ul>
        {sentMessages.map(({ cost, message, recipient }, index) => (
          <React.Fragment key={`${index}recipient`}>
            <li>
              {`Cost: ${cost}, Message: ${message}, Recipient: ${recipient}`}
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default MessageDisplay;