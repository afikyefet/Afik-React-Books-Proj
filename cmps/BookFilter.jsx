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

		if (!field.includes(".")) {
			setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
		} else {
			const [obj, nested] = field.split(".")
			// console.log(obj)
			setFilterByToEdit((prevFilter) => ({
				...prevFilter,
				[obj]: { ...prevFilter[obj], [nested]: value },
			}))
		}
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
						value={filterByToEdit.listPrice.amount}
						type="range"
						max={500}
						id="price-filter"
						name="listPrice.amount"
						className="price-filter"
						onChange={handleChange}
					/>
					{filterByToEdit.listPrice.amount}
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
						checked={filterByToEdit.listPrice.isOnSale}
						value={filterByToEdit.listPrice.isOnSale}
						name="listPrice.isOnSale"
					/>
				</label>
				{/* <button>Submit</button> */}
			</form>
		</section>
	)
}
