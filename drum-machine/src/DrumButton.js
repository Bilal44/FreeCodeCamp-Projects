import React from 'react';

export const DrumButton = ({text, audio}) => {
    const audioClip = new Audio({audio});
return (
    <div className="drum-button" onClick={audioClip.play()} id={`drum-${text}`}>
    {text}
    <audio src={audio} className="clip" id={text} />
  </div>
    )
}