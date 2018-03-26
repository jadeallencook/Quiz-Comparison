(function () {

    var lies, liesText, answer, currentQuestion, getLiesPromises = [
        new Promise(function (res, rej) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == XMLHttpRequest.DONE) {
                    res(JSON.parse(this.responseText));
                }
            };
            xhttp.open('get', '../data/lies.json', true);
            xhttp.send();
        }),
        new Promise(function (res, rej) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == XMLHttpRequest.DONE) {
                    res(JSON.parse(this.responseText));
                }
            };
            xhttp.open('get', '../data/lies-text.json', true);
            xhttp.send();
        })
    ];

    function resetAnswerBubbles() {
        document.getElementsByClassName('answer-bubble')[0].innerHTML = '';
        document.getElementsByClassName('answer-bubble')[1].innerHTML = '';
        document.getElementsByClassName('answer-bubble')[2].innerHTML = '';
    }

    function getAnswer() {
        document.querySelector('div.answer-container').style.display = 'none';
        document.querySelector('div.submit-btn').style.display = 'block';
        resetAnswerBubbles();
        document.getElementsByClassName('answer-bubble')[0].onclick = selectAnswer;
        document.getElementsByClassName('answer-bubble')[1].onclick = selectAnswer;
        document.getElementsByClassName('answer-bubble')[2].onclick = selectAnswer;
        document.querySelector('div.submit-btn').onclick = function () {
            if (answer) displayAnswer();
        }
    }

    function displayAnswer() {
        document.querySelector('div.answer-container').style.display = 'block';
        document.querySelector('div.submit-btn').style.display = 'none';
        var selector = 'lie-' + (currentQuestion + 1) + '-' + answer;
        var percent = Math.round(lies[selector].avg * 100);
        document.querySelector('span.answer-percent').innerText = percent + '%';
        document.querySelector('div.percent-fill').style.width = percent + '%';
        if (currentQuestion + 1 === Object.keys(liesText).length) {
            document.querySelector('div.next-btn').style.display = 'none';
            document.querySelector('div.percent-bar').style.margin = '15px auto';
        } else {
            document.querySelector('div.next-btn').onclick = askQuestion;
        }
    }

    function selectAnswer() {
        resetAnswerBubbles();
        var fill = document.createElement('div');
        fill.classList.add('bubble-fill');
        fill.classList.add('animated');
        fill.classList.add('fadeIn');
        this.appendChild(fill);
        answer = this.getAttribute('data-answer');
    }

    function askQuestion() {
        answer = null;
        if (!currentQuestion && currentQuestion !== 0) currentQuestion = 0;
        else if (currentQuestion < Object.keys(liesText).length) currentQuestion++;
        var selector = 'lie-' + (currentQuestion + 1);
        document.querySelector('div.question-text').innerText = liesText[selector];
        getAnswer();
    }

    Promise.all(getLiesPromises).then(function (data) {
        lies = data[0];
        liesText = data[1];
        askQuestion();
    });

})();