//  forked: https://codepen.io/onom/pen/JOwxZr

let frame = 0;
let starVertices = [];
const width = window.innerWidth;
const height = window.innerHeight;

// star vertex coordinates
for (let degree = 18; degree < 360; degree += 36){
    starVertices.push(
        new THREE.Vector3(Math.sin(degree /180 * Math.PI),
                          Math.cos(degree /180 * Math.PI),
                          0));
}

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
renderer.setSize(width, height);
webgldev.appendChild(renderer.domElement);

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
    45,
    width / height,
    0.4,
    10000 );

camera.position.z = 190;
camera.position.y = 50;
camera.rotation.x = -0.0;

let ambientLight = new THREE.AmbientLight( 0xffffff, 1);
scene.add( ambientLight );

function createCircleCanvas() {
    let canvas = document.createElement('canvas');
    let SIZE   = 256;
    let HALF   = SIZE / 2;
    let CENTER = SIZE / 2;
    canvas.width  = SIZE;
    canvas.height = SIZE;
    let context = canvas.getContext('2d');

    let color = new THREE.Color();
    color.setHex(0x888888);

    let grad = context.createRadialGradient(CENTER, CENTER, 0, CENTER, CENTER, HALF);
    grad.addColorStop(0, color.getStyle());
    grad.addColorStop(0.99, color.getStyle());
    grad.addColorStop(1, '#000000');
    context.beginPath();
    context.arc(CENTER, CENTER, HALF, 0, Math.PI * 2);
    context.fillStyle = grad;
    context.fill();
    context.closePath();

    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
}

// define the color of the stars
let starMaterial = new THREE.MeshPhongMaterial( {
  color: 0xffffaa
} );

// create apex star geometry
let geom = new THREE.Geometry();
geom.vertices = starVertices;
geom.faces = starFaces;
geom.computeFaceNormals()
let starObject = new THREE.Mesh(geom, starMaterial);

starObject.position.set( 0, 104, 0 );
starObject.rotation.set( 0, 0, -60 );
scene.add( starObject );

let geometry = new THREE.Geometry();
for (let i = 0; i < 1000; i++) {
    geometry.vertices.push();
}

let material = new THREE.PointsMaterial({
    map: createCircleCanvas(),
    size: 4,
    transparent: true,
    blending : THREE.AdditiveBlending
});

let mesh = new THREE.Points(geometry, material);
scene.add(mesh);

function animation() {
    let timing = frame % 241;

    if (timing < 50){
        mesh.material.color.setHex(0x0000ff);
    }else if (timing < 100){
        mesh.material.color.setHex(0xffff00);
    }else if (timing < 150){
        mesh.material.color.setHex(0xff0000);
    }else if (timing < 200){
        mesh.material.color.setHex(0x00ff00);
    }else if (timing < 205){
        mesh.material.color.setHex(0x000000);
    }else if (timing < 208){
        mesh.material.color.setHex(0xffffff);
    }else if (timing < 211){
        mesh.material.color.setHex(0x000000);
    }else if (timing < 214){
        mesh.material.color.setHex(0xffffff);
    }else if (timing < 217){
        mesh.material.color.setHex(0x000000);
    }else if (timing < 220){
        mesh.material.color.setHex(0xffffff);
    }else if (timing < 223){
        mesh.material.color.setHex(0x000000);
    }else if (timing < 226){
        mesh.material.color.setHex(0xffffff);
    }else if (timing < 229){
        mesh.material.color.setHex(0x000000);
    }else if (timing < 232){
        mesh.material.color.setHex(0xffffff);
    }else if (timing < 235){
        mesh.material.color.setHex(0x000000);
    }else if (timing < 238){
        mesh.material.color.setHex(0xffffff);
    }else if (timing < 241){
        mesh.material.color.setHex(0x000000);
    }

    mesh.material.colorsNeedUpdate = true;

    for (let i = 0; i < 1000; i++) {
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

