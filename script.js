// Interactive emotion reveal functionality
const revealButton = document.getElementById('revealButton');
const resultDiv = document.getElementById('result');

const halloweenEmotions = [
    {
        emotion: 'Joy',
        message: 'You\'re feeling Spooky Joy! 🎃 Your Halloween spirit is bright and cheerful, ready for trick-or-treating adventures!',
        icon: '😊'
    },
    {
        emotion: 'Sadness',
        message: 'You\'re experiencing Haunted Melancholy... 😢 But remember, even sadness can appreciate the beauty of a spooky autumn night.',
        icon: '😢'
    },
    {
        emotion: 'Anger',
        message: 'Beware! You\'re filled with Halloween Fury! 🔥 Your anger is as intense as a jack-o\'-lantern\'s flame.',
        icon: '😠'
    },
    {
        emotion: 'Fear',
        message: 'FEAR is taking control! 😨 Perfect for Halloween - you\'re ready to face the scariest night of the year!',
        icon: '😨'
    },
    {
        emotion: 'Disgust',
        message: 'You\'re feeling Spooky Disgust! 🤢 Whether it\'s creepy crawlies or weird Halloween treats, something just isn\'t right!',
        icon: '🤢'
    },
    {
        emotion: 'Anxiety',
        message: 'New emotion detected: Spooky Anxiety! 😰 The mind is getting crowded with worries about costumes and candy!',
        icon: '😰'
    },
    {
        emotion: 'Envy',
        message: 'Envy is here! 👀 You\'re eyeing everyone else\'s amazing Halloween costumes and decorations!',
        icon: '👀'
    },
    {
        emotion: 'Embarrassment',
        message: 'Embarrassment strikes! 😳 That Halloween costume choice might need a second thought...',
        icon: '😳'
    }
];

