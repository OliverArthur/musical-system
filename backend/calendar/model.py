from __future__ import annotations

from sqlalchemy import DateTime, String, Column, Integer, Text, Time, Date
from sqlalchemy.sql import func

from backend.database.base_class import BaseModel, ModelExistError
from calendar import schema


class Calendar(BaseModel):
    __repr_attrs__ = ['id', 'title', 'description', 'slug']

    id = Column(Integer, primary_key=True, index=True)
    time = Column(Time(timezone=True))
    label = Column(String)
    description = Column(Text(length=350))
    ended_at = Column(Date)
    started_at = Column(Date)
    title = Column(String(250), nullable=False, unique=True, index=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    @classmethod
    def _import(cls, event: schema.CalendarBaseInDB):
        data = event.dict(exclude_unset=True)
        return data

    @classmethod
    def create(cls, event: schema.CalendarIn) -> Calendar:
        if cls.get(title=event.title):
            raise ModelExistError
        data = cls._import(event)
        return super().create(**data)

    @classmethod
    def update(cls, event: schema.CalendarUpdate) -> Calendar:
        data = cls._import(event)
        return super().update(**data)
