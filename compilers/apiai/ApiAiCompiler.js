const fs = require('fs')
const YAML = require('yamljs')
const _ = require('lodash')

const rootFolder = '../../data/'
const file = {
    dialog: rootFolder + 'dialog-schema.yml',
    intents: rootFolder + 'intents.yml',
    entities: rootFolder + 'entities.yml'
}

const readYaml = (filePath) => YAML.parse(fs.readFileSync(filePath).toString())

//TODO missing files error handling

const extractUntterances = (intentsSource) => {
    const u = intentsSource
                .map(intent => {
                    var examples

                    if (_.isArray(intent.examples)) {
                        examples = intent.examples }
                    else if (_.isString(intent.examples)) {
                        const filePath = rootFolder + intent.examples
                        examples = readYaml(filePath) }
                    else {
                        examples = [] }

                    return examples.map(example => {
                               return {  text: example, intent: intent.name,
                                         entities: [] }})})

    const utterances = _.filter(_.flatten(u))

    return utterances }

const compiler = {
    compileIntents: () => {
        const intentsSource = readYaml(file.intents)
        const entitiesSource = readYaml(file.entities)

        const intentDefinitions = intentsSource.map(intent => { return { name: intent.name }})
        const utterances = extractUntterances(intentsSource)

        const luisApp = JSON.parse(fs.readFileSync(file.luisAppTemplate).toString())
        luisApp.intents = intentDefinitions
        luisApp.utterances = utterances

        console.log(luisApp)

        fs.writeFileSync(file.luisAppTarget, JSON.stringify(luisApp, null, 4), 'utf8')  },

     compileDialog: () => {
        const dialogSource = readYaml(file.dialog)
        const dialogs = DialogNodesProcessor.prepareDialogs(dialogSource)

        //console.log(JSON.stringify(dialogs, null, 4))

        dialogs.forEach((dialog) => {
            const fileName = file.dialogTargetPrefix + dialog.name

            fs.writeFileSync(fileName, JSON.stringify(dialog, null, 4), 'utf8') })

            }
}

compiler.compileDialog()

module.exports = compiler;