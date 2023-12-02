function maskPass(pass) {
  let str = "";
  for (let index = 0; index < pass.length; index++) {
    str += "*";
  }

  return str;
}

const deletePassword = (website) => {
  let data = localStorage.getItem("passwords");
  let arr = JSON.parse(data);
  arrUpdated = arr.filter((e) => {
    return e.website != website;
  });
  localStorage.setItem("passwords", JSON.stringify(arrUpdated));
  alert(`${website}'s Password Deleted Successfully `);
  showPasswords();
};

// logic to fill the table

function copyText(txt) {
  navigator.clipboard.writeText(txt).then(
    () => {
      // alert("copied the text : "+txt);
      document.getElementById("alert").style.display = "inline";
      setTimeout(() => {
        document.getElementById("alert").style.display = "none";
      }, 3000);
    },
    () => {
      alert("Failed to copy text");
    }
  );
}
function savedText() {
  document.getElementById("saved").style.display = "inline";
  setTimeout(() => {
    document.getElementById("saved").style.display = "none";
  }, 3000);
}

const showPasswords = () => {
  let tb = document.querySelector("table");
  let data = localStorage.getItem("passwords");
  if (data == null) {
    tb.innerHTML = "No saved passwords found";
  } else {
    tb.innerHTML = `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
      </tr>`;
    let arr = JSON.parse(data);
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];

      str = `
            <tr>
            <td>${
              element.website
            }  <img class="imgcopy" title="Click to copy!" src="copy.svg" alt="Copy Button" onclick="copyText('${
        element.website
      }')" width="45" height="15"></td>
            <td>${
              element.username
            }  <img class="imgcopy" title="Click to copy!" src="copy.svg" alt="Copy Button" onclick="copyText('${
        element.username
      }')" width="45" height="15"></td>
            <td>${maskPass(
              element.password
            )}  <img class="imgcopy" title="Click to copy!" src="copy.svg" alt="Copy Button" onclick="copyText('${
        element.password
      }')" width="45" height="15"></td>
            <td><button title="Click to delete!" class="btnsm" onclick="deletePassword('${
              element.website
            }')">Delete</button></td>
            </tr>
            `;
      tb.innerHTML = tb.innerHTML + str;
    }
  }

  website.value = "";
  username.value = "";
  password.value = "";
};

showPasswords();

document.querySelector(".btn").addEventListener("click", (e) => {
  e.preventDefault();
  // console.log("clicked")

  // console.log(username.value, password.value)
  let passwords = localStorage.getItem("passwords");
  console.log(passwords);
  if (passwords == null) {
    let json = [];
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    // alert("Password Saved");
    // savedText();
    localStorage.setItem("passwords", JSON.stringify(json));
  } else {
    let json = JSON.parse(localStorage.getItem("passwords"));
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    // alert("Password Saved");
    // savedText();
    localStorage.setItem("passwords", JSON.stringify(json));
  }
  showPasswords();
});
