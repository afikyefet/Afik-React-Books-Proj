const { Link, useNavigate } = ReactRouterDOM

export function BookPreview({ book, onRemoveBook }) {
	const navigate = useNavigate()

	return (
		<div className="book-preview">
			<div className="book-img">
				<img src={book.thumbnail} alt="book cover" />
			</div>
			<div className="book-title">
				<h1>{book.title}</h1>
			</div>
			<h5 className="book-authors">
				{book.authors}, {book.publishedDate}
			</h5>
			<h5 className="book-categories">{book.categories}</h5>
			{/* <h5>{book.pageCount}</h5> */}
			<h4 className="book-price">
				{book.listPrice.amount} {book.listPrice.currencyCode}
				{book.listPrice.isOnSale ? " On Sale!" : ""}
			</h4>
			{/* <h5> {book.listPrice.isOnSale ? "On Sale!" : ""}</h5> */}
			<div className="btn-container">
				<button className="del-btn" onClick={() => onRemoveBook(book.id)}>
					delete
				</button>
				<button className="details-btn">
					<Link to={`/book/${book.id}`}>Details</Link>
				</button>
				<button className="edit-btn">
					<Link to={`/book/edit/${book.id}`}>Edit</Link>
				</button>
			</div>
		</div>
	)
}
