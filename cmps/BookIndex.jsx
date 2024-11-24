import { bookService } from "../services/book.service.js"
import { BookList } from "./BookList.jsx"

const { useEffect, useState } = React

export function BookIndex() {
	const [books, setBooks] = useState(null)

	useEffect(() => {
		loadBooks()
		console.log(books)
	}, [])

	function loadBooks() {
		return bookService
			.query()
			.then((newBooks) => setBooks((books) => (books = newBooks)))
			.catch((err) => console.error("Could not get books list from db ", err))
	}

	function onRemoveBook(bookId) {
		return bookService
			.remove(bookId)
			.then(() => {
				setBooks((books) => books.filter((book) => book.id !== bookId))
				console.log("boook was deleted, ", books)
			})
			.catch((err) => {
				console.log("Problems removing book:", err)
			})
	}
	if (!books) return <div>Loading....</div>
	return (
		<section className="books-index">
			<h1>This is the full book list</h1>
			<BookList books={books} onRemoveBook={onRemoveBook} />
		</section>
	)
}
