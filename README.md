# OpenCanvas
## Browser Support [^1][^2]
<table>
	<thead>
		<tr>
			<th rowspan="2" align="left">Feature</th>
			<th colspan="6">Desktop</th>
			<th colspan="3">Phone</th>
		</tr>
		<tr>
			<th align="left">Chrome</th>
			<th align="left">Edge</th>
			<th align="left">Safari</th>
			<th align="left">Firefox</th>
			<th align="left">Opera</th>
			<th align="left">IE</th>
			<th align="left">Chrome</th>
			<th align="left">Firefox</th>
			<th align="left">Samsung Internet</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><a href="https://caniuse.com/canvas">Canvas</a></td>
			<td>✔️&nbsp;4+</td>
			<td>✔️&nbsp;12+</td>
			<td>✔️&nbsp;4+</td>
			<td>✔️&nbsp;3.6+</td>
			<td>✔️&nbsp;10+</td>
			<td>✔️&nbsp;9+</td>
			<td>✔️&nbsp;TODO</td>
			<td>✔️&nbsp;3.2+</td>
			<td>✔️&nbsp;4+</td>
		</tr>
		<tr>
			<td><a href="https://caniuse.com/offscreencanvas">OffscreenCanvas</a></td>
			<td>✔️&nbsp;69+</td>
			<td>✔️&nbsp;79+</td>
			<td>✔️&nbsp;17+</td>
			<td>✔️&nbsp;105+</td>
			<td>✔️&nbsp;64+</td>
			<td>❌</td>
			<td>✔️&nbsp;TODO</td>
			<td>✔️&nbsp;17+</td>
			<td>✔️&nbsp;10.1+</td>
		</tr>
		<tr>
			<td><a href="https://caniuse.com/mdn-api_canvasrenderingcontext2d">Canvas2D API</a></td>
			<td>✔️&nbsp;4+</td>
			<td>✔️&nbsp;12+</td>
			<td>✔️&nbsp;3.1+</td>
			<td>✔️&nbsp;2+</td>
			<td>✔️&nbsp;10+</td>
			<td>✔️&nbsp;9+</td>
			<td>✔️&nbsp;TODO</td>
			<td>✔️&nbsp;3.2+</td>
			<td>✔️&nbsp;4+</td>
		</tr>
		<tr>
			<td><a href="https://caniuse.com/webgl">WebGL</a></td>
			<td>✔️&nbsp;8+</td>
			<td>✔️&nbsp;12+</td>
			<td>✔️&nbsp;5.1+</td>
			<td>✔️&nbsp;4+</td>
			<td>✔️&nbsp;12.1+</td>
			<td>✔️&nbsp;11+</td>
			<td>✔️&nbsp;TODO</td>
			<td>✔️&nbsp;8+</td>
			<td>✔️&nbsp;4+</td>
		</tr>
		<tr>
			<td><a href="https://caniuse.com/webgl2">WebGL 2.0</a></td>
			<td>✔️&nbsp;56+</td>
			<td>✔️&nbsp;79+</td>
			<td>✔️&nbsp;15+</td>
			<td>✔️&nbsp;51+</td>
			<td>✔️&nbsp;43+</td>
			<td>❌</td>
			<td>✔️&nbsp;TODO</td>
			<td>✔️&nbsp;15+</td>
			<td>✔️&nbsp;7.2+</td>
		</tr>
		<tr>
			<td><a href="https://caniuse.com/webgpu">WebGPU</a></td>
			<td>✔️&nbsp;113+</td>
			<td>✔️&nbsp;113+</td>
			<td>✔️&nbsp;TP+</td>
			<td>🧪&nbsp;63+</td>
			<td>✔️&nbsp;99+</td>
			<td>❌</td>
			<td>✔️&nbsp;TODO</td>
			<td>🧪&nbsp;17.4+</td>
			<td>✔️&nbsp;24+</td>
		</tr>
		<tr>
			<td><a href="https://caniuse.com/webworkers">Web Workers</a></td>
			<td>✔️&nbsp;4+</td>
			<td>✔️&nbsp;12+</td>
			<td>✔️&nbsp;4+</td>
			<td>✔️&nbsp;3.5+</td>
			<td>✔️&nbsp;11.5+</td>
			<td>✔️&nbsp;10+</td>
			<td>✔️&nbsp;TODO</td>
			<td>✔️&nbsp;5+</td>
			<td>✔️&nbsp;4+</td>
		</tr>
	</tbody>
	<tfoot>
		<tr>
			<th colspan="10">Support</th>
		</tr>
		<tr>
			<td><b>Minimum</b></td>
			<td>✔️&nbsp;4+</td>
			<td>✔️&nbsp;12+</td>
			<td>✔️&nbsp;4+</td>
			<td>✔️&nbsp;3.6+</td>
			<td>✔️&nbsp;10+</td>
			<td>✔️&nbsp;9+</td>
			<td>✔️&nbsp;TODO</td>
			<td>✔️&nbsp;3.2+</td>
			<td>✔️&nbsp;4+</td>
		</tr>
		<tr>
			<td><b>Full</b></td>
			<td>✔️&nbsp;113+</td>
			<td>✔️&nbsp;113+</td>
			<td>✔️&nbsp;TP+</td>
			<td>✔️&nbsp;105+</td>
			<td>✔️&nbsp;99+</td>
			<td>❌</td>
			<td>✔️&nbsp;TODO</td>
			<td>🧪&nbsp;17.4+</td>
			<td>✔️&nbsp;24+</td>
		</tr>
	</tfoot>
</table>
<small>
✔️ Supported
❌ Not Supported
🧪 Experimental Support (<i>requires additional configuration</i>)
</small><br>

[^1]: Browser support contains data provided by [Can I use](caniuse.com) based on used technologies.
[^2]: Minimum support is met when browser supports Canvas and Canvas2D API.

## Installation
### npm
```
npm install @adamsarek/opencanvas --save
```

### CDN
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@adamsarek/opencanvas@latest/dist/opencanvas.css">
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

