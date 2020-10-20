import os

from pydantic import BaseConfig, AnyHttpUrl, validator
from typing import List, Union


class Config(BaseConfig):
    APP_NAME: str = os.getenv('APP_NAME', default='Calendar')
    APP_VERSION: str = os.getenv('APP_VERSION', default='1.0.0')
    API_PREFIX: str = os.getenv('API_PREFIX', default='/api/v1')

    DEBUG: bool = os.getenv('DEBUG', default='False')

    SERVER_HOST: str = os.getenv('HOST_NAME', default='0.0.0.0')
    SERVER_PORT: int = os.getenv('HOST_PORT', default=8000)

    SECRET_KEY: str = os.getenv('SECRET_KEY')
    CORS: List[AnyHttpUrl] = []

    @validator('CORS', pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    SQLALCHEMY_DATABASE_URI: str = os.getenv(
        'DATABASE_URI',
        default='sqlite:///calendar_dev.sqlite'
    )
    # sqlite need special parameters
    if SQLALCHEMY_DATABASE_URI.startswith('sqlite'):
        SQLALCHEMY_CONNECT_ARGS = {"check_same_thread": False}
    else:
        SQLALCHEMY_CONNECT_ARGS = {}  # pragma: no cover


config = Config()
