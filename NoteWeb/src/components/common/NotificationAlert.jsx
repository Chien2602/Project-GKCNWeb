import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Check, Info, Trash2 } from "lucide-react"

export default function NotificationAlert({ type, title, message }) {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <Check className="h-4 w-4 text-green-500" />
      case "warning":
        return <Trash2 className="h-4 w-4 text-red-500" />
      case "info":
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  const getBorderColor = () => {
    switch (type) {
      case "success":
        return "border-green-500"
      case "warning":
        return "border-red-500"
      case "info":
      default:
        return "border-blue-500"
    }
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-5">
      <Alert variant="default" className={`w-80 border-l-4 ${getBorderColor()} bg-white dark:bg-gray-800 shadow-lg`}>
        {getIcon()}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  )
}
