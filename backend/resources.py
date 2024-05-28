from flask_restful import Resource
from models import *
from auxiliary import *


class QuoteResource(Resource):
    def delete(self, id):
        id = int(id)

        result = Quote.query.filter_by(id=id).first()
        if result is None:
            return abort(404, message="Quote with id " + str(id) + " doesn't exist.")

        db.session.delete(result)
        db.session.commit()

        return simple_message_response("Quote with id " + str(id) + " has been deleted.", 200)

    def get(self, id):
        id = int(id)

        result = Quote.query.filter_by(id=id).first()
        if result is None:
            return abort(404, message="Quote with id " + str(id) + " doesn't exit.")

        return result.serialize()

    def put(self, id):
        id = int(id)
        result = Quote.query.filter_by(id=id).first()
        if result is None:
            return abort(404, message="Quote with id " + str(id) + " doesn't exit.")

        args = quoteParser.parse_args()
        result.text = args["text"]
        result.book_id = int(args["book"]) if "book" in args and args["book"] != None else None
        db.session.commit()

        return simple_message_response("Quote with id " + str(id) + " has been updated.", 200)


class QuoteListResource(Resource):
    def post(self):
        args = quoteParser.parse_args()
        quote = Quote()
        quote.text = args["text"]
        quote.book_id = int(args["book"]) if "book" in args and args["book"] != None else None

        db.session.add(quote)
        db.session.commit()

        return quote.serialize()

    def get(self):
        try:
            quotes = Quote.query.all()
            return [quote.serialize() for quote in quotes]
        except Exception as e:
            return simple_message_error("An error occurred while fetching the quotes data.".format(e))


class BookResource(Resource):
    def delete(self, id):
        id = int(id)

        result = Book.query.filter_by(id=id).first()
        if result is None:
            return abort(404, message="Book with id " + str(id) + " doesn't exit.")

        db.session.delete(result)
        db.session.commit()
        return simple_message_response("Book with id " + str(id) + " has been deleted.", 200)

    def get(self, id):
        id = int(id)

        result = Book.query.filter_by(id=id).first()
        if result is None:
            return abort(404, message="Book with id " + str(id) + " doesn't exit.")

        return result.serialize()

    def put(self, id):
        id = int(id)
        result = Book.query.filter_by(id=id).first()
        if result is None:
            return abort(404, message="Book with id " + str(id) + " doesn't exit.")

        args = bookParser.parse_args()
        result.title = args["title"]
        result.author = args["author"]
        result.genre = args["genre"]
        result.year = args["year"]
        result.description = args["description"]
        result.price = args["price"]

        db.session.commit()

        return simple_message_response("Book with id " + str(id) + " has been updated.", 200)


class BookListResource(Resource):
    def post(self):
        args = bookParser.parse_args()
        book = Book()
        book.title = args["title"]
        book.author = args["author"]
        book.genre = args["genre"]
        book.year = args["year"]
        book.description = args["description"]
        book.price = args["price"]

        db.session.add(book)
        db.session.commit()

        return book.serialize()

    def get(self):
        try:
            books = db.session.execute(db.select(Book)).fetchall()
            return [book[0].serialize() for book in books]
        except Exception as e:
            return simple_message_error("An error occurred while fetching the books data".format(e))


# Ping endpoint
class PingResource(Resource):
    def get(self):
        return simple_message_response("Pong!", 200)
