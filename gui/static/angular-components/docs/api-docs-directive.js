'use strict';

goog.provide('grrUi.docs.apiDocsDirective.ApiCallRendererDescriptor');
goog.provide('grrUi.docs.apiDocsDirective.ApiDocsController');
goog.provide('grrUi.docs.apiDocsDirective.ApiDocsDirective');
goog.provide('grrUi.docs.apiDocsDirective.ApiObjectRendererDescriptor');

goog.scope(function() {


/** @typedef {{
 *             route:string,
 *             methods:Array.<string>,
 *             doc:string,
 *             query_spec:Object.<string, Object>
 *           }}
 */
grrUi.docs.apiDocsDirective.ApiCallRendererDescriptor;


/** @typedef {{
 *             doc:string,
 *             query_spec:Object.<string, Object>
 *           }}
 */
grrUi.docs.apiDocsDirective.ApiObjectRendererDescriptor;



/**
 * Controller for ApiDocsDirective.
 *
 * @constructor
 * @param {!angular.Scope} $scope
 * @param {!grrUi.core.apiService.ApiService} grrApiService
 * @ngInject
 */
grrUi.docs.apiDocsDirective.ApiDocsController = function($scope,
                                                         grrApiService) {
  /** @private {!angular.Scope} */
  this.scope_ = $scope;

  /** @private {!grrUi.core.apiService.ApiService} */
  this.grrApiService_ = grrApiService;

  /** @export {Array.<grrUi.docs.apiDocsDirective.ApiCallRendererDescriptor>} */
  this.apiCallRenderers;

  /** @export {Object.<string,
    *     grrUi.docs.apiDocsDirective.ApiObjectRendererDescriptor>}
    */
  this.apiObjectRenderers;

  this.grrApiService_.get('docs').then(this.onDocsFetched_.bind(this));
};

var ApiDocsController = grrUi.docs.apiDocsDirective.ApiDocsController;


/**
 * Handles response to the docs API request.
 *
 * @param {!Object} response
 * @private
 */
ApiDocsController.prototype.onDocsFetched_ = function(response) {
  this.apiCallRenderers = response.data['api_call_renderers'];
  this.apiObjectRenderers = response.data['api_object_renderers'];
};



/**
 * Directive for displaying API documentation.
 *
 * @constructor
 * @ngInject
 * @export
 */
grrUi.docs.apiDocsDirective.ApiDocsDirective = function() {
  return {
    scope: {
    },
    restrict: 'E',
    templateUrl: 'static/angular-components/docs/api-docs.html',
    controller: ApiDocsController,
    controllerAs: 'controller'
  };
};


/**
 * Directive's name in Angular.
 *
 * @const
 * @export
 */
grrUi.docs.apiDocsDirective.ApiDocsDirective.directive_name =
    'grrApiDocs';


});  // goog.scope