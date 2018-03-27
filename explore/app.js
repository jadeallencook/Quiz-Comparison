(function () {

    var config = {
        categories: [{
            group: 'Religion',
            sub: [{
                text: 'Mainline Protestant',
                slug: 'm-prot'
            }, {
                text: 'Evangelical Protestant',
                slug: 'e-prot'
            }, {
                text: 'Black Protestant',
                slug: 'b-prot'
            }, {
                text: 'Catholic',
                slug: 'cath'
            }, {
                text: 'Orthodox',
                slug: 'ortho'
            }, {
                text: 'Conservative Non-Traditional',
                slug: 'conserve'
            }, {
                text: 'Liberal Non-Traditional',
                slug: 'liberal'
            }, {
                text: 'Jewish',
                slug: 'jew'
            }, {
                text: 'Other',
                slug: 'other'
            }, {
                text: 'Unafilliated',
                slug: 'unafill'
            }]
        }, {
            group: 'Age',
            sub: [{
                text: '18 - 29',
                slug: '18-29'
            }, {
                text: '30 - 44',
                slug: '30-44'
            }, {
                text: '45 - 64',
                slug: '45-64'
            }, {
                text: '65+',
                slug: '65+'
            }]
        }, {
            group: 'Gender',
            sub: [{
                text: 'Male',
                slug: 'male'
            }, {
                text: 'Female',
                slug: 'female'
            }]
        }],
        json: {
            data: 'https://raw.githubusercontent.com/jadeallencook/Quiz-Comparison/master/data/commandments.json',
            text: 'https://raw.githubusercontent.com/jadeallencook/Quiz-Comparison/master/data/commandments-text.json'
        }
    }

    var questions, questionsText;

    function categories() {
        var categories = config.categories;
        var categoryList = document.querySelector('div#category ul');
        var subCategoryList = document.querySelector('div#sub-category ul');
        for (var x = 0; x < categories.length; x++) {
            var category = categories[x];
            var listElem = document.createElement('li');
            listElem.innerText = category.group;
            listElem.setAttribute('data-category', x);
            listElem.onclick = function () {
                var num = parseInt(this.getAttribute('data-category'));
                document.querySelector('div#sub-category').style.display = 'block';
                document.querySelector('div#sub-category ul').innerHTML = null;
                document.querySelector('div#category').innerHTML = categories[num].group + '<ul></ul>';
                for (var y = 0; y < categories[num].sub.length; y++) {
                    var sub = categories[num].sub[y];
                    var subElem = document.createElement('li');
                    subElem.innerText = sub.text;
                    subElem.setAttribute('data-key', sub.slug);
                    subElem.setAttribute('data-num', y);
                    subElem.onclick = function () {
                        var choosenSub = categories[num].sub[parseInt(this.getAttribute('data-num'))];
                        document.querySelector('div#sub-category').innerHTML = choosenSub.text + '<ul></ul>';
                        compare(choosenSub);
                        var clearElem = document.createElement('div');
                        clearElem.innerText = 'Reset';
                        clearElem.classList.add('clear-btn');
                        document.querySelector('div.filters-container').appendChild(clearElem);
                        clearElem.onclick = function() {
                            document.getElementById('category').innerHTML = '<span class="text">Choose a category</span>';
                            document.getElementById('category').innerHTML += '<span class="arrow">&#x25BC;</span>';
                            document.getElementById('category').innerHTML += '<ul></ul>';
                            document.getElementById('sub-category').innerHTML = '<span class="text">Choose a section</span>';
                            document.getElementById('sub-category').innerHTML += '<span class="arrow">&#x25BC;</span>';
                            document.getElementById('sub-category').innerHTML += '<ul></ul>';
                            document.getElementById('sub-category').style.display = 'none';
                            clearElem.remove();
                            init();
                        }
                    }
                    document.querySelector('div#sub-category ul').appendChild(subElem);
                }
                document.querySelector('div#sub-category').onclick = function () {
                    if (!subCategoryList.style.display || subCategoryList.style.display === 'none') {
                        subCategoryList.style.display = 'block';
                    } else {
                        subCategoryList.style.display = 'none';
                    }
                }
            }
            categoryList.appendChild(listElem);
        }
        document.querySelector('div#category').onclick = function () {
            if (!categoryList.style.display || categoryList.style.display === 'none') {
                categoryList.style.display = 'block';
            } else {
                categoryList.style.display = 'none';
            }
        }
    }

    function compare(sub) {
        for (var x = 0; x < Object.keys(questionsText).length; x++) {
            var entry = document.getElementsByClassName('bar-grid')[x];
            var percentElem = document.createElement('div');
            percentElem.classList.add('percent');
            var percent = Math.round(questions['question-' + (x + 1) + '-1'][sub.slug] * 100) + '%';
            percentElem.innerText = percent;
            var barContainerElem = document.createElement('div');
            barContainerElem.classList.add('bar-container');
            var barFillElem = document.createElement('div');
            barFillElem.classList.add('bar-fill');
            barFillElem.style.width = percent;
            barContainerElem.appendChild(barFillElem);
            var blankElem = document.createElement('div');
            var nameElem = document.createElement('div');
            nameElem.innerText = sub.text;
            var topBlankElem = document.createElement('div');
            var overallElem = document.createElement('div');
            overallElem.innerText = 'Overall Population';
            entry.insertBefore(overallElem, entry.firstChild);
            entry.insertBefore(topBlankElem, entry.firstChild);
            entry.appendChild(blankElem);
            entry.appendChild(nameElem);
            entry.appendChild(percentElem);
            entry.appendChild(barContainerElem);
        }
    }

    function clear() {
        if (document.getElementsByClassName('question').length) {
            do {
                if (document.getElementsByClassName('question')[0]) {
                    document.getElementsByClassName('question')[0].remove();
                }
            } while (document.getElementsByClassName('question').length > 0);
        }
    }

    function average() {
        clear();
        for (var x = 0; x < Object.keys(questionsText).length; x++) {
            var questionElem = document.createElement('div');
            questionElem.classList.add('question');
            var textGridElem = document.createElement('div');
            textGridElem.classList.add('text-grid');
            var numElem = document.createElement('div');
            numElem.classList.add('num');
            numElem.innerText = (x + 1) + '.';
            var textElem = document.createElement('div');
            textElem.classList.add('text');
            textElem.innerText = questionsText['question-' + (x + 1)];
            textGridElem.appendChild(numElem);
            textGridElem.appendChild(textElem);
            var barGridElem = document.createElement('div');
            barGridElem.classList.add('bar-grid');
            var percentElem = document.createElement('div');
            percentElem.classList.add('percent');
            var percent = Math.round(questions['question-' + (x + 1) + '-1'].avg * 100) + '%';
            percentElem.innerText = percent;
            var barContainerElem = document.createElement('div');
            barContainerElem.classList.add('bar-container');
            var barFillElem = document.createElement('div');
            barFillElem.classList.add('bar-fill');
            barFillElem.style.width = percent;
            barContainerElem.appendChild(barFillElem);
            barGridElem.appendChild(percentElem);
            barGridElem.appendChild(barContainerElem);
            questionElem.appendChild(textGridElem);
            questionElem.appendChild(barGridElem);
            document.getElementById('quiz-comparison-app').appendChild(questionElem);
        }
    }

    function init() {
        categories();
        average();
    }

    Promise.all([new Promise(function (res, rej) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (data) {
            if (this.responseText) {
                questions = JSON.parse(this.responseText);
                res();
            }
        }
        xhttp.open('get', config.json.data, true);
        xhttp.send();
    }), new Promise(function (res, rej) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (data) {
            if (this.responseText) {
                questionsText = JSON.parse(this.responseText);
                res();
            }
        }
        xhttp.open('get', config.json.text, true);
        xhttp.send();
    })]).then(init);

})();