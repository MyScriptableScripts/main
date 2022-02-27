// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: magic;

const url = "https://defiant-curse-mirror.glitch.me/Dani-lovins"


const request = new Request(url);
const response = await request.loadString()

const widget = new ListWidget()
widget.backgroundColor = Color.black()
widget.textColor = Color.cyan()
var text = widget.addText(response)
text.centerAlignText()
text.font = Font.ultraLightMonospacedSystemFont(20)

if (!config.runsInWidget) {	    
    await widget.presentMedium()	
} else {    
    Script.setWidget(widget)    
    Script.complete()
}
