import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import style from './Error404.module.css'

function Error404() {
    const navigate = useNavigate()

    useEffect(()=> {
        setTimeout(()=> navigate('/home'), 3000)
    }, [])
  return  <img src={"https://edteam-media.s3.amazonaws.com/blogs/big/2ab53939-9b50-47dd-b56e-38d4ba3cc0f0.png"} alt={"error"} />;
}

export default Error404;