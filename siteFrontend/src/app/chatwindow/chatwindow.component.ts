import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-chatwindow',
  templateUrl: './chatwindow.component.html',
  styleUrls: ['./chatwindow.component.css']
})
export class ChatwindowComponent {
  questionList = ['How can I help you?'];

  messageHistory : {mes: string, type: string, params?: string[]}[] = [];

  @ViewChild("scroll") scroll !: Window;

  Turn = {
    User: 'user',
    Bot: 'bot',
  };

  chatInput = '';
  link: {url: string, name: string};
  i;

  constructor() {
    this.i = 0;
    this.botResponse(this.questionList[this.i], "r");
    this.link = {url: "", name: ""};
  }



  botResponse(mes: string, type: string, scroll?: HTMLElement) {
    if (type == "r") {
      this.messageHistory.push({mes: mes, type: "r"});
    } else {
      this.messageHistory.push({mes: mes, type: "l", params: [this.link.url, this.link.name]});
    }
    if (scroll) {
      setTimeout(() => {
        scroll.scroll({
          top: scroll.scrollHeight,
          behavior: 'smooth'
        },);
      }, 100)
    }
  }


  async sendMessageUser(scroll: HTMLElement) {
    this.messageHistory.push({mes: this.chatInput, type: "r"});
    let chat = this.chatInput.toLowerCase();
    let mestype = "r";

    //String that we will append information in the response to
    let response = ""
    
    this.handleNLP();

    this.botResponse(response, mestype, scroll);
    //Finish the message by clearning the textbox and returning the next query
    this.chatInput = '';


  }

  //Query the backend for a JSON string that contains extracted fields from the prompt
  handleNLP() {
    let bodyJson = {"p": this.chatInput};
    let retStr = "";
    return fetch('http://localhost:7173/api/nlp', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyJson)
    }) 
    .then(response => {
      return response.json();
    })
    .then(order => {
      if (order["fail"]) {
        return order["fail"];
      }
      //do nothing for now
      return retStr;
    })
  }
}
