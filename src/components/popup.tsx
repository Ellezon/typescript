import React from "react";

type PopupProps = {
    msg: string
}

const Popup: React.FC<PopupProps> =({msg}) => {
    return (
      <div className="overlay">
        <div className='popup'>{msg}</div>
      </div>
    );
}

export default Popup;
