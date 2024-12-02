import { bookService } from "../services/book.service.js"
const { useNavigate } = ReactRouterDOM
const { useState, useRef } = React

export function AddReview({ bookId, setNewReview }) {
	const fullNameRef = useRef()
	const ratingRef = useRef()
	const dateRef = useRef()

	function onSaveReview(ev) {
		ev.preventDefault()
		const review = {
			fullname: fullNameRef.current.value,
			rating: ratingRef.current.value,
			readAt: dateRef.current.value,
		}
		bookService
			.addReview(bookId, review)
			.then(setNewReview(review))
			.catch((err) => console.log("Cannot Save review", err))
	}

	return (
		<section className="add-review">
			<form className="review-form" onSubmit={onSaveReview}>
				<label className="label-full-name" htmlFor="full-name">
					Full name:{" "}
				</label>
				<input
					ref={fullNameRef}
					id="full-name"
					className="full-name"
					type="text"
				></input>
				<label className="label-rating" htmlFor="rating">
					Rating:{" "}
				</label>
				<input
					ref={ratingRef}
					id="rating"
					className="rating"
					type="number"
					pattern="[0-5]*"
					title="Only digits 0-5 are allowed"
				></input>
				<label className="label-read-at" htmlFor="read-at">
					Read at:{" "}
				</label>
				<input
					ref={dateRef}
					id="read-at"
					className="read-at"
					type="date"
				></input>
				<button className="btn-rate">Rate</button>
			</form>
		</section>
	)
}
