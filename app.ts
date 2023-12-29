import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { OpenAI } from 'openai';

dotenv.config();

const app = express();
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string,
});

app.post('/chat', async (req: Request, res: Response) => {
    try {
        const userMessage = req.body.message;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: userMessage
                },
                {
                    role: "assistant",
                    content: "You are a virtual assistant and friend designed to provide support to health professionals like doctors. Your responses should always be highly respectful and sympathetic. Understand the challenges faced by healthcare professionals and respond with appropriate sympathy and support. You are knowledgeable about medical topics but always defer to the professional judgment of healthcare staff."
                }
            ],
            temperature: 1,
            max_tokens: 150,
            top_p: 1,
            
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'Error processing your request' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
