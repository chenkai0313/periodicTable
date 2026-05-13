import { getAllElements } from '../utils/elements';

export async function GET() {
  return new Response(JSON.stringify(getAllElements()), {
    headers: { 'Content-Type': 'application/json' },
  });
}
