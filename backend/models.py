import random
from flask_restful import reqparse
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, relationship, mapped_column
from typing import List
from faker import Faker

db = SQLAlchemy()

fakeBookGenerator = Faker()


class Book(db.Model):
    __tablename__ = 'db_book'
    id: Mapped[int] = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    author = db.Column(db.String(50), nullable=False)
    genre = db.Column(db.String(50), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    quotes: Mapped[List["Quote"]] = relationship()

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "genre": self.genre,
            "year": self.year,
            "description": self.description,
            "price": self.price
        }

    def deep_copy(self, other):
        self.id = other.id
        self.title = other.title
        self.author = other.author
        self.genre = other.genre
        self.year = other.year
        self.description = other.description
        self.price = other.price

    def generate_fake(self):
        return Book(
            title=fakeBookGenerator.name(),
            author=None,
            genre=fakeBookGenerator.text(),
            year=fakeBookGenerator.random_int(1500, 2100),
            description=fakeBookGenerator.text(),
            price=random.randint(1, 100) - 0.01
        )


class Quote(db.Model):
    __tablename__ = 'db_quote'
    id: Mapped[int] = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(1000), nullable=False)
    book_id: Mapped[int] = mapped_column(ForeignKey("db_book.id"), nullable=True)
    book: Mapped["Book"] = relationship(back_populates="quotes")

    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "book": self.book.serialize() if self.book is not None else None
        }

    def deep_copy(self, other):
        other.id = self.id
        other.text = self.text
        self.book_id = other.book_id
        self.book = other.book

    def generate_fake(self):
        return Book(
            title=fakeBookGenerator.name(),
            genre=fakeBookGenerator.text(),
            year=fakeBookGenerator.random_int(1500, 2100),
            description=fakeBookGenerator.text(),
            price=random.randint(1, 100) - 0.01
        )

bookParser = reqparse.RequestParser()
bookParser.add_argument("title", type=str)
bookParser.add_argument("author", type=str)
bookParser.add_argument("genre", type=str)
bookParser.add_argument("year", type=int)
bookParser.add_argument("description", type=str)
bookParser.add_argument("price", type=float)

quoteParser = reqparse.RequestParser()
quoteParser.add_argument("text", type=str)
quoteParser.add_argument("book", type=int, default=None, required=False)
