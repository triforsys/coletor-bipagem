import React, { useContext, useState } from 'react';
import SidebarItem from '@/components/layout/SidebarItem';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '@/context/AuthContext';
import { Book, File } from 'lucide-react';

export default function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const { singOut } = useContext(AuthContext);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = async () => {
    await singOut();
  };
  const menuList = [
    {
      group: 'InteliPost',
      items: [
        
      ],
    },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.5 }}
            className={`fixed flex flex-col gap-4 w-[300px] z-10 min-w-[300px] border-r min-h-screen max-h-screen p-4 font-roboto overflow-auto bg-slate-900`}
          >
            <div>
              <SidebarItem />
            </div>
            <Command className="bg-slate-900 text-zinc-50 grow">
              <CommandList className="bg-slate-900 text-zinc-50">
                {menuList.map((menu, key) => (
                  <CommandGroup
                    key={key}
                    heading={menu.group}
                    className="bg-slate-900 text-zinc-50"
                  >
                    {menu.items.map((option, optionKey) => (
                      <a href={option.link}>
                        <CommandItem
                          key={optionKey}
                          className="flex gap-2 cursor-pointer ml-2 bg-slate-900 text-zinc-50 hover:bg-slate-500"
                        >
                          {option.icon}
                          {option.text}
                        </CommandItem>
                      </a>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
            <div className="bg-white rounded-[8px] flex flex-col items-center justify-center space-y-1">
              <img src={logo} alt="logo" className="w-[200px] h-[100px]" />
              {/* <span className="text-xs text-zinc-50 uppercase">
                acs web friozem
              </span> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* <AnimatePresence> */}
      <motion.div
        animate={{
          x: 0,
          paddingLeft: isOpen ? '300px' : '0px',
        }}
        transition={{ duration: 0.5 }}
        className={` max-w-full`}
      >
        <div className="max-w-full flex justify-between gap-4 p-4 border-b shadow-2xl bg-white">
          <div>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <Button onClick={toggleMenu} variant="outline" size="icon">
                    {isOpen ? (
                      <ChevronLeft className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isOpen ? 'Fechar menu' : 'Abrir menu'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center justify-end">
            <Button onClick={handleLogout} variant="link">
              Logout
            </Button>
          </div>
        </div>
        <div className="p-5 bg-slate-50 ">{children}</div>
      </motion.div>
      {/* </AnimatePresence> */}
    </>
  );
}
