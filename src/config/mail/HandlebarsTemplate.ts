import handlebars from 'handlebars'
import fs from 'fs'

interface IVariables {
  [key: string]: string | number
}

interface ITemplate {
  file: string
  variables: IVariables
}

export default class HandlebarsTemplate {
  public async parse({ file, variables }: ITemplate): Promise<string> {
    const templateFile = await fs.promises.readFile(file, { encoding: 'utf-8' })
    const html = handlebars.compile(templateFile)
    return html(variables)
  }
}
