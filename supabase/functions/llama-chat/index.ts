import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Store conversation sessions for context persistence
const sessions = new Map();

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, user_id, context } = await req.json();

    if (!message) {
      throw new Error('No message provided');
    }

    // Get or create session for user
    let sessionId = user_id || 'anonymous';
    if (!sessions.has(sessionId)) {
      sessions.set(sessionId, { 
        lastResponses: [],
        orderContext: null,
        foodContext: null 
      });
    }
    
    const session = sessions.get(sessionId);

    // Build the system prompt
    const systemPrompt = `You are FlowBot, a friendly AI assistant for the Flow food delivery app.
Your primary functions are:
1. Recommend food to users based on their mood, diet preferences, or cravings
2. Help track orders using order ID or user information
3. Answer FAQs about delivery times, restaurant options, and current offers
4. Provide friendly, concise, and helpful responses

When recommending food:
- Suggest specific dishes, not just general food types
- Consider dietary restrictions if mentioned
- Include emojis appropriate to the food type

When helping track orders:
- Ask for order ID if not provided
- Provide estimated delivery times
- Offer to connect with support for issues

Keep your responses under 3 sentences when possible. Be conversational but efficient.`;

    // Format the conversation history properly
    let messages = [
      { role: 'system', content: systemPrompt },
    ];

    // Add conversation history if available
    if (context?.chat_history && Array.isArray(context.chat_history)) {
      messages = [...messages, ...context.chat_history];
    }

    // Add the current user message
    messages.push({ role: 'user', content: message });

    // In a real implementation, here you would call the LLaMA 3 API
    // For now, we'll simulate the response with improved context awareness
    
    // Check if we're continuing an existing conversation about an order
    const lowerMessage = message.toLowerCase();
    let botResponse = "";
    let suggestions: string[] = [];
    
    // Avoid repetitive responses by checking if we're repeating ourselves
    const isRepetitiveResponse = session.lastResponses.some(
      resp => resp.message === message
    );

    if (isRepetitiveResponse && session.lastResponses.length > 0) {
      // If user repeats the same message or we detect a loop, respond differently
      botResponse = "I notice we might be going in circles. Let me help you more directly. What specifically are you looking for today?";
      suggestions = ["Show restaurant menu", "Help with my order", "Speak to customer service"];
    }
    // Specific response logic with context awareness
    else if (session.orderContext && (lowerMessage.includes('order') || lowerMessage.includes('#12345'))) {
      // User already mentioned order context, provide order details
      botResponse = `I found your order #12345! Your Butter Chicken and Naan are on the way, estimated delivery in 25 minutes (by 3:15 PM). Your driver, Alex, is currently picking up your food.`;
      suggestions = ["Show delivery map", "Contact driver", "Modify my order"];
      session.orderContext = "#12345";
    }
    else if (lowerMessage.includes('indian') || lowerMessage.includes('options')) {
      botResponse = "For Indian cuisine, I'd recommend: Taj Palace's Butter Chicken 🍛 ($15.99, highly rated 4.8⭐), Delhi Bistro's Vegetable Biryani 🍚 ($13.50, vegan option), and Spice Garden's Lamb Rogan Josh 🐑 ($16.99, customer favorite). Would you like to see more details on any of these?";
      suggestions = ["View Butter Chicken", "View Vegetable Biryani", "More Indian options"];
      session.foodContext = "indian";
    }
    else if (lowerMessage.includes('recommend') || lowerMessage.includes('suggestion') || lowerMessage.includes('hungry') || lowerMessage === "✨ recommend food") {
      botResponse = "Based on popular choices today, I'd recommend trying the Spicy Thai Curry Bowl from Bangkok Street 🍜, the Mediterranean Veggie Wrap from Green Life 🌯, or the Classic Burger from Grill Master 🍔. Which cuisine are you in the mood for?";
      suggestions = ["Indian food", "Italian food", "Show more options"];
    } 
    else if (lowerMessage.includes('track') || lowerMessage.includes('order') || lowerMessage.includes('delivery') || lowerMessage === "📦 track my order") {
      botResponse = "I can help track your order! Could you provide your order number? If you don't have it, I can look it up using your name or phone number.";
      suggestions = ["My order number is #12345", "Look up by my phone", "When will my food arrive?"];
    }
    else if (lowerMessage.includes('special') || lowerMessage.includes('discount') || lowerMessage.includes('offer') || lowerMessage.includes('deal') || lowerMessage === "🏷️ show current offers" || lowerMessage === "🏷️ show today's offers") {
      botResponse = "Today's special offers: 20% off on all orders above $25 with code FLOW20, free delivery on your first 3 orders, and buy-one-get-one on selected desserts! 🎁";
      suggestions = ["Use FLOW20 code", "Show dessert offers", "Any weekend deals?"];
    }
    else if (lowerMessage === "hi" || lowerMessage === "hello" || lowerMessage === "hey") {
      botResponse = "Hello! 👋 I'm FlowBot, your food delivery assistant. What can I help you with today?";
      suggestions = ["✨ Recommend food", "📦 Track my order", "🏷️ Show current offers"];
    }
    else {
      botResponse = "I'm here to help with food recommendations, track your orders, or answer questions about our service. What would you like assistance with today?";
      suggestions = ["✨ Recommend food", "📦 Track my order", "🏷️ Show current offers"];
    }

    // Remember this conversation to prevent loops
    session.lastResponses.push({
      message,
      response: botResponse
    });
    
    // Keep only the last 5 exchanges to prevent memory bloat
    if (session.lastResponses.length > 5) {
      session.lastResponses.shift();
    }

    return new Response(
      JSON.stringify({
        text: botResponse,
        suggestions: suggestions
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in LLaMA chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

/* 
// Helper function to extract suggestions from LLaMA response - would be used with real API
function extractSuggestionsFromResponse(response: string): string[] {
  // Simple implementation - in a real app, you might use a more sophisticated approach
  // or have LLaMA return structured data with suggestions included
  const suggestions = [];
  
  if (response.toLowerCase().includes('food') || response.toLowerCase().includes('dish')) {
    suggestions.push('Show me more options');
  }
  
  if (response.toLowerCase().includes('order') || response.toLowerCase().includes('delivery')) {
    suggestions.push('Track my order');
  }
  
  if (response.toLowerCase().includes('discount') || response.toLowerCase().includes('offer')) {
    suggestions.push('Show all deals');
  }
  
  // Add a generic suggestion if none were extracted
  if (suggestions.length === 0) {
    suggestions.push('Tell me more');
    suggestions.push('Help with something else');
  }
  
  return suggestions;
}
*/
