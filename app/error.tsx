'use client'

import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <html>
      <body className="flex items-center justify-center h-screen bg-gray-950 text-gray-100">
        <div className="text-center space-y-4 p-8 bg-gray-900/70 rounded-2xl">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
          <p className="text-gray-400">{error.message}</p>
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </body>
    </html>
  )
}
