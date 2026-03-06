import React, { useEffect, useState } from 'react'

const paragraphs =[
"Technology has become an important part of modern life. Every day people use computers, smartphones, and the internet to communicate, learn new skills, and complete their work more efficiently. The rapid growth of technology has changed the way we live, study, and interact with each other. Students can now access educational resources online, attend virtual classes, and collaborate with classmates from different parts of the world.One of the biggest advantages of technology is that it saves time and increases productivity. ",

"Learning to type quickly and accurately is an important skill in today's digital world. Many jobs require people to write emails, reports, and documents every day. Practicing typing regularly can help improve both speed and accuracy. By focusing on proper finger placement and consistent practice, anyone can become a faster and more confident typist over time.",

"The internet has completely transformed the way people access information and communicate with others. In the past, finding information required visiting libraries, reading books, or asking experts for guidance. Today, anyone with an internet connection can instantly search for knowledge about almost any topic. Social media platforms allow people to connect with friends and communities from around the world, while video conferencing tools enable remote work and online collaboration. Despite these advantages, it is important for users to develop critical thinking skills when consuming online content.",
];

const TypingTest = () => {
  const [paragraph, setParagraph] = useState("");
  const [input,setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  //Load Random Paragraph
  useEffect(() => {
  setParagraph(paragraphs[Math.floor(Math.random() * paragraphs.length)]);
  }, [])
  
  //Timer Logic
  useEffect(() => {
    let timer;

    if (isStarted && timeLeft > 0){
       timer = setInterval(()=>{
        setTimeLeft((prev) => prev-1);
      },1000);
    }
     
    if (timeLeft === 0){
      setIsStarted(false);
      setIsFinished(true);
    }
     return () => clearInterval(timer);  
      
    },[isStarted, timeLeft]);

    //Start Test
    const startTest = () =>{
    if(!isStarted){
      setIsStarted(true);
      setIsFinished(false);
    }
    };

  // Enter key to start
  const handleKeyDown = (e) =>{
    if(e.key === "Enter" && !isStarted){
      e.preventDefault();
      startTest(true);
    }
  };

  //Reset Test + new paragraph
  const resetTest = () =>{
    setInput("");
    setTimeLeft(120);
    setIsStarted(false);
    setIsFinished(false);

    const newParagraph = 
    paragraphs[Math.floor(Math.random() * paragraphs.length)];

    setParagraph(newParagraph);
  };

  //Calculations
  const wordsTyped = input.trim().split(/\s+/).filter(Boolean).length;
  const timeSpent = 120-timeLeft;
  const wpm = 
      timeSpent > 0 ? Math.round((wordsTyped * 60) / timeSpent) : 0;
  
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
          placeholder="Press Enter or Start to begin typing..."
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

         <div className='flex gap-4 mt-5'>
          <button
          onClick={startTest}
          disabled={isStarted}
           className='flex-1 bg-blue-950 text-white py-2 rounded hover:bg-blue-800 cursor-pointer active:scale-95 disabled:opacity-50'
          >
            Start
          </button>

          <button
          onClick={resetTest}
           className='flex-1 bg-blue-950 text-white py-2 rounded hover:bg-blue-800 cursor-pointer active:scale-95'
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
