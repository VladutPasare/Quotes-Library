class MemoryRepository:
    def __init__(self, data_class):
        self.data = []
        self.next_id = 1
        self.data_class = data_class

    def clear(self):
        self.data = []
        self.next_id = 1

    def insert(self, obj):
        obj.id = self.next_id
        self.data.append(obj)
        self.next_id += 1
        return obj

    def has(self, id):
        for object in self.data:
            if object.id == id:
                return True
        return False

    def get(self, id):
        for object in self.data:
            if object.id == id:
                return object
        return None

    def remove(self, id):
        for object in self.data:
            if object.id == id:
                self.data.remove(object)
                return

    def update(self, id, new_obj):
        new_obj.id = id
        for object in self.data:
            if object.id == new_obj.id:
                object.deep_copy(new_obj)

    def get_all(self):
        return self.data