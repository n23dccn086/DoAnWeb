import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';

export async function callGemini(prompt) {
  const geminiFunction = httpsCallable(functions, 'callGemini');
  const result = await geminiFunction({ prompt });
  return result.data.text;
}