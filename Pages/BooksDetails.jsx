import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { AddReview } from "../cmps/AddReview.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

// import leftArrowIcon from '../assets/img/icons/left-arrow.png'

export function BookDetails() {
	const [book, setBook] = useState(null)
	const [reviews, setReviews] = useState([])
	const params = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		loadBooks()
		console.log()
	}, [params.bookId])

	function loadBooks() {
		bookService
			.get(params.bookId)
			.then((book) => {
				setBook((currentBook) => (currentBook = book))
				if (book.reviews) setReviews((reviews) => (reviews = book.reviews))
				showSuccessMsg("books loaded successfully")
			})
			.catch((err) => {
				console.log("Problem getting book", err)
				showErrorMsg("could not load book")
			})
	}

	function setNewReview(review) {
		setReviews((reviews) => (reviews = [review, ...reviews]))
	}

	function setRatingAsType(rateType, rating) {
		if (rateType === "stars") {
			return getRatingInStars(rating)
		} else if (rateType === "text" || rateType === "select") {
			return rating
		}
	}

	function getRatingInStars(rating) {
		return [...Array(5)].map((star, idx) => {
			const currentRate = idx + 1
			return (
				<i
					key={`star-${idx}`}
					className="fa-solid fa-star star"
					style={{ color: currentRate <= rating ? "yellow" : "grey" }}
				></i>
			)
		})
	}

	function onRemoveBook(bookId) {
		bookService
			.remove(bookId)
			.then(() => {
				console.log("book was deleted")
				showSuccessMsg("book was deleted successfully")
			})
			.catch((err) => {
				console.log("Problems removing book:", err)
				showErrorMsg("book could not be deleted")
			})
	}

	function onRemoveReview(reviewId) {
		bookService
			.removeReview(book.id, reviewId)
			.then(() => {
				setReviews((reviews) =>
					reviews.filter((review) => review.id !== reviewId)
				)
				console.log("review was deleted")
				showSuccessMsg("review was deleted")
			})
			.catch((err) => {
				console.log("Problems removing review:", err)
				showErrorMsg("Problems removing review")
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
			<div className="btn-container">
				<Link to={`/book/${book.prevBookId}`}>
					<img
						className="icon"
						src="./assets/img/icons/left-arrow.png"
						alt="Previous Book"
					/>
				</Link>
				<img
					className="icon"
					src="./assets/img/icons/list.png"
					alt="Book List"
					onClick={onBack}
				/>

				<Link to={`/book/edit/${book.id}`}>
					<img
						className="icon"
						src="./assets/img/icons/pencil.png"
						alt="Edit book"
					/>
				</Link>
				<Link to={`/book/${book.nextBookId}`}>
					<img
						onClick={() => onRemoveBook(book.id)}
						className="icon"
						src="./assets/img/icons/bin black on white.png"
						alt="Nest book"
					/>
				</Link>
				<Link to={`/book/${book.nextBookId}`}>
					<img
						className="icon"
						src="./assets/img/icons/right-arrow.png"
						alt="Nest book"
					/>
				</Link>
			</div>

			<img src={book.thumbnail} alt="book thumbnail" />
			<h2 className="book-title">{book.title}</h2>
			<h1 className="book-subtitle">{book.subtitle}</h1>
			<h4 className="book-authors">
				{book.authors} , {book.publishedDate}
			</h4>
			<ul className="book-categories">
				{book.categories &&
					book.categories.map((cat) => <li key={cat}>{cat.toLowerCase()}</li>)}
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
			<AddReview bookId={book.id} setNewReview={setNewReview} />
			<ul className="review-list">
				{reviews.map((review) => (
					<li key={review.id}>
						<button
							className="review-remove"
							onClick={() => onRemoveReview(review.id)}
						>
							X
						</button>
						<h4 className="review-name">Full name: {review.fullname}</h4>
						{
							<h4 className="review-rate">
								Rating: {setRatingAsType(review.rateType, review.rating)}
							</h4>
						}
						<span className="review-readat">
							Book was read at: {review.readAt}
						</span>
					</li>
				))}
			</ul>
		</section>
	)
}
