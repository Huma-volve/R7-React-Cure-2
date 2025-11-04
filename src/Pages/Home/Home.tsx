import { lazy } from "react"
const Faq = lazy(() => import('@/components/common/homeFaq/Faq'))
const Home = () => {
  return (
    <div>
      <Faq />
    </div>
  )
}

export default Home