revealButton.addEventListener('click', () => {
    // Hide result first
    resultDiv.classList.remove('result-visible');
    resultDiv.classList.add('result-hidden');
    
    // After a short delay, reveal new emotion
    setTimeout(() => {
        const randomEmotion = halloweenEmotions[Math.floor(Math.random() * halloweenEmotions.length)];
        
        resultDiv.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
                <span style="font-size: 3rem;">${randomEmotion.icon}</span>
                <div>
                    <strong style="font-size: 1.8rem; display: block; margin-bottom: 10px;">${randomEmotion.emotion}</strong>
                    <p>${randomEmotion.message}</p>
                </div>
            </div>
        `;
        
        // Add visible class with animation
        resultDiv.classList.remove('result-hidden');
        resultDiv.classList.add('result-visible');
    }, 300);
});

// Quiz functionality
const questionContainer = document.getElementById('questionContainer');
const answerContainer = document.getElementById('answerContainer');
const emotionResults = document.getElementById('emotionResults');
const resetButton = document.getElementById('resetButton');
const questionText = document.getElementById('questionText');
const quizOptions = document.getElementById('quizOptions');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const questionNumber = document.getElementById('questionNumber');
const progressFill = document.getElementById('progressFill');

// Quiz questions
const quizQuestions = [
    {
        question: 'What\'s your favorite Halloween activity?',
        options: [
            { text: 'Trick-or-Treating 🍬', value: 'trickortreat' },
            { text: 'Visiting Haunted Houses 👻', value: 'haunted' },
            { text: 'Wearing a Costume 🎭', value: 'costume' },
            { text: 'Watching Scary Movies 🎬', value: 'scary' },
            { text: 'Halloween Party 🎉', value: 'party' }
        ]
    },
    {
        question: 'What type of Halloween candy do you prefer?',
        options: [
            { text: 'Chocolate Bars 🍫', value: 'chocolate' },
            { text: 'Gummy Candies 🍬', value: 'gummy' },
            { text: 'Sour Candy 🍋', value: 'sour' },
            { text: 'Lollipops 🍭', value: 'lollipop' },
            { text: 'I don\'t like candy 🚫', value: 'nocandy' }
        ]
    },
    {
        question: 'How do you feel about scary decorations?',
        options: [
            { text: 'Love them! The scarier the better! 🕷️', value: 'lovescary' },
            { text: 'Like them, but not too extreme 👻', value: 'moderate' },
            { text: 'Prefer cute/funny decorations 🎃', value: 'cute' },
            { text: 'Not a fan, too spooky for me 😰', value: 'tooscary' },
            { text: 'Don\'t really care either way 🤷', value: 'indifferent' }
        ]
    },
    {
        question: 'What would you do if you saw a real ghost?',
        options: [
            { text: 'Run away screaming! 😱', value: 'runaway' },
            { text: 'Try to befriend it 👋', value: 'befriend' },
            { text: 'Take a selfie with it 📸', value: 'selfie' },
            { text: 'Pretend I didn\'t see it 🙈', value: 'pretend' },
            { text: 'Investigate and ask questions 🔍', value: 'investigate' }
        ]
    },
    {
        question: 'What\'s your ideal Halloween night?',
        options: [
            { text: 'Scary movie marathon with friends 🎬', value: 'movie' },
            { text: 'Haunted house tour with family 👨‍👩‍👧', value: 'tour' },
            { text: 'Quiet night with pumpkin carving 🎃', value: 'quiet' },
            { text: 'Big costume party with lots of people 🎉', value: 'bigparty' },
            { text: 'Trick-or-treating all night 🍬', value: 'allnight' }
        ]
    }
];

// Emotion scoring system - each answer contributes points to different emotions
const emotionScoring = {
    // Question 1: Favorite activity
    'trickortreat': { joy: 3, anxiety: 2 },
    'haunted': { fear: 3, anxiety: 2 },
    'costume': { joy: 2, anxiety: 2, embarrassment: 1 },
    'scary': { fear: 2, anxiety: 2, disgust: 1 },
    'party': { joy: 3, anxiety: 2, envy: 1 },
    
    // Question 2: Candy preference
    'chocolate': { joy: 2, disgust: -1 },
    'gummy': { joy: 1 },
    'sour': { disgust: 2, anger: 1 },
    'lollipop': { joy: 1 },
    'nocandy': { disgust: 2, sadness: 1 },
    
    // Question 3: Scary decorations
    'lovescary': { fear: 2, joy: 1 },
    'moderate': { fear: 1, anxiety: 1 },
    'cute': { joy: 3, disgust: -1 },
    'tooscary': { fear: 3, anxiety: 2 },
    'indifferent': { sadness: 1 },
    
    // Question 4: Real ghost encounter
    'runaway': { fear: 3, anxiety: 2 },
    'befriend': { joy: 2, anxiety: 1 },
    'selfie': { joy: 1, embarrassment: 2 },
    'pretend': { anxiety: 3, fear: 1 },
    'investigate': { fear: 1, joy: 1 },
    
    // Question 5: Ideal Halloween night
    'movie': { fear: 2, joy: 1, anxiety: 1 },
    'tour': { fear: 2, joy: 2, anxiety: 1 },
    'quiet': { sadness: 2, joy: 1 },
    'bigparty': { joy: 3, anxiety: 2, envy: 1 },
    'allnight': { joy: 3, anxiety: 1 }
};

let currentQuestionIndex = 0;
let userAnswers = [];

// Emotion data
const emotionData = {
    'joy': { name: 'Joy', icon: '😊', color: '#ffc0cb', description: 'You\'re feeling spooky joy! Ready for Halloween fun!' },
    'sadness': { name: 'Sadness', icon: '😢', color: '#87ceeb', description: 'A touch of melancholy, but Halloween can still bring smiles.' },
    'anger': { name: 'Anger', icon: '😠', color: '#ff4500', description: 'Halloween fury is building - channel it into your costume!' },
    'fear': { name: 'Fear', icon: '😨', color: '#8a2be2', description: 'Fear is taking control - perfect for Halloween!' },
    'disgust': { name: 'Disgust', icon: '🤢', color: '#32cd32', description: 'Something\'s not quite right in Halloween town!' },
    'anxiety': { name: 'Anxiety', icon: '😰', color: '#ff8c00', description: 'Worries about costumes, candy, and everything spooky!' },
    'envy': { name: 'Envy', icon: '👀', color: '#9370db', description: 'Coveting those amazing Halloween decorations and costumes!' },
    'embarrassment': { name: 'Embarrassment', icon: '😳', color: '#ff69b4', description: 'That costume choice might need a rethink...' }
};

function loadQuestion(index) {
    const question = quizQuestions[index];
    questionText.textContent = question.question;
    questionNumber.textContent = `Question ${index + 1} of ${quizQuestions.length}`;
    
    // Update progress bar
    const progress = ((index + 1) / quizQuestions.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Clear and populate options
    quizOptions.innerHTML = '';
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = option.text;
        button.setAttribute('data-value', option.value);
        button.addEventListener('click', () => selectAnswer(option.value));
        
        // Show selected answer if already answered
        if (userAnswers[index] === option.value) {
            button.classList.add('selected');
        }
        
        quizOptions.appendChild(button);
    });
    
    // Update navigation buttons
    prevButton.style.display = index > 0 ? 'inline-block' : 'none';
    nextButton.style.display = userAnswers[index] ? 'inline-block' : 'none';
    
    // If on last question and answered, show "See Results" button
    if (index === quizQuestions.length - 1 && userAnswers[index]) {
        nextButton.textContent = 'See Results →';
    } else {
        nextButton.textContent = 'Next →';
    }
}

function selectAnswer(value) {
    userAnswers[currentQuestionIndex] = value;
    
    // Update button states
    document.querySelectorAll('.quiz-option').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.getAttribute('data-value') === value) {
            btn.classList.add('selected');
        }
    });
    
    // Show next button
    nextButton.style.display = 'inline-block';
    if (currentQuestionIndex === quizQuestions.length - 1) {
        nextButton.textContent = 'See Results →';
    }
}

function calculateEmotions() {
    const emotionScores = {};
    
    // Initialize scores
    Object.keys(emotionData).forEach(emotion => {
        emotionScores[emotion] = 0;
    });
    
    // Calculate scores based on answers
    userAnswers.forEach(answer => {
        if (emotionScoring[answer]) {
            Object.keys(emotionScoring[answer]).forEach(emotion => {
                emotionScores[emotion] = (emotionScores[emotion] || 0) + emotionScoring[answer][emotion];
            });
        }
    });
    
    // Get top 3-5 emotions (positive scores only)
    const sortedEmotions = Object.entries(emotionScores)
        .filter(([_, score]) => score > 0)
        .sort(([_, a], [__, b]) => b - a)
        .slice(0, 5);
    
    return sortedEmotions.map(([emotionKey, score]) => ({
        ...emotionData[emotionKey],
        score: score
    }));
}

function showResults() {
    const emotions = calculateEmotions();
    
    questionContainer.style.display = 'none';
    answerContainer.classList.remove('result-hidden');
    answerContainer.classList.add('result-visible');
    
    emotionResults.innerHTML = '';
    
    emotions.forEach((emotion, index) => {
        setTimeout(() => {
            const emotionCard = document.createElement('div');
            emotionCard.className = 'emotion-result-card';
            emotionCard.style.borderColor = emotion.color;
            emotionCard.style.animationDelay = `${index * 0.15}s`;
            emotionCard.innerHTML = `
                <span class="result-icon">${emotion.icon}</span>
                <h4>${emotion.name}</h4>
                <p>${emotion.description}</p>
                <div class="score-indicator">Strength: ${'⭐'.repeat(Math.min(emotion.score, 5))}</div>
            `;
            emotionResults.appendChild(emotionCard);
        }, index * 150);
    });
    
    createSparkles();
}

nextButton.addEventListener('click', () => {
    if (!userAnswers[currentQuestionIndex]) {
        return; // Can't proceed without answering
    }
    
    if (currentQuestionIndex === quizQuestions.length - 1) {
        showResults();
    } else {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
});

prevButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
});

resetButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    userAnswers = [];
    questionContainer.style.display = 'block';
    answerContainer.classList.remove('result-visible');
    answerContainer.classList.add('result-hidden');
    emotionResults.innerHTML = '';
    loadQuestion(0);
});

// Initialize quiz
loadQuestion(0);

// Character information for popup
const characterData = {
    'joy': {
        name: 'Joy',
        emoji: '😊',
        description: 'Joy is the bright, optimistic leader of Riley\'s emotions. She\'s energetic, cheerful, and always tries to keep things positive - even on the spookiest Halloween nights!',
        funFact: '🎃 Fun Fact: Joy turns every Halloween into a celebration, even when things get scary!',
        color: '#ffc0cb'
    },
    'sadness': {
        name: 'Sadness',
        emoji: '😢',
        description: 'Sadness may seem blue, but she\'s an important emotion. On Halloween, she brings a touch of melancholy to autumn nights, helping Riley process spooky memories.',
        funFact: '🎃 Fun Fact: Sadness makes those spooky movie endings even more meaningful!',
        color: '#87ceeb'
    },
    'anger': {
        name: 'Anger',
        emoji: '😠',
        description: 'Anger is fiery and passionate! On Halloween, he channels his intensity into the perfect scary costume and gets fired up about trick-or-treating!',
        funFact: '🎃 Fun Fact: Anger\'s Halloween fury is as hot as a jack-o\'-lantern\'s flame!',
        color: '#ff4500'
    },
    'fear': {
        name: 'Fear',
        emoji: '😨',
        description: 'Fear is always alert and cautious. Halloween is his ultimate challenge - he\'s ready to face the scariest night of the year and protect Riley!',
        funFact: '🎃 Fun Fact: Fear is both terrified and thrilled by Halloween - it\'s his superpower!',
        color: '#8a2be2'
    },
    'disgust': {
        name: 'Disgust',
        emoji: '🤢',
        description: 'Disgust is picky and refined. On Halloween, she\'s skeptical of creepy decorations and weird treats, making sure everything meets her high standards!',
        funFact: '🎃 Fun Fact: Disgust judges every Halloween costume choice... usually unfavorably!',
        color: '#32cd32'
    },
    'anxiety': {
        name: 'Anxiety',
        emoji: '😰',
        description: 'Anxiety is the new emotion in Inside Out 2! She worries about everything - costumes, candy, decorations. On Halloween, she\'s constantly planning for worst-case scenarios.',
        funFact: '🎃 Fun Fact: Anxiety makes sure you have backup plans for your backup Halloween plans!',
        color: '#ff8c00'
    }
};

// Modal functionality
const characterModal = document.getElementById('characterModal');
const characterName = document.getElementById('characterName');
const characterDescription = document.getElementById('characterDescription');
const characterEmoji = document.getElementById('characterEmoji');
const characterImage = document.getElementById('characterImage');
const characterFunFact = document.getElementById('characterFunFact');
const closeModal = document.querySelector('.close-modal');

// Add interactive hover effects to emotion cards
document.querySelectorAll('.emotion-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05) rotate(2deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    });
    
    card.addEventListener('click', function() {
        const emotion = this.getAttribute('data-emotion');
        const character = characterData[emotion];
        
        if (character) {
            // Populate modal with character data
            characterName.textContent = character.name;
            characterDescription.textContent = character.description;
            characterFunFact.textContent = character.funFact;
            characterEmoji.textContent = character.emoji;
            
            // Set modal theme color
            const modalContent = document.querySelector('.modal-content');
            modalContent.style.borderColor = character.color;
            modalContent.style.boxShadow = `0 0 30px ${character.color}40`;
            
            // Show modal
            characterModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    });
});

// Close modal when clicking X
closeModal.addEventListener('click', () => {
    characterModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
characterModal.addEventListener('click', (e) => {
    if (e.target === characterModal) {
        characterModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && characterModal.style.display === 'flex') {
        characterModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Tic Tac Toe Game
const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const gameStatusDisplay = document.getElementById('gameStatus');
const resetGameBtn = document.getElementById('resetGameBtn');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = '🎃'; // Pumpkin goes first
let gameActive = true;
let gameState = 'playing'; // 'playing', 'won', 'draw'

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell'));

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add('filled');
    
    // Add animation
    clickedCell.style.animation = 'cellPop 0.3s ease';
    setTimeout(() => {
        clickedCell.style.animation = '';
    }, 300);

    checkResult();
}

function checkResult() {
    let roundWon = false;
    
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        const condition = board[a] && board[a] === board[b] && board[a] === board[c];
        
        if (condition) {
            roundWon = true;
            gameState = 'won';
            gameActive = false;
            
            // Highlight winning cells
            cells[a].classList.add('winning');
            cells[b].classList.add('winning');
            cells[c].classList.add('winning');
            
            gameStatusDisplay.textContent = `🎉 ${currentPlayer} Wins! 🎉`;
            gameStatusDisplay.style.color = '#ffd700';
            createSparkles();
            break;
        }
    }

    if (!roundWon) {
        const roundDraw = !board.includes('');
        if (roundDraw) {
            gameState = 'draw';
            gameActive = false;
            gameStatusDisplay.textContent = '🤝 It\'s a Draw! 🤝';
            gameStatusDisplay.style.color = '#ffb347';
        } else {
            changePlayer();
        }
    } else {
        changePlayer(); // Update display even though game is over
    }
}

function changePlayer() {
    currentPlayer = currentPlayer === '🎃' ? '👻' : '🎃';
    currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    gameState = 'playing';
    currentPlayer = '🎃';
    currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
    gameStatusDisplay.textContent = '';
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('filled', 'winning');
        cell.style.animation = '';
    });
}

// Add event listeners are set in initializeAllGames()

// Initialize all games after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    // Game Tabs - Switch between games
    const gameTabs = document.querySelectorAll('.game-tab');
    const gameContainers = document.querySelectorAll('.game-container');

    gameTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const gameId = tab.getAttribute('data-game');
            
            // Remove active class from all tabs and containers
            gameTabs.forEach(t => t.classList.remove('active'));
            gameContainers.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding container
            tab.classList.add('active');
            const targetGame = document.getElementById(`${gameId}-game`);
            if (targetGame) {
                targetGame.classList.add('active');
            } else {
                console.error(`Game container not found: ${gameId}-game`);
            }
        });
    });

    // Initialize all game event listeners
    initializeAllGames();
});

function initializeAllGames() {
    // Tic Tac Toe - re-initialize all listeners
    const resetGameBtn = document.getElementById('resetGameBtn');
    const cells = document.querySelectorAll('.cell');
    if (resetGameBtn) {
        resetGameBtn.addEventListener('click', resetGame);
    }
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    // Memory Match Game
    const resetMemoryBtn = document.getElementById('resetMemoryBtn');
    if (resetMemoryBtn) {
        resetMemoryBtn.addEventListener('click', initMemoryGame);
    }
    initMemoryGame();
    
    // Rock Paper Scissors
    const resetRpsBtn = document.getElementById('resetRpsBtn');
    if (resetRpsBtn) {
        resetRpsBtn.addEventListener('click', () => {
            rpsWins = 0;
            rpsLosses = 0;
            rpsTies = 0;
            const winsEl = document.getElementById('rpsWins');
            const lossesEl = document.getElementById('rpsLosses');
            const tiesEl = document.getElementById('rpsTies');
            if (winsEl) winsEl.textContent = '0';
            if (lossesEl) lossesEl.textContent = '0';
            if (tiesEl) tiesEl.textContent = '0';
            const statusEl = document.getElementById('rpsStatus');
            const playerChoiceEl = document.getElementById('playerChoice');
            const computerChoiceEl = document.getElementById('computerChoice');
            if (statusEl) {
                statusEl.textContent = 'Choose your emoji!';
                statusEl.style.color = '';
            }
            if (playerChoiceEl) playerChoiceEl.textContent = '?';
            if (computerChoiceEl) computerChoiceEl.textContent = '?';
        });
    }
    // RPS choice buttons
    document.querySelectorAll('.rps-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            playRPS(btn.getAttribute('data-choice'));
        });
    });
    
    // Number Guess Game
    const guessSubmitBtn = document.getElementById('guessSubmitBtn');
    const guessInput = document.getElementById('guessInput');
    const resetGuessBtn = document.getElementById('resetGuessBtn');
    if (guessSubmitBtn) {
        guessSubmitBtn.addEventListener('click', checkGuess);
    }
    if (guessInput) {
        guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkGuess();
        });
    }
    if (resetGuessBtn) {
        resetGuessBtn.addEventListener('click', () => {
            initGuessGame();
            if (guessInput) guessInput.disabled = false;
        });
    }
    initGuessGame();
    
    // Snake Game
    const snakeStartBtn = document.getElementById('snakeStartBtn');
    const snakeResetBtn = document.getElementById('snakeResetBtn');
    if (snakeStartBtn) {
        snakeStartBtn.addEventListener('click', startSnakeGame);
    }
    if (snakeResetBtn) {
        snakeResetBtn.addEventListener('click', resetSnakeGame);
    }
    // Snake direction buttons
    document.querySelectorAll('#snake-game .direction-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const dir = btn.getAttribute('data-direction');
            if (!snakeGameRunning) {
                startSnakeGame();
            }
            switch(dir) {
                case 'up': direction = {x: 0, y: -gridSize}; break;
                case 'down': direction = {x: 0, y: gridSize}; break;
                case 'left': direction = {x: -gridSize, y: 0}; break;
                case 'right': direction = {x: gridSize, y: 0}; break;
            }
        });
    });
    initSnakeGame();
    
    // Whack-a-Ghost Game
    const whackStartBtn = document.getElementById('whackStartBtn');
    if (whackStartBtn) {
        whackStartBtn.addEventListener('click', () => {
            if (!whackGameRunning) {
                startWhackGame();
            }
        });
    }
    document.querySelectorAll('.whack-hole').forEach(hole => {
        hole.addEventListener('click', () => {
            whackGhost(parseInt(hole.getAttribute('data-hole')));
        });
    });
    
    // Simon Says Game
    const simonStartBtn = document.getElementById('simonStartBtn');
    if (simonStartBtn) {
        simonStartBtn.addEventListener('click', () => {
            if (!simonGameRunning) {
                startSimonGame();
            }
        });
    }
    
    // Reaction Test Game
    const reactionStartBtn = document.getElementById('reactionStartBtn');
    const reactionTarget = document.getElementById('reactionTarget');
    if (reactionStartBtn) {
        reactionStartBtn.addEventListener('click', () => {
            reactionTimes = [];
            const timesEl = document.getElementById('reactionTimes');
            if (timesEl) timesEl.innerHTML = '';
            startReactionRound();
            reactionStartBtn.style.display = 'none';
        });
    }
    if (reactionTarget) {
        reactionTarget.addEventListener('click', handleReactionClick);
    }
    updateReactionDisplay();
    
    // Word Scramble Game
    const scrambleSubmitBtn = document.getElementById('scrambleSubmitBtn');
    const scrambleInput = document.getElementById('scrambleInput');
    const scrambleNextBtn = document.getElementById('scrambleNextBtn');
    if (scrambleSubmitBtn) {
        scrambleSubmitBtn.addEventListener('click', checkScrambleAnswer);
    }
    if (scrambleInput) {
        scrambleInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkScrambleAnswer();
        });
    }
    if (scrambleNextBtn) {
        scrambleNextBtn.addEventListener('click', startScrambleGame);
    }
    startScrambleGame();
    
    // Pumpkin Clicker Game
    const clickerPumpkin = document.getElementById('clickerPumpkin');
    if (clickerPumpkin) {
        clickerPumpkin.addEventListener('click', clickPumpkin);
    }
    updateClickerDisplay();
    
    // Pacman Game
    const pacmanStartBtn = document.getElementById('pacmanStartBtn');
    if (pacmanStartBtn) {
        pacmanStartBtn.addEventListener('click', startPacmanGame);
    }
    // Pacman direction buttons
    document.querySelectorAll('#pacman-game .direction-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!pacmanGameRunning) startPacmanGame();
            const dir = btn.getAttribute('data-direction');
            switch(dir) {
                case 'up': nextDirection = {row: -1, col: 0}; break;
                case 'down': nextDirection = {row: 1, col: 0}; break;
                case 'left': nextDirection = {row: 0, col: -1}; break;
                case 'right': nextDirection = {row: 0, col: 1}; break;
            }
        });
    });
    
    // Falling Candy Game
    const fallingStartBtn = document.getElementById('fallingStartBtn');
    if (fallingStartBtn) {
        fallingStartBtn.addEventListener('click', startFallingGame);
    }
    
    // Ghost Invaders Game
    const invadersStartBtn = document.getElementById('invadersStartBtn');
    const invadersShootBtn = document.getElementById('invadersShootBtn');
    if (invadersStartBtn) {
        invadersStartBtn.addEventListener('click', startInvadersGame);
    }
    if (invadersShootBtn) {
        invadersShootBtn.addEventListener('click', shootInvader);
    }

    // Shooter Game
    const shooterStartBtn = document.getElementById('shooterStartBtn');
    const shooterShootBtn = document.getElementById('shooterShootBtn');
    const shooterResetBtn = document.getElementById('shooterResetBtn');
    const shooterModeBtn = document.getElementById('shooterModeBtn');
    const shooterCanvasEl = document.getElementById('shooterCanvas');
    if (shooterStartBtn) shooterStartBtn.addEventListener('click', startShooterGame);
    if (shooterShootBtn) shooterShootBtn.addEventListener('click', () => shootBullet());
    if (shooterResetBtn) shooterResetBtn.addEventListener('click', resetShooterGame);
    if (shooterModeBtn) shooterModeBtn.addEventListener('click', toggleShooterMode);
    if (shooterCanvasEl) {
        let isMouseDown = false;
        const getPos = (clientX, clientY) => {
            const rect = shooterCanvasEl.getBoundingClientRect();
            return { x: clientX - rect.left, y: clientY - rect.top };
        };
        shooterCanvasEl.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            const p = getPos(e.clientX, e.clientY);
            shooterLastAim = p;
            startShooterAutoFire();
        });
        shooterCanvasEl.addEventListener('mousemove', (e) => {
            const p = getPos(e.clientX, e.clientY);
            shooterCrosshairPos = p;
            if (isMouseDown) shooterLastAim = p;
        });
        shooterCanvasEl.addEventListener('mouseup', () => {
            isMouseDown = false;
            stopShooterAutoFire();
        });
        shooterCanvasEl.addEventListener('mouseleave', () => {
            isMouseDown = false;
            stopShooterAutoFire();
            shooterCrosshairPos = null;
        });
        shooterCanvasEl.addEventListener('click', (e) => {
            const p = getPos(e.clientX, e.clientY);
            shooterCrosshairPos = p;
            shootBullet(p);
        });
        // Touch
        shooterCanvasEl.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const t = e.touches[0];
            const p = getPos(t.clientX, t.clientY);
            shooterLastAim = p;
            shooterCrosshairPos = p;
            startShooterAutoFire();
        }, { passive: false });
        shooterCanvasEl.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const t = e.touches[0];
            const p = getPos(t.clientX, t.clientY);
            shooterLastAim = p;
            shooterCrosshairPos = p;
        }, { passive: false });
        shooterCanvasEl.addEventListener('touchend', () => {
            stopShooterAutoFire();
            shooterCrosshairPos = null;
        });
    }
}

// Memory Match Game
const memoryEmojis = ['🎃', '👻', '🧙‍♀️', '🦇', '🕷️', '🧛', '🕸️', '🎭'];
let memoryCards = [];
let flippedCards = [];
let memoryMoves = 0;
let memoryPairsFound = 0;
let memoryLocked = false;

function initMemoryGame() {
    memoryCards = [...memoryEmojis, ...memoryEmojis].sort(() => Math.random() - 0.5);
    flippedCards = [];
    memoryMoves = 0;
    memoryPairsFound = 0;
    memoryLocked = false;
    
    document.getElementById('memoryMoves').textContent = '0';
    document.getElementById('memoryPairs').textContent = '0';
    document.getElementById('memoryStatus').textContent = '';
    
    const board = document.getElementById('memoryBoard');
    board.innerHTML = '';
    
    memoryCards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.setAttribute('data-index', index);
        card.setAttribute('data-emoji', emoji);
        card.innerHTML = '<div class="memory-card-back">?</div><div class="memory-card-front">' + emoji + '</div>';
        card.addEventListener('click', () => flipMemoryCard(card));
        board.appendChild(card);
    });
}

function flipMemoryCard(card) {
    if (memoryLocked || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        memoryLocked = true;
        memoryMoves++;
        document.getElementById('memoryMoves').textContent = memoryMoves;
        
        const [card1, card2] = flippedCards;
        const emoji1 = card1.getAttribute('data-emoji');
        const emoji2 = card2.getAttribute('data-emoji');
        
        if (emoji1 === emoji2) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            memoryPairsFound++;
            document.getElementById('memoryPairs').textContent = memoryPairsFound;
            
            if (memoryPairsFound === 8) {
                document.getElementById('memoryStatus').textContent = '🎉 You Win! All pairs found! 🎉';
                document.getElementById('memoryStatus').style.color = '#ffd700';
                createSparkles();
            } else {
                memoryLocked = false;
            }
            flippedCards = [];
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                memoryLocked = false;
                flippedCards = [];
            }, 1000);
        }
    }
}

// Memory game initialization moved to initializeAllGames()

// Rock Paper Scissors Game
const rpsChoices = ['🎃', '🧙‍♀️', '👻']; // Pumpkin, Witch, Ghost
const rpsNames = { '🎃': 'Pumpkin', '🧙‍♀️': 'Witch', '👻': 'Ghost' };
let rpsWins = 0;
let rpsLosses = 0;
let rpsTies = 0;

function playRPS(playerChoice) {
    const computerChoice = rpsChoices[Math.floor(Math.random() * rpsChoices.length)];
    
    document.getElementById('playerChoice').textContent = playerChoice;
    document.getElementById('computerChoice').textContent = computerChoice;
    
    let result = '';
    if (playerChoice === computerChoice) {
        result = "🤝 It's a Tie!";
        rpsTies++;
        document.getElementById('rpsStatus').textContent = result;
        document.getElementById('rpsStatus').style.color = '#ffb347';
    } else if (
        (playerChoice === '🎃' && computerChoice === '🧙‍♀️') ||
        (playerChoice === '🧙‍♀️' && computerChoice === '👻') ||
        (playerChoice === '👻' && computerChoice === '🎃')
    ) {
        result = '🎉 You Win!';
        rpsWins++;
        document.getElementById('rpsStatus').textContent = result;
        document.getElementById('rpsStatus').style.color = '#ffd700';
        createSparkles();
    } else {
        result = '💀 You Lose!';
        rpsLosses++;
        document.getElementById('rpsStatus').textContent = result;
        document.getElementById('rpsStatus').style.color = '#ff6b6b';
    }
    
    document.getElementById('rpsWins').textContent = rpsWins;
    document.getElementById('rpsLosses').textContent = rpsLosses;
    document.getElementById('rpsTies').textContent = rpsTies;
}

// RPS buttons moved to initializeAllGames()

// Number Guess Game
let targetNumber = 0;
let guessAttempts = 0;
let guessMin = 1;
let guessMax = 100;

function initGuessGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    guessAttempts = 0;
    guessMin = 1;
    guessMax = 100;
    document.getElementById('guessAttempts').textContent = '0';
    document.getElementById('guessRange').textContent = 'Range: 1 - 100';
    document.getElementById('guessStatus').textContent = 'Enter your guess!';
    document.getElementById('guessStatus').style.color = '';
    document.getElementById('guessHints').innerHTML = '';
    document.getElementById('guessInput').value = '';
}

function checkGuess() {
    const guess = parseInt(document.getElementById('guessInput').value);
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
        document.getElementById('guessStatus').textContent = '👻 Enter a number between 1 and 100!';
        document.getElementById('guessStatus').style.color = '#ff6b6b';
        return;
    }
    
    guessAttempts++;
    document.getElementById('guessAttempts').textContent = guessAttempts;
    
    const hintDiv = document.createElement('div');
    hintDiv.className = 'guess-hint';
    
    if (guess === targetNumber) {
        document.getElementById('guessStatus').textContent = `🎉 You Win! The number was ${targetNumber}!`;
        document.getElementById('guessStatus').style.color = '#ffd700';
        hintDiv.textContent = `✅ Correct! It took you ${guessAttempts} attempt${guessAttempts > 1 ? 's' : ''}!`;
        hintDiv.className += ' correct';
        createSparkles();
        document.getElementById('guessInput').disabled = true;
        setTimeout(() => {
            initGuessGame();
            document.getElementById('guessInput').disabled = false;
        }, 3000);
    } else if (guess < targetNumber) {
        if (guess > guessMin) guessMin = guess;
        document.getElementById('guessStatus').textContent = '📈 Too Low!';
        document.getElementById('guessStatus').style.color = '#87ceeb';
        hintDiv.textContent = `⬆️ Too low! Try higher (${guessMin + 1} - ${guessMax})`;
    } else {
        if (guess < guessMax) guessMax = guess;
        document.getElementById('guessStatus').textContent = '📉 Too High!';
        document.getElementById('guessStatus').style.color = '#ff6b6b';
        hintDiv.textContent = `⬇️ Too high! Try lower (${guessMin} - ${guessMax - 1})`;
    }
    
    document.getElementById('guessRange').textContent = `Range: ${guessMin} - ${guessMax}`;
    document.getElementById('guessHints').appendChild(hintDiv);
    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').focus();
}

// Guess game initialization moved to initializeAllGames()

// Snake Game - Initialize after DOM loads
let snakeCanvas, snakeCtx;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSnakeGameVars);
} else {
    initSnakeGameVars();
}

// Snake game shared state
const gridSize = 20;
let snake = [{x: 200, y: 200}];
let direction = {x: 0, y: 0};
let food = {};
let snakeScore = 0;
let snakeGameRunning = false;
let gameLoop = null;

function initSnakeGameVars() {
    snakeCanvas = document.getElementById('snakeCanvas');
    if (!snakeCanvas) return;
    snakeCtx = snakeCanvas.getContext('2d');
	}

function initSnakeGame() {
    snake = [{x: 200, y: 200}];
    direction = {x: 0, y: 0};
    snakeScore = 0;
    generateFood();
    updateSnakeDisplay();
}

function generateFood() {
    if (!snakeCanvas) return;
    food = {
        x: Math.floor(Math.random() * (snakeCanvas.width / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (snakeCanvas.height / gridSize)) * gridSize
    };
}

function updateSnakeDisplay() {
    document.getElementById('snakeScore').textContent = snakeScore;
    document.getElementById('snakeLength').textContent = snake.length;
}

function drawSnake() {
    if (!snakeCtx || !snakeCanvas) return;
    snakeCtx.fillStyle = '#32cd32'; // Green for snake body
    snake.forEach((segment, index) => {
        if (index === 0) {
            snakeCtx.fillStyle = '#ffd700'; // Gold for head
        } else {
            snakeCtx.fillStyle = '#32cd32';
        }
        snakeCtx.fillRect(segment.x, segment.y, gridSize - 2, gridSize - 2);
    });
}

function drawFood() {
    if (!snakeCtx) return;
    snakeCtx.font = '16px Arial';
    snakeCtx.textAlign = 'center';
    snakeCtx.textBaseline = 'middle';
    snakeCtx.fillText('🎃', food.x + gridSize / 2, food.y + gridSize / 2);
}

function moveSnake() {
    if (!snakeCanvas) return;
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
    
    // Wall collision
    if (head.x < 0 || head.x >= snakeCanvas.width || head.y < 0 || head.y >= snakeCanvas.height) {
        endSnakeGame();
        return;
    }
    
    // Self collision
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endSnakeGame();
        return;
    }
    
    snake.unshift(head);
    
    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        snakeScore += 10;
        updateSnakeDisplay();
        generateFood();
    } else {
        snake.pop();
    }
}

function draw() {
    if (!snakeCtx || !snakeCanvas) return;
    snakeCtx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    drawFood();
    drawSnake();
    moveSnake();
}

function startSnakeGame() {
    if (snakeGameRunning) return;
    initSnakeGame();
    snakeGameRunning = true;
    document.getElementById('snakeStatus').textContent = 'Playing...';
    gameLoop = setInterval(draw, 150);
}

function endSnakeGame() {
    snakeGameRunning = false;
    clearInterval(gameLoop);
    document.getElementById('snakeStatus').textContent = `Game Over! Final Score: ${snakeScore}`;
    document.getElementById('snakeStatus').style.color = '#ff6b6b';
}

function resetSnakeGame() {
    endSnakeGame();
    initSnakeGame();
    snakeCtx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    document.getElementById('snakeStatus').textContent = 'Press Start to play!';
    document.getElementById('snakeStatus').style.color = '';
}

// Snake game initialization moved to initializeAllGames()

// Keyboard controls for Snake
document.addEventListener('keydown', (e) => {
    if (!snakeGameRunning) return;
    switch(e.key) {
        case 'ArrowUp': e.preventDefault(); direction = {x: 0, y: -gridSize}; break;
        case 'ArrowDown': e.preventDefault(); direction = {x: 0, y: gridSize}; break;
        case 'ArrowLeft': e.preventDefault(); direction = {x: -gridSize, y: 0}; break;
        case 'ArrowRight': e.preventDefault(); direction = {x: gridSize, y: 0}; break;
    }
});

// Whack-a-Ghost Game
let whackHoles = [];
let activeGhost = null;
let whackScore = 0;
let whackTimeLeft = 30;
let whackGameRunning = false;
let whackInterval = null;
let whackTimer = null;

function initWhackGame() {
    whackHoles = Array(9).fill(null);
    activeGhost = null;
    whackScore = 0;
    whackTimeLeft = 30;
    document.getElementById('whackScore').textContent = '0';
    document.getElementById('whackTime').textContent = '30';
    document.getElementById('whackStatus').textContent = '';
    document.querySelectorAll('.whack-hole').forEach(hole => {
        hole.innerHTML = '';
        hole.classList.remove('ghost-active');
    });
}

function showRandomGhost() {
    if (activeGhost !== null) {
        const prevHole = document.querySelector(`[data-hole="${activeGhost}"]`);
        prevHole.innerHTML = '';
        prevHole.classList.remove('ghost-active');
    }
    
    const randomHole = Math.floor(Math.random() * 9);
    activeGhost = randomHole;
    const hole = document.querySelector(`[data-hole="${randomHole}"]`);
    hole.innerHTML = '👻';
    hole.classList.add('ghost-active');
    
    setTimeout(() => {
        if (activeGhost === randomHole && whackGameRunning) {
            hole.innerHTML = '';
            hole.classList.remove('ghost-active');
            showRandomGhost();
        }
    }, 1500);
}

function whackGhost(holeIndex) {
    if (!whackGameRunning) return;
    const hole = document.querySelector(`[data-hole="${holeIndex}"]`);
    
    if (holeIndex === activeGhost && hole.classList.contains('ghost-active')) {
        whackScore += 10;
        document.getElementById('whackScore').textContent = whackScore;
        hole.innerHTML = '💥';
        hole.classList.remove('ghost-active');
        activeGhost = null;
        setTimeout(() => {
            hole.innerHTML = '';
            if (whackGameRunning) showRandomGhost();
        }, 300);
        createSparkles();
    }
}

function startWhackGame() {
    if (whackGameRunning) return;
    initWhackGame();
    whackGameRunning = true;
    document.getElementById('whackStatus').textContent = 'Game Started! Whack those ghosts!';
    document.getElementById('whackStatus').style.color = '#ffd700';
    
    showRandomGhost();
    whackInterval = setInterval(() => {
        if (activeGhost === null) showRandomGhost();
    }, 2000);
    
    whackTimer = setInterval(() => {
        whackTimeLeft--;
        document.getElementById('whackTime').textContent = whackTimeLeft;
        
        if (whackTimeLeft <= 0) {
            endWhackGame();
        }
    }, 1000);
}

function endWhackGame() {
    whackGameRunning = false;
    clearInterval(whackInterval);
    clearInterval(whackTimer);
    document.getElementById('whackStatus').textContent = `Time's Up! Final Score: ${whackScore}`;
    document.getElementById('whackStatus').style.color = '#ff6b6b';
    if (activeGhost !== null) {
        const hole = document.querySelector(`[data-hole="${activeGhost}"]`);
        hole.innerHTML = '';
        hole.classList.remove('ghost-active');
    }
}

// Whack-a-Ghost initialization moved to initializeAllGames()

// Simon Says Game
const simonColors = ['red', 'green', 'blue', 'yellow'];
const simonEmojis = {red: '🎃', green: '👻', blue: '🧙‍♀️', yellow: '🦇'};
let simonSequence = [];
let simonPlayerSequence = [];
let simonRound = 0;
let simonBest = parseInt(localStorage.getItem('simonBest')) || 0;
let simonGameRunning = false;
let simonPlayingSequence = false;

function initSimonGame() {
    simonSequence = [];
    simonPlayerSequence = [];
    simonRound = 0;
    document.getElementById('simonRound').textContent = '0';
    document.getElementById('simonBest').textContent = simonBest;
    document.getElementById('simonStatus').textContent = '';
}

function playSequence() {
    simonPlayingSequence = true;
    let i = 0;
    const playNext = () => {
        if (i < simonSequence.length) {
            const color = simonSequence[i];
            const btn = document.getElementById(`simon-${color}`);
            btn.classList.add('simon-active');
            setTimeout(() => {
                btn.classList.remove('simon-active');
                i++;
                setTimeout(playNext, 300);
            }, 500);
        } else {
            simonPlayingSequence = false;
            document.getElementById('simonStatus').textContent = 'Your turn! Repeat the sequence!';
        }
    };
    playNext();
}

function addToSequence() {
    const randomColor = simonColors[Math.floor(Math.random() * simonColors.length)];
    simonSequence.push(randomColor);
}

function startSimonGame() {
    initSimonGame();
    simonGameRunning = true;
    simonRound++;
    document.getElementById('simonRound').textContent = simonRound;
    addToSequence();
    document.getElementById('simonStatus').textContent = 'Watch the sequence...';
    setTimeout(() => playSequence(), 1000);
}

function checkPlayerInput(color) {
    if (simonPlayingSequence || !simonGameRunning) return;
    
    simonPlayerSequence.push(color);
    const btn = document.getElementById(`simon-${color}`);
    btn.classList.add('simon-active');
    setTimeout(() => btn.classList.remove('simon-active'), 200);
    
    const expectedColor = simonSequence[simonPlayerSequence.length - 1];
    
    if (color !== expectedColor) {
        // Game over
        simonGameRunning = false;
        if (simonRound > simonBest) {
            simonBest = simonRound;
            localStorage.setItem('simonBest', simonBest);
            document.getElementById('simonBest').textContent = simonBest;
        }
        document.getElementById('simonStatus').textContent = `Wrong! You reached round ${simonRound}`;
        document.getElementById('simonStatus').style.color = '#ff6b6b';
    } else if (simonPlayerSequence.length === simonSequence.length) {
        // Round complete
        simonPlayerSequence = [];
        simonRound++;
        document.getElementById('simonRound').textContent = simonRound;
        document.getElementById('simonStatus').textContent = 'Correct! Next round...';
        document.getElementById('simonStatus').style.color = '#ffd700';
        addToSequence();
        setTimeout(() => {
            document.getElementById('simonStatus').textContent = 'Watch the sequence...';
            playSequence();
        }, 1000);
        createSparkles();
    }
}

document.querySelectorAll('.simon-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const color = btn.getAttribute('data-color');
        checkPlayerInput(color);
    });
});

