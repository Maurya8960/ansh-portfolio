import { GoogleGenerativeAI } from "@google/generative-ai";
import knowledgeBase from "./knowledge-base.json";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const chatModel = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

function getAllChunks() {
  const chunks = [];
  for (const section of knowledgeBase.sections) {
    for (const chunk of section.chunks) {
      chunks.push({ text: chunk.text, source: chunk.source, section: section.title });
    }
  }
  return chunks;
}

// Enhanced keyword matching with synonyms and related terms
function getRelevanceScore(query, chunk) {
  const queryLower = query.toLowerCase();
  const textLower = chunk.text.toLowerCase();
  const sourceLower = chunk.source.toLowerCase();
  let score = 0;
  
  // Direct keyword matching
  const keywords = queryLower.split(/\s+/).filter(w => w.length > 2);
  for (const word of keywords) {
    if (textLower.includes(word)) {
      score += 2;
    }
  }
  
  // Check source match
  if (queryLower.includes(sourceLower) || sourceLower.includes(queryLower)) {
    score += 5;
  }
  
  // Enhanced matching for common queries
  const topicMappings = {
    'internship': ['experience', 'codec', 'full stack developer intern'],
    'project': ['traintrackpro', 'ai agent', 'book data', 'inventory', 'built'],
    'tech': ['skills', 'react', 'node', 'python', 'javascript', 'database'],
    'stack': ['skills', 'react', 'node', 'python', 'javascript', 'database'],
    'certification': ['certifications', 'ibm', 'codec', 'stp'],
    'education': ['education', 'b.tech', 'school', 'college', 'aktu'],
    'skill': ['skills', 'react', 'node', 'python', 'javascript'],
    'database': ['skills', 'mysql', 'postgresql', 'mongodb'],
    'docker': ['skills', 'docker', 'container'],
    'rag': ['traintrackpro', 'langchain', 'rag'],
    'langchain': ['traintrackpro', 'langchain', 'rag'],
    'experience': ['experience', 'codec', 'intern'],
    'study': ['education', 'b.tech', 'aktu'],
    'college': ['education', 'b.tech', 'aktu'],
    'work': ['experience', 'codec', 'intern'],
  };
  
  for (const [topic, relatedTerms] of Object.entries(topicMappings)) {
    if (queryLower.includes(topic)) {
      for (const term of relatedTerms) {
        if (textLower.includes(term)) {
          score += 4;
        }
      }
    }
  }
  
  return score;
}

function getRelevantChunks(query, topK = 5) {
  const chunks = getAllChunks();
  const scored = chunks.map((chunk) => ({
    chunk,
    score: getRelevanceScore(query, chunk),
  }));
  
  scored.sort((a, b) => b.score - a.score);
  
  // Always return at least 3 chunks, even if scores are low
  const relevantChunks = scored.slice(0, topK).map((item) => item.chunk);
  
  return relevantChunks;
}

const SYSTEM_PROMPT = `You are Ansh Maurya's personal AI assistant, answering questions from recruiters and interviewers about his professional background. 

IMPORTANT RULES:
1. ALWAYS answer based on the provided context about Ansh
2. Speak about Ansh in third person (he/his)
3. Be professional and concise (2-4 sentences)
4. If the context contains relevant information, ALWAYS use it to answer
5. Only if the context truly has NO relevant information, say: "I don't have that specific detail, but Ansh would be happy to discuss this further at maurya1.ansh@gmail.com"
6. Never invent information not in the context
7. Always try to find SOMETHING relevant to say about Ansh's background

Context about Ansh Maurya:
{context}`;

export async function generateAnswer(query) {
  try {
    const relevantChunks = getRelevantChunks(query);
    const context = relevantChunks
      .map((c) => `[${c.source}]\n${c.text}`)
      .join("\n\n");
    
    const prompt = SYSTEM_PROMPT.replace("{context}", context) + `\n\nQuestion: ${query}\n\nAnswer:`;
    
    const result = await chatModel.generateContent(prompt);
    const response = result.response;
    const answer = response.text();
    const sources = relevantChunks.map((c) => c.source);
    
    return { answer, sources };
  } catch (error) {
    console.error("Gemini API error:", error);
    
    // Fallback: Return relevant info directly from knowledge base
    const relevantChunks = getRelevantChunks(query, 3);
    const fallbackAnswer = `Here's what I know about Ansh: ${relevantChunks[0]?.text || "He is a Full Stack Developer from Kanpur, India with experience in React, Node.js, and AI integration."}`;
    const sources = relevantChunks.map((c) => c.source);
    
    return { answer: fallbackAnswer, sources };
  }
}
