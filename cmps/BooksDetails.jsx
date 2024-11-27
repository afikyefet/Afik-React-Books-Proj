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

	function onBack() {
		navigate("/book")
		// navigate(-1)
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
			<h5>Book language: {book.language}</h5>
			<p>
				{book.description}, {book.pageCount} pages
			</p>
			<div className="btn-container">
				<button>
					<Link to={`/book/${book.prevBookId}`}>Prev Book</Link>
				</button>
				<button onClick={onBack}>Back</button>
				<button>
					<Link to={`/book/${book.nextBookId}`}>Next Book</Link>
				</button>
			</div>
		</section>
	)
}
