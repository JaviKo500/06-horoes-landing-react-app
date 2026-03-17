import { Link, Outlet } from "react-router"

export const HeroesLayout = () => {
  return (
    <div className="bg-red-300">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/hero/1">Hero 1</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
      <section className="p-4">
        <Outlet />
      </section>
    </div>
  )
}
