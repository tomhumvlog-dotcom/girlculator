//calculator-functions

let spamCount = []; //mang luu tru thoi gian bam nut

const display = document.getElementById('display');

const sound1 = document.getElementById('click-sound1');
const sound2 = document.getElementById('click-sound2');
const sound3 = document.getElementById('click-sound3');
const theme = document.getElementById('theme');

const video = document.getElementById('background-video');

// Hàm này sẽ tự động chạy ngay khi người dùng click bất kỳ chỗ nào trên web
window.addEventListener('click', function() {
    const theme = document.getElementById("theme");
    
    // Kiểm tra nếu nhạc chưa chạy thì mới cho chạy
    if (theme.paused) {
        theme.play();
        theme.volume = 0.2; // Chỉnh âm lượng nhỏ vừa phải
    }
}, { once: true }); // { once: true } để nó chỉ chạy đúng 1 lần đầu tiên khi click




sound1.volume = 1.0;
sound2.volume = 1.0;
sound3.volume = 1.0;
theme.volume = 0.05;

function appendToDisplay(value) {
   
    display.value = display.value + value;
    

    // check if the user has spammed the buttons more than 20 times
    const now = Date.now();
    spamCount.push(now);

    if(spamCount.length > 10) {
        spamCount.shift(); // remove the oldest timestamp
    }
    if(spamCount.length === 10 && (now - spamCount[0]) < 5000) {
        troll();
    }
    //end of spam check


    //add sound

    if(value === "1" || value === "." || value === "9" || value === "*" || value === "8") {
        sound1.currentTime = 0;
        sound1.play();
    }

    if(value === "2" || value === "+" || value === "5" || value === "-" || value === "/") {
        sound2.currentTime = 0;
        sound2.play();
    }

    if(value === "0" || value === "3" || value === "4" || value === "6" || value === 7) {
        sound3.currentTime = 0;
        sound3.play();
    }
}

function clearDisplay()
{
    
    display.value = "";

    const now = Date.now();
    spamCount.push(now);

    if(spamCount.length > 10) {
        spamCount.shift(); // remove the oldest timestamp
    }
    if(spamCount.length === 10 && (now - spamCount[0]) < 5000) {
        troll();
    }

    sound3.currentTime = 0;
    sound3.play();
}


function calculate()
{
    

  try {

    display.value = eval(display.value);
    const now = Date.now();
    spamCount.push(now);

    if(spamCount.length > 10) {
        spamCount.shift(); // remove the oldest timestamp
    }
    if(spamCount.length === 10 && (now - spamCount[0]) < 5000) {
        troll();
    }

    sound2.currentTime = 0;
    sound2.play();

  } catch (error) {
    
    
    display.value = "Đồ ngốk, nhập sai rùi nhó!";
    sound2.currentTime = 0;
    sound2.play();
  }
}


function troll()
{
    theme.pause();
    video.style.display = "block";
    video.play();

    video.onended = function() {
    video.style.display = "none";
    location.reload();
    }       
}
