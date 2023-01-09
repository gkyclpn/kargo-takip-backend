const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 4000;
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const request = require('request');
app.use(cors());
app.use(bodyParser.json());
require("./routes/user.routes")(app);
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const CREDENTIALS_PATH = path.join(process.cwd(), './config/credentials.json');
const TOKEN_PATH = path.join(process.cwd(), './config/token.json');

app.get("/", (req, res) => {
    res.send("Merhaba Dünya");
})

app.get("/sign_in_with_google", async (req, res) => {
  async function loadSavedCredentialsIfExist() {
    try {
      const content = await fs.readFile(TOKEN_PATH);
      const credentials = JSON.parse(content);
      return google.auth.fromJSON(credentials);
    } catch (err) {
      return null;
    }
  }

  async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
  }

  async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
      return client;
    }
    client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
      await saveCredentials(client);
    }
    console.log(client)
    return client;
  }
  async function listMails() {
    /*const req1 = request.post({
      uri: "https://www.googleapis.com/oauth2/v4/token?code=4/0AfgeXvtmu0580ttz9eQ5SnlsUJk0NYlLCg_mQsHXVZG3LLKrOoBNv_AsWYJEAAYN5RFzew&client_id=187669057415-53nkcodgdp1571o3cllcldoqhp2smjm4.apps.googleusercontent.com&client_secret=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&grant_type=authorization_code",
    },*/

    const params = {
      code: '4/0AfgeXvtmu0580ttz9eQ5SnlsUJk0NYlLCg_mQsHXVZG3LLKrOoBNv_AsWYJEAAYN5RFzew' /*egeden gelecek*/ ,
      client_id: '187669057415-53nkcodgdp1571o3cllcldoqhp2smjm4.apps.googleusercontent.com',
      client_secret: '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',
      grant_type: 'authorization_code'
    };
    const req1 = request.post({
      uri: "https://www.googleapis.com/oauth2/v4/token", params
    },
    
    function(err, response, body) {
      if(err){
        console.log(err); // Failure
      } else {
        const resp = JSON.parse(body)
        console.log(body)
        sonrakiIslemler(resp);
        
      }
    });
    console.log(oauth2)
  }
  
  async function sonrakiIslemler(response){
    /*const gmail = google.gmail({version: 'v1', 
    headers: {
      "Authorization": `Bearer ${response.access_token}`,
      "Content-Type": "application/json"
    },
    });*/
    const gmail = google.gmail({
      version: 'v1', 
      auth: response
    });
    const res = await gmail.users.messages.list({
      userId: 'me',
      q: "1633029466 AROUND 25 numaralı" //"from:info@email.trendyol.com", // kargo AROUND 25 takip
    });
    const messages = res.data.messages;
    console.log(messages)
    if (!messages || messages.length === 0) {
      console.log('No messages found.');
      return;
    }
    console.log('Messages:');
    messages.forEach(async (message)  => {
      let resMessageId = await gmail.users.messages.get({
        userId: 'me',
        id: '18408df03d9ee558' //message.id,
      });

      //console.log(Buffer.from(resMessageId.data.payload.parts[0].body.data, 'base64'))
      let partId = null
      let messageData = null
      let subject = null
      
      if(resMessageId.data.payload.parts != undefined){
        resMessageId.data.payload.parts.forEach( (part) => {
          if((part.mimeType == "text-body" || part.mimeType == "text/body" || part.mimeType == "text/plain")){
            partId = part.partId
          }
          //part.headers.forEach((header) => {
            //if(header.name == "Content-ID" && (header.value == "text-body" || header.value == "text/body" || header.value == "text/plain")){
              //partId = part.partId
            //}
          //})
        })
        if(partId != null){
          messageData = Buffer.from(resMessageId.data.payload.parts[partId].body.data, 'base64')
        }
      }
      else {
        messageData = Buffer.from(resMessageId.data.payload.body.data, 'base64')
        resMessageId.data.payload.headers.forEach( (header) => {
          if(header.name === "Subject") {
            subject = header.value
          }
        })
      }
      messageData = Buffer.from(messageData, 'base64')
      let trendyolRegex = new PCRE2(`((?<=<td align="left" valign="top" style="font-family: Tahoma, Helvetica, Arial; font-size:14px; color:#000006; text-align:left; padding-top:5px; line-height:18px;">)( |.*?)+(?=<\/td>))`, "gm") 
      /*let deneme = messageData.includes("Takip no")
      if(!deneme){
        deneme = messageData.includes("Takip numara")
      }*/
      let withRegex = trendyolRegex.exec(messageData.toString())
      console.log("--------------------------------------------------")
      //console.log("Subject: " + subject)
      console.log(`${withRegex}`);
      console.log("--------------------------------------------------")

    });
  }


  authorize().then((credentials) => sonrakiIslemler(credentials)).catch(console.error);


})

app.get("/sign_out", async (req, res) => {
  await fs.writeFile(TOKEN_PATH, "");
  res.send({message: "ok"})
})

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});