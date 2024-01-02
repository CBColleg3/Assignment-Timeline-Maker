import chatGPTKey from "../../secrets/chatgptkey";

import { OpenAIApi, Configuration, ChatCompletionResponseMessageRoleEnum } from "openai";


const prefixPrompt = "Please provide a sequence of actions from the following list that best represents the message:  "

const suffixPrompt = ": [walk_forward, walk_back, jump_forward, kick, punch, uppercut, crhook, roundhouse, random]. Your job is to make a new array of the message given. You can only select options from the original list, if there's anything not in the original list the array fails. If you're unable to translate something then select the random option. ";

const configuration = new Configuration({
    apiKey: chatGPTKey,
  });

  
const openai = new OpenAIApi(configuration);
const conversationContext: string[][] = [];
const currentMessages = [];


export const generateResponse = async (prompt: string) => {
    try {
      const modelId = "gpt-3.5-turbo";
      const promptText = `${prefixPrompt + prompt + suffixPrompt}\n\nResponse:`;
      const currentMessages = [];
  
      // Restore the previous context
      for (const [inputText, responseText] of conversationContext) {
        currentMessages.push({ role: ChatCompletionResponseMessageRoleEnum.User, content: inputText });
        currentMessages.push({ role: ChatCompletionResponseMessageRoleEnum.Assistant, content: responseText });
      }
  
      // Stores the new message
      currentMessages.push({ role: ChatCompletionResponseMessageRoleEnum.User, content: promptText });
  
      const result = await openai.createChatCompletion({
        model: modelId,
        messages: currentMessages,
      });
  
      const responseText = result.data.choices.shift()?.message?.content;

      if(responseText !== undefined) {
        conversationContext.push([promptText, responseText]);
      }

  
      return responseText;
    } catch (err) {
      console.error(err);
      throw new Error("Internal server error");
    }
  };