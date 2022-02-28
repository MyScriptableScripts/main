async function updateScript(scriptName) {
  let files = FileManager.iCloud()    
  let filePath = `${files.documentsDirectory()}/${scriptName}.js`
  let exists = files.fileExists(filePath)
  try {
    
    const req = new Request(`https://raw.githubusercontent.com/MyScriptableScripts/main/main/${encodeURIComponent(scriptName)}.js`);
    const codeString = await req.loadString()
    const errorResult = "404: Not Found"
    if (codeString.includes(errorResult)) {
        const alert = new Alert()
alert.message = "The script tried to update, but didn't find its name on the GitHub. \n\nTell Ivan the Great to fix it!"
alert.addAction("Okay!")
await alert.present()
        console.log("Script not found on GitHub")
        return;
    }
    if (exists) {
        const currentCode = await files.readString(`${files.documentsDirectory()}/${scriptName}.js`)
        
        var isCurrent = codeString.includes(currentCode)
        if (!isCurrent) {
            await files.writeString(filePath, codeString)
        }    
    } else {
        await files.writeString(filePath, codeString)
    }
  } catch {
       console.log("Error loading " + scriptname)
    return null
  }

}




const url = "https://defiant-curse-mirror.glitch.me/Dani-lovins"
const boldFont = new Font("AmericanTypewriter-CondensedBold", 20)

const request = new Request(url);
const response = await request.loadString()



const gradientColors = [        
    new Color("#28282B"),    
    new Color("#000000"),
    new Color("#000000"),
    new Color("#000000"),    
    new Color("#000000"),    
    new Color("#28282B")
]

const gradientPoints = [    
    0,    
    0.05,
    0.3,
    0.7,
    0.95,
    1
]

const linearGradient = new LinearGradient()
linearGradient.colors = gradientColors;
linearGradient.locations = gradientPoints;


const widget = new ListWidget()
widget.backgroundColor = Color.black()
widget.backgroundGradient = linearGradient;
var text = widget.addText(response)
text.textColor = Color.cyan()
text.shadowColor = Color.white()
text.shadowOffset = new Point( 1, 1)
text.shadowRadius = 5
text.centerAlignText()
text.font = boldFont

if (!config.runsInWidget) {	        
    updateScript(Script.name())

//     await widget.presentMedium()	
} else {    
    Script.setWidget(widget)    
    Script.complete()
}
