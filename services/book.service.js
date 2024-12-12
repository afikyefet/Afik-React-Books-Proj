import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"
import { googleService } from "./GoogleBook.service.js"

export const bookService = {
	query,
	get,
	remove,
	save,
	getEmptyBook,
	getDefaultFilter,
	getCurrencyCodes,
	getCurrencyCodeSigh,
	addReview,
	removeReview,
	getFilterFromSrcParams,
	addGoogleBook,
	normalizeCategories,
	createRandomBook,
}

const STORAGE_KEY = "BooksDB"
let currentFilter = {}
_CreateBooks()

function query(filterBy = {}) {
	if (!filterBy) filterBy = getDefaultFilter()
	_setCurrentFilter(filterBy)
	return storageService.query(STORAGE_KEY).then((books) => {
		if (filterBy.title !== "") {
			const regExp = new RegExp(filterBy.title, "i")
			books = books.filter((book) => regExp.test(book.title))
		}

		if (filterBy.amount >= 0) {
			books = books.filter((book) => {
				return book.listPrice.amount < filterBy.amount
			})
		}
		if (filterBy.publishedDate < 2025) {
			books = books.filter((book) => {
				return book.publishedDate < filterBy.publishedDate
			})
		}

		if (filterBy.isOnSale) {
			books = books.filter(({ listPrice }) => listPrice.isOnSale)
		}
		return books
	})
}

async function get(bookId) {
	const book = await storageService.get(STORAGE_KEY, bookId)
	return _setNextPrevBookId(book)
}

function remove(bookId) {
	return storageService.remove(STORAGE_KEY, bookId)
}

function save(book, isEdit = true) {
	if (book.id && isEdit) {
		return storageService.put(STORAGE_KEY, book)
	} else {
		if (book.categories && book.categories.typeof !== "object") {
			book.categories = normalizeCategories(book.categories)
		}
		if (!book.thumbnail)
			book.thumbnail =
				"/assets/img/BooksImages/" + Math.ceil(Math.random() * 20) + ".jpg"
		return storageService.post(STORAGE_KEY, book)
	}
}

function getEmptyBook() {
	return {
		title: "",
		subtitle: "",
		authors: [],
		publishedDate: 0,
		description: "",
		pageCount: 0,
		categories: [],
		thumbnail: "",
		language: "",
		listPrice: {
			amount: 0,
			currencyCode: "USD",
			isOnSale: false,
		},
	}
}

async function addReview(bookId, review) {
	review.id = utilService.makeId(4)
	await get(bookId).then((book) => {
		book.reviews = [review, ...book.reviews]
		save(book)
	})
	return review
}

async function removeReview(bookId, reviewId) {
	const book = await get(bookId)
	book.reviews = book.reviews.filter((review) => review.id !== reviewId)
	save(book)
}

function getCurrencyCodes() {
	return ["ILS", "USD", "EUR"]
}

function getCurrencyCodeSigh(currencyCode) {
	switch (currencyCode) {
		case "ILS":
			return "₪"
		case "USD":
			return "$"
		case "EUR":
			return "€"
	}
}

function getDefaultFilter() {
	return {
		title: "",
		publishedDate: 2025,
		amount: 500,
		isOnSale: false,
	}
}
function getFilterFromSrcParams(srcParams) {
	const title = srcParams.get("title") || ""
	const publishedDate = srcParams.get("published") || "2025"
	const amount = srcParams.get("price") || "500"
	const isOnSale = srcParams.get("onSale") || ""
	return {
		title,
		publishedDate,
		amount,
		isOnSale,
	}
}

function _setCurrentFilter(FilterBy = {}) {
	currentFilter = FilterBy
}

async function _CreateBooks() {
	let books = await storageService.query(STORAGE_KEY)

	if (!books || !books.length) {
		const ctgs = ["Love", "Fiction", "Poetry", "Computers", "Religion"]
		const currencyCode = getCurrencyCodes()
		for (let i = 0; i < 20; i++) {
			const book = {
				id: utilService.makeId(),
				title: utilService.makeLorem(2),
				subtitle: utilService.makeLorem(4),
				authors: [utilService.makeLorem(1)],
				publishedDate: utilService.getRandomIntInclusive(1950, 2024),
				description: utilService.makeLorem(20),
				pageCount: utilService.getRandomIntInclusive(20, 800),
				categories: [
					ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)],
				],
				thumbnail: `./assets/img/BooksImages/${i + 1}.jpg`,
				language: "en",
				listPrice: {
					amount: utilService.getRandomIntInclusive(60, 500),
					currencyCode: currencyCode[Math.floor(Math.random() * 3)],
					isOnSale: Math.random() > 0.7,
				},
				reviews: [],
			}
			books.push(book)
		}
	}
	utilService.saveToStorage(STORAGE_KEY, books)
}

