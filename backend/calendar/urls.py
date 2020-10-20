from fastapi import APIRouter, status
from typing import List

from calendar.model import Calendar
from calendar import schema
from calendar import helper


router = APIRouter()


@router.get('/', response_model=List[schema.Calendar])
def get_events(*, page: int, limit: int):
    events = Calendar.all_by_page(page=page, limit=limit)
    return events


@router.get('/{event_id}', response_model=schema.Calendar)
def get_event(*, event_id: int):
    return helper.get(event_id=event_id)


@router.post('/create', response_model=schema.Calendar)
def add_event(*, event_in: schema.CalendarIn):
    print(event_in)
    return helper.create(event_in)


@router.put('/{event_id}', response_model=schema.Calendar)
def update_event(*, event_id: int, event_in: schema.CalendarUpdate):
    event = helper.get(event_id=event_id)
    return event.update(event_in)


@router.delete('/{event_id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_event(*, event_id: int):
    event = helper.get(event_id=event_id)
    event.delete()
    return
