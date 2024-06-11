import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogContent,
  Dialog,
} from '@/components/ui/dialog';

export default function Modal({
  isOpen,
  title,
  children,
  close,
  txtBtnClose,
  onSubmit,
}) {
  // if (!isOpen) {
  //   return null;
  // }
  return (
    <>
      <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="w-full rounded-lg bg-white p-6 shadow-lg">
          <div className="flex flex-col justify-center items-center space-y-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold font-roboto mb-5">
                {title}
              </DialogTitle>
              <DialogDescription className="text-gray-500 font-roboto">
                {children}
              </DialogDescription>
            </DialogHeader>
          </div>

          {onSubmit && (
            <div className="flex justify-end">
              <Button
                className="bg-blue-500 text-white hover:bg-blue-700 hover:text-white"
                onClick={onSubmit}
                variant="outline"
              >
                {txtBtnClose}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
