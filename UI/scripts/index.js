var app = angular.module('BlankApp', ['ngMaterial', 'ngMessages', 'bw.paging']);

app.controller("admin", function ($scope, $http) {


    $scope.getUsers = function () {
        $scope.users = [];
        $scope.allUsers = [];
        $http.get("/getUser")
            .then(function (response) {
                console.log(response);
                response.data.forEach(element => {
                    let data = element;
                    data.PhoneNumber = Number(data.PhoneNumber);
                    $scope.allUsers.push(data);
                });
                $scope.totalLength = $scope.allUsers.length;
                $scope.pageSize = 10;
                $scope.currentPage = 1;
                // console.log($scope.allUsers)
                $scope.users = $scope.allUsers.slice($scope.currentPage, $scope.pageSize);
            })
        // console.log( $scope.users);
    }

    $scope.showUser = [false];
    $scope.userToUpdate = [];
    $scope.editUser = function (user, index) {
        $scope.showUser[index] = !$scope.showUser[index];
        $scope.userToUpdate[index] = user;
    }

    $scope.updateUser = function (index) {
        $http.post("/updateUser", $scope.userToUpdate[index])
            .then(function (response) {
                if (response.data.status) {
                    alert("User Has Been Updated");
                }
                $scope.showUser[index] = !$scope.showUser[index];
                $scope.userToUpdate[index] = user;
                $scope.getUsers();
            });
    }

    $scope.deleteUser = function (index) {
        $http.post("/deleteUser", $scope.users[index])
            .then(function (response) {
                if (response.data.status) {
                    alert("User Has Been Deleted");
                }
                $scope.getUsers();
            });
    }

    $scope.addUser = function (index) {
        $http.post("/addUser", $scope.user)
            .then(function (response) {
                if (response.data.status) {
                    alert("User Has Been Added");
                }
                $scope.getUsers();
            });
    }

    $scope.userPagingAction = function (action, page, pageSize, totalLength) {
        console.log(page)
        let totalPages = Math.ceil(totalLength/pageSize);
        console.log("Total: ",totalPages);
        let startIndex = (page % totalPages) * pageSize;
        let endIndex = (startIndex + pageSize);
        console.log(startIndex, "-->", endIndex)
        $scope.users = $scope.allUsers.slice(startIndex, endIndex);
        console.log( $scope.allUsers)
    }
});
