import { debounce } from "../services/util.service.js"
const { useState, useEffect, useRef } = React

export function BooksFilter({ defaultFilter, onSetFilter }) {
	const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter)
	const onSetFilterDebounce = useRef(debounce(onSetFilter)).current

	useEffect(() => {
		onSetFilterDebounce(filterByToEdit)
		console.log(filterByToEdit)
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

		// if (!field.includes(".")) {
		// 	const [obj, nested] = field.split(".")
		// 	// console.log(obj)
		// 	setFilterByToEdit((prevFilter) => ({
		// 		...prevFilter,
		// 		[obj]: { [nested]: value },
		// 	}))
		// } else {
		// 	setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
		// }

		// if (!field.includes(".")) {
		setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
		// } else {
		// 	const [obj, nested] = field.split(".")
		// 	// console.log(obj)
		// 	setFilterByToEdit((prevFilter) => ({
		// 		...prevFilter,
		// 		[obj]: { [nested]: value },
		// 	}))
		// }
	}

	function onSubmitFilter(ev) {
		ev.preventDefault()
		onSetFilter(filterByToEdit)
	}
	const { title, listPrice } = filterByToEdit
	return (
		<section className="book-filter">
			<form onSubmit={onSubmitFilter}>
				<label htmlFor="title-filter">
					Title:{" "}
					<input
						value={title}
						type="text"
						id="title"
						name="title"
						className="title"
						onChange={handleChange}
						placeholder="Enter title"
					/>
				</label>{" "}
				{/* <label htmlFor="price-filter">
					Price:{" "}
					<input
						value={listPrice.amount}
						type="range"
						max={200}
						id="price-filter"
						name="listPrice.amount"
						className="price-filter"
						onChange={handleChange}
					/>
				</label> */}
				<button>Submit</button>
			</form>
		</section>
	)
}
