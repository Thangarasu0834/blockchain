import React, { useRef, useEffect } from "react";
import './App.css'
import * as THREE from "three";

/** @dev Helper functions */
const rgb = (r, g, b) => {
  return new THREE.Vector3(r, g, b);
};

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
/** @dev -- End Helper Functions */

/** @dev Required for `createWave()` */
const loader = (path, texture) => {
  return new Promise((resolve, reject) => {
    let loader = new THREE.FileLoader();

    if (typeof texture !== "undefined") {
      loader = new THREE.TextureLoader();
    }

    loader.load(path, (item) => resolve(item));
  });
};

const config = {
  individualItem: ".album-item", 
  carouselWidth: 1000, 
  carouselId: "#album-rotator", 
  carouselHolderId: "#album-rotator-holder", 
  colors: [

    { low: rgb(0, 114, 255), high: rgb(48, 0, 255) },
    { low: rgb(236, 166, 15), high: rgb(233, 104, 0) },
    { low: rgb(43, 75, 235), high: rgb(213, 51, 248) },
    { low: rgb(175, 49, 49), high: rgb(123, 16, 16) }
  ]
};

const _selector = config.individualItem;
const _colors = config.colors;
const _carouselId = config.carouselId;
const _carouselHolderId = config.carouselHolderId;

