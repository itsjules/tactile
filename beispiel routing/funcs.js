$(document).ready(function(){

  $(".homeNav").click(function(){
    if(!$("body").hasClass("home")) {
      $("body").removeClass();
      $("body").addClass("home"); 
    }
  });
  
  $(".informationNav").click(function(){
    if(!$("body").hasClass("info")) {
      $("body").removeClass();
      $("body").addClass("info");
    } 
  });

  $(".characterNav").click(function(){
    if(!$("body").hasClass("character")) {
      $("body").removeClass();
      $("body").addClass("character");
    } 
});
    $(".aboutNav").click(function(){
        if(!$("body").hasClass("about")) {
          $("body").removeClass();
          $("body").addClass("about");
        } 
  });

  $(".thanksNav").click(function(){
    if(!$("body").hasClass("thanks")) {
      $("body").removeClass();
      $("body").addClass("thanks");
    } 
});


$(window).scroll(function () {
  if ($(document).scrollTop() > 50) {
    $("body").addClass("NavClosed");
  }  else {
    $("body").removeClass("NavClosed");
  }
});


  });
