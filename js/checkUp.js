document
  .getElementById("checkup-submit")
  .addEventListener("click", function () {
    const title = document.getElementById("checkup-title").value;
    stompClient.send(
      "/share-checkup",
      {},
      JSON.stringify({ uuid: currentRoomId, title: title,isOpen:true })
    );
    // 강사 클라이언트에서 타이머 재고 타이머 지나면 서버로 결과요청
    // 사용자 클라이언트에서도 타이머 재고 시간 지나면 OX 못누르게
  });


function setCheckupTitle(dto) {
  document.getElementById("recieve-checkup").innerText = dto;
}

document
.getElementById("checkup-timeout-submit")
.addEventListener("click",function(){
  const title= document.getElementById("recieve-checkup").textContent;
  stompClient.send(
    "/end-checkup",
    {},
    JSON.stringify({ uuid: currentRoomId, title:title, isOpen:false})
  );
});

function setCheckupResult(object) {
  
  console.log(object);
  
  document.getElementById("result-checkup").innerText = object;
}