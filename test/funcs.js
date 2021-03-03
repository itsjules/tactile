let step = 'step1';

const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const step4 = document.getElementById('step4');
const step5 = document.getElementById('step5');
const step6 = document.getElementById('step6');
const step7 = document.getElementById('step7');
const step8 = document.getElementById('step8');

function next() {
  if (step === 'step1') {
    step = 'step2';
    step1.classList.remove("is-active");
    step1.classList.add("is-complete");
    step2.classList.add("is-active");

  } else if (step === 'step2') {
    step = 'step3';
    step2.classList.remove("is-active");
    step2.classList.add("is-complete");
    step3.classList.add("is-active");

  } else if (step === 'step3') {
    step = 'step4';
    step3.classList.remove("is-active");
    step3.classList.add("is-complete");
    step4.classList.add("is-active");

  } else if (step === 'step4') {
    step = 'step5';
    step4.classList.remove("is-active");
    step4.classList.add("is-complete");
    step5.classList.add("is-active");

  } else if (step === 'step5') {
    step = 'step6';
    step5.classList.remove("is-active");
    step5.classList.add("is-complete");
    step6.classList.add("is-active");

  } else if (step === 'step6') {
    step = 'step7';
    step6.classList.remove("is-active");
    step6.classList.add("is-complete");
    step7.classList.add("is-active");

  } else if (step === 'step7') {
    step = 'step8';
    step7.classList.remove("is-active");
    step7.classList.add("is-complete");
    step8.classList.add("is-active");

  } else if (step === 'step8') {
    step = 'complete';
    step8.classList.remove("is-active");
    step8.classList.add("is-complete");


  } else if (step === 'complete') {
    step = 'step1';
    step8.classList.remove("is-complete");
    step7.classList.remove("is-complete");
    step6.classList.remove("is-complete");
    step5.classList.remove("is-complete");
    step4.classList.remove("is-complete");
    step3.classList.remove("is-complete");
    step2.classList.remove("is-complete");
    step1.classList.remove("is-complete");
    step1.classList.add("is-active");
  }
}



function openNav() {
  document.getElementById("Sidebar").style.width = "650px";

  document.getElementById("homeNav").style.display = "block";
  document.getElementById("leitlinienNav").style.display = "block";
  document.getElementById("nutzergruppeNav").style.display = "block";
  document.getElementById("problemNav").style.display = "block";
  document.getElementById("lösungNav").style.display = "block";
  document.getElementById("skalierbarNav").style.display = "block";
  document.getElementById("technikNav").style.display = "block";
  document.getElementById("teamNav").style.display = "block";
}

function closeNav() {
  document.getElementById("Sidebar").style.width = "200";
  document.getElementById("homeNav").style.display = "none";
  document.getElementById("leitlinienNav").style.display = "none";
  document.getElementById("nutzergruppeNav").style.display = "none";
  document.getElementById("problemNav").style.display = "none";
  document.getElementById("lösungNav").style.display = "none";
  document.getElementById("skalierbarNav").style.display = "none";
  document.getElementById("technikNav").style.display = "none";
  document.getElementById("teamNav").style.display = "none";
}

$(document).ready(function(){

    $(".homeNav").click(function(){
      if(!$("body").hasClass("home")) {
        $("body").removeClass();
        $("body").addClass("home"); 
      }
    
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
  

$(".teamNav").click(function(){
  if(!$("body").hasClass("team")) {
    $("body").removeClass();
    $("body").addClass("team");
  } 
});

  
    });
  