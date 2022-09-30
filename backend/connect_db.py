import http.client

conn = http.client.HTTPConnection("localhost:8080")

headers = { 'xc-auth': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0bmFtZSI6bnVsbCwibGFzdG5hbWUiOm51bGwsImlkIjoidXNfN25iNjR1cWxyMHF0cnQiLCJyb2xlcyI6InVzZXIsc3VwZXIiLCJ0b2tlbl92ZXJzaW9uIjoiNGY3YzgwOGU1NTg2YzhhYWFkNTYwZjk3NDZlMDc4Y2U5OGE1ODYwNTU5YTE1MDE5MWEzYjczMzBhYzNjNTUzNTAyNDBlNjAzNWJmMjQxY2YiLCJpYXQiOjE2NjQ1MjQ4MTEsImV4cCI6MTY2NDU2MDgxMX0.zqirz_Oc2wEFAIEDXr6LKRPC-nQwzG4edgGd3tJW0J4" }

conn.request("GET", "/api/v1/db/data/noco/p_zj1dkk4jwhhib9/Motus/views/Motus?offset=0&limit=25&where=", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))