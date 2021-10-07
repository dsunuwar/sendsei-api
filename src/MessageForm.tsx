import React from "react";
import './MessageForm.css';

import { sendSMS } from './service';
import { Message } from './MessagePage';

interface Props {
  updateMessage: (t: Message) => void,
}

const MessageForm: React.FC<Props> = ({ updateMessage }) => {
  const [sender] = React.useState("Enterprise");
  const [recipient, setRecipient] = React.useState("");
  const [message, setMessage] = React.useState("");
  
  const [formValid, setFormValid] = React.useState(false);

  // assuming max length of single sms text is 160 chars
  // 3 * 160 would be 3 sms worth of text
  const MESSAGE_MAX_LENGTH = 3 * 160;

  const validateMessage = (e: any) => {
    const { name, value } = e.target;
    if(name === 'message' && value.length < MESSAGE_MAX_LENGTH) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
    setMessage(value);
  }
  
  const handleSubmit = (e: React.FormEvent)  => {
    e.preventDefault();
    if(formValid) {
      sendSMS(sender, recipient, message)
        .then((res: any) => updateMessage(res));

      setFormValid(false);
    }
  };

  return (
    <div className="MessageForm">
      <header>Send SMS</header>
      <form noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Sender:</label>
          <input 
            readOnly
            id="sender" 
            name="sender"
            type="text" 
            value={sender} />
        </div>
        <div>
          <label htmlFor="recipient">Recipient:</label>
          <input 
              id="recipient"
              name="recipient"
              type="text" 
              placeholder="Recipent name"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea 
              id="message"
              name="message"
              placeholder="Message"
              rows={5}
              cols={17}
              value={message}
              onChange={(e) => validateMessage(e)}
              />
        </div>        
        <input type="submit" value="Submit" disabled={!formValid}/>
      </form>
    </div>
  );
};

export default MessageForm;
