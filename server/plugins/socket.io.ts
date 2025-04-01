import type { NitroApp } from "nitropack";

import { Server as Engine } from "engine.io";

import { Server } from "socket.io";

import { defineEventHandler } from "h3";


export default defineNitroPlugin((nitroApp: NitroApp) => {

  const engine = new Engine();

  const io = new Server();


  io.bind(engine);

  let messages = [];
  let users = [];

  io.on("connection", (socket) => {
    socket.emit('initial', messages)
    socket.on('chat message', function(data) {
      io.emit('chat message', {
        text: data.text,
        username: data.username
      });

      messages.push(data);
      
    });
  

  });


  nitroApp.router.use("/socket.io/", defineEventHandler({

    handler(event) {

      engine.handleRequest(event.node.req, event.node.res);

      event._handled = true;

    },

    websocket: {

      open(peer) {

        // @ts-expect-error private method and property

        engine.prepare(peer._internal.nodeReq);

        // @ts-expect-error private method and property

        engine.onWebSocket(peer._internal.nodeReq, peer._internal.nodeReq.socket, peer.websocket);

      }

    }

  }));

});