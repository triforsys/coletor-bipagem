import { Button } from '@/components/ui/button';
import { ChevronDownIcon, ChevronLeftIcon, Filter, X } from 'lucide-react';
import { useRef, useState } from 'react';

export default function Toggle({ children }) {
  const [opened, setOpened] = useState();
  const divRef = useRef();

  const toggle = () => {
    if (opened) divRef.current.classList.add('hidden');
    else divRef.current.classList.remove('hidden');

    setOpened(!opened);
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={toggle} className="button h-10">
          {opened ? <X className="size-6" /> : <Filter className="size-6" />}
        </Button>
      </div>
      <div
        ref={divRef}
        className="hidden bg-tangaroa-500 rounded-sm card-shadow p-4 my-3"
      >
        {children}
      </div>
    </div>
  );
}
