let stompClient = null;
const serverURL = "http://localhost:8080";

let codeSubscription = null;
let commentSubscription = null;
let snapshotSubscription = null;
let checkUpSubscription = null;

function connect() {
  const socket = new SockJS(`${serverURL}/ws`);
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    console.log("Connected: " + frame);
    joinRoom(currentRoomId);
  });
}

function clearSubscription() {
  if (codeSubscription) codeSubscription.unsubscribe();
  if (commentSubscription) commentSubscription.unsubscribe();
  if (snapshotSubscription) snapshotSubscription.unsubscribe();
  if (checkUpSubscription) checkUpSubscription.unsubscribe();
}

window.addEventListener("beforeunload", clearSubscription);
