import { useState } from 'react'

export default function Popup() {
  const [ display, setDisplay ] = useState(true);
  const closePopup = (e) => {
    setDisplay(false)
  }
  return <>
           { display &&
             <div className="overlay-popup-container" onClick={closePopup}>
               <div className="overlay-popup" onClick={(e) => e.stopPropagation()}>
                 <div className="overlay-popup-close" onClick={closePopup}>X</div>
               </div>
             </div>
           }
         </>
}
