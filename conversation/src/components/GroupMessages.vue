<template>
    <div class="group-text">
      <div class="message" v-for="(message, index) in messages" :key="index">
        <image class="avatar" :src="message.sender.photo" />
        <div class="sender">{{ message.sender.name }}:</div>
        <div class="text">{{ message.text }}</div>
      </div>
      <div class="input-container">
        <button @click="liveConversation = !liveConversation">{{ liveConversation ? "Stop" : "Start" }}</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        messages: [
        ],
        liveConversation: false,
        interval: null,
      };
    },
    methods: {
      getMessage() {
        axios.get("http://localhost:3000/chat").then((response) => {
          this.messages.push(response.data);

          if (this.liveConversation) {
            this.interval = setTimeout(() => {
              this.getMessage();
            }, 1000);
          }
        });
      },
    },
    watch: {
      liveConversation: function (value) {
        if (value) {
          this.getMessage()
        }
      }
    },
  };
  </script>
  
  <style scoped>
  .group-text {
    max-width: 400px;
    margin: 0 auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .message {
    margin-bottom: 10px;
  }
  
  .sender {
    font-weight: bold;
  }
  
  .input-container {
    display: flex;
    margin-top: 10px;
  }
  
  input {
    flex-grow: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    margin-left: 10px;
    padding: 8px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }

  avater {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  </style>