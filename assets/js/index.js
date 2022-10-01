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

// Danh sách bài hát
const musicList = [
    {
        id: 1,
        name: 'Nghìn cánh hoa đào',
        linkMusic: './assets/music/nghìn cánh hoa đào.mp3',
        img: './assets/img/nghincanhhoadao.jpg'
    },
    {
        id: 2,
        name: 'Ánh trăng huyền ảo',
        linkMusic: './assets/music/ánh trăng huyền ảo.mp3',
        img: './assets/img/anhtranghuyenao.jpg'
    },
    {
        id: 3,
        name: 'Tôi ơi buồn làm gì',
        linkMusic: './assets/music/tôi ơi buồn làm gì.mp3',
        img: './assets/img/toioibuonlamgi.jpg'
    },
    {
        id: 4,
        name: "Giấc mơ xưa và cây diệp anh đào",
        linkMusic: "./assets/music/Giấc mơ xưa và cây diệp anh đào.mp3",
        img: "./assets/img/anhdao.jpg"
    },
    {
        id: 5,
        name: "Bạch nguyệt quang và nốt chu sa",
        linkMusic: "./assets/music/Bạch Nguyệt Quang Và Nốt Chu Sa.mp3",
        img: "./assets/img/bachnguyetquangvanotchusa.jpg"
    }

];

displayTimer();

let timer;
let isPlaying = true;
let indexSong = 0;
let isRandom = false;

// -------------------------------

// Chức năng play, pause
playBtn.addEventListener("click", playPause);
function playPause() {
    if(isPlaying) {
        song.play();
        playBtn.innerHTML = "<i class='fa-solid fa-pause'></i>";
        timer = setInterval(displayTimer, 600);
        musicImgSP.classList.add("music-img-an");
        isPlaying = false;

    }else {
        song.pause();
        playBtn.innerHTML = "<i class='fa-solid fa-play'></i>";
        clearInterval(timer);
        musicImgSP.classList.remove("music-img-an");
        isPlaying = true;
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
                    <img src="${nhac.img}" alt="">
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
    changeSong(1);
    isPlaying = true;
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
            document.querySelector(".cacBH.active-list").scrollIntoView(true);
        }, 200);
    } else if (indexSong == musicList.length-1) {
        setTimeout(() => {
            document.querySelector(".cacBH.active-list").scrollIntoView(false);
        }, 200)
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

