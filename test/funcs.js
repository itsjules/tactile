

$(document).ready(function(){

    $(".homeNav").click(function(){
      if(!$("body").hasClass("home")) {
        $("body").removeClass();
        $("body").addClass("home"); 
      }
      console.log("blub");
    });
    
    $(".leitlinienNav").click(function(){
      if(!$("body").hasClass("leitlinie")) {
        $("body").removeClass();
        $("body").addClass("leitlinie");
      } 
    });
  
    $(".nutzergruppeNav").click(function(){
      if(!$("body").hasClass("nutzergruppe")) {
        $("body").removeClass();
        $("body").addClass("nutzergruppe");
      } 
  });
      $(".problemNav").click(function(){
          if(!$("body").hasClass("problem")) {
            $("body").removeClass();
            $("body").addClass("problem");
          } 
    });
  
    $(".lösungNav").click(function(){
      if(!$("body").hasClass("lösung")) {
        $("body").removeClass();
        $("body").addClass("lösung");
      } 
  });
  

  $(".technikNav").click(function(){
    if(!$("body").hasClass("technik")) {
      $("body").removeClass();
      $("body").addClass("technik");
    } 
});

$(".skalierbarNav").click(function(){
    if(!$("body").hasClass("skalierbarkeit")) {
      $("body").removeClass();
      $("body").addClass("skalierbarkeit");
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
  