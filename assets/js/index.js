// bài hát
const song = document.querySelector("#song");
// nút play
const playBtn = document.querySelector(".play-inner");
// ảnh đĩa nhạc
const musicImgSP = document.querySelector(".music-img");
const musicImg = document.querySelector(".music-img img");
// tên bài hát
const musicName = document.querySelector(".music-name");
// thanh tua
const rangeBar = document.querySelector("#range");
// thời gian chạy
const thoiGian = document.querySelector(".time");
const thoiGianChay = document.querySelector(".timerun");
// vùng chứa danh sách bài hát
const playList = document.querySelector(".cacBaiHat");
// nút chuyển bài,quay lại bài
const backBtn = document.querySelector(".play-back");
const nextBtn = document.querySelector(".play-next");
// nút sun,moon
const dark = document.querySelector(".mode-on-off");
// lặp bài hát
const repeatIcon = document.querySelector(".repeat-icon");
// random bài hát
const randomIcon = document.querySelector(".random-icon");

// Danh sách bài hát
const musicList = [
    {
        id: 1,
        name: 'Yêu từ đâu mà ra',
        linkMusic: './assets/music/yêu từ đâu mà ra.mp3',
        img: './assets/img/yeutudaumara.jfif'
    },
    {
        id: 2,
        name: 'Ngày em đến',
        linkMusic: './assets/music/ngày em đến.mp3',
        img: './assets/img/ngayemden.jfif'
    },
    {
        id: 3,
        name: 'Tôi ơi buồn làm gì',
        linkMusic: './assets/music/tôi ơi buồn làm gì.mp3',
        img: './assets/img/toioibuonlamgi.jpg'
    },
    {
        id: 4,
        name: "Anh thề đấy",
        linkMusic: "./assets/music/anh thề đấy.mp3",
        img: "./assets/img/anhtheday.jfif"
    },
    {
        id: 5,
        name: "Em là nhất",
        linkMusic: "./assets/music/em là nhất.mp3",
        img: "./assets/img/emlanhat.jfif"
    },
    {
        id: 6,
        name: "Mặt mộc",
        linkMusic: "./assets/music/mặt mộc.mp3",
        img: "./assets/img/matmoc.jpg"
    },
    {
        id: 7,
        name: "Người em cố đô",
        linkMusic: "./assets/music/người em cố đô.mp3",
        img: "./assets/img/người em cố đô.jfif"
    },
    {
        id: 8,
        name: "Em là nhất miền tây",
        linkMusic: "./assets/music/em là nhất miền tây.mp3",
        img: "./assets/img/em là nhất miền tay.jfif"
    },
    {
        id: 9,
        name: "Kiệu hoa",
        linkMusic: "./assets/music/kiệu hoa.mp3",
        img: "./assets/img/kiệu hoa.jpeg"
    },
    {
        id: 10,
        name: "Nơi này có anh",
        linkMusic: "./assets/music/nơi này có anh.mp3",
        img: "./assets/img/noinaycoanh.jpg"
    },
    {
        id: 11,
        name: "Nhất thân",
        linkMusic: "./assets/music/nhất thân.mp3",
        img: "./assets/img/nhatthan.jfif"
    },
    {
        id: 12,
        name: "Chạnh lòng thương cô",
        linkMusic: "./assets/music/chạnh lòng thương cô.mp3",
        img: "./assets/img/chanhlongthuongco.jpg"
    },
    {
        id: 13,
        name: "Khóc cho người ai khóc cho anh",
        linkMusic: "./assets/music/khóc cho người ai khóc cho anh.mp3",
        img: "./assets/img/aikhocchoanh.jpg"
    },
    {
        id: 14,
        name: "Duy nhất ở trong anh",
        linkMusic: "./assets/music/duy nhất ở trong anh.mp3",
        img: "./assets/img/duynhattronganh.jpg"
    },
    {
        id: 15,
        name: "Bỏ em vào balo",
        linkMusic: "./assets/music/bỏ em vào balo.mp3",
        img: "./assets/img/boemvaobalo.jfif"
    },
    {
        id: 16,
        name: "Em đồng ý nha",
        linkMusic: "./assets/music/em đồng ý nha.mp3",
        img: "./assets/img/emdongynha.jfif"
    },
    {
        id: 17,
        name: "Lời anh chưa thể nói",
        linkMusic: "./assets/music/lời anh chưa thể nói.mp3",
        img: "./assets/img/loianhchuathenoi.jfif"
    },
    {
        id: 18,
        name: "Cầu vồng tình yêu",
        linkMusic: "./assets/music/cầu vồng tình yêu.mp3",
        img: "./assets/img/cauvongtinhyeu.jfif"
    },
    {
        id: 19,
        name: "Kẹo bông gòn",
        linkMusic: "./assets/music/kẹo bông gòn.mp3",
        img: "./assets/img/keobonggon.jfif"
    },
    {
        id: 20,
        name: "Điều anh muốn",
        linkMusic: "./assets/music/điều anh muốn.mp3",
        img: "./assets/img/dieuanhmuon.jpg"
    },
    {
        id: 21,
        name: "Kỳ vọng sai lầm",
        linkMusic: "./assets/music/kỳ vọng sai lầm.mp3",
        img: "./assets/img/kyvongsailam.jpg"
    },
    {
        id: 22,
        name: "Làm người yêu em nhé baby",
        linkMusic: "./assets/music/làm người yêu em nhé.mp3",
        img: "./assets/img/yeuminhemduockhong.jpg"
    }

];

