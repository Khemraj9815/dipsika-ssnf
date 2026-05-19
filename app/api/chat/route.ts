import { NextRequest, NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Log to help debug
console.log('[Chat API] GROQ_API_KEY present:', !!GROQ_API_KEY);
console.log('[Chat API] GROQ_API_URL:', GROQ_API_URL);


// Fallback responses for when API is unavailable
const fallbackResponses: { [key: string]: string } = {
  'hello': 'Hi there!  Welcome to Southern Seedling Nursery Farm. How can I help you today?',
  'hi': 'Hello! 🌿 I\'m here to help. What would you like to know about our plants and services?',
  'plant': 'We have a wide variety of plants including fruit trees, ornamental plants, timber trees, foliage plants, and lawn grasses. Browse our full catalog or ask me specifically what you\'re looking for!',
  'summer': 'Summer is a great season for planting! Heat-tolerant plants like mango, lemon, and some ornamental varieties thrive. We can recommend specific plants for your location and climate.',
  'good to plant': 'Great question! It depends on the season and your location. For summer, consider heat-tolerant varieties. For other seasons, we have different recommendations. What\'s your location and preferred plant type?',
  'plant care': 'For plant care, I recommend: 1) Regular watering, 2) Proper sunlight, 3) Good drainage, 4) Seasonal fertilization. Check each product page for specific guidelines!',
  'watering': 'Watering depends on the plant type. Most plants need water when soil is dry to touch. Indoor plants typically need less water than outdoor ones.',
  'water': 'Most plants need consistent moisture but not waterlogged soil. Water when the top inch of soil is dry. Different plants have different needs - ask me about specific plants!',
  'fertilizer': 'We recommend using organic fertilizers for best results. Apply during growing seasons (spring/summer). Follow package instructions for dosage.',
  'fertilize': 'Fertilizing helps plants grow strong! Use organic fertilizers during growing seasons. We can recommend specific products for your plants.',
  'planting': 'For planting tips: 1) Prepare well-draining soil, 2) Dig appropriate depth, 3) Water gently after planting, 4) Place in suitable light conditions.',
  'plant tips': 'Key planting tips: Choose the right location for sunlight, prepare soil with good drainage, water after planting, and fertilize seasonally. Ask about specific plants for best advice!',
  'delivery': 'We deliver across Bhutan! Standard delivery: 5-7 days, Express delivery: 2-3 days. A 10% delivery fee applies. We ensure safe transport of all plants.',
  'delivery fee': 'The delivery fee is 10% of your order total. It covers safe packaging and nationwide delivery across Bhutan.',
  'ship': 'We can ship your plants throughout Bhutan. Standard delivery takes 5-7 days, express takes 2-3 days. Let me know if you have any concerns!',
  'order': 'To place an order: 1) Browse our catalog, 2) Add items to cart, 3) Review your cart, 4) Proceed to checkout. You\'ll receive order confirmation via email!',
  'buy': 'You can browse our product catalog, add items to your cart, and checkout. It\'s easy! What plants are you interested in?',
  'purchase': 'Ready to order? Browse our Shop, add plants to your cart, and proceed to checkout. We\'ll deliver them safely to you!',
  'services': 'We offer two main services: 1) Landscape Design & Installation, 2) Orchard Management. Book online on our Services page!',
  'landscape': 'Our Landscape Design service includes site analysis, custom design, plant selection, professional installation, and maintenance plans. Perfect for homes and businesses!',
  'design': 'Our design service helps you create beautiful outdoor spaces with the right plant selection and layout. Contact us for a consultation!',
  'orchard': 'Our Orchard Management service covers soil testing, planting guidance, irrigation planning, pest management, and seasonal maintenance.',
  'farm': 'We provide comprehensive farm and orchard management services including soil analysis, pest control, and maintenance plans.',
  'products': 'We offer: 1) Fruit Trees, 2) Ornamental Plants, 3) Timber Trees, 4) Foliage Plants, 5) Lawn Grasses. Browse our full catalog on the Shop page!',
  'fruit': 'We have various fruit trees including mango, lemon, orange, and more. Perfect for home gardens and commercial orchards!',
  'fruit trees': 'We have various fruit trees including mango, lemon, orange, and more. Perfect for home gardens and commercial orchards!',
  'ornamental': 'Our ornamental plants include roses, orchids, and decorative foliage plants to beautify your spaces.',
  'trees': 'We offer a variety of trees: fruit trees, timber trees, and ornamental trees. What type are you interested in?',
  'about': 'Southern Seedling Nursery Farm is a family-run business established in 2001. We\'ve been providing quality plants across 16+ dzongkhags in Bhutan for over 25 years!',
  'history': 'We\'ve been in business since 2001, serving Bhutan with quality plants and expert advice for over 20 years!',
  'company': 'We\'re located in Gelephu, Bhutan. Our mission: "Nurturing Nature, Earning Trust." We serve farmers, households, hotels, resorts, and government agencies.',
  'contact': 'You can reach us at: 📍 Samtenling, Bhur, Gelephu | 📞 +975 17 123456 | ✉️ info@southernseedling.com',
  'address': 'Southern Seedling Nursery Farm, Samtenling, Bhur, Gelephu, Bhutan 🗺️',
  'location': 'We\'re based in Gelephu, Bhutan. You can visit us or order online for nationwide delivery!',
  'hours': 'Our business hours: Monday-Friday 8AM-5PM, Saturday 9AM-3PM. Online support available 24/7!',
  'phone': 'Call us at +975 17 123456 during business hours (Mon-Fri 8AM-5PM, Sat 9AM-3PM).',
  'email': 'You can email us at info@southernseedling.com. We respond within 24 hours!',
  'payment': 'We accept various payment methods at checkout. All transactions are secure and encrypted for your safety.',
  'price': 'Prices vary by plant type and size. Check our product catalog for specific pricing. We also offer bulk discounts!',
  'tracking': 'After placing your order, you\'ll receive an email with tracking information. You can also check your order status in your account.',
  'track order': 'Once your order ships, we\'ll email you tracking details. You can monitor your shipment status online!',
  'return': 'If you receive a damaged plant, contact us within 24 hours for replacement or refund. Your satisfaction is our priority!',
  'help': 'I can assist you with: 🌿 Plant care tips, 🚚 Delivery info, 📦 Orders, 💼 Services, 📞 Contact details, or browse our 🌻 Products. What interests you?',
  'thanks': 'You\'re welcome! 😊 Feel free to ask if you need anything else!',
  'thank you': 'Happy to help! 🌿 Don\'t hesitate to reach out anytime!',
  'bye': 'Goodbye! Thanks for visiting Southern Seedling. Happy gardening! 👋',
  'goodbye': 'See you soon! Take care of your plants! 🌱',
  'thanks for': 'You\'re welcome! We appreciate your business! 😊',
  'default': 'Great question! I can help with: 🌿 Plant care tips, 🚚 Delivery info, 📦 Orders, 💼 Services, 📞 Contact details, or browse our 🌻 Products. What interests you?',
};

// Improved keyword matching function with word-level matching
function findBestResponse(message: string): string {
  const lowerInput = message.toLowerCase();
  
  // Split message into words for better matching
  const words = lowerInput.split(/\s+/);
  
  let bestMatch = '';
  let maxLength = 0;

  // Find the longest matching keyword (prioritize longer/more specific matches)
  for (const key of Object.keys(fallbackResponses)) {
    if (key === 'default') continue;
    
    const keyWords = key.split(/\s+/);
    
    // Check if message contains all words of the keyword
    let allWordsMatch = keyWords.length > 0;
    for (const keyWord of keyWords) {
      if (!words.some(word => word.includes(keyWord) || keyWord.includes(word))) {
        allWordsMatch = false;
        break;
      }
    }
    
    // Also check for simple substring match
    const hasSubstring = lowerInput.includes(key);
    
    if ((allWordsMatch || hasSubstring) && key.length > maxLength) {
      bestMatch = key;
      maxLength = key.length;
    }
  }

  // If no exact match found, try to find partial matches
  if (!bestMatch) {
    for (const word of words) {
      for (const key of Object.keys(fallbackResponses)) {
        if (key !== 'default' && key.includes(word) && word.length > 2) {
          if (key.length > maxLength) {
            bestMatch = key;
            maxLength = key.length;
          }
        }
      }
    }
  }

  return bestMatch ? fallbackResponses[bestMatch] : fallbackResponses.default;
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      );
    }

    // If no API key, use fallback responses
    if (!GROQ_API_KEY) {
      const response = findBestResponse(message);
      return NextResponse.json({ response });
    }

    try {
      // System prompt with farm and website context
      const systemPrompt = `You are a helpful plant and gardening assistant for Southern Seedling Nursery Farm, a family-run business established in 2001 in Gelephu, Bhutan. 

About the farm:
- Location: Samtenling, Bhur, Gelephu, Bhutan
- Established: 2001 (25+ years of experience)
- Mission: "Nurturing Nature, Earning Trust"
- Serves: Farmers, households, hotels, resorts, and government agencies across 16+ dzongkhags

Products offered:
1. Fruit Trees (mango, lemon, orange, etc.)
2. Ornamental Plants (roses, orchids, decorative foliage plants)
3. Timber Trees
4. Foliage Plants
5. Lawn Grasses

Services:
1. Landscape Design & Installation (includes site analysis, custom design, plant selection, professional installation, maintenance plans)
2. Orchard Management (soil testing, planting guidance, irrigation planning, pest management, seasonal maintenance)

Delivery:
- Standard delivery: 5-7 days
- Express delivery: 2-3 days
- Delivery fee: 10% of order total
- Coverage: Nationwide across Bhutan

Contact Information:
- Phone: +975 17 123456 (Mon-Fri 8AM-5PM, Sat 9AM-3PM)
- Email: info@southernseedling.com
- Business hours: Monday-Friday 8AM-5PM, Saturday 9AM-3PM

Always be helpful, friendly, and professional. Provide accurate information about plants, gardening tips, services, delivery, and ordering. If asked something you're unsure about, suggest contacting the farm directly.`;

      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-32768', // You can also use 'llama-2-70b-chat' or other Groq models
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            {
              role: 'user',
              content: message,
            },
          ],
          temperature: 0.7,
          max_tokens: 512,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Groq API error: ${response.status} - ${JSON.stringify(errorData)}`);
        // Fall back to keyword matching
        const fallbackResponse = findBestResponse(message);
        return NextResponse.json({ response: fallbackResponse });
      }

      const data = await response.json();

      // Extract response from Groq API
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const botResponse = data.choices[0].message.content.trim();
        return NextResponse.json({ response: botResponse });
      }

      // If no response content, use fallback
      const fallbackResponse = findBestResponse(message);
      return NextResponse.json({ response: fallbackResponse });
    } catch (apiError) {
      console.error('Groq API call error:', apiError);
      // Fall back to keyword matching
      const fallbackResponse = findBestResponse(message);
      return NextResponse.json({ response: fallbackResponse });
    }
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
