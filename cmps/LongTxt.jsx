const { useState, useEffect } = React

export function LongTxt({ txt, length = 100 }) {
	const [text, setText] = useState(txt)
	const [isLong, setIsLong] = useState(false)

	function toggleIsLong() {
		setIsLong((long) => !long)
	}

	const shortText = txt.length > length ? txt.slice(0, length) + "..." : txt

	if (!shortText) return <div>Loading</div>
	return (
		<React.Fragment>
			{!isLong && (
				<span className="short-text">
					{shortText} <a onClick={toggleIsLong}> See more</a>
				</span>
			)}
			{isLong && (
				<span className="long-text">
					{text} <a onClick={toggleIsLong}> See less</a>
				</span>
			)}
		</React.Fragment>
	)
}
