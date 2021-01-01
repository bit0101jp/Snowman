
window.addEventListener('load', init);

function init() {

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas'),
        antialias: true
    });
    renderer.setClearColor(new THREE.Color(0x000));

    const scene = new THREE.Scene();

    const axes = new THREE.AxesHelper(10000);
    scene.add(axes);
    
    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, 1);
    camera.fov = 60;
    camera.far = 10000;
    camera.position.set(-400, 200, 800);

    camera.lookAt(0,0,0);
    scene.add(camera);

    var orbitControls = new THREE.OrbitControls( camera, renderer.domElement );
    // 滑らかにカメラコントローラーを制御する
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.2;

    var cubeGeo = new THREE.BoxGeometry(20, 20, 20);
    var cubeMat = new THREE.MeshLambertMaterial({color: 0xffffff});
    var cube = new THREE.Mesh(cubeGeo, cubeMat);
    var cube00 = new THREE.Mesh(cubeGeo, cubeMat);
    var cube01 = new THREE.Mesh(cubeGeo, cubeMat);
    var cube02 = new THREE.Mesh(cubeGeo, cubeMat);
    var cube03 = new THREE.Mesh(cubeGeo, cubeMat);
    var cube04 = new THREE.Mesh(cubeGeo, cubeMat);
    var cube05 = new THREE.Mesh(cubeGeo, cubeMat);
    var cube06 = new THREE.Mesh(cubeGeo, cubeMat);
    cube.castShadow = true;
    cube.position.x = 000;
    cube.position.y = 500;
    cube.position.z = 000;
    scene.add(cube);

    cube03.position.x = -688;
    cube03.position.y =340;
    cube03.position.z = 613;
    scene.add(cube03);
    cube04.position.x = -709;
    cube04.position.y =262;
    cube04.position.z = -588;  // Blender-Y 正負反転要
    scene.add(cube04);
    cube05.position.x = 312;
    cube05.position.y =475;
    cube05.position.z = 476;
    scene.add(cube06);
    cube06.position.x = 591;
    cube06.position.y = 418;
    cube06.position.z = 603;
    scene.add(cube06);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 200, 900);
    spotLight.castShadow = true;
    spotLight.angle = 10.0;
//    spotLight.target = cube;
//    scene.add(spotLight);

    var spotLight03 = new THREE.SpotLight(0xffffff);
    spotLight03.position.set(-688, 340, 613);
    spotLight03.castShadow = true;
    spotLight03.angle = 10.0;
    scene.add(spotLight03);

    var spotLight04 = new THREE.SpotLight(0xffffff);
    spotLight04.position.set(-709, 262, -588);
    spotLight04.castShadow = true;
    spotLight04.angle = 10.0;
    scene.add(spotLight04);

    var spotLight05 = new THREE.SpotLight(0xffffff);
    spotLight05.position.set(312, 475, 476);
    spotLight05.castShadow = true;
    spotLight05.angle = 10.0;
    scene.add(spotLight05);

    var spotLight06 = new THREE.SpotLight(0xffffff);
    spotLight06.position.set(591, 418, 603);
    spotLight06.castShadow = true;
    spotLight06.angle = 10.0;
    scene.add(spotLight06);
    
    const spotLight2X = -100;
    const spotLight2Y = 0;
    const spotLight2Z = 0;
    var spotLight2 = new THREE.SpotLight(0xffff00);
    spotLight2.position.set(spotLight2X, spotLight2Y, spotLight2Z);
    spotLight2.castShadow = true;
    spotLight2.angle = 10.0;
    scene.add(spotLight2);



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
    tick();
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
        // renderer.setClearColor(0xe4f8ec);
        renderer.setClearColor(0x000055);

        // カメラのアスペクト比を正す
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        console.log('h' + h + 'w' + w);

        renderer.render(scene, camera);
    }

    function tick() {

        orbitControls.update();

        requestAnimationFrame(tick);
        renderer.render(scene, camera);
    }

}