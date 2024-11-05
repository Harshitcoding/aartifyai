'use client'
import Link from "next/link"
import { Button } from "./ui/button"
import { signIn, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useEffect, useState } from "react"
import { Loader } from 'lucide-react';
const Header = () => {
  const [initialLoading,setInitialLoading] = useState<boolean>(true)

  const {data: session, status} = useSession();

  useEffect(()=>{
    if(status !== "loading") {
      setInitialLoading(false)
    }
  },[status,session])
  
  return (
    <div className="fixed top-0 w-full h-[60px] bg-black border-b  border-white/60 p-3 flex justify-between items-center">
      <Link href="/">
      <h2 className="font-bold text-xl">
            AartifyAi 
        </h2>
      </Link>
      {initialLoading && status === 'loading' ? <Loader className="animate-spin"/> : !session ? <div className="__menu">
        <Button onClick={() => signIn("google")}>Login</Button>
      </div> : <Avatar>
  <AvatarImage src={session.user?.image || ""} />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>}
    </div>
  )
}
export default Header