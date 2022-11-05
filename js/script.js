// 背景にかかわるscript //
var colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{
  
  if ( $===undefined ) return;
  
var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('#gradient').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}
setInterval(updateGradient,10);



// ジャンケンにかかわるscript //

$('#start_btn').on('click',function(){
  // alert("OK");
  $('#mybeam').addClass("is_show");
});

// mybeam後に敵のビームが出る
// var alertmsg = function(){
  // alert("3秒経過");
// }
// setTimeout(alertmsg, 3000);


var fight_num;
function addCount(){
  fight_num ++;
  counter.innerHTML = fight_num ;
}

//試合が始まるときに押すボタン//
window.addEventListener("load",()=>{
  counter = document.getElementById("counter");
  choose_btn = document.getElementById("start_btn");
  fight_num = 0;

  choose_btn.addEventListener("click",addCount);
});


//勝ち数をカウントしたい
var fight = 0;
var win = 1;
var lose = -1;

//ジャンケンの条件分岐
function Click(p_janken_r) {
  // alert("選択をしました！");
  var janken = ["ぐー", "ちょき", "ぱー"];
  var janken_r = Math.floor(Math.random() * 3 );
  var p_janken = ["ぐー", "ちょき", "ぱー"];
     
  if (janken_r === p_janken_r){
    //  console.log(draw);     
    $(".result").fadeIn(4000).text("Draw").css('color','yellow');
    $(".mychar").children('img').attr('src', '../img/draw_j.jpg').hide(0).fadeIn(2000);    
    $('#teki_te').hide(0).show(200); 

    }else if(p_janken_r === 0 && janken_r === 1 || p_janken_r === 1 && janken_r === 2 || p_janken_r === 2 && janken_r === 0){
      console.log(win);
      win ++;       
      $("#result").fadeIn(4000).text("Win").css('color','red'); 
      $(".mychar").children('img').attr('src', '../img/win_j.jpg').hide(0).fadeIn(2000);     
      $('#teki_te').hide(0).show(200); 

    }else {
      console.log(lose);
      $("#result").fadeIn(4000).text("Lose").css('color','blue');
      $(".mychar").children('img').attr('src', '../img/lose_j.jpg').hide(0).fadeIn(2000);
      $('#teki_te').hide(0).show(200);  
    }
    
    if( win >= 4){ 
      $(".result").text("Winner").addClass('sky hanabi hanabi_1');
    }

    document.getElementById("teki_te").src="img/jan" + janken_r + ".jpg";
    document.getElementById("my_te").src="img/jan" + p_janken_r + ".jpg";


}
//リロードする

  document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("reset").addEventListener("click", function(){
  window.location.reload();
  })
});



