import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function DashBoard() {
	const [books, setBooks] = useState(null)

	useEffect(() => {
		loadBooks()
	}, [])

	function loadBooks() {
		bookService
			.query()
			.then(setBooks)
			.catch((err) => console.error("Could not get books list from db ", err))
	}

	function getBooksCategoriesSum() {
		const bookCategories = books.reduce((acc, book) => {
			book.categories.forEach((category) => {
				acc[category] = (acc[category] || 0) + 1
			})

			return acc
		}, {})
		// console.log(bookCategories)
		// books.map((book) => console.log(book.categories))
	}

	return (
		<section className="dash-board-container">
			<section className="dash-board">
				<div>sport</div>
				<div>comedy</div>
				<div></div>
				<div></div>
			</section>
			<button onClick={() => getBooksCategoriesSum()}>test</button>
		</section>
	)
}
