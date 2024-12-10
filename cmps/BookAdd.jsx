import { bookService } from "../services/book.service.js"
import { googleService } from "../services/GoogleBook.service.js"
import { debounce } from "../services/util.service.js"
const { useState, useEffect, useRef } = React

export function BookAdd({ setNewGoogleBook }) {
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

	function saveGoogleBook(book) {
		bookService.saveGoogleBook(book).then((book) => setNewGoogleBook(book))
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
					placeholder="Search for Title"
				></input>
			</form>
			{searchResults.length > 0 && (
				<ul className="result-list">
					{searchResults.map((book) => (
						<li className="result" key={book.id}>
							{book.volumeInfo.title || "Untitled"}{" "}
							<img
								src="./assets/img/icons/add.png"
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
