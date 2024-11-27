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
}

const STORAGE_KEY = "BooksDB"
_CreateBooks()

function query(filterBy = {}) {
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
			books = books.filter((book) => {
				return book.listPrice.isOnSale
			})
		}
		return books
	})

	return books
}

function getDefaultFilter() {
	return {
		title: "",
		publishedDate: 2025,
		listPrice: { amount: 200, isOnSale: false },
	}
}

function get(bookId) {
	return storageService.get(STORAGE_KEY, bookId).then(_setNextPrevBookId)
}

function remove(bookId) {
	return storageService.remove(STORAGE_KEY, bookId)
}

function save(book) {
	if (book.id) {
		return storageService.put(STORAGE_KEY, book)
	} else {
		if (book.categories.typeof !== "object") {
			book.categories = book.categories.slice(" ")
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

async function _CreateBooks() {
	let books = await storageService.query(STORAGE_KEY)

	if (!books || !books.length) {
		books = booksReady
	}
	utilService.saveToStorage(STORAGE_KEY, books)
}

function _setNextPrevBookId(book) {
	return query().then((books) => {
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
