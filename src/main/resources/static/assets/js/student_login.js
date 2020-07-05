$(document).ready(function(){
            var ip;
            $.ajax({
                      type: "POST",
                      url: 'http://localhost:8090/findIpAddress',
                      success: function (data) {
                        ip=data;
                        alert(ip);
                      }
            });
            $("#user").blur(function(){
                var user = $('#user').val();
                if(user=='')
                {
                      $('#error_user').slideDown();
                      $('#error_user').html('Please provide username');
                      status = 1;
                      return false;
                }
                else
                {
                      $('#error_user').slideUp();
                      status = 0;


                }
            });
           $("#pass").blur(function(){
                var pass = $('#pass').val();
                if(pass=='')
                {
                       $('#error_pass').slideDown();
                       $('#error_pass').html('Please provide password');
                       status = 1;
                       return false;
                }
                else
                {
                       $('#error_pass').slideUp();
                       status = 0;

                }
           });
            $('#submit').click(function(){
                var user=$('#user').val();
                var pwd=$('#pass').val();
               var sub;
               if(user==''){
                                     $('#error_user').slideDown();
                                     $('#error_user').html('Please provide username');
               }
               else if(pwd==''){
                                      $('#error_pass').slideDown();
                                      $('#error_pass').html('Please provide password');
               }
               else{
                    $.ajax({
                        type : "POST",
                        url : 'http://192.168.42.215:8080/student/getTeacherName',
                        headers : {
                                        "Content-Type" : "application/json"
                        },
                        success : function(data) {
                                        if(data != "null"){
                                           var dataTeacher=data.split(",");
                                           $.cookie("teacherName", dataTeacher[0]);
                                           $.cookie("teacherId", dataTeacher[1]);
                                           $.cookie("teacherSub", dataTeacher[2]);
                                           sub=$.cookie("teacherSub");
                                           $.ajax({
                                                                                  type : "POST",
                                                                                  url : 'http://192.168.42.215:8080/student/getCount/'+user+'/'+sub,
                                                                                  headers : {
                                                                                                     "Content-Type" : "application/json"
                                                                                  },
                                                                                  success : function(data) {
                                                                                             if(data==1){
                                                                                                     var logCred = {
                                                                                                                 'id': user,
                                                                                                                 'password': pwd
                                                                                                     };
                                                                                                     var aJson = JSON.stringify(logCred);
                                                                                                     //
                                                                                                     $.ajax({
                                                                                                                                                                                                                     type : "POST",
                                                                                                                                                                                                                     url : 'http://192.168.42.215:8080/student/login/'+ip,
                                                                                                                                                                                                                     headers : {
                                                                                                                                                                                                                                   "Content-Type" : "application/json"
                                                                                                                                                                                                                     },
                                                                                                                                                                                                                     data:aJson,
                                                                                                                                                                                                                     success : function(data) {
                                                                                                                                                                                                                                           if(data=="multipleIp"){
                                                                                                                                                                                                                                             alert("already logged In");
                                                                                                                                                                                                                                                                     $("#user").prop('disabled',true);
                                                                                                                                                                                                                                                                     $("#pass").prop('disabled',true);
                                                                                                                                                                                                                                                                     $("#submit").prop('disabled',true);

                                                                                                                                                                                                                                           }
                                                                                                                                                                                                                                           else if(data != "invalid"){
                                                                                                                                                                                                                                                   $('#error_cred').slideUp();
                                                                                                                                                                                                                                                    var arr=data.split(",");
                                                                                                                                                                                                                                                    $.cookie("studName",arr[0]);
                                                                                                                                                                                                                                                    $.cookie("studSem",arr[1]);
                                                                                                                                                                                                                                                    $.cookie("studId", user);
                                                                                                                                                                                                                                                    $.ajax({
                                                                                                                                                                                                                                                             url: 'http://localhost:8090/sitesBlock',
                                                                                                                                                                                                                                                             success: function (data) {
                                                                                                                                                                                                                                                             }
                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                    $.ajax({
                                                                                                                                                                                                                                                             url: 'http://localhost:8090/subscriberCheck/'+user,
                                                                                                                                                                                                                                                             success: function (data) {
                                                                                                                                                                                                                                                             }
                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                    window.location.replace("http://192.168.42.215:8080/student_home");

                                                                                                                                                                                                                                           }
                                                                                                                                                                                                                                           else{
                                                                                                                                                                                                                                                $('#error_cred').slideDown();
                                                                                                                                                                                                                                                                                                           $('#error_cred').html('Incorrect username or password');
                                                                                                                                                                                                                                           }
                                                                                                                                                                                                                     }

                                                                                                                                                                                                          });
                                                                                             }
                                                                                             else{
                                                                                                      alert("You are not allowed to attend this session!")
                                                                                             }
                                                                                  }
                                                                   });
                                        }
                                        else{
                                            alert("Teacher is not logged in !")
                                        }
                        }

                    });
               }
            });//close of click
});//close of document ready

