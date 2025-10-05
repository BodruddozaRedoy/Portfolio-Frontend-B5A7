"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

export default function useUserClient() {
  const session = useSession()
    return {user:session?.data?.user, status: session.status}
}