import { NextResponse } from "next/server";

import gemini from "@/lib/gemini";

export async function POST(request) {
  try {
    const body = await request.json();

    const { messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Conversation messages are required.",
        },
        { status: 400 }
      );
    }

    const conversation = messages
      .map((message) => {
        const role = message.role === "assistant" ? "Assistant" : "User";

        return `${role}: ${message.content}`;
      })
      .join("\n");

    const prompt = `
You are a helpful AI travel assistant for Travel Unbounded.

Your job is to help users plan their trips.

You need to collect these six pieces of information:

1. Destination or destination type
2. Budget
3. Number of travelers
4. Trip duration
5. Interests
6. Travel dates

IMPORTANT RULES:

- Review the entire conversation before responding.
- Identify which of the six pieces of information are already available.
- If important information is missing, ask the user for one or two missing details.
- Do not ask for all missing details at once.
- Do not generate an itinerary until all six pieces of information are available.
- Keep normal conversation responses friendly and concise.

Once ALL six pieces of information are available, generate a day-wise itinerary.

When generating an itinerary, return ONLY valid JSON.

The JSON must have this exact structure:

{
  "type": "itinerary",
  "itinerary": [
    {
      "day": 1,
      "title": "Day title",
      "activities": [
        "Activity 1",
        "Activity 2",
        "Activity 3"
      ],
      "highlight": "Important highlight of the day"
    }
  ]
}

The number of days in the itinerary MUST match the user's trip duration.

If the trip duration is 5 days, generate Day 1 through Day 5.

Do not include markdown code fences around the JSON.

Here is the conversation:

${conversation}
`;

    const response = await gemini.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const reply = response.text?.trim();

    if (!reply) {
      throw new Error("Empty response from Gemini");
    }

    // Check whether Gemini returned JSON.
    try {
      const parsedResponse = JSON.parse(reply);

      if (
        parsedResponse.type === "itinerary" &&
        Array.isArray(parsedResponse.itinerary)
      ) {
        return NextResponse.json({
          success: true,
          type: "itinerary",
          itinerary: parsedResponse.itinerary,
        });
      }
    } catch {
      // Not JSON, so treat it as a normal conversation response.
    }

    return NextResponse.json({
      success: true,
      type: "message",
      reply,
    });
   } catch (error) {
    console.error("Chat API error:", error);

    if (error?.status === 429) {
      return NextResponse.json(
        {
          success: false,
          message:
            "I've reached my current AI usage limit. Please try again later.",
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          "Sorry, I'm having trouble planning your trip right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}