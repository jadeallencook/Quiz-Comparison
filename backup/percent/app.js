(function () {
    var answer = null,
        current = null,
        commandments = null,
        commandmentText = null,
        getCommandments = [
            new Promise(function (res, rej) {
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (xhttp.readyState == XMLHttpRequest.DONE) {
                        res(JSON.parse(this.responseText));
                    }
                };
                xhttp.open('get', '../data/commandments.json', true);
                xhttp.send();
            }),
            new Promise(function (res, rej) {
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (xhttp.readyState == XMLHttpRequest.DONE) {
                        res(JSON.parse(this.responseText));
                    }
                };
                xhttp.open('get', '../data/commandments-text.json', true);
                xhttp.send();
            })
        ];

    function resetAnswers() {
        document.getElementsByClassName('answer-bubble')[0].innerHTML = '';
        document.getElementsByClassName('answer-bubble')[1].innerHTML = '';
        document.getElementsByClassName('answer-bubble')[2].innerHTML = '';
    }

    function listenForAnswers() {
        function selectAnswer() {
            resetAnswers();
            // create fill element
            var fill = document.createElement('div');
            fill.classList.add('bubble-fill');
            fill.classList.add('animated');
            fill.classList.add('fadeIn');
            this.appendChild(fill);
            answer = this.getAttribute('data-answer');
        }
        document.getElementsByClassName('answer-bubble')[0].onclick = selectAnswer;
        document.getElementsByClassName('answer-bubble')[1].onclick = selectAnswer;
        document.getElementsByClassName('answer-bubble')[2].onclick = selectAnswer;
        document.querySelector('div.submit-btn').onclick = function () {
            if (answer) {
                document.getElementsByClassName('question-container')[0].style.display = 'none';
                document.getElementsByClassName('answer-container')[0].style.display = 'block';
                document.getElementById('answer-text').innerText = answer;
                var selector;
                if (answer === 'no') selector = 'disagree';
                else if (answer === 'yes') selector = 'agree';
                else selector = 'dont-know';
                selector = 'commandment-' + (current + 1) + '-' + selector;
                var average = commandments[selector].avg * 100;
                document.querySelector('div.percent-fill').style.width = average + '%';
                document.getElementById('answer-percent').innerText = average + '%';
                if (current + 1 < Object.keys(commandmentText).length) {
                    document.querySelector('div.next-btn').onclick = askQuestion;
                } else {
                    document.querySelector('div.next-btn').innerHTML = 'Explore the data &#65515;';
                    document.querySelector('div.next-btn').onclick = function () {
                        window.location.href = 'https://www.deseretnews.com/';
                    }
                }
            }
        }
    }

    function askQuestion() {
        if (!current && current !== 0) current = 0;
        else current++;
        document.getElementsByClassName('answer-container')[0].style.display = 'none';
        document.getElementsByClassName('question-container')[0].style.display = 'block';
        resetAnswers();
        document.querySelector('div.question-num').innerText = (current + 1);
        if (current < Object.keys(commandmentText).length) {
            var selector = 'commandment-' + (current + 1);
            document.getElementById('commandment-text').innerText = commandmentText[selector];
            listenForAnswers();
        }
    }

    // init 
    Promise.all(getCommandments).then(function (data) {
        commandments = data[0];
        commandmentText = data[1];
        askQuestion();
    })
})();