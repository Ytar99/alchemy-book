async function getUserById(id) {
  const url = "https://alchemy-book-backend.vercel.app/api/user/" + id;
  let response = await fetch(url);

  if (response.ok) {
    let user = await response.json();

    alert(JSON.stringify(user));
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
}
