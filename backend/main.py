import uvicorn

from backend.app import app
from backend.core.config import config

if __name__ == "__main__":
    uvicorn.run(
        app,
        host=config.SERVER_HOST,
        port=config.SERVER_PORT,
        debug=config.DEBUG,
    )
