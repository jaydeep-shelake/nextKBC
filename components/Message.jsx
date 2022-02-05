import React from 'react';
import style from '../styles/Msg.module.css'
const Message = ({amount,show}) => {
  return (
      <div className={`${style.blackScreen} ${show&&style.show} `}>
         <div className={style.box}>
              <h4>Game Over !!</h4>
              <h2>You earned: <span>Rs. {amount}</span></h2>   
              <button onClick={()=>location.reload()}>Replay</button>
         </div>
      </div>
  );
};

export default Message;
