/* eslint-disable class-methods-use-this */
class SocketIO {
  static instance = new SocketIO()

  static socket

  static getInstance() {
    if (SocketIO.instance === null) {
      SocketIO.instance = new SocketIO()
    }
    return SocketIO.instance
  }

  constructor() {
    this.connect = this.connect.bind(this)
    this.disConnect = this.disConnect.bind(this)
    // this.unRegisterCallback = this.unRegisterCallback.bind(this)
    this.dispatch = null
  }

  async connect() {
    try {
      // const hasUserLoggedIn = await Auth.currentSession();
      // if (
      //   (!SocketIO.socket || !SocketIO.socket.connected) &&
      //   hasUserLoggedIn &&
      //   hasUserLoggedIn.accessToken
      // ) {
      //   console.info("Trying to connect socket...!!! connect()");
      //   const serverUrl = config.MediaSoupUrl;
      //   const options = {
      //     transports: ["websocket"],
      //     reconnection: true,
      //     reconnectionDelay: 1000,
      //     reconnectionDelayMax: 5000,
      //     reconnectionAttempts: 10,
      //     secure: true,
      //     rejectUnauthorized: false,
      //     upgrade: false,
      //     query: {
      //       userId: userId,
      //     },
      //     upgrade: false,
      //   };
      //   const socket = await socketClient(serverUrl, options);
      //   socket.request = socketPromise(socket);
      //   this.dispatch({
      //     type: "NODE_SOCKET",
      //     payload: socket,
      //   });
      //   SocketIO.socket = socket;
      //   socket.on("connect_error", (err, data) => {
      //     try {
      //       console.error("connect_error", err, data);
      //       socket.open();
      //     } catch (error) {
      //       console.error("error reconnecting", error);
      //     }
      //   });
      //   socket.on("disconnect", () => {
      //     console.error('The server has forcefully disconnected the socket');
      //   });
      //   socket.on("connect", () => {
      //     console.info('socket has been connected...!!');
      //   });
      // }
    } catch (err) {
      console.error('No current user', err)
    }
  }

  async disConnect() {
    // if (SocketIO.socket) {
    //   console.log('### Socket disConnect() called... Socket Info ###', SocketIO.socket);
    //   SocketIO.socket.disconnect();
    // }
  }
}

export default SocketIO
