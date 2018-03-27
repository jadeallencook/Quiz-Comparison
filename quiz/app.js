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
        logo: 'data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53%0D%0AMy5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5r%0D%0AIiB2aWV3Qm94PSIwIDAgMTYyLjc0IDE4Ni44NSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOm5v%0D%0AbmU7fS5jbHMtMntjbGlwLXBhdGg6dXJsKCNjbGlwLXBhdGgpO30uY2xzLTN7ZmlsbDojZDhkOGQ4%0D%0AO30uY2xzLTR7Y2xpcC1wYXRoOnVybCgjY2xpcC1wYXRoLTIpO30uY2xzLTV7ZmlsbDojM2Y0MjUw%0D%0AO308L3N0eWxlPjxjbGlwUGF0aCBpZD0iY2xpcC1wYXRoIj48cG9seWdvbiBjbGFzcz0iY2xzLTEi%0D%0AIHBvaW50cz0iODEuMjUgMTg2Ljg1IDAgMTQwLjAzIDAuMTIgNDYuNiA4MS40OSAwIDE2Mi43NCA0%0D%0ANi44MSAxNjIuNjIgMTQwLjI0IDgxLjI1IDE4Ni44NSIvPjwvY2xpcFBhdGg+PGNsaXBQYXRoIGlk%0D%0APSJjbGlwLXBhdGgtMiI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTMyLjYsNjkuMzF2NzUuMzRI%0D%0ANzUuMzRWMTI2LjU3SDMzLjE1VjUxLjIzYzAtMTEuNjUsMTIuODItMjEuMDksMjguNjMtMjEuMDks%0D%0AMTUuNTksMCwyOC4yNiw5LjE3LDI4LjYyLDIwLjU5QTM3LDM3LDAsMCwxLDEwNCw0OC4yMkMxMTku%0D%0ANzgsNDguMjIsMTMyLjYsNTcuNjYsMTMyLjYsNjkuMzFaIi8+PC9jbGlwUGF0aD48L2RlZnM+PHRp%0D%0AdGxlPnRoZV90ZW5fdG9kYXk8L3RpdGxlPjxnIGNsYXNzPSJjbHMtMiI+PHJlY3QgY2xhc3M9ImNs%0D%0Acy0zIiB4PSItMTUuMDciIHk9Ii0xNS4wNyIgd2lkdGg9IjE5Mi44NyIgaGVpZ2h0PSIyMTYuOTgi%0D%0ALz48L2c+PGcgY2xhc3M9ImNscy00Ij48cmVjdCBjbGFzcz0iY2xzLTUiIHg9IjE4LjA4IiB5PSIx%0D%0ANS4wNyIgd2lkdGg9IjEyOS41OSIgaGVpZ2h0PSIxNDQuNjUiLz48L2c+PC9zdmc+',
        explore: {
            active: true,
            link: '#'
        },
        questions: {
            data: 'https://raw.githubusercontent.com/jadeallencook/Quiz-Comparison/master/data/lies.json',
            text: 'https://raw.githubusercontent.com/jadeallencook/Quiz-Comparison/master/data/lies-text.json'
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
            if ('ga' in window) ga('send', 'event', '10 Commandments Quiz', questionsText['question' + (currentQuestion + 1)], selectedAnswer);
            console.log(selectedAnswer);
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