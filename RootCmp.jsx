import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./Pages/Home.jsx"
import { AboutUs } from "./Pages/AboutUs.jsx"
import { BookIndex } from "./Pages/BookIndex.jsx"
import { BookDetails } from "./Pages/BooksDetails.jsx"
import { BooksEdit } from "./Pages/BooksEdit.jsx"

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
						<Route path="/book/edit/:bookId" element={<BooksEdit />} />
						<Route path="/book/edit/" element={<BooksEdit />} />
					</Routes>
				</main>
			</section>
		</Router>
	)
}
