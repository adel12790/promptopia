
import { connectToDatabase } from "@utils/database";
import Prompt from "@models/Prompt";


// GET
export const GET = async (req, {params}) => {
    try {
        await connectToDatabase();

        const prompts = await Prompt.findById(params.id).populate('creator');

        if(!prompts) return new Response(JSON.stringify({message: 'Prompt not found'}), {status: 404});

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
// Patch
export const PATCH = async (req, {params}) => {
    const {prompt, tag} = await req.json();

    try {
        await connectToDatabase();

        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response(JSON.stringify({message: 'Prompt not found'}), {status: 404});

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

// DELETE
export const DELETE = async (req, {params}) => {
    try {
        await connectToDatabase();
        await Prompt.findByIdAndRemove(params.id);

        return new Response(JSON.stringify({message: 'Prompt deleted'}), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}