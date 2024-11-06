'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  prompt: z.string().min(7,{message:"Prompt must be at least 7 characters long"})
})

const Page = () => {
  const [outputImg, setOutputImg] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className="w-full p-3 h-dvh flex justify-start items-center pt-[72px] flex-col">
      <div className="w-full border border-red-600 p-3">
        <h1 className="text-center font-bold text-white text-4xl">Create</h1>
        <p className="text-white/68 text-center">
          Generate Stunning Images from Text for FREE
        </p>
      </div>
      <div className="flex border border-green-500 w-full gap-3 h-full">
        <div className="form flex-[2] gap-2 flex justify-center items-start flex-col">
          <p className="text-left text-sm text-white/80">
            Type your prompt below to create any image you can imagine!
          </p>
          <div className="flex gap-2 w-full">

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}className="w-full flex gap-2" >
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="w-full max-w-[70%]">
                      <FormControl>
                        <Input
                          placeholder="a cat sitting over a sofa..."
                          className="w-full transition-all border-white"
                          {...field}
                        />
                      </FormControl>
                      
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Generate</Button>
              </form>
            </Form>


          </div>
        </div>
        <div className="_output flex-[1]  bg-white/5 rounded-lg"></div>
      </div>
    </div>
  )
}
export default Page