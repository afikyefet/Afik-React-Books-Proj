import { debounce } from "../services/util.service.js"
const { useState, useEffect, useRef } = React

export function BooksFilter({ defaultFilter, onSetFilter }) {
	const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter)
	const onSetFilterDebounce = useRef(debounce(onSetFilter)).current
	const rangeRef = useRef().current

	useEffect(() => {
		onSetFilterDebounce(filterByToEdit)
	}, [filterByToEdit])

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

		setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
	}

	// const { title, listPrice } = filterByToEdit
	return (
		<section className="book-filter">
			<form>
				<label htmlFor="title-filter">
					Title:{" "}
					<input
						value={filterByToEdit.title}
						type="text"
						id="title"
						name="title"
						className="title"
						onChange={handleChange}
						placeholder="Enter title"
					/>
				</label>{" "}
				<label htmlFor="price-filter">
					Price:
					<input
						ref={rangeRef}
						value={filterByToEdit.amount}
						type="range"
						max={500}
						id="price-filter"
						name="amount"
						className="price-filter"
						onChange={handleChange}
					/>
					{filterByToEdit.amount}
				</label>
				<label htmlFor="date-filter">
					Up untill:
					<input
						ref={rangeRef}
						value={filterByToEdit.publishedDate}
						type="range"
						max={2025}
						min={1970}
						id="date-filter"
						name="publishedDate"
						className="date-filter"
						onChange={handleChange}
					/>
					{filterByToEdit.publishedDate}
				</label>
				<label htmlFor="isOnSale">
					On sale:{" "}
					<input
						type="checkbox"
						onChange={handleChange}
						id="isOnSale"
						checked={filterByToEdit.isOnSale}
						value={filterByToEdit.isOnSale}
						name="isOnSale"
					/>
				</label>
				{/* <button>Submit</button> */}
			</form>
		</section>
	)
}
