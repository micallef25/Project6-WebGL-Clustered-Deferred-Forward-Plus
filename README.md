WebGL Clustered and Forward+ Shading
======================

**University of Pennsylvania, CIS 565: GPU Programming and Architecture, Project 5**

* (TODO) YOUR NAME HERE
* Tested on: (TODO) **Google Chrome 222.2** on
  Windows 22, i7-2222 @ 2.22GHz 22GB, GTX 222 222MB (Moore 2222 Lab)

### Live Online

[![](img/thumb.png)](http://TODO.github.io/Project5B-WebGL-Deferred-Shading)

### Demo Video/GIF

[![](img/video.png)](TODO)



### Forward Vs Forward+ vs Clustered

In its basic form, forward shading is a method of rendering scenes by linearly marching forward along the GPU pipeline. For each mesh and light combination we issue a single draw call additively blending the results until the image has been fully assembled. The pseduo code below helps depict the algorithm at a high level.

### Basic Forward Pass

```C
//Shaders:
Shader simpleShader

//Buffers:
Buffer display

for mesh in scene
    for light in scene
        display += simpleShader(mesh, light)
```

### Basic Deferred


The idea behind deferred shading is that we perform all visibility and material fetching in one shader program, store the result in a buffer, and then we defer lighting and shading to another shader that takes as an input that buffer. Our "buffer" we store into is commonly known as a "Gbuffer". The contents and size of a Gbuffer will typically range. As some designers implement Gbuffers based on the task at hand or or clever the designer is at packing data. The basic pseudo code for Deferred shading is below.

```C
//Buffers:
Buffer display
Buffer GBuffer 

//Shaders:
Shader simpleShader
Shader writeShadingAttributes

//Visibility & materials
for mesh in scene
    if mesh.depth < GBuffer.depth
       GBuffer = writeShadingAttributes(mesh)

//Shading & lighting - Multi-pass
for light in scene
    display += simpleShader(GBuffer, light)

```

### With light culling 

```C
//Buffers:
Buffer display
Buffer GBuffer 
Buffer tileArray

//Shaders:
Shader manyLightShader
Shader writeShadingAttributes
CompShader lightInTile

//Visibility & materials
for mesh in scene
    if mesh.depth < GBuffer.depth
       GBuffer = writeShadingAttributes(mesh)

//Light culling
for tile in tileArray
   for light in scene
      if lightInTile(tile, light)
          tile += light
      
//Shading
display = manyLightShader(GBuffer, tileArray)
```

### Effects

## Lambert Vs Blinn Phong.

### Optimizations

## packing our Gbuffer

### Debilitating Bugs aka bloopers



Compare your implementations of Forward+ and Clustered shading and analyze their differences.
  - Is one of them faster?
  - Is one of them better at certain types of workloads?
  - What are the benefits and tradeoffs of using one over the other?
  - For any differences in performance, briefly explain what may be causing the difference.

For each new effect feature (required or extra), please provide the following analysis:
  - Concise overview write-up of the feature.
  - Performance change due to adding the feature.
  - If applicable, how do parameters (such as number of lights, etc.) affect performance? Show data with simple graphs.
    - Show timing in milliseconds, not FPS.
  - If you did something to accelerate the feature, what did you do and why?
  - How might this feature be optimized beyond your current implementation?

For each performance feature (required or extra), please provide:
  - Concise overview write-up of the feature.
  - Detailed performance improvement analysis of adding the feature
    - What is the best case scenario for your performance improvement? What is the worst? Explain briefly.
    - Are there tradeoffs to this performance feature? Explain briefly.
    - How do parameters (such as number of lights, tile size, etc.) affect performance? Show data with graphs.
      - Show timing in milliseconds, not FPS.
    - Show debug views when possible.
      - If the debug view correlates with performance, explain how.


### References

https://takahiroharada.files.wordpress.com/2015/04/forward_plus.pdf
https://www.gamedevs.org/uploads/fast-extraction-viewing-frustum-planes-from-world-view-projection-matrix.pdf
http://www.aortiz.me/2018/12/21/CG.html
https://www.gamasutra.com/blogs/RobertBasler/20131122/205462/Three_Normal_Mapping_Techniques_Explained_For_the_Mathematically_Uninclined.php?print=1

### Credits

* [Three.js](https://github.com/mrdoob/three.js) by [@mrdoob](https://github.com/mrdoob) and contributors
* [stats.js](https://github.com/mrdoob/stats.js) by [@mrdoob](https://github.com/mrdoob) and contributors
* [webgl-debug](https://github.com/KhronosGroup/WebGLDeveloperTools) by Khronos Group Inc.
* [glMatrix](https://github.com/toji/gl-matrix) by [@toji](https://github.com/toji) and contributors
* [minimal-gltf-loader](https://github.com/shrekshao/minimal-gltf-loader) by [@shrekshao](https://github.com/shrekshao)
