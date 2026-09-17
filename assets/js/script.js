
    // 2. Sticky Navbar & Back to Top Button
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTopBtn.classList.add('active');
        } else {
            navbar.classList.remove('scrolled');
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 3. Hamburger Menu Toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    hamburgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // 4. Statistics Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let animatedStats = false;

    const animateCounters = () => {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCount = () => {
                current += step;
                if (current < target) {
                    stat.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.innerText = target + (target >= 60 ? '+' : '');
                }
            };
            updateCount();
        });
    };

    window.addEventListener('scroll', () => {
        const statsSection = document.getElementById('stats');
        if (statsSection) {
            const sectionPos = statsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;
            if (sectionPos < screenPos && !animatedStats) {
                animatedStats = true;
                animateCounters();
            }
        }
    });

    // 5. Gallery Lightbox Modal
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxClose = document.getElementById('lightbox-close-btn');

    document.querySelectorAll('.moment-card').forEach(card => {
        card.addEventListener('click', () => {
            lightboxImg.src = card.getAttribute('data-img');
            lightboxTitle.innerText = card.getAttribute('data-title');
            lightboxDesc.innerText = card.getAttribute('data-desc');
            lightbox.classList.add('active');
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.remove('active');
    });

    // 6. F1 Reaction Test Game
    const gantryLights = document.querySelectorAll('.gantry-light');
    const btnGameAction = document.getElementById('btn-game-action');
    const gameStatus = document.getElementById('game-status');
    const gameReactionTime = document.getElementById('game-reaction-time');

    let gameState = 'idle'; // idle, waiting, ready, finished
    let startTime, timeoutId;

    btnGameAction.addEventListener('click', () => {
        if (gameState === 'idle' || gameState === 'finished') {
            gameState = 'waiting';
            btnGameAction.innerText = 'GET READY...';
            gameStatus.innerText = 'Tunggu lampu merah menyala dan padam!';
            gameReactionTime.innerText = '0.000 s';
            gantryLights.forEach(l => l.classList.remove('red-on'));

            let currentLight = 0;
            const turnOnLights = setInterval(() => {
                if (currentLight < gantryLights.length) {
                    gantryLights[currentLight].classList.add('red-on');
                    currentLight++;
                } else {
                    clearInterval(turnOnLights);
                    const randomDelay = Math.floor(Math.random() * 2500) + 1000;
                    timeoutId = setTimeout(() => {
                        gantryLights.forEach(l => l.classList.remove('red-on'));
                        startTime = Date.now();
                        gameState = 'ready';
                        btnGameAction.innerText = 'CLICK NOW!';
                        gameStatus.innerText = 'LIGHTS OUT! PUSH PUSH!';
                    }, randomDelay);
                }
            }, 1000);

        } else if (gameState === 'waiting') {
            clearTimeout(timeoutId);
            gameState = 'finished';
            gantryLights.forEach(l => l.classList.remove('red-on'));
            gameStatus.innerText = 'FALSE START! Kamu menekan terlalu cepat.';
            btnGameAction.innerText = 'TRY AGAIN';

        } else if (gameState === 'ready') {
            const reactionTime = (Date.now() - startTime) / 1000;
            gameState = 'finished';
            gameReactionTime.innerText = reactionTime.toFixed(3) + ' s';
            
            if (reactionTime < 0.200) {
                gameStatus.innerText = 'REKOR F1 DRIVER! Refleks luar biasa!';
            } else if (reactionTime < 0.350) {
                gameStatus.innerText = 'BAGUS! Refleks pembalap yang sangat baik.';
            } else {
                gameStatus.innerText = 'LATIHAN LAGI! Waktu reaksi masih bisa ditingkatkan.';
            }
            btnGameAction.innerText = 'TRY AGAIN';
        }
    });

    // 7. F1 Knowledge Quiz
    const quizQuestions = [
        {
            q: "Di usia berapa Max Verstappen mencatatkan debut pertamanya di F1?",
            options: ["17 Tahun", "18 Tahun", "19 Tahun", "20 Tahun"],
            correct: 0
        },
        {
            q: "Sirkuit manakah tempat Max Verstappen meraih kemenangan perdananya di F1?",
            options: ["Sirkuit Spa-Francorchamps", "Sirkuit Catalunya (Spanyol)", "Sirkuit Silverstone", "Sirkuit Monza"],
            correct: 1
        },
        {
            q: "Berapa jumlah rekor kemenangan berturut-turut terbanyak yang dicapai Max dalam 1 musim?",
            options: ["8 Kemenangan", "10 Kemenangan", "12 Kemenangan", "15 Kemenangan"],
            correct: 1
        },
        {
            q: "Tahun berapakah Max Verstappen mengunci gelar Juara Dunia F1 pertamanya?",
            options: ["2019", "2020", "2021", "2022"],
            correct: 2
        },
        {
            q: "Apa julukan khas pendukung atau fans setia Max Verstappen?",
            options: ["Tifosi", "Red Army", "Orange Army", "Silver Arrows"],
            correct: 2
        }
    ];

    let currentQ = 0;
    let quizScore = 0;

    const qText = document.getElementById('quiz-question-text');
    const qOptions = document.getElementById('quiz-options');
    const qCurrent = document.getElementById('quiz-current');
    const qScoreText = document.getElementById('quiz-score');
    const qFeedback = document.getElementById('quiz-feedback');
    const btnNextQuiz = document.getElementById('btn-next-quiz');
    const quizContainer = document.getElementById('quiz-container');
    const quizResult = document.getElementById('quiz-result');
    const quizFinalScore = document.getElementById('quiz-final-score');
    const btnRestartQuiz = document.getElementById('btn-restart-quiz');

    function loadQuiz() {
        const item = quizQuestions[currentQ];
        qCurrent.innerText = currentQ + 1;
        qText.innerText = item.q;
        qOptions.innerHTML = '';
        qFeedback.innerText = '';
        btnNextQuiz.style.display = 'none';

        item.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option-btn';
            btn.innerText = opt;
            btn.addEventListener('click', () => selectAnswer(idx, btn));
            qOptions.appendChild(btn);
        });
    }

    function selectAnswer(selectedIdx, selectedBtn) {
        const correctIdx = quizQuestions[currentQ].correct;
        const allBtns = qOptions.querySelectorAll('.quiz-option-btn');
        allBtns.forEach(btn => btn.disabled = true);

        if (selectedIdx === correctIdx) {
            selectedBtn.classList.add('correct');
            qFeedback.innerText = 'BENAR! Tepat sekali.';
            qFeedback.style.color = '#00e676';
            quizScore++;
            qScoreText.innerText = quizScore;
        } else {
            selectedBtn.classList.add('wrong');
            allBtns[correctIdx].classList.add('correct');
            qFeedback.innerText = 'SALAH! Jawaban kurang tepat.';
            qFeedback.style.color = 'var(--f1-red)';
        }
        btnNextQuiz.style.display = 'inline-flex';
    }

    btnNextQuiz.addEventListener('click', () => {
        currentQ++;
        if (currentQ < quizQuestions.length) {
            loadQuiz();
        } else {
            quizContainer.style.display = 'none';
            quizResult.style.display = 'block';
            quizFinalScore.innerText = quizScore;
        }
    });

    btnRestartQuiz.addEventListener('click', () => {
        currentQ = 0;
        quizScore = 0;
        qScoreText.innerText = '0';
        quizResult.style.display = 'none';
        quizContainer.style.display = 'block';
        loadQuiz();
    });

    loadQuiz();

    // 8. Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const formAlert = document.getElementById('form-alert');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        formAlert.className = 'form-alert success';
        formAlert.innerText = 'Terima kasih! Pesan kamu berhasil terkirim.';
        contactForm.reset();
        setTimeout(() => {
            formAlert.style.display = 'none';
        }, 4000);
    });
