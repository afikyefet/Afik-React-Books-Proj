import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books, onRemoveBook }) {
	console.log(books)

	return (
		<ul className="book-list">
			{books.map((book) => (
				<li key={book.id}>
					<BookPreview book={book} onRemoveBook={onRemoveBook} />
					{/* <button className="book-del" onClick={() => onRemoveBook(book.id)}>
						X
					</button> */}
				</li>
			))}
		</ul>
	)
}
