import { Button } from '@/components/ui/button'
import { ChevronLeftIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const ButtonBack = () => {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  return (
    <div className="left-0 absolute">
      <Button
        onClick={goBack}
        className="bg-tangaroa-400 hover:bg-tangaroa-300 h-10 w-14"
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  )
}
