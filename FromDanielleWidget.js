const url = "https://defiant-curse-mirror.glitch.me/from-dani-lovins"

const postUrl = "https://defiant-curse-mirror.glitch.me/from-dani"

const request = new Request(url);
const response = await request.loadString()

var textSize = 20;
if (response.length > 100) textSize -= 1;
if (response.length > 150) textSize -= 1;
if (response.length > 200) textSize -= 1;

const boldFont = new Font("AmericanTypewriter-CondensedBold", textSize)

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
text.textColor = Color.green()
text.shadowColor = Color.white()
text.shadowOffset = new Point( 1, 1)
text.shadowRadius = 5
text.centerAlignText()
text.font = boldFont


async function submitQuote(quote) {
    var submitRequest = new Request(postUrl)
    submitRequest.method = "POST"
    submitRequest.headers = { "Content-Type": 'application/json'};
//     submitRequest.headers['Content-Type'] = 'application/json'
//     submitRequest.body = {"quote":quote}
    submitRequest.body = JSON.stringify({ "quote": quote })
    var submitResponse = await submitRequest.loadString();
    console.log("Submit Response = " + submitResponse);
    
}






if (!config.runsInWidget) {	    
    var alert = new Alert();
    alert.title = "Submit new quote?";
    alert.addTextField();
    alert.addAction("Submit");
    alert.addCancelAction("Cancel");
    var action = await alert.presentAlert();
    if (alert.textFieldValue(0) != null && alert.textFieldValue(0) != "") {
        if (action == 0) submitQuote(alert.textFieldValue(0));
    }
    console.log(action)
    console.log(alert.textFieldValue(0))
    
    
    //await widget.presentMedium()	
} else {    
    Script.setWidget(widget)    
    Script.complete()
}
