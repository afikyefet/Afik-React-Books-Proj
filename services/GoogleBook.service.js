export const googleService = { query }

async function query(txt) {
	if (!txt.trim()) {
		return resolve([])
	}
	try {
		const response = await fetch(
			"https://www.googleapis.com/books/v1/volumes?printType=books&q=" + txt
		)
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
		const data = await response.json()
		return data.items
	} catch (error) {
		console.error("Error fetching data:", error)
	}
}
