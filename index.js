const express = require('express');
const app = express();
var cors = require('cors')
const { Configuration, OpenAIApi } = require("openai");

require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(express.json());

// server.use(cors({ origin: appConfig.frontendUrl })); // Enable only to our frontend.
app.use(cors({ origin: 'https://chat-gpt-kobi-krasnoff.surge.sh' }));

app.post('/', async (req, res) => {
    console.log("Just got a request!")
    
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.body,
        max_tokens: 100,
        temperature: 0.9,
    });

    res.json(response.data);
    // res.json('ff');
})

app.listen(process.env.PORT || 3001)
