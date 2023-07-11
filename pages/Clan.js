import React from "react";
import {Card} from  "@nextui-org/react";


function Clan (){
    return(
        <div className="bg-grey-700/50 text-white-400 rounded text-sm focus:outline-none  sm:ml-[73px] xl:ml-[370px]">
        <form className="p-5 space-x-5 flex-1">
        <Card css={{ mw: "300px" }}>
          <Card.Body>
          <input
             className="bg-transparent focus:outline-none flex-1
             disabled:cursor-not-allowed disabled:text-black-300"
             type="text" 
             placeholder="Search " />    
          </Card.Body>
        </Card>
       </form>
       </div>
    )
}

export default Clan;