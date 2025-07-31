document.addEventListener('DOMContentLoaded', function() {
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');
    const page4 = document.getElementById('page4');

    const nextBtn = document.getElementById('nextBtn');
    const openBtn = document.getElementById('openBtn');
    const noTyBtn = document.getElementById('noTyBtn');
    const startOverBtn = document.getElementById('startOverBtn');
    const againBtn = document.getElementById('againBtn');

    const backgroundMusic = document.getElementById('background-music');
    const musicControl = document.getElementById('music-control');
    const musicIcon = document.getElementById('music-icon');

    let isMusicPlaying = false; // Initial state: music is not playing

    function updateMusicIcon() {
        if (isMusicPlaying) {
            musicIcon.classList.add('playing');
            musicIcon.classList.remove('paused');
            musicIcon.innerHTML = '&#10074;&#10074;'; // Simbol Pause
        } else {
            musicIcon.classList.add('paused');
            musicIcon.classList.remove('playing');
            musicIcon.innerHTML = '&#9654;'; // Simbol Play
        }
    }

    function showPage(pageToShow) {
        page1.classList.remove('active');
        page2.classList.remove('active');
        page3.classList.remove('active');
        page4.classList.remove('active');
        pageToShow.classList.add('active');

        setTimeout(() => {
            const activePageContent = pageToShow.querySelector('.content');
            if (activePageContent) {
                const container = document.querySelector('.container');
                if (container) {
                    container.style.height = activePageContent.offsetHeight + 60 + 'px';
                }
            }
        }, 10);
    }


    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            showPage(page2);
        });
    }

    if (openBtn) {
        openBtn.addEventListener('click', function() {
            showPage(page3);
            // Coba mainkan musik latar saat surat dibuka
            backgroundMusic.play().then(() => {
                isMusicPlaying = true;
                updateMusicIcon();
            }).catch(error => {
                console.warn('Autoplay musik diblokir:', error);
                isMusicPlaying = false;
                updateMusicIcon();
            });
        });
    }

    if (noTyBtn) {
        noTyBtn.addEventListener('click', function() {
            showPage(page4);
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
            isMusicPlaying = false;
            updateMusicIcon();
        });
    }

    if (againBtn) {
        againBtn.addEventListener('click', function() {
            showPage(page2);
        });
    }

    if (startOverBtn) {
        startOverBtn.addEventListener('click', function() {
            showPage(page1);
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
            isMusicPlaying = false;
            updateMusicIcon();
        });
    }

    if (musicControl) {
        musicControl.addEventListener('click', function() {
            if (backgroundMusic.paused) {
                backgroundMusic.play().then(() => {
                    isMusicPlaying = true;
                    updateMusicIcon();
                }).catch(error => {
                    console.error('Gagal memutar musik secara manual:', error);
                });
            } else {
                backgroundMusic.pause();
                isMusicPlaying = false;
                updateMusicIcon();
            }
        });
    }

    // Inisialisasi halaman dan status ikon musik saat DOM dimuat
    showPage(page1);
    updateMusicIcon(); // Atur status ikon awal (biasanya play/musik note karena paused)
});