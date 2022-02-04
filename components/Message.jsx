import React from 'react';
import style from '../styles/Msg.module.css'
const Message = ({amount,show,setShow}) => {
  return (
      <div onClick={()=>setShow(false)} className={`${style.blackScreen} ${show&&style.show} `}>
         <div className={style.box} onClick={(e)=>e.stopPropagation()}>
              <h4>Game Over !!</h4>
              <h2>You earned: <span>Rs. {amount}</span></h2>   
              <button onClick={()=>setShow(false)}>Replay</button>
         </div>
      </div>
  );
};

export default Message;
