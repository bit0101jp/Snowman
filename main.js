window.addEventListener('load', init);

function init() {
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas'),
        antialias: true
    });

    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, 1);
    camera.fov = 60;
    camera.position.set(0, 1200, 500);
    camera.lookAt(0,0,0);
    scene.add(camera);

    var cameraHelper = new THREE.CameraHelper(camera);
    scene.add(cameraHelper);

    var cubeGeo = new THREE.BoxGeometry(10, 10, 10);
    var cubeMat = new THREE.MeshLambertMaterial({color: 0xff0000});
    var cube = new THREE.Mesh(cubeGeo, cubeMat);
    cube.castShadow = true;
    cube.position.x = 200;
    cube.position.y = 200;
    cube.position.z = -400;
    scene.add(cube);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 200, 900);
    spotLight.castShadow = true;
    spotLight.angle = 0.6;

    spotLight.target = cube;
    scene.add(spotLight);

    var lightHelper = new THREE.CameraHelper(spotLight.shadow.camera);
    scene.add(lightHelper);

    // Load GLTF
    const loader = new THREE.GLTFLoader();
    const url = 'http://127.0.0.1:5500/glTF/Spaceship.glb';

    let model = null;
    loader.load(
        url,
        function (gltf) {
            console.log('load');
            model = gltf.scene;
            model.scale.set(100.0, 100.0, 100.0);
            model.position.set(0, 0, 0);
            //回転の調整
            model.rotation.y = THREE.Math.DEG2RAD * -0;
            scene.add(model);
        },
        function (error) {
            console.log('An error happened');
            console.log(error);
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
        renderer.setClearColor(0xe4f8ec);

        // カメラのアスペクト比を正す
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        console.log('h' + h + 'w' + w);

        renderer.render(scene, camera);
    }

    function tick() {
        requestAnimationFrame(tick);
        renderer.render(scene, camera);
    }

}