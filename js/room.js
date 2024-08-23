let currentRoomId = "bc31c700-8318-46a9-b6aa-bed717ba1663";
let currentUserId= 1;

function joinRoom(roomId) {
  clearSubscription();

  fetch(`${serverURL}/room/${roomId}`)
    .then((response) => response.json())
    .then((data) => displayRoomInfo(data))
    .catch((error) => console.error("Error fetching room content:", error));

  if (stompClient.connected) {

    

    codeSubscription = stompClient.subscribe(
      "/topic/" + roomId + "/code",
      function (codeOutput) {
        setCode(codeOutput.body);
      }
    );

    commentSubscription = stompClient.subscribe(
      "/topic/" + roomId + "/comment",
      function (commentOutput) {
        addComment(commentOutput.body);
      }
    );

    snapshotSubscription = stompClient.subscribe(
      "/topic/" + roomId + "/snapshot",
      function (latestSnapshot) {
        addSnapshot(latestSnapshot.body);
      }
    );

    checkUpSubscription = stompClient.subscribe(
      "/topic/" + roomId + "/checkup",
      function (latestSnapshot) {
        setCheckupTitle(latestSnapshot.body);
      }
    );

    // 여기 추가
    checkUpResultSubscription = stompClient.subscribe(
      "/user/queue/" + roomId + "/result/checkup",
      function (result) {
        console.log('Received checkup result:', result.body);
        
        setCheckupResult(result.body);
      }
    );
  }
}

function displayRoomInfo(data) {
  document.getElementById("roomName").textContent = data.name;
  document.getElementById("roomDescription").textContent = data.description;
  document.getElementById("code").value = data.content;

  const snapshotsList = document.getElementById("snapshots");
  snapshotsList.innerHTML = "";
  data.snapshotList.forEach((snapshot) =>
    addSnapshot(JSON.stringify(snapshot))
  );

  const commentsList = document.getElementById("comments");
  commentsList.innerHTML = "";
  data.commentList.forEach((comment) => addComment(comment));
  // const checkup= document.getElementById("");
  const checkup = data.checkUpDTO;
  console.log(checkup.title);
  
  document.getElementById("recieve-checkup").textContent=checkup.title;
  if(checkup.isOpen){
    //버튼 활성화 
  }
}
