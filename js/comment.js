document
  .getElementById("comment-submit")
  .addEventListener("click", function () {
    const content = document.getElementById("comment").value;
    stompClient.send(
      "/share-comment",
      {},
      JSON.stringify({ uuid: currentRoomId, content: content })
    );
  });

function addComment(comment) {
  const commentsList = document.getElementById("comments");
  const li = document.createElement("li");
  li.textContent = comment;
  commentsList.appendChild(li);
}
