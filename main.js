
window.addEventListener('load', init);

function init() {

    let counter = 0;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas'),
        antialias: true
    });

    // 空間の背景色
    renderer.setClearColor(new THREE.Color(0x000050));

    const scene = new THREE.Scene();

    // 座標軸ヘルパー
    const axes = new THREE.AxesHelper(10000);
    scene.add(axes);

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

     //添字を全て取得
    var palletKeys = Object.keys(colorPallet);

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

    // スノーマン中心に位置するキューブ(スポットライトのターゲット)
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
    spotLight2.penumbra = 0.0;  // 光の減衰率
    scene.add(spotLight2);

    // PointLight
    var pointLight1 = new THREE.PointLight(colorPallet["skyBlue"]);
    pointLight1.position.set(591, 418, 603);
    pointLight1.castShadow = true;
    pointLight1.intensity = 0.5;
    scene.add(pointLight1);

    const sphereGeo1 = new THREE.SphereGeometry(5);
    const sphereMat1 = new THREE.MeshLambertMaterial({color: colorPallet["skyBlue"]});
    const sphere1 = new THREE.Mesh(sphereGeo1, sphereMat1);
    sphere1.castShadow = true;
    sphere1.position.x = 591;
    sphere1.position.y = 418;  // x,zを交換、yの正負を反転
    sphere1.position.z = 603;
    scene.add(sphere1);

    var pointLight2 = new THREE.PointLight(colorPallet["red"]);
    pointLight2.position.set(265, 378, 930);
    pointLight2.castShadow = true;
    scene.add(pointLight2);

    const sphereGeo2 = new THREE.SphereGeometry(5);
    const sphereMat2 = new THREE.MeshLambertMaterial({color: colorPallet["red"]});
    const sphere2 = new THREE.Mesh(sphereGeo2, sphereMat2);
    sphere2.castShadow = true;
    sphere2.position.x = 265;
    sphere2.position.y = 378;  // Blender→THree.js: yの正負を反転して y,zを交換
    sphere2.position.z = 930;
    scene.add(sphere2);

    var pointLight3 = new THREE.PointLight(colorPallet["blue"]);
    pointLight3.position.set(35, 349, 1061);
    pointLight3.castShadow = true;
    scene.add(pointLight3);

    const sphereGeo3 = new THREE.SphereGeometry(5);
    const sphereMat3 = new THREE.MeshLambertMaterial({color: colorPallet["blue"]});
    const sphere3 = new THREE.Mesh(sphereGeo3, sphereMat3);
    sphere3.castShadow = true;
    sphere3.position.x = 35;
    sphere3.position.y = 349;  // Blender→THree.js: yの正負を反転して y,zを交換
    sphere3.position.z = 1061;
    scene.add(sphere3);

    var pointLight4 = new THREE.PointLight(colorPallet["green"]);
    pointLight4.position.set(79, 424, 771);
    pointLight4.castShadow = true;
    pointLight4.intensity = 0.5;
    scene.add(pointLight4);

    const sphereGeo4 = new THREE.SphereGeometry(5);
    const sphereMat4 = new THREE.MeshLambertMaterial({color: colorPallet["green"]});
    const sphere4 = new THREE.Mesh(sphereGeo4, sphereMat4);
    sphere4.castShadow = true;
    sphere4.position.x = 79;
    sphere4.position.y = 424;  // Blender→THree.js: yの正負を反転して y,zを交換
    sphere4.position.z = 771;
    scene.add(sphere4);

    var pointLight5 = new THREE.PointLight(colorPallet["yellow"]);
    pointLight5.position.set(-184, 398, 831);
    pointLight5.castShadow = true;
    pointLight5.intensity = 0.5;
    scene.add(pointLight5);

    const sphereGeo5 = new THREE.SphereGeometry(5);
    const sphereMat5 = new THREE.MeshLambertMaterial({color: colorPallet["yellow"]});
    const sphere5 = new THREE.Mesh(sphereGeo5, sphereMat5);
    sphere5.castShadow = true;
    sphere5.position.x = -184;
    sphere5.position.y = 398;  // Blender→THree.js: yの正負を反転して y,zを交換
    sphere5.position.z = 831;
    scene.add(sphere5);

    var pointLight6 = new THREE.PointLight(colorPallet["violet"]);
    pointLight6.position.set(-538, 333, 812);
    pointLight6.castShadow = true;
    pointLight6.intensity = 0.5;
    scene.add(pointLight6);

    const sphereGeo6 = new THREE.SphereGeometry(5);
    const sphereMat6 = new THREE.MeshLambertMaterial({color: colorPallet["violet"]});
    const sphere6 = new THREE.Mesh(sphereGeo6, sphereMat6);
    sphere6.castShadow = true;
    sphere6.position.x = -538;
    sphere6.position.y = 333;  // Blender→THree.js: yの正負を反転して y,zを交換
    sphere6.position.z = 812;
    scene.add(sphere6);

    var pointLight7 = new THREE.PointLight(colorPallet["orange"]);
    pointLight7.position.set(-477, 379, 606);
    pointLight7.castShadow = true;
    pointLight7.intensity = 0.5;
    scene.add(pointLight7);

    const sphereGeo7 = new THREE.SphereGeometry(5);
    const sphereMat7 = new THREE.MeshLambertMaterial({color: colorPallet["orange"]});
    const sphere7 = new THREE.Mesh(sphereGeo7, sphereMat7);
    sphere7.castShadow = true;
    sphere7.position.x = -477;
    sphere7.position.y = 379;  // Blender→THree.js: yの正負を反転して y,zを交換
    sphere7.position.z = 606;
    scene.add(sphere7);

    var pointLight8 = new THREE.PointLight(colorPallet["marineBlue"]);
    pointLight8.position.set(-1000, 235, 539);
    pointLight8.castShadow = true;
    pointLight8.intensity = 0.5;
    scene.add(pointLight8);

    const sphereGeo8 = new THREE.SphereGeometry(5);
    const sphereMat8 = new THREE.MeshLambertMaterial({color: colorPallet["marineBlue"]});
    const sphere8 = new THREE.Mesh(sphereGeo8, sphereMat8);
    sphere8.castShadow = true;
    sphere8.position.x = -1000;
    sphere8.position.y = 235;  // Blender→THree.js: yの正負を反転して y,zを交換
    sphere8.position.z = 539;
    scene.add(sphere8);

    var pointLight9 = new THREE.PointLight(colorPallet["pink"]);
    pointLight9.position.set(-165, 462, 412);
    pointLight9.castShadow = true;
    pointLight9.intensity = 0.5;
    scene.add(pointLight9);

    const sphereGeo9 = new THREE.SphereGeometry(5);
    const sphereMat9 = new THREE.MeshLambertMaterial({color: colorPallet["pink"]});
    const sphere9 = new THREE.Mesh(sphereGeo9, sphereMat9);
    sphere9.castShadow = true;
    sphere9.position.x = -165;
    sphere9.position.y = 462;  // Blender→THree.js: yの正負を反転して y,zを交換
    sphere9.position.z = 412;
    scene.add(sphere9);

    var pointLight10 = new THREE.PointLight(colorPallet["skyBlue"]);
    pointLight10.position.set(-610, 371, 129);
    pointLight10.castShadow = true;
    pointLight10.intensity = 0.5;
    scene.add(pointLight10);

    const sphereGeo10 = new THREE.SphereGeometry(5);
    const sphereMat10 = new THREE.MeshLambertMaterial({color: colorPallet["skyBlue"]});
    const sphere10 = new THREE.Mesh(sphereGeo10, sphereMat10);
    sphere10.castShadow = true;
    sphere10.position.x = -610;
    sphere10.position.y = 371;  // Blender→THree.js: yの正負を反転して y,zを交換
    sphere10.position.z = 129;
    scene.add(sphere10);

    var pointLight11 = new THREE.PointLight(colorPallet["red"]);
    pointLight11.position.set(-79, 463, 7);
    pointLight11.castShadow = true;
    pointLight11.intensity = 0.5;
    scene.add(pointLight11);

    const sphereGeo11 = new THREE.SphereGeometry(5);
    const sphereMat11 = new THREE.MeshLambertMaterial({color: colorPallet["red"]});
    const sphere11 = new THREE.Mesh(sphereGeo11, sphereMat11);
    sphere11.castShadow = true;
    sphere11.position.x = -79;
    sphere11.position.y = 463;  // Blender→THree.js: yの正負を反転して y,zを交換
    sphere11.position.z = 7;
    scene.add(sphere11);

    var pointLight12 = new THREE.PointLight(colorPallet["blue"]);
    pointLight12.position.set(588, 438, 180);
    pointLight12.castShadow = true;
    pointLight12.intensity = 0.5;
    scene.add(pointLight12);

    const sphereGeo12 = new THREE.SphereGeometry(5);
    const sphereMat12 = new THREE.MeshLambertMaterial({color: colorPallet["blue"]});
    const sphere12 = new THREE.Mesh(sphereGeo12, sphereMat12);
    sphere12.castShadow = true;
    sphere12.position.x = 588;
    sphere12.position.y = 438;  // Blender→THree.js: yの正負を反転して y,zを交換
    sphere12.position.z = 180;
    scene.add(sphere12);

    var pointLight13 = new THREE.PointLight(colorPallet["green"]);
    pointLight13.position.set(-1126, 175, -877);
    pointLight13.castShadow = true;
    pointLight13.intensity = 0.5;
    scene.add(pointLight13);

    const sphereGeo13 = new THREE.SphereGeometry(5);
    const sphereMat13 = new THREE.MeshLambertMaterial({color: colorPallet["green"]});
    const sphere13 = new THREE.Mesh(sphereGeo13, sphereMat13);
    sphere13.castShadow = true;
    sphere13.position.x = -1126;
    sphere13.position.y = 175;  // Blender→THree.js: yの正負を反転して y,zを交換
    sphere13.position.z = -877;
    scene.add(sphere13);

    var pointLight14 = new THREE.PointLight(colorPallet["yellow"]);
    pointLight14.position.set(-307, 284, -833);
    pointLight14.castShadow = true;
    pointLight14.intensity = 0.5;
    scene.add(pointLight14);

    const sphereGeo14 = new THREE.SphereGeometry(5);
    const sphereMat14 = new THREE.MeshLambertMaterial({color: colorPallet["yellow"]});
    const sphere14 = new THREE.Mesh(sphereGeo14, sphereMat14);
    sphere14.castShadow = true;
    sphere14.position.x = -307;
    sphere14.position.y = 284;  // Blender→THree.js: yの正負を反転して y,zを交換
    sphere14.position.z = -833;
    scene.add(sphere14);


    // var lightHelper = new THREE.CameraHelper(spotLight.shadow.camera);
    // scene.add(lightHelper);

    // Load GLTF
    const loader = new THREE.GLTFLoader();
    let url = 'http://127.0.0.1:5500/glTF/treeAndSnowman.glb';

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

        //対象の添字をランダムに取得
        let index = palletKeys[Math.floor(Math.random() * palletKeys.length)];
//        console.log(index + " " + colorPallet[index]);

        if (counter % 100 < 50){
            pointLight1.visible = true;
            sphere1.visible = true;
            pointLight1.color.setHex(colorPallet[index]);
        }else{
            pointLight1.visible = false;
            sphere1.visible = false;
        }


        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

}