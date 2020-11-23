//  forked: https://codepen.io/onom/pen/JOwxZr

let frame = 0;
const starVertices = [];
const width = window.innerWidth;
const height = window.innerHeight;

// define the coordinates of the vertices of a star
for (let degree = 18; degree < 360; degree += 36){
    starVertices.push(
        new THREE.Vector3(Math.sin(degree / 180 * Math.PI),
                          Math.cos(degree / 180 * Math.PI),
                          0));
}

// define the face of a star
const starFaces = [
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

// defined a renderer
const webgldev = document.getElementById('webgl-dev');
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
webgldev.appendChild(renderer.domElement);

const scene = new THREE.Scene();

// defined a camera
const camera = new THREE.PerspectiveCamera(
    45,
    width / height,
    0.4,
    10000 );

camera.position.z = 190;
camera.position.y = 50;
camera.rotation.x = -0.0;

// defined a ambient light
const ambientLight = new THREE.AmbientLight( 0xffffff, 1);
scene.add( ambientLight );

// create a gradient texture of illuminated points
function getTexturePoint(col) {
    const canvas = document.createElement('canvas');
    const size   = 256;
    const half   = size / 2;
    const center = size / 2;
    canvas.width  = size;
    canvas.height = size;
    const context = canvas.getContext('2d');

    const color = new THREE.Color();
    color.setHex(col);

    const grad = context.createRadialGradient(center, center, 0, center, center, half);
    grad.addColorStop(0, color.getStyle());
    grad.addColorStop(0.99, color.getStyle());
    grad.addColorStop(1, '#000000');
    context.beginPath();
    context.arc(center, center, half, 0, Math.PI * 2);
    context.fillStyle = grad;
    context.fill();
    context.closePath();

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
}

// define the color of the stars
const starMaterial = new THREE.MeshPhongMaterial( {
  color: 0xffffaa
} );

// create apex star geometry
const geom = new THREE.Geometry();
geom.vertices = starVertices;
geom.faces = starFaces;
geom.computeFaceNormals();
const starObject = new THREE.Mesh(geom, starMaterial);

// define the position of the star
starObject.position.set( 0, 104, 0 );
starObject.rotation.set( 0, 0, -60 );
scene.add( starObject );

const geometry = new THREE.Geometry();
for (let i = 0; i < 1000; i++) {
    geometry.vertices.push();
}

const geometry2 = new THREE.Geometry();
for (let i = 0; i < 1000; i++) {
    geometry2.vertices.push();
}

const material = new THREE.PointsMaterial({
    map: getTexturePoint(0x888888),
    size: 4,
    transparent: true,
    blending : THREE.AdditiveBlending
});

const material2 = new THREE.PointsMaterial({
    map: getTexturePoint(0xdddddd),
    size: 2,
    transparent: true,
    blending : THREE.AdditiveBlending
});

const mesh = new THREE.Points(geometry, material);
scene.add(mesh);

const mesh2 = new THREE.Points(geometry2, material2);
scene.add(mesh2);


function animation() {
    // define blinking illuminations
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
        let x = (Math.sin(i + frame / 100) * (40 - (i / 25)));
        let y = i/10;
        let z = (Math.cos(i + frame / 100) * (40 - (i / 25)));
        geometry.vertices[ i ] = new THREE.Vector3(x, y, z);
    }

    for (let i = 0; i < 1000; i++) {
        let x = (Math.sin(i + frame / 100) * (25 - (i / 40)));
        let y = i/10;
        let z = (Math.cos(i + frame / 100) * (25 - (i / 40)));
        geometry2.vertices[ i ] = new THREE.Vector3(x, y, z);
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
