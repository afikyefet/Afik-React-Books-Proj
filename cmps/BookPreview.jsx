const { Link } = ReactRouterDOM
import { utilService } from "../services/util.service.js"

export function BookPreview({ book, onRemoveBook }) {
	function onBookRemove(el) {
		const bookElement = el.currentTarget.parentElement.parentElement
		utilService.animateCSS(bookElement, "rollOut", false).then(() => {
			onRemoveBook(book.id)
		})
	}

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
			{book.listPrice.isOnSale && (
				<img
					className="on-sale"
					src="./assets/img/Sale-PNG.png"
					alt="on sale!"
				/>
			)}
			<div className="book-img">
				<Link to={`/book/${book.id}`}>
					<img src={book.thumbnail} alt="book cover" />
				</Link>
			</div>
			<div className="book-title">
				<h1>{book.title.replace(/^./, (char) => char.toUpperCase())}</h1>
			</div>
			<h5 className="book-authors">
				{book.authors}, {book.publishedDate}
			</h5>
			<ul className="book-categories">
				{book.categories &&
					book.categories.map((cat) => <li key={cat}>{cat.toLowerCase()}</li>)}
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
				<button className="del-btn" onClick={(el) => onBookRemove(el)}>
					<img
						className="icon"
						src="./assets/img/icons/bin black on white.png"
						alt="Delete book"
					/>
				</button>
				<button className="details-btn">
					<Link to={`/book/${book.id}`}>Details</Link>
				</button>
				<button className="edit-btn">
					<Link to={`/book/edit/${book.id}`}>
						<img
							className="icon"
							src="./assets/img/icons/pencil.png"
							alt="Edit book"
						/>
					</Link>
				</button>
			</div>
		</div>
	)
}
