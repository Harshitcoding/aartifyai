"use client";

import { Post } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string>("");
  const router =  useRouter()
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/image");
      
      if (!response.ok) {
        router.push('/')
      }
      
      const data = await response.json();
      
      // Ensure data is an array
      if (!Array.isArray(data)) {
        if (data.posts && Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          throw new Error("Received data is not in the expected format");
        }
      } else {
        setPosts(data);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch posts");
      setPosts([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (error) {
    return (
      <div className="w-full min-h-dvh p-3 pt-[72px] flex justify-center items-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-dvh p-3 pt-[72px] grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
      {loading ? (
        <div className="col-span-full flex justify-center items-center">
          <Loader className="animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="col-span-full flex justify-center items-center">
          <p className="text-white/80">No images found</p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {posts.map((post, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="w-full h-fit border rounded-md p-2.5"
                key={post.id}
              >
                <Image
                  alt={post.prompt}
                  src={post.url}
                  width={250}
                  height={250}
                  className="object-contain w-full rounded-md"
                />
                <p className="text-white/80">{post.prompt}</p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      )}
    </div>
  );
}