const BootBot = require('bootbot');
const config = require('config');
const fetch = require('node-fetch');
//

var port = process.env.PORT || config.get('PORT');



const JOKE_API = "http://api.icndb.com/jokes/random";

const bot = new BootBot({
  accessToken: config.get('ACCESS_TOKEN'),
  verifyToken: config.get('VERIFY_TOKEN'),
  appSecret: config.get('APP_SECRET')
});




bot.hear('adresa', (payload, chat) => { // 1 
  const getBucketName = (convo) => { // 2
    convo.ask("Jaké je Vaše jméno a příjmení. Odpovídejte ve formátu 'jméno' 'vaše_jméno' Např.: jméno Josef Novák", (payload, convo) => {;
        
      var name = payload.message.text;
      console.log(name);
      convo.set('jméno', name) ;// 3
      convo.say("Jméno nastaveno jako "+name).then(() => getBucketCity(convo)); // 3 
    });
  };
    const getBucketCity = (convo) => { // 2
    convo.ask("Ve kterém městě bydlíte? Odpovídejte ve formátu 'město' 'název_města' Např.: město Praha", (payload, convo) => {;
        
      var city = payload.message.text;
      console.log(city);
      convo.set('město', city) ;// 3
      convo.say("město nastaveno jako "+city).then(() => getBucketReadKey(convo)); // 3 
    });
  };
  const getBucketReadKey = (convo) => {
    convo.ask("Jaký je název a číslo ulice, na které bydlíte? Odpovídejte ve formátu 'ulice' 'název_ulice'. Např.: ulice Nábřeží.25", (payload, convo) => {
      var street = payload.message.text;
      convo.set('ulice', street);
      convo.say('ulice nastavená jako '+street).then(() => getBucketWriteKey(convo))
    });
  };
  const getBucketWriteKey = (convo) => {
    convo.ask("Jaké je Vaše PSC. Odpovídejte ve formátu 'PSC' 'číslo_psc'. Např.: PSC 23542", (payload, convo) => {
      var ZIP = payload.message.text;
      convo.set('PSC', ZIP);//
      convo.say('PSC nastaveno jako '+ZIP).then(() => finishing(convo));
    });
  };
  const finishing = (convo) => {
    var newConfigInfo = {
      name: convo.get('name'),
      city: convo.get('city'),
      street: convo.get('street'),
      ZIP: convo.get('ZIP')
    }; 
    config.bucket = newConfigInfo; // 4
    convo.say('Adresa nastavena! :)');
    convo.end();
  };
  
  chat.conversation((convo) => {
    getBucketName(convo) ;// 5
  });
});


bot.hear(['Ahoj'], (payload, chat) => {
chat.conversation((conversation) => {
handleJoke(payload,conversation);
});
});


function handleJoke(payload, conversation) {
setTimeout(() => {
    conversation.ask({
        
      text: "Ahoj! Chceš slyšet vtip o Chuck Norrisovi?",
      quickReplies: ["Ano", "Ne"],
      options: {typing: true}
    }, (payload, conversation) => {
      if (payload.message.text === "Ano") {
   
            fetch(JOKE_API)
      .then(res => res.json())
      .then(json => {
        console.log("Výsledek z API "+JSON.stringify(json));

          
            conversation.say(json.value.joke);
            conversation.end();//
      
    });
    
      }
else {
        conversation.say("Ok, dík že ses zastavil, příště přijdi zas....");
        conversation.end();
      }     
    }
    

            );
        }, 2000);
}
//
bot.start(port);

