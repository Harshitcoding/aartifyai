'use client'

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Image, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-900 text-white overflow-hidden">
      <BackgroundBeamsWithCollision className="h-screen">
        <div className="flex justify-center items-center flex-col text-center max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          >
            Aartifyai
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-xl sm:text-2xl text-gray-300"
          >
            Unleash Your Imagination with AI-Powered Image Generation
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5"
          >
            <Link href="/create">
              <Button className="font-bold px-6 py-3 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105">
                Start Creating <ArrowRight className="ml-2" />
              </Button>
            </Link>
         
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {[
              { icon: Sparkles, title: "AI-Powered", description: "Cutting-edge AI models for stunning results" },
              { icon: Zap, title: "Lightning Fast", description: "Generate images in seconds, not hours" },
              { icon: Image, title: "Endless Possibilities", description: "Create any image you can imagine" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="flex flex-col items-center p-4 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}