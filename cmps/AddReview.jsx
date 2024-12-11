import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { StarRate } from "./StarRate.jsx"
import { TextRate } from "./TextRate.jsx"
import { SelectRate } from "./SelectRate.jsx"
const { useState, useRef } = React

export function AddReview({ bookId, setNewReview }) {
	const [rating, setRating] = useState({})
	const [cmpType, setCmpType] = useState("stars")
	const fullNameRef = useRef()
	const ratingRef = useRef()
	const dateRef = useRef()

	function setRatingFromReview(num, rateType) {
		setRating((rating) => (rating = { rate: num, rateType: rateType }))
		return rating
	}

	function onSaveReview(ev) {
		ev.preventDefault()
		const review = {
			fullname: fullNameRef.current.value,
			rating: rating.rate,
			rateType: rating.rateType,
			readAt: dateRef.current.value,
		}
		bookService
			.addReview(bookId, review)
			.then(setNewReview(review))
			.then(showSuccessMsg("review added successfully"))
			.catch((err) => {
				console.log("Cannot Save review", err)
				showErrorMsg("review could not be saved")
			})
	}

	return (
		<section className="add-review">
			<h2>Add a review</h2>
			<select
				className="rate-selector"
				value={cmpType}
				onChange={(ev) => setCmpType(ev.target.value)}
			>
				<option value="stars">Stars</option>
				<option value="text">Number</option>
				<option value="selection">Selection</option>
			</select>
			<form className="review-form" onSubmit={onSaveReview}>
				<label className="label-full-name" htmlFor="full-name">
					Full name:{" "}
				</label>
				<input
					ref={fullNameRef}
					id="full-name"
					className="full-name"
					type="text"
					placeholder="Full Name"
					required
				></input>
				<label className="label-rating" htmlFor="rating">
					Rating:{" "}
				</label>
				<DynamicCmp
					setRatingFromReview={setRatingFromReview}
					cmpType={cmpType}
					className="rating"
				/>
				<label className="label-read-at" htmlFor="read-at">
					Read at:{" "}
				</label>
				<input
					ref={dateRef}
					id="read-at"
					className="read-at"
					type="date"
					defaultValue="2024-01-01"
					required
				></input>
				<button className="btn-rate">Rate</button>
			</form>
		</section>
	)
}

function DynamicCmp({ cmpType, ...restOfProps }) {
	const dynCmpMap = {
		stars: <StarRate {...restOfProps} />,
		text: <TextRate {...restOfProps} />,
		selection: <SelectRate {...restOfProps} />,
	}

	return dynCmpMap[cmpType]
}
