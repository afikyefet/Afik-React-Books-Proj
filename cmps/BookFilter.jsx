import { debounce } from "../services/util.service.js"
const { useState, useEffect, useRef } = React

export function BooksFilter({ defaultFilter, onSetFilter }) {
	const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter)
	const onSetFilterDebounce = useRef(debounce(onSetFilter)).current

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

	function onSubmitFilter(ev) {
		ev.preventDefault()
		onSetFilter(filterByToEdit)
	}

	return (
		<section className="book-filter">
			<form onSubmit={onSubmitFilter}>
				<label htmlFor="title-filter">
					Title:{" "}
					<input
						type="text"
						id="title-filter"
						name="title-filter"
						className="title-filter"
						onChange={handleChange}
					/>
				</label>{" "}
				<label htmlFor="price-filter">
					Price:{" "}
					<input
						type="range"
						max={200}
						id="price-filter"
						name="price-filter"
						className="price-filter"
						onChange={handleChange}
					/>
				</label>
				<button>Submit</button>
			</form>
		</section>
	)
}