// Simon Says initialization moved to initializeAllGames()

// Reaction Test Game
let reactionTimes = [];
let reactionStartTime = 0;
let reactionWaiting = false;
let reactionActive = false;

function getReactionBest() {
    const best = localStorage.getItem('reactionBest');
    return best ? parseInt(best) : null;
}

function setReactionBest(time) {
    localStorage.setItem('reactionBest', time);
}

function getAverageReaction() {
    if (reactionTimes.length === 0) return null;
    const sum = reactionTimes.reduce((a, b) => a + b, 0);
    return Math.round(sum / reactionTimes.length);
}

function updateReactionDisplay() {
    const best = getReactionBest();
    document.getElementById('reactionBest').textContent = best ? `${best}ms` : '--';
    const avg = getAverageReaction();
    document.getElementById('reactionAvg').textContent = avg ? `${avg}ms` : '--';
}

function startReactionRound() {
    reactionWaiting = true;
    reactionActive = false;
    const target = document.getElementById('reactionTarget');
    target.textContent = 'Wait...';
    target.style.display = 'none';
    target.classList.remove('ready', 'click-now');
    
    document.getElementById('reactionStatus').textContent = 'Wait for the ghost to appear...';
    document.getElementById('reactionStatus').style.color = '#87ceeb';
    
    const waitTime = Math.random() * 3000 + 2000; // 2-5 seconds
    
    setTimeout(() => {
        if (reactionWaiting) {
            target.style.display = 'flex';
            target.textContent = '👻';
            target.classList.add('click-now');
            reactionActive = true;
            reactionStartTime = Date.now();
            document.getElementById('reactionStatus').textContent = 'CLICK NOW!';
            document.getElementById('reactionStatus').style.color = '#ffd700';
        }
    }, waitTime);
}

