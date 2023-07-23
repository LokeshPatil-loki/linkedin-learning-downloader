async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

document.addEventListener("DOMContentLoaded", async () => {
  const currentTab = await getCurrentTab();
  if(!currentTab.url.includes("https://www.linkedin.com/learning/")){
    document.querySelector(".container").innerHTML = `<div class="title">This is not linkedin learning video page</div>`;
  }else{
    document.querySelector(".container").innerHTML = `
    <div class="title">Click on download button to download video</div>
    <img src="assets/tutorial.png" alt="">
  `;
  }
})

