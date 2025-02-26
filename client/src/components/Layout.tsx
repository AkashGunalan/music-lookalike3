import { Outlet } from "react-router";
import ThemeToggle from "./ThemeToggle";
import Profile from "./Profile";

const Layout = () => {
    return (
        <main>
            <ThemeToggle />
            <Profile />
            <Outlet />
        </main>
    )
}

export default Layout;
