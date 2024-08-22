document
  .getElementById("checkup-submit")
  .addEventListener("click", function () {
    const title = document.getElementById("checkup-title").value;
    stompClient.send(
      "/share-checkup",
      {},
      JSON.stringify({ uuid: currentRoomId, title: title })
    );
    // 강사 클라이언트에서 타이머 재고 타이머 지나면 서버로 결과요청
    // 사용자 클라이언트에서도 타이머 재고 시간 지나면 OX 못누르게
  });

function setCheckupTitle(title) {
  document.getElementById("recieve-checkup").innerText = title;
}
