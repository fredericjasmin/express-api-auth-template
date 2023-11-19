const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

const app = express();

dbConnection();

const corsOptions = {
	// With that function you can have more than one origin
	/*origin: function (origin, callback) {
		// Allowed Origins that can use the API
		const allowedOrigins = ['http://frontend1.com', 'https://frontend2.com'];
		// Check if the origin of the request is in the list of allowed origins
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},*/
	origin: 'https://example.com', // You can use * to get requests from all Origins
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true, // Enable cookies to be sent via CORS
};

app.use(cors(corsOptions));

app.use(express.static('public'));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`)
})
