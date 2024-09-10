'use client'
import Home from '@/app/components/Home'
import { useLoading } from './utils/custom-hooks'
import LoadingScreen from './components/LoadingScreen'
export default function Page() {
  const loading = useLoading()

  if(loading) return <LoadingScreen/>
  return (
    <Home/>
  )
}
