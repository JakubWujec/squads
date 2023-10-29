'use client'

import { type ReactNode, useState } from 'react'
import { Dialog } from '@headlessui/react'

type ShareModalProps = {
  link: string;
}

export default function ShareModal({ link }: ShareModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >Share</button>
      </div>
      <Dialog as="div" open={isOpen} onClose={() => setIsOpen(false)} className="relative z-10">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        {/* Full-screen scrollable container */}
        <div className="fixed inset-0 w-screen overflow-y-auto rounded-lg">
          {/* Container to center the panel */}
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title>Share</Dialog.Title>
              <Dialog.Description>
                Share with your friend to pick teams.
                <a href={link}>LINK</a>
              </Dialog.Description>
              <button onClick={() => setIsOpen(false)}>Close</button>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  )
}