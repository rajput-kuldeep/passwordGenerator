import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
    const [length, setLength] = useState(6);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [password, setPassword] = useState("")

    const passwordRef = useRef(null)

    const passwordgenerator = useCallback(()=>{
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(numberAllowed) str+= 1234567890;
      if(charAllowed) str+= "`!@#$%^&*)(}{[]?"

      for (let i=1; i<=length; i++){
        let char = Math.floor(Math.random() * str.length + 1)
        pass +=  str.charAt(char)
      }
      setPassword(pass)
        
      }, [length, numberAllowed, charAllowed, setPassword])

      const copyPasswordToClipboard = useCallback(()=>{
        passwordRef.current?.select()
        window.navigator.clipboard.writeText(password)
      }, [password])
      
      useEffect(()=>{
        passwordgenerator()
      }, [length, numberAllowed, charAllowed, passwordgenerator])
      

  return (
    <>
     <div className='w-full max-w-md mx-auto rounded-lg px-4 py-8 shadow-lg text-orange-600 bg-gray-700 my-8'>
      <h1 className='text-white text-center  mb-4'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" 
        value={password} 
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
         />
         <button className='outline-none  py-1 px-3 bg-blue-600' onClick={copyPasswordToClipboard}>copy</button>
      </div>
      <div className='flex gap-x-2 text-sm'>
        <div className='flex gap-x-1 items-center'>
          <input type="range"
          min={6}
          max={30}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
           />
           <label >length: {length}</label>

          <input type="checkbox"
           defaultChecked = {numberAllowed}
           onChange={()=>{setNumberAllowed((prev) => !prev)}}

          />
          <label >Number</label>

          <input type="checkBox"
          defaultChecked = {charAllowed}
          onChange={()=>setCharAllowed((prev)=> !prev)} />
          <label>character</label>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
