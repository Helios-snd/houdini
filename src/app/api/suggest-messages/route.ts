import { openai } from '@ai-sdk/openai';
import OpenAI from 'openai';
import { streamText, convertToCoreMessages, OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // const { messages } = await req.json();

    const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be seperated by '||'. These questions are for an annonymus social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this:'What's a hobby you've recently started?' || 'if you could have dinner with any opposite sex classmate of yours, who would it be?' || 'What's a simple thing that'll make you happy and win you over?'. Ensure the questions are intrguing, foster curiosity, and contribute to a positive and welcoming conversational enviorment. "

  const result = await streamText({
    model: openai('gpt-4-turbo'),
    messages: [{ role: 'user', content: prompt }],
  });


  return result.toDataStreamResponse();

  } catch (error) {
    if(error instanceof OpenAI.APIError){
        const {name, status, headers, message} = error
        return NextResponse.json({
            name, status, headers, message,
        }, {status})
    }else{
        console.error("An unexpected error occured")
        throw error
    }   
  }
}






// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY 
// });

// export const runtime = 'edge'
 
// export async function POST(req:Request) {
// try {
//     const {messages} = await req.json();
//     const response = await openai.chat.completions.create({
//         model: 'gpt-3.5-turbo',
//         stream: true,
//         messages,
//     });

//     const stream = OpenAIStream(response);
//     return new StreamingTextResponse(stream)
// } catch (error) {
    
// }
// }