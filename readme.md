# To install

### Install the Chrome Extension

1. Go to chrome://extensions/

2. Toggle on 'Developer Mode' in the top-right

3. Click 'Load unpacked' in the top left

4. Choose the `autoscreen_extension` directory.

5. Pin the Extension to the browser

6. Click 'Start Capture'

5. Click 'service worker' to open Inspector to make sure it's running

7. Note the 'Extension ID' for the next step...

  
  
### Start the server
1. Navigate to `autoscreen_server` in terminal

2. Install npm, node, etc.

3. Add an environment variable for: `EXTENSION_ID=[your_extension_id]`

4. Run `node server.js`


### Set up ngrok

1. Create a 'New Edge' with a Tunnel to you localhost

2. Note the URL

  

### Run the bot

1. Add an environment variable for: OPENAI_API_KEY=[your_open_ai_key]

2. run the bot: python bot.py or python3.py
