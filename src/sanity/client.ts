import { createClient } from "next-sanity";

export const client = createClient({
    projectId: "kvx25mp3",
    dataset: "production",
    apiVersion: "2025-12-06",
    useCdn: false,
});