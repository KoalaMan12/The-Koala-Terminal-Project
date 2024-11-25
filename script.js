const inputElement = document.getElementById('input');
const outputElement = document.getElementById('output');

// Command responses
const commands = {
    'help': 'Available commands:\n- scpt: Open a new scripting tab\n- help: Show this help message\n- echo: [text]: Repeat your input\n- clear: Clear the terminal\n- rep: [number] [text]: Repeat the text [number] of times\n- newtab: Make a new terminal window\n- getpub: Get your public IP address\n- location: Get the location of the current page\n- modules: Show a list of all available modules',
    
    'clear': function() {
        outputElement.innerHTML = '';
    },
    
    'echo': function(text) {
        return text || 'No input provided for echo.';
    },

    'location': function() {
        return "Location: " + window.location.href; 
    },

    'getpub': function() {
        // Fetch public IP address using ipify API
        return fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => `Public IP Address: ${data.ip}`)
            .catch(() => 'Unable to fetch IP address. Please check your connection or try again later.');
    },

    'newtab': function() {
        // Open a new terminal window (for demonstration, we can just open a new tab to an empty page or another URL)
        window.open('index.html', '_blank'); // Open a new blank tab
        return 'Opened a new tab.';
    },
    
    'scpt': function() {
        // Open a new terminal window (for demonstration, we can just open a new tab to an empty page or another URL)
        window.open('textindex.html', '_blank'); // Open a new blank tab
        return 'Opened a script tab.';
    },

    'rep': function(input) {
        // Split the input into the number and text
        const parts = input.split(' ');
        const repeatCount = parseInt(parts[0], 10); // Get the repeat count as a number
        const textToRepeat = parts.slice(1).join(' '); // Get the text to repeat (may include spaces)

        if (isNaN(repeatCount)) {
            return 'Invalid number specified for repetition.';
        }
        if (!textToRepeat) {
            return 'No text provided for repetition.';
        }

        let result = '';
        for (let i = 0; i < repeatCount; i++) {
            result += textToRepeat + '\n';
        }
        return result;
    }
    
};

// Handle user input
inputElement.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const command = inputElement.value.trim(); // Trim the input to remove excess spaces
        const [cmd, ...args] = command.split(' ');

        // Display the command in the output
        const output = document.createElement('div');
        output.textContent = `$ ${command}`;
        outputElement.appendChild(output);

        // Execute the command
        if (commands[cmd]) {
            const result = typeof commands[cmd] === 'function' ? commands[cmd](args.join(' ')) : commands[cmd];
            if (result instanceof Promise) {
                // Handle promise (e.g., for getpub)
                result.then(response => {
                    const resultOutput = document.createElement('div');
                    resultOutput.textContent = response;
                    outputElement.appendChild(resultOutput);
                    outputElement.scrollTop = outputElement.scrollHeight;
                }).catch(err => {
                    const resultOutput = document.createElement('div');
                    resultOutput.textContent = `Error: ${err.message}`;
                    outputElement.appendChild(resultOutput);
                    outputElement.scrollTop = outputElement.scrollHeight;
                });
            } else {
                const resultOutput = document.createElement('div');
                resultOutput.textContent = result;
                outputElement.appendChild(resultOutput);
                outputElement.scrollTop = outputElement.scrollHeight;
            }
        } else {
            const errorOutput = document.createElement('div');
            errorOutput.textContent = `Command not found: ${cmd}. You typed: ${command}`;
            outputElement.appendChild(errorOutput);
            outputElement.scrollTop = outputElement.scrollHeight;
        }

        // Clear the input
        inputElement.value = '';
    }
});
