import { Outlet } from 'react-router'
import ScrollToTop from './ScrollToTop'

const Layout = () => {
  return (
    <>
    <ScrollToTop />
    <Outlet />
    </>
  )
}

export default Layout
