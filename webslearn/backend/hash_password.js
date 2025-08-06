const bcrypt = require('bcryptjs');
const password = '$2b$10$p0RURcjN9wcSLhBW/cSup.475pFMgpdZvdS1cOKXDdgP2pFbGD9EK';
bcrypt.hash(password, 10).then(hash => console.log(hash));