function handleReactionClick() {
    if (!reactionActive) {
        document.getElementById('reactionStatus').textContent = 'Too early! Wait for the ghost!';
        document.getElementById('reactionStatus').style.color = '#ff6b6b';
        return;
    }
    
    const reactionTime = Date.now() - reactionStartTime;
    reactionTimes.push(reactionTime);
    
    const best = getReactionBest();
    if (!best || reactionTime < best) {
        setReactionBest(reactionTime);
    }
    
    updateReactionDisplay();
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'reaction-time-item';
    timeDiv.textContent = `${reactionTime}ms`;
    if (reactionTime < 200) {
        timeDiv.style.color = '#ffd700';
        timeDiv.textContent += ' ⚡ Amazing!';
    } else if (reactionTime < 400) {
        timeDiv.style.color = '#32cd32';
        timeDiv.textContent += ' ✨ Great!';
    }
    document.getElementById('reactionTimes').prepend(timeDiv);
    
    if (document.getElementById('reactionTimes').children.length > 5) {
        document.getElementById('reactionTimes').lastChild.remove();
    }
    
    document.getElementById('reactionStatus').textContent = `Reaction time: ${reactionTime}ms`;
    document.getElementById('reactionStatus').style.color = '#ffd700';
    createSparkles();
    
    reactionActive = false;
    const target = document.getElementById('reactionTarget');
    target.classList.remove('click-now');
    target.textContent = 'Click to try again!';
    
    setTimeout(() => {
        startReactionRound();
    }, 2000);
}

// Reaction test initialization moved to initializeAllGames()

// Word Scramble Game
const halloweenWords = [
    {word: 'PUMPKIN', hint: 'Orange fruit used for carving 🎃'},
    {word: 'GHOST', hint: 'Spirit that haunts 👻'},
    {word: 'WITCH', hint: 'Magic user with a broom 🧙‍♀️'},
    {word: 'VAMPIRE', hint: 'Blood-sucking creature 🧛'},
    {word: 'SPIDER', hint: 'Eight-legged creature 🕷️'},
    {word: 'BAT', hint: 'Flying mammal 🦇'},
    {word: 'CANDY', hint: 'Sweet treats 🍬'},
    {word: 'SKELETON', hint: 'Bones 🦴'},
    {word: 'ZOMBIE', hint: 'Undead creature 🧟'},
    {word: 'MONSTER', hint: 'Scary creature 👹'},
    {word: 'HAUNTED', hint: 'Ghost-ridden 👻'},
    {word: 'SCARY', hint: 'Frightening 😨'},
    {word: 'COSTUME', hint: 'What you wear on Halloween 🎭'},
    {word: 'TRICK', hint: 'Part of trick-or-treat 🎃'},
    {word: 'TREAT', hint: 'The good part of Halloween 🍬'}
];

