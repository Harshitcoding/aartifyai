'use client'

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Image from "next/image"
import { Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

const formSchema = z.object({
  prompt: z.string().min(7, { message: "Prompt must be at least 7 characters long" })
})

export default function Component() {
  const [outputImg, setOutputImg] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      const response = await fetch("/api/image", {
        method: "POST",
        body: JSON.stringify(values),
      })
      const data = await response.json()
      setOutputImg(data.url)   
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-black border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white mb-2">AI Image Generator</CardTitle>
          <p className="text-gray-400">Transform your ideas into stunning visuals</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Describe the image you want to create..."
                          className="flex-grow bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          {...field}
                        />
                        <Button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-700">
                          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                          Generate
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          
          <div className="relative h-64 w-full overflow-hidden rounded-lg bg-gray-700/50">
            {outputImg ? (
              <Image 
                alt="Generated image" 
                src={outputImg} 
                fill
                style={{ objectFit: "contain" }}
                className="transition-opacity duration-300 ease-in-out"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Your generated image will appear here
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-gray-400">
            Powered by AI - Create any image you can imagine!
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}