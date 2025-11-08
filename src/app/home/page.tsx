"use client"
import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import Navbar from "../components/Navbar"
import { toast } from "sonner"
import Footer from "../components/Footer"

interface DataProps {
  title: string,
  media: string,
  image?: File[] | null,
  video?: File[] | null
}



export default function ContributionForm() {

  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          lat.current = pos.coords.latitude
          lon.current = pos.coords.longitude
        },
        (err) => {
          console.error(err.message);
        }
      );
    }
  }, []);

  const lat = useRef<number>(0)
  const lon = useRef<number>(0)

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const form = useForm<DataProps>({
    defaultValues: {
      title: "",
      media: "image",
    },
  })

  const onSubmit = async (data: DataProps) => {

    setLoading(true)
    const formData = new FormData()
    formData.append('title',data.title)
    formData.append('media',data.media)
    formData.append('image',data.image?.[0] || '')
    formData.append('video',data.video?.[0] || '')

    if(!data.image?.length && !data.video?.length){
      form.reset()
      setLoading(false)
      
      toast.error('Please Provide the Media')
      return false
    }
    

    try {

      let cloudinaryUrl = ""
      let sendEmail:boolean = false

      if(data.media === 'image'){
        const response = await fetch(`${process.env.NEXT_PUBLIC_MACHINE_LEARNING_URL}/recieve_image`,{
          method: 'POST',
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          body: formData,
        })

        const result = await response.json()

        if(result.status === false){
          setResult('No kidnapping found')
        }
        else{
          cloudinaryUrl = result.image_link
          sendEmail = true
          setResult('Kidnapping Found! Email send to coops seccessfully.')
        }
      }
      else{

          const response = await fetch(`${process.env.NEXT_PUBLIC_MACHINE_LEARNING_URL}/recieve_video`,{
          method: 'POST',
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          body: formData,

        })

        const result = await response.json()

        if(result.status === false){
          setResult('No kidnapping found')
        }
        else{
          cloudinaryUrl = result.image_link
          sendEmail = true
          setResult('Kidnapping Found! Email send to coops seccessfully.')
          sendEmail = true
        }
      }

      const googleLocationUrl: string =  `https://www.google.com/maps/search/?api=1&query=${lat.current},${lon.current}`

      const payload = {
        image_url: cloudinaryUrl,
        location: googleLocationUrl
      }


      if(sendEmail){

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/send-email`, {
          method:'POST',
          body: JSON.stringify(payload)
        })

        if(res.status !== 202){
          throw Error('Fail to send Email')
        }
      }

      setLoading(false)
      setOpen(true)
      form.reset()
      toast.success('Kidnapping Check Success')
      form.reset()

    } catch (error) {

      setLoading(false)
      setOpen(true)
      
      form.reset()
      toast.error('An Error Occured')

      return error
    }
  }

  return (
    <div className="bg-cover bg-center">
      <Navbar />
      <div className="min-h-screen bg-[url('/image.png')] bg-cover flex items-center justify-center bg-background p-4">
        <div className="bg-white/60 shadow-lg rounded-2xl p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-violet-700 dark:text-violet-700 mb-4 text-center">
            Check for kidnapping
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 dark:text-black">
              <FormField
                control={form.control}
                name="title"
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input className="border border-black shadow-none !outline-none !ring-0 !ring-offset-0 focus:!ring-0 focus:!outline-none focus:border-black" {...field} placeholder="Title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Card Type */}
              <FormField
                control={form.control}
                name="media"
                rules={{ required: "Please select a card type" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Media Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-[1px] border-black">
                          <SelectValue placeholder="Select media type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {
                form.watch('media') === 'image'
                ?
                <div>
                  <input
                    className="p-2 border-[1px] border-black rounded-lg w-[220px]"
                    type="file"
                    accept=".jpeg,.jpg,.png"
                    {...form.register("image")}
                  />
                </div>
                :
                <input
                  className="p-2 border-[1px] border-black rounded-lg w-[220px]"
                  type="file"
                  accept=".mp4"
                  {...form.register("video")}
                />
              }
              
              {/* Submit Button */}
              <Button disabled={loading} type="submit" className="w-full bg-violet-700 hover:bg-violet-800 disabled:bg-violet-500 text-white">
                Submit
              </Button>
            </form>
          </Form>

          {/* Thank You Dialog */}
            {result && <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
              <DialogHeader>
                  <DialogTitle>Result : </DialogTitle>
                  <DialogDescription className="flex justify-center text-xl text-violet-600 dark:text-violet-300"> 
                  {result}
                  </DialogDescription>
              </DialogHeader>
              </DialogContent>
            </Dialog>
        }
        </div>
      </div>
      <Footer/>
    </div>
  )
}