let currentScrambleWord = null;
let scrambleScore = 0;
let scrambleStreak = 0;

function scrambleString(str) {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}

function startScrambleGame() {
    const randomIndex = Math.floor(Math.random() * halloweenWords.length);
    currentScrambleWord = halloweenWords[randomIndex];
    const scrambled = scrambleString(currentScrambleWord.word);
    
    document.getElementById('scrambledWord').textContent = scrambled;
    document.getElementById('scrambleHint').textContent = currentScrambleWord.hint;
    document.getElementById('scrambleInput').value = '';
    document.getElementById('scrambleResult').textContent = '';
    document.getElementById('scrambleStatus').textContent = 'Can you unscramble this word?';
    document.getElementById('scrambleStatus').style.color = '';
    document.getElementById('scrambleInput').focus();
}

function checkScrambleAnswer() {
    const answer = document.getElementById('scrambleInput').value.trim().toUpperCase();
    
    if (answer === currentScrambleWord.word) {
        scrambleScore += 10;
        scrambleStreak++;
        document.getElementById('scrambleScore').textContent = scrambleScore;
        document.getElementById('scrambleStreak').textContent = scrambleStreak;
        document.getElementById('scrambleResult').textContent = '🎉 Correct! Great job! 🎉';
        document.getElementById('scrambleResult').style.color = '#ffd700';
        document.getElementById('scrambleStatus').textContent = 'Well done!';
        document.getElementById('scrambleStatus').style.color = '#ffd700';
        createSparkles();
        
        setTimeout(() => {
            startScrambleGame();
        }, 2000);
    } else {
        scrambleStreak = 0;
        document.getElementById('scrambleStreak').textContent = '0';
        document.getElementById('scrambleResult').textContent = '❌ Wrong! Try again!';
        document.getElementById('scrambleResult').style.color = '#ff6b6b';
        document.getElementById('scrambleStatus').textContent = 'Keep trying!';
        document.getElementById('scrambleStatus').style.color = '#ff6b6b';
    }
}

// Word scramble initialization moved to initializeAllGames()

// Pumpkin Clicker Game
let clickerCandy = 0;
let clickerPower = 1;
let clickerUpgrades = [
    {name: 'Double Click', cost: 10, power: 2, emoji: '✌️'},
    {name: 'Triple Click', cost: 50, power: 3, emoji: '👌'},
    {name: 'Mega Click', cost: 200, power: 5, emoji: '💪'},
    {name: 'Super Click', cost: 500, power: 10, emoji: '🔥'},
    {name: 'Ultra Click', cost: 2000, power: 25, emoji: '⚡'},
    {name: 'Legendary Click', cost: 10000, power: 100, emoji: '👑'}
];
let clickerPurchased = [];

function updateClickerDisplay() {
    document.getElementById('clickerCandy').textContent = clickerCandy;
    document.getElementById('clickerPower').textContent = clickerPower;
    
    const upgradeList = document.getElementById('upgradeList');
    upgradeList.innerHTML = '';
    
    clickerUpgrades.forEach((upgrade, index) => {
        if (clickerPurchased.includes(index)) return;
        
        const upgradeDiv = document.createElement('div');
        upgradeDiv.className = 'upgrade-item';
        if (clickerCandy < upgrade.cost) {
            upgradeDiv.classList.add('disabled');
        }
        
        upgradeDiv.innerHTML = `
            <div class="upgrade-info">
                <span class="upgrade-emoji">${upgrade.emoji}</span>
                <div>
                    <div class="upgrade-name">${upgrade.name}</div>
                    <div class="upgrade-desc">+${upgrade.power} candy per click</div>
                </div>
            </div>
            <button class="upgrade-btn" data-index="${index}">
                Buy: ${upgrade.cost} 🍬
            </button>
        `;
        
        upgradeList.appendChild(upgradeDiv);
    });
}

function clickPumpkin() {
    clickerCandy += clickerPower;
    updateClickerDisplay();
    
    const pumpkin = document.getElementById('clickerPumpkin');
    pumpkin.style.animation = 'pumpkinClick 0.2s ease';
    setTimeout(() => {
        pumpkin.style.animation = '';
    }, 200);
    
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'clicker-score-pop';
    scoreDisplay.textContent = `+${clickerPower} 🍬`;
    document.getElementById('clickerScoreDisplay').appendChild(scoreDisplay);
    
    setTimeout(() => {
        scoreDisplay.remove();
    }, 1000);
    
    if (clickerCandy >= 100 && clickerCandy - clickerPower < 100) {
        document.getElementById('clickerStatus').textContent = '🎉 You reached 100 candy! 🎉';
        createSparkles();
    }
}

function buyUpgrade(index) {
    const upgrade = clickerUpgrades[index];
    if (clickerCandy >= upgrade.cost && !clickerPurchased.includes(index)) {
        clickerCandy -= upgrade.cost;
        clickerPower += upgrade.power;
        clickerPurchased.push(index);
        updateClickerDisplay();
        document.getElementById('clickerStatus').textContent = `Upgrade purchased: ${upgrade.name}!`;
        document.getElementById('clickerStatus').style.color = '#ffd700';
        createSparkles();
        setTimeout(() => {
            document.getElementById('clickerStatus').textContent = 'Keep clicking!';
            document.getElementById('clickerStatus').style.color = '';
        }, 2000);
    }
}

// Pumpkin clicker initialization moved to initializeAllGames()

// Clicker upgrade button handler
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('upgrade-btn')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        buyUpgrade(index);
    }
});

// Pacman Game
const pacmanCanvas = document.getElementById('pacmanCanvas');
const pacmanCtx = pacmanCanvas ? pacmanCanvas.getContext('2d') : null;
const cellSize = 20;
let pacmanGrid = [];
let pacmanPos = {row: 1, col: 1};
let pacmanDirection = {row: 0, col: 0};
let nextDirection = {row: 0, col: 0};
let pacmanScore = 0;
let pacmanCandyCount = 0;
let pacmanGameRunning = false;
let pacmanGameLoop = null;
let pacmanEnemies = [];
let pacmanEnemyDirections = [];

// Create a simple maze
function createPacmanMaze() {
    // Simple maze: 0 = wall, 1 = path with candy, 2 = path without candy
    const mazeTemplate = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0],
        [0,1,1,1,1,1,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0],
        [0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0],
        [0,0,0,1,0,1,0,1,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,1,0,0,0,0,0],
        [0,1,1,1,1,1,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];
    
    pacmanGrid = mazeTemplate.map(row => [...row]);
    pacmanCandyCount = 0;
    pacmanGrid.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell === 1) pacmanCandyCount++;
        });
    });
    document.getElementById('pacmanCandy').textContent = pacmanCandyCount;
}

function initPacmanEnemies() {
    pacmanEnemies = [];
    pacmanEnemyDirections = [];
    if (!pacmanGrid || pacmanGrid.length === 0) return;
    const rows = pacmanGrid.length;
    const cols = pacmanGrid[0].length;
    const candidateSpots = [];
    for (let r = 1; r < rows - 1; r++) {
        for (let c = 1; c < cols - 1; c++) {
            if (pacmanGrid[r][c] !== 0) {
                const dist = Math.abs(r - pacmanPos.row) + Math.abs(c - pacmanPos.col);
                if (dist > 8) candidateSpots.push({row: r, col: c, dist});
            }
        }
    }
    candidateSpots.sort((a, b) => b.dist - a.dist);
    const count = Math.min(3, candidateSpots.length);
    for (let i = 0; i < count; i++) {
        const spot = candidateSpots[i * Math.floor(candidateSpots.length / count)];
        pacmanEnemies.push({row: spot.row, col: spot.col});
        pacmanEnemyDirections.push({row: 0, col: 0});
    }
}

function drawPacmanMaze() {
    pacmanCtx.clearRect(0, 0, pacmanCanvas.width, pacmanCanvas.height);
    
    const rows = pacmanGrid.length;
    const cols = pacmanGrid[0].length;
    const cellWidth = pacmanCanvas.width / cols;
    const cellHeight = pacmanCanvas.height / rows;
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const x = j * cellWidth;
            const y = i * cellHeight;
            
            if (pacmanGrid[i][j] === 0) {
                pacmanCtx.fillStyle = '#4a148c';
                pacmanCtx.fillRect(x, y, cellWidth, cellHeight);
            } else {
                pacmanCtx.fillStyle = '#000';
                pacmanCtx.fillRect(x, y, cellWidth, cellHeight);
                
                if (pacmanGrid[i][j] === 1) {
                    pacmanCtx.font = `${Math.min(cellWidth, cellHeight) * 0.6}px Arial`;
                    pacmanCtx.textAlign = 'center';
                    pacmanCtx.textBaseline = 'middle';
                    pacmanCtx.fillText('🎃', x + cellWidth / 2, y + cellHeight / 2);
                }
            }
        }
    }
    
    // Draw player (ghost)
    const playerX = pacmanPos.col * cellWidth + cellWidth / 2;
    const playerY = pacmanPos.row * cellHeight + cellHeight / 2;
    pacmanCtx.font = `${Math.min(cellWidth, cellHeight) * 0.8}px Arial`;
    pacmanCtx.textAlign = 'center';
    pacmanCtx.textBaseline = 'middle';
    pacmanCtx.fillText('👻', playerX, playerY);

    // Draw enemies
    pacmanEnemies.forEach(enemy => {
        const ex = enemy.col * cellWidth + cellWidth / 2;
        const ey = enemy.row * cellHeight + cellHeight / 2;
        pacmanCtx.fillText('💀', ex, ey);
    });
}

function movePacman() {
    // Try next direction first
    if (nextDirection.row !== 0 || nextDirection.col !== 0) {
        const newRow = pacmanPos.row + nextDirection.row;
        const newCol = pacmanPos.col + nextDirection.col;
        
        if (newRow >= 0 && newRow < pacmanGrid.length && 
            newCol >= 0 && newCol < pacmanGrid[0].length && 
            pacmanGrid[newRow][newCol] !== 0) {
            pacmanDirection = {row: nextDirection.row, col: nextDirection.col};
            nextDirection = {row: 0, col: 0};
        }
    }
    
    const newRow = pacmanPos.row + pacmanDirection.row;
    const newCol = pacmanPos.col + pacmanDirection.col;
    
    if (newRow >= 0 && newRow < pacmanGrid.length && 
        newCol >= 0 && newCol < pacmanGrid[0].length && 
        pacmanGrid[newRow][newCol] !== 0) {
        
        pacmanPos.row = newRow;
        pacmanPos.col = newCol;
        
        if (pacmanGrid[newRow][newCol] === 1) {
            pacmanGrid[newRow][newCol] = 2;
            pacmanScore += 10;
            pacmanCandyCount--;
            document.getElementById('pacmanScore').textContent = pacmanScore;
            document.getElementById('pacmanCandy').textContent = pacmanCandyCount;
            
            if (pacmanCandyCount === 0) {
                endPacmanGame(true);
            }
        }
    }
}

