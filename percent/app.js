(function() {
    function answer() {
        // reset answers
        document.getElementsByClassName('answer-bubble')[0].innerHTML = '';
        document.getElementsByClassName('answer-bubble')[1].innerHTML = '';
        document.getElementsByClassName('answer-bubble')[2].innerHTML = '';
        // create fill element
        var fill = document.createElement('div');
        fill.classList.add('bubble-fill');
        fill.classList.add('animated');
        fill.classList.add('fadeIn');
        this.appendChild(fill);
    }
    // add answer functionality to buttons
    document.getElementsByClassName('answer-bubble')[0].onclick = answer;
    document.getElementsByClassName('answer-bubble')[1].onclick = answer;
    document.getElementsByClassName('answer-bubble')[2].onclick = answer;
})();