// Change to use of .env file!
const API_KEY = 'Your-key-here';

const userInput = document.getElementById('user-input').value;
const textOutput = document.getElementById('text-output');
const submit = document.getElementById('submit-button');

const prompt = 
  `Reword the following text in 3 different ways. The response should be in English with a Humorous tone. The length should be Shortened. Only respond with the reworded text, with a new line following all but the last response: ${userInput}`

submit.addEventListener('click', async(e) => {
    e.preventDefault();
    const myText = userInput.trim();

    if(myText){
        try{
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{role: 'user', content: prompt}],
                    temperature: 1.0,
                    top_p: 0.7,
                    n: 1, 
                    presence_penalty: 0,
                    frequency_penalty: 0,
                }),
            });

            if (response.ok){
                const data = await response.json();
                textOutput.value = data.choices[0].message.content;
            }else{
                textOutput.value = 'Error: Unable to process your request.';
            }

            } catch (error){
                console.error(error);
                textOutput.value = 'Error: Unable to process your request.';
            }
        }
    });