from typing import Generator
from backend.database.session import SessionScope


def get_db() -> Generator:
    db = SessionScope()
    try:
        yield db
    finally:
        yield db.close()
