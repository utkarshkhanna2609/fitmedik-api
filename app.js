"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const openai_1 = require("openai");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const openai = new openai_1.OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
app.post('/chat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userMessage = req.body.message;
        const response = yield openai.chat.completions.create({
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
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'Error processing your request' });
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
