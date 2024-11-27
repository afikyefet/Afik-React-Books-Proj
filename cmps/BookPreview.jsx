const { Link } = ReactRouterDOM

export function BookPreview({ book, onRemoveBook }) {
	function isVintageTag(publishedDate) {
		if (publishedDate < 2015) {
			return <li className="publishedDate">vintage</li>
		} else if (publishedDate > 2023) {
			return <li className="publishedDate">new publish</li>
		}
		return null
	}

	function getTextColorByPrice(amount) {
		if (amount > 150) return "t-red"
		if (amount < 20) return "t-green"
	}

	function getCurrencyCodeSigh(currencyCode) {
		switch (currencyCode) {
			case "ILS":
				return "₪"
			case "USD":
				return "$"
			case "EUR":
				return "€"
		}
	}

	return (
		<div className="book-preview">
			<div className="book-img">
				<img src={book.thumbnail} alt="book cover" />
			</div>
			<div className="book-title">
				<h1>{book.title.replace(/^./, (char) => char.toUpperCase())}</h1>
			</div>
			<h5 className="book-authors">
				{book.authors}, {book.publishedDate}
			</h5>
			<ul className="book-categories">
				{book.categories.map((cat) => (
					<li key={cat}>{cat.toLowerCase()}</li>
				))}
				{isVintageTag(book.publishedDate)}
			</ul>
			{/* <h5>{book.pageCount}</h5> */}
			<h4
				className={`book-price ${getTextColorByPrice(book.listPrice.amount)}`}
			>
				{book.listPrice.amount}
				{getCurrencyCodeSigh(book.listPrice.currencyCode)}
				{/* {book.listPrice.isOnSale ? " On Sale!" : ""} */}
			</h4>
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
