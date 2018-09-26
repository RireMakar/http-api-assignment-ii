const users = {};

const getUsers = (request, response) => {
  if (request.method === 'GET') {
    const object = { users, id: 'Success' };
    response.write(JSON.stringify(object));
  }
  response.end();
};

const addUser = (request, response, data) => {
  const responseJSON = {
    message: 'Missing required fields',
  };

  if (!data.name || !data.age) {
    responseJSON.id = 'missingParams';
    response.statusCode = 400;
  } else {
    response.statusCode = 201;
    responseJSON.id = 'Created';
    responseJSON.message = 'Created Successfully';
    if (users[data.name]) {
      response.statusCode = 204;
    }
    users[data.name] = { name: data.name, age: data.age };
  }

  if (response.statusCode !== 204) {
    response.write(JSON.stringify(responseJSON));
  }
  response.end();
};

const notFound = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'application/json' });

  if (request.method === 'get') {
    const object = { message: 'Page not found', id: 'notFound' };
    response.write(JSON.stringify(object));
  }

  response.end();
};


module.exports = {
  getUsers,
  addUser,
  notFound,
};
