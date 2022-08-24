import {useState, useEffect} from 'react'

import { motion, useViewportScroll } from "framer-motion"

import './Carousel.css'
const Carousel = () => {
  const [yPos, setYpos] = useState(0)

  const images = [
    {id:1, url:'/images/carousel/1.jpg'},
    {id:2, url:'/images/carousel/2.jpg'},
    {id:3, url:'/images/carousel/3.jpg'},
    {id:4, url:'/images/carousel/4.jpg'},
    {id:5, url:'/images/carousel/5.jpg'},
    {id:6, url:'/images/carousel/6.jpg'},
    {id:7, url:'/images/carousel/7.jpg'},
    {id:8, url:'/images/carousel/8.jpg'},
    {id:9, url:'/images/carousel/9.jpg'},
    {id:10, url:'/images/carousel/10.jpg'},
    {id:11, url:'/images/carousel/11.jpg'},
    {id:12, url:'/images/carousel/12.jpg'},
    {id:13, url:'/images/carousel/13.jpg'},
    {id:14, url:'/images/carousel/14.jpg'},
    {id:15, url:'/images/carousel/15.jpg'},
    {id:16, url:'/images/carousel/16.jpg'},
    {id:17, url:'/images/carousel/17.jpg'},
    {id:18, url:'/images/carousel/18.jpg'},
  ]
  const images2 = [
    {id:1, url:'/images/carousel/21.jpg'},
    {id:2, url:'/images/carousel/22.jpg'},
    {id:3, url:'/images/carousel/23.jpg'},
    {id:4, url:'/images/carousel/24.jpg'},
    {id:5, url:'/images/carousel/25.jpg'},
    {id:6, url:'/images/carousel/26.jpg'},
    {id:7, url:'/images/carousel/27.jpg'},
    {id:8, url:'/images/carousel/28.jpg'},
    {id:9, url:'/images/carousel/29.jpg'},
    {id:10, url:'/images/carousel/30.jpg'},
    {id:11, url:'/images/carousel/31.jpg'},
    {id:12, url:'/images/carousel/32.jpg'},
    {id:13, url:'/images/carousel/33.jpg'},
    {id:14, url:'/images/carousel/34.jpg'},
    {id:15, url:'/images/carousel/35.jpg'},
    {id:16, url:'/images/carousel/36.jpg'},
    {id:17, url:'/images/carousel/37.jpg'},
    {id:18, url:'/images/carousel/38.jpg'},
  ]
  useEffect(() => {
    function handleScroll(){
      const yPos = window.scrollY;
      setYpos(yPos);
    }
    window.addEventListener("scroll", handleScroll, false)
    return () =>{
      window.removeEventListener("scroll", handleScroll, false)
    }
  }, [yPos])
  
  return (
    <div className='carousel-container'>
      
      <motion.div className='tt'
        initial={{x: -100, opacity: 0}}
        animate={{ x: 0, opacity: 1.0 }}
        transition={{ duration: 0.3, delay: 1.2 }}
        style= {{translateX: yPos}}
      >
        {images.map((props) =>
        <div key={props.id}>
          <motion.img className='carousel-img' src={props.url} alt=""  whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }} />
        </div>
        )}
      </motion.div>
      
      <motion.div className='tt'
        initial={{x: 100, opacity: 0}}
        animate={{ x: 0, opacity: 1.0 }}
        transition={{ duration: 0.3, delay: 1.4 }}
        style= {{translateX: -yPos}}
      >
        {images2.map((props) =>
        <div key={props.id}>
          
          <motion.img className='carousel-img' src={props.url} alt=""  whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}/>
        </div>
        )}
      </motion.div>
    </div>
  )
}

export default Carousel