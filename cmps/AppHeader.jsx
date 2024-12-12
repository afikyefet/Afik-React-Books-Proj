const { NavLink, Link } = ReactRouterDOM

export function AppHeader() {
	return (
		<header className="app-header full main-layout">
			<section className="header-container">
				<h1>
					<Link to="/">Chapter & Verse</Link>
				</h1>
				<nav className="nav-list">
					<NavLink className="NavLink" to="/home">
						Home
					</NavLink>
					<NavLink className="NavLink" to="/about">
						About
					</NavLink>
					<NavLink className="NavLink" to="/book">
						Books
					</NavLink>
					<NavLink className="NavLink" to="/dashboard">
						Dashboard
					</NavLink>
				</nav>
			</section>
		</header>
	)
}
