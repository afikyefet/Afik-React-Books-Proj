import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./Pages/Home.jsx"
import { AboutUs } from "./Pages/AboutUs.jsx"
import { BookIndex } from "./Pages/BookIndex.jsx"
import { BookDetails } from "./Pages/BooksDetails.jsx"
import { BooksEdit } from "./Pages/BooksEdit.jsx"
import { Offer } from "./cmps/AboutCmps/Offer.jsx"
import { Choose } from "./cmps/AboutCmps/Choose.jsx"
import { Community } from "./cmps/AboutCmps/Community.jsx"

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
						<Route path="/about" element={<AboutUs />}>
							<Route path="/about/offer" element={<Offer />} />
							<Route path="/about/choose" element={<Choose />} />
							<Route path="/about/community" element={<Community />} />
						</Route>
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
