import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { StarRate } from "./StarRate.jsx"
const { useNavigate } = ReactRouterDOM
const { useState, useRef } = React

export function AddReview({ bookId, setNewReview }) {
	const [rating, setRating] = useState(null)
	const fullNameRef = useRef()
	const ratingRef = useRef()
	const dateRef = useRef()

	function setRatingFromReview(num) {
		setRating((rate) => (rate = num))
		return rating
	}

	function onSaveReview(ev) {
		ev.preventDefault()
		const review = {
			fullname: fullNameRef.current.value,
			rating: rating,
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
				<StarRate
					className="rating"
					setRatingFromReview={setRatingFromReview}
				/>
				{/* <input
					ref={ratingRef}
					id="rating"
					className="rating"
					type="number"
					min="1"
					max="5"
					step="1"
					defaultValue={5}
					required
					title="Only digits 0-5 are allowed"
				></input> */}
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
