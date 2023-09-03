import { connectToDatabase } from "@utils/database";
import Prompt from "@models/Prompt";

export const POST = async (req) => {
        const { userId, prompt, tag } = await req.json();
        
        try {
            await connectToDatabase();

            console.log(prompt, tag, userId);

            const newPrompt = new Prompt({
                creator: userId,
                prompt,
                tag,
            });

            await newPrompt.save();

            return new Response(JSON.stringify(newPrompt), { status: 201 });
        } catch (error) {
            console.error(error);
            return new Response(JSON.stringify(error), { status: 500 });
        }
};