import app from "./app";

const PORT: number = parseInt(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`Server initiated on ${PORT}`));
