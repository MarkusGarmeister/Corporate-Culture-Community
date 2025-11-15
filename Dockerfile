FROM node:22.18 AS frontend-build
WORKDIR /app
COPY ./frontend/* .
RUN npm install
RUN npm run build


FROM python:3.12
WORKDIR /app 
COPY ./backend .
RUN poetry sync
COPY --from=frontend-build /app/dist ./static/dist
CMD ["poetry", "run", "uvicorn", "app.main:app", "--host"]