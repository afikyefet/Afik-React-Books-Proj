const { useState } = React

export function SelectRate({ setRatingFromReview }) {
	const [rating, setRating] = useState("")

	const ratings = [
		{ value: 1, label: "Didn’t finish / Terrible" },
		{ value: 2, label: "Disappointing / Not enjoyable" },
		{ value: 3, label: "Average / Okay but forgettable" },
		{ value: 4, label: "Enjoyable / Worth recommending" },
		{ value: 5, label: "Outstanding / A must-read" },
	]

	const handleChange = (event) => {
		setRating((rating) => (rating = event.target.value))
		setRatingFromReview(event.target.value, "select")
	}

	return (
		<select id="book-rating" value={rating} onChange={handleChange}>
			<option value="" disabled>
				Select a rating
			</option>
			{ratings.map((option) => (
				<option onClick={handleChange} key={option.value} value={option.label}>
					{option.label}
				</option>
			))}
		</select>
	)
}
