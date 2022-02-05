import Head from 'next/head'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Quiz from '../components/Quiz'
import Image from 'next/image'
import style from '../styles/Main.module.css'
import logo from '../assets/kbc.png'
import Message from '../components/Message'
export default function Home() {
 const [queNo,setQuNo]=useState(1)
 const [timeStop,setTimeStop]=useState(false)
  const [userName,setUserName]=useState(null)
  const [amountEraned,setAmountEarned]=useState('0')
  const [fiftyFity,setFity]=useState(false)
 const [showFifty,setShowFity]=useState(false)
 const [swip,setSwip]=useState(false)
const [showSwip,setShowSwip]=useState(false)
const [showMoney,setShowMoney]=useState(false)
  const inputRef=useRef(null)
  const money= useMemo(()=>
  [{ id: 1, amount: "₹ 5000" },
  { id: 2, amount: "₹ 10,000" },
  { id: 3, amount: "₹ 20,000" },
  { id: 4, amount: "₹ 40,000" },
  { id: 5, amount: "₹ 80,000" },
  { id: 6, amount: "₹ 1,60,000" },
  { id: 7, amount: "₹ 40,000" },
  { id: 8, amount: "₹ 3,20,000" },
  { id: 9, amount: "₹ 6,40,000" },
  { id: 10, amount: "₹ 12,50,000" },
  { id: 11, amount: "₹ 25 Lakh" },
  { id: 12, amount: "₹ 50 Lakh" },
  { id: 13, amount: "₹ 1 Crore" },
  { id: 14, amount: "₹ 3 Crore" },
  { id: 15, amount: "₹ 7 Crore" },]
 ,[])
  useEffect(()=>{
    if(queNo>1){
      setAmountEarned(money.find((m) => m.id === queNo - 1).amount)
    }
  },[money,queNo])
  console.log(amountEraned)

  const selectFiftyFity=()=>{
  setFity(true)
  setShowFity(true)
  }
  const selectSwip=()=>{
    setSwip(true)
    setShowSwip(true)
  }
  return (

    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
         <Message amount={amountEraned} show={timeStop} setShow={setTimeStop}/>
         <div className={style.menu} onClick={()=>setShowMoney(true)}>
           <Image src={"https://img.icons8.com/external-tal-revivo-tritone-tal-revivo/72/external-horizontal-separated-bars-representing-hamburger-menu-layout-grid-tritone-tal-revivo.png"} width={30} height={30}/>
         </div>
      <main className={style.main}>
        {
          userName?(
             <>
              <div className={style.questions}>
           <div className={style.topSec}>
            <Image className={style.logo} src={logo} width={100} height={110}/>
            <div className={style.lifeLine}>
              <p>Life lines: </p>
              {showFifty?(<div className={`${style.icon} ${style.iconDis}`}>
                 50/50
                 <div className={style.line}></div>
              </div>):(<div className={style.icon} onClick={selectFiftyFity}>
                50/50
              </div>)}
              
              {showSwip?(<div className={`${style.icon} ${style.iconDis}`} >
                Swip
                <div className={style.line}></div>

              </div>):(
                <div  className={style.icon} onClick={selectSwip}>
                    Swip
                </div>
              )}
            </div>
           </div>
            <Quiz setTimeStop={setTimeStop} setQuNo={setQuNo} queNo={queNo} fiftyFity={fiftyFity} setFity={setFity}
            swip={swip} setSwip={setSwip}
            />
         </div>
         <div className={`${style.money} ${showMoney&& style.showMoney}`}>
           <div className={style.close} onClick={()=>setShowMoney(false)}>
             <Image
             src={"https://digiflixtv.com/assets/web/svg/hamburger-close.svg"}
             width={30}
             height={30}
             />
           </div>
           <ul className={style.moneyList}>
             {
               money.slice(0).reverse().map((amount,i)=>(
                 <React.Fragment key={i}>
                <li key={i} className={queNo===amount.id?style.active:'list'}> 
                  <span>{amount.id}</span> <span>{amount.amount}</span>
                  </li>
                  </React.Fragment>
               ))
             }
            
            
           </ul>
         </div>
             </>
          ):(
            <div className={style.inputArea}>
              <input ref={inputRef} type="text" placeholder='Enter Your Name' />
              <button onClick={()=>setUserName(inputRef.current.value)}>Start</button>
            </div>
          )
        }
        
      </main>
    </div>
  )
}
