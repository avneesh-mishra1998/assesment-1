const response_states = require("../common_schema/response")
const header_states = require("../common_schema/header")

const user_creation_schema = {
    type: 'object',
    properties: {
      full_name: { type: 'string', description: 'User\'s name' },
      email: { type: 'string', description: 'User\'s email address' },
      password: { type: 'string', description: 'User\'s password' },
      location: { type: 'string', description: 'User\'s location' },
      role: { type: 'string', enum: ['Manager', 'Employee'], description: 'User\'s role' }

    },
    required: ['email', 'password', 'location', 'role'],
  };
  
  const user_login_schema = {
    type: 'object',
    properties: {
      email: { type: 'string', description: 'User email' },
      password: { type: 'string', description: 'User password' },
    },
    required: ['email', 'password']
  };
  
  module.exports = {
    create: {
      description: 'Create a User',
      tags: ['Auth'],
      summary: 'Create an App User',
      body: user_creation_schema,
      response: response_states
    },
    signin: {
      description: 'Retrieve User Information',
      tags: ['Auth'],
      summary: 'Retrieve User Information for Authentication',
      body: user_login_schema,
      response: response_states
    },
    
  };


  