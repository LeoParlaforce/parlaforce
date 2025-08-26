fetch("http://localhost:3004/api/checkout_sessions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ priceId: "price_1S01uTGzln310EBq3zDeJ5HH" })
})
  .then(r => r.text())
  .then(console.log)
  .catch(console.error);
