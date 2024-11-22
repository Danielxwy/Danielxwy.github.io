(()=>{
    // 设置雪花参数
    const snowConf = {
        flakeCount: 100,
        minDist: 100,
        color: "255, 255, 255",
        size: 1.6,
        speed: 0.2,
        opacity: 0.3,
        stepsize: .1,
        fadeInSpeed: 0.02,// 越大越快
        fadeOutSpeed: 0.02,
        flakeYieldForce: 0.1
    };
    const snowEnableStorageKey = "snow-enable";

    const getLS = (k) => {
        try {
          return localStorage.getItem(k);
        } catch (e) {
          // 与 localStorage 中没有找到对应 key 的行为一致
          return null;
        }
    };

    // 记录下雪状态
    let isSnowing = (getLS(snowEnableStorageKey) || "true") === "true";

    document.addEventListener("OnSnowStateChange", (event) => {
        const lastState = isSnowing;
        //重新开始
        if (!lastState && event.detail.enable === "true") {
            isSnowing = true;
            startSnow();
            fadeInCanvas();
        } else if (lastState && event.detail.enable === "false") {
            fadeOutCanvas();
        }
    });

    const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(callback){window.setTimeout(callback, 1000/60);};
    window.requestAnimationFrame = requestAnimationFrame;
    const canvas = document.getElementById("snow");
    const ctx = canvas.getContext("2d");
    const flakeCount = snowConf.flakeCount;
    let mX = -100, mY = -100;
    let flakes = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let fadeOutOpacity = 1.0;
    const fadeOutCanvas = () => {
        if (fadeOutOpacity > 0) {
            ctx.globalAlpha = fadeOutOpacity;
            fadeOutOpacity -= snowConf.fadeOutSpeed; // 调整步长以控制缓动速度
            requestAnimationFrame(fadeOutCanvas);
        } else {
            isSnowing = false;
            // 清空画布
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1.0;
            fadeOutOpacity = 1.0; // 重置
        }
    };

    let fadeInOpacity = 0;
    const fadeInCanvas = () => {
        if (fadeInOpacity < 1) {
            ctx.globalAlpha = fadeInOpacity;
            fadeInOpacity += snowConf.fadeInSpeed; // 调整步长以控制缓动速度
            requestAnimationFrame(fadeInCanvas);
        } else {
            ctx.globalAlpha = 1.0;
            fadeInOpacity = 0; // 重置
        }
    };

    const snow = () => {
        if (!isSnowing) {
            return; // 结束
        }

        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const minDist = snowConf.minDist;
        for (let i = 0; i < flakeCount; i++){
            let flake = flakes[i];
            const x = mX, y = mY;
            const x2 = flake.x, y2 = flake.y;
            const dist = Math.sqrt((x - x2)*(x - x2) + (y - y2)*(y - y2));
            if (dist < minDist) {
                const force  = minDist / (dist*dist);
                const xcomp  = (x - x2) / dist;
                const ycomp  = (y - y2) / dist;
                const deltaV = force / 2 * snowConf.flakeYieldForce;
                flake.velX -= deltaV * xcomp;
                flake.velY -= deltaV * ycomp;
             } else {
                flake.velX *= 0.98;
                if (flake.velY < flake.speed && (flake.speed - flake.velY > .01)) {
                    flake.velY += (flake.speed - flake.velY) * .01;
                }
                flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
            }
            ctx.fillStyle = "rgba(" + snowConf.color + ", " + flake.opacity + ")";
            flake.y += flake.velY;
            flake.x += flake.velX;
            if(flake.y >= canvas.height || flake.y <= 0){
                reset(flake);
            }
            if(flake.x >= canvas.width || flake.x <= 0){
                reset(flake);
            }
            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI*2);
            ctx.fill();
        }
        requestAnimationFrame(snow);
    };
    const reset = (flake)=>{
        flake.x       = Math.floor(Math.random()*canvas.width);
        flake.y       = 0;
        flake.size    = (Math.random()*3)+2;
        flake.speed   = (Math.random()*1)+0.5;
        flake.velY    = flake.speed;
        flake.velX    = 0;
        flake.opacity = (Math.random()*0.5)+0.3;
    };
    const startSnow = () => {
        // 生成初始雪花
        for (let i = 0; i < flakeCount; i++) {
            const x       = Math.floor(Math.random()*canvas.width);
            const y       = Math.floor(Math.random()*canvas.height);
            const size    = (Math.random()*3) + snowConf.size;
            const speed   = (Math.random()*1) + snowConf.speed;
            const opacity = (Math.random()*0.5) + snowConf.opacity;
            flakes.push({
                speed: speed,
                velX: 0, velY: speed,
                x: x, y: y,
                size: size,
                stepSize: (Math.random()) / 30 * snowConf.stepsize,
                step: 0,
                angle: 180,
                opacity: opacity
            });
        }
        // 开始下雪
        snow();
    };
    // 雪花避让鼠标
    document.addEventListener("mousemove", (e)=>{mX = e.clientX, mY = e.clientY});
    // 窗口大小调整
    window.addEventListener("resize",()=>{canvas.width = window.innerWidth; canvas.height = window.innerHeight;});

    // 初始化
    startSnow();
})();
