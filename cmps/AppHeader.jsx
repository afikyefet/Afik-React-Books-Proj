const { NavLink } = ReactRouterDOM

export function AppHeader() {
	return (
		<header className="app-header full main-layout">
			<section className="header-container">
				<h1>Chapter & Verse</h1>
				<nav className="nav-list">
					<NavLink className="NavLink" to="/home">
						Home
					</NavLink>
					<NavLink className="NavLink" to="/about">
						About Us
					</NavLink>
					<NavLink className="NavLink" to="/book">
						Books List
					</NavLink>
				</nav>
			</section>
		</header>
	)
}
