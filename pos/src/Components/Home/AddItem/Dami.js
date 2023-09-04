import React, { useEffect, useRef } from 'react';

function Dami() {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if a specific key is pressed, e.g., Enter key
      if (event.key === 'Enter') {
        inputRef.current.focus();
      }
    };

    // Attach the event listener to the document
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <input type="text" ref={inputRef} />
      <p>Press Enter key to focus the input field.</p>
    </div>
  );
};


export default Dami;
