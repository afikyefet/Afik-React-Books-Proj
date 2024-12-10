const { useState } = React
export function StarRate({ setRatingFromReview }) {
	const [rating, setRating] = useState(null)
	const [rateColor, setRateColor] = useState(null)

	function getColor(currentRate) {
		return currentRate <= rating ? "yellow" : "white"
	}

	return (
		<section className="star-rate">
			{[...Array(5)].map((star, idx) => {
				const currentRate = idx + 1
				return (
					<React.Fragment key={`fragment ${idx}`}>
						<label key={`label ${idx}`} htmlFor={idx}>
							<input
								type="radio"
								name="rate"
								id={idx}
								value={currentRate}
								key={`input ${idx}`}
								onClick={() => {
									setRating(currentRate)
									setRatingFromReview(currentRate)
								}}
							/>
							<i
								key={`star ${idx}`}
								className="fa-solid fa-star star"
								style={{ color: getColor(currentRate) }}
							></i>
						</label>
					</React.Fragment>
				)
			})}
		</section>
		
	)
}
