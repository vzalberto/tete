if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container;
var camera, controls, scene, renderer, elf;
var objects = [];
var world = false;

init();
animate();

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 10;

    controls = new THREE.TrackballControls( camera );
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x0000ff );

    var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    scene.add( ambientLight );
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
    directionalLight.position.set( 1, 1, 0 ).normalize();
    scene.add( directionalLight );
    
    // collada
    var loadingManager = new THREE.LoadingManager( function() {
        scene.add( elf );
    } );
    var loader = new THREE.ColladaLoader( loadingManager );
    loader.options.convertUpAxis = true;

    loadCollada(loader, 'piedra');
    loadCollada(loader, 'disco');
    loadCollada(loader, 'bandera');
    loadCollada(loader, 'cuerda');
    loadCollada(loader, 'cono1');
    loadCollada(loader, 'cono2');
    loadCollada(loader, 'cono3');
    loadCollada(loader, 'cosa');

    loadCollada(loader, 'escaleras');

    loadCollada(loader, 'base_amarilla');

    console.log(objects);

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    container.appendChild( renderer.domElement );

    var dragControls = new THREE.DragControls( objects, camera, renderer.domElement );
    dragControls.addEventListener( 'dragstart', function ( event ) { controls.enabled = false; } );
    dragControls.addEventListener( 'dragend', function ( event ) { controls.enabled = true; } );

    window.addEventListener( 'resize', onWindowResize, false );

}

function loadCollada(loader, filename){
    var x, y, z;

    loader.load( '/collada/' + filename + '.dae' , function ( collada ) {

        window.referenceModel = collada.scene;
        console.log(window.referenceModel);

        var model = window.referenceModel;

        var clone = new THREE.Group();
            clone.add(model);

        x = Math.random() * 2 * Math.PI;
        y = Math.random() * 2 * Math.PI;
        z = Math.random() * 2 * Math.PI;

        clone.setRotationFromEuler(new THREE.Euler(x, y, z));
        console.log(clone);
        scene.add( clone );

        objects.push( clone );

    } );
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    if(world)
        scene.background = new THREE.Color( Math.random() * 0xffffff );


    render();

}

function render() {

    controls.update();

    renderer.render( scene, camera );

}

function fight(){

    document.getElementById('menu-container').style.top = randomWithRange(20, 80);
    document.getElementById('menu-container').style.right = randomWithRange(20, 80);
    
    
    objects.map((group) => {
        
        x = randomWithRange(1,5);
        y = randomWithRange(1,5);
        z = randomWithRange(1,5);

        x = Math.random() * 2 * Math.PI;
        y = Math.random() * 2 * Math.PI;
        z = Math.random() * 2 * Math.PI;
        
        group.setRotationFromEuler(new THREE.Euler(x, y, z));
    })
    render();
}

function randomWithRange(min,max){
    var range = (max - min) + 1;     
    
    return String((Math.random() * range) + min) + '%';
}

function yosoytumaestro(){
    world = !world;
}
