
window.addEventListener('load', init);

function init() {

    let counter = 0;
    let pointLightArray = [];
    let sphereArray = [];
    let streamLightArray = [];
    let streamSphereArray = [];

    // カラー定義
    const colorPallet = {
        white: 0xFFFFFF,
        skyBlue: 0x00CBEB,
        red: 0xFF0000,
        blue: 0x0000FF,
        green: 0x00FF00,
        yellow: 0xFFFF00,
        violet: 0xE000E0,
        orange: 0xEBAB00,
        marineBlue: 0x00EBCB,
        pink: 0xF200F2,
        darkBlue: 0x000099};

    // ポイントライトカラー
    let pointLightColorArray =
                    [   colorPallet["skyBlue"],
                        colorPallet["red"],
                        colorPallet["blue"],
                        colorPallet["green"],
                        colorPallet["yellow"],
                        colorPallet["violet"],
                        colorPallet["orange"],
                        colorPallet["marineBlue"],
                        colorPallet["pink"],
                        colorPallet["skyBlue"],
                        colorPallet["red"],
                        colorPallet["blue"],
                        colorPallet["green"],
                        colorPallet["yellow"]
                    ];

    // ポイントライト位置
    //    Blender→Three.js: yの正負を反転して y,zを交換
    let pointLightCood =
                    [{x:   591, y:  418, z:   603},
                     {x:   265, y:  378, z:   930},
                     {x:    35, y:  349, z:  1061},
                     {x:    79, y:  424, z:   771},
                     {x:  -184, y:  398, z:   831},
                     {x:  -538, y:  333, z:   812},
                     {x:  -477, y:  379, z:   606},
                     {x: -1000, y:  235, z:   539},
                     {x:  -165, y:  462, z:   412},
                     {x:  -610, y:  371, z:   129},
                     {x:   -79, y:  463, z:     7},
                     {x:   588, y:  438, z:   180},
                     {x: -1126, y:  175, z:  -877},
                     {x:  -307, y:  284, z:  -833}
                    ];

    // 流れるポイントライト位置
    //    Blender→Three.js: yの正負を反転して y,zを交換
    let streamLightCood =
                    [{x:   914, y:   380, z:   124},
                     {x:   733, y:   416, z:   418},
                     {x:   521, y:   408, z:   697},
                     {x:   321, y:   403, z:   845},
                     {x:   108, y:   379, z:   963},
                     {x:  -140, y:   375, z:  1039},
                     {x:  -405, y:   323, z:   971},
                     {x:  -669, y:   286, z:   871},
                     {x:  -940, y:   237, z:   725},
                     {x: -1255, y:   203, z:   499}
                    ];


    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas'),
        antialias: true
    });

    // 空間の背景色
    renderer.setClearColor(new THREE.Color(0x000050));

    const scene = new THREE.Scene();

    // // 座標軸ヘルパー
    // const axes = new THREE.AxesHelper(10000);
    // scene.add(axes);

    // カメラ
    const camera = new THREE.PerspectiveCamera(45, 1);
    camera.fov = 60;
    camera.far = 10000;
    camera.position.set(-200, 1000, 2000);
    camera.lookAt(0,0,0);
    scene.add(camera);

    //  マウスコントロール
    const orbitControls = new THREE.OrbitControls( camera, renderer.domElement );
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.2;

    // //添字を全て取得
    // var palletKeys = Object.keys(colorPallet);

    const cylinderGeo = new THREE.CylinderGeometry(10, 10, 40);
    const cylinderMat = new THREE.MeshLambertMaterial({color: colorPallet["white"]});
    const cylinder1 = new THREE.Mesh(cylinderGeo, cylinderMat);
    cylinder1.castShadow = true;
    cylinder1.position.x = -688;
    cylinder1.position.y = 330;
    cylinder1.position.z = 613;
    scene.add(cylinder1);
    const cylinder2 = new THREE.Mesh(cylinderGeo, cylinderMat);
    cylinder2.castShadow = true;
    cylinder2.position.x = -709;
    cylinder2.position.y = 262;
    cylinder2.position.z = -588;
    scene.add(cylinder2);

    // スポットライトのターゲット(スノーマン内部に位置するキューブ)
    const cubeGeo = new THREE.BoxGeometry(20, 20, 20);
    const cubeMat = new THREE.MeshLambertMaterial({color: colorPallet["white"]});
    const cubeCore = new THREE.Mesh(cubeGeo, cubeMat);
    cubeCore.position.x = 190;
    cubeCore.position.y = 600;
    cubeCore.position.z = 460;
    scene.add(cubeCore);

    // AmbientLight
    const ambientLight = new THREE.AmbientLight(colorPallet["darkBlue"]);
    scene.add(ambientLight);

    // HemisphereLight
    const hemisphereLight = new THREE.HemisphereLight(colorPallet["darkBlue"], colorPallet["white"], 1.0);
    hemisphereLight.position.set( 0, 605, 0);
    scene.add( hemisphereLight );

    // SpotLight
    const spotLight1 = new THREE.SpotLight(colorPallet['pink']);
    spotLight1.position.set(-688, 330, 613);
    spotLight1.castShadow = true;
    spotLight1.angle = THREE.Math.degToRad(45);
    spotLight1.target = cubeCore;
    spotLight1.penumbra = 0.99;  // 光の減衰率
    scene.add(spotLight1);

    const spotLight2 = new THREE.SpotLight(colorPallet["yellow"]);
    spotLight2.position.set(-709, 262, -588);
    spotLight2.castShadow = true;
    spotLight2.angle = THREE.Math.degToRad(45);
    spotLight2.target = cubeCore;
    spotLight2.penumbra = 0.99;  // 光の減衰率
    scene.add(spotLight2);

    // PointLight @@@
    for (let i = 0; i < pointLightCood.length; i++){
        pointLightArray[i] = new THREE.PointLight(pointLightColorArray[i]);
        pointLightArray[i].position.x = pointLightCood[i].x;
        pointLightArray[i].position.y = pointLightCood[i].y;
        pointLightArray[i].position.z = pointLightCood[i].z;
        pointLightArray[i].castShadow = true;
        pointLightArray[i].intensity = 0.1;
        scene.add(pointLightArray[i]);

        const geo = new THREE.SphereGeometry(5);
        const mat = new THREE.MeshLambertMaterial({color: pointLightColorArray[i]});
        sphereArray[i] = new THREE.Mesh(geo, mat);
        sphereArray[i].castShadow = true;
        sphereArray[i].position.x = pointLightCood[i].x;
        sphereArray[i].position.y = pointLightCood[i].y;
        sphereArray[i].position.z = pointLightCood[i].z;
        scene.add(sphereArray[i]);
    }

    // 流れるポイントライト @@@
    for (let i = 0; i < streamLightCood.length; i++){
        streamLightArray[i] = new THREE.PointLight(colorPallet["yellow"]);
        streamLightArray[i].position.x = streamLightCood[i].x;
        streamLightArray[i].position.y = streamLightCood[i].y;
        streamLightArray[i].position.z = streamLightCood[i].z;
        streamLightArray[i].castShadow = true;
        streamLightArray[i].intensity = 0.5;
        scene.add(streamLightArray[i]);

        const geo = new THREE.SphereGeometry(5);
        const mat = new THREE.MeshLambertMaterial({color: colorPallet["yellow"]});
        streamSphereArray[i] = new THREE.Mesh(geo, mat);
        streamSphereArray[i].castShadow = true;
        streamSphereArray[i].position.x = streamLightCood[i].x;
        streamSphereArray[i].position.y = streamLightCood[i].y;
        streamSphereArray[i].position.z = streamLightCood[i].z;
        scene.add(streamSphereArray[i]);
    }


    // var lightHelper = new THREE.CameraHelper(spotLight.shadow.camera);
    // scene.add(lightHelper);

    // Load GLTF
    const loader = new THREE.GLTFLoader();
    let url = 'http://127.0.0.1:5500/glTF/treeAndSnowman.glb';
    /// let url = 'https://dl.dropbox.com/s/fjtysioo2jtr99v/treeAndSnowman.glb?dl=0';
    
    let model = null;
    loader.load(
        url,
        function (gltf) {
            console.log('load');
            model = gltf.scene;
            model.scale.set(100.0, 100.0, 100.0);
            model.position.set(0, 0, 0);
            //回転の調整
            model.rotation.y = THREE.Math.DEG2RAD * 0;
            scene.add(model);
        },
        function (error) {
            console.log('An error happened');
        }
    );

    // ガンマ補正
    renderer.gammaOutput = true;
    renderer.gammaFactor = 0.8;

    // 初回実行
    render();
    onResize();

    // リサイズイベント発生で実行
    window.addEventListener('resize', onResize);

    function onResize() {
        // サイズを取得
        const w = window.innerWidth;
        const h = window.innerHeight;
        // 描画サイズ
        renderer.setSize(w, h);
        // ピクセル比
        renderer.setPixelRatio(window.devicePixelRatio);
        // 空間の背景色
        renderer.setClearColor(0x000055);

        // カメラのアスペクト比を正す
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        console.log('h' + h + 'w' + w);

        renderer.render(scene, camera);
    }

    function render() {

        orbitControls.update();

        counter++;

        if (counter % 20 == 0){
            //  全てのポイントライトを消灯
            for (let i = 0; i < pointLightArray.length; i++){
                pointLightArray[i].visible = false;
            }

            // ランダムに５箇所のスポットライトを点灯
            for (let i = 0; i < 7; i++){
                let n = Math.floor(Math.random() * pointLightArray.length)
                pointLightArray[n].visible = true;
            }
        }

        switch(counter % 100){
            case 0:
                for (let i = 0; i < streamLightArray.length; i++){
                    streamLightArray[i].visible = false;
                }
                break;
            case 1:
                streamLightArray[0].visible = true;
                break;
            case 2:
                streamLightArray[1].visible = true;
                break;
            case 3:
                streamLightArray[2].visible = true;
                break;
            case 4:
                streamLightArray[3].visible = true;
                break;
            case 5:
                streamLightArray[4].visible = true;
                break;
            case 6:
                streamLightArray[5].visible = true;
                break;
            case 7:
                streamLightArray[6].visible = true;
                break;
            case 8:
                streamLightArray[7].visible = true;
                break;
            case 9:
                streamLightArray[8].visible = true;
                break;
        }

//        //対象の添字をランダムに取得
//       let index = palletKeys[Math.floor(Math.random() * palletKeys.length)];
//            pointLight1.color.setHex(colorPallet[index]);

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

}