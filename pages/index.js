import Head from "next/head"
import Link from 'next/link'
import Feed from "./components/Feed"
import Nav from "./components/Nav"
import Sidebar from "./components/Sidebar"

export default function Home() {
  return (
        <div className="">
        <Link rel="shortcut icon" href="/favicon/favicon.ico" />
        <Head>
        <title>HuCo</title>
        <meta name="description" content="Learn more about Conscious Expanding and our mission to help people expand their consciousness." />
        <meta name="google-site-verification" content="y_rAeNB0KQgs0GDg8ajmkQtTPCp83t4TIZQTLIzzJ5g" />
        </Head>
        <Nav/>
        <main className="bg-white h-[400px] min-h-screen justify-center flex max-w-[1500px] mx-auto" >
         <Sidebar/>
         <Feed/>
       </main>
       </div>
     )
}