function movePacmanEnemies() {
    if (!pacmanGrid || pacmanGrid.length === 0) return;
    const dirs = [
        {row: -1, col: 0},
        {row: 1, col: 0},
        {row: 0, col: -1},
        {row: 0, col: 1}
    ];
    pacmanEnemies.forEach((enemy, idx) => {
        // Prefer directions that reduce Manhattan distance to Pacman
        const ranked = dirs.slice().sort((a, b) => {
            const da = Math.abs((enemy.row + a.row) - pacmanPos.row) + Math.abs((enemy.col + a.col) - pacmanPos.col);
            const db = Math.abs((enemy.row + b.row) - pacmanPos.row) + Math.abs((enemy.col + b.col) - pacmanPos.col);
            return da - db;
        });
        let moved = false;
        for (const tryDir of ranked) {
            const nr = enemy.row + tryDir.row;
            const nc = enemy.col + tryDir.col;
            if (nr >= 0 && nr < pacmanGrid.length && nc >= 0 && nc < pacmanGrid[0].length && pacmanGrid[nr][nc] !== 0) {
                // avoid immediate back-and-forth
                const prev = pacmanEnemyDirections[idx];
                if (!(prev.row === -tryDir.row && prev.col === -tryDir.col)) {
                    enemy.row = nr;
                    enemy.col = nc;
                    pacmanEnemyDirections[idx] = tryDir;
                    moved = true;
                    break;
                }
            }
        }
        // If couldn't move by chase preference, try any valid dir
        if (!moved) {
            for (const tryDir of dirs) {
                const nr = enemy.row + tryDir.row;
                const nc = enemy.col + tryDir.col;
                if (nr >= 0 && nr < pacmanGrid.length && nc >= 0 && nc < pacmanGrid[0].length && pacmanGrid[nr][nc] !== 0) {
                    enemy.row = nr;
                    enemy.col = nc;
                    pacmanEnemyDirections[idx] = tryDir;
                    break;
                }
            }
        }
    });
}

function gamePacmanLoop() {
    movePacman();
    movePacmanEnemies();
    // Collision detection
    if (pacmanEnemies.some(e => e.row === pacmanPos.row && e.col === pacmanPos.col)) {
        endPacmanGame(false);
        return;
    }
    drawPacmanMaze();
}

function startPacmanGame() {
    if (!pacmanCanvas || pacmanGameRunning) return;
    createPacmanMaze();
    pacmanPos = {row: 1, col: 1};
    pacmanDirection = {row: 0, col: 0};
    nextDirection = {row: 0, col: 0};
    pacmanScore = 0;
    pacmanGameRunning = true;
    const scoreEl = document.getElementById('pacmanScore');
    const statusEl = document.getElementById('pacmanStatus');
    if (scoreEl) scoreEl.textContent = '0';
    if (statusEl) statusEl.textContent = 'Playing...';
    initPacmanEnemies();
    pacmanGameLoop = setInterval(gamePacmanLoop, 150);
    drawPacmanMaze();
}

function endPacmanGame(won = false) {
    pacmanGameRunning = false;
    clearInterval(pacmanGameLoop);
    const statusEl = document.getElementById('pacmanStatus');
    if (!statusEl) return;
    if (won) {
        statusEl.textContent = `🎉 You Win! Score: ${pacmanScore} 🎉`;
        statusEl.style.color = '#ffd700';
        createSparkles();
    } else {
        statusEl.textContent = `Game Over! Score: ${pacmanScore}`;
        statusEl.style.color = '#ff6b6b';
    }
}

// Pacman initialization moved to initializeAllGames()

// Pacman keyboard controls
document.addEventListener('keydown', (e) => {
    if (!pacmanCanvas || !pacmanGameRunning) return;
    if (pacmanCanvas.parentElement && pacmanCanvas.parentElement.classList.contains('active')) {
        switch(e.key) {
            case 'ArrowUp': e.preventDefault(); nextDirection = {row: -1, col: 0}; break;
            case 'ArrowDown': e.preventDefault(); nextDirection = {row: 1, col: 0}; break;
            case 'ArrowLeft': e.preventDefault(); nextDirection = {row: 0, col: -1}; break;
            case 'ArrowRight': e.preventDefault(); nextDirection = {row: 0, col: 1}; break;
        }
    }
});

// Falling Candy Game - Initialize after DOM loads
let fallingCanvas, fallingCtx;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFallingGame);
} else {
    initFallingGame();
}

let fallingPlayer = {x: 200, width: 60};
let fallingObjects = [];
let fallingScore = 0;
let fallingLives = 3;
let fallingGameRunning = false;
let fallingInterval = null;
let fallingKeys = {left: false, right: false};

function initFallingGame() {
    fallingCanvas = document.getElementById('fallingCanvas');
    if (!fallingCanvas) return;
    fallingCtx = fallingCanvas.getContext('2d');
    fallingPlayer.x = fallingCanvas.width / 2 - 30;
}

function spawnFallingObject() {
    const types = Math.random() < 0.8 ? ['🍬', '🍭', '🎃'] : ['🕷️'];
    fallingObjects.push({
        x: Math.random() * (fallingCanvas.width - 40),
        y: -40,
        speed: Math.random() * 2 + 1,
        type: types[Math.floor(Math.random() * types.length)]
    });
}

function updateFallingObjects() {
    fallingObjects.forEach((obj, index) => {
        obj.y += obj.speed;
        
        if (obj.y > fallingCanvas.height) {
            if (obj.type === '🕷️') {
                fallingLives--;
                document.getElementById('fallingLives').textContent = fallingLives;
                if (fallingLives <= 0) {
                    endFallingGame();
                }
            }
            fallingObjects.splice(index, 1);
        } else if (
            obj.x < fallingPlayer.x + fallingPlayer.width &&
            obj.x + 40 > fallingPlayer.x &&
            obj.y < fallingCanvas.height - 20 &&
            obj.y + 40 > fallingCanvas.height - 30
        ) {
            if (obj.type !== '🕷️') {
                fallingScore += obj.type === '🎃' ? 20 : 10;
                document.getElementById('fallingScore').textContent = fallingScore;
            } else {
                fallingLives--;
                document.getElementById('fallingLives').textContent = fallingLives;
                if (fallingLives <= 0) {
                    endFallingGame();
                }
            }
            fallingObjects.splice(index, 1);
        }
    });
}

function drawFallingGame() {
    fallingCtx.clearRect(0, 0, fallingCanvas.width, fallingCanvas.height);
    
    // Draw basket
    fallingCtx.font = '3rem Arial';
    fallingCtx.textAlign = 'center';
    fallingCtx.fillText('🧺', fallingPlayer.x + fallingPlayer.width / 2, fallingCanvas.height - 15);
    
    // Draw falling objects
    fallingObjects.forEach(obj => {
        fallingCtx.font = '2.5rem Arial';
        fallingCtx.textAlign = 'center';
        fallingCtx.fillText(obj.type, obj.x + 20, obj.y + 30);
    });
}

function runFallingLoop() {
    if (fallingKeys.left && fallingPlayer.x > 0) {
        fallingPlayer.x -= 5;
    }
    if (fallingKeys.right && fallingPlayer.x < fallingCanvas.width - fallingPlayer.width) {
        fallingPlayer.x += 5;
    }
    
    updateFallingObjects();
    drawFallingGame();
    
    if (Math.random() < 0.05) {
        spawnFallingObject();
    }
}

function startFallingGame() {
    if (fallingGameRunning) return;
    fallingObjects = [];
    fallingPlayer.x = fallingCanvas.width / 2 - 30;
    fallingScore = 0;
    fallingLives = 3;
    fallingGameRunning = true;
    document.getElementById('fallingScore').textContent = '0';
    document.getElementById('fallingLives').textContent = '3';
    document.getElementById('fallingStatus').textContent = 'Catch the candy!';
    fallingInterval = setInterval(runFallingLoop, 20);
    spawnFallingObject();
}

function endFallingGame() {
    fallingGameRunning = false;
    clearInterval(fallingInterval);
    document.getElementById('fallingStatus').textContent = `Game Over! Final Score: ${fallingScore}`;
    document.getElementById('fallingStatus').style.color = '#ff6b6b';
}

// Falling candy initialization moved to initializeAllGames()

document.addEventListener('keydown', (e) => {
    if (!fallingCanvas || !fallingCanvas.parentElement || !fallingCanvas.parentElement.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); fallingKeys.left = true; }
    if (e.key === 'ArrowRight') { e.preventDefault(); fallingKeys.right = true; }
});

document.addEventListener('keyup', (e) => {
    if (!fallingCanvas || !fallingCanvas.parentElement || !fallingCanvas.parentElement.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') fallingKeys.left = false;
    if (e.key === 'ArrowRight') fallingKeys.right = false;
});

document.querySelectorAll('#falling-game .direction-btn').forEach(btn => {
    btn.addEventListener('mousedown', () => {
        const action = btn.getAttribute('data-action');
        if (action === 'left') fallingKeys.left = true;
        if (action === 'right') fallingKeys.right = true;
    });
    btn.addEventListener('mouseup', () => {
        const action = btn.getAttribute('data-action');
        if (action === 'left') fallingKeys.left = false;
        if (action === 'right') fallingKeys.right = false;
    });
    btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const action = btn.getAttribute('data-action');
        if (action === 'left') fallingKeys.left = true;
        if (action === 'right') fallingKeys.right = true;
    });
    btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        fallingKeys.left = false;
        fallingKeys.right = false;
    });
});

// Ghost Invaders Game - Initialize after DOM loads
let invadersCanvas, invadersCtx;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInvadersGame);
} else {
    initInvadersGame();
}

let invadersPlayer = {x: 300, y: 450, width: 50};
let invadersBullets = [];
let invadersEnemies = [];
let invadersScore = 0;
let invadersWave = 1;
let invadersGameRunning = false;
let invadersInterval = null;
let invadersMoveDirection = 0;

function initInvadersGame() {
    invadersCanvas = document.getElementById('invadersCanvas');
    if (!invadersCanvas) return;
    invadersCtx = invadersCanvas.getContext('2d');
    invadersPlayer.x = invadersCanvas.width / 2 - 25;
    invadersPlayer.y = invadersCanvas.height - 50;
}

function createInvadersWave() {
    invadersEnemies = [];
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 8; col++) {
            invadersEnemies.push({
                x: col * 70 + 50,
                y: row * 60 + 50,
                alive: true
            });
        }
    }
}

function drawInvadersGame() {
    invadersCtx.clearRect(0, 0, invadersCanvas.width, invadersCanvas.height);
    
    // Draw player
    invadersCtx.font = '3rem Arial';
    invadersCtx.textAlign = 'center';
    invadersCtx.fillText('🎃', invadersPlayer.x + invadersPlayer.width / 2, invadersPlayer.y);
    
    // Draw bullets
    invadersBullets.forEach(bullet => {
        invadersCtx.font = '1.5rem Arial';
        invadersCtx.fillText('💥', bullet.x, bullet.y);
    });
    
    // Draw enemies
    invadersEnemies.forEach(enemy => {
        if (enemy.alive) {
            invadersCtx.font = '2.5rem Arial';
            invadersCtx.fillText('👻', enemy.x, enemy.y);
        }
    });
}

function updateInvadersGame() {
    // Move player
    invadersPlayer.x += invadersMoveDirection * 3;
    if (invadersPlayer.x < 0) invadersPlayer.x = 0;
    if (invadersPlayer.x > invadersCanvas.width - invadersPlayer.width) {
        invadersPlayer.x = invadersCanvas.width - invadersPlayer.width;
    }
    
    // Move bullets
    invadersBullets.forEach((bullet, index) => {
        bullet.y -= 5;
        if (bullet.y < 0) {
            invadersBullets.splice(index, 1);
        } else {
            // Check collision with enemies
            invadersEnemies.forEach(enemy => {
                if (enemy.alive && 
                    bullet.x >= enemy.x - 20 && bullet.x <= enemy.x + 20 &&
                    bullet.y >= enemy.y - 30 && bullet.y <= enemy.y) {
                    enemy.alive = false;
                    invadersBullets.splice(index, 1);
                    invadersScore += 10;
                    document.getElementById('invadersScore').textContent = invadersScore;
                    
                    if (invadersEnemies.every(e => !e.alive)) {
                        invadersWave++;
                        document.getElementById('invadersWave').textContent = invadersWave;
                        createInvadersWave();
                    }
                }
            });
        }
    });
    
    // Move enemies
    let moveDown = false;
    invadersEnemies.forEach(enemy => {
        if (enemy.alive) {
            enemy.x += 1;
            if (enemy.x > invadersCanvas.width - 40 || enemy.x < 40) {
                moveDown = true;
            }
        }
    });
    
    if (moveDown) {
        invadersEnemies.forEach(enemy => {
            if (enemy.alive) {
                enemy.x -= 1;
                enemy.y += 20;
                if (enemy.y > invadersPlayer.y) {
                    endInvadersGame();
                }
            }
        });
    }
    
    // Enemy shooting (occasional)
    if (Math.random() < 0.01 && invadersEnemies.some(e => e.alive)) {
        const aliveEnemies = invadersEnemies.filter(e => e.alive);
        if (aliveEnemies.length > 0) {
            const shooter = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
            // Simple enemy bullets - could add this feature later
        }
    }
}

