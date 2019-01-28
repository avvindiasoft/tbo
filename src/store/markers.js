const coords = [];

function addArrToCoords(arr){
  arr.forEach( item => coords.push(item));
}

function addToCoords(c1, c2, l){
  const step1 = (c2[0] - c1[0]) / l;
  const step2 = (c2[1] - c1[1]) / l;
  for(let i = 1; i < l; i++){
    coords.push([(c1[0] + step1 * i).toFixed(4), (c1[1] + step2 * i).toFixed(4)]);
  }
}

function addToCoordsV(c1, c2, l){
  const step1 = (c1[0] - c2[0]) / l;
  const step2 = (c1[1] - c2[1]) / l;
  for(let i = 1; i < l; i++){
    coords.push([(c1[0] - step1 * i).toFixed(4), (c1[1] - step2 * i).toFixed(4)]);
  }
}

//0-4
addArrToCoords([
  [58.0076, 56.2054],
  [58.0071, 56.2106],
  [58.0059, 56.2041],
  [58.0050, 56.2072],
  [58.0100, 56.2352],
]);
//5-7
addToCoords(coords[3], coords[4], 4);
//8-9
addArrToCoords([
  [58.00345, 56.2092],
  [58.0083, 56.2369],
]);
//10-12
addToCoords(coords[8], coords[9], 4);
//13-14
addArrToCoords([
  [58.0016, 56.2164],

  [58.0052, 56.2378],
]);
//15-16
addToCoords(coords[13], coords[14], 3);
//17-18
addArrToCoords([
  [58.0006, 56.2197],
  [58.0035, 56.2360],
]);
//19-21
addArrToCoords([
  [58.0088, 56.2438],
  [58.0069, 56.2434],
  [58.0090, 56.2496],
]);
//22-23
addArrToCoords([
  [58.0047, 56.2426],
  [58.0108, 56.2598],
]);
//24-25
addToCoords(coords[22], coords[23], 3);
//26-27
addArrToCoords([
  [58.0070, 56.2560],
  [58.0065, 56.2600],
]);
//28-29
addArrToCoords([
  [58.0023, 56.2484],
  [58.0038, 56.2553],
]);
//30-31
addArrToCoords([
  [58.0005, 56.2495],
  [58.0043, 56.2647],
]);
//32-33
addToCoords(coords[30], coords[31], 3);
//34-35
addArrToCoords([
  [57.9993, 56.2530],
  [58.0022, 56.2656],
]);
//36-37
addToCoords(coords[34], coords[35], 3);
//38-39
addArrToCoords([
  [57.9969, 56.2534],
  [58.0002, 56.2670],
]);
//40-41
addToCoords(coords[38], coords[39], 3);
//42-43
addArrToCoords([
  [58.0012, 56.2389],
  [57.9937, 56.2471],
]);
//44-46
addToCoordsV(coords[42], coords[43], 4);
//47-48
addArrToCoords([
  [57.9990, 56.2464],
  [57.9950, 56.2515],
]);
//49-50
addArrToCoords([
  [58.0094, 56.26545],
  [58.0004, 56.2712],
]);
//51-53
addToCoordsV(coords[49], coords[50], 4);
//54-55
addArrToCoords([
  [58.0026, 56.2329],
  [57.9927, 56.2430],
]);
//56-59
addToCoordsV(coords[54], coords[55], 5);
//60-61
addArrToCoords([
  [57.9975, 56.2255],
  [57.9903, 56.2346],
]);
//62-64
addToCoordsV(coords[60], coords[61], 4);
//65-66
addArrToCoords([
  [57.9955, 56.2355],
  [57.9920, 56.2375],
]);
//67-68
addArrToCoords([
  [57.9955, 56.2215],
  [57.9900, 56.2305],
]);
//69-70
addToCoordsV(coords[67], coords[68], 3);
//71-72
addArrToCoords([
  [58.0010, 56.2080],
  [57.9985, 56.2215],
]);
//73-74
addToCoordsV(coords[71], coords[72], 3);
//75-76
addArrToCoords([
  [57.9983, 56.2120],
  [57.9895, 56.2250],
]);
//77-78
addToCoordsV(coords[75], coords[76], 3);
//79-80
addArrToCoords([
  [57.9990, 56.2060],
  [57.9895, 56.2210],
]);
//81-83
addToCoordsV(coords[79], coords[80], 4);
//84-85
addArrToCoords([
  [57.9965, 56.2060],
  [57.9895, 56.2145],
]);
//86-87
addToCoordsV(coords[84], coords[85], 3);
//88-90
addArrToCoords([
  [57.9920, 56.2070],
  [57.9905, 56.2048],
  [57.9900, 56.2105],
]);
//91
addArrToCoords([
  [57.9970, 56.2680],
]);
//92-93
addArrToCoords([
  [57.9912, 56.2450],
  [57.9905, 56.2710],
]);
//95-96
addToCoordsV(coords[92], coords[93], 4);
//97-98
addArrToCoords([
  [57.9949, 56.2554],
  [57.9946, 56.2735],
]);
//99-100
addToCoordsV(coords[97], coords[98], 3);
//103-104
addArrToCoords([
  [57.9929, 56.2534],
  [57.9926, 56.2714],
]);
//101-102
addToCoordsV(coords[101], coords[102], 3);
//91
addArrToCoords([
  [57.9970, 56.2720],
]);
//106-108
addArrToCoords([
  [58.00785, 56.2740],
  [58.00685, 56.2704],
  [58.0036, 56.2736],
]);


export default coords;