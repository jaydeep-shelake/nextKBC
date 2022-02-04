import React, { useEffect, useState } from 'react';
import style from '../styles/Main.module.css'
import { data } from './data';
import Timmer from './Timmer';
import useSound from 'use-sound';

const Quiz = ({setTimeStop, setQuNo,queNo,fiftyFity,setFity}) => {
   const play ='/play.mp3'
   const correct='/correct.mp3'
   const wait = '/wait.mp3'
   const wrong ='/wrong.mp3'
    const [que,setQue]=useState()
    const [selectedAns,setSelectedAns]=useState()
    const [currentcClass,setCurrentClass]=useState()
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

            })
              
          }
          else{
            timeOut(1000,()=>{
              wrongAns()
              setTimeStop(true)
              setFity(false)

            })
          }
      })
    }
  return(
    <div className={style.questionArea}>
     <Timmer setTimeStop={setTimeStop} queNo={queNo} wrongAns={wrongAns}/>
      <div className={style.question}>
       <h3>{que?.question}</h3>
      </div>
      <div className={style.ans}>
          {fiftyFity?(
            que?.answers?.map((ans,i)=>(
             ans.fifty===true&&<div key={i} onClick={()=>handleClick(ans)} className={`${style.opts} ${selectedAns===ans&&currentcClass}`}>{ans.text}</div>
          )) 
          ):(
            que?.answers?.map((ans,i)=>(
              <div key={i} onClick={()=>handleClick(ans)} className={`${style.opts} ${selectedAns===ans&&currentcClass}`}>{ans.text}</div>
          )) 
          )
            
          }

      </div>
      
   </div>
  );
};

export default Quiz;
