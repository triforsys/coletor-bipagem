import { BoxIcon, TruckIcon } from 'lucide-react'


export const Card = ({
  children,
  leftSideIcon,
  leftSideChildren,
  classNameCard,
  classNameContent,
}) => (
  <div
    className={`flex rounded-2xl card-shadow min-w-[350px] w-full text-ellipsis overflow-hidden pr-1 h-[180px] gap-2 ${classNameCard}`}
  >
    <LeftSide icon={leftSideIcon} children={leftSideChildren} />
    <div
      className={`flex max-w-56 flex-col justify-between py-2 pl-2 text-[15px] ${classNameContent}`}
    >
      {children}
    </div>
  </div>
)

/**
    Variant of left side icon
    @param {'box' | 'truck'} type 
    @returns {JSX.Element}  Icon component for the left side of the card.    
*/
export const leftSideIcons = (type) => {
  if (type === 'box')
    return <BoxIcon className="w-[78px] h-[75px] text-tangaroa-50" />

  if (type === 'truck')
    return <TruckIcon className="w-[78px] h-[75px] text-tangaroa-100" />
}

const LeftSide = ({ icon, children }) => (
  <div className="flex rounded-l-2xl justify-center min-w-[128px] flex-col items-center gap-2 bg-tangaroa-500">
    {icon}
    {children}
  </div>
)
