import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"
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
		bookService
			.get(params.bookId)
			.then(setBook)
			.catch((err) => {
				console.log("Problem getting book", err)
			})
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
			{/* <button onClick={onBack}>Back</button> */}
			<div className="btn-container">
				{/* <button>
					<Link to={`/book/${book.prevBookId}`}>Prev Book</Link>
				</button> */}
				<Link to={`/book/${book.prevBookId}`}>
					<img
						className="icon"
						src="../assets/img/icons/left-arrow.png"
						alt="Previous Book"
					/>
				</Link>
				{/* <button onClick={onBack}>Back</button> */}
				<img
					className="icon"
					src="../assets/img/icons/list.png"
					alt="Book List"
					onClick={onBack}
				/>
				{/* <button className="edit-btn">
					<Link to={`/book/edit/${book.id}`}>Edit</Link>
				</button> */}
				<Link to={`/book/edit/${book.id}`}>
					<img
						className="icon"
						src="../assets/img/icons/pencil.png"
						alt="Edit book"
					/>
				</Link>

				{/* <button>
					<Link to={`/book/${book.nextBookId}`}>Next Book</Link>
					</button> */}
				<Link to={`/book/${book.nextBookId}`}>
					<img
						className="icon"
						src="../assets/img/icons/right-arrow.png"
						alt="Nest book"
					/>
				</Link>
			</div>

			<img src={book.thumbnail} alt="" />
			<h2 className="book-title">{book.title}</h2>
			<h1 className="book-subtitle">{book.subtitle}</h1>
			<h4 className="book-authors">
				{book.authors} , {book.publishedDate}
			</h4>
			<ul className="book-categories">
				{book.categories.map((cat) => (
					<li key={cat}>{cat.toLowerCase()}</li>
				))}
				{isVintageTag(book.publishedDate)}
			</ul>
			<h5 className="book-lang">Book language: {book.language}</h5>
			<h5 className="book-pages">
				{getPageCount(book.pageCount)}
				<b>, {book.pageCount} pages</b>
			</h5>

			<p className="book-description">
				{<LongTxt txt={book.description} length={50} />}
			</p>
			<h3
				className={getTextColorByPrice(book.listPrice.amount) + " book-price"}
			>
				{book.listPrice.amount}
				{bookService.getCurrencyCodeSigh(book.listPrice.currencyCode)}
				{book.listPrice.isOnSale ? " On Sale!" : ""}
			</h3>
		</section>
	)
}
