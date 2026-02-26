const apiKey = process.env.GEMINI_API_KEY || "AIzaSyB-Ze1LuRGlkkP0pAGbo2I_8oQ-s_c0s2w";

async function run() {
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await res.json();
        console.log("Response Status:", res.status);
        if (data.error) {
            console.error("API Error:", data.error);
        } else if (data.models) {
            console.log("Available models:", data.models.map(m => m.name).join(", "));
        } else {
            console.log("Unexpected data:", data);
        }
    } catch (err) {
        console.error("Fetch failed", err);
    }
}
run();
