from fastapi import HTTPException, Request
from starlette.middleware.base import BaseHTTPMiddleware
from TokenManager import token_manager

from src.config import config


class TokenMiddleware(
    BaseHTTPMiddleware,
):
    async def dispatch(self, request: Request, call_next):
        if any(
            request.url.path.startswith(path)
            for path in config.auth_config.excluded_paths
        ):
            response = await call_next(request)
            return response

        auth_header = token_manager.get_token()
        if not auth_header:
            raise HTTPException(status_code=401, detail="Authorization header missing")

        # Пропустить запрос дальше, если токен валиден
        response = await call_next(request)
        return response
