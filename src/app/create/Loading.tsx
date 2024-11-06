import { Loader } from "lucide-react"

const Loading = () => {
  return (
    <div className="w-full h-dvh flex justify-center items-center">
        <Loader className="animate-spin"/>
    </div>
  )
}
export default Loading