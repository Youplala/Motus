import { Api } from "nocodb-sdk";
const api = new Api({
  baseURL:
    "http://localhost:8080/api/v1/db/data/noco/p_zj1dkk4jwhhib9/Motus/views/Motus",
  headers: {
    "xc-auth":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0bmFtZSI6bnVsbCwibGFzdG5hbWUiOm51bGwsImlkIjoidXNfN25iNjR1cWxyMHF0cnQiLCJyb2xlcyI6InVzZXIsc3VwZXIiLCJ0b2tlbl92ZXJzaW9uIjoiNGY3YzgwOGU1NTg2YzhhYWFkNTYwZjk3NDZlMDc4Y2U5OGE1ODYwNTU5YTE1MDE5MWEzYjczMzBhYzNjNTUzNTAyNDBlNjAzNWJmMjQxY2YiLCJpYXQiOjE2NjQ1MjQ4MTEsImV4cCI6MTY2NDU2MDgxMX0.zqirz_Oc2wEFAIEDXr6LKRPC-nQwzG4edgGd3tJW0J4",
  },
});

api.dbViewRow
  .list("noco", "lobot", "Motus", "Motus", {
    offset: 0,
    limit: 25,
    where: "",
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.error(error);
  });
