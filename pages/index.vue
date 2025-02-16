<script setup>
import { io } from 'socket.io-client';

let messages = ref([]);
let username = ref('lvan');
let connect = ref(false);
let socket = null;
let text = ref('');



if(process.client) {
     socket = io("ws://localhost:3000");
    connect.value = true;
    socket.on('initial', (data) => {
      messages.value = data
    });
    socket.on("chat message", (data) => {
        messages.value.push({text: data.text, username: data.username});
        console.log(data)
      });
    }

 function sendMessage() {
    socket.emit('chat message', {username: username.value, text: text.value});
    text.value = ''
 }
</script>
<template>
 
 
  
 

        
 
  
 <NuxtLink :to="'/message/message.vue'">Чат с бд</NuxtLink>

<h1>ЧАТ</h1>


<form @submit.prevent="sendMessage">
          <div class="card">
            <div class="card-body">
              <!-- Сообщение  -->
              <div class="mb-3">
                <textarea type="text" class="form-control" rows="10" v-model="text"></textarea>

 
  
 

              </div>

              <button type="submit"  class="btn btn-primary">Отправить сообщение</button>
            </div>
          </div>
        </form>
      
      
     

      <!-- Список заметок  -->
      <div class="col-8 messages-container">

        <div class="card mb-3" v-if="connect" v-for="(message, index) in messages">
          <div class="card-body">
            <h3 class="card-title">
              <span>{{message.username}}: {{message.text}}</span>
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



      
      
    