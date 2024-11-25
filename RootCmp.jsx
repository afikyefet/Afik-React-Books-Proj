import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./cmps/Home.jsx"
import { AboutUs } from "./cmps/AboutUs.jsx"
import { BookIndex } from "./cmps/BookIndex.jsx"
import { BookDetails } from "./cmps/BooksDetails.jsx"

const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

export function RootCmp() {
	return (
		<Router>
			<section className="app main-layout">
				<AppHeader />
				<main>
					<Routes>
						<Route path="/" element={<Navigate to="/home" />} />
						<Route path="/home" element={<Home />} />
						<Route path="/about" element={<AboutUs />} />
						<Route path="/book" element={<BookIndex />} />
						<Route path="/book/:bookId" element={<BookDetails />} />
					</Routes>
				</main>
			</section>
		</Router>
	)
}
