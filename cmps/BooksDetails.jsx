import { bookService } from "../services/book.service.js"
const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function BookDetails() {
	const [book, setbook] = useState(null)
	const params = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		loadbook()
	}, [params.bookId])

	function loadbook() {
		bookService
			.get(params.bookId)
			.then(setbook)
			.catch((err) => {
				console.log("Problem getting book", err)
			})
	}

	function onBack() {
		navigate("/book")
		// navigate(-1)
	}

	if (!book) return <div>Loading Book....</div>
	return (
		<section className="book-details">
			<img src={book.thumbnail} alt="" />
			<h1>{book.title}</h1>
			<h2>{book.subtitle}</h2>
			<h4>
				{book.authors} , {book.publishedDate}
			</h4>
			<h5>Book language: {book.language}</h5>
			<p>
				{book.description}, {book.pageCount} pages
			</p>
			<button onClick={onBack}>Back</button>
		</section>
	)
}
