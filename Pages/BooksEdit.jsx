import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function BooksEdit() {
	const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
	const navigate = useNavigate()
	const { bookId } = useParams()

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
		// setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
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
			.catch((err) => console.log("Cannot Save book", err))
	}

	return (
		<section className="book-edit">
			<form onSubmit={onSaveBook}>
				<label htmlFor="title">
					Title:{" "}
					<input
						type="text"
						onChange={handleChange}
						value={bookToEdit.title}
						id="title"
						name="title"
					/>
				</label>
				<label htmlFor="subtitle">
					Subtitle:{" "}
					<textarea
						type="text"
						onChange={handleChange}
						value={bookToEdit.subtitle}
						id="subtitle"
						name="subtitle"
					/>
				</label>
				<label htmlFor="authors">
					authors:{" "}
					<input
						type="text"
						onChange={handleChange}
						value={bookToEdit.authors}
						id="authors"
						name="authors"
					/>
				</label>
				<label htmlFor="publishedDate">
					publishedDate:{" "}
					<input
						type="number"
						onChange={handleChange}
						value={bookToEdit.publishedDate}
						id="publishedDate"
						name="publishedDate"
					/>
				</label>
				<label htmlFor="description">
					description:{" "}
					<textarea
						type="text"
						onChange={handleChange}
						value={bookToEdit.description}
						id="description"
						name="description"
					/>
				</label>
				<label htmlFor="pageCount">
					pageCount:{" "}
					<input
						type="number"
						onChange={handleChange}
						value={bookToEdit.pageCount}
						id="pageCount"
						name="pageCount"
					/>
				</label>
				<label htmlFor="categories">
					categories:{" "}
					<input
						type="text"
						onChange={handleChange}
						value={bookToEdit.categories}
						id="categories"
						name="categories"
					/>
				</label>
				{/* <label htmlFor="thumbnail">
					thumbnail:{" "}
					<input
					type="text"
					onChange={handleChange}
					value={bookToEdit.thumbnail}
					id="thumbnail"
					name="thumbnail"
					/>
					</label> */}
				<label htmlFor="language">
					language:{" "}
					<input
						type="text"
						onChange={handleChange}
						value={bookToEdit.language}
						id="language"
						name="language"
					/>
				</label>
				<label htmlFor="amount">
					amount:{" "}
					<input
						type="number"
						onChange={handleChange}
						value={bookToEdit.listPrice.amount}
						id="amount"
						name="listPrice.amount"
					/>
				</label>
				<label htmlFor="currencyCode">
					currencyCode:{" "}
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
				</label>
				<label htmlFor="isOnSale">
					isOnSale:{" "}
					<input
						type="checkbox"
						onChange={handleChange}
						id="isOnSale"
						checked={bookToEdit.listPrice.isOnSale}
						value={bookToEdit.listPrice.isOnSale}
						name="listPrice.isOnSale"
					/>
				</label>
				<div className="btn-container">
					<button onClick={onBack}>Back</button>
					<button>Save</button>
				</div>
			</form>
		</section>
	)
}
