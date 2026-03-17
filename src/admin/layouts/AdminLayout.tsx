import { Outlet } from "react-router"

export const AdminLayout = () => {
  return (
    <div className="bg-green-400">
      <Outlet />
    </div>
  )
}
