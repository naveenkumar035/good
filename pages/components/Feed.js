import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import { query, collection, onSnapshot, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import Input from "./Input";
import Post from "./Post";
import {  db, storage } from '../../firebase'; 
import { Link } from "@nextui-org/react";
import About from "../About";


function Feed(){

     const [posts, setPosts] = useState([]);


    useEffect(
      () => 
        onSnapshot(
          query(collection(db,"posts"), orderBy("timestamp","desc")),
          (snapshot) => {
             setPosts(snapshot.docs);
          }
        ),
      [db]
    );

      
  
    return (
        
        
      <div className="text-black flex grow border-l border-r border-black-700 max-w-2xl  sm:ml-[73px] xl:ml-[370px] "  style={{display: 'block'}}>
    
         <div className="text-black flex sm:justify-between py-2 px-3 sticky top-0 z-50 bg-gray border-b border-black-700 " style={{display: 'block'}}>
         <h2 className="text-lg sm:text-xl font-bold "  style={{display: 'block'}}>Welcome to Human Consciousness</h2>
         <div className="w-9 h-9 flex item-center justify-center xl:px-0 ml-auto"style={{display: 'block'}} >
           <Link
           href="About"
           >
           <ArrowCircleRightIcon  className="h-5 text-black"/>
           </Link>
         </div>

         </div>
         <Input style={{display: 'block'}}/>
         <div className="pb-72">
          {posts.map((post) => (
            
            <Post key={post.id} id={post.id} post={post.data()} style={{display: 'block'}}/>
          
          
           ))}
         </div>
      
      </div>
      
       
    
    );
 

}

export default Feed;




    



