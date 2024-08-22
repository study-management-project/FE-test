document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(`${serverURL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  })
    .then((response) => response.text())
    .then((text) => {
      if (text === "성공") {
        alert("로그인 성공!");
      } else {
        alert("로그인 실패. 다시 시도해주세요.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("로그인 중 오류가 발생했습니다.");
    });
});

document.getElementById("check").addEventListener("click", function (e) {
  e.preventDefault();
  fetch(`${serverURL}/check`, {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.text())
    .then((text) => alert(text))
    .catch((err) => alert("에러 발생"));
});

document.getElementById("logoutButton").addEventListener("click", function () {
  document.cookie = "JSESSIONID=; Max-Age=0; path=/; domain=localhost;";
  fetch(`${serverURL}/logout`, {
    method: "POST",
    credentials: "include",
  })
    .then((response) => response.text())
    .then((data) => alert(data))
    .catch((error) => {
      console.error("Error:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    });
});
