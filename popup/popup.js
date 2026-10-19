window.onload = function () {
    const addRuleButton = document.getElementById('addRule');
    const closeBtn = document.getElementById('closeBtn');
    console.log(addRuleButton)
    const overlay = document.getElementById('overlay');
    addRuleButton.addEventListener('click', () => {
        overlay.style.display = 'flex';
    });
    closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
    });
}
//overlay.style.display = 'flex';
//overlay.style.display = 'none';

