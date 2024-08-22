let timer;

document.getElementById("code").addEventListener("input", function () {
  clearTimeout(timer); // 타이머 초기화
  timer = setTimeout(function () {
    const content = document.getElementById("code").value;
    stompClient.send(
      "/share-code",
      {},
      JSON.stringify({ uuid: currentRoomId, content: content })
    );
  }, 500); // 0.5초 지연 후 코드 전송
});

function setCode(code) {
  document.getElementById("code").value = code;
}
