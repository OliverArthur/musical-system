from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session

from backend.core.config import config


engine = create_engine(
    config.SQLALCHEMY_DATABASE_URI,
    pool_pre_ping=True,
    connect_args=config.SQLALCHEMY_CONNECT_ARGS
)


SessionScope = scoped_session(
    sessionmaker(bind=engine, autocommit=False, autoflush=False)
)
