import { Exercicio_01 } from './World/Exercicio_01.js';
import { World } from './World/World.js';

function main() {
  // Get a reference to the container element
  const container = document.querySelector('#scene-container');

  // 1. Create an instance of the World app
  //const world = new World(container);
  //world.render();

  const ex1 = new Exercicio_01(container);
  ex1.render();
}

main();
