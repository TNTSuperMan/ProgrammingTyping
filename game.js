(()=>{
    function Game(d){
        let time = 0;
        let latest = new Date().getTime();
        let data = d;
        let i = Math.round(Math.random() * (d.length - 1));
        let pwr = data[i];
        let tid = 0;
        data.splice(i,1);
        $(".sample").innerText = pwr;
        $(".preview").innerText = pwr;
        function keydown(e){
            if(e.repeat) return;
            if(e.key == pwr[0]){
                pwr = pwr.substr(1);
                if(pwr == ""){
                    console.log(data);
                    if(data.length == 0){
                        $("h1").innerText = "クリア！";
                        $(".sample").innerText = "----";
                        $(".preview").innerText = "----";
                        clearInterval(tid);
                        document.removeEventListener("keydown",keydown);
                        return;
                    }
                    i = Math.round(Math.random() * (data.length - 1));
                    pwr = data[i];
                    data.splice(i,1);
                    $(".sample").innerText = pwr;
                }
                $(".preview").innerText = pwr;
            }
        }
        document.addEventListener("keydown",keydown);
        tid = setInterval(e=>{
            time = new Date().getTime() - latest;
            $("#time").innerText = time / 1000 + "秒";
        },100)

    }
    const $ = e => document.querySelector(e);
    fetch("./typingdata/" + location.search.substring(1) + ".json")
        .then(e=>{
            if(e.ok){
                return e.json();
            }else{
                $("h1").innerText = "タイピングデータの取得に失敗しました";
                $("#time").innerText = e.status;
                $(".sample").innerText = e.statusText;
            }
        })
        .then(data=>{
            function start(e){
                if(e.key == " " ||
                   e.key == "Enter"){
                    document.removeEventListener("keydown",start);
                    Game(data);
                }
            }
            document.addEventListener("keydown",start)
            $("h1").innerText = "スペースキーまたはエンターキーでスタート";
        })
})()