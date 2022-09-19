import React from "react";

const TopButtons = ({setquery}) => {
  const cites = [
    {
        id:1,
        title:"Lucknow"
    },
    {
        id:2,
        title:"Azamgarh"
    },
    {
        id:3,
        title:"Jaunpur"
    },
    {
        id:4,
        title:"Mau"
    },
    {
        id:5,
        title:"Gorakhpur"
    },
   
  ];
  return <div className="flex items-center justify-around my-6">
    {cites.map(({title ,id})=>(
        <button key={id} onClick={()=>setquery({q:title})} className="text-white text-lg font-medium ">{title}</button>
    ))}

  </div>;
};

export default TopButtons;
