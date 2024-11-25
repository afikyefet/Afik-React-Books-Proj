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
}

const STORAGE_KEY = "BooksDB"
_CreateBooks()

function query(filterBy = {}) {
	return storageService.query(STORAGE_KEY).then((books) => {
		if (filterBy.title !== "") {
			const regExp = new RegExp(filterBy.title, "i")
			books = books.filter((book) => regExp.test(book.title))
		}

		if (filterBy.listPrice.amount > 0) {
			books = books.filter((book) => {
				return book.listPrice.amount < filterBy.listPrice.amount
			})
		}
		return books
	})

	return books
	// ---------
	// --------------
}

function getDefaultFilter() {
	return { title: "", listPrice: { amount: 200 } }
}

function get(bookId) {
	return storageService.get(STORAGE_KEY, bookId)
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
			currencyCode: "",
			isOnSale: false,
		},
	}
}

async function _CreateBooks() {
	let books = await storageService.query(STORAGE_KEY)

	if (!books || !books.length) {
		books = booksReady
	}
	utilService.saveToStorage(STORAGE_KEY, books)
}

function _createCar(book = {}) {
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
