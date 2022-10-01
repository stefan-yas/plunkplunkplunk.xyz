function randomEmoji() {
    const emojis = ["☉", "☘", "☠", "☯", "☼", "☽", "☾", "♡", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅", "⚛", "⚪", "⚫", "⚶", "⚼", "⛬"];
    const input = document.querySelectorAll(".kaomoji");
    let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    input.forEach(function (button) {
        button.innerHTML = randomEmoji;
    });
}