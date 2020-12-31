# Angular Skeleton Demonstration

- [Imports](#imports)
- [Setup](#setup)
- [Rendering](#rendering)
- [View](#view)
- [Components](#components)

<a id="top"></a>

This demonstration shows how to perform the basic tasks needed to get a Toolkit application up and running with Angular. The app was created with Angular CLI 6. The code is documented throughout so this page just gives a brief overview.
 
<a id="imports"></a>
### Imports

```javascript
{
    "dependencies":{
        ...
        "jsplumbtoolkit": "file:../../jsplumbtoolkit.tgz",
        "jsplumbtoolkit-angular": "file:../../jsplumbtoolkit-angular.tgz",
        "jsplumbtoolkit-demo-support": "file:../../jsplumbtoolkit-demo-support.tgz"
        ...
    }
}
```

We import `jsplumbtoolkit` and `jsplumbtoolkit-angular`, which you'll want to do for any application using the Angular integration. We also import `jsplumbtoolkit-demo-support`, which just contains a couple of helper methods for the Toolkit demonstrations, and is not something we expect licensees to use in their own applications.

<a id="setup"></a>
### Setup

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

import { KneeBoneComponent } from './knee-bone-component';
import { ShinBoneComponent } from './shin-bone-component';
import { jsPlumbToolkitModule } from "jsplumbtoolkit-angular";

@NgModule({
  declarations: [
    AppComponent, KneeBoneComponent, ShinBoneComponent // Any components used to render nodes/groups/ports must be declared in the `declarations` array
  ],
  entryComponents:[
    KneeBoneComponent, ShinBoneComponent    // Any components used to render nodes/groups/ports must also be declared in the `entryComponents` array
  ],
  imports: [
    BrowserModule, jsPlumbToolkitModule     // import the jsPlumbToolkitModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[ CUSTOM_ELEMENTS_SCHEMA ]    // JSPLUMB requires this
})
export class AppModule { }

```

### Creating a Toolkit instance

We create a Toolkit instance via the `jsPlumbService` in the main component:

```javascript
import { jsPlumbSurfaceComponent, jsPlumbService } from 'jsplumbtoolkit-angular';

...

export class AppComponent {

  surfaceId = "example";
  toolkitId = "example";

  toolkit:jsPlumbToolkit;

  constructor(private $jsplumb:jsPlumbService) {}

  ngOnInit() {
    // Create the Toolkit instance via the jsPlumb service.
    this.toolkit = this.$jsplumb.getToolkit(this.toolkitId, this.toolkitParams)
  }
  
  ...
}
```
<a id="rendering"></a>
### Rendering

The Surface is rendered in the template for the main component:


```xml
<div style="text-align:center">
  <jsplumb-surface [surfaceId]="surfaceId" [toolkitId]="toolkitId" [view]="view" [renderParams]="renderParams"></jsplumb-surface>
</div>
```

It is provided with four attributes:

- `surfaceId` - The ID of the Surface. Not strictly necessary in this app as no other component references the Surface,
but if you were using a palette like in the other Angular demonstrations, you'd need to set this.
- `toolkitId` - The ID of the Toolkit instance. We create it in the `ngOnInit` method of the main component, and we
retrieve it in the Surface component.
- `view` - Options for rendering nodes/groups/ports/edges. 
- `renderParams` - Options for the Surface component

<a id="view"></a>
#### View

The view is where we configure the renderer for, and behaviour of, nodes, edges, groups and ports. In this demonstration
we map two node types:

```javascript
view:ViewOptions = {
    nodes:{
      "shin":{
        component:ShinBoneComponent
      },
      "knee":{
        component:KneeBoneComponent
      }
    },
    edges:{
      "default":{
        connector:"Straight",
        anchor:"Continuous",
        overlays:[
          [ "Label", { location:0.5, label:"${label}"}],
          [ "Arrow", { location:1} ],
          [ "Arrow", {location:0, direction:-1}]
        ],
        endpoint:"Blank"
      }
    }
  };
```

`ShinBoneComponent` and `KneeBoneComponent` are Angular components, each of which extend a common `BoneComponent`.

We define how the "default" edge type will look - all edges implicitly have this type if one is not provided in the edge data.
You can read more about edge types [here](data-model#node-edge-port-type).

Read more about views [here](views).
 
 #### Render Params
 
```javascript
 renderParams:SurfaceRenderParams = {
     layout:{
       type:"Spring"
     },
     zoomToFit:true,
     consumeRightClick:false
   };
```

We use a `Spring` layout, we allow right click on the canvas, and we zoom the canvas to fit on data load.


<a id="components"></a>
### Components

As mentioned above, `KneeBoneComponent` and `ShinBoneComponent` both extend `BoneComponent`. The source for each is 
shown below.  Both components use the same template - `bone-component.html` to render themselves.


#### BoneComponent

```javascript
import { BaseNodeComponent } from "jsplumbtoolkit-angular";

export abstract class BoneComponent extends BaseNodeComponent {

  abstract boneType:string;

  hitMe() {
    alert("ouch! My " + this.getNode().data.type + "!")
  }

}

```

#### ShinBoneComponent

```javascript
import { BoneComponent } from "./bone-component";
import {Component} from "@angular/core";

@Component({ templateUrl:"bone-component.html" })
export class ShinBoneComponent extends BoneComponent {
  boneType = "SHIN";
}
export class ShinBoneComponent extends BoneComponent { }
```

#### KneeBoneComponent

```javascript
import { BoneComponent } from "./bone-component";
import {Component} from "@angular/core";

@Component({ templateUrl:"bone-component.html" })
export class KneeBoneComponent extends BoneComponent {
    boneType = "KNEE"
}

```

#### Bone Component Template

```xml
<div>
    {{boneType}} BONE
    <button (click)="hitMe()">HIT ME</button>
</div>`
```




 

