import { booksReady } from "./books.js"
import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

export const bookService = {
	query,
	get,
	remove,
	save,
	getEmptyBook,
	getDefaultFilter,
	getCurrencyCodes,
	getCurrencyCodeSigh,
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

		if (filterBy.listPrice && filterBy.listPrice.amount > 0) {
			books = books.filter((book) => {
				return book.listPrice.amount < filterBy.listPrice.amount
			})
		}
		if (filterBy.publishedDate) {
			books = books.filter((book) => {
				return book.publishedDate < filterBy.publishedDate
			})
		}

		if (filterBy.listPrice && filterBy.listPrice.isOnSale) {
			books = books.filter(({ listPrice }) => listPrice.isOnSale)
		}
		return books
	})
}

function getDefaultFilter() {
	return {
		title: "",
		publishedDate: 2025,
		listPrice: { amount: 500, isOnSale: false },
	}
}

async function get(bookId) {
	const book = await storageService.get(STORAGE_KEY, bookId)
	return _setNextPrevBookId(book)
}

function remove(bookId) {
	return storageService.remove(STORAGE_KEY, bookId)
}

function save(book) {
	if (book.id) {
		return storageService.put(STORAGE_KEY, book)
	} else {
		if (book.categories.typeof !== "object") {
			book.categories = book.categories.slice(", ")
		}
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
				thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
				language: "en",
				listPrice: {
					amount: utilService.getRandomIntInclusive(60, 500),
					currencyCode: currencyCode[Math.floor(Math.random() * 3)],
					isOnSale: Math.random() > 0.7,
				},
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

function _createBook(book = {}) {
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
	}
	newBook = { ...newBook, ...book }
	return newBook
}
