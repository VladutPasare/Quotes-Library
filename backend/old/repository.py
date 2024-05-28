from default_data import init_memory_repository
from memory_repository import MemoryRepository
from models import Book

data = MemoryRepository(Book)
init_memory_repository(data)