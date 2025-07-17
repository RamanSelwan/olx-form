import React from 'react';

const AdConfirmation = () => {
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800">olx</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-sm w-full p-4">
          
          {/* Checkmark Icon */}
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#007BFF" />
              <path d="M7.75 12.5L10.5833 15.25L16.25 9.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h2 className="text-xl font-bold text-black mb-1">Congratulations!</h2>
          <p className="text-gray-600 mb-6">Your Ad will go live shortly...</p>

          {/* Info Message */}
          <div className="flex items-center justify-center text-sm text-gray-500 mb-12">
            <div className="w-4 h-4 border-2 border-gray-300 rounded-full mr-2 flex items-center justify-center">
              <div className="w-2 h-2 border border-gray-400 rounded-full"></div>
            </div>
            <p>OLX allows 1 free ad in 180 days for <span className="font-bold">Properties</span></p>
          </div>

          {/* Price Tag Icon */}
          <div className="flex justify-center mb-4">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full drop-shadow-lg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="rotate(20 50 50)">
                  <path d="M10 20C10 17.2386 12.2386 15 15 15H85C87.7614 15 90 17.2386 90 20V80L50 95L10 80V20Z" fill="#FFD700" />
                  <circle cx="50" cy="30" r="5" fill="white" stroke="#E6C200" strokeWidth="1" />
                  <path d="M49.5 0V15" stroke="#A08800" strokeWidth="0.5" />
                  <path d="M50.5 0V15" stroke="#A08800" strokeWidth="0.5" />
                  <path d="M48.5 0V15" stroke="#A08800" strokeWidth="0.5" />
                  <path d="M51.5 0V15" stroke="#A08800" strokeWidth="0.5" />
                </g>
              </svg>
              <span 
                className="absolute top-1/2 left-1/2 text-3xl font-bold text-yellow-800" 
                style={{ transform: 'translate(-50%, -50%) rotate(20deg)' }}
              >
                %
              </span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-black mb-1">Reach more buyers and sell faster</h3>
          <p className="text-gray-600 text-sm mb-6">Upgrade your Ad to a top position</p>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <button className="bg-[#002f34] text-white font-bold py-3 px-4 rounded hover:bg-[#001f23] transition-colors">
              Sell Faster Now
            </button>
            <button className="bg-white text-[#002f34] font-bold py-3 px-4 rounded border-2 border-[#002f34] hover:bg-gray-100 transition-colors">
              Preview Ad
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdConfirmation;