# OpenCanvas
Reusable performance focused canvas built in TypeScript and on top of the latest web tech.

## Browser Support
<table>
	<thead>
		<tr>
			<th rowspan="2" align="left">Feature</th>
			<th colspan="6">Desktop</th>
			<th colspan="3">Phone</th>
		</tr>
		<tr>
			<th><img width="24" height="24" alt="Google Chrome" title="Google Chrome" src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg"></th>
			<th><img width="24" height="24" alt="Microsoft Edge" title="Microsoft Edge" src="https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg"></th>
			<th><img width="24" height="24" alt="Safari" title="Safari" src="https://upload.wikimedia.org/wikipedia/commons/8/8d/Safari_2020_logo.svg"></th>
			<th><img width="24" height="24" alt="Firefox" title="Firefox" src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg"></th>
			<th><img width="24" height="24" alt="Opera" title="Opera" src="https://upload.wikimedia.org/wikipedia/commons/4/49/Opera_2015_icon.svg"></th>
			<th><img width="24" height="24" alt="Internet Explorer" title="Internet Explorer" src="https://upload.wikimedia.org/wikipedia/commons/1/18/Internet_Explorer_10%2B11_logo.svg"></th>
			<th><img width="24" height="24" alt="Google Chrome" title="Google Chrome" src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg"></th>
			<th><img width="24" height="24" alt="Firefox" title="Firefox" src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg"></th>
			<th><img width="24" height="24" alt="Samsung Internet" title="Samsung Internet" src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Samsung_Internet_logo.svg"></th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><a href="https://caniuse.com/canvas">Canvas</a></td>
			<td align="center">4</td>
			<td align="center">12</td>
			<td align="center">3.1</td>
			<td align="center">2</td>
			<td align="center">10</td>
			<td align="center">9</td>
			<td align="center">✔️</td>
			<td align="center">3.2</td>
			<td align="center">4</td>
		</tr>
		<tr>
			<td><a href="https://caniuse.com/mdn-api_canvasrenderingcontext2d">Canvas2D API</a></td>
			<td align="center">4</td>
			<td align="center">12</td>
			<td align="center">3.1</td>
			<td align="center">2</td>
			<td align="center">10</td>
			<td align="center">9</td>
			<td align="center">✔️</td>
			<td align="center">3.2</td>
			<td align="center">4</td>
		</tr>
		<tr>
			<td><a href="https://caniuse.com/webworkers">Web Workers</a></td>
			<td align="center">4</td>
			<td align="center">12</td>
			<td align="center">4</td>
			<td align="center">3.5</td>
			<td align="center">11.5</td>
			<td align="center">10</td>
			<td align="center">✔️</td>
			<td align="center">5</td>
			<td align="center">4</td>
		</tr>
		<tr>
			<td><a href="https://caniuse.com/webgl">WebGL</a></td>
			<td align="center">8</td>
			<td align="center">12</td>
			<td align="center">5.1</td>
			<td align="center">4</td>
			<td align="center">12.1</td>
			<td align="center">11</td>
			<td align="center">✔️</td>
			<td align="center">8</td>
			<td align="center">4</td>
		</tr>
		<tr>
			<td><a href="https://caniuse.com/webgl2">WebGL 2.0</a></td>
			<td align="center">56</td>
			<td align="center">79</td>
			<td align="center">15</td>
			<td align="center">51</td>
			<td align="center">43</td>
			<td align="center">❌</td>
			<td align="center">✔️</td>
			<td align="center">15</td>
			<td align="center">7.2</td>
		</tr>
		<tr>
			<td><a href="https://caniuse.com/offscreencanvas">OffscreenCanvas</a></td>
			<td align="center">69</td>
			<td align="center">79</td>
			<td align="center">17</td>
			<td align="center">105</td>
			<td align="center">64</td>
			<td align="center">❌</td>
			<td align="center">✔️</td>
			<td align="center">17</td>
			<td align="center">10.1</td>
		</tr>
		<tr>
			<td><a href="https://caniuse.com/webgpu">WebGPU</a></td>
			<td align="center">113</td>
			<td align="center">113</td>
			<td align="center">TP</td>
			<td align="center">63&nbsp;🧪</td>
			<td align="center">99</td>
			<td align="center">❌</td>
			<td align="center">✔️</td>
			<td align="center">17.4&nbsp;🧪</td>
			<td align="center">24</td>
		</tr>
	</tbody>
	<tfoot>
		<tr>
			<th colspan="10">Support</th>
		</tr>
		<tr>
			<td><b>Minimum</b></td>
			<td align="center">4</td>
			<td align="center">12</td>
			<td align="center">4</td>
			<td align="center">3.5</td>
			<td align="center">11.5</td>
			<td align="center">10</td>
			<td align="center">✔️</td>
			<td align="center">5</td>
			<td align="center">4</td>
		</tr>
		<tr>
			<td><b>Full</b></td>
			<td align="center">113</td>
			<td align="center">113</td>
			<td align="center">TP</td>
			<td align="center">105</td>
			<td align="center">99</td>
			<td align="center">❌</td>
			<td align="center">✔️</td>
			<td align="center">17.4&nbsp;🧪</td>
			<td align="center">24</td>
		</tr>
	</tfoot>
