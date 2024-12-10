import { bookService } from "../services/book.service.js"
import { googleService } from "../services/GoogleBook.service.js"
import { debounce } from "../services/util.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
const { useState, useEffect, useRef } = React

export function BookAdd({ setNewGoogleBook, Books }) {
	const [titleToSearch, setTitleToSearch] = useState("")
	const [searchResults, setSearchResults] = useState([])
	const onSetTitleDebounce = useRef(debounce(getGoogleBooks)).current

	useEffect(() => {
		if (!titleToSearch.trim()) {
			setSearchResults([])
			return
		}
		onSetTitleDebounce(titleToSearch)
	}, [titleToSearch])

	useEffect(() => {
		console.log(searchResults)
	}, [searchResults])

	function saveGoogleBook(book) {
		if (
			!Books.some(
				(existingBook) =>
					existingBook.title === book.volumeInfo.title &&
					existingBook.id === book.id
			)
		) {
			bookService
				.addGoogleBook(book)
				.then((book) => setNewGoogleBook(book))
				.then(showSuccessMsg("book saved successfully"))
				.catch((err) => {
					showErrorMsg("could not save this book")
					console.error(err)
				})
		}
	}

	function handleChange({ target }) {
		const { value } = target
		setTitleToSearch((title) => (title = value))
	}

	function getGoogleBooks(txt) {
		if (!txt.trim()) {
			setSearchResults([])
			return
		}

		googleService
			.query(txt)
			.then((books) => setSearchResults((results) => (results = books || [])))
			.catch((err) => console.error("could not get search results:", err))
	}

	return (
		<section className="book-add">
			<form>
				<input
					onChange={handleChange}
					type="text"
					id="book-title"
					name="book-title"
					className="book-title"
					placeholder="Search for Title on google"
				></input>
			</form>
			{searchResults.length > 0 && (
				<ul className="result-list">
					{searchResults.map((book) => (
						<li className="result" key={book.id}>
							<span className="result-title">
								{book.volumeInfo.title || "Untitled"}{" "}
							</span>
							<img
								src="./assets/img/icons/add.png"
								alt="Add title"
								className="book-add-btn icon"
								onClick={() => saveGoogleBook(book)}
							/>
						</li>
					))}
				</ul>
			)}
		</section>
	)
}
