import Head from "next/head";
import { useState } from "react";
import React from "react";
import Image from "next/image";
import { EyeIcon } from "@heroicons/react/solid";
import { BeakerIcon } from "@heroicons/react/outline";
import SystemInput from "./components/SystemInput";
import { useSession  } from "next-auth/react";


function System(){
   const { data: session } = useSession();
    return(
        <>
        <Head>
        <title>HuCo</title>
        <meta name="description" content="Learn more about Conscious Expanding and our mission to help people expand their consciousness." />
        </Head>
      <div className="flex h-screen">
        <div className=" flex flex-col items-center space-y-3 p-3 min-w-max bg-[#36393f]">
          <div className="">
          <Image src="/android-chrome-192x192.png" width={30} height={30} />
          </div>
          <EyeIcon className="h-6 w-6 text-white"/>
          <BeakerIcon className="h-6 w-6 text-white" />
          <img
              src={session?.user?.image}
              className=" mx-auto mb-2 rounded-full h-8  cursor-pointer"
            />     
        </div>
        <div className="flex">
        <span className="  bg-[#35353f]  hidden xl:inline">
        <div className=" hidden sm:block  flex-col min-w-max   ">
          <form className="flex  p-4">
            <input placeholder="search systems" className="flex p-1 bg-white rounded "/>
          </form>
        </div>
        </span>
        </div>
        
        <div className="bg-[#36393f] object-contain flex-grow">
          <SystemInput/>
        </div>
      </div>
      </> 
    );
}
export default System;


