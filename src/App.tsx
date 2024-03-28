import React, { memo, useState } from 'react';
import './App.css';
import Notify from './component/Notify';
import { NotifyMessageType } from './types';


const App: React.FC = memo(() => {
  const messages: NotifyMessageType[] = [
    {
      id: new Date().getTime() + Math.random(),
      title: "Success",
      message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam fugiat tempora at asperiores! Dolores nostrum reiciendis voluptates, fugiat magnam voluptatem numquam labore, laboriosam dolorem quasi eum ducimus officia itaque. Sapiente animi perferendis sint minus debitis, veritatis ipsa expedita at delectus saepe soluta doloribus fugit voluptatibus architecto aut nulla ipsam tempora culpa quae veniam asperiores sed voluptate ab? Enim ad debitis tempora unde nihil reprehenderit vero numquam quia repellendus optio aperiam praesentium, expedita ut illum eos fugiat reiciendis modi nulla quibusdam ullam eligendi atque blanditiis. Aliquam temporibus, vitae repellendus nemo cum suscipit modi perferendis tempora hic eos repudiandae, ex eaque expedita ipsam harum. Quae enim dicta repudiandae? Cumque magni aliquam neque debitis voluptatibus aliquid eum nesciunt nam? Aperiam, rem. Recusandae illum aut repudiandae vel eos distinctio ut veniam vitae ipsa consequatur veritatis qui et pariatur suscipit soluta minima ad saepe dicta repellendus velit voluptas, consectetur necessitatibus incidunt ex. Consequatur, dicta porro?",
      type: "success"
    },
    {
      id: new Date().getTime() + Math.random(),
      title: "Error",
      message: "An error occurred",
      type: "error"
    },
    {
      id: new Date().getTime() + Math.random(),
      title: "Info",
      message: "Here's some information",
      type: "info"
    },
    {
      id: new Date().getTime() + Math.random(),
      title: "Warning",
      message: "Warning! Proceed with caution",
      type: "warning"
    }
  ];
  const [toastMesssage, setToastMessage] = useState<NotifyMessageType | null>(null);

  const addMessageToToaster = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];
    setToastMessage(randomMessage);
  }


  return (
    <div id="main">
      <button onClick={addMessageToToaster}>Add Message</button>
      <Notify onClose={() => { }} messages={toastMesssage} />
    </div>
  );
});

export default App;
