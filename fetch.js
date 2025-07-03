fetch("http://localhost:3000/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    language: "py",
    code: `nums = list(map(int, input().split()))\nprint(sum(nums))`,
    problem: "A",
  }),
})
  .then((res) => res.json())
  .then(console.log)
  .catch(console.error);
