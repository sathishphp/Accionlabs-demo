// Code goes here
(function() {
    'use strict';
    angular
        .module('myApp')
        .controller('postController', postController);
    postController.$inject = ['postService'];

    function postController(postService) {
        var ctrl = this; 
        ctrl.msg = "List of Posts";
        ctrl.sortColumn = "id";  
        ctrl.sortingtype = "Ascending";
        ctrl.reverseSort = false;  
        ctrl.loadPostData = loadPostData;
        ctrl.sortData = sortData;

        init();
        function init(){
            loadPostData();
        } 
        function loadPostData(){
            return postService
                              .getPost()
                              .then(successHandler)
                              .catch(exceptionHandler);
        }

        function sortData(column){
            ctrl.sortColumn = column;
            ctrl.reverseSort = (ctrl.sortColumn == column) ? !ctrl.reverseSort : false;
            ctrl.sortingtype = (!ctrl.reverseSort)?"Ascending":"Descending";
        }
        
        /* Success Callback */
        function successHandler(response) {
            ctrl.postList = response;
        }
        
        /* Error Callback */
        function exceptionHandler(error) {
            console.log(error);   
        }
    }
})();
