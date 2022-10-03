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
    document.querySelector("video").setAttribute("src","https://v16-webapp.tiktok.com/2e3528cfbce3568b5668af326ac57cc0/633afab4/video/tos/useast2a/tos-useast2a-pve-0037-aiso/c3535a7caada4b079cd0ac7267c3002d/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=1480&bt=740&cs=0&ds=3&ft=z_piDPWT2NvjVwCzxozfuCYQFAe4nRQjl3_J2tOB&mime_type=video_mp4&qs=0&rc=NWY2N2g5OzpnPGZoNmVnO0BpM2w4dTw6Zjg3ZjMzZjgzM0AwYV5iMTRjNjYxMjRfMDE0YSNzaXE0cjRfb2JgLS1kL2Nzcw%3D%3D&l=2022100309060101024408707018F05C70&btag=80000");
    document.querySelector(".fa-sun").style.color = "black";
    document.querySelector(".music-name").style.color = "black";
}
