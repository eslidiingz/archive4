const Spinner = ({ showText = true, text = 'Loading', size = 'sm', color = 'white', textColorClass = 'text-white' }) => {
  return (
   <>
    <div className="text-black inline-flex items-center">
      <svg className={`animate-spin -ml-1 mr-3 h-${size === 'sm' ? '5' : '10'} w-${size === 'sm' ? '5' : '10'} text-${color}`} fill="none" viewBox="0 0 24 24">  
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {showText && <span className={`${textColorClass}`}>{text}</span>}
    </div>
   </>
  );
};

export default Spinner;