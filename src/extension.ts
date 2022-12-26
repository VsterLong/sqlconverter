// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "sqlconverter" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('sqlconverter.sqlconvert', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from sqlconverter!');

		// The code you place here will be executed every time your command is executed
		let PREPARING_KEY_WORD = "Preparing: ";
		let PARAMETERS_KEY_WORD = "Parameters: ";
		let NEW_LINE_WORD = "\n";


		vscode.env.clipboard.readText().then(text => {
			let word = text;
			// Display a message box to the user
			// vscode.window.showInformationMessage('Hello World from sqlparamter!' + content);
			// 去除前面无用的干扰字符串
			// 校验 MyBatis 日志 Preparing: 和 Parameters:
			let preparingWordIndex = word.indexOf(PREPARING_KEY_WORD);
			if (preparingWordIndex < 0) {
				vscode.window.showInformationMessage(`No keywords "${PREPARING_KEY_WORD} found!"`);
				return;
			}

			word = word.substring(preparingWordIndex + PREPARING_KEY_WORD.length);
			let parametersWordIndex = word.indexOf(PARAMETERS_KEY_WORD);
			if (preparingWordIndex < 0) {
				vscode.window.showInformationMessage(`No keywords "${PARAMETERS_KEY_WORD} found!"`);
				return;
			}

			// 第一行结束位置
			let preparingWordEndIndex = word.indexOf(NEW_LINE_WORD);
			let queryString = word.substring(0, preparingWordEndIndex);
			word = word.substring(parametersWordIndex + PARAMETERS_KEY_WORD.length);
			let parametersWordEndIndex = word.indexOf(NEW_LINE_WORD);
			// 
			let parameterString = word;
			if (parametersWordEndIndex > -1) {
				parameterString = word.substring(0, parametersWordEndIndex);
			}

			let parameterArray = parameterString.split(', ');

			if (parameterArray.length > 0) {
				let parameterReplaceIndex = 0;
				while (queryString.indexOf("?") > -1) {
					// 防止参数过多, 死循环
					if (parameterReplaceIndex > 1000) {
						break;
					}
					let parameter = parameterArray[parameterReplaceIndex];
					let stringIndex = parameter.indexOf("(String)");
					let timestampIndex = parameter.indexOf("(Timestamp)");
					parameter = parameter.substring(0, parameter.indexOf("("));
					if (stringIndex > -1 || timestampIndex > -1) {
						parameter = `"${parameter}"`;
					}
					queryString = queryString.replace("?", parameter);
					parameterReplaceIndex++;
				}
			}

			vscode.env.clipboard.writeText(queryString);
			vscode.window.showInformationMessage('convert successfully.');
		});
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
