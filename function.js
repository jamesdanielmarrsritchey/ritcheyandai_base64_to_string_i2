function base64ToString(base64) {
    const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let byteArray = [];

    // Remove padding and validate characters
    base64 = base64.replace(/=+$/, '');
    if (!/^[A-Za-z0-9+/]*$/.test(base64)) {
        throw new Error('Invalid Base64 input.');
    }

    // Convert Base64 to a byte array
    for (let i = 0; i < base64.length; i += 4) {
        // Get the binary representation of each Base64 character
        let bin = base64.substring(i, i + 4).split('').map(char => {
            const index = base64Chars.indexOf(char);
            return index.toString(2).padStart(6, '0');
        }).join('');

        // Convert every 8 bits in the binary string to a byte
        for (let j = 0; j < 24; j += 8) {
            let byte = bin.substring(j, j + 8);
            if (byte.length === 8) { // Ignore padding bits
                byteArray.push(parseInt(byte, 2));
            }
        }
    }

    // Use TextDecoder to decode the byte array into a string
    const decoder = new TextDecoder(); // Default is UTF-8
    return decoder.decode(new Uint8Array(byteArray));
}

/*
Example:

window.onload = function() {
    const element = document.querySelector("#myElement");
    if (element) {
        const result = base64ToString(element.innerHTML);
        element.innerHTML = result;
    }
};

OnClick Example: 

document.querySelector("#myButton").addEventListener("click", function() {
    const element = document.querySelector("#myElement");
    if (element) {
        const result = base64ToString(element.innerHTML);
        element.innerHTML = result;
    }
});

*/