import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function DashBoard() {
	const [books, setBooks] = useState(null)
	const [booksCategoriesSum, setBooksCategoriesSum] = useState({})

	useEffect(() => {
		loadBooks()
	}, [booksCategoriesSum])

	function loadBooks() {
		bookService
			.query()
			.then((books) => {
				setBooks(books)
				setBooksCategoriesSum((sum) => (sum = getBooksCategoriesSum()))
			})
			.catch((err) => console.error("Could not get books list from db ", err))
	}

	function getBooksCategoriesSum() {
		if (books) {
			const bookCategories = books.reduce((acc, book) => {
				book.categories.forEach((category) => {
					acc[category] = (acc[category] || 0) + 1
				})

				return acc
			}, {})
			setBooksCategoriesSum(bookCategories)
		}
	}

	function setPollsFromSum(sum = {}) {
		const categoriesSum = Object.values(sum).reduce(
			(acc, catNum) => acc + catNum,
			0
		)

		return Object.entries(sum).map(([key, value]) => {
			const categoryPercentage = (value / categoriesSum) * 100

			return (
				<div
					key={key}
					className="dash-board-poll"
					style={{ height: `${categoryPercentage}%` }}
				>
					<span>
						{key} ({`${Math.round(categoryPercentage)}%`})
					</span>
				</div>
			)
		})
	}

	return (
		<section className="dash-board-container">
			<section className="dash-board">
				{setPollsFromSum(booksCategoriesSum)}
			</section>
		</section>
	)
}
