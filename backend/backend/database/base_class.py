from typing import Any, Dict
from sqlalchemy.ext.declarative import as_declarative, declared_attr
from sqlalchemy_mixins import AllFeaturesMixin

from backend.database.session import SessionScope


class ModelExistError(ValueError):
    pass


@as_declarative()
class Base(object):
    id: Any
    __name__: str

    @declared_attr
    def __tablename__(self) -> str:
        return self.__name__.lower()


class BaseModel(Base, AllFeaturesMixin):
    __abstract__ = True

    @classmethod
    def all_by_page(cls, page: int = 1, limit: int = 20, **kwargs) -> Dict:
        """Get all the record from DB

        Args:
            page (int, optional): query start Defaults to 1.
            limit (int, optional): limit of page the query should return. Defaults to 20

        Example:
            User.all_by_page(page=2, limit=10)

        Returns:
            Dict: dictionary
        """
        start = (page - 1) * limit
        end = start + limit
        return cls.query.slice(start, end).all()

    @classmethod
    def get(cls, **kwargs) -> Dict:
        """Method to get a record from the DB by the giving arg
        Example:
            User.get(id=1)
        Returns:
            Dict: will return a dictionary
        """
        return cls.where(**kwargs).first()


BaseModel.set_session(SessionScope())
