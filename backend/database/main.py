import http.client
import json

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def auth(user: str = None):
    """
        This is the authentication function for the API.
        It takes a username and returns the full user credentials.
        This is not secure at all, but it's a start.

        Args:
            user (str): The username to authenticate.

        Returns:
            dict: The full user credentials. Format is: {"Id": 1, "User": "user", "Password": "pass"}
    """
    if user is None:
        return {"user": "Not specified"}
    print(f"User: {user}")
    try:
        conn = http.client.HTTPConnection("nocodb:8080")
        headers = { 'xc-auth': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0bmFtZSI6bnVsbCwibGFzdG5hbWUiOm51bGwsImlkIjoidXNfN25iNjR1cWxyMHF0cnQiLCJyb2xlcyI6InVzZXIsc3VwZXIiLCJ0b2tlbl92ZXJzaW9uIjoiNGY3YzgwOGU1NTg2YzhhYWFkNTYwZjk3NDZlMDc4Y2U5OGE1ODYwNTU5YTE1MDE5MWEzYjczMzBhYzNjNTUzNTAyNDBlNjAzNWJmMjQxY2YiLCJpYXQiOjE2NjQ1MjQ4MTEsImV4cCI6MTY2NDU2MDgxMX0.zqirz_Oc2wEFAIEDXr6LKRPC-nQwzG4edgGd3tJW0J4" }

        conn.request("GET", "/api/v1/db/data/noco/p_zj1dkk4jwhhib9/Motus/views/Motus?offset=0&limit=25&where=", headers=headers)
    except Exception as e:
        print(e)
        return {"user": "error"}

    res = conn.getresponse()
    data = res.read()
    users_list = json.loads(data.decode("utf-8")).get("list")
    user = [x for x in users_list if x['User'] == user]
    if user:
        return user[0]
    else:
        return {"user": "Not found in database"}
