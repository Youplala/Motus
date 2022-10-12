import http.client
import json
from connect import connect

from fastapi import FastAPI

app = FastAPI()
conn = connect()


@app.get("/")
def read_db():
    if conn is None:
        return {"status": "error"}
    cur = conn.cursor()
    cur.execute("SELECT * FROM users")
    rows = cur.fetchall()
    cur.close()
    return rows


@app.get("/checkToken")
def check_token(token: str):
    if conn is None:
        return {"status": "no conn"}
    cur = conn.cursor()
    try:
        cur.execute("SELECT * FROM users WHERE token = %s", (token,))
    except:
        return {"status": "failed execution"}
    rows = cur.fetchall()
    cur.close()
    if len(rows) == 0:
        return {"status": "empty rows"}
    return {"status": "valid"}


@app.get("/register")
def register(username: str, password: str, token: str):
    if conn is None:
        return {"status": "no conn"}
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO users (username, password, token) VALUES (%s, %s, %s)",
            (username, password, token),
        )
    except:
        return {"status": "failed execution"}
    conn.commit()
    cur.close()
    return {"status": "registering success"}


@app.get("/login")
def login(username: str, password: str):
    if conn is None:
        return {"status": "no conn"}
    cur = conn.cursor()
    try:
        cur.execute(
            "SELECT * FROM users WHERE username = %s AND password = %s",
            (username, password),
        )
    except:
        return {"status": "failed execution"}
    rows = cur.fetchall()
    cur.close()
    if len(rows) == 0:
        return {"status": "empty rows"}
    return {"status": "valid"}
