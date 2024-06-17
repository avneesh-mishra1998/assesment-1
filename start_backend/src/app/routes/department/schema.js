const response_states = require("../common_schema/response")
const header_states = require("../common_schema/header")


const dep_req_body = {
    type: 'object',
    properties: {
        depName: { type: 'string', description: 'Department Name' },
    }
}

const dep_req_params = {
    type: 'object',
    properties: {
        id: { type: 'string', description: 'Department Name' },
    }
}
  
  module.exports = {
    create_dep: {
      description: 'Create a department',
      tags: ['Department'],
      body: dep_req_body,
      summary: 'Create a new department',
      headers: header_states,
      response: response_states
    },
    retrive_dep: {
        description: 'Get all department',
        tags: ['Department'],
        summary: 'Get list of all department',
        headers: header_states,
        response: response_states
    },
    get_dep_by_id: {
        description: 'Get a department by id',
        tags: ['Department'],
        params: dep_req_params,
        summary: 'get a department',
        headers: header_states,
        response: response_states
    },
    update_dep: {
        description: 'Update a department',
        tags: ['Department'],
        params: dep_req_params,
        body: dep_req_body,
        summary: 'Update a new department',
        headers: header_states,
        response: response_states
      },
  };


  