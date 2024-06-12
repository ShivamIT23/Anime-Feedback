import { useEffect, useState } from "react"
import logo1 from "/Logo1.png"
import logo2 from "/logo2.png"

export const Logo = () => {
    const [img , setImg] = useState(logo1);
    const isOne = img == logo1 ? true : false;

    useEffect(()=>{
      const interval = setInterval(()=>{
            if(img === logo1){
            setImg(logo2)
          } else {
              setImg(logo1)
              }
              },5000);
        return () => clearInterval(interval);
    } , [img]);
    

    const style1 = {
        width: "10%", 
        marginRight : "9%",
        borderRadius : "24%",
    }

    const style2 = {
        width: "12%", 
        marginRight : "7%",
    }

  return (
    <img src={img} style={isOne ? style1 : style2} className="NavBar-Logo" alt="Logo" />
  )
}
