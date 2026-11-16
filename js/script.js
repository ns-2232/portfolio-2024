'use script';

// cursorStoker
const stalker = document.querySelector('.parts-img_girl');
const stalkerImg = stalker.querySelector('img');
let stalkerDisplay = true;
document.addEventListener('mousemove', function (e) {
    if(stalkerDisplay == true) {
        let mouseX   = e.clientX,
	    windowX = window.innerWidth;
		direction = (windowX / 2) < mouseX ? 'right' : 'left';
        if(direction == 'left') {
            stalkerImg.classList.remove('right');
        } else {
            stalkerImg.classList.add('right');
        }
        stalker.style.right = 'calc(100vw + -' + mouseX + 'px - 5%)';
    }
});

// opening
const nav = document.querySelector('.nav');
window.addEventListener('load', function () {
    window.scroll({
        top: 0,
        behavior: "smooth",
    });
    stalkerDisplay = false;
    setTimeout(() => {
        nav.classList.toggle('nav-active');
        stalker.style.right = '14vw';
    }, "4000");
    setTimeout(() => {
        stalkerDisplay = true;
    }, "5000");
});

// 空画像変更
const nowTime = new Date().getHours();
const sky = document.querySelector('.bg-img_sky');
if(nowTime > 18 || nowTime < 5) {
    sky.classList.add('night');
}else if(nowTime >= 16) {
    sky.classList.add('evening');
}else if(nowTime >= 5) {
    sky.classList.add('morning');
};

// キャラ画像変更
const girl = document.querySelector('.parts-img_girl img');
function sleep() {
    if(nowTime >= 22 || 6 >= nowTime) {
        girl.src = 'img/parts_girl-sleep.png';
    }else {
        girl.src = 'img/parts_girl-popular.png';
    }
};
sleep();

// nav表示切り替え
function navNone() {
    nav.classList.toggle('nav-active');
    setTimeout(() => {
        nav.classList.toggle('none');
        nav.classList.toggle('show');
    }, "1000");
};

function navDisplay() {
    nav.classList.toggle('none');
    nav.classList.toggle('show');
    setTimeout(() => {
        nav.classList.toggle('nav-active');
    }, "1000");
};

// 共通about画面移行
const body = document.querySelector('body');
const container = document.querySelector('.container');
const aboutBtn = document.querySelector('.nav_menu_about');
const about =document.querySelector('.about');

function aboutClickToggle() {
    about.classList.toggle('active');
    body.classList.toggle('about-active');
    container.classList.toggle('about-area');
};

// home→about画面移行
function aboutClick() {
    stalkerDisplay = false;
    navNone();
    stalker.style.right = 'calc(44vw)';
    setTimeout(() => {
        stalker.querySelector('img').src = 'img/parts_girl-about1.png';
        stalker.classList.toggle('anime-walk');
    }, "2500");
    setTimeout(() => {
        stalker.querySelector('img').src = 'img/parts_girl-about2.png';
    }, "3500");
    setTimeout(() => {
        aboutClickToggle();
    }, "4500");
};

// about→home画面移行
function backAboutClick() {
    window.scroll({
        top: 0,
        behavior: "smooth",
    });
    aboutClickToggle();
    setTimeout(() => {
        stalker.querySelector('img').src = 'img/parts_girl-about2.png';
    }, "1000");
    setTimeout(() => {
        stalker.querySelector('img').src = 'img/parts_girl-about1.png';
    }, "2000");
    setTimeout(() => {
        sleep();
        stalker.classList.toggle('anime-walk');
        stalkerDisplay = true;
        navDisplay();
    }, "3000");
};

//parallax
let image = document.getElementsByClassName('portrait');
new simpleParallax(image, {
    scale: 1.4,
	delay: .6,
	transition: 'cubic-bezier(0,0,0,1)'
});

