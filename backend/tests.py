import unittest

from flask import Flask
from flask_restful import Api

from resources import *


class TestRepository(unittest.TestCase):
    def test_add(self):
        data.clear()
        data.insert(Book("title 1", "author1", "genre1", 2003, "description1", 101))
        data.insert(Book("title 2", "author2", "genre2", 2004, "description2", 102))
        unittest.TestCase.assertEqual(self, len(data.get_all()), 2)

    def test_remove(self):
        data.clear()
        data.insert(Book("title 1", "author1", "genre1", 2003, "description1", 101))
        data.insert(Book("title 2", "author2", "genre2", 2004, "description2", 102))
        data.remove(1)
        unittest.TestCase.assertEqual(self, len(data.get_all()), 1)
        unittest.TestCase.assertEqual(self, data.get(1), None)

    def test_update(self):
        data.clear()
        data.insert(Book("title 1", "author1", "genre1", 2003, "description1", 101))
        data.update(1, Book("title 2", "author2", "genre2", 2004, "description2", 102))
        book = data.get(1)
        unittest.TestCase.assertEqual(self, book.title, "title 2")


class TestService(unittest.TestCase):
    def configure(self):
        self.app = Flask(__name__)
        self.app.config['TESTING'] = True
        self.api = Api(self.app)
        self.api.add_resource(BookListResource, '/books/')
        self.api.add_resource(BookResource, '/book/<id>')

    def test_get_all_books(self):
        self.configure()
        data.clear()
        with self.app.test_client() as client:
            response = client.get('/books/')
            unittest.TestCase.assertEqual(self, response.status_code, 200)
            unittest.TestCase.assertEqual(self, response.json, [])

    def test_add_book(self):
        self.configure()
        data.clear()
        with self.app.test_client() as client:
            response = client.post('/books/', json={"title": "title", "author": "author", "genre": "genre", "year": 2003, "description": "description", "price": 100})
            unittest.TestCase.assertEqual(self, response.status_code, 200)
            unittest.TestCase.assertEqual(self, len(data.get_all()), 1)


if __name__ == '__main__':
    unittest.main()