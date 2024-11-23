import { bookService } from "../services/book.service.js"
import { BookList } from "./BookList.jsx"

export function BookIndex() {
	function loadBooks() {
		return bookService.query()
	}

	return (
		<section>
			<h1>This is the full book list</h1>
			<BookList />
		</section>
	)
}
