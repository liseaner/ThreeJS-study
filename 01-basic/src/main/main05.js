import * as THREE from "three";
// import { CubeTextureLoader } from "three";
// 导入轨道控制器
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

// console.log(THREE)
//目标：clock 用于跟踪时间
// 1.创建场景
const scene=new THREE.Scene()
// 2.创建相机
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
//屏幕宽/屏幕高

// 设置相机位置
camera.position.set(0,0,10)
scene.add(camera)

// 添加物体
// 创建几何体
const cubeGeometry=new THREE.BoxGeometry(1,1,1);
const cubeMaterial=new THREE.MeshBasicMaterial({color:0xffff00})
// 根据几何体和材质创建物体
const cube=new THREE.Mesh(cubeGeometry,cubeMaterial);

// 修改物体的位置
// cube.position.set(5,0,5)
// 或者直接设置坐标
// cube.position.x=3;

// 缩放
// cube.scale.set(3,2,1);
// cube.scale.x=5;

// 旋转
cube.rotation.set(Math.PI/4,0,0,"XYZ");//最后的XYZ是旋转顺序
// Math.PI=180°

// 将几何体添加到场景中
scene.add(cube);



// 初始化渲染器
const renderer=new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth,window.innerHeight);
console.log(window.innerWidth,window.innerHeight)
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);

// // 使用渲染器 ，通过相机将场景渲染进来
// renderer.render(scene,camera)


// 创建轨道控制器
const controls=new OrbitControls(camera,renderer.domElement);

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );


// 设置时钟
const clock=new THREE.Clock();
// 设置动画
var animation1=gsap.to(cube.position,{
    x:5,
    duration:5,
    ease:"power1.inOut",
    // repeat:2,
    repeat:-1,//设置重复的次数，无限次循环
    // 往返运动
    yoyo:true,
    // delay延迟
    delay:2,
    onComplete:()=>{
        console.log("动画完成");
    },
    onStart:()=>{
        console.log('动画开始')
    }
});
gsap.to(cube.rotation,{x:2*Math.PI,duration:5,ease:"power1.inOut"})
// 增加双击监听事件
window.addEventListener('dblclick',()=>{
    console.log('animation1',animation1)
   if(animation1.isActive()){
    // 暂停
    animation1.pause();
   }else{
    // 恢复
    animation1.resume();
   }
})
function render(){
    renderer.render(scene,camera);
    // 渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render);
}

render();