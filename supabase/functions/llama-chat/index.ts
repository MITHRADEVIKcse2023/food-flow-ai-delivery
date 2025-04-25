
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
    // For now, we'll simulate the response
    
    // Simulated LLaMA response - in production, replace with actual API call
    // This would be replaced with the actual API call to your LLaMA 3 instance
    let botResponse = "";
    let suggestions: string[] = [];
    
    if (message.toLowerCase().includes('recommend') || message.toLowerCase().includes('suggestion') || message.toLowerCase().includes('hungry')) {
      botResponse = "Based on your profile, I'd recommend trying the Spicy Thai Curry Bowl from Bangkok Street 🍜 or the Mediterranean Veggie Wrap from Green Life 🌯. Both have excellent ratings from customers with similar preferences!";
      suggestions = ["Show Thai food", "Show vegetarian options", "I want something else"];
    } 
    else if (message.toLowerCase().includes('track') || message.toLowerCase().includes('order') || message.toLowerCase().includes('delivery')) {
      botResponse = "I can help track your order! Could you provide your order number? If you don't have it, I can look it up using your name or phone number.";
      suggestions = ["My order number is #12345", "Look up by my phone", "When will my food arrive?"];
    }
    else if (message.toLowerCase().includes('special') || message.toLowerCase().includes('discount') || message.toLowerCase().includes('offer')) {
      botResponse = "Today's special offers: 20% off on all orders above $25 with code FLOW20, free delivery on your first 3 orders, and buy-one-get-one on selected desserts! 🎁";
      suggestions = ["Use FLOW20 code", "Show dessert offers", "Any weekend deals?"];
    }
    else {
      botResponse = "I'm here to help with food recommendations, track your orders, or answer questions about our service. What would you like assistance with today?";
      suggestions = ["Recommend food", "Track my order", "Show current offers"];
    }

    // In production, this would be the call to the LLaMA 3 API
    /*
    const llama3Response = await fetch('YOUR_LLAMA3_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('LLAMA_API_KEY')}`
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3-8b-chat",
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await llama3Response.json();
    botResponse = data.choices[0].message.content;
    
    // Extract suggestions from the response or generate them based on context
    suggestions = extractSuggestionsFromResponse(botResponse);
    */

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
