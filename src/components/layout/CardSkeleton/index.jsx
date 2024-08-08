import { Button } from "../../ui/button"
import { Skeleton } from "../../ui/skeleton"
import { Card, leftSideIcons } from "../Card"

export const CardSkeleton = () => {
  return (
    <Card leftSideIcon={leftSideIcons('truck')} classNameCard='h-[250px]'>
      <Skeleton className="h-5 w-[220px]" />
      <Skeleton className="h-4 w-[220px]" />
      <Skeleton className="h-4 w-[220px]" />
      <Skeleton className="h-4 w-[220px]" />
      <Skeleton className="h-4 w-[220px]" />
      <Skeleton className="h-4 w-[220px]" />
      <div className="flex gap-2">
        <Skeleton>
          <Button
            disabled
            className="size-24 h-10 bg-tangaroa-500 hover:bg-tangaroa-400"
          />
        </Skeleton>
        <Skeleton>
          <Button
            disabled
            className="size-24 h-10 bg-tangaroa-500 hover:bg-tangaroa-400"
          />
        </Skeleton>
      </div>
    </Card>
  )
}