function runInvadersLoop() {
    updateInvadersGame();
    drawInvadersGame();
}

function shootInvader() {
    if (!invadersGameRunning) return;
    invadersBullets.push({
        x: invadersPlayer.x + invadersPlayer.width / 2,
        y: invadersPlayer.y
    });
}

function startInvadersGame() {
    if (invadersGameRunning) return;
    invadersBullets = [];
    invadersPlayer.x = invadersCanvas.width / 2 - 25;
    invadersScore = 0;
    invadersWave = 1;
    invadersGameRunning = true;
    document.getElementById('invadersScore').textContent = '0';
    document.getElementById('invadersWave').textContent = '1';
    document.getElementById('invadersStatus').textContent = 'Defend against the ghosts!';
    createInvadersWave();
    invadersInterval = setInterval(runInvadersLoop, 30);
    drawInvadersGame();
}

function endInvadersGame() {
    invadersGameRunning = false;
    clearInterval(invadersInterval);
    document.getElementById('invadersStatus').textContent = `Game Over! Final Score: ${invadersScore} | Wave: ${invadersWave}`;
    document.getElementById('invadersStatus').style.color = '#ff6b6b';
}

// Ghost invaders initialization moved to initializeAllGames()

document.addEventListener('keydown', (e) => {
    if (!invadersCanvas || !invadersCanvas.parentElement || !invadersCanvas.parentElement.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); invadersMoveDirection = -1; }
    if (e.key === 'ArrowRight') { e.preventDefault(); invadersMoveDirection = 1; }
    if (e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); shootInvader(); }
});

document.addEventListener('keyup', (e) => {
    if (!invadersCanvas || !invadersCanvas.parentElement || !invadersCanvas.parentElement.classList.contains('active')) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') invadersMoveDirection = 0;
});

document.querySelectorAll('#invaders-game [data-action]').forEach(btn => {
    btn.addEventListener('mousedown', () => {
        const action = btn.getAttribute('data-action');
        if (action === 'move-left') invadersMoveDirection = -1;
        if (action === 'move-right') invadersMoveDirection = 1;
    });
    btn.addEventListener('mouseup', () => {
        invadersMoveDirection = 0;
    });
});

// Shooter Game
let shooterCanvas, shooterCtx;
let shooterPlayer = {x: 300, y: 350, width: 30, height: 30};
let shooterBullets = [];
let shooterEnemies = [];
let shooterScore = 0;
let shooterLives = 3;
let shooterRunning = false;
let shooterInterval = null;
let shooterKeys = {left: false, right: false, up: false, down: false};
let shooterAutoFireInterval = null;
let shooterLastAim = null;
let shooterCrosshairPos = null;
let shooterCooldownMs = 150;
let shooterLastShotTime = 0;
let shooterAutoMode = true;
let shooterPowerups = [];
let shooterActivePowerup = null; // { type: 'rapid'|'shield', until: timestamp }
let shooterMultiplier = 1;
let shooterLastHitTime = 0;
const shooterStreakWindowMs = 3000;

function initShooterGame() {
    shooterCanvas = document.getElementById('shooterCanvas');
    if (!shooterCanvas) return;
    shooterCtx = shooterCanvas.getContext('2d');
    shooterPlayer = {x: shooterCanvas.width / 2 - 15, y: shooterCanvas.height - 50, width: 30, height: 30};
    shooterBullets = [];
    shooterEnemies = [];
    shooterPowerups = [];
    shooterScore = 0;
    shooterLives = 3;
    shooterAutoMode = true;
    shooterMultiplier = 1;
    shooterActivePowerup = null;
    shooterLastShotTime = 0;
    const scoreEl = document.getElementById('shooterScore');
    const livesEl = document.getElementById('shooterLives');
    if (scoreEl) scoreEl.textContent = '0';
    if (livesEl) livesEl.textContent = '3';
    const statusEl = document.getElementById('shooterStatus');
    if (statusEl) { statusEl.textContent = 'Press Start to play!'; statusEl.style.color = ''; }
    const modeBtn = document.getElementById('shooterModeBtn');
    if (modeBtn) modeBtn.textContent = '🔁 Auto: ON';
    const multEl = document.getElementById('shooterMultiplier');
    if (multEl) multEl.textContent = 'x1';
    const pwrEl = document.getElementById('shooterPowerupStatus');
    if (pwrEl) pwrEl.textContent = '';
}

function drawShooter() {
    if (!shooterCtx) return;
    shooterCtx.clearRect(0, 0, shooterCanvas.width, shooterCanvas.height);
    // Player
    shooterCtx.font = '2rem Arial';
    shooterCtx.textAlign = 'center';
    shooterCtx.textBaseline = 'middle';
    shooterCtx.fillText('🧙‍♀️', shooterPlayer.x + shooterPlayer.width / 2, shooterPlayer.y + shooterPlayer.height / 2);
    // Bullets
    shooterBullets.forEach(b => {
        shooterCtx.font = '1.2rem Arial';
        shooterCtx.fillText('✨', b.x, b.y);
    });
    // Enemies
    shooterEnemies.forEach(e => {
        shooterCtx.font = '2rem Arial';
        shooterCtx.fillText(e.emoji, e.x, e.y);
    });

    // Power-ups
    shooterPowerups.forEach(p => {
        shooterCtx.font = '1.6rem Arial';
        const emoji = p.type === 'rapid' ? '⚡' : '🛡️';
        shooterCtx.fillText(emoji, p.x, p.y);
    });

    // Crosshair
    if (shooterCrosshairPos) {
        shooterCtx.save();
        shooterCtx.strokeStyle = '#ffd700';
        shooterCtx.lineWidth = 2;
        shooterCtx.beginPath();
        shooterCtx.arc(shooterCrosshairPos.x, shooterCrosshairPos.y, 10, 0, Math.PI * 2);
        shooterCtx.moveTo(shooterCrosshairPos.x - 14, shooterCrosshairPos.y);
        shooterCtx.lineTo(shooterCrosshairPos.x + 14, shooterCrosshairPos.y);
        shooterCtx.moveTo(shooterCrosshairPos.x, shooterCrosshairPos.y - 14);
        shooterCtx.lineTo(shooterCrosshairPos.x, shooterCrosshairPos.y + 14);
        shooterCtx.stroke();
        shooterCtx.restore();
    }

    // Cooldown bar (top-left)
    const now = Date.now();
    const elapsed = now - shooterLastShotTime;
    const ratio = Math.max(0, Math.min(1, elapsed / shooterCooldownMs));
    shooterCtx.save();
    shooterCtx.fillStyle = '#333';
    shooterCtx.fillRect(10, 10, 100, 10);
    shooterCtx.fillStyle = ratio >= 1 ? '#32cd32' : '#ffb347';
    shooterCtx.fillRect(10, 10, 100 * ratio, 10);
    shooterCtx.strokeStyle = '#fff';
    shooterCtx.lineWidth = 1;
    shooterCtx.strokeRect(10, 10, 100, 10);
    shooterCtx.restore();

    // HUD top-right: multiplier
    shooterCtx.save();
    shooterCtx.fillStyle = '#fff';
    shooterCtx.font = '14px Arial';
    shooterCtx.textAlign = 'right';
    shooterCtx.fillText(`Multiplier: x${shooterMultiplier}`, shooterCanvas.width - 10, 20);
    if (shooterActivePowerup) {
        const msLeft = Math.max(0, shooterActivePowerup.until - Date.now());
        const sec = Math.ceil(msLeft / 1000);
        shooterCtx.fillText(`${shooterActivePowerup.type === 'rapid' ? '⚡ Rapid' : '🛡️ Shield'}: ${sec}s`, shooterCanvas.width - 10, 40);
    }
    shooterCtx.restore();
}

function spawnShooterEnemy() {
    if (!shooterCanvas) return;
    const emojis = ['👻', '🎃', '🦇'];
    shooterEnemies.push({
        x: Math.random() * (shooterCanvas.width - 40) + 20,
        y: -20,
        vy: Math.random() * 1.5 + 0.5,
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
    });
}

function updateShooter() {
    // Move player
    const speed = 4;
    if (shooterKeys.left) shooterPlayer.x = Math.max(0, shooterPlayer.x - speed);
    if (shooterKeys.right) shooterPlayer.x = Math.min(shooterCanvas.width - shooterPlayer.width, shooterPlayer.x + speed);
    if (shooterKeys.up) shooterPlayer.y = Math.max(0, shooterPlayer.y - speed);
    if (shooterKeys.down) shooterPlayer.y = Math.min(shooterCanvas.height - shooterPlayer.height, shooterPlayer.y + speed);

    // Move bullets
    shooterBullets.forEach((b, i) => {
        b.x += b.vx;
        b.y += b.vy;
        if (b.y < -20 || b.y > shooterCanvas.height + 20 || b.x < -20 || b.x > shooterCanvas.width + 20) {
            shooterBullets.splice(i, 1);
        }
    });

    // Move enemies
    shooterEnemies.forEach((e, i) => {
        e.y += e.vy;
        // Enemy hits player
        if (
            e.x > shooterPlayer.x && e.x < shooterPlayer.x + shooterPlayer.width &&
            e.y > shooterPlayer.y && e.y < shooterPlayer.y + shooterPlayer.height
        ) {
            shooterEnemies.splice(i, 1);
            shooterLives--;
            const livesEl = document.getElementById('shooterLives');
            if (livesEl) livesEl.textContent = shooterLives;
            if (shooterLives <= 0) {
                endShooterGame();
                return;
            }
        }
        // Remove enemies that pass bottom
        if (e.y > shooterCanvas.height + 20) shooterEnemies.splice(i, 1);
    });

    // Bullet-enemy collisions
    shooterBullets.forEach((b, bi) => {
        shooterEnemies.forEach((e, ei) => {
            const dx = Math.abs(b.x - e.x);
            const dy = Math.abs(b.y - e.y);
            if (dx < 15 && dy < 15) {
                shooterBullets.splice(bi, 1);
                shooterEnemies.splice(ei, 1);
                // Streak / multiplier
                const now = Date.now();
                if (now - shooterLastHitTime <= shooterStreakWindowMs) {
                    shooterMultiplier = Math.min(5, shooterMultiplier + 1);
                } else {
                    shooterMultiplier = 1;
                }
                shooterLastHitTime = now;
                const multEl = document.getElementById('shooterMultiplier');
                if (multEl) multEl.textContent = `x${shooterMultiplier}`;
                shooterScore += 10 * shooterMultiplier;
                const scoreEl = document.getElementById('shooterScore');
                if (scoreEl) scoreEl.textContent = shooterScore;
                createSparkles();

                // Chance to drop power-up
                if (Math.random() < 0.25) {
                    const type = Math.random() < 0.6 ? 'rapid' : 'shield';
                    shooterPowerups.push({ x: e.x, y: e.y, vy: 1.2, type });
                }
            }
        });
    });

    // Move power-ups and pickups
    shooterPowerups.forEach((p, i) => {
        p.y += p.vy;
        // Pickup
        if (
            p.x > shooterPlayer.x && p.x < shooterPlayer.x + shooterPlayer.width &&
            p.y > shooterPlayer.y && p.y < shooterPlayer.y + shooterPlayer.height
        ) {
            if (p.type === 'rapid') {
                shooterActivePowerup = { type: 'rapid', until: Date.now() + 6000 };
                shooterCooldownMs = 60;
                const pwr = document.getElementById('shooterPowerupStatus');
                if (pwr) { pwr.textContent = '⚡ Rapid Fire active!'; pwr.style.color = '#ffd700'; }
            } else if (p.type === 'shield') {
                shooterLives = Math.min(5, shooterLives + 1);
                const livesEl = document.getElementById('shooterLives');
                if (livesEl) livesEl.textContent = shooterLives;
                const pwr = document.getElementById('shooterPowerupStatus');
                if (pwr) { pwr.textContent = '🛡️ Shield gained!'; pwr.style.color = '#87ceeb'; }
            }
            shooterPowerups.splice(i, 1);
        }
        // Remove off-screen
        if (p.y > shooterCanvas.height + 20) shooterPowerups.splice(i, 1);
    });

    // Occasionally spawn enemies
    if (Math.random() < 0.04) spawnShooterEnemy();
}