export default function Slider () {
  const mount = useRef(null);

  // Async function for generating webGL waves
  async function createWave(selector, colors) {
    if (
      document.querySelectorAll(selector) !== null &&
      document.querySelectorAll(selector).length > 0
    ) {
      // Import all the fragment and vertex shaders
      const noise = await loader("/shaders/noise.glsl");
      const fragment = await loader("/shaders/fragment.glsl");
      const vertex = await loader("/shaders/vertex.glsl");

      let i = 0;

      // For each of the selector elements
      document.querySelectorAll(selector).forEach((item) => {
        // Create a renderer
        const renderer = new THREE.WebGLRenderer({
          powerPreference: "high-performance",
          antialias: true,
          alpha: true
        });

        // Get el width and height
        const elWidth = parseFloat(window.getComputedStyle(item).width);
        const elHeight = parseFloat(window.getComputedStyle(item).height);

        // Set sizes and set scene/camera
        renderer.setSize(elWidth, elHeight);
        document.body.appendChild(renderer.domElement);
        renderer.setPixelRatio(window.devicePixelRatio);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          75,
          elWidth / elHeight,
          0.1,
          1000
        );

        // Check on colors to use
        let high = colors[0].high;
        let low = colors[0].low;

        if (typeof colors[i] !== "undefined") {
          high = colors[i].high;
          low = colors[i].low;
          ++i;
        }

        // And use the high color for the subtext.
        if (item.querySelector(".subtext") !== null) {
          item.querySelector(
            ".subtext"
          ).style.background = `rgba(${high.x},${high.y},${high.z},0.75)`;
        }

        // Create a plane, and pass that through to our shaders
        let geometry = new THREE.PlaneGeometry(600, 600, 100, 100);
        let material = new THREE.ShaderMaterial({
          uniforms: {
            u_lowColor: { type: "v3", value: low },
            u_highColor: { type: "v3", value: high },
            u_time: { type: "f", value: 0 },
            u_height: { type: "f", value: 1 },
            u_rand: {
              type: "f",
              value: new THREE.Vector2(
                randomInteger(6, 10),
                randomInteger(8, 10)
              )
            }
          },
          fragmentShader: noise + fragment,
          vertexShader: noise + vertex
        });

        // Create the mesh and position appropriately
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0, -300);
        scene.add(mesh);

        // On hover effects for each item
        let enterTimer, exitTimer;

        item.addEventListener("mouseenter", (e) => {
          if (typeof exitTimer !== "undefined") {
            clearTimeout(exitTimer);
          }

          enterTimer = setInterval(() => {
            if (mesh.material.uniforms.u_height.value >= 0.5) {
              mesh.material.uniforms.u_height.value -= 0.05;
            } else {
              clearTimeout(enterTimer);
            }
          }, 10);
        });

        item.addEventListener("mouseleave", (e) => {
          if (typeof enterTimer !== "undefined") {
            clearTimeout(enterTimer);
          }

          exitTimer = setInterval(() => {
            if (mesh.material.uniforms.u_height.value < 1) {
              mesh.material.uniforms.u_height.value += 0.05;
            } else {
              clearTimeout(exitTimer);
            }
          }, 10);
        });

        // Render
        renderer.render(scene, camera);

        let t = 0;

        // Animate
        const animate = () => {
          requestAnimationFrame(animate);

          renderer.render(scene, camera);
          item.appendChild(renderer.domElement);

          mesh.material.uniforms.u_time.value = t;
          t = t + 0.02;
        };

        animate();
      });
    }
  }

  useEffect(() => {
    // Async function for generating webGL waves
    createWave(_selector, _colors);

    // Get items
    const el = document.querySelector(_selector);
    const elWidth =
      parseFloat(window.getComputedStyle(el).width) +
      parseFloat(window.getComputedStyle(el).marginLeft) +
      parseFloat(window.getComputedStyle(el).marginRight);

    // Track carousel
    let mousedown = false;
    let movement;
    let initialPosition = 0;
    let selectedItem;
    let currentDelta = 0;

    document.querySelectorAll(_carouselId).forEach((item) => {
      item.style.width = `${config.carouselWidth}px`;
    });

    document.querySelectorAll(_carouselId).forEach((item) => {
      item.addEventListener("pointerdown", (e) => {
        mousedown = true;
        selectedItem = item;
        initialPosition = e.pageX;
        currentDelta =
          parseFloat(
            item
              .querySelector(_carouselHolderId)
              .style.transform.split("translateX(")[1]
          ) || 0;
      });
    });

    const scrollCarousel = (change, currentDelta, selectedItem) => {
      let numberThatFit = Math.floor(config.carouselWidth / elWidth);
      let newDelta = currentDelta + change;
      let elLength =
        selectedItem.querySelectorAll(_selector).length - numberThatFit;
      if (newDelta <= 0 && newDelta >= -elWidth * elLength) {
        selectedItem.querySelector(
          _carouselHolderId
        ).style.transform = `translateX(${newDelta}px)`;
      } else {
        if (newDelta <= -elWidth * elLength) {
          selectedItem.querySelector(
            _carouselHolderId
          ).style.transform = `translateX(${-elWidth * elLength}px)`;
        } else if (newDelta >= 0) {
          selectedItem.querySelector(
            _carouselHolderId
          ).style.transform = `translateX(0px)`;
        }
      }
    };

    document.body.addEventListener("pointermove", (e) => {
      if (mousedown === true && typeof selectedItem !== "undefined") {
        let change = -(initialPosition - e.pageX);
        scrollCarousel(change, currentDelta, document.body);
        document.querySelectorAll(`${_carouselId} a`).forEach((item) => {
          item.style.pointerEvents = "none";
        });
        movement = true;
      }
    });

    ["pointerup", "mouseleave"].forEach((item) => {
      document.body.addEventListener(item, (e) => {
        selectedItem = undefined;
        movement = false;
        document.querySelectorAll(`${_carouselId} a`).forEach((item) => {
          item.style.pointerEvents = "all";
        });
      });
    });

    document.querySelectorAll(_carouselId).forEach((item) => {
      let trigger = 0;
      item.addEventListener("wheel", (e) => {
        if (trigger !== 1) {
          ++trigger;
        } else {
          let change = e.deltaX * -3;
          let currentDelta =
            parseFloat(
              item
                .querySelector(_carouselHolderId)
                .style.transform.split("translateX(")[1]
            ) || 0;
          scrollCarousel(change, currentDelta, item);
          trigger = 0;
        }
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
      });
    });
  });

  return (
    <div ref={mount}>

      <body>
        <div className="pathcards">
          <h1>Select click</h1>
          <div id="album-rotator">
            <div id="album-rotator-holder">
              <a
                class="album-item"
                href="https://blockchaintechs.io/"
              >
                <span class="album-details">
                  <span class="icon">
                    <i class="far fa-at"></i> 
                  </span>
                  <span class="title">Some</span>
                  <span class="subtitle">Title</span>
                  <span class="subtext">Some text to describe this item</span>
                </span>
              </a>
              <a
                class="album-item"
                href="https://blockchaintechs.io/"
              >
                <span class="album-details">
                  <span class="title">Another</span>
                  <span class="subtitle">Title</span>
                  <span class="subtext">Some text to describe this item</span>
                </span>
              </a>
              <a
                class="album-item"
                href="https://blockchaintechs.io/"
              >
                <span class="album-details">
                  <span class="title">Finally</span>
                  <span class="subtitle">We Go</span>
                  <span class="subtext">Some text to describe this item</span>
                </span>
              </a>
              <a
                class="album-item"
                href="https://blockchaintechs.io/"
              >
                <span class="album-details">
                  <span class="title">And</span>
                  <span class="subtitle">One More</span>
                  <span class="subtext">Some text to describe this item</span>
                </span>
              </a>
              <a
                class="album-item"
                href="https://blockchaintechs.io/"
              >
                <span class="album-details">
                  <span class="title">And</span>
                  <span class="subtitle">Finally..</span>
                  <span class="subtext">Some text to describe this item</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};


