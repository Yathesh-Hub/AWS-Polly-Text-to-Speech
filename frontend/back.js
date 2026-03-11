async function generate() {
    const text = document.getElementById("text").value;
    const voice = document.getElementById("voice").value;
    const response = await fetch("http://localhost:3000/speak", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text, voice })
    });
    const blob = await response.blob();
    const audioURL = URL.createObjectURL(blob);
    document.getElementById("audio").src = audioURL;
}