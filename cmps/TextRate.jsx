export function TextRate({ setRatingFromReview }) {
	return (
		<input
			onChange={(ev) => setRatingFromReview(ev.target.value, "text")}
			id="rating"
			className="rating"
			type="number"
			min="1"
			max="5"
			step="1"
			defaultValue={5}
			required
			title="Only digits 0-5 are allowed"
		></input>
	)
}
