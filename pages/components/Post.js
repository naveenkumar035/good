import { DotsHorizontalIcon } from "@heroicons/react/solid";

function Post({ id, post}){
    return(
        <div className="p-3 flex cursor-pointer border-b border-gray-700">
           <span className="hover:underline text-sm sm;text-[15px]">
            {/* <Moment fromNow>{post?.timestamp?.toDate()}</Moment> */}
           </span>
           <p className="text-black text-[15px] sm:text-base mt-0.5">
            {post?.text}

           </p>
           {/*<div className="icon group flex-shrink ml-auto">
              <DotsHorizontalIcon className="h-5 text-gray group-hover:text-black"/>
    </div>*/}
           
           <img 
           src={post?.image}
           alt=""
           className="rounded-2xl max-h-[700px] object-cover mr-2"
           />
        </div>
    )
}

export default Post;