// In TypeScript (frontend or Node backend), you can call it like:

const res = await fetch("http://127.0.0.1:8000/recommend", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ responses: newStudentResponses }),
});

const data = await res.json();
console.log(data.recommendations);
