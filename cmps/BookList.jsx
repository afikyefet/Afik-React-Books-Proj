import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books, onRemoveBook }) {
	// console.log(books)

	return (
		<React.Fragment>
			<ul className="book-list">
				{books.map((book) => (
					<li key={book.id}>
						<BookPreview book={book} onRemoveBook={onRemoveBook} />
					</li>
				))}
			</ul>
		</React.Fragment>
	)
}
