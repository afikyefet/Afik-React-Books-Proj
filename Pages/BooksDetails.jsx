import { bookService } from "../services/book.service.js"
const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function BookDetails() {
	const [book, setBook] = useState(null)
	const params = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		loadbook()
	}, [params.bookId])

	function loadbook() {
		bookService.get(params.bookId).then(setBook)
		// .catch((err) => {
		// 	console.log("Problem getting book", err)
		// })
	}

	function getTextColorByPrice(amount) {
		if (amount > 150) return "t-red"
		if (amount < 20) return "t-green"
	}

	function getPageCount(pages) {
		if (pages > 500) {
			return "Serious Reading"
		} else if (pages > 200) {
			return "Decent Reading"
		} else if (pages < 100) {
			return "Light Reading"
		} else {
			return "Moderate Reading"
		}
	}

	function isVintageTag(publishedDate) {
		if (publishedDate < 2015) {
			return ", vintage"
		} else if (publishedDate > 2023) {
			return ", new publish"
		}
		return null
	}

	function onBack() {
		navigate("/book")
	}

	if (!book) return <div>Loading Book....</div>
	return (
		<section className="book-details">
			<button onClick={onBack}>Back</button>

			<img src={book.thumbnail} alt="" />
			<h2>{book.title}</h2>
			<h1>{book.subtitle}</h1>
			<h4>
				{book.authors} , {book.publishedDate}
			</h4>
			<h4>
				{book.categories}
				{isVintageTag(book.publishedDate)}
			</h4>
			<h4></h4>
			<h5>Book language: {book.language}</h5>
			<h5>{getPageCount(book.pageCount)}</h5>
			<p>
				{book.description}, <b>{book.pageCount} pages</b>{" "}
			</p>
			<h3 className={getTextColorByPrice(book.listPrice.amount)}>
				{book.listPrice.amount}
				{bookService.getCurrencyCodeSigh(book.listPrice.currencyCode)}
				{book.listPrice.isOnSale ? " On Sale!" : ""}
			</h3>
			<div className="btn-container">
				<button>
					<Link to={`/book/${book.prevBookId}`}>Prev Book</Link>
				</button>
				<button onClick={onBack}>Back</button>
				<button className="edit-btn">
					<Link to={`/book/edit/${book.id}`}>Edit</Link>
				</button>
				<button>
					<Link to={`/book/${book.nextBookId}`}>Next Book</Link>
				</button>
			</div>
		</section>
	)
}