function runShooterLoop() {
    updateShooter();
    // Power-up expiration
    if (shooterActivePowerup && shooterActivePowerup.type === 'rapid' && Date.now() >= shooterActivePowerup.until) {
        shooterActivePowerup = null;
        shooterCooldownMs = 150;
        const pwr = document.getElementById('shooterPowerupStatus');
        if (pwr) pwr.textContent = '';
    }
    drawShooter();
}

function startShooterGame() {
    if (shooterRunning) return;
    if (!shooterCanvas) initShooterGame(); else initShooterGame();
    shooterRunning = true;
    const statusEl = document.getElementById('shooterStatus');
    if (statusEl) { statusEl.textContent = 'Playing...'; statusEl.style.color = ''; }
    shooterInterval = setInterval(runShooterLoop, 20);
}

function endShooterGame() {
    shooterRunning = false;
    clearInterval(shooterInterval);
    stopShooterAutoFire();
    const statusEl = document.getElementById('shooterStatus');
    if (statusEl) { statusEl.textContent = `Game Over! Final Score: ${shooterScore}`; statusEl.style.color = '#ff6b6b'; }
}

function resetShooterGame() {
    endShooterGame();
    initShooterGame();
    drawShooter();
}

// Keyboard controls for Shooter (active only when shooter tab is active)
document.addEventListener('keydown', (e) => {
    const shooterContainer = document.getElementById('shooter-game');
    if (!shooterContainer || !shooterContainer.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); shooterKeys.left = true; }
    if (e.key === 'ArrowRight') { e.preventDefault(); shooterKeys.right = true; }
    if (e.key === 'ArrowUp') { e.preventDefault(); shooterKeys.up = true; }
    if (e.key === 'ArrowDown') { e.preventDefault(); shooterKeys.down = true; }
    if (e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); shootBullet(); }
});

document.addEventListener('keyup', (e) => {
    const shooterContainer = document.getElementById('shooter-game');
    if (!shooterContainer || !shooterContainer.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') shooterKeys.left = false;
    if (e.key === 'ArrowRight') shooterKeys.right = false;
    if (e.key === 'ArrowUp') shooterKeys.up = false;
    if (e.key === 'ArrowDown') shooterKeys.down = false;
});

function shootBullet() {
    if (!shooterRunning) return;
    const now = Date.now();
    if (now - shooterLastShotTime < shooterCooldownMs) return;
    shooterLastShotTime = now;
    const speed = 7;
    if (shooterLastAim) {
        const dx = shooterLastAim.x - (shooterPlayer.x + shooterPlayer.width / 2);
        const dy = shooterLastAim.y - (shooterPlayer.y);
        const mag = Math.max(1, Math.hypot(dx, dy));
        shooterBullets.push({
            x: shooterPlayer.x + shooterPlayer.width / 2,
            y: shooterPlayer.y,
            vx: (dx / mag) * speed,
            vy: (dy / mag) * speed
        });
    } else {
        shooterBullets.push({ x: shooterPlayer.x + shooterPlayer.width / 2, y: shooterPlayer.y, vx: 0, vy: -speed });
    }
}

function startShooterAutoFire() {
    if (shooterAutoFireInterval || !shooterAutoMode) return;
    shootBullet();
    shooterAutoFireInterval = setInterval(() => {
        shootBullet();
    }, 150);
}

function stopShooterAutoFire() {
    if (shooterAutoFireInterval) {
        clearInterval(shooterAutoFireInterval);
        shooterAutoFireInterval = null;
    }
}

function toggleShooterMode() {
    shooterAutoMode = !shooterAutoMode;
    const modeBtn = document.getElementById('shooterModeBtn');
    if (modeBtn) modeBtn.textContent = shooterAutoMode ? '🔁 Auto: ON' : '🔁 Auto: OFF';
    if (!shooterAutoMode) stopShooterAutoFire();
}

// Add parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const ghosts = document.querySelectorAll('.ghost');
    
    ghosts.forEach((ghost, index) => {
        const speed = 0.5 + (index * 0.1);
        ghost.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add sparkle effect on button click
revealButton.addEventListener('click', () => {
    createSparkles();
});

function createSparkles() {
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = ['✨', '⭐', '💫'][Math.floor(Math.random() * 3)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.fontSize = '2rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

// Add CSS animation for sparkles
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(0.5);
        }
    }
`;
document.head.appendChild(style);

// Camera and Costume functionality
const startCameraButton = document.getElementById('startCameraButton');
const captureButton = document.getElementById('captureButton');
const stopCameraButton = document.getElementById('stopCameraButton');
const videoPreview = document.getElementById('videoPreview');
const photoCanvas = document.getElementById('photoCanvas');
const capturedPhoto = document.getElementById('capturedPhoto');
const photoResult = document.getElementById('photoResult');
const costumeSelector = document.getElementById('costumeSelector');
const liveCostumeOverlay = document.getElementById('liveCostumeOverlay');
const downloadButton = document.getElementById('downloadButton');
const retakeButton = document.getElementById('retakeButton');
const costumeButtons = document.querySelectorAll('.costume-btn');

let stream = null;
let selectedCostume = 'none';

// Costume emoji mapping
const costumeEmojis = {
    'witch': '🧙‍♀️',
    'vampire': '🧛',
    'ghost': '👻',
    'pumpkin': '🎃',
    'bat': '🦇',
    'spider': '🕷️',
    'none': ''
};

startCameraButton.addEventListener('click', async () => {
    try {
        // Request camera access
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: 'user', // Front camera for selfies
                width: { ideal: 640 },
                height: { ideal: 480 }
            } 
        });
        
        videoPreview.srcObject = stream;
        videoPreview.style.display = 'block';
        photoResult.classList.add('result-hidden');
        photoResult.classList.remove('result-visible');
        liveCostumeOverlay.style.display = 'none';
        liveCostumeOverlay.innerHTML = '';
        
        startCameraButton.style.display = 'none';
        captureButton.style.display = 'inline-block';
        stopCameraButton.style.display = 'inline-block';
        costumeSelector.style.display = 'block';
        
        // Show placeholder message if camera isn't working
        const placeholder = document.querySelector('.camera-placeholder');
        if (placeholder) placeholder.remove();
        
    } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Unable to access camera. Please make sure you\'ve granted camera permissions and try again.');
    }
});

stopCameraButton.addEventListener('click', () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
    
    videoPreview.srcObject = null;
    videoPreview.style.display = 'none';
    photoResult.classList.add('result-hidden');
    liveCostumeOverlay.style.display = 'none';
    liveCostumeOverlay.innerHTML = '';
    
    startCameraButton.style.display = 'inline-block';
    captureButton.style.display = 'none';
    stopCameraButton.style.display = 'none';
    costumeSelector.style.display = 'none';
    
    // Reset costume selection
    selectedCostume = 'none';
    costumeButtons.forEach(btn => btn.classList.remove('active'));
});

captureButton.addEventListener('click', () => {
    if (!stream) return;
    
    // Set canvas dimensions
    photoCanvas.width = videoPreview.videoWidth;
    photoCanvas.height = videoPreview.videoHeight;
    
    const ctx = photoCanvas.getContext('2d');
    
    // Draw video frame to canvas (video source is unmirrored, but user sees it mirrored via CSS)
    // We'll draw it unmirrored to match real photo orientation
    ctx.drawImage(videoPreview, 0, 0, photoCanvas.width, photoCanvas.height);
    
    // Add costume overlay to canvas
    if (selectedCostume !== 'none') {
        const costumeEmoji = costumeEmojis[selectedCostume];
        
        // Calculate font size based on canvas dimensions
        const fontSize = Math.min(photoCanvas.width, photoCanvas.height) * 0.12;
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Position costume emoji above head area (centered horizontally, top 6% vertically)
        const yPos = photoCanvas.height * 0.06;
        const xPos = photoCanvas.width / 2; // Center of canvas
        
        // Create gradient for costume
        const gradient = ctx.createLinearGradient(
            photoCanvas.width / 2 - 100, 
            yPos,
            photoCanvas.width / 2 + 100,
            yPos
        );
        gradient.addColorStop(0, 'rgba(255, 215, 0, 0.95)');
        gradient.addColorStop(0.5, 'rgba(255, 140, 0, 0.95)');
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0.95)');
        
        ctx.fillStyle = gradient;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.lineWidth = Math.max(2, fontSize * 0.03);
        
        // Draw with shadow effect
        ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
        ctx.shadowBlur = 20;
        ctx.strokeText(costumeEmoji, xPos, yPos);
        ctx.fillText(costumeEmoji, xPos, yPos);
    }
    
    // Convert canvas to image (already has costume overlay drawn on it)
    const imageData = photoCanvas.toDataURL('image/png');
    capturedPhoto.src = imageData;
    
    // Mirror the displayed photo to match what user saw in preview
    capturedPhoto.style.transform = 'scaleX(-1)';
    
    // Hide video and live overlay, show result
    videoPreview.style.display = 'none';
    liveCostumeOverlay.style.display = 'none';
    photoResult.classList.remove('result-hidden');
    photoResult.classList.add('result-visible');
    
    createSparkles();
});

// Costume selection
costumeButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectedCostume = button.getAttribute('data-costume');
        
        // Update button states
        costumeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update live overlay preview on video if camera is active
        if (stream && videoPreview.style.display !== 'none') {
            if (selectedCostume !== 'none') {
                liveCostumeOverlay.innerHTML = costumeEmojis[selectedCostume];
                liveCostumeOverlay.style.display = 'flex';
            } else {
                liveCostumeOverlay.innerHTML = '';
                liveCostumeOverlay.style.display = 'none';
            }
        }
    });
});

// Download photo
downloadButton.addEventListener('click', () => {
    // Create a temporary canvas to mirror the image for download (to match what user sees)
    const downloadCanvas = document.createElement('canvas');
    downloadCanvas.width = photoCanvas.width;
    downloadCanvas.height = photoCanvas.height;
    const downloadCtx = downloadCanvas.getContext('2d');
    
    // Mirror the canvas image for download
    downloadCtx.save();
    downloadCtx.scale(-1, 1);
    downloadCtx.drawImage(photoCanvas, -downloadCanvas.width, 0);
    downloadCtx.restore();
    
    const link = document.createElement('a');
    link.download = `halloween-costume-${Date.now()}.png`;
    link.href = downloadCanvas.toDataURL('image/png');
    link.click();
    
    // Show success feedback
    createSparkles();
});

// Retake photo
retakeButton.addEventListener('click', () => {
    photoResult.classList.add('result-hidden');
    photoResult.classList.remove('result-visible');
    capturedPhoto.style.transform = ''; // Reset transform
    
    if (stream) {
        videoPreview.style.display = 'block';
        // Show live overlay if costume is selected
        if (selectedCostume !== 'none') {
            liveCostumeOverlay.innerHTML = costumeEmojis[selectedCostume];
            liveCostumeOverlay.style.display = 'flex';
        } else {
            liveCostumeOverlay.style.display = 'none';
        }
    } else {
        startCameraButton.style.display = 'inline-block';
    }
    
    // Don't reset costume selection - keep it for retake
});
