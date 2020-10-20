from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from backend.core.config import config
from backend.core.urls import api_router


def get_application() -> FastAPI:
    """Create a new FastAPI instance

    Returns:
        FastAPI: a new instance  of FastAPI
    """
    application = FastAPI(
        title=config.APP_NAME,
        version=config.APP_VERSION,
        debug=config.DEBUG,
        docs_url=f'{config.API_PREFIX}/docs',
        openapi_url=f'{config.API_PREFIX}/openapi.json'
    )

    application.include_router(api_router, prefix=config.API_PREFIX)

    # Set all CORS enabled origins
    application.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return application


app = get_application()
