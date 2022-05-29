<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
  <title>Title</title>
  <script type="text/javascript" src="/resources/js/jquery-1.12.4.min.js"></script>
  <script type="text/javascript">
    function ajaxTest() {
      var json = {"id" : "아이디", "pw" : "1234"};

      $.ajax({
        url: "/main.json",
        type:"get",
        //  data: JSON.stringify(json),
        //contentType:"application/x-www-form-urlencoded",
        success: function(data) {
          console.log(data);
          //            alert("통신성공");
        },
        error: function() {
          console.log("error");
        }
      })
    }
  </script>
</head>
<body>
<div class="login">
  <div class="wrap_txt">
    <h1>Jquery Test JDK 11</h1>
    <button onclick="ajaxTest()">ajax</button>
  </div>
</div>
</body>
</html>
