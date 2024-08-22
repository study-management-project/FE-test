document
  .getElementById("snapshot-submit")
  .addEventListener("click", function () {
    const title = document.getElementById("snapshot-title").value;
    const content = document.getElementById("code").value;
    stompClient.send(
      "/share-snapshot",
      {},
      JSON.stringify({ uuid: currentRoomId, title: title, content: content })
    );
  });

function addSnapshot(snapshot) {
  const parsedSnapshot = JSON.parse(snapshot);
  const snapshotList = document.getElementById("snapshots");
  const li = document.createElement("li");
  li.textContent = `${parsedSnapshot.title} ${parsedSnapshot.content} (${parsedSnapshot.createdDate})`;
  snapshotList.appendChild(li);
}
