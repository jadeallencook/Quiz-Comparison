/* 
    Developed by Jade Allen Cook 2018
    Designed by Tamsin Himes 2018
    Orginally Produced for Deseret News
*/

(function () {

    var config = {
        colors: {
            background: '#3F424F',
            loadingBar: '#69CFAB',
            highlights: '#69CFAB'
        },
        title: 'Honesty: what counts?',
        options: [{
            html: 'Often<br />okay',
            text: 'often okay'
        }, {
            html: 'Sometimes<br />okay',
            text: 'often okay'
        }, {
            html: 'Never<br />okay',
            text: 'never okay'
        }],
        logo: '../images/stone-tablets.svg',
        explore: {
            active: true,
            link: '#'
        },
        questions: {
            data: '../data/lies.json',
            text: '../data/lies-text.json'
        }
    }

    var questions, questionsText;
    var selectedAnswer, currentQuestion = 0;

    function loadTitle() {
        var elem = document.querySelector('h2.question-title');
        elem.innerText = config.title;
    }

    function loadLogo() {
        var elem = document.querySelector('img.question-logo');
        elem.setAttribute('src', config.logo);
    }

    function changeBackgroundColor() {
        var elem = document.querySelector('div#quiz-app');
        if (config.colors.background) {
            elem.style.backgroundColor = config.colors.background;
        }
    }

    function initSetup() {
        loadTitle();
        loadLogo();
        changeBackgroundColor();
        loadQuestion();
    }

    function selectOption(selected) {
        var optionElems = document.getElementsByClassName('answer-bubble');
        for (var y = 0; y < optionElems.length; y++) {
            optionElem = optionElems[y];
            optionElem.innerHTML = null;
        }
        var fill = document.createElement('div');
        fill.classList.add('bubble-fill');
        if (config.colors.highlights) fill.style.backgroundColor = config.colors.highlights;
        selected.appendChild(fill);
    }

    function loadOptions() {
        selectedAnswer = null;
        var elem = document.querySelector('div.answer-grid');
        elem.innerHTML = null;
        var options = config.options;
        for (var x = 0; x < options.length; x++) {
            var optionText = options[x];
            var optionTextElem = document.createElement('div');
            optionTextElem.innerHTML = optionText.html;
            elem.appendChild(optionTextElem);
        }
        for (var x = 0; x < options.length; x++) {
            var optionBubbleContainer = document.createElement('div');
            var optionBubble = document.createElement('div');
            optionBubble.classList.add('answer-bubble');
            optionBubble.setAttribute('data-answer', (x + 1));
            optionBubbleContainer.appendChild(optionBubble);
            optionBubble.onclick = function () {
                selectOption(this);
                var answer = parseInt(this.getAttribute('data-answer'));
                selectedAnswer = answer;
            }
            elem.appendChild(optionBubbleContainer);
        }
    }

    function loadResults() {
        document.querySelector('div.question-container').style.display = 'none';
        document.querySelector('div.answer-container').style.display = 'block';
        var answer = questions['question-' + (currentQuestion + 1) + '-' + selectedAnswer];
        var percent = Math.round(answer.avg * 100) + '%';
        var percentElem = document.querySelector('span.answer-percent');
        percentElem.innerText = percent;
        if (config.colors.highlights) percentElem.style.color = config.colors.highlights;
        var percentBar = document.querySelector('div.percent-fill');
        percentBar.style.width = percent;
        if (config.colors.loadingBar) percentBar.style.backgroundColor = config.colors.loadingBar;
        document.querySelector('span.answer-text').innerText = config.options[(selectedAnswer - 1)].text;
        var nextBtn = document.querySelector('div.next-btn');
        if ((currentQuestion + 1) < Object.keys(questionsText).length) {
            nextBtn.onclick = function () {
                currentQuestion++;
                loadQuestion();
            }
        } else {
            if (config.explore.active) {
                nextBtn.innerHTML = 'Explore data &#65515;';
                nextBtn.onclick = function () {
                    window.location = config.explore.link;
                }
            } else {
                nextBtn.style.display = 'none';
            }
        }
    }

    function loadQuestion() {
        document.querySelector('div.answer-container').style.display = 'none';
        document.querySelector('div.question-container').style.display = 'block';
        loadOptions();
        var elem = document.querySelector('div.question-text');
        elem.innerText = questionsText['question-' + (currentQuestion + 1)];
        var submitElem = document.querySelector('div.submit-btn');
        submitElem.onclick = function () {
            if (selectedAnswer) loadResults();
        }
    }

    Promise.all([new Promise(function (res, rej) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (data) {
            if (this.responseText) {
                questions = JSON.parse(this.responseText);
                res();
            }
        }
        xhttp.open('get', config.questions.data, true);
        xhttp.send();
    }), new Promise(function (res, rej) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (data) {
            if (this.responseText) {
                questionsText = JSON.parse(this.responseText);
                res();
            }
        }
        xhttp.open('get', config.questions.text, true);
        xhttp.send();
    })]).then(function () {
        initSetup();
    });

})();