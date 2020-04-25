const express = require("express");
const pdfreader = require("pdfreader");
const{exec} = require("child_process");
 
var written = [];
var data = [];
var temp = [];
var linkedin_profile="";
var mail_id="";
var words_count = []; 
var count = 0;
var word = "linkedin";
var symbol = "@";
var rows = {};
var personal_data = [];
function getRows() {
  Object.keys(rows) 
    .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) 
    .forEach(y => console.log((rows[y] || []).join("")));
}

var url = process.argv[2];
 
new pdfreader.PdfReader().parseFileItems(url, function(
  err,
  item
) {
  if (!item || item.page){
    count=0;
    console.log("No. of lines in this page:"+written.length);
    for(let i=0;i<written.length;i++){
      count+=written[i].length;
      for(let j=0;j<written[i].length;j++){
        if(written[i][j].indexOf(word)>=0 && linkedin_profile.length==0){
          for(let k=0;k<written[i].length;k++){
            linkedin_profile+=written[i][k];
          }
          console.log("linkedin_profile:"+linkedin_profile);
          break;
        }
        else if(written[i][j].indexOf(symbol)>=0 && mail_id.length==0){
          for(let k=0;k<written[i].length;k++){
            mail_id+=written[i][k];
          }
          console.log("Mail ID:"+mail_id);
          break;
        }
      }
    }
    data.push(written);
    words_count.push("No. of text word in current page:"+count);
    console.log(words_count);
    written = [];
  } else if (item.text) {
    (rows[item.y] = rows[item.y] || []).push(item.text);
    written.push(rows[item.y]);
  }
  exec('python3 font.py');
});
