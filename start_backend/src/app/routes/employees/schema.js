const response_states = require("../common_schema/response")
const header_states = require("../common_schema/header")


const emp_update_schema = {
  type: 'object',
  properties: {
    fullName: { type: 'string', description: 'Mark Mishra' },
    email: { type: 'string', description: 'markmishra@example.com' },
    location: { type: 'string', description: 'Lucknow'}
  }
};

const emp_req_body = {
  type: 'object',
  properties: {
    emp_id: { type: 'number', description: 'Employee ID' },
    dep_id: { type: 'number', description: 'Department ID' }
  }
}

const user_params = {
  type: 'object',
  properties: {
    id: { type: 'number', description: 'User ID' }
  },
  required: ['id']
}

const emp_filter_location_schema = {
  type: 'object',
  properties: {
    location: { type: 'string', description: 'Lucknow' },
    asc: { type: 'boolean', description: 'Lucknow' }
  }
}

const emp_filter_name_schema = {
  type: 'object',
  properties: {
    name: { type: 'string', description: 'Test name' },
    asc: { type: 'boolean', description: 'true' }
  }
}
  
  module.exports = {
    approve_emp: {
      description: 'Accept employee request',
      tags: ['Employees'],
      body: emp_req_body,
      summary: 'Employees approval',
      headers: header_states,
      response: response_states
    },

    get_one_user_details: {
      description: 'Retrieve Employee Information',
      tags: ['Employees'],
      summary: 'Retrieve Employees Information',
      params: user_params,
      headers: header_states,
      response: response_states
    },

    get_all_user_details: {
      description: 'Retrieve All Employee Information',
      tags: ['Employees'],
      summary: 'Retrieve Employees Information',
      headers: header_states,
      response: response_states
    },

    update_emp: {
      description: 'Update Employee data',
      tags: ['Employees'],
      summary: 'Update Employees Data, There is no compulsion of sending every set of data , you just need to send anyone or all of them at once.',
      params: user_params,
      body: emp_update_schema,
      headers: header_states,
      response: response_states
    },

    filter_emp_location: {
      description: 'Filter Employee data',
      tags: ['Employees'],
      summary: 'Filter Employees Data.',
      params: emp_filter_location_schema,
      headers: header_states,
      response: response_states
    },

    filter_emp_name: {
      description: 'Filter Employee data',
      tags: ['Employees'],
      summary: 'Filter Employees Data.',
      params: emp_filter_name_schema,
      headers: header_states,
      response: response_states
    },
  };


  