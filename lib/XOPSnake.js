const{MessageButton}=require('discord-buttons');const{MessageEmbed}=require('discord.js')
const lineReplyNoMention=require('discord-reply');const WIDTH=15;const HEIGHT=10;const gameBoard=[];const apple={x:1,y:1};class XOPSnakeGame{constructor(options={}){if(!options.message)throw new TypeError('Invalid_Message: Please Provide A Message For XOPPACK!')
if(typeof options.message!=='object')throw new TypeError('Invalid_Message: Invalid Discord Message Was Provided!')
if(!options.embed)options.embed={};if(!options.embed.title)options.embed.title='Snake';if(typeof options.embed.title!=='string')throw new TypeError('Invalid_Title: Embed Title Must Be A Message!')
if(!options.embed.color)options.embed.color='#34b7db';if(typeof options.embed.color!=='string')throw new TypeError('Invalid_Color: Embed Color Must Be Hex. c30202 Or RED .etc!')
if(!options.embed.OverTitle)options.embed.OverTitle='Game Over';if(typeof options.embed.OverTitle!=='string')throw new TypeError('Invalid_Over_Title: Over Title Must Be A Message!')
if(!options.snake)options.snake={};if(!options.snake.head)options.snake.head='🟢';if(typeof options.snake.head!=='string')throw new TypeError('Invalid_Emoji: Snake Head Emoji Must Be A Valid Emoji!')
if(!options.snake.body)options.snake.body='🟩';if(typeof options.snake.body!=='string')throw new TypeError('Invalid_Emoji: Snake Body Emoji Must Be A Valid Emoji!')
if(!options.snake.tail)options.snake.tail='🟢';if(typeof options.snake.tail!=='string')throw new TypeError('Invalid_Emoji: Snake Tail Emoji Must Be A Valid Emoji!')
if(!options.emojis)options.emojis={};if(!options.emojis.board)options.emojis.board='⬛';if(typeof options.emojis.board!=='string')throw new TypeError('Invalid_Emoji: Board Emoji Must Be A Valid Emoji!')
if(!options.emojis.food)options.emojis.food='🍎';if(typeof options.emojis.food!=='string')throw new TypeError('Invalid_Emoji: Food Emoji Must Be A Valid Emoji!')
if(!options.othersuserMessage)options.othersuserMessage='You are not allowed to use buttons for this message!';if(typeof options.othersuserMessage!=='string')throw new TypeError('Invalid_Otheruser_Message: Othersuser Message Must Be A Message!')
this.snake=[{x:5,y:5}];this.snakeLength=1;this.score=0;this.inGame=false;this.options=options;this.message=options.message;for(let y=0;y<HEIGHT;y++){for(let x=0;x<WIDTH;x++){gameBoard[y*WIDTH+x]=this.options.emojis.board;}}}
getGameBoard(){let str="";let emojis=this.options.snake;for(let y=0;y<HEIGHT;y++){for(let x=0;x<WIDTH;x++){if(x==apple.x&&y==apple.y){str+=this.options.emojis.food;continue;}
let flag=true;for(let s=0;s<this.snake.length;s++){if(x===this.snake[s].x&&y===this.snake[s].y){if(s===0){if(this.inGame)
str+=emojis.head
else if(this.score==WIDTH*HEIGHT)
str+=emojis.head
else
str+=emojis.over||"💀";}
else if(this.snake.length===2){if(s===1){str+=emojis.body}}
else if(s===this.snake.length-1){str+=emojis.tail||emojis.body||"🟢";}
else{str+=emojis.body}
flag=false;}}
if(flag)
str+=gameBoard[y*WIDTH+x];}
str+="\n";}
return str;}
checkSnake(pos){return this.snake.find(sPos=>sPos.x==pos.x&&sPos.y==pos.y);};newFoodLoc(){let newApplePos={x:0,y:0};do{newApplePos={x:parseInt(Math.random()*WIDTH),y:parseInt(Math.random()*HEIGHT)};}while(this.checkSnake(newApplePos))
apple.x=newApplePos.x;apple.y=newApplePos.y;}
async startGame(){if(this.inGame)return;const emojis=this.options.emojis;let btn_up=i(15)
let btn_left=i(15)
let btn_down=i(15)
let btn_right=i(15)
let btn_stop=i(15)
this.inGame=true;this.score=0;this.snakeLength=1;this.snake=[{x:5,y:5}];this.newFoodLoc();this.buttons={up:btn_up,left:btn_left,down:btn_down,right:btn_right,stop:btn_stop}
const embed=new MessageEmbed().setTimestamp().setColor(this.options.embed.color).setAuthor(this.options.embed.title,this.message.author.displayAvatarURL({dynamic:true})).setDescription(`**Score:**\`${this.score}\`\n\n${this.getGameBoard()}`).setFooter('XOPPACK©',this.message.author.displayAvatarURL({dynamic:true}))
let up=new MessageButton().setEmoji(emojis.up||'⬆️').setStyle('blurple').setID(btn_up)
let left=new MessageButton().setEmoji(emojis.left||'⬅️').setStyle('blurple').setID(btn_left)
let down=new MessageButton().setEmoji(emojis.down||'⬇️').setStyle('blurple').setID(btn_down)
let right=new MessageButton().setEmoji(emojis.right||'➡️').setStyle('blurple').setID(btn_right)
let stop=new MessageButton().setLabel('Stop').setStyle('red').setID(btn_stop)
let dis1=new MessageButton().setLabel('\u200b').setStyle('gray').setID('off').setDisabled()
let dis2=new MessageButton().setLabel('\u200b').setStyle('gray').setID('off2').setDisabled()
let dis3=new MessageButton().setLabel('\u200b').setStyle('gray').setID('off3').setDisabled()
let dis4=new MessageButton().setLabel('\u200b').setStyle('gray').setID('off4').setDisabled()
let dis5=new MessageButton().setLabel('\u200b').setStyle('gray').setID('off5').setDisabled()
let dis6=new MessageButton().setLabel('\u200b').setStyle('gray').setID('off6').setDisabled()
let dis7=new MessageButton().setLabel('\u200b').setStyle('gray').setID('off7').setDisabled()
let components=[{type:1,components:[dis1,up,dis2,stop]},{type:1,components:[left,dis4,right,dis3]},{type:1,components:[dis5,down,dis6,dis7]},]
const msg=await this.message.channel.send({embed:embed,components:components})
this.ButtonCollector(msg)}
move(msg){if(apple.x==this.snake[0].x&&apple.y==this.snake[0].y){this.score+=1;this.snakeLength++;this.newFoodLoc();}
let emb=msg.embeds[0];let embed2=new MessageEmbed().setTimestamp().setColor(emb.color).setAuthor(emb.title,this.message.author.displayAvatarURL({dynamic:true})).setDescription(`**Score:**\`${this.score}\`\n\n${this.getGameBoard()}`).setFooter('XOPPACK©',this.message.author.displayAvatarURL({dynamic:true}))
msg.edit({embed:embed2,components:msg.components})}
async gameOver(msg){this.inGame=false;let emb=msg.embeds[0];let over="";if(this.score==WIDTH*HEIGHT){over="Winner !"}else{over=this.options.embed.OverTitle}
const editEmbed=new MessageEmbed().setTimestamp().setColor(emb.color).setAuthor(emb.title,this.message.author.displayAvatarURL({dynamic:true})).setDescription(`**Score:**\`${this.score}\`\n**${over}**\n\n${this.getGameBoard()}`).setFooter('XOPPACK©',this.message.author.displayAvatarURL({dynamic:true}))
for(let x=0;x<msg.components.length;x++){for(let y=0;y<msg.components[x].components.length;y++){msg.components[x].components[y].disabled=true;}}
return await msg.edit({embed:editEmbed,components:msg.components}).catch()}
ButtonCollector(msg){const filter=m=>m;const collector=msg.createButtonCollector(filter,{idle:120000,})
const btns=this.buttons;collector.on('collect',async btn=>{if(btn.clicker.user.id!==this.message.author.id)return btn.reply.send(this.options.othersuserMessage,true)
await btn.reply.defer()
const snakeHead=this.snake[0];const nextPos={x:snakeHead.x,y:snakeHead.y};if(btn.id===btns.left){let nextX=snakeHead.x-1;if(nextX===-1){this.gameOver(msg);nextPos.x=0;return}
if(nextX<0)
nextX=WIDTH-1;nextPos.x=nextX;}
else if(btn.id===btns.right){let nextX=snakeHead.x+1;if(nextX===15){this.gameOver(msg);nextPos.x=14;return}
if(nextX>=WIDTH)
nextX=0;nextPos.x=nextX;}
else if(btn.id===btns.up){let nextY=snakeHead.y-1;if(nextY===-1){this.gameOver(msg);nextPos.y=0;return}
if(nextY<0)
nextY=HEIGHT-1;nextPos.y=nextY;}
else if(btn.id===btns.down){let nextY=snakeHead.y+1;if(nextY===10){this.gameOver(msg);nextPos.y=9;return}
if(nextY>=HEIGHT)
nextY=0;nextPos.y=nextY;}
else if(btn.id===btns.stop){this.gameOver(msg)
collector.stop()}
if(this.checkSnake(nextPos)){this.gameOver(msg);}
else{this.snake.unshift(nextPos);if(this.snake.length>this.snakeLength)
this.snake.pop();this.move(msg);}})
collector.on("end",async()=>{return this.gameOver(msg);})}}
module.exports=XOPSnakeGame;function i(length){var randomChars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';var result='';for(var i=0;i<length;i++){result+=randomChars.charAt(Math.floor(Math.random()*randomChars.length))}
return result;}