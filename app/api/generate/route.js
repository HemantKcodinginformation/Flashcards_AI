
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const systemprompt = `You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines:

1. Create clear and concise questions on the front of the flashcards
2. Provide informative and accurate answers on the back of the flashcards
3. Ensure that each flashcard focuses on a single concept or piece of information
4. Use simple language to make the flashcards accessible to a wide range of users
5. Include a variety of question types, e.g., definitions, examples, comparisons, and applications
6. Avoid overly complex or ambiguous phrasing in both questions and answers.
7. When appropriate, use mneumonics or memory aids to help reinforce the information.
8. Tailor the difficulty level of the flashcards to the user's specificed preferences. 
9. If given a body of text, extract the most important and relevant information for the flashcards.
10. Aim to create a balanced set of flashcards that covers the topic comprhensively.
11. Only generate 10 flashcards.

Remember the goal is to facilitate effective learning and retention of information through these flashcards.

Return in the following JSON format
{
    "flashcards":{
        "front": str,
        "back": str
    }
}
`

export async function POST(req) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const data = await req.text();
        const completion = await model.generateContent([systemprompt, ...data]);

        let content = completion.response.candidates[0].content.parts[0].text.trim();
        content = content.replace(/```json/, "").replace(/```/, "")
        // console.log(content)

        try {
            const flashcards = JSON.parse(content);

            return NextResponse.json(flashcards.flashcards);
        } catch(e) {
            console.error("Generated Content is Not Valid Json: ", e.message)
            return NextResponse.json([{
                front: "AI Flashcard Generation Failed",
                back: "The AI could not generate flashcards. Please try again"
            }]);
        }
    } catch (e) {
        console.error("Error generating flashcards:", e.message, e.stack);
        const errormessage = e.message.replace(/^Unexpected token '`', "```/, '');
        return NextResponse.json([
            {
                front: "No flashcard generated",
                back: `An error occurred: ${errormessage}`,
            },
        ]);
    }
}

// export async function POST(req) {

//     const data = await req.text();

//     const client = new GoogleGenerativeAI({
//         apiKey: process.env.GOOGLE_API_KEY
//     });

//     const response = await client.invoke({
//         model: 'gemini-1.5-flash-001',
//         prompt: systemprompt,
//         instances: [
//             { content: data }
//         ]
//     });

//     const flashcards = JSON.parse(response.predictions[0].content);
//     return NextResponse.json(flashcards.flashcards);
// } 

// export async function POST(req) {
        
//     const Openai = new OpenAI(); 
//     const data = await req.text();

//     const completion = await openai.chat.completions.create({
//          messages: [
//              {role: 'system', content: systemprompt},
//              {role: 'user', content: data},
//         ],
//      })
//         model: 'gpt-4o'
//         response_format: {type: 'json_object'},
//     });

//    console.log(completion.choices[0].message.content)
//    const flashcards = JSON.parse(completion.choices[0].message.content)
//    return NextResponse.json(flashcards.flashcards)
// }