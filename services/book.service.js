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

function query({ filterBy = {} }) {
	return storageService.query(STORAGE_KEY)
	// .then((books) => {
	// 	if (filterBy.title) {
	// 		const regExp = new RegExp(filterBy.title, "i")
	// 		books = books.filter((book) => regExp.test(book.title))
	// 	}
	// -------------
	// if (filterBy.listPrice.amount) {
	// 	books = books.filter((book) => {
	// 		book.listPrice.amount >= filterBy.listPrice.amount
	// console.log(book, book.listPrice.amount, "TESTESTES")
	// 	})
	// }
	// --------------
	// 	return
	// 	books
	// })
}
// return storageService.query(CAR_KEY)
//     .then(cars => {
//         if (filterBy.txt) {
//             const regExp = new RegExp(filterBy.txt, 'i')
//             cars = cars.filter(car => regExp.test(car.vendor))
//         }
//         if (filterBy.minSpeed) {
//             cars = cars.filter(car => car.speed >= filterBy.minSpeed)
//         }
//         return cars
//     })

// function query() {
// 	return storageService.query(STORAGE_KEY)
// }

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

function getDefaultFilter() {
	// return { title: "", listPrice: { amount: 200 } }
	return { title: "" }
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
