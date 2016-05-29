import {Server} from './server';

const server = Server.build();
server.initialize()
  .then(()=>server.start());