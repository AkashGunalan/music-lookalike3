import { createBrowserRouter, RouterProvider } from "react-router";

import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Search from "./components/Search";
import Layout from "./components/Layout";
import Account from "./components/Account";

const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			errorElement: <NotFound />,
			children: [
				{ path: "/", element: <Login /> },
				{ path: "/register", element: <Register /> },
				{ path: "/search", element: <Search /> },
				{ path: "/account", element: <Account /> }
			]
		}
	])

	return (
		<div>
		<RouterProvider router={router} />
		</div>
	)
}

export default App;