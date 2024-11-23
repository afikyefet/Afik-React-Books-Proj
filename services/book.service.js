import { booksReady } from "./books.js"
import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

export const bookService = {
	query,
	get,
	remove,
	save,
	getEmptyBook,
}

const STORAGE_KEY = "BooksDB"
_CreateBooks()

function query(filterBy = {}) {
	return storageService.query(STORAGE_KEY)
}

function get(bookId) {
	return storageService.get(STORAGE_KEY, bookId)
}

function remove(bookId) {
	return storageService.remove(STORAGE_KEY, bookId)
}

function save(book) {
	if (car.id) {
		return storageService.put(STORAGE_KEY, book)
	} else {
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

function _CreateBooks() {
	let books = storageService.query(STORAGE_KEY)

	books = !books || !books.length ? booksReady : books
	storageService.saveAll(STORAGE_KEY, books)
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
