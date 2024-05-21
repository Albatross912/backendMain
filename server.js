const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/properties', require('./routes/properties'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
