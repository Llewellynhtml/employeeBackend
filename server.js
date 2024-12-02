const express = require('express');
const cors = require('cors');
const dbRoutes = require('./routes/db');
const authRoutes = require('./routes/auth');

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/db', dbRoutes); 
app.use('/api/auth', authRoutes); 

app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  res.status(statusCode).json({ error: errorMessage });
});


app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
