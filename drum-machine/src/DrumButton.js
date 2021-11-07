import React from 'react';

export const DrumButton = ({ text, audio }) => {
    const ref = React.createRef();

    const playSound = () => {
        ref.current.play()
    
        const id = ref.current.id;
        
        const parent = ref.current.parentNode;
        parent.classList.add('active');
        
        const display = parent.parentNode;
        display.querySelector('h1').innerText = `${id} is playing`;
    }

    return (
        <div className="drum-pad" onClick={playSound} id={`drum-${text}`}>
            {text}
            <audio ref={ref} src={audio} className="clip" id={text} />
        </div>
    )
}