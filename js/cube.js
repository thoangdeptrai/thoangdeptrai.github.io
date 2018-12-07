var canvas1 = document.getElementById("myCanvas");
var renderer = new THREE.WebGLRenderer({ canvas: canvas1, alpha: true, antialias: true });
renderer.gammaOutput = true;
var camera, scene, controls;
var sides = [];
var fold = true;
var side0, side1, side2, side3, side4, side5, side6, side7, side8, side9, side10, side11;
var lightHolder = new THREE.Group();
var target = [];
var textureSrc;
var objArr = [];
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var objects = [];

function init1() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, canvas1.clientWidth / canvas1.clientHeight, 1, 1000);
  camera.position.set(0, 0.3, 1).setLength(5);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvas1.clientWidth, canvas1.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  //Light
  var light = new THREE.AmbientLight(0xFFFFFF, 0.5);
  scene.add(light);

  var light1 = new THREE.PointLight(0xFFFFFF, 0.4);
  light1.position.set(-0.5, 5, 1);
  light1.castShadow = true;
  light1.shadow.camera.near = 0.1;
  light1.shadow.camera.far = 25;
  light1.shadow.mapSize.width = 2048; // default is 512
  light1.shadow.mapSize.height = 2048; // default is 512
  camera.add(light1);
  scene.add(camera);

  var light2 = new THREE.PointLight(0xFFFFFF, 0.3);
  light2.position.set(-1, 0.5, 3);
  lightHolder.add(light2);
  scene.add(lightHolder);

  //side center
  sideGeom0 = new THREE.PlaneGeometry(1.5, 2);
  side0 = new THREE.Mesh(sideGeom0, new THREE.MeshLambertMaterial({ color: "#FFFFFF", side: THREE.DoubleSide }));
  side0.castShadow = true;
  side0.name = "Back side";
  side0.rotation.x += 0.15;
  side0.rotation.y -= 0.5;
  
  scene.add(side0);
  objects.push(side0);
  var geo0 = new THREE.EdgesGeometry(side0.geometry);
  var mat0 = new THREE.LineBasicMaterial({ color: 0x908989, linewidth: 4 });
  var wireframe0 = new THREE.LineSegments(geo0, mat0);
  side0.add(wireframe0);
  //side left
  sideGeom1 = new THREE.PlaneGeometry(1, 1.98);
  sideGeom1.translate(-0.5, 0, 0);
  side1 = new THREE.Mesh(sideGeom1, new THREE.MeshLambertMaterial({ color: "#FFFFFF", side: THREE.DoubleSide }));
  side1.position.set(-0.75, 0, 0);
  side1.castShadow = true;
  side1.name = "Left side";
  side1.rotation.y = Math.PI / 2;
  side0.add(side1);
  sides.push(side1);
  objects.push(side1);
  var geo1 = new THREE.EdgesGeometry(side1.geometry);
  var mat1 = new THREE.LineBasicMaterial({ color: 0x908989, linewidth: 4 });
  var wireframe1 = new THREE.LineSegments(geo1, mat1);
  side1.add(wireframe1);

  //side bottom
  sideGeom2 = new THREE.PlaneGeometry(1.49, 1);
  side2 = new THREE.Mesh(sideGeom2, new THREE.MeshLambertMaterial({ color: "#FFFFFF", side: THREE.DoubleSide }));
  sideGeom2.translate(0, -0.49, 0);
  side2.position.set(0, -1, 0);
  side2.castShadow = true;
  side2.name = "Bottom side";
  side2.rotation.x = -Math.PI / 2;
  side0.add(side2);
  sides.push(side2);
  objects.push(side2);
  var geo2 = new THREE.EdgesGeometry(side2.geometry);
  var mat2 = new THREE.LineBasicMaterial({ color: 0x908989, linewidth: 4 });
  var wireframe2 = new THREE.LineSegments(geo2, mat2);
  side2.add(wireframe2);

  //plug bottom
  // side3 = side2.clone();
  // side3.material = new THREE.MeshLambertMaterial({ color: "#FFFFFF", side: THREE.DoubleSide });
  // side3.translateOnAxis(new THREE.Vector3(0, 1, 0), 2);
  var plugShapeBottom = new THREE.Shape();
  roundedRectBottom(plugShapeBottom, -0.745, -1.2, 1.49, 0.7, 0.3);
  sideGeom3 = new THREE.ShapeGeometry(plugShapeBottom);
  side3 = new THREE.Mesh(sideGeom3, new THREE.MeshLambertMaterial({ color: "#FFFFFF", side: THREE.DoubleSide }));
  sideGeom3.translate(0, 0.5, 0);
  side3.position.set(0, -0.99, 0);
  side3.castShadow = true;
  side3.scale.y += -.5;
  side3.rotation.x = -Math.PI / 2;
  side2.add(side3);
  sides.push(side3);
  var geo3 = new THREE.EdgesGeometry(side3.geometry);
  var mat3 = new THREE.LineBasicMaterial({ color: 0x908989, linewidth: 4 });
  var wireframe3 = new THREE.LineSegments(geo3, mat3);
  side3.add(wireframe3);

  //side top
  sideGeom4 = new THREE.PlaneGeometry(1.49, 1);
  side4 = new THREE.Mesh(sideGeom4, new THREE.MeshLambertMaterial({ color: "#FFFFFF", side: THREE.DoubleSide }));
  sideGeom4.translate(0, 0.49, 0);
  side4.position.set(0, 1, 0);
  side4.castShadow = true;
  side4.name = "Top side";
  side4.rotation.x = Math.PI / 2;
  side0.add(side4);
  sides.push(side4);
  objects.push(side4);
  var geo4 = new THREE.EdgesGeometry(side4.geometry);
  var mat4 = new THREE.LineBasicMaterial({ color: 0x908989, linewidth: 4 });
  var wireframe4 = new THREE.LineSegments(geo4, mat4);
  side4.add(wireframe4);

  //plug top
  // var side5Geom = new THREE.PlaneGeometry(1.49, 1);
  // side5 = new THREE.Mesh(side5Geom, new THREE.MeshLambertMaterial({ color: "#FFFFFF", side: THREE.DoubleSide }));
  var plugShapeTop = new THREE.Shape();
  roundedRectTop(plugShapeTop, -0.745, -0.5, 1.49, 0.7, 0.3);
  sideGeom5 = new THREE.ShapeGeometry(plugShapeTop);
  side5 = new THREE.Mesh(sideGeom5, new THREE.MeshLambertMaterial({ color: "#FFFFFF", side: THREE.DoubleSide }));
  sideGeom5.translate(0, 0.5, 0);
  side5.position.set(0, 0.99, 0);
  side5.castShadow = true;
  side5.scale.y += -.5;
  side5.rotation.x = Math.PI / 2;
  side4.add(side5);
  sides.push(side5);
  var geo5 = new THREE.EdgesGeometry(side5.geometry);
  var mat5 = new THREE.LineBasicMaterial({ color: 0x908989, linewidth: 4 });
  var wireframe5 = new THREE.LineSegments(geo5, mat5);
  side5.add(wireframe5);

  //side right
  sideGeom6 = new THREE.PlaneGeometry(1, 1.98);
  side6 = new THREE.Mesh(sideGeom6, new THREE.MeshLambertMaterial({ color: "#FFFFFF", side: THREE.DoubleSide }));
  sideGeom6.translate(0.5, 0, 0);
  side6.position.set(0.75, 0, 0);
  side6.castShadow = true;
  side6.name = "Right side";
  side6.rotation.y = -Math.PI / 2;
  side0.add(side6);
  sides.push(side6);
  objects.push(side6);
  var geo6 = new THREE.EdgesGeometry(side6.geometry);
  var mat6 = new THREE.LineBasicMaterial({ color: 0x908989, linewidth: 4 });
  var wireframe6 = new THREE.LineSegments(geo6, mat6);
  side6.add(wireframe6);

  //side front
  // side7 = side1.clone();
  // side7.material = new THREE.MeshLambertMaterial({ color: "#FFFFFF", side: THREE.DoubleSide });
  // side7.translateOnAxis(new THREE.Vector3(1, 0, 0), 2);
  sideGeom7 = new THREE.PlaneGeometry(1, 1.98);
  sideGeom7.translate(-0.5, 0, 0);
  side7 = new THREE.Mesh(sideGeom7, new THREE.MeshLambertMaterial({ color: "#FFFFFF", side: THREE.DoubleSide }));
  side7.position.set(-1, 0, 0);
  side7.castShadow = true;
  side7.scale.x += 0.5;
  side7.name = "Front side";
  side7.rotation.y = Math.PI / 2;
  side1.add(side7);
  sides.push(side7);
  objects.push(side7);
  var geo7 = new THREE.EdgesGeometry(side7.geometry);
  var mat7 = new THREE.LineBasicMaterial({ color: 0x908989, linewidth: 4 });
  var wireframe7 = new THREE.LineSegments(geo7, mat7);
  side7.add(wireframe7);

  //flap top-left
  // var side8Geom = new THREE.PlaneGeometry(0.99, 0.5);
  var flapShapeTop_Left = new THREE.Shape();
  roundedRectTop(flapShapeTop_Left, -0.49, -0.25, 0.98, 0.5, 0.2);
  sideGeom8 = new THREE.ShapeGeometry(flapShapeTop_Left);
  side8 = new THREE.Mesh(sideGeom8, new THREE.MeshLambertMaterial({ color: "#FFFFFF", side: THREE.DoubleSide }));
  sideGeom8.translate(0.5, 0.25, 0);
  //side8.translateOnAxis(new THREE.Vector3(0,1,0 ), 2 );
  side8.position.set(-1, 0.98, 0);
  side8.castShadow = true;
  side8.rotation.x = Math.PI / 2;
  side1.add(side8);
  sides.push(side8);
  var geo8 = new THREE.EdgesGeometry(side8.geometry);
  var mat8 = new THREE.LineBasicMaterial({ color: 0x908989, linewidth: 4 });
  var wireframe8 = new THREE.LineSegments(geo8, mat8);
  side8.add(wireframe8);

  //flap bottom-left
  // var side9Geom = new THREE.PlaneGeometry(0.99, 0.5);
  var flapShapeBottom_Left = new THREE.Shape();
  roundedRectBottom(flapShapeBottom_Left, -0.49, -0.25, 0.98, 0.5, 0.2);
  sideGeom9 = new THREE.ShapeGeometry(flapShapeBottom_Left);
  side9 = new THREE.Mesh(sideGeom9, new THREE.MeshLambertMaterial({ color: "#FFFFFF", side: THREE.DoubleSide }));
  sideGeom9.translate(0.5, -0.25, 0);
  side9.position.set(-1, -0.98, 0);
  side9.castShadow = true;
  side9.rotation.x = -Math.PI / 2;
  side1.add(side9);
  sides.push(side9);
  var geo9 = new THREE.EdgesGeometry(side9.geometry);
  var mat9 = new THREE.LineBasicMaterial({ color: 0x908989, linewidth: 4 });
  var wireframe9 = new THREE.LineSegments(geo9, mat9);
  side9.add(wireframe9);

  //flap top-right
  // var side10Geom = new THREE.PlaneGeometry(0.99, 0.5);
  var flapShapeTop_Right = new THREE.Shape();
  roundedRectTop(flapShapeTop_Right, -0.49, -0.25, 0.98, 0.5, 0.2);
  sideGeom10 = new THREE.ShapeGeometry(flapShapeTop_Right);
  side10 = new THREE.Mesh(sideGeom10, new THREE.MeshLambertMaterial({ color: "#FFFFFF", side: THREE.DoubleSide }));
  sideGeom10.translate(1.5, 0.25, 0);
  side10.position.set(-1, 0.98, 0);
  side10.castShadow = true;
  side10.rotation.x = Math.PI / 2;
  side6.add(side10);
  sides.push(side10);
  var geo10 = new THREE.EdgesGeometry(side10.geometry);
  var mat10 = new THREE.LineBasicMaterial({ color: 0x908989, linewidth: 4 });
  var wireframe10 = new THREE.LineSegments(geo10, mat10);
  side10.add(wireframe10);

  //flap bottom-right
  // var side11Geom = new THREE.PlaneGeometry(0.99, 0.5);
  var flapShapeBottom_Right = new THREE.Shape();
  roundedRectBottom(flapShapeBottom_Right, -0.49, -0.25, 0.98, 0.5, 0.2);
  sideGeom11 = new THREE.ShapeGeometry(flapShapeBottom_Right);
  side11 = new THREE.Mesh(sideGeom11, new THREE.MeshLambertMaterial({ color: "#FFFFFF", side: THREE.DoubleSide }));
  sideGeom11.translate(1.5, -0.25, 0);
  side11.position.set(-1, -0.98, 0);
  side11.castShadow = true;
  side11.rotation.x = -Math.PI / 2;
  side6.add(side11);
  sides.push(side11);
  var geo11 = new THREE.EdgesGeometry(side11.geometry);
  var mat11 = new THREE.LineBasicMaterial({ color: 0x908989, linewidth: 4 });
  var wireframe11 = new THREE.LineSegments(geo11, mat11);
  side11.add(wireframe11);

  function roundedRectTop(ctx, x, y, width, height, radius) { 
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
    ctx.lineTo(x + width - radius, y + height);
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    ctx.lineTo(x + width, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y);
    ctx.lineTo(x, y);
    ctx.quadraticCurveTo(x, y, x, y);
  }

  function roundedRectBottom(ctx, x, y, width, height, radius) {
    ctx.moveTo(x, y + height);
    ctx.lineTo(x, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height);
    ctx.lineTo(x + width, y + height);
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height);
    ctx.lineTo(x + width, y + radius);
    ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
    ctx.lineTo(x + radius, y);
    ctx.quadraticCurveTo(x, y, x, y + radius);
  }
  document.getElementById("run").addEventListener("click", foldTheCube);
}

