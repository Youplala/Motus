from nocodb.nocodb import NocoDBProject, APIToken, JWTAuthToken
from nocodb.filters import InFilter, EqFilter
from nocodb.infra.requests_client import NocoDBRequestsClient


# Usage with API Token
client = NocoDBRequestsClient(
        # Your API Token retrieved from NocoDB conf
        JWTAuthToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0bmFtZSI6bnVsbCwibGFzdG5hbWUiOm51bGwsImlkIjoidXNfN25iNjR1cWxyMHF0cnQiLCJyb2xlcyI6InVzZXIsc3VwZXIiLCJ0b2tlbl92ZXJzaW9uIjoiNGY3YzgwOGU1NTg2YzhhYWFkNTYwZjk3NDZlMDc4Y2U5OGE1ODYwNTU5YTE1MDE5MWEzYjczMzBhYzNjNTUzNTAyNDBlNjAzNWJmMjQxY2YiLCJpYXQiOjE2NjQ1MjQ4MTEsImV4cCI6MTY2NDU2MDgxMX0.zqirz_Oc2wEFAIEDXr6LKRPC-nQwzG4edgGd3tJW0J4"),
        # Your nocodb root path
        "http://localhost:8080"
)
project = NocoDBProject(
        "noco", # org name. noco by default
        "Lobot" # project name. Case sensitive!!
)

table_name = "Motus"

# Retrieve a page of rows from a table
table_rows = client.table_row_list(project, table_name)
print(table_rows)
