// Getting references to the input and output elements for terminal simulation
const inputElement = document.getElementById('input');
const outputElement = document.getElementById('output');

// Define the available commands
const commands = {
    'help': 'Available commands:\n- proxy [url]: Proxy a website\n- help: Show this help message\n- echo: [text]: Repeat your input\n- clear: Clear the terminal\n- getpub: Get your public IP address\n- location: Get the location of the current page\n- modules: Show a list of all available modules',
    'clear': function() {
        outputElement.innerHTML = '';
    },
    'echo': function(text) {
        return text || 'No input provided for echo.';
    },
    'location': function() {
        return "Location: " + window.location.href;
    },
    'proxy': function(url) {
        if (!url) {
            return 'Please provide a valid URL to proxy.';
        }
        
        // Open the proxy page with the provided URL
        window.open(`proxy.html?url=${encodeURIComponent(url)}`, '_blank');
        return `Attempting to proxy: ${url}`;
    },

    // Other commands...
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
