from openai import OpenAI

client = OpenAI()

# Initialize conversation history
conversation_history = []

while True:
    # Get user input
    user_input = input("You: ")

    # Retrieve the image from the endpoint
    image_url = "https://koi-factual-wasp.ngrok-free.app/api/screenshot"
    image_message = {
        "role": "system",
        "content": [
            {"type": "image_url", "image_url": {"url": image_url}}
        ],
    }

    # Update conversation history with the image
    conversation_history.append(image_message)

    # Create the user message
    user_message = {
        "role": "user",
        "content": [{"type": "text", "text": user_input}],
    }

    # Update conversation history with user message
    conversation_history.append(user_message)

    # Send request to OpenAI API with conversation history
    response = client.chat.completions.create(
        model="gpt-4-vision-preview",
        messages=conversation_history,
        max_tokens=300,
    )

    # Extract and print bot response
    bot_response = response.choices[0].message.content
    print("Bot:", bot_response)

    # Update conversation history with bot response
    bot_message = {
        "role": "assistant",
        "content": bot_response
    }
    conversation_history.append(bot_message)
