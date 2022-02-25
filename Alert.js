// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: magic;
class alert {
    constructor(title, message){
        this.alert = new Alert()
        this.alert.title = title
        this.alert.message = message
        this.actions = []
        this.inputs = {}
        return this
    }
    
    action = function(text, onAction) {
        let actionIndex = this.actions.length
        this.actions[actionIndex] = onAction    
        this.alert.addAction(text)
        return this
    }
    
    destructiveAction = function(text, onAction) {
        let actionIndex = this.actions.length
        this.actions[actionIndex] = onAction
        this.alert.addDestructiveAction(text)
        return this
    }
    
    input = function(key, text) {
        let inputIndex = this.inputs.length
        this.alert.addTextField(text)
        this.inputs[key] = inputIndex
        return this
    }
    
    addCancel = function(text = "Cancel", onCancel = ()=> console.log("Cancelled Alert.")) {
        this.alert.addCancelAction(text)
        this.actions[-1] = onCancel
        return this
    }
    
    secureInput = function(key, text) {
        let inputIndex = this.inputs.length
        this.alert.addSecureTextField(text)
        this.inputs[key] = inputIndex
        return this
    }
    
    present = async function() {
        let response = await this.alert.present()
        if (response == -1 && this.actions[-1] == null) return null
        let results = {}
        for (const key in this.inputs) {
            results[key] = this.alert.textFieldValue(this.inputs[key])
        }
        return this.actions[response](results)
    }
    
}

module.exports = alert