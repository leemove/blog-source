// 希望能够像angular 中的controller一样
  function controller(callback){
    $scope = {}
    callback($scope)
    console.log($scope) // $scope.name 小明
    var oIpt = document.querySelector('[ng-model]')
    oIpt.value = $scope.name

    // 注册input的相关事件
    // 当我们在input中输入值就会触发input事件
    oIpt.oninput = function (e) {
      console.log(123)
      // 要让$scope.name 的值等于 input的值
      $scope.name = e.target.value
    }
  }




  // 调用

  controller(function ($scope) {
    // $scope.name ='小明'
    // 如果想让页面的内容变化，一定要有dom操作
    $scope.name = '小白白'
    $scope.name = '小明明'
  })
  
   // setTimeount

   $scope.name = '小红红'

  
   // $scope.$apply()
