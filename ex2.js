var readLine = require("readline");
var rl = readLine.createInterface(process.stdin, process.stdout);

var realP = {
  name: "",
  sayings: []
};

rl.question("what is their name?", function(answer){
  realP.name = answer;
  rl.setPrompt(`What does ${realP.name} say?`);
  rl.prompt();
  rl.on('line', function(saying){
    realP.sayings.push(saying)
    rl.prompt();
    console.log(realP.sayings)
  });
});
