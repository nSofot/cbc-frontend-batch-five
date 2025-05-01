import React, { use, useState } from 'react';

export default function TestPage() {
    const [count, setCount] = useState(0);
    const [status, setStatus] = useState("Passed");

    return (
        <div className="w-full h-screen flex justify-center items-center flex-col">
            <div className="w-[450px] h-[450px] flex items-center justify-center shadow-2xl">
                <button
                    onClick={() => setCount(count - 1)}
                    className="bg-blue-600 text-white font-bold text-[20px] w-[100px] h-[40px] text-center flex items-center justify-center py-2 px-4 rounded cursor-pointer m-[20px]"
                >
                    -
                </button>
                <span className="text-[30px] font-bold text-center w-[100px] h-[40px] mx-[10px] flex items-center justify-center">
                    {count}
                </span>
                <button 
                    onClick={() => setCount(count + 1)}
                    className="bg-blue-600 text-white font-bold text-[20px] w-[100px] h-[40px] text-center flex items-center justify-center py-2 px-4 rounded cursor-pointer m-[20px]"
                >
                    +
                </button>
            </div>
            <div className='w-[450px] h-[250px] shadow flex items-center justify-center flex-col'>
                <span className="text-[40px] font-bold text-center w-[100px] h-[40px] mx-[10px] flex items-center justify-center">
                    {status}
                </span>
                <div className='w-full flex justify-center items-center'>
                    <button 
                        onClick={() => setStatus("Passed")} 
                        className='bg-blue-600 text-white font-bold text-[20px] w-[100px] h-[40px] text-center flex items-center justify-center py-2 px-4 rounded cursor-pointer m-[20px]'>
                        Passed
                    </button>
                    <button 
                        onClick={() => setStatus("Failed")} 
                        className='bg-red-600 text-white font-bold text-[20px] w-[100px] h-[40px] text-center flex items-center justify-center py-2 px-4 rounded cursor-pointer m-[20px]'>
                        Failed
                    </button>
                </div>
            </div>
        </div>
    );
}
