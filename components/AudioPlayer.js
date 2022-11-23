import {useEffect, useState, useRef} from 'react';




function AudioPlayer({src, onFinish, play, paused, loud}) {
    
   const playerRef = useRef();
   const source = useRef();
   const gainNode = useRef();

   const [initialised, setInitialised] = useState(false);

   useEffect(()=>{
     if (initialised){
        if (paused){
            playerRef.current.pause();
        }else{
            playerRef.current.play();
        }
     }
   },[paused]);

    useEffect(()=>{
        if (loud){
            if (!source.current){
                const audioCtx = new AudioContext();
                const myAudio = playerRef.current;
                source.current = audioCtx.createMediaElementSource(myAudio);
                gainNode.current = audioCtx.createGain();
                gainNode.current.gain.value = 20;
                source.current.connect(gainNode.current);
                gainNode.current.connect(audioCtx.destination)
            }else{
                gainNode.current.gain.value = 20;
            }
        }else{
            if (source.current){
                gainNode.current.gain.value = 1;
            }
        }
    },[loud]);

    useEffect(()=>{
        
        if(play){
            setInitialised(true);
           
            playerRef.current.src = src;   
            playerRef.current.play();
            playerRef.current.onended = ()=>{
                onFinish();
            };
            playerRef.current.onerror = ()=>{
                onFinish();
            };
        }
    },[play, src]);
   
    

    return (
        <audio src={src}  ref={playerRef} style={{display:"none"}} />
    )
}

export default AudioPlayer;
