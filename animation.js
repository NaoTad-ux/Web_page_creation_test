// 写真スライドショー
document.addEventListener('DOMContentLoaded', function() {
    // スライドショーの初期化
    const mainPhoto = document.getElementById('mainPhoto');
    const slides = mainPhoto ? mainPhoto.querySelectorAll('.photo-slide') : [];
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // 全てのスライドを非表示
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // 指定されたスライドを表示
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }

        currentSlide = index;
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function startSlideshow() {
        // 3秒ごとに次のスライドへ
        slideInterval = setInterval(nextSlide, 3000);
    }

    function stopSlideshow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    // インジケーターのクリックイベント
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopSlideshow();
            showSlide(index);
            startSlideshow();
        });
    });

    // スライドショーを開始
    if (slides.length > 0) {
        startSlideshow();

        // マウスホバー時は一時停止
        if (mainPhoto) {
            mainPhoto.addEventListener('mouseenter', stopSlideshow);
            mainPhoto.addEventListener('mouseleave', startSlideshow);
        }
    }

    // 楽しいボタンのアニメーション
    const funButton = document.getElementById('funButton');
    const particlesContainer = document.querySelector('.particles-container');

    if (!funButton || !particlesContainer) return;

    // カラフルな色の配列
    const colors = [
        '#667eea', '#764ba2', '#f093fb', '#f5576c',
        '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
        '#fa709a', '#fee140', '#30cfd0', '#330867'
    ];

    // 絵文字の配列
    const emojis = ['✨', '🎉', '🎊', '💫', '⭐', '🌟', '💖', '🎈', '🎀', '🌈'];

    // パーティクル生成関数
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        // ランダムな方向に飛ばす
        const angle = Math.random() * Math.PI * 2;
        const velocity = 100 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity - 200;

        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');

        particlesContainer.appendChild(particle);

        // アニメーション終了後に削除
        setTimeout(() => particle.remove(), 2000);
    }

    // 紙吹雪生成関数
    function createConfetti(x, y) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';

        const color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.background = color;
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';

        // ランダムな横方向の移動
        const tx = (Math.random() - 0.5) * 200;
        confetti.style.setProperty('--tx', tx + 'px');

        particlesContainer.appendChild(confetti);

        // アニメーション終了後に削除
        setTimeout(() => confetti.remove(), 3000);
    }

    // 絵文字爆発関数
    function createEmojiExplosion(x, y) {
        const emojiEl = document.createElement('div');
        emojiEl.className = 'emoji-explosion';
        emojiEl.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        emojiEl.style.left = x + 'px';
        emojiEl.style.top = y + 'px';

        // ランダムな方向
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        emojiEl.style.setProperty('--tx', tx + 'px');
        emojiEl.style.setProperty('--ty', ty + 'px');

        particlesContainer.appendChild(emojiEl);

        // アニメーション終了後に削除
        setTimeout(() => emojiEl.remove(), 2000);
    }

    // ボタンが揺れるアニメーション
    function shakeButton() {
        funButton.style.animation = 'none';
        setTimeout(() => {
            funButton.style.animation = '';
        }, 10);
    }

    // クリックイベント
    funButton.addEventListener('click', function(e) {
        // ボタンにクリックエフェクトを追加
        funButton.classList.add('clicked');
        setTimeout(() => funButton.classList.remove('clicked'), 600);

        // クリック位置を取得
        const rect = funButton.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        // 複数のパーティクルを生成
        for (let i = 0; i < 20; i++) {
            setTimeout(() => createParticle(x, y), i * 20);
        }

        // 紙吹雪を生成
        for (let i = 0; i < 15; i++) {
            setTimeout(() => createConfetti(x, y), i * 30);
        }

        // 絵文字爆発を生成
        for (let i = 0; i < 8; i++) {
            setTimeout(() => createEmojiExplosion(x, y), i * 50);
        }

        // ボタンのテキストを一時的に変更
        const originalText = funButton.querySelector('.button-text').textContent;
        funButton.querySelector('.button-text').textContent = 'わーい！';

        setTimeout(() => {
            funButton.querySelector('.button-text').textContent = originalText;
        }, 1000);

        // サウンドエフェクト（オプション）
        playSound();
    });

    // ホバー時のパーティクル
    let hoverInterval;
    funButton.addEventListener('mouseenter', function() {
        hoverInterval = setInterval(() => {
            const rect = funButton.getBoundingClientRect();
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            createParticle(x, y);
        }, 200);
    });

    funButton.addEventListener('mouseleave', function() {
        clearInterval(hoverInterval);
    });

    // 簡単なサウンド生成（Web Audio API）
    function playSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();

            // 明るく楽しい音を生成
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // サウンドが再生できない場合は無視
            console.log('Audio not supported');
        }
    }

    // ボタンにキーボードサポート
    funButton.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            funButton.click();
        }
    });
});
