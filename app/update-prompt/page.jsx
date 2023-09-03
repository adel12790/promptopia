"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import  Form from '@components/Form';

const EditPrompt = () => {
    const [ submitting, setSubmitting ] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    })
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");

    useEffect(() => {
        const getPromptsDetails = async () => {
            const res = await fetch(`/api/prompt/${promptId}`);
            const data = await res.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        }

        if(promptId) getPromptsDetails();
    }, [promptId]);

    const editPrompt = async (e) => {
        e.preventDefault();

        setSubmitting(true);

        if(!promptId) return alert("Prompt ID not found");

        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });

            if(res.ok) {
                router.push('/')
            }
        } catch (error) {
            console.error(error)
        
        } finally {
            setSubmitting(false);
        }
    };

    return (
    <Form
        type="Edit"
        post={post}
        setpost={setPost}
        submitting={submitting}
        handleSubmit={editPrompt}
    />
  )
}

export default EditPrompt