import React from 'react'

interface ErrorMessageProps {
    error: string
}

export default function ErrorMessage({error}: ErrorMessageProps) {
  return (
    <div className="text-center text-red-600">{error}</div>
  )
}
