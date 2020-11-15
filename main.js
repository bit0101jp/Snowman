//
//  Ref.: https://codepen.io/onom/pen/JOwxZr
//

let frame = 0;

// star vertex coordinates
let starVertices = [
    new THREE.Vector3(Math.sin(18/180*Math.PI), Math.cos(18/180*Math.PI), 0),
    new THREE.Vector3(Math.sin(54/180*Math.PI), Math.cos(54/180*Math.PI), 0),
    new THREE.Vector3(Math.sin(90/180*Math.PI), Math.cos(90/180*Math.PI), 0),
    new THREE.Vector3(Math.sin(126/180*Math.PI), Math.cos(126/180*Math.PI), 0),
    new THREE.Vector3(Math.sin(162/180*Math.PI), Math.cos(162/180*Math.PI), 0),
    new THREE.Vector3(Math.sin(198/180*Math.PI), Math.cos(198/180*Math.PI), 0),
    new THREE.Vector3(Math.sin(234/180*Math.PI), Math.cos(234/180*Math.PI), 0),
    new THREE.Vector3(Math.sin(270/180*Math.PI), Math.cos(270/180*Math.PI), 0),
    new THREE.Vector3(Math.sin(306/180*Math.PI), Math.cos(306/180*Math.PI), 0),
    new THREE.Vector3(Math.sin(342/180*Math.PI), Math.cos(342/180*Math.PI), 0)
]

let starFaces = [
    new THREE.Face3( 0,  9,  1),
    new THREE.Face3( 2,  1,  3),
    new THREE.Face3( 4,  3,  5),
    new THREE.Face3( 6,  5,  7),
    new THREE.Face3( 8,  7,  9),
    new THREE.Face3( 3,  1,  5),
    new THREE.Face3( 5,  1,  7),
    new THREE.Face3( 7,  1,  9)
]

// calculate the size of a star
for (let i in starVertices){
    if (i % 2){
        // inside
        starVertices[i].x = starVertices[i].x * 2;
        starVertices[i].y = starVertices[i].y * 2;
    }else{
        // outside
        starVertices[i].x = starVertices[i].x * 5;
        starVertices[i].y = starVertices[i].y * 5;
    }
}

let webgldev = document.getElementById('webgl-dev');
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
webgldev.appendChild(renderer.domElement);

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    0.1,
    10000 );

camera.position.z = 200;
camera.position.y = 95;
camera.rotation.x = -0.2;

let ambientLight = new THREE.AmbientLight( 0xffffff, 1);
scene.add( ambientLight );

function createCircleCanvas(hue) {
    let canvas = document.createElement('canvas');
//     canvas.width = 256;
//     canvas.height = 256;
//     let context = canvas.getContext('2d');
//     context.fillStyle = "rgb(200, 0, 0)";
//    context.fillRect(0, 0, canvas.width, canvas.height);

    let SIZE   = 256;
    let HALF   = SIZE / 2;
    let CENTER = SIZE / 2;
    canvas.width  = SIZE;
    canvas.height = SIZE;
    let context = canvas.getContext('2d');

    let color = new THREE.Color();
    let h = hue;
    let s =  60;
    let l =  40;
    color.setHSL(h / 360, s / 100, l / 100);
    let grad    = context.createRadialGradient(CENTER, CENTER, 0, CENTER, CENTER, HALF);
    grad.addColorStop(0, color.getStyle());
    grad.addColorStop(0.99, color.getStyle());
    grad.addColorStop(1, '#000000');
    context.lineWidth = 0;
    context.beginPath();
    context.arc(CENTER, CENTER, HALF, 0, Math.PI * 2);
    context.fillStyle = grad;
    context.fill();
    context.closePath();

    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
}

let starMaterial = new THREE.MeshPhongMaterial( {
  color: 0xFFFF00
} );

// create apex star geometry
let geom = new THREE.Geometry();
geom.vertices = starVertices;
geom.faces = starFaces;
geom.computeFaceNormals()
let starObject = new THREE.Mesh(geom, starMaterial);

starObject.position.set( 0, 100, 0 );
starObject.rotation.set( 0, 0, 0 );
scene.add( starObject );

// geometory生成
let geometry = new THREE.Geometry();
for (let i = 0; i < 1000; i++) {
    geometry.vertices.push();
}

let material = new THREE.PointsMaterial({
    map: createCircleCanvas(220),
    size: 5,
    transparent: true,
    blending : THREE.AdditiveBlending
});

let mesh = new THREE.Points(geometry, material);
scene.add(mesh);

function animation() {

// ★ frame が100単位にカラーを変更したい。
    // let h = 300;
    // let s =  100;
    // let l =  100;
    // mesh.material.color.setHSL(h / 360, s / 100, l / 100);

    // mesh.material.color.setHex(0xffff00);
    // mesh.material.colorsNeedUpdate = true;

    for (let i = 0; i < 1000; i++) {
        if (frame % 100 && frame % 101 && frame % 102 && frame % 103 && frame % 104 && frame % 105 && frame % 106 && frame % 107 && frame % 108 && frame % 109){
            mesh.material.color.setHex(0xffff00);
        }else{
            mesh.material.color.setHex(0xff0000);
        }
        mesh.material.colorsNeedUpdate = true;


        let x = (Math.sin(i + frame / 100) * (50 - (i / 20)));
        let y = i/10;
        let z = (Math.cos(i + frame / 100) * (50 - (i / 20)));
        geometry.vertices[ i ] = new THREE.Vector3(x, y, z);
    }
    geometry.verticesNeedUpdate = true;
};

function render(){
    animation();
    frame++;
  	requestAnimationFrame(render);
	renderer.render(scene, camera);
}

render();

