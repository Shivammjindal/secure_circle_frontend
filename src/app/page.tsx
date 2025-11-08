"use client"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
 

export default function Home() {


  return (
    <div>
      <Navbar/>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
          <motion.h1
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -2, 2, -2, 0] }}
            transition={{ duration: 0.8, repeat: 3 }}
            className="text-5xl font-extrabold text-white drop-shadow-lg"
          >
            👋 Welcome!
          </motion.h1>

          <p className="text-lg text-white/90 max-w-md mx-auto">
            Get started by testing your transaction. Click the button below to proceed.
          </p>

          <Card className="w-full max-w-sm mx-auto shadow-lg">
            <CardContent className="p-6 space-y-4">
              <Link href={"/home"}>
                <Button
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white text-md"
                >
                  Check for Kidnapping...
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Footer/>
    </div>
  );
}
