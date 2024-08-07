import React from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

export default function DrawerUtils({
  drawerOpen,
  drawerClose,
  title,
  description,
  onOpenChange,
  handleSave,
  children,
  textButtonConfirm = 'Salvar',
}) {
  return (
    <>
      <Drawer open={drawerOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          <div className="">
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription>{description}</DrawerDescription>
            </DrawerHeader>
            <div className="p-6 space-y-3">{children}</div>
            <DrawerFooter>
              <Button onClick={handleSave}>{textButtonConfirm}</Button>
              <DrawerClose asChild>
                <Button onClick={drawerClose} variant="outline">
                  Cancelar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
