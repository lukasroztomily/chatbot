const BootBot = require('bootbot');
const config = require('config');
const fetch = require('node-fetch');
//

var port = process.env.PORT || config.get('PORT');


const MOVIE_API = "http://www.omdbapi.com/?apikey=33d495d0";

const JOKE_API = "http://api.icndb.com/jokes/random";

const bot = new BootBot({
  accessToken: config.get('ACCESS_TOKEN'),
  verifyToken: config.get('VERIFY_TOKEN'),
  appSecret: config.get('APP_SECRET')
});

bot.on('message', (payload, chat) => {
	const text = payload.message.text;
	console.log(`The user said: ${text}`);
});

bot.hear(['hello', 'hi'], (payload, chat) => {
	console.log('The user said "hello" or "hi"!');
});


bot.hear('setup', (payload, chat) => { // 1 
  const getBucketSlug = (convo) => { // 2
    convo.ask("What's your buckets slug?", (payload, convo) => {
        
      var slug = payload.message.text;
      console.log(slug);
      convo.set('slug', slug) ;// 3
      convo.say("setting slug as "+slug).then(() => getBucketReadKey(convo)); // 3 
    });
  };
  const getBucketReadKey = (convo) => {
    convo.ask("What's your buckets read key?", (payload, convo) => {
      var readkey = payload.message.text;
      convo.set('read_key', readkey);
      convo.say('setting read_key as '+readkey).then(() => getBucketWriteKey(convo))
    });
  };
  const getBucketWriteKey = (convo) => {
    convo.ask("What's your buckets write key?", (payload, convo) => {
      var writekey = payload.message.text;
      convo.set('write_key', writekey);
      convo.say('setting write_key as '+writekey).then(() => finishing(convo));
    });
  };
  const finishing = (convo) => {
    var newConfigInfo = {
      slug: convo.get('slug'),
      read_key: convo.get('read_key'),
      write_key: convo.get('write_key')
    }; 
    config.bucket = newConfigInfo; // 4
    convo.say('All set :)');
    convo.end();
  };
  
  chat.conversation((convo) => {
    getBucketSlug(convo) ;// 5
  });
});


//

bot.hear(['Muv'], (payload, chat) => {
  chat.say('Hi! If you would like to know details about a movie, tell me "movie" and the name of the movie', {typing: true});
});
////
////
bot.hear(/movie (.*)/i, (payload, chat, data) => {
  chat.conversation((conversation) => {
    const movieName = data.match[1];
    console.log("Somebody asked about movie "+movieName);
    fetch(MOVIE_API+'&t='+movieName)
      .then(res => res.json())
      .then(json => {
        console.log("Search result is "+JSON.stringify(json));
        if (json.Response === "False") {
          conversation.say('I could not find the movie '+movieName+', you can try searching for movie like "search [movie name]"', {typing: true});
          conversation.end();
        } else {
          conversation.say('I found a movie '+json.Title, {typing: true});
          setTimeout(() => {
            conversation.say("The movie is from "+json.Year+" and was directed by "+json.Director, {typing: true});
          }, 1000);
          handlePlot(conversation, json);
        }
    }); 
  });
});

function handlePlot(conversation, json) {
  setTimeout(() => {
    conversation.ask({
      text: "Would you like to know what the movie is about?",
      quickReplies: ["Yes", "No"],
      options: {typing: true}
    }, (payload, conversation) => {
      if (payload.message.text === "Yes") {
        conversation.say(json.Plot, {typing: true});
        conversation.end();
      } else {
        conversation.say("Ok, ask me about a different movie then.", {typing: true});
        conversation.end();
      }
    });
  }, 2000);
}

//

bot.hear(['Ahoj'], (payload, chat) => {
chat.conversation((conversation) => {
handleJoke(payload,conversation);
});
});


function handleJoke(payload, conversation) {
setTimeout(() => {
    conversation.ask({
        
      text: "Ahoj! Chceš slyšet vtip o Chuck Norrisovi?",
      quickReplies: ["Yes", "Ne"],
      options: {typing: true}
    }, (payload, conversation) => {
      if (payload.message.text === "Yes") {
   
            fetch(JOKE_API)
      .then(res => res.json())
      .then(json => {
        console.log("Search result is "+JSON.stringify(json));

          
            conversation.say(json.value.joke);
            conversation.end();//
      
    });
    
      }
else {
        conversation.say("Ok, dík že ses zastavil, příště přijdi zas..");
        conversation.end();
      }     
    }
    

            );
        }, 2000);
}

bot.start(port);

//bot.hear(['Chuck'], (payload, chat, data) => {
//  chat.conversation((conversation) => {
////    const sas = data.match[1];
////    console.log("Somebody asked about joke "+joke);
//    fetch(JOKE_API)
//      .then(res => res.json())
//      .then(json => {
//        console.log("Search result is "+JSON.stringify(json));
//        if (json.Response === "False") {
//          conversation.end();
//        } else {
////          conversation.say(json.Joke);
//          setTimeout(() => {
//            conversation.say(json.value.joke);
//            conversation.end();//
//          }, 1000);
////          handlePlot(conversation, json);
//          
//        }
//
//    }); 
//  });
//});