displayTimer();

let timer;
let isPlaying = true;
let indexSong = 0;
let isRandom = false;
let isRepeat = false;

// -------------------------------

// Chức năng play, pause
playBtn.addEventListener("click", playPause);
function playPause() {
    if(isPlaying) {
        song.play();
        playBtn.innerHTML = "<i class='fa-solid fa-pause'></i>";
        timer = setInterval(displayTimer, 500);
        musicImgSP.classList.add("music-img-an");
        isPlaying = false;
        getSpinner();
    }else {
        song.pause();
        playBtn.innerHTML = "<i class='fa-solid fa-play'></i>";
        clearInterval(timer);
        musicImgSP.classList.remove("music-img-an");
        isPlaying = true;
        stopSpinner();
    }
}

// Định dạng thời gian
function formatTime(number) {
    const minutes = Math.floor(number / 60);
    const second = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? '0' + minutes : minutes}:${second < 10 ? '0' + second : second}`;
}

// Chức năng chạy thời gian
function displayTimer() {
    const { duration, currentTime } = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    thoiGianChay.textContent = formatTime(currentTime);
    if (!duration){
        thoiGian.textContent = "00:00";
    }else {
        thoiGian.textContent = formatTime(duration);
    }
}

// Chức năng kéo thời gian
rangeBar.addEventListener("change", thayDoi);
function thayDoi() {
    song.currentTime = rangeBar.value;
}

// render list
function renderList() {
    const htmls = musicList.map((nhac, index) => {
        return `
                <div class="cacBH ${index === indexSong ? "active-list" : ''}" data-index="${nhac.id}">
                    <img class="" src="${nhac.img}" alt="">
                    <div class="moTa">
                        <p class="tennhac-list">${nhac.name}</p>
                    </div>
                </div>
                `
    });
    document.querySelector(".cacBaiHat").innerHTML = htmls.join(" ");
}

renderList();

// hàm next back bài
function changeSong(x) {
    if (isRandom) {
        ranDom();
        isRandom = true;
        isPlaying = true;
        scrollActiveList();
    }
    else if(isRepeat) {
        song.play();
        isRepeat = true;
        isPlaying = true;
    }
    if(x === 1) {
        // next song
        indexSong++;
        if(indexSong >= musicList.length){
            indexSong = 0
        }
    }else if(x === -1) {
        // back song
        indexSong--;
        if (indexSong<0) {
            indexSong = musicList.length-1;
        }
    }
}

// chức năng đổi bài khi hết bài hát 

song.addEventListener("ended", thayDoiBaiKetThuc);
function thayDoiBaiKetThuc() {
    if (isRandom) {
        ranDom();
        isRandom = true;
        isPlaying = true;
        scrollActiveList();
    }
    else if(isRepeat) {
        song.play();
        isRepeat = true;
        isPlaying = true;
    }
    else {
        changeSong(1);
        isPlaying = true;
    }
    init(indexSong);
    playPause(); 
    scrollActiveList();   
}

// chức năng đổi bài khi ấn next,back
nextBtn.addEventListener("click",function() {
    changeSong(1);
    isPlaying = true;
    init(indexSong);
    playPause();
    scrollActiveList();
})
backBtn.addEventListener("click", function() {
    changeSong(-1);
    isPlaying = true;
    init(indexSong);
    playPause();
    scrollActiveList();
})

// chức năng active bài hát
function scrollActiveList() {
    if (indexSong == 0) {
        setTimeout(() => {
            document.querySelector(".cacBH.active-list").scrollIntoView({
                behavior: "smooth",
                block: "end"
            })
            
        }, 200);
    } else if (indexSong == musicList.length-1) {
        setTimeout(() => {
            document.querySelector(".cacBH.active-list").scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }, 200);
    } else {
        setTimeout(() => {
            document.querySelector(".cacBH.active-list").scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            })
        }, 200);
    }
}

// chức năng click bài hát active
playList.addEventListener("click", clickAT);
function clickAT(playList) {
    const playList1 = playList.target.closest('.cacBH:not(.active-list)');
    if (playList1) {
        indexSong = Number(playList1.dataset.index - 1);
        isPlaying = true;
        init(indexSong);
        playPause();
        renderList();
        getSpinner();
    }
}

// render lại data
function init(indexSong) {
    displayTimer();
    song.setAttribute("src",musicList[indexSong].linkMusic);
    musicImg.setAttribute("src",musicList[indexSong].img);
    musicName.textContent = musicList[indexSong].name;
    renderList();
}
init(indexSong);

// chức năng đĩa xoay danh sách bài hát
// star đĩa
function getSpinner() {
    document.querySelector(".active-list img").classList.add("music-img-an");
}
// stop đĩa
function stopSpinner() {
    document.querySelector(".active-list img").classList.remove("music-img-an");
}

// chức năng bật, tắt màu nền
dark.addEventListener("click",clickMode);
function clickMode() {
    if(isPlaying){
        dark.innerHTML = '<i class="fa-solid fa-moon"></i>';
        setDark();
        isPlaying = false;
    }else {
        dark.innerHTML = '<i class="fa-regular fa-sun"></i>';
        setLight();
        isPlaying = true;
    } 
}

function setDark(){
    document.querySelector("body").style.backgroundColor = "rgb(79 70 70 / 93%)";
    document.querySelector(".cacBaiHat").style.backgroundColor = "#48555a";
    document.querySelector(".controls").style.color = "white";
    document.querySelector("video").setAttribute("src","./assets/video/background.mp4");
    document.querySelector(".fa-moon").style.color = "white";
    document.querySelector(".music-name").style.color = "white";
}

function setLight() {
    document.querySelector("body").style.backgroundColor = "rgb(196, 236, 236)";
    document.querySelector(".cacBaiHat").style.backgroundColor = "#84cef0";
    document.querySelector(".controls").style.color = "black";
    document.querySelector("video").setAttribute("src","./assets/video/videonen.mp4");
    document.querySelector(".fa-sun").style.color = "black";
    document.querySelector(".music-name").style.color = "black";
}

// Chức năng repeat bài hát
repeatIcon.addEventListener("click",clickRepeat);
function clickRepeat() {
    if (isRandom) {
        randomIcon.classList.remove("active-icon");
        isRandom = false;
    }
    if (isRepeat) {
        repeatIcon.classList.remove("active-icon");
        isRepeat = false;
    }else {
        repeatIcon.classList.add("active-icon");
        isRepeat = true;
    }
}

// Chức năng random bài hát
function ranDom() {
    do {
        newIndex = Math.floor(Math.random() * musicList.length);
    } while(newIndex === indexSong);
    indexSong = newIndex;
    init(indexSong);
    playPause();
}

randomIcon.addEventListener("click", clickRandom);
function clickRandom() {
    if(isRepeat) {
        repeatIcon.classList.remove("active-icon");
    }
    if (isRandom) {
        randomIcon.classList.remove("active-icon");
        isRandom = false;
    } else {
        randomIcon.classList.add("active-icon");
        isRandom = true;
    }
}

// tạo hiệu ứng animation tuyết rơi
// var container = document.querySelector(".container");
// var bordersArray = ['50%','0'];
// var blurArray = ['0','5px'];
// var colorsArray = ['#FF6B6B', '#FFE66D', '#4472CA'];
// var width = document.documentElement.clientWidth;
// var height = document.documentElement.clientHeight;
// var count = 40;

// function randomTuyetRoi() {
//     for (var i = 0;i<count;i++) {
//         var randomLeft = Math.floor(Math.random()*width);
//         var randomTop = Math.floor(Math.random()*height);
//         var color = Math.floor(Math.random()*3);
//         var border = Math.floor(Math.random()*2);
//         var blur = Math.floor(Math.random()*2);
//         var widthElement = Math.floor(Math.random()*5) + 5;
//         var timeAnimation = Math.floor(Math.random()*8) + 5;

//         var div = document.createElement("div");
//         div.style.backgroundColor = colorsArray[color];
//         div.style.position = 'absolute';
//         div.style.width = widthElement + 'px';
//         div.style.height = widthElement + 'px';
//         div.style.marginLeft = randomLeft + 'px';
//         div.style.marginTop = randomTop + 'px';
//         div.style.borderRadius = bordersArray[border];
//         div.style.filter = 'blur(' + blurArray[blur] + ')';
//         div.style.animation = 'move' + timeAnimation + '5 ease-in infinite';
//         container.appendChild(div); 
//     }
// }

// randomTuyetRoi();



