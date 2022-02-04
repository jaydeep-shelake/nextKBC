import React, { useEffect ,useState} from 'react';
import style from '../styles/Main.module.css'
const Timmer = ({setTimeStop,queNo,wrongAns}) => {
    const [timer ,setTimer]=useState(30)
    
    useEffect(()=>{
        if(timer===0) {
          wrongAns()
            return setTimeStop(true)
        }
        const id = setInterval(()=>{
            setTimer(prev=>prev-1)
        },1000)
        return ()=>clearInterval(id)
    },[setTimeStop,timer])

    useEffect(()=>{
       setTimer(30)
    },[queNo])
  return (
    <div className={style.timer}>{timer}</div>
  );
};

export default Timmer;
