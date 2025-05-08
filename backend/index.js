import express from 'express';
import cors from 'cors'; 

// create express app
const app = express();

// cors
app.use(cors())

// listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});