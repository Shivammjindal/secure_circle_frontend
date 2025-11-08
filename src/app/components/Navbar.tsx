"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./Toggler"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { toast } from "sonner"

interface user {
    name ?: string,
    email ?: string,
}

export default function Navbar(){

    const session = useSession();

    const [loggedIn, setloggedIn] = useState(false)
    const [user, setUser] = useState<user | null>()

    useEffect(() => {
        if(session.data?.user){
            setloggedIn(true);
            setUser({
                name : session.data?.user.name as string,
                email : session.data?.user.email as string
            })
        }
    }, [session])

    const handleSignOut = () => {
        signOut()
        toast.success('Logged Out Successfully')
    }

    return (
        <nav className="w-full border-b bg-background shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                    Secure Circle
                </Link>

                <main className="flex gap-4 font-medium dark:text-white text-violet-700">
                    <Link href={"/aboutus"}>
                        About Us
                    </Link>
                </main>
        
                <div className="flex gap-4 items-center">

                    {
                        loggedIn && <div className="font-medium dark:text-white text-violet-700">{ user?.name }</div>
                    }
                    <ModeToggle/>
                    {
                    !loggedIn && <Link href="/login">
                        <Button variant="outline" className="text-base">Login</Button>
                    </Link>}
                    {
                        !loggedIn && <Link href="/signup">
                            <Button className="text-base bg-violet-600 hover:bg-violet-700 text-white">
                                Signup
                            </Button>
                        </Link>
                    }
                    {
                    loggedIn && 
                        <Button onClick={handleSignOut} className="text-base bg-violet-600 hover:bg-violet-700 text-white">
                            Logout
                        </Button>
                    }
                </div>
            </div>
        </nav>
    )
}