/**
 * show value when change resize
 */
function update(val, id) {
  document.getElementById("resize" + id).value = val;
}

var angle = angle1 = 0;
var angle2 = angle3 = Math.PI / 2;
var t, t1;
var isContinue = true;
var start;
var start1;
var finish;
var isClosedBox = true;
var isOpenbox = false;

var check_fold_btn = false;
var check_open_btn = true;
/**
 * show view when change expand
*/

function foldTheCube() {
  fold = !fold;
  if (sides[3].rotation.x == - Math.PI / 4) {
    angle = Math.PI / 2;
    finish = { value: 0 };
    t = 1800;
    t1 = 800;
    start = { value: angle };
    new TWEEN
      .Tween(start)
      .to(finish, t)
      .onStart(function () {
        //addIndex(side5, '4');
        //addIndex(side8, '5');
        document.getElementById("fold").disabled = true;
      })
      .delay(fold ? 0 : 400)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(function () {
        angle = start.value;
        sides[0].rotation.y = angle;
        sides[2].rotation.x = angle * -1.2;
        sides[5].rotation.y = -angle;
        sides[6].rotation.y = angle;
        sides[8].rotation.x = -angle;
        sides[10].rotation.x = -angle;
      })
      .onComplete(function () {
        check_open_btn = true;
        angle2 = angle3 = Math.PI / 2;
      })
      .start();
    start1 = { value: angle1 };
    new TWEEN
      .Tween(start1)
      .to(finish, t1)
      .onStart(function () {
        document.getElementById("fold").disabled = true;
      })
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(function () {
        angle1 = start1.value;
        sides[1].rotation.x = -angle1;
      })
      .onComplete(function () {
        if (angle1 == Math.PI / 2) {
          sides[2].rotation.x = -angle1;
        }
        isClosedBox = !isClosedBox;
        document.getElementById("fold").disabled = isClosedBox ? false : true;
      })
      .start();
    var angle4 = - Math.PI / 4;
    var start4 = { value: angle4 };
    new TWEEN
      .Tween(start4)
      .to(finish, t)
      .onStart(function () {
        document.getElementById("fold").disabled = true;
      })
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(function () {
        angle4 = start4.value;
        sides[3].rotation.x = angle4;
        sides[4].rotation.x = angle4 * -1.2;
        sides[7].rotation.x = angle4;
        sides[9].rotation.x = angle4;
      })
      .start();
  } else {
    finish = { value: fold ? Math.PI / 2 : 0 };
    t = fold ? 800 : 1800;
    t1 = fold ? 1800 : 800;
    start = { value: angle };
    new TWEEN
      .Tween(start)
      .to(finish, t)
      .onStart(function () {
        //addIndex(side5, '4');
        //addIndex(side8, '5');
        document.getElementById("fold").disabled = true;
      })
      .delay(fold ? 0 : 400)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(function () {
        angle = start.value;
        sides[0].rotation.y = angle;
        sides[2].rotation.x = angle * -1.2;
        sides[4].rotation.x = angle * 1.2;
        sides[5].rotation.y = -angle;
        sides[6].rotation.y = angle;
        sides[7].rotation.x = angle;
        sides[8].rotation.x = -angle;
        sides[9].rotation.x = angle;
        sides[10].rotation.x = -angle;
      })
      .start();
    start1 = { value: angle1 };
    new TWEEN
      .Tween(start1)
      .to(finish, t1)
      .onStart(function () {
        document.getElementById("fold").disabled = true;
        if (angle1 == Math.PI / 2) {
          sides[2].rotation.x -= 0.3;
          sides[4].rotation.x += 0.3;
        }
      })
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(function () {
        angle1 = start1.value;
        sides[1].rotation.x = -angle1;
        sides[3].rotation.x = angle1;
      })
      .onComplete(function () {
        if (angle1 == Math.PI / 2) {
          sides[2].rotation.x = -angle1;
          sides[4].rotation.x = angle1;
        }
        isClosedBox = !isClosedBox;
        document.getElementById("fold").disabled = isClosedBox ? false : true;
      })
      .start();
  }
}

