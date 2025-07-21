import { Metadata } from 'next'
import DonutHeader from '@/components/DonutHeader'
import DonutFooter from '@/components/DonutFooter'
import CaravanMap from '@/components/CaravanMap'

export const metadata: Metadata = {
  title: 'ドーナツぶちょうとたからのちず | ドーナツ部長',
  description: '全国勝手に部長コラボキャラバンMAP。ドーナツ部長が待っている場所を探そう！',
  openGraph: {
    title: 'ドーナツぶちょうとたからのちず | ドーナツ部長',
    description: '全国勝手に部長コラボキャラバンMAP。ドーナツ部長が待っている場所を探そう！',
    type: 'website',
  },
}

export default function MapPage() {
  return (
    <>
      <DonutHeader />
      <main className="relative min-h-screen bg-black">
        <CaravanMap />
      </main>
      <DonutFooter />
    </>
  )
}