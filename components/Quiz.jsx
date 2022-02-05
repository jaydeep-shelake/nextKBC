import React, { useEffect, useState } from 'react';
import style from '../styles/Main.module.css'
import { data } from './data';
import Timmer from './Timmer';
import useSound from 'use-sound';

const Quiz = ({setTimeStop, setQuNo,queNo,fiftyFity,setFity,swip,setSwip}) => {
   const play ='/play.mp3'
   const correct='/correct.mp3'
   const wait = '/wait.mp3'
   const wrong ='/wrong.mp3'
    const [que,setQue]=useState(null)
    const [selectedAns,setSelectedAns]=useState(null)
    const [currentcClass,setCurrentClass]=useState(null)
    const [playGame]=useSound(play)
    const [correctAns]=useSound(correct)
    const [wrongAns]=useSound(wrong)
    const [waitSound]=useSound(wait)

    useEffect(()=>{
    playGame()
    },[playGame])
    useEffect(()=>{
      setQue(data[queNo-1])
    },[data,queNo])


    const timeOut=(time,callback)=>{
        setTimeout(() => {
           callback();
         
        },time);
    }

    const handleClick=(ans)=>{
      setSelectedAns(ans)
      setCurrentClass(style.active)
      
      timeOut(3000,()=>setCurrentClass(ans.correct?style.correct:style.wrong))
      timeOut(5000,()=>{
          if(ans.correct){
            correctAns()
            timeOut(1000,()=>{
              setQuNo(prev=>prev+1)
              setTimeStop()
              setFity(false)
              setSwip(false)

            })
              
          }
          else{
            timeOut(1000,()=>{
              wrongAns()
              setTimeStop(true)
              setFity(false)
             setSwip(false)
            })
          }
      })
    }

    const getQueType=()=>{
      if(fiftyFity&&!swip){
        return que?.answers?.map((ans,i)=>(
          ans.fifty===true&&<div key={i} onClick={()=>handleClick(ans)} className={`${style.opts} ${selectedAns===ans&&currentcClass}`}>{ans.text}</div>
       )) 
      }
      if(swip&&!fiftyFity){
       return que?.swipAns?.map((ans,i)=>(
          <div key={i} onClick={()=>handleClick(ans)} className={`${style.opts} ${selectedAns===ans&&currentcClass}`}>{ans.text}</div>
       )) 
      }
      if(swip&&fiftyFity){
       return que?.swipAns?.map((ans,i)=>(
          ans.fifty===true&&<div key={i} onClick={()=>handleClick(ans)} className={`${style.opts} ${selectedAns===ans&&currentcClass}`}>{ans.text}</div>
       )) 
      }
      else{
       return que?.answers?.map((ans,i)=>(
          <div key={i} onClick={()=>handleClick(ans)} className={`${style.opts} ${selectedAns===ans&&currentcClass}`}>{ans.text}</div>
      )) 
      }
    }
  return(
    <div className={style.questionArea}>
     <Timmer setTimeStop={setTimeStop} queNo={queNo} wrongAns={wrongAns}/>
      <div className={style.question}>
       <h3>{ swip?que.swipQue:que?.question}</h3>
      </div>
      <div className={style.ans}>
          {
          getQueType()   
          }

      </div>
      
   </div>
  );
};

export default Quiz;
