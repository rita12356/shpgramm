<script>

import { io } from 'socket.io-client';

export default{
  data() {
    return{
      users:[],
    messages:[],
   username: '',
   
  connect:false,
   socket: null,
   text: '',
   receiver: ''
    };
  },


methods: {
 
async loadMessages() {
  let {data} = await useFetch(`/api/messages/${this.username}`);
  this.messages = data;

  console.log(this.messages);
},


handleConnect() {
  if(this.username.length > 0) {
    this.loadMessages();
    this.connect = true;
    this.socket = io(`ws://localhost:3000`);
    this.socket.emit('logged_in', {username: this.username});
    this.socket.on('chat message', (data) => {
      this.messages.push({text: data.text, sender: data.username, receiver: data.receiver});
      
    });
 
  
    
  }
},


sendMessage() {
  this.messages.push({
    sender: this.username,
    text: this.text,
    receiver: this.receiver
  });

  

  this.socket.emit("chat message", {
    sender: this.username,
    text: this.text,
    receiver: this.receiver
  });

  
}



 
},


}

</script>
<template>
 
 <NuxtLink :to="'/'">Главная страница</NuxtLink>
  
 

        
 
  

<h1>ЧАТ</h1>


              

            
            
      <!-- Форма входа -->
       
      <div class="col-4 form-container" v-if="!connect">

 
  
 

        <form @submit.prevent="handleConnect">
          <div class="card">
            <div class="card-body">
              <!-- Имя пользователя  -->
              <div class="mb-3">
                <input type="text" class="form-control" placeholder="Имя пользователя" v-model="username">

 
  
 

              </div>

              <button type="submit" class="btn btn-primary">Войти в чат</button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-4 form-container" v-if="connect">

  <form @submit.prevent="sendMessage">
          <div class="card">
            <div class="card-body">
              <!-- Сообщение  -->
              <div class="mb-3">
                <textarea type="text" class="form-control" rows="10" v-model="text"></textarea>
                <input type="text" class="form-control" placeholder="Имя получателя" v-model="receiver">
 
  
 

              </div>

              <button type="submit"  class="btn btn-primary">Отправить сообщение</button>
            </div>
          </div>
        </form>
      </div>
      
     

      <!-- Список заметок  -->
      <div class="col-8 messages-container">

        <div class="card mb-3" v-if="connect" v-for="message in messages">
          <div class="card-body">
            <h3 class="card-title">
              <span>{{message.sender}}: {{message.text}}</span>
            </h3>

          </div>
        </div>

      </div>
 
</template>

<style>
a{
  color: black;
  text-decoration: none;
  margin-left: 100px;
}
</style>



      
      
    