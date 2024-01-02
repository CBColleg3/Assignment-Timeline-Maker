import chatGPTKey from "../../secrets/chatgptkey";

//import { OpenAIApi, Configuration, ChatCompletionResponseMessageRoleEnum } from "openai";

import OpenAI, { NotFoundError } from 'openai';

const prefixPrompt = "";

const suffixPrompt = "";


//generate with API Key given from configuration
const openai = new OpenAI({
    apiKey: chatGPTKey,
});
const conversationContext: string[][] = [];
const currentMessages = [];


export const generateResponse = async (prompt: string) => {
    try {

        const modelId = "gpt-3.5-turbo";
        const promptText = `${prefixPrompt + prompt + suffixPrompt}\n`;
        const currentMessages = [];

        const result = await openai.completions.create({
        prompt: promptText,
        model: modelId
        });

        console.log("resultChoices: " + result.choices);

        const responseText = result.choices.shift()?.text;

        if(responseText !== undefined) {
        conversationContext.push([promptText, responseText]);
        }
        
        console.log("responseText: " + responseText);
        return responseText;

    } catch (err) {
        //Sample Error Code from Example.
        if (err instanceof NotFoundError) {
            console.log(`Caught NotFoundError!`);
            console.log(err);
            console.log(`message: `, err.message);
            console.log(`code: `, err.code);
            console.log(`type: `, err.type);
            console.log(`param: `, err.param);
        } else {
            console.log(`Raised unknown error`);
            throw err;
        }
    }
  };