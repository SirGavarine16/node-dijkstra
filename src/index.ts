import { Graph } from './models';

const test = new Graph();

test.addVertex('A');
test.addVertex('B');
test.addVertex('C');
test.addVertex('D');
test.addVertex('E');
test.addVertex('F');

test.addEdge('A', 'B', 4);
test.addEdge('A', 'C', 2);
test.addEdge('B', 'E', 3);
test.addEdge('C', 'D', 2);
test.addEdge('C', 'F', 4);
test.addEdge('D', 'E', 3);
test.addEdge('D', 'F', 1);
test.addEdge('E', 'F', 1);

console.log('TEST -> ', test.shortestPath('A', 'E'));

