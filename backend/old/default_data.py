from models import Book


def init_memory_repository(data):
    data.insert(Book("Pride and Prejudice", "Jane Austen", "Romance", 1813, "A timeless tale of love and social expectation, revolving around the spirited Elizabeth Bennetand and the enigmatic Mr. Darcy.", 10.99))
    data.insert(Book("Moby-Dick", "Herman-Melville", "Adventure", 1851, "A gripping saga of Captain Ahab's obsessive pursuit of the elusive white whale, Moby Dick , exploring themes of vengeance and existentialism.", 9.99))
    data.insert(Book("Frankenstein", "Mary Shelley", "Gothic Fiction", 1818, "The haunting story of Victor Frankenstein's creation of a monstrous being and the profound consequences that follow, delving into themes of ambition and the human condition.", 8.59))
    data.insert(Book("Great Expectations", "Charles Dickens", "Bildungsroman", 1861, "Following the journey of the orphaned Pip as he navigates the complexities of society, love, and identity, against the backdrop of Victorian England.", 6.99))
    data.insert(Book("The Picture of Dorian Gray", "Oscar Wilde", "Philosophical Fiction", 1890, "Wilde's exploration of vanity, morality, and the pursuit of beauty through the story of Dorian Gray, who remains eternally youthful while his portrait ages, bearing the consequences of his hedonistic lifestyle.", 10.25))
    data.insert(Book("Dracula", "Bram Stoker", "Horror", 1897, "The iconic tale of Count Dracula's attempt to spread the undead curse in Victorian England, as a group of characters led by Professor Van Helsing strive to thwart his sinister plans.", 9.75))
    data.insert(Book("Crime and Punishment", "Fyodor Dostoevsky", "Psychological Fiction", 1866, "Dostoevsky's exploration of guilt, redemption, and the human psyche through the tormented min of Raskolnikov, a young student who commits  heinous crime and grapples with its consequences.", 11.99))
    