import { Component, ViewChild } from '@angular/core';

import { ShinBoneComponent } from './shin-bone-component';
import { KneeBoneComponent } from './knee-bone-component';

import { JsPlumbToolkitOptions} from '@jsplumbtoolkit/core';
import {BrowserUI, SurfaceRenderOptions, SurfaceViewOptions} from '@jsplumbtoolkit/browser-ui'
import { jsPlumbSurfaceComponent, jsPlumbService } from '@jsplumbtoolkit/angular';

/**
 * This app was created with create-react-app.  AppComponent is the entry point.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // we dont really need this, we just put it here to show you how you can do it.
  @ViewChild(jsPlumbSurfaceComponent) surfaceComponent:jsPlumbSurfaceComponent;

  // these are plugged in to the Surface component.
  surfaceId = "example"
  toolkitId = "example"

  toolkit:BrowserUI

  constructor(private $jsplumb:jsPlumbService) {}

  ngOnInit() {
    // Create the Toolkit instance via the jsPlumb service.
    this.toolkit = this.$jsplumb.getToolkit(this.toolkitId, this.toolkitParams)
  }

  // Empty in this demonstration.
  toolkitParams:JsPlumbToolkitOptions = {};

  // the view in this demonstration declares a component to use to render each node type, and the appearance and behaviour of
  // a single edge type.
  view:SurfaceViewOptions = {
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
          { type:"Label", options:{ location:0.5, label:"${label}"}},
          { type:"Arrow", options:{ location:1} },
          { type:"Arrow", options:{location:0, direction:-1}}
        ],
        endpoint:"Blank"
      }
    }
  };

  // we use a Spring layout, and we enable right-click on the canvas. on data load, we zoom the canvas to show all the data.
  renderParams:SurfaceRenderOptions = {
    layout:{
      type:"Spring"
    },
    zoomToFit:true,
    consumeRightClick:false
  };

  ngAfterViewInit() {
    // load some sample data when the view is ready.
    this.toolkit.load({
      data:{
        nodes:[
          { id:"1", type:"shin" },
          { id:"2", type:"knee" }
        ],
        edges:[
          { source:"1", target:"2", data:{label:"isConnectedTo"}}
        ]
      }
    })
  }
}
