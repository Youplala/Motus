#
FROM python:3.10.6

#
WORKDIR /code

#
COPY ./requirements.txt /code/requirements.txt

#
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

#
COPY . /code/app

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0"]
