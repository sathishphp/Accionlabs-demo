(function() {
    'use strict';
    angular.module('myApp',[]).service('postService', postService);
    postService.$inject = ['$http', '$q'];

    function postService($http, $q) {
        var postServiceInterface = {
            getPost: getPost,
        };
        return postServiceInterface;

        function getPost() {
            return restCall('http://jsonplaceholder.typicode.com/posts');
        }

        function restCall(restURL, restMethod, postData) {
            var method = restMethod || 'GET';

            var requestObj = {
                method: method,
                url: restURL,
                data: postData,
            };

            var defer = $q.defer();
            $http(requestObj)
                .then(successHandler)
                .catch(exceptionHandler);

            return defer.promise;

            function successHandler(response) {
                defer.resolve(response.data);
            }
            function exceptionHandler(error) {
                defer.reject(error);
            }
        }
    }
})();
