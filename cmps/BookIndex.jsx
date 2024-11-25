import { bookService } from "../services/book.service.js"
import { BookList } from "./BookList.jsx"
import { BooksFilter } from "./BookFilter.jsx"

const { useEffect, useState } = React
const { Link } = ReactRouterDOM

export function BookIndex() {
	const [books, setBooks] = useState(null)
	const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

	useEffect(() => {
		loadBooks()
	}, [filterBy])

	function loadBooks() {
		bookService
			.query(filterBy)
			.then(setBooks)
			.catch((err) => console.error("Could not get books list from db ", err))
		// console.log(books)
	}

	function onRemoveBook(bookId) {
		bookService
			.remove(bookId)
			.then(() => {
				setBooks((books) => books.filter((book) => book.id !== bookId))
				console.log("book was deleted, ", books)
			})
			.catch((err) => {
				console.log("Problems removing book:", err)
			})
	}

	function onSetFilter(filterBy) {
		setFilterBy((prevFilter) => ({
			...prevFilter,
			...filterBy,
		}))
	}

	if (!books) return <div>Loading....</div>
	return (
		<section className="book-index">
			<BooksFilter defaultFilter={filterBy} onSetFilter={onSetFilter} />
			<section className="add-btn">
				<Link to="/book/edit">Add Book</Link>
			</section>
			<h1>This is the full book list</h1>
			<BookList books={books} onRemoveBook={onRemoveBook} />
		</section>
	)
}
