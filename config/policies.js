/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  StudentController: {
    'getList': 'verifyToken',
    'add': 'verifyToken',
    'delete': 'verifyToken',
    'update': 'verifyToken',
    'getById': 'verifyToken'
  },
  ClassController: {
    'getList': 'verifyToken',
    'add': 'verifyToken',
    'delete': 'verifyToken',
    'update': 'verifyToken',
    'getById': 'verifyToken'
  },
  AuthController: {
    'logout': 'verifyToken'
  }

};
