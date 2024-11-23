export function BookPreview({ book }) {
	return (
		<div className="book-preview">
			<img src={book.thumbnail} alt="book cover" />
			<h1 className="book-title">{book.title}</h1>
			<h5 className="book-authors">
				{book.authors}, {book.publishedDate}
			</h5>
			<h5 className="book-categories">{book.categories.join(", ")}</h5>
			{/* <h5>{book.pageCount}</h5> */}
			<h4>
				{book.listPrice.amount} {book.listPrice.currencyCode}
			</h4>
			<h5> {book.listPrice.isOnSale ? "On Sale!" : ""}</h5>
		</div>
	)
}
