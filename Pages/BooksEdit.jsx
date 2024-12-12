import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function BooksEdit() {
	const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
	const navigate = useNavigate()
	const { bookId } = useParams()

	const { title } = bookToEdit

	useEffect(() => {
		if (bookId) loadBook()
	}, [])

	function loadBook() {
		bookService
			.get(bookId)
			.then(setBookToEdit)
			.catch((err) => console.log("Couldnt get book", err))
	}

	function handleChange({ target }) {
		let { value, name: field } = target

		switch (target.type) {
			case "range":
			case "number":
				value = +target.value
				break
			case "checkbox":
				value = target.checked
				break
		}

		if (!field.includes(".")) {
			setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
		} else {
			const [obj, nested] = field.split(".")
			setBookToEdit((prevBook) => ({
				...prevBook,
				[obj]: { ...prevBook[obj], [nested]: value },
			}))
		}
	}

	function onBack() {
		navigate("/book")
	}

	function onSaveBook(ev) {
		ev.preventDefault()
		bookService
			.save(bookToEdit)
			.then(() => navigate("/book"))
			.then(showSuccessMsg("book has been saved successfully"))
			.catch((err) => {
				console.log("Cannot Save book", err)
				showErrorMsg("book could not be saved")
			})
	}

	return (
		<section className="book-edit">
			<form onSubmit={onSaveBook}>
				<label htmlFor="title">Title: </label>
				<input
					type="text"
					onChange={handleChange}
					value={title}
					id="title"
					name="title"
				/>
				<label htmlFor="subtitle">Subtitle: </label>
				<textarea
					type="text"
					onChange={handleChange}
					value={bookToEdit.subtitle}
					id="subtitle"
					name="subtitle"
				/>
				<label htmlFor="authors">Authors: </label>
				<input
					type="text"
					onChange={handleChange}
					value={bookToEdit.authors}
					id="authors"
					name="authors"
				/>
				<label htmlFor="publishedDate">Published Year: </label>
				<input
					type="number"
					onChange={handleChange}
					value={bookToEdit.publishedDate}
					id="publishedDate"
					name="publishedDate"
				/>
				<label htmlFor="description">Description: </label>
				<textarea
					type="text"
					onChange={handleChange}
					value={bookToEdit.description}
					id="description"
					name="description"
				/>
				<label htmlFor="pageCount">Pages: </label>
				<input
					type="number"
					onChange={handleChange}
					value={bookToEdit.pageCount}
					id="pageCount"
					name="pageCount"
				/>
				<label htmlFor="categories">Categories: </label>
				<input
					type="text"
					onChange={handleChange}
					value={bookToEdit.categories}
					id="categories"
					name="categories"
				/>
				<label htmlFor="language">Language: </label>
				<input
					type="text"
					onChange={handleChange}
					value={bookToEdit.language}
					id="language"
					name="language"
				/>
				<label htmlFor="amount">Price: </label>
				<input
					type="number"
					onChange={handleChange}
					value={bookToEdit.listPrice.amount}
					id="amount"
					name="listPrice.amount"
				/>
				<label htmlFor="currencyCode">Currency: </label>
				<select
					onChange={handleChange}
					value={bookToEdit.listPrice.currencyCode || "ILS"}
					id="currencyCode"
					name="listPrice.currencyCode"
				>
					{bookService.getCurrencyCodes().map((code) => (
						<option key={code} value={code}>
							{code}
						</option>
					))}
				</select>
				<label htmlFor="isOnSale">on Sale: </label>
				<input
					type="checkbox"
					onChange={handleChange}
					id="isOnSale"
					checked={bookToEdit.listPrice.isOnSale}
					value={bookToEdit.listPrice.isOnSale}
					name="listPrice.isOnSale"
				/>
				<div className="btn-container">
					<button onClick={onBack}>Back</button>
					<button>Save</button>
				</div>
			</form>
		</section>
	)
}
