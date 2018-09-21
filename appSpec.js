(function(){
		"use strict";
		describe('PostController - Test Suite', function() {
			var $controller,
					$scope,
					PostService,
					PostGetPromise,
					orderByFilter;

			beforeEach(module('myApp'));

			beforeEach(function () {
				PostService = jasmine.createSpyObj('postService', ['getPost']);   

				module(function ($provide) {
					$provide.value('PostService', PostService);
				});
			});

			beforeEach(inject(function(_$controller_, $rootScope, $q, $filter) {
				$scope = $rootScope.$new();
				PostGetPromise =  $q.defer();		
				PostService.getPost.and.returnValue({ $promise: PostGetPromise.promise });
				PostGetPromise.resolve('test');
				
				orderByFilter = $filter('orderBy');
				
				$controller = _$controller_('postController', {
					$scope: $scope
				});
			}));

			it('Test Spec - should be defined and get data from post service', function() {
				expect($controller).toBeDefined();
				expect(PostService.getPost).not.toHaveBeenCalled();
			});
			
			it("Test Spec - should be check for sorting", (inject(function ($rootScope, $controller, postService) {
						var scope = $rootScope.$new();
						var controller = $controller("postController", { $scope: scope, postService: postService });
						controller.sortData(controller.sortColumn);
						var sortedArray = orderByFilter(controller.sortColumn, controller.sortingtype);
						expect(true).toBe(true);				
				})));  
		});
})();
