from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel


# shared properties
class CalendarBase(BaseModel):
    time: Optional[str] = None
    ended_at: date
    started_at: date
    title: Optional[str] = None


# properties to receive via API on creation
class CalendarIn(CalendarBase):
    description: Optional[str] = None
    label: Optional[str] = None


class CalendarBaseInDB(CalendarIn):
    id: Optional[int] = None

    class Config:
        orm_mode = True


# Properties to receive via API on update
class CalendarUpdate(CalendarIn):
    pass


# Additional properties to return via API
class Calendar(CalendarBaseInDB):
    pass


# Additional properties stored in DB
class CalandarInDB(CalendarBaseInDB):
    created_at: datetime
    updated_at: datetime
