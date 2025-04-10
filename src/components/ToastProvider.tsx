'use client'

import { Toaster } from 'react-hot-toast'

export default function ToastProvider() {
    return (
        <Toaster
            position="top-center"
            toastOptions={{
                style: {
                    background: '#0a1a2f',
                    color: '#fff',
                    border: '1px solid #00DC82'
                }
            }}
        />
    )
}