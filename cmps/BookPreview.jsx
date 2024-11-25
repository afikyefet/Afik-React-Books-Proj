const { Link, useNavigate } = ReactRouterDOM

export function BookPreview({ book, onRemoveBook }) {
	const navigate = useNavigate()

	return (
		<div className="book-preview">
			<img src={book.thumbnail} alt="book cover" />
			<h1 className="book-title">{book.title}</h1>
			<h5 className="book-authors">
				{book.authors}, {book.publishedDate}
			</h5>
			<h5 className="book-categories">{book.categories}</h5>
			{/* <h5>{book.pageCount}</h5> */}
			<h4>
				{book.listPrice.amount} {book.listPrice.currencyCode}
			</h4>
			{/* <h5> {book.listPrice.isOnSale ? "On Sale!" : ""}</h5> */}
			<div className="btn-container">
				<button className="del-btn" onClick={() => onRemoveBook(book.id)}>
					delete
				</button>
				<button className="edit-btn">
					<Link to={`/book/edit/${book.id}`}>Edit</Link>
				</button>
				<button className="details-btn">
					<Link to={`/book/${book.id}`}>Details</Link>
				</button>
			</div>
		</div>
	)
}
