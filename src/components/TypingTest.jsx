import React, { useEffect, useState } from 'react'

const paragraph=
"Technology has become an important part of modern life. Every day people use computers, smartphones, and the internet to communicate, learn new skills, and complete their work more efficiently. The rapid growth of technology has changed the way we live, study, and interact with each other. Students can now access educational resources online, attend virtual classes, and collaborate with classmates from different parts of the world.One of the biggest advantages of technology is that it saves time and increases productivity. Tasks that once required hours of manual work can now be completed in just a few minutes using digital tools. Businesses rely on software to manage data, communicate with clients, and analyze information to make better decisions. Because of these advancements, many industries have become more efficient and competitive. "

const TypingTest = () => {
  const [input,setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  //Timer Logic
  useEffect(() => {
    if (isStarted && timeLeft>0){
      const timer = setInterval(()=>{
        setTimeLeft((prev) => prev-1);
      },1000);
      return ()=> clearInterval(timer);
    }
    if (timeLeft === 0){
      setIsFinished(true);
      setIsStarted(false);
    }
    },[isStarted, timeLeft]);

    //Start Test
    const startTest = ()=>{
    if(!isStarted){
      setIsStarted(true);
      setIsFinished(false);
    }
    };

  // Enter key to start
  const handleKeyDown = (e) =>{
    if(e.key === "Enter" && !isStarted){
      e.preventDedfault();
      startTest();
    }
  };

  //Reset Test
  const resetTest = () =>{
    setInput("");
    setTimeLeft(60);
    setIsStarted(false);
    setIsFinished(false);
  };

  //Calculations
  const wordsTyped = input.trim().split(/\s+/).filter(Boolean).length;
  const timeSpent = 120-timeLeft;
  const wpm = 
      timeSpent > 0 ? Math.round((wordsTyped * 120) / timeSpent) : 0;
  
  const correctChars = input
   .split("")
   .filter((char, i) => char === paragraph[i]).length;

  const accuracy = input.length
    ? Math.round ((correctChars / input.length) * 100)
    : 0;

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-200 p-4'>
      <div className='bg-white w-full max-w-4xl p-6 rounded-xl shadow-2xl'>
        <h1 className='text-2xl text-blue-950 font-bold text-center mb-4'>
          Typing-Speed Test
        </h1>

        <p className='bg-blue-950 p-3 rounded mb-4 text-white'>
          {paragraph}
        </p>

        <textarea className='w-full border rounded p-3 focus-outline-none focus:ring disabled:bg-gray-100'
          rows="8"
          placeholder={
            isStarted
            ? "Start typing..."
            : "Click Start or press Enter"
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!isStarted || isFinished}
           />
           
         <div className='flex justify-between mt-4 text-sm font-semibold text-blue-950'>
          <span>⏱Time:{timeLeft}s</span>
          <span>⚡WPM: {wpm}</span>
          <span>🎯Accuracy: {accuracy}%</span>
         </div>

         <div className='flex gap-3 mt-5'>
          <button
          onClick={startTest}
          disabled={isStarted}
           className='flex-1 bg-blue-950 text-white py-2 rounded hover:bg-blue-800 disabled:opacity-50'
          >
            Start
          </button>

          <button
          onClick={resetTest}
           className='flex-1 bg-blue-950 text-white py-2 rounded hover:bg-blue-800'
          >
            Reset
          </button>
         </div>
         {!isStarted && !isFinished &&(
          <p className='text-center text-sm text-gray-500 mt-3'>
            Press <b>Enter</b> or click <b>Start</b> to begin
          </p>
         )}

         {isFinished && (
          <p className='text-center text-lg font-bold text-bold text-blue-900 mt-4'>
            Test completed 🎉
          </p>
         )}
      </div>
    </div>
  );
}

export default TypingTest
