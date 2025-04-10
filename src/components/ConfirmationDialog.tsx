'use client'

import * as Dialog from '@radix-ui/react-dialog'

type ConfirmationDialogProps = {
    trigger: React.ReactNode
    title: string
    description: string
    onConfirm: () => void
}

export default function ConfirmationDialog({
                                               trigger,
                                               title,
                                               description,
                                               onConfirm,
                                           }) {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {trigger}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-[2px] " />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0a1a2f] p-6 rounded-lg border border-[#00DC82] shadow-lg max-w-md w-full">
                    <Dialog.Title className="text-xl font-bold mb-2 text-white">{title}</Dialog.Title>
                    <Dialog.Description className="mb-4 text-gray-300">
                        {description}
                    </Dialog.Description>
                    <div className="flex justify-end gap-3">
                        <Dialog.Close asChild>
                            <button className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 transition text-white">
                                Cancel
                            </button>
                        </Dialog.Close>
                        <Dialog.Close asChild>
                            <button
                                onClick={onConfirm}
                                className="px-4 py-2 rounded bg-[#00DC82] hover:bg-[#00c276] text-gray-900 font-medium transition"
                            >
                                Confirm
                            </button>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}