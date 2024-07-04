import { useState, useCallback , useEffect, useRef} from "react";
//useref hook- kisi bhi chiz(element) ka refernce lena ho to useref hook , use krne ke lie ek varirable banana padta hai

function App() {
  const [length, setlength] = useState(8);
  const [numallowed, setnumallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [password, setpassword] = useState("");

  //useRef hook
  //useref hook- kisi bhi chiz(element) ka refernce lena ho to useref hook , use krne ke lie ek varirable banana padta hai
  const passwordRef = useRef(null); // check on  copy button argumentss on ref is passed



  //usecallback functions ko memorise krta h jitna hoskta ya uske threads ko
  // usecallback for remebeering the function  usecallback hook for optimazation (not mandatory)
  // two arguments 1. callback,2. dependicies(jispe run krega)
  const passwordgenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVEXYZ";
    if (numallowed) str += "0123456789";
    if (charallowed) str += "!@#$%^&*()~?}]{[}";
    let curpasword = "";
    for (let i = 1; i <= length; i++) {
      let idx = Math.floor(Math.random() * str.length + 1);
      curpasword += str.charAt(idx - 1);
    }
    setpassword(curpasword);
  }, [length, numallowed, charallowed, setpassword]);



  //here not mandatory to use useCallback ,just for optimazation purposes
  const copyPassword = useCallback(() => {
    // accessing clipbord- it is inside window object(only accessible in frontend not on server)
    //now here can be used without useRef but for giving users more optimsiable results (like object accessible, present or not)'
    passwordRef.current?.select(); // ? to check whether something is present or not in current
    passwordRef.current?.setSelectionRange(0, 3); //for giving range of selection
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // not mandatory to use useeffect and usecallback, these are only for optimazation purposes
  // i have impmented it without using with this see onclick comment





  //for anytype of chhedchhad  UseEffect hook
  // two arguments 1. callback,2. dependicies(jispe run krega)
  useEffect(() => {
    passwordgenerator();
  }, [length, numallowed, charallowed]);

  
  return (
    <>
      <div
        className="w-full max-w-md mx-auto text-center shadow-md rounded-lg px-4 py-3 my-8 text-orange-500
      bg-gray-800"
      >
        <h1 className="text-white text-center"> Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPassword}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              id="incbutton"
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setlength(e.target.value);
                // changethepassword();
              }}
            />
            <label htmlFor="incbutton"> Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numallowed}
              id="numallowed"
              onChange={() => {
                setnumallowed((prv) => !prv);
                // changethepassword();
              }}
            />
            <label htmlFor="numallowed">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charallowed}
              id="charallowed"
              onChange={() => {
                setcharallowed((prv) => !prv);
                // changethepassword();
              }}
            />
            <label htmlFor="charallowed">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

// import React,{ useState, useCallback } from 'react'
// function App() {
//

//   return (
//     <>
//       <h1 className="text-orange-500">Hello world!</h1>
//       <h1 className="text-3xl font-bold underline">Hello world!</h1>
//     </>
//   );
// }

// export default App