// home→work画面移行
const workBtn = document.querySelector('.nav_menu_work');
const workCategories = document.querySelector('.work_categories');
const workGallery = document.querySelector('.work_gallery');
const workDetails = document.querySelectorAll('.work_detail');
const workCategoryButtons = document.querySelectorAll('.work_category');

function randomizeWorkCategoryMotion() {
    workCategoryButtons.forEach((button) => {
        const delay = Math.random() * 0.8;
        const rotation = 1 + Math.random() * 2;
        button.style.setProperty('--appear-delay', `${delay.toFixed(2)}s`);
        button.style.setProperty('--float-duration', `${(3.2 + Math.random() * 2.8).toFixed(2)}s`);
        button.style.setProperty('--float-distance', `${-(0.5 + Math.random() * 1.2).toFixed(2)}vw`);
        button.style.setProperty('--float-start-rotation', `${rotation.toFixed(2)}deg`);
        button.style.setProperty('--float-end-rotation', `${(-rotation).toFixed(2)}deg`);
    });
}

function workClick() {
    stalkerDisplay = false;
    window.scroll({
        top: 0,
        behavior: "smooth",
    });
    navNone();
    stalker.style.right = 'calc(120vw)';
    setTimeout(() => {
        container.classList.add('work-area');
        stalker.style.display = 'none';
    }, "2000");
    setTimeout(() => {
        randomizeWorkCategoryMotion();
        workCategories.classList.remove('none');
        workCategories.classList.add('show');
    }, "3500");
};

// work→home画面移行
const backWorkBtn = document.querySelector('.back_work');
function backWorkClick() {
    workCategories.classList.remove('show');
    workCategories.classList.add('none');
    workGallery.classList.remove('show');
    workGallery.classList.add('none');
    workDetails.forEach((detail) => {
        detail.classList.remove('show');
        detail.classList.add('none');
    });
    container.classList.remove('work-area');
    setTimeout(() => {
        stalker.style.display = 'block';
        stalkerImg.classList.add('right');
    }, "3000");
    setTimeout(() => {
        stalker.style.right = 'calc(45vw)';
        navDisplay();
        stalkerDisplay = true;
    }, "3500");
};

// カテゴリから実績一覧へ
const galleryTitles = {
    'web-gallery': 'Web',
    'graphic-gallery': 'グラフィック',
    'illustration-gallery': 'イラスト',
};

document.querySelectorAll('.work_category').forEach((button) => {
    button.addEventListener('click', () => {
        const galleryId = button.dataset.gallery;
        const panel = document.getElementById(galleryId);
        if (!panel) {
            console.error(`WORK gallery not found: ${galleryId}`);
            return;
        }

        workCategories.classList.remove('show');
        workCategories.classList.add('none');
        workGallery.querySelector('.work_gallery-title').textContent = galleryTitles[galleryId];
        workGallery.querySelectorAll('.work_gallery-panel').forEach((galleryPanel) => {
            galleryPanel.classList.add('none');
        });
        panel.classList.remove('none');
        workGallery.classList.remove('none');
        workGallery.classList.add('show');
    });
});

document.querySelector('.work_back-category').addEventListener('click', () => {
    workGallery.classList.remove('show');
    workGallery.classList.add('none');
    randomizeWorkCategoryMotion();
    workCategories.classList.remove('none');
    workCategories.classList.add('show');
});

// 実績一覧から詳細へ
document.querySelectorAll('.work_card').forEach((button) => {
    button.addEventListener('click', () => {
        const detail = document.getElementById(button.dataset.detail);
        if (!detail) {
            console.error(`WORK detail not found: ${button.dataset.detail}`);
            return;
        }

        workGallery.classList.remove('show');
        workGallery.classList.add('none');
        detail.classList.remove('none');
        detail.classList.add('show');
    });
});

document.querySelectorAll('.detail-close').forEach((button) => {
    button.addEventListener('click', () => {
        const detail = button.closest('.work_detail');
        detail.classList.remove('show');
        detail.classList.add('none');
        workGallery.classList.remove('none');
        workGallery.classList.add('show');
    });
});
