function submitPoll() {
    const selectedEditor = document.querySelector('input[name="editor"]:checked');
    if (selectedEditor) {
        const editorValue = selectedEditor.value;
        document.getElementById(`result-${editorValue.toLowerCase()}`).textContent++;
        document.getElementById('poll-form').style.display = 'none';
        document.getElementById('poll-results').style.display = 'block';
    } else {
        alert('Please select an option.');
    }
}
