from fastapi import HTTPException, status
from sqlalchemy_mixins import ModelNotFoundError
from backend.database.base_class import ModelExistError
from calendar.model import Calendar
from calendar import schema


def create(event_in: schema.CalendarIn):
    try:
        event = Calendar.create(event_in)
    except ModelExistError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='An event with this title already exist in the system'
        )
    return event


def get(event_id: int):
    try:
        event = Calendar.find_or_fail(event_id)
    except ModelNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Event can not be found in the database'
        )
    return event