/** 
 * show view when collapse box
*/

function collapseBox() {
  if (fold) {
    isOpenbox = false;
    finish = { value: !check_open_btn ? - Math.PI / 4 : Math.PI / 2 };
    t = !check_open_btn ? 800 : 1500;
    t1 = !check_open_btn ? 1500 : 800;
    start = { value: angle2 };
    new TWEEN
      .Tween(start)
      .to(finish, t)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(function () {
        angle2 = start.value;
        sides[3].rotation.x = angle2;
        sides[4].rotation.x = (angle2 < 0) ? (angle2 * -1.2) : (angle2 * 1.5);
      })
      .onComplete(function () {
        //addIndex(side5, '4');
        //addIndex(side8, '5');
        isOpenbox = true;
        document.getElementById("run").disabled = false;
      })
      .start();
    start1 = { value: angle3 };
    new TWEEN
      .Tween(start1)
      .delay(!check_open_btn ? 200 : 0)
      .to(finish, t1)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(function () {
        angle3 = start1.value;
        sides[7].rotation.x = angle3;
        sides[9].rotation.x = angle3;
      })

      .start();
  }
}

function animate1() {
  onCameraChange();
  requestAnimationFrame(animate1);
  TWEEN.update();
  render();
}

function render() {
  lightHolder.quaternion.copy(camera.quaternion);
  renderer.render(scene, camera);
  onCameraChange();
}

document.getElementById("fold").disabled = true;
init1(fold);
animate1();

function onCameraChange() {
  objArr.forEach(function (objData) {

    var proj = toScreenPosition(objData.divObj, camera);
    objData.divElem.style.top = proj.y + 'px';
    objData.divElem.style.left = proj.x + 'px';
  });
}

