FROM node:22.18 AS frontend-build
WORKDIR /app
COPY ./frontend/package.json frontend/package-lock.json* ./
RUN npm install
COPY frontend .
RUN ls -a /app/pages
RUN npm run build


FROM python:3.12
RUN pip install --upgrade pip \
    && pip install poetry
WORKDIR /app 
COPY ./backend .
RUN poetry sync
COPY --from=frontend-build /app/dist ./static/dist
CMD ["poetry", "run", "uvicorn", "app.main:app", "--host"]