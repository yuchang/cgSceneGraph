/**
 * Copyright (c) 2012  Capgemini Technology Services (hereinafter “Capgemini”)
 *
 * License/Terms of Use
 *
 * Permission is hereby granted, free of charge and for the term of intellectual property rights on the Software, to any
 * person obtaining a copy of this software and associated documentation files (the "Software"), to use, copy, modify
 * and propagate free of charge, anywhere in the world, all or part of the Software subject to the following mandatory conditions:
 *
 *   •	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 *  Any failure to comply with the above shall automatically terminate the license and be construed as a breach of these
 *  Terms of Use causing significant harm to Capgemini.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  Except as contained in this notice, the name of Capgemini shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Capgemini.
 *
 *  These Terms of Use are subject to French law.
 *
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 * @date 10/08/2012
 *
 * Purpose :
 * image loading example
 * */

var CGMain = CGSGScene.extend(
	{
		initialize : function (canvas) {

            //call the contructor of the parent class (ie : CGSGScene)
			this._super(canvas);

			////// INITIALIZATION /////////

			this.initializeCanvas();
			this.createScene();

			this.startPlaying();
		},

		initializeCanvas : function () {
			//resize the dimension of the canvas to fulfill the viewport
			this.viewDimension = cgsgGetRealViewportDimension();
			this.setCanvasDimension(this.viewDimension);
		},

        /**
         * Create 2 CGSGNodeImage nodes, with the same image source
         */
        createScene : function () {

            //first, create a root node
            this.rootNode = new CGSGNode(0, 0, 1, 1);
            this.sceneGraph.addNode(this.rootNode, null);

            //second, create the 2 nodes, with no URL image, and add them to the root node
            this.imgNode1 = new CGSGNodeImage(
                40,     //x
                40,     //y
                34,     //width (-1 = auto compute)
                34,     //height (-1 = auto compute)
                476,    //slice x (slice x = position in the source image)
                0,      //slice y
                34,     //slice width (used for tiles. Here we want to display all the image)
                34,     //slice height (used for tiles. Here we want to display all the image)
                null,   //URL. null because we want to share a single Image between several nodes
                this.context);      //context of rendering
            //add some attributes
            this.imgNode1.isResizable = true;
            this.imgNode1.isDraggable = true;
            this.rootNode.addChild(this.imgNode1);

            this.imgNode2 = new CGSGNodeImage(
                90,     //x
                40,     //y
                34,     //width (-1 = auto compute)
                34,     //height (-1 = auto compute)
                612,    //slice x (slice x = position in the source image)
                34,     //slice y
                34,     //slice width (used for tiles. Here we want to display all the image)
                34,     //slice height (used for tiles. Here we want to display all the image)
                null,   //URL. null because we want to share a single Image between several nodes
                this.context);      //context of rendering
            //add some attributes
            this.imgNode2.isResizable = true;
            this.imgNode2.isDraggable = true;
            this.rootNode.addChild(this.imgNode2);

            //then load the image normally, like in any JS context
            // Warning : the web page must be on a web server (apache, ...)
            this.img = new Image();
            this.img.onload = this.onImageLoaded();
            this.img.src = "images/board.png";
        },

        /**
         * Fired when the image loading is complete.
         * Set the image object (img) to our image nodes
         */
        onImageLoaded : function() {
            this.imgNode1.setImage(this.img);
            this.imgNode2.setImage(this.img);
        }

	}
);