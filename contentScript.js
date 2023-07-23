(() => {
    // Listern for Messages
    chrome.runtime.onMessage.addListener((obj,sender,response) => {
        const {type,course,video} = obj;
        if(type === "NEW"){
            console.log("Course: ",course);
            console.log("Video: ", video);
            console.log("-------------------------");
            if(course && video)
                videoPageLoaded(video);
            else
                console.log("lld-error");
        }else{
            console.log("Wrong");
        }
    });

    const videoPageLoaded = async (title) => {
        const downloadBtnExists = document.querySelector(".download-video");
        if(!downloadBtnExists){
            const downloadBtn = document.createElement("button");
            downloadBtn.className = "download-video";
            downloadBtn.innerText = "Download";
            downloadBtn.title = title;
            downloadBtn.addEventListener("click",downloadVideo);
            const timeContronVideoJs = document.querySelector(".vjs-time-display.vjs-control");
            timeContronVideoJs.append(downloadBtn);
        }
    }

    const downloadVideo = async (e) => {
        const url = document.querySelector(".vjs-tech").src;
        const filename = e.target.title + ".mp4";
        console.log(`Downloading ${filename}`);
        e.target.disabled = true;
        await Download(url,filename);
        e.target.disabled = false;
    }

    async function Download(url,filename){
        try{
                const response = await fetch(url);
                const videoBlob = await response.blob();
                const videoFileName = filename;
                const downloadLink = document.createElement("a");
                downloadLink.href = URL.createObjectURL(videoBlob);
                console.log(downloadLink.href);
                downloadLink.download = videoFileName;
                downloadLink.click();
        }catch(err){
            console.error(err);
        }
    }
})()