</table>
ℹ️&nbsp;Contains data provided by <a href="https://caniuse.com">Can I use</a> based on used technologies.<br>
ℹ️&nbsp;The numbers above represent the minimum browser versions supporting the specified feature.<br>
ℹ️&nbsp;Overall minimum support is met when the browser supports Canvas, Canvas2D API and Web Workers.<br>
✔️&nbsp;Supported&nbsp;&nbsp;&nbsp;&nbsp;❌&nbsp;Not Supported&nbsp;&nbsp;&nbsp;&nbsp;🧪&nbsp;Experimental Support (<i>requires additional configuration</i>)

## Installation
### npm
```
npm install @adamsarek/opencanvas --save
```

### CDN
```
<link href="https://cdn.jsdelivr.net/npm/@adamsarek/opencanvas@latest/dist/opencanvas.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/@adamsarek/opencanvas@latest/dist/opencanvas.js"></script>
```

## Getting Started
### 1. Target Element
```
<canvas class="opencanvas"></canvas>
```

### 2. Create
```
const options = {};
const openCanvas = new OpenCanvas(options);
```

## Options
<table>
	<thead>
		<tr>
			<th rowspan="2" align="left">Key</th>
			<th colspan="3">Value</th>
			<th rowspan="2" align="left">Description</th>
		</tr>
		<tr>
			<th align="left">Type</th>
			<th align="left">Expected</th>
			<th align="left">Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td valign="top"><code>selector</code></td>
			<td valign="top"><code>string</code><br><code>string[]</code></td>
			<td valign="top">CSS&nbsp;selector<br>classList</td>
			<td valign="top"><code>'.opencanvas'</code></td>
			<td valign="top">Select target element.</td>
		</tr>
		<tr>
			<td valign="top"><code>theme</code></td>
			<td valign="top"><code>string</code></td>
			<td valign="top"><code>'default'</code> | <code>'light'</code></td>
			<td valign="top"><code>'default'</code></td>
			<td valign="top">Choose a theme.</td>
		</tr>
	</tbody>
</table>

## Functions
<table>
	<thead>
		<tr>
			<th rowspan="2" align="left">Function</th>
			<th colspan="4">Arguments</th>
			<th align="left">Return</th>
			<th rowspan="2" align="left">Description</th>
		</tr>
		<tr>
			<th align="left">Name</th>
			<th align="left">Type</th>
			<th align="left">Expected</th>
			<th align="left">Default</th>
			<th align="left">Type</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td valign="top"><code>create</code></td>
			<td valign="top"></td>
			<td valign="top"></td>
			<td valign="top"></td>
			<td valign="top"></td>
			<td valign="top"><code>void</code></td>
			<td valign="top">Create OpenCanvas.</td>
		</tr>
	</tbody>
</table>
