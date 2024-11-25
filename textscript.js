document.getElementById('saveButton').addEventListener('click', function() {
    // Get the text from the textarea
    const text = document.getElementById('textInput').value;

    // Prompt the user for the filename
    const filename = prompt('Enter the filename (without extension):', 'myTextFile');
    
    // If no filename is provided, use a default name
    if (!filename) {
        alert('No filename provided, using default: myTextFile');
        filename = 'myTextFile';
    }

    // Set the file type (defaults to text/plain)
    const fileType = 'text/plain';

    // Create a Blob with the text content
    const blob = new Blob([text], { type: fileType });

    // Create a link element to trigger the download
    const link = document.createElement('a');
    
    // Create a URL for the Blob and set it as the download link's href
    link.href = URL.createObjectURL(blob);

    // Set the filename for the download with the .txt extension
    link.download = filename;

    // Trigger a click event on the link to start the download
    link.click();
});