function _setNextPrevBookId(book) {
	return query(currentFilter).then((books) => {
		const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
		const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
		const prevBook = books[bookIdx - 1]
			? books[bookIdx - 1]
			: books[books.length - 1]
		book.nextBookId = nextBook.id
		book.prevBookId = prevBook.id
		return book
	})
}

function createRandomBook(book = {}) {
	const newBook = {
		id: utilService.makeId(),
		title: utilService.makeLorem(2),
		subtitle: utilService.makeLorem(4),
		authors: [utilService.makeLorem(1)],
		publishedDate: utilService.getRandomIntInclusive(1950, 2024),
		description: utilService.makeLorem(20),
		pageCount: utilService.getRandomIntInclusive(20, 800),
		categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
		thumbnail: `./assets/img/BooksImages/${i + 1}.jpg`,
		language: "en",
		listPrice: {
			amount: utilService.getRandomIntInclusive(60, 500),
			currencyCode: currencyCode[Math.floor(Math.random() * 3)],
			isOnSale: Math.random() > 0.7,
		},
		reviews: [],
	}
	newBook = { ...newBook, ...book }
	return newBook
}
function _createEmptyBook(book = {}) {
	const newBook = {
		id: utilService.makeId(),
		title: "",
		subtitle: "",
		authors: [],
		publishedDate: 0,
		description: "",
		pageCount: 0,
		categories: [],
		thumbnail: "",
		language: "",
		listPrice: {
			amount: 0,
			currencyCode: "",
			isOnSale: false,
		},
		reviews: [],
	}
	newBook = { ...newBook, ...book }
	return newBook
}

async function getGoogleBooks() {
	await googleService
		.query()
		.then((books) => {
			return books.items
		})
		.catch((err) => console.error("could not get books from google api " + err))
}

async function addGoogleBook(gBook) {
	const book = getGoogleBookFormat(gBook)
	// console.log(book)

	await save(book, false)
	return book
}
function normalizeCategories(categories) {
	if (!categories) return []
	if (Array.isArray(categories)) {
		return categories.flatMap((cat) =>
			cat.split(",").map((item) => item.trim())
		)
	}
	return categories.split(",").map((cat) => cat.trim())
}

function getGoogleBookFormat(gBook) {
	const currencyCode = getCurrencyCodes()
	const {
		id,
		volumeInfo: {
			title,
			subtitle = "",
			authors,
			publishedDate,
			description,
			pageCount,
			categories,
			imageLinks: { thumbnail, smallThumbnail },
			language,
		},
	} = gBook
	return {
		id: id,
		title: title,
		subtitle: subtitle,
		authors: authors,
		publishedDate: publishedDate,
		description: description,
		pageCount: pageCount,
		categories: normalizeCategories(categories) || [],
		thumbnail:
			thumbnail ||
			smallThumbnail ||
			"./assets/img/BooksImages/" + Math.ceil(Math.random() * 20) + ".jpg",
		language: language,
		listPrice: {
			amount: utilService.getRandomIntInclusive(30, 500),
			currencyCode: currencyCode[Math.floor(Math.random() * 3)],
			isOnSale: Math.random() > 0.7,
		},
	}
}

function getGoogleBooksFormat(gBooks = []) {
	const currencyCode = getCurrencyCodes()
	const books = gBooks.map((book) => {
		const {
			id,
			volumeInfo: {
				title,
				subtitle = "",
				authors,
				publishedDate,
				description,
				pageCount,
				categories,
				imageLinks: { thumbnail, smallThumbnail },
				language,
			},
		} = book

		return {
			id: id,
			title: title,
			subtitle: subtitle,
			authors: authors,
			publishedDate: publishedDate,
			description: description,
			pageCount: pageCount,
			categories: normalizeCategories(categories) || [],
			thumbnail:
				thumbnail ||
				smallThumbnail ||
				"./assets/img/BooksImages/" + Math.ceil(Math.random() * 20) + ".jpg",
			language: language,
			listPrice: {
				amount: utilService.getRandomIntInclusive(30, 500),
				currencyCode: currencyCode[Math.floor(Math.random() * 3)],
				isOnSale: Math.random() > 0.7,
			},
		}
	})

	return books
}
