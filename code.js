// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".


async function runPlugin() {
    
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" })
    
    figma.showUI(__html__);
    // Calls to "parent.postMessage" from within the HTML page will trigger this
    // callback. The callback will be passed the "pluginMessage" property of the
    // posted message.
    figma.ui.onmessage = msg => {
        // One way of distinguishing between different types of messages sent from
        // your HTML page is to use an object with a "type" property like this.
        if (msg.type === 'explode') {
            figma.commitUndo()
            
            const Xcenter = figma.viewport.center.x
            const Ycenter = figma.viewport.center.y
            const viewWidth = figma.viewport.bounds.width
            const viewHeight = figma.viewport.bounds.height
            const leftXBorder = Xcenter - (viewWidth/2)
            const rightXBorder = Xcenter + (viewWidth / 2)
            const topYBorder = Ycenter + (viewHeight/2)
            const bottomYBorder = Ycenter - (viewHeight / 2)
        
        
            figma.currentPage.children.forEach(node => {
    
                if (node.x > leftXBorder && node.x < rightXBorder && node.y > bottomYBorder && node.y < topYBorder) {
                    
                    if (node.x > Xcenter) {
                        node.x += Math.random() * 2000
                    } else {
                        node.x -= Math.random() * 2000
                    }
                    if (node.y > Ycenter) {
                        node.y += Math.random() * 2000
                        node.rotation += Math.random() * 180
                    } else {
                        node.y -= Math.random() * 2000
                        node.rotation += Math.random() * -180
                    }
                }
                
        
            
             })
        
            const Text = figma.createText()
            
            Text.characters = "You've been Figbombed! 💣"
            Text.x = Xcenter
            Text.y = Ycenter
            Text.fontSize = 100
            Text.textAlignHorizontal = "CENTER"
            Text.resize(1000, 200)
            console.log(Text.getRangeFontSize(5,10))
            Text.setRangeHyperlink(12,22, {type: "URL", value: "https://www.ksl.com"})
            Text.setRangeTextDecoration(12, 22, "UNDERLINE")
        }
    
        if (msg.type === 'undo') {
            figma.triggerUndo()
        }
        // Make sure to close the plugin when you're done. Otherwise the plugin will
        // keep running, which shows the cancel button at the bottom of the screen.
    };
    

}

runPlugin();