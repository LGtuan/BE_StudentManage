/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  // auth view

  // auth action
  'POST /api/login': 'AuthController.login',
  'POST /api/logout': 'AuthController.logout',

  // user action

  // student action
  'GET /api/student': 'StudentController.getList',
  'PATCH /api/student/:id': 'StudentController.update',
  'PUT /api/student/:id': 'StudentController.update',
  'DELETE /api/student/:id': 'StudentController.delete',
  'POST /api/student': 'StudentController.add',
  'GET /api/student/:id': 'StudentController.getById',

  //class action
  'GET /api/class': 'ClassController.getList',
  'PATCH /api/class/:id': 'ClassController.update',
  'PUT /api/class/:id': 'ClassController.update',
  'DELETE /api/class/:id': 'ClassController.delete',
  'POST /api/class': 'ClassController.add',
  'GET /api/class/:id': 'ClassController.getById',

